import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Truck, Package } from 'lucide-react';

const greenChannelCityData = [
  { name: '杭州市', inside: 100, outside: 100 },
  { name: '温州市', inside: 45.99, outside: 29.45 },
  { name: '台州市', inside: 40.51, outside: 14.48 },
  { name: '宁波市', inside: 38.24, outside: 10.89 },
  { name: '绍兴市', inside: 35.37, outside: 7.84 },
  { name: '金华市', inside: 31.03, outside: 22.73 },
  { name: '嘉兴市', inside: 25.79, outside: 41.77 },
  { name: '舟山市', inside: 10.95, outside: 0.95 },
  { name: '丽水市', inside: 9.64, outside: 1.8 },
  { name: '衢州市', inside: 6.21, outside: 8.73 },
  { name: '湖州市', inside: 6.69, outside: 9.16 },
];

const productDistributionData = [
  { name: '水果', value: 213991 },
  { name: '蔬菜', value: 201318 },
  { name: '水产', value: 119587 },
  { name: '肉蛋奶', value: 54829 },
  { name: '其他', value: 11236 },
];

export default function LogisticsSupport() {
  const sectionRef = useRef<HTMLElement>(null);
  const cityChartRef = useRef<HTMLDivElement>(null);
  const productChartRef = useRef<HTMLDivElement>(null);
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

    if (cityChartRef.current) {
      const chart = echarts.init(cityChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
        },
        legend: {
          data: ['省内', '省外'],
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
          data: greenChannelCityData.map((item) => item.name),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', rotate: 30, fontSize: 10 },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '省内',
            type: 'bar',
            data: greenChannelCityData.map((item) => item.inside),
            itemStyle: { color: '#10b981' },
          },
          {
            name: '省外',
            type: 'bar',
            data: greenChannelCityData.map((item) => item.outside),
            itemStyle: { color: '#3b82f6' },
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

    if (productChartRef.current) {
      const chart = echarts.init(productChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c} ({d}%)',
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
            data: productDistributionData.map((item, index) => ({
              ...item,
              itemStyle: {
                color: ['#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#f59e0b'][index],
              },
            })),
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
    <section id="logistics" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">生活物资物流保障</h2>
          <p className="text-white/60 text-lg">"绿色通道"车辆规模与农产品运输结构分析</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">2025年7月省内外到各市区绿色通道规模指数</h3>
            </div>
            <div ref={cityChartRef} className="h-80" />
          </div>

          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Package className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">绿色通道车辆规模产品分布</h3>
            </div>
            <div ref={productChartRef} className="h-80" />
          </div>
        </div>

        <div
          className={`mt-8 glass-card p-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-2">核心洞察</h4>
              <p className="text-white/70 leading-relaxed">
                "绿色通道"车辆规模指数呈现
                <span className="text-cyan-400 font-medium">"中心城市+特色产区"</span>
                双高格局。
                <span className="text-cyan-400 font-medium">杭州市</span>
                稳居首位，不仅因其为全省最大消费市场，还因承担全省农产品集散功能——大量来自金华、丽水、衢州等地的生鲜经杭州中转分销至长三角。
                运输结构高度集中于
                <span className="text-cyan-400 font-medium">水果、蔬菜类，二者合计占比达69%</span>。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
