import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Truck, Car } from 'lucide-react';

const truckData = [28, 25, 42, 45, 48, 50, 52, 53, 55.56, 54, 56, 58.93];
const carData = [72, 75, 58, 55, 52, 50, 48, 47, 44.44, 46, 44, 41.07];

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function EconomicCorridor() {
  const sectionRef = useRef<HTMLElement>(null);
  const truckChartRef = useRef<HTMLDivElement>(null);
  const carChartRef = useRef<HTMLDivElement>(null);
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

    // Truck chart
    if (truckChartRef.current) {
      const truckChart = echarts.init(truckChartRef.current);
      const truckOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c}%',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        },
        yAxis: {
          type: 'value',
          max: 70,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', formatter: '{value}%' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            type: 'line',
            data: truckData,
            smooth: true,
            lineStyle: { color: '#f59e0b', width: 3 },
            itemStyle: { color: '#f59e0b' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(245, 158, 11, 0.4)' },
                { offset: 1, color: 'rgba(245, 158, 11, 0)' },
              ]),
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值', itemStyle: { color: '#ef4444' } },
                { type: 'min', name: '最小值', itemStyle: { color: '#3b82f6' } },
              ],
              label: { color: '#fff' },
            },
          },
        ],
      };
      truckChart.setOption(truckOption);

      const handleResize = () => truckChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        truckChart.dispose();
      };
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Car chart
    if (carChartRef.current) {
      const carChart = echarts.init(carChartRef.current);
      const carOption: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}: {c}%',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '10%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: months,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
        },
        yAxis: {
          type: 'value',
          max: 80,
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', formatter: '{value}%' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            type: 'line',
            data: carData,
            smooth: true,
            lineStyle: { color: '#06b6d4', width: 3 },
            itemStyle: { color: '#06b6d4' },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(6, 182, 212, 0.4)' },
                { offset: 1, color: 'rgba(6, 182, 212, 0)' },
              ]),
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值', itemStyle: { color: '#10b981' } },
                { type: 'min', name: '最小值', itemStyle: { color: '#ef4444' } },
              ],
              label: { color: '#fff' },
            },
          },
        ],
      };
      carChart.setOption(carOption);

      const handleResize = () => carChart.resize();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        carChart.dispose();
      };
    }
  }, [isVisible]);

  return (
    <section
      id="corridor"
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
            经济走廊车流分析
          </h2>
          <p className="text-white/60 text-lg">
            2025年义甬舟开放大通道车流量占比趋势
          </p>
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Truck flow chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                义甬舟开放大通道货车流量占比趋势
              </h3>
            </div>
            <div ref={truckChartRef} className="h-80" />
          </div>

          {/* Car flow chart */}
          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Car className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                义甬舟开放大通道客车流量占比趋势
              </h3>
            </div>
            <div ref={carChartRef} className="h-80" />
          </div>
        </div>

        {/* Insight cards */}
        <div
          className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-400" />
              货车流量分析
            </h4>
            <p className="text-white/70 leading-relaxed text-sm">
              义甬舟开放大通道全年货车流量占比呈现显著季节性波动，2月受春节假期影响跌至低谷，
              3月复工复产指数反弹，9月<span className="text-amber-400 font-medium">"金九银十"</span>
              出口旺季指数提升，12月圣诞订单出货高峰达到
              <span className="text-amber-400 font-medium">58.93%</span>峰值。
            </p>
          </div>

          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Car className="w-5 h-5 text-cyan-400" />
              客车流量分析
            </h4>
            <p className="text-white/70 leading-relaxed text-sm">
              义甬舟开放大通道全年客车流量占比呈现显著季节性波动，2月受春节假期高速公路免费通行政策影响，
              客车流量占比飙升至峰值；3月节后指数回落；9月"金九银十"出口旺季货车流量增加，
              客车占比跌至低谷；12月圣诞订单出货高峰，客车占比降至全年最低。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
