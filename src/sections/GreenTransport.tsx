import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Leaf } from 'lucide-react';

const greenLogisticsData = [
  { name: '杭州市', value: 72.22 },
  { name: '绍兴市', value: 66.92 },
  { name: '温州市', value: 66.45 },
  { name: '嘉兴市', value: 66.12 },
  { name: '金华市', value: 50.08 },
  { name: '丽水市', value: 48.23 },
  { name: '台州市', value: 46.75 },
  { name: '宁波市', value: 44.88 },
  { name: '湖州市', value: 37.87 },
  { name: '舟山市', value: 34.00 },
];

// 碳减排贡献度真实数据（吨CO₂）
const carbonReductionData = [
  { name: '杭州市', value: 425.18, rank: 1 },
  { name: '宁波市', value: 149.08, rank: 2 },
  { name: '金华市', value: 81.23, rank: 3 },
  { name: '湖州市', value: 61.39, rank: 4 },
  { name: '嘉兴市', value: 54.22, rank: 5 },
  { name: '温州市', value: 48.11, rank: 6 },
  { name: '台州市', value: 44.38, rank: 7 },
  { name: '绍兴市', value: 39.74, rank: 8 },
  { name: '丽水市', value: 21.92, rank: 9 },
  { name: '衢州市', value: 12.86, rank: 10 },
  { name: '舟山市', value: 10.00, rank: 11 },
];

export default function GreenTransport() {
  const sectionRef = useRef<HTMLElement>(null);
  const radarChartRef = useRef<HTMLDivElement>(null);
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
    if (!isVisible || !radarChartRef.current) return;

    const chart = echarts.init(radarChartRef.current);

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(34, 211, 238, 0.3)',
        textStyle: { color: '#fff' },
      },
      legend: {
        data: ['绿色物流指数', '碳减排贡献度'],
        textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
        bottom: 0,
      },
      radar: {
        indicator: greenLogisticsData.map((item) => ({
          name: item.name,
          max: 80,
        })),
        center: ['50%', '45%'],
        radius: '60%',
        axisName: {
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: 11,
        },
        splitArea: {
          areaStyle: {
            color: ['rgba(6, 182, 212, 0.05)', 'rgba(6, 182, 212, 0.1)'],
          },
        },
        axisLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
        splitLine: {
          lineStyle: { color: 'rgba(255, 255, 255, 0.2)' },
        },
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: greenLogisticsData.map((item) => item.value),
              name: '绿色物流指数',
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
                  { offset: 1, color: 'rgba(16, 185, 129, 0.1)' },
                ]),
              },
              lineStyle: { color: '#10b981', width: 2 },
              itemStyle: { color: '#10b981' },
            },
            {
              value: carbonReductionData.map((item) => item.value / 5), // 缩放以适应雷达图
              name: '碳减排贡献度',
              areaStyle: {
                color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                  { offset: 0, color: 'rgba(6, 182, 212, 0.3)' },
                  { offset: 1, color: 'rgba(6, 182, 212, 0.1)' },
                ]),
              },
              lineStyle: { color: '#06b6d4', width: 2 },
              itemStyle: { color: '#06b6d4' },
            },
          ],
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
    <section id="green" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">绿色交通发展分析</h2>
          <p className="text-white/60 text-lg">2025年浙江省各市绿色物流指数与碳减排贡献度</p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Radar chart */}
          <div
            className={`lg:col-span-2 glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">绿色物流指数与碳减排贡献度雷达图</h3>
            <div ref={radarChartRef} className="h-96" />
          </div>

          {/* Data tables */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Green logistics ranking */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">绿色物流指数排名</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {greenLogisticsData.slice(0, 5).map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500/30 text-green-400 flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-white/80 text-sm">{item.name}</span>
                    </div>
                    <span className="text-green-400 font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Carbon reduction ranking */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">碳减排贡献度排名</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {carbonReductionData.slice(0, 5).map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/30 text-cyan-400 flex items-center justify-center text-sm font-bold">
                        {item.rank}
                      </div>
                      <span className="text-white/80 text-sm">{item.name}</span>
                    </div>
                    <span className="text-cyan-400 font-medium text-sm">{item.value}吨</span>
                  </div>
                ))}
              </div>
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
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心观点</h4>
              <p className="text-white/70 leading-relaxed">
                <span className="text-cyan-400 font-medium">杭州市、绍兴市、温州市、嘉兴市</span>
                绿色物流指数领跑全省。浙江省2025年老旧营运货车报废更新补贴政策促进浙江省的绿色交通发展。
                <span className="text-cyan-400 font-medium">杭州市</span>
                碳减排贡献度达
                <span className="text-cyan-400 font-medium">425.18吨CO₂</span>
                ，领跑全省，依托浙江省2025年老旧营运货车报废更新补贴政策以及《2025年杭州市重载营运货车新能源化补助申请公告》政策，新能源货车更新较快。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
