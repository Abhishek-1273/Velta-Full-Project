import { useEffect, useRef } from 'react';

export default function GoldCursorTrail({ density = 'medium', color = 'rgba(184, 134, 11, 0.6)' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const points = [];
    const maxPoints = density === 'high' ? 40 : density === 'low' ? 15 : 25;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e) => {
      points.push({
        x: e.clientX,
        y: e.clientY,
        age: 0,
        size: Math.random() * 3 + 1,
      });

      if (points.length > maxPoints) {
        points.shift();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.age += 1;

        const opacity = 1 - p.age / maxPoints;
        if (opacity <= 0) {
          points.splice(i, 1);
          i--;
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fillStyle = color.replace('0.6', opacity.toString());
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(184, 134, 11, 0.4)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] w-full h-full"
    />
  );
}
