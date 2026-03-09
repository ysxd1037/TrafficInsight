import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Shield, AlertCircle } from 'lucide-react';

const pressureData = [
  { name: '沪昆高速', value: 59245099 },
  { name: '申嘉湖高速', value: 26880228 },
  { name: '沪渝高速', value: 26743195 },
  { name: '长深高速', value: 25533370 },
  { name: '常台高速', value: 23246817 },
  { name: '甬金高速', value: 20500594 },
  { name: '京台高速', value: 15748009 },
  { name: '杭瑞高速', value: 13498031 },
  { name: '杭甬高速', value: 12022067 },
  { name: '诸永高速', value: 10554409 },
];

const holidayComparisonData = {
  categories: ['沪昆高速', '申嘉湖高速', '沪渝高速', '长深高速', '常台高速', '甬金高速', '京台高速', '杭瑞高速'],
  spring2024: [922685, 48195, 45532, 585740, 864306, 387667, 2500546, 662335],
  labor2025: [1611151, 2991826, 1928690, 776811, 1778516, 535652, 1045656, 548575],
  national2025: [59245099, 26880228, 26743195, 25533370, 23246817, 20500594, 15748009, 13498031],
};

export default function NetworkResilience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pressureChartRef = useRef<HTMLDivElement>(null);
  const comparisonChartRef = useRef<HTMLDivElement>(null);
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
    if (!isVisible) return;

    if (pressureChartRef.current) {
      const chart = echarts.init(pressureChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: (params: any) => {
            const value = params[0].value;
            return `${params[0].name}: ${(value / 10000).toFixed(0)}万`;
          },
        },
        grid: {
          left: '3%',
          right: '8%',
          bottom: '3%',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            formatter: (value: number) => `${(value / 10000000).toFixed(0)}千万`,
          },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        yAxis: {
          type: 'category',
          data: pressureData.map((item) => item.name).reverse(),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'bar',
            data: pressureData.map((item) => item.value).reverse(),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#f59e0b' },
                { offset: 1, color: '#ef4444' },
              ]),
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: 'right',
              color: 'rgba(255, 255, 255, 0.8)',
              formatter: (params: any) => `${(params.value / 10000).toFixed(0)}万`,
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
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    if (comparisonChartRef.current) {
      const chart = echarts.init(comparisonChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: (params: any) => {
            let result = params[0].axisValue + '<br/>';
            params.forEach((item: any) => {
              result += item.marker + ' ' + item.seriesName + ': ' + (item.value / 10000).toFixed(0) + '万<br/>';
            });
            return result;
          },
        },
        legend: {
          data: ['2024年春节', '2025年五一', '2025年国庆'],
          textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '5%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: holidayComparisonData.categories,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', rotate: 30, fontSize: 10 },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.6)',
            formatter: (value: number) => `${(value / 10000000).toFixed(0)}千万`,
          },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '2024年春节',
            type: 'bar',
            data: holidayComparisonData.spring2024,
            itemStyle: { color: '#3b82f6' },
          },
          {
            name: '2025年五一',
            type: 'bar',
            data: holidayComparisonData.labor2025,
            itemStyle: { color: '#10b981' },
          },
          {
            name: '2025年国庆',
            type: 'bar',
            data: holidayComparisonData.national2025,
            itemStyle: { color: '#ef4444' },
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
    }
  }, [isVisible]);

  return (
    <section id="resilience" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">高速路网服务与韧性</h2>
          <p className="text-white/60 text-lg">节假日路网承压与服务保障能力分析</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">2025年国庆假期各路段承压指数 TOP10</h3>
            </div>
            <div ref={pressureChartRef} className="h-80" />
          </div>

          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">节假日路网承压对比</h3>
            </div>
            <div ref={comparisonChartRef} className="h-80" />
          </div>
        </div>

        <div
          className={`mt-8 glass-card p-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心洞察</h4>
              <p className="text-white/70 leading-relaxed">
                <span className="text-cyan-400 font-medium">2025年国庆假期</span>
                成为全年路网压力峰值，显著高于24年春节假期和25年五一假期。
                国庆期间<span className="text-cyan-400 font-medium">沪昆高速</span>
                承压指数达到了5,924万，位列第一，表明其作为连接华东—华南—西南的"经济动脉"，
                在长假期间承担着全国性的货运与客运双重负荷，保畅难度高于其他时段。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
