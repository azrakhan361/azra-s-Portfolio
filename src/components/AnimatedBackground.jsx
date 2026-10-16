import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Blob 1 */}
      <div
        className="blob"
        style={{
          width: '600px',
          height: '600px',
          background: 'var(--blob1)',
          top: '-120px',
          left: '-150px',
          animationDuration: '14s',
          animationDelay: '0s',
        }}
      />
      {/* Blob 2 */}
      <div
        className="blob"
        style={{
          width: '500px',
          height: '500px',
          background: 'var(--blob2)',
          bottom: '0',
          right: '-100px',
          animationDuration: '18s',
          animationDelay: '-6s',
          animationDirection: 'reverse',
        }}
      />
      {/* Blob 3 */}
      <div
        className="blob"
        style={{
          width: '400px',
          height: '400px',
          background: 'var(--blob3)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animationDuration: '22s',
          animationDelay: '-3s',
        }}
      />
      {/* Subtle grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
    </div>
  );
}
