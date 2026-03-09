import { useEffect, useRef, useState } from 'react';
import { Users, Truck, Leaf, Shield } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '跨区域通勤',
    description: '分析城市间通勤流量、时耗与极端通勤情况',
  },
  {
    icon: Truck,
    title: '生活物资物流保障',
    description: '监测绿色通道车辆规模与农产品运输结构',
  },
  {
    icon: Leaf,
    title: '绿色低碳出行',
    description: '追踪新能源车渗透率与出行特征变化',
  },
  {
    icon: Shield,
    title: '高速路网服务与韧性',
    description: '评估节假日路网承压与服务保障能力',
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
    <section id="summary" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">研究摘要</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            基于高速公路车流数据 + 公共数据融合分析，构建大众出行研究体系
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-card p-6 hover:bg-white/10 transition-all duration-500 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <feature.icon className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div
          className={`mt-16 grid grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '11', label: '覆盖城市' },
            { value: '4', label: '分析主题' },
            { value: '12', label: '月份数据' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
