import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Target, TrendingUp, Zap, Shield, Lightbulb } from 'lucide-react';

const futureDirections = [
  '探索数据驱动的通勤效率提升方案',
  '打造智慧"绿通"与物流保供枢纽',
  '实施差异化新能源基建与碳普惠生态',
  '强化路网韧性与节假日动态治理',
];

const insights = [
  {
    icon: Target,
    title: '跨区域通勤',
    description: '杭绍、杭嘉、杭湖三者合计占全省通勤流量的50%以上，杭嘉湖绍四地已形成高度融合的"1小时通勤圈"',
  },
  {
    icon: TrendingUp,
    title: '物流保障',
    description: '杭州市承担全省农产品集散功能，水果、蔬菜类运输合计占比达69%',
  },
  {
    icon: Zap,
    title: '绿色出行',
    description: '杭州市新能源渗透率达34.83%，远超全省平均水平，杭嘉金湖四市呈现阶梯式增长',
  },
  {
    icon: Shield,
    title: '路网韧性',
    description: '国庆假期为全年路网压力峰值，沪昆高速承压指数达5,924万位列第一',
  },
];

export default function Conclusion() {
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
    <section id="conclusion" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">研究结论与展望</h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            基于高速公路数据的大众出行分析洞察与未来发展方向
          </p>
        </div>

        <div
          className={`glass-card p-8 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">核心定位</h3>
              <p className="text-white/70 leading-relaxed">
                报告以高速公路数据为引擎，融合多源公共数据；构建
                <span className="text-cyan-400 font-medium">跨区域通勤、生活物流、绿色出行、路网韧性</span>
                四大分析模块，实现从"数据监测"到"政策决策"的跃迁。
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {insights.map((item, index) => (
            <div
              key={item.title}
              className={`glass-card p-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`glass-card p-8 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            未来方向
          </h3>
          <div className="space-y-4">
            {futureDirections.map((direction, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">{direction}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            以数据洞见民生，让出行更有温度。持续深化高速公路数据与公共数据融合分析，
            为浙江省交通治理与民生改善提供科学决策支撑。
          </p>
        </div>
      </div>
    </section>
  );
}
