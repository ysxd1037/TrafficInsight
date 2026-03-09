import { useEffect, useRef, useState } from 'react';
import { Database, Target, Rocket, Leaf } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: '数据驱动',
    description: '以高速公路通行数据为核心，构建高价值数据研究体系',
  },
  {
    icon: Target,
    title: '多维分析',
    description: '围绕经济活跃度、城际连接度、产业集聚度等核心维度',
  },
  {
    icon: Rocket,
    title: '智能应用',
    description: '支撑政府决策、产业园区规划、企业物流优化',
  },
  {
    icon: Leaf,
    title: '绿色发展',
    description: '助力碳达峰碳中和目标，推动区域协调发展',
  },
];

export default function Summary() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="summary"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            研究摘要
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            基于高速公路车流数据，构建可量化的区域经济运行监测与分析体系
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-card p-6 hover:bg-white/10 transition-all duration-500 group ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div
          className={`mt-16 grid grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '11', label: '覆盖城市' },
            { value: '6', label: '核心维度' },
            { value: '12', label: '月份数据' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
