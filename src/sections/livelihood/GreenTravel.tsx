import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Leaf, Zap } from 'lucide-react';

const penetrationData = [
  { name: '杭州市', value: 34.83 },
  { name: '嘉兴市', value: 29.10 },
  { name: '金华市', value: 29.07 },
  { name: '湖州市', value: 28.94 },
  { name: '宁波市', value: 28.65 },
  { name: '温州市', value: 28.43 },
  { name: '绍兴市', value: 27.28 },
  { name: '台州市', value: 26.47 },
  { name: '衢州市', value: 23.16 },
  { name: '丽水市', value: 21.32 },
  { name: '舟山市', value: 21.03 },
];

const monthlyTrendData = {
  categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  杭州市: [29.97, 29.73, 32.62, 33.09, 33.60, 34.84, 35.45, 35.60, 36.85, 37.34, 38.42, 39.33],
  嘉兴市: [25.10, 24.94, 26.34, 27.01, 27.73, 28.60, 29.24, 30.06, 31.06, 32.03, 32.58, 33.25],
  金华市: [25.17, 25.33, 26.47, 27.15, 27.69, 28.59, 29.21, 29.65, 31.14, 31.95, 32.57, 33.38],
  湖州市: [25.18, 24.42, 26.43, 27.19, 27.92, 28.64, 29.12, 29.79, 30.82, 31.73, 32.33, 33.10],
};

export default function GreenTravel() {
  const sectionRef = useRef<HTMLElement>(null);
  const penetrationChartRef = useRef<HTMLDivElement>(null);
  const trendChartRef = useRef<HTMLDivElement>(null);
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

    if (penetrationChartRef.current) {
      const chart = echarts.init(penetrationChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c}%',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          max: 40,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', formatter: '{value}%' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        yAxis: {
          type: 'category',
          data: penetrationData.map((item) => item.name).reverse(),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'bar',
            data: penetrationData.map((item) => item.value).reverse(),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#10b981' },
                { offset: 1, color: '#06b6d4' },
              ]),
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: 'right',
              color: 'rgba(255, 255, 255, 0.8)',
              formatter: '{c}%',
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

    if (trendChartRef.current) {
      const chart = echarts.init(trendChartRef.current);
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
              result += item.marker + ' ' + item.seriesName + ': ' + item.value + '%<br/>';
            });
            return result;
          },
        },
        legend: {
          data: ['杭州市', '嘉兴市', '金华市', '湖州市'],
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
          data: monthlyTrendData.categories,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        },
        yAxis: {
          type: 'value',
          min: 20,
          max: 45,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', formatter: '{value}%' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '杭州市',
            type: 'line',
            data: monthlyTrendData.杭州市,
            smooth: true,
            lineStyle: { color: '#06b6d4', width: 3 },
            itemStyle: { color: '#06b6d4' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(6, 182, 212, 0.3)' },
                { offset: 1, color: 'rgba(6, 182, 212, 0)' },
              ]),
            },
          },
          {
            name: '嘉兴市',
            type: 'line',
            data: monthlyTrendData.嘉兴市,
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 3 },
            itemStyle: { color: '#3b82f6' },
          },
          {
            name: '金华市',
            type: 'line',
            data: monthlyTrendData.金华市,
            smooth: true,
            lineStyle: { color: '#8b5cf6', width: 3 },
            itemStyle: { color: '#8b5cf6' },
          },
          {
            name: '湖州市',
            type: 'line',
            data: monthlyTrendData.湖州市,
            smooth: true,
            lineStyle: { color: '#10b981', width: 3 },
            itemStyle: { color: '#10b981' },
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
    <section id="green" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">绿色低碳出行</h2>
          <p className="text-white/60 text-lg">新能源渗透率与出行特征分析</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">2025年各市新能源渗透率</h3>
            </div>
            <div ref={penetrationChartRef} className="h-80" />
          </div>

          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">新能源渗透率趋势 TOP4</h3>
            </div>
            <div ref={trendChartRef} className="h-80" />
          </div>
        </div>

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
              <h4 className="text-lg font-semibold text-white mb-2">核心洞察</h4>
              <p className="text-white/70 leading-relaxed">
                <span className="text-cyan-400 font-medium">杭州市</span>
                以34.83%的渗透率位列第一，远超全省平均水平（约27%），反映其作为省会城市在充电基础设施、政策激励和产业聚集方面的综合优势。
                浙江省<span className="text-cyan-400 font-medium">杭、金、嘉、湖四市</span>
                高速通行新能源车渗透率均呈现持续上升的"阶梯式增长"趋势，反映绿色出行转型在核心区域已形成良性循环。
                新能源车平均行驶里程始终低于燃油车，全年维持在38–47公里之间，且波动幅度更大。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
