"use client";

import { useEffect, useRef } from "react";
import { pointer } from "@/lib/pointer";

type Node = { x: number; y: number; col: number; glow: number; links: Node[] };
type Pulse = { from: Node; to: Node; t: number; speed: number };

/**
 * The full-screen background: a big, faint neural network.
 * Nodes are arranged in loose columns (layers) across the screen.
 * Pulses of light flow from left to right through the connections,
 * and nodes near your mouse light up and fire their own pulses.
 * The whole network shifts a little with the mouse (3D feel).
 *
 * Kept light: few nodes, simple shapes, and it pauses when the tab is hidden.
 */
export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let frame = 0;
    let columns: Node[][] = [];
    let pulses: Pulse[] = [];
    const mouse = { x: -999, y: -999 };

    // Build the network to fit the screen
    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const colCount = width < 700 ? 4 : 7; // fewer layers on phones
      columns = Array.from({ length: colCount }, (_, c) => {
        const count = 4 + Math.floor(Math.random() * 4); // 4-7 nodes per layer
        return Array.from({ length: count }, (_, i) => ({
          // spread across the screen, with a little randomness so it looks organic
          x: ((c + 0.5) / colCount) * width + (Math.random() - 0.5) * 50,
          y: ((i + 0.5) / count) * height + (Math.random() - 0.5) * 60,
          col: c,
          glow: 0,
          links: [] as Node[],
        }));
      });
      // Each node connects to 2-3 nodes in the next layer (not all, so it stays clean)
      for (let c = 0; c < columns.length - 1; c++) {
        for (const n of columns[c]) {
          const next = [...columns[c + 1]].sort(() => Math.random() - 0.5);
          n.links = next.slice(0, 2 + Math.floor(Math.random() * 2));
        }
      }
      pulses = [];
    }

    function fire(from: Node) {
      if (!from.links.length) return;
      const to = from.links[Math.floor(Math.random() * from.links.length)];
      pulses.push({ from, to, t: 0, speed: 0.006 + Math.random() * 0.006 });
    }

    function draw() {
      const dark = document.documentElement.classList.contains("dark");
      const rgb = dark ? "91,140,255" : "42,79,214";
      ctx.clearRect(0, 0, width, height);

      // The whole network drifts a little with the mouse
      const ox = -pointer.x * 18;
      const oy = -pointer.y * 12;

      // Connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(${rgb},${dark ? 0.1 : 0.09})`;
      ctx.beginPath();
      for (const col of columns) {
        for (const n of col) {
          for (const m of n.links) {
            ctx.moveTo(n.x + ox, n.y + oy);
            ctx.lineTo(m.x + ox, m.y + oy);
          }
        }
      }
      ctx.stroke();

      // Pulses: start new ones from the first layer, and pass them on when they arrive
      if (!reduceMotion) {
        if (pulses.length < 40 && Math.random() < 0.06) {
          const first = columns[0];
          fire(first[Math.floor(Math.random() * first.length)]);
        }
        for (const p of pulses) {
          p.t += p.speed;
          if (p.t >= 1) {
            p.to.glow = 1;
            if (Math.random() < 0.8) fire(p.to);
          }
        }
        pulses = pulses.filter((p) => p.t < 1);
      }
      for (const p of pulses) {
        const x = p.from.x + (p.to.x - p.from.x) * p.t + ox;
        const y = p.from.y + (p.to.y - p.from.y) * p.t + oy;
        const back = Math.max(0, p.t - 0.08);
        ctx.strokeStyle = `rgba(${rgb},${dark ? 0.55 : 0.45})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.from.x + (p.to.x - p.from.x) * back + ox, p.from.y + (p.to.y - p.from.y) * back + oy);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      // Nodes (light up near the mouse, and when a pulse arrives)
      for (const col of columns) {
        for (const n of col) {
          const x = n.x + ox;
          const y = n.y + oy;
          if (Math.hypot(x - mouse.x, y - mouse.y) < 90) {
            if (n.glow < 0.3) fire(n);
            n.glow = Math.max(n.glow, 0.8);
          }
          n.glow *= 0.96;
          if (n.glow > 0.05) {
            ctx.fillStyle = `rgba(${rgb},${n.glow * 0.25})`;
            ctx.beginPath();
            ctx.arc(x, y, 4 + 12 * n.glow, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = `rgba(${rgb},${(dark ? 0.35 : 0.3) + n.glow * 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    build();
    draw();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="suck-fixed pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dark mode: soft electric-blue light from the top-left (the premium blue look) */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100">
        <div className="absolute -top-1/3 -left-1/4 h-[80vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse,rgba(47,91,255,0.18),transparent_65%)]" />
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Soft edges so the eye stays in the middle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,var(--bg)_100%)]" />
    </div>
  );
}