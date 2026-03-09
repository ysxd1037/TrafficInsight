import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Lightbulb } from 'lucide-react';

const cityData = [
  { name: '杭州市', value: 5238.97, gdpRank: 1 },
  { name: '宁波市', value: 3396.52, gdpRank: 2 },
  { name: '嘉兴市', value: 2301.99, gdpRank: 5 },
  { name: '湖州市', value: 2025.43, gdpRank: 8 },
  { name: '金华市', value: 1966.68, gdpRank: 7 },
  { name: '绍兴市', value: 1710.07, gdpRank: 4 },
  { name: '温州市', value: 1276.23, gdpRank: 3 },
  { name: '台州市', value: 1227.12, gdpRank: 6 },
  { name: '衢州市', value: 1013.20, gdpRank: 9 },
  { name: '舟山市', value: 823.60, gdpRank: 10 },
  { name: '丽水市', value: 760.85, gdpRank: 11 },
];

const monthlyData = {
  categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  series: {
    杭州市: [4200, 3800, 5100, 4800, 4900, 5000, 5200, 5300, 5800, 5400, 5500, 5600],
    宁波市: [2800, 2500, 3400, 3200, 3300, 3400, 3500, 3600, 3900, 3600, 3700, 3800],
    嘉兴市: [1800, 1600, 2300, 2100, 2200, 2300, 2400, 2500, 2800, 2500, 2600, 2700],
    金华市: [1500, 1400, 2000, 1800, 1900, 1950, 2000, 2050, 2300, 2100, 2150, 2200],
  },
};

export default function EconomicVitality() {
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
          right: '18%',
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
          data: cityData.map((item) => item.name).reverse(),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.8)' },
        },
        series: [
          {
            type: 'bar',
            data: cityData.map((item) => item.value).reverse(),
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                { offset: 0, color: '#06b6d4' },
                { offset: 1, color: '#3b82f6' },
              ]),
              borderRadius: [0, 4, 4, 0],
            },
            label: {
              show: true,
              position: 'right',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 11,
              formatter: (params: any) => {
                const data = cityData.find((item) => item.name === params.name);
                return `{value|${params.value}}{gdp|（GDP第${data?.gdpRank}名）}`;
              },
              rich: {
                value: {
                  fontSize: 12,
                  color: 'rgba(255, 255, 255, 0.9)',
                },
                gdp: {
                  fontSize: 10,
                  color: 'rgba(255, 255, 255, 0.6)',
                },
              },
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
          data: ['杭州市', '宁波市', '嘉兴市', '金华市'],
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
          data: monthlyData.categories,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '杭州市',
            type: 'line',
            data: monthlyData.series.杭州市,
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
            name: '宁波市',
            type: 'line',
            data: monthlyData.series.宁波市,
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 3 },
            itemStyle: { color: '#3b82f6' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0)' },
              ]),
            },
          },
          {
            name: '嘉兴市',
            type: 'line',
            data: monthlyData.series.嘉兴市,
            smooth: true,
            lineStyle: { color: '#8b5cf6', width: 3 },
            itemStyle: { color: '#8b5cf6' },
          },
          {
            name: '金华市',
            type: 'line',
            data: monthlyData.series.金华市,
            smooth: true,
            lineStyle: { color: '#10b981', width: 3 },
            itemStyle: { color: '#10b981' },
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
    <section
      id="vitality"
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            区域经济活力分析
          </h2>
          <p className="text-white/60 text-lg">
            2025年浙江省各市经济活力指数排名与趋势
          </p>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              2025年浙江省各市经济活力指数
            </h3>
            <div ref={barChartRef} className="h-80" />
          </div>

          {/* Line chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h3 className="text-lg font-semibold text-white mb-4">
              经济活力指数Top4全年趋势
            </h3>
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
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">
                核心观点
              </h4>
              <p className="text-white/70 leading-relaxed">
                <span className="text-cyan-400 font-medium">杭州市、宁波市</span>
                的经济活力指数为第一梯队，与GDP排名一致。杭州市依托长三角核心枢纽地位以及电子商务之都快递物流业务量巨大，宁波依托舟山港世界第一大港的港口经济驱动。
                <span className="text-cyan-400 font-medium">杭州市、宁波市、嘉兴市、金华市</span>
                的经济活力指数在3月、9月出现明显抬升，与跨境电商企业的备货周期高度吻合。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
