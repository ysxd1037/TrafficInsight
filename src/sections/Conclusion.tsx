import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Target, TrendingUp, Zap, MapPin, Lightbulb } from 'lucide-react';

const conclusions = [
  {
    icon: Target,
    title: '区域一体化提升',
    description: '高速公路网络促进区域经济一体化程度不断提升，城市间联系日益紧密',
  },
  {
    icon: TrendingUp,
    title: '中心城市辐射',
    description: '杭州、宁波作为核心枢纽，辐射带动作用显著，引领全省经济发展',
  },
  {
    icon: Zap,
    title: '交通基础支撑',
    description: '交通基础设施是经济发展的重要支撑，智慧高速建设助力数字化转型',
  },
  {
    icon: MapPin,
    title: '协调发展空间',
    description: '浙西南地区发展潜力巨大，需加强交通连接，推动区域协调发展',
  },
];

const futureDirections = [
  '结合多维数据源，构建"经济-环境-社会"的全域感知网络',
  '从描述性分析向预测性、智能决策转变',
  '基于浙江省"415X"先进制造业集群规划，选定绍兴纺织业、杭州生物医药、宁波前湾汽车半导体、嘉兴光伏新材料、湖州地理信息AI五大产业聚焦地',
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
    <section
      id="conclusion"
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
            研究结论与展望
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            基于高速公路车流数据的区域经济分析洞察与未来发展方向
          </p>
        </div>

        {/* Core positioning */}
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
              <h3 className="text-xl font-semibold text-white mb-3">
                核心定位
              </h3>
              <p className="text-white/70 leading-relaxed">
                报告以高速公路车流数据为<span className="text-cyan-400 font-medium">"显微镜"</span>和
                <span className="text-cyan-400 font-medium">"望远镜"</span>，
                构建可量化的区域经济运行监测与分析体系，提供客观、颗粒度细的经济运行"晴雨表"。
              </p>
            </div>
          </div>
        </div>

        {/* Conclusions grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {conclusions.map((item, index) => (
            <div
              key={item.title}
              className={`glass-card p-6 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-cyan-400 font-bold text-lg">
                      0{index + 1}
                    </span>
                    <h4 className="text-lg font-semibold text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future directions */}
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

        {/* Footer quote */}
        <div
          className={`mt-16 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/50 text-sm max-w-2xl mx-auto">
            整合多源数据，构建"人-车-路-企业"全链条数据体系，推动智慧交通与数字经济深度融合，
            为浙江省高质量发展和"双碳"目标提供数据支撑。
          </p>
        </div>
      </div>
    </section>
  );
}
