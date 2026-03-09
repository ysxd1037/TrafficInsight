import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Globe } from 'lucide-react';

// 真实的城际经济连接度指数数据
const connectionData = [
  { source: '杭州市', target: '嘉兴市', value: 46.46 },
  { source: '杭州市', target: '绍兴市', value: 29.09 },
  { source: '杭州市', target: '湖州市', value: 20.81 },
  { source: '杭州市', target: '宁波市', value: 20.26 },
  { source: '杭州市', target: '金华市', value: 6.98 },
  { source: '杭州市', target: '台州市', value: 3.79 },
  { source: '杭州市', target: '衢州市', value: 1.43 },
  { source: '杭州市', target: '温州市', value: 0.83 },
  { source: '杭州市', target: '丽水市', value: 0.60 },
  { source: '杭州市', target: '舟山市', value: 0.59 },
];

const rankingData = [
  { city: '杭州市<->嘉兴市', rank: 1, value: 46.46 },
  { city: '杭州市<->绍兴市', rank: 2, value: 29.09 },
  { city: '杭州市<->湖州市', rank: 3, value: 20.81 },
  { city: '杭州市<->宁波市', rank: 4, value: 20.26 },
  { city: '杭州市<->金华市', rank: 5, value: 6.98 },
  { city: '杭州市<->台州市', rank: 6, value: 3.79 },
  { city: '杭州市<->衢州市', rank: 7, value: 1.43 },
  { city: '杭州市<->温州市', rank: 8, value: 0.83 },
  { city: '杭州市<->丽水市', rank: 9, value: 0.60 },
  { city: '杭州市<->舟山市', rank: 10, value: 0.59 },
];

export default function IntercityConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isVisible || !chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const nodes = [
      { name: '杭州市', value: 100, x: 500, y: 300 },
      { name: '嘉兴市', value: 95, x: 520, y: 200 },
      { name: '绍兴市', value: 88, x: 580, y: 320 },
      { name: '湖州市', value: 82, x: 420, y: 220 },
      { name: '宁波市', value: 75, x: 680, y: 350 },
      { name: '金华市', value: 68, x: 450, y: 420 },
      { name: '台州市', value: 55, x: 650, y: 480 },
      { name: '衢州市', value: 48, x: 350, y: 480 },
      { name: '温州市', value: 42, x: 550, y: 580 },
      { name: '丽水市', value: 35, x: 450, y: 550 },
      { name: '舟山市', value: 28, x: 780, y: 280 },
    ];

    // 使用对数计算线条粗细，连接度越高线条越粗
    const links = connectionData.map((item) => ({
      source: item.source,
      target: item.target,
      value: item.value,
      lineStyle: {
        width: Math.log(item.value + 1) * 2 + 1, // 对数计算线条粗细
        curveness: 0.2,
      },
    }));

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        textStyle: { color: '#fff' },
        formatter: (params: any) => {
          if (params.dataType === 'edge') {
            return `${params.data.source} <-> ${params.data.target}<br/>连接度指数: ${params.data.value}`;
          }
          return params.name;
        },
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          data: nodes.map((node) => ({
            ...node,
            symbolSize: node.value / 3,
            itemStyle: {
              color:
                node.name === '杭州市'
                  ? '#06b6d4'
                  : new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                      { offset: 0, color: '#3b82f6' },
                      { offset: 1, color: '#1d4ed8' },
                    ]),
              shadowBlur: 20,
              shadowColor: 'rgba(6, 182, 212, 0.5)',
            },
            label: {
              show: true,
              color: '#fff',
              fontSize: 12,
              position: 'bottom',
            },
          })),
          links: links,
          roam: true,
          force: {
            repulsion: 300,
            edgeLength: [100, 300],
          },
          lineStyle: {
            color: 'source',
            curveness: 0.2,
            opacity: 0.6,
          },
          emphasis: {
            focus: 'adjacency',
            lineStyle: {
              width: 5,
              opacity: 1,
            },
          },
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [isVisible]);

  return (
    <section id="connection" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">城际经济连接分析</h2>
          <p className="text-white/60 text-lg">2025年杭州与其他市区城际经济连接度排名与网络图</p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Network chart */}
          <div
            className={`lg:col-span-2 glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              杭州市与省内部分城市城际经济连接度示意图
            </h3>
            <div ref={chartRef} className="h-96" />
          </div>

          {/* Ranking list */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">城际经济连接度排名</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {rankingData.map((item, index) => (
                <div
                  key={item.city}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < 3 ? 'bg-cyan-500/30 text-cyan-400' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {item.rank}
                  </div>
                  <span className="text-white/80 text-sm flex-1">{item.city}</span>
                  <span className="text-cyan-400 text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insight card */}
        <div
          className={`mt-8 glass-card p-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心观点</h4>
              <p className="text-white/70 leading-relaxed">
                呈现
                <span className="text-cyan-400 font-medium">"中心-梯度衰减"</span>
                空间格局。
                <span className="text-cyan-400 font-medium">杭州市与嘉兴市、湖州市、绍兴市</span>
                ，构成杭州都市圈协同体，依托G60沪昆高速公路等高速公路网络形成紧密联系。
                <span className="text-cyan-400 font-medium">杭州市与丽水市、衢州市</span>
                通过杭金衢高速等高速公路连接，但受地理距离和地形条件限制，城际经济连接度相对较低。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
