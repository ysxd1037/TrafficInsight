import { useEffect, useRef } from 'react';
import { ChevronDown, Users, Truck, Leaf, Shield } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${particle.opacity})`;
        ctx.fill();

        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToContent = () => {
    document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">2025</span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-white">交通看</span>
          <span className="text-gradient">·民生</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/80 mb-4 font-light">
          浙江省高速公路大众出行分析研究报告
        </p>

        <p className="text-base sm:text-lg text-white/60 mb-12 max-w-2xl mx-auto">
          以数据洞见民生，让出行更有温度
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Users className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80 text-sm">跨区域通勤</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Truck className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80 text-sm">物流保障</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Leaf className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80 text-sm">绿色出行</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="text-white/80 text-sm">路网韧性</span>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer z-20"
      >
        <span className="text-sm">向下滚动探索</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  );
}
