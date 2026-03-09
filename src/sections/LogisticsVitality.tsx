import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { TrendingUp } from 'lucide-react';

// 物流活力指数真实数据
const logisticsData = [
  { name: '宁波市', value: 93.18 },
  { name: '嘉兴市', value: 92.93 },
  { name: '杭州市', value: 83.59 },
  { name: '金华市', value: 36.13 },
  { name: '湖州市', value: 29.82 },
  { name: '绍兴市', value: 28.31 },
  { name: '温州市', value: 23.83 },
  { name: '台州市', value: 16.54 },
  { name: '衢州市', value: 6.20 },
  { name: '丽水市', value: 5.53 },
  { name: '舟山市', value: 1.64 },
];

// 物流活力指数全年趋势真实数据（根据图片数据）
const monthlyLogisticsData = {
  categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: {
    宁波市: [92.13, 100.00, 88.89, 90.50, 90.84, 96.20, 94.80, 96.81, 94.96, 91.15, 94.79, 95.21],
    嘉兴市: [85.77, 100.00, 82.38, 83.17, 82.19, 91.49, 84.67, 84.06, 84.48, 83.36, 90.80, 83.73],
    杭州市: [84.53, 85.77, 81.69, 82.38, 83.17, 82.19, 84.67, 91.29, 83.06, 84.48, 83.36, 83.73],
    金华市: [36.30, 30.82, 32.08, 31.13, 29.31, 28.72, 29.93, 29.07, 29.26, 30.58, 29.95, 29.37],
    湖州市: [27.06, 30.82, 35.94, 34.96, 36.20, 36.62, 35.58, 36.86, 37.68, 37.31, 37.64, 37.69],
  },
};

export default function LogisticsVitality() {
  const sectionRef = useRef<HTMLElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);
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

    // Bar chart
    if (barChartRef.current) {
      const barChart = echarts.init(barChartRef.current);
      const barOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '3%',
          top: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          max: 100,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        yAxis: {
          type: 'category',
          data: logisticsData.map((item) => item.name).reverse(),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'bar',
            data: logisticsData.map((item) => item.value).reverse(),
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
              formatter: '{c}',
            },
          },
        ],
      };
      barChart.setOption(barOption);

      const handleResize = () => barChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        barChart.dispose();
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Line chart
    if (lineChartRef.current) {
      const lineChart = echarts.init(lineChartRef.current);
      const lineOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
        },
        legend: {
          data: ['宁波市', '嘉兴市', '杭州市', '金华市', '湖州市'],
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
          data: monthlyLogisticsData.categories,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        },
        yAxis: {
          type: 'value',
          max: 105,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '宁波市',
            type: 'line',
            data: monthlyLogisticsData.series.宁波市,
            smooth: true,
            lineStyle: { color: '#10b981', width: 3 },
            itemStyle: { color: '#10b981' },
          },
          {
            name: '嘉兴市',
            type: 'line',
            data: monthlyLogisticsData.series.嘉兴市,
            smooth: true,
            lineStyle: { color: '#f59e0b', width: 3 },
            itemStyle: { color: '#f59e0b' },
          },
          {
            name: '杭州市',
            type: 'line',
            data: monthlyLogisticsData.series.杭州市,
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 3 },
            itemStyle: { color: '#3b82f6' },
          },
          {
            name: '金华市',
            type: 'line',
            data: monthlyLogisticsData.series.金华市,
            smooth: true,
            lineStyle: { color: '#8b5cf6', width: 3 },
            itemStyle: { color: '#8b5cf6' },
          },
          {
            name: '湖州市',
            type: 'line',
            data: monthlyLogisticsData.series.湖州市,
            smooth: true,
            lineStyle: { color: '#06b6d4', width: 3 },
            itemStyle: { color: '#06b6d4' },
          },
        ],
      };
      lineChart.setOption(lineOption);

      const handleResize = () => lineChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        lineChart.dispose();
      };
    }
  }, [isVisible]);

  return (
    <section id="logistics" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">区域物流活力分析</h2>
          <p className="text-white/60 text-lg">2025年浙江省各市物流活力指数排名与趋势</p>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">2025年浙江省各市物流活力指数排名</h3>
            <div ref={barChartRef} className="h-80" />
          </div>

          {/* Line chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">物流活力指数Top5全年趋势</h3>
            <div ref={lineChartRef} className="h-80" />
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
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心观点</h4>
              <p className="text-white/70 leading-relaxed">
                <span className="text-cyan-400 font-medium">宁波市、嘉兴市、杭州市</span>
                构成第一梯队，物流活力指数均超过80，彰显长三角核心引擎作用。
                <span className="text-cyan-400 font-medium">宁波市</span>
                依托世界第一大港宁波舟山港，强化外向型物流枢纽功能，呈现出蓬勃的区域物流活力。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
