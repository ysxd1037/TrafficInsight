import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Factory } from 'lucide-react';

// 汽车产业链聚集度真实数据
const industryData = [
  { name: '宁波市', value: 31.3994 },
  { name: '嘉兴市', value: 3.5922 },
  { name: '绍兴市', value: 0.5996 },
  { name: '杭州市', value: 0.4959 },
  { name: '金华市', value: 0.0771 },
  { name: '舟山市', value: 0.0693 },
  { name: '台州市', value: 0.0371 },
  { name: '湖州市', value: 0.0339 },
  { name: '衢州市', value: 0.0038 },
  { name: '温州市', value: 0.0003 },
  { name: '丽水市', value: 0.0002 },
];

const distanceData = [
  { name: '0-50公里', value: 45.2 },
  { name: '50-100公里', value: 40.2 },
  { name: '100-200公里', value: 10.5 },
  { name: '200-300公里', value: 3.1 },
  { name: '300公里以上', value: 1.0 },
];

export default function IndustryCluster() {
  const sectionRef = useRef<HTMLElement>(null);
  const barChartRef = useRef<HTMLDivElement>(null);
  const pieChartRef = useRef<HTMLDivElement>(null);
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
          right: '15%',
          bottom: '3%',
          top: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        yAxis: {
          type: 'category',
          data: industryData.map((item) => item.name).reverse(),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'bar',
            data: industryData.map((item) => item.value).reverse(),
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

    // Pie chart
    if (pieChartRef.current) {
      const pieChart = echarts.init(pieChartRef.current);
      const pieOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c}%',
        },
        legend: {
          orient: 'vertical',
          right: '5%',
          top: 'center',
          textStyle: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 8,
              borderColor: 'rgba(0, 0, 0, 0.5)',
              borderWidth: 2,
            },
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              },
            },
            data: distanceData.map((item, index) => ({
              ...item,
              itemStyle: {
                color: ['#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'][index],
              },
            })),
          },
        ],
      };
      pieChart.setOption(pieOption);

      const handleResize = () => pieChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        pieChart.dispose();
      };
    }
  }, [isVisible]);

  return (
    <section id="industry" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">产业链聚集度分析</h2>
          <p className="text-white/60 text-lg">2025年汽车产业链聚集度指数与供应链分布</p>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">2025年汽车产业链聚集度指数排名</h3>
            <div ref={barChartRef} className="h-80" />
          </div>

          {/* Pie chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">宁波产业园区入园货车出发地距离分布</h3>
            <div ref={pieChartRef} className="h-80" />
          </div>
        </div>

        {/* Insight card */}
        <div
          className={`mt-8 glass-card p-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
              <Factory className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心观点</h4>
              <p className="text-white/70 leading-relaxed">
                2025年汽车产业链聚集度指数呈现
                <span className="text-cyan-400 font-medium">宁波占主导地位</span>，
                嘉兴、绍兴、杭州在产业链中占据重要位置。2025年宁波产业园区
                <span className="text-cyan-400 font-medium">85.4%的入园货车流量集中在100公里范围内</span>，
                这一数据印证了宁波产业园区构建了高度本地化的供应链体系，形成了完整的产业生态圈。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
