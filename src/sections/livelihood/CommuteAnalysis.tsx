import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { Users, Clock, AlertTriangle } from 'lucide-react';

const commuteScaleData = [
  { name: '杭州市<->绍兴市', fuel: 739353, newEnergy: 236128, ratio: 0.201 },
  { name: '杭州市<->嘉兴市', fuel: 649056, newEnergy: 209606, ratio: 0.176 },
  { name: '杭州市<->湖州市', fuel: 581931, newEnergy: 165745, ratio: 0.158 },
  { name: '杭州市<->金华市', fuel: 252846, newEnergy: 71357, ratio: 0.069 },
  { name: '杭州市<->宁波市', fuel: 208344, newEnergy: 56739, ratio: 0.057 },
];

// 双峰分布数据 - 通勤时长分布（根据图片数据）
const commuteTimeDistributionData = [
  { time: '0.3-0.4', count: 25 },
  { time: '0.4-0.5', count: 58 },
  { time: '0.5-0.6', count: 112 },
  { time: '0.6-0.7', count: 148 },
  { time: '0.7-0.8', count: 125 },
  { time: '0.8-0.9', count: 89 },
  { time: '0.9-1.0', count: 62 },
  { time: '1.0-1.2', count: 45 },
  { time: '1.2-1.5', count: 38 },
  { time: '1.5-1.8', count: 52 },
  { time: '1.8-2.0', count: 79 },
  { time: '2.0-2.2', count: 68 },
  { time: '2.2-2.5', count: 42 },
  { time: '2.5+', count: 35 },
];

// 极端通勤数据 - 使用新的数据格式
const extremeCommuteData = [
  { name: '202501', fuel: 0.037, newEnergy: 0.056 },
  { name: '202502', fuel: 0.027, newEnergy: 0.041 },
  { name: '202503', fuel: 0.040, newEnergy: 0.054 },
  { name: '202504', fuel: 0.043, newEnergy: 0.060 },
  { name: '202505', fuel: 0.041, newEnergy: 0.061 },
  { name: '202506', fuel: 0.040, newEnergy: 0.053 },
  { name: '202507', fuel: 0.038, newEnergy: 0.053 },
  { name: '202508', fuel: 0.040, newEnergy: 0.058 },
  { name: '202509', fuel: 0.044, newEnergy: 0.059 },
  { name: '202510', fuel: 0.037, newEnergy: 0.051 },
  { name: '202511', fuel: 0.038, newEnergy: 0.052 },
  { name: '202512', fuel: 0.041, newEnergy: 0.054 },
];

export default function CommuteAnalysis() {
  const sectionRef = useRef<HTMLElement>(null);
  const scaleChartRef = useRef<HTMLDivElement>(null);
  const timeDistChartRef = useRef<HTMLDivElement>(null);
  const extremeChartRef = useRef<HTMLDivElement>(null);
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

    if (scaleChartRef.current) {
      const chart = echarts.init(scaleChartRef.current);
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
          data: ['燃油车通勤流量', '新能源车通勤流量'],
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
          data: commuteScaleData.map((item) => item.name.replace('杭州市<->', '杭州<->')),
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
            name: '燃油车通勤流量',
            type: 'bar',
            stack: 'total',
            data: commuteScaleData.map((item) => item.fuel),
            itemStyle: { color: '#3b82f6' },
          },
          {
            name: '新能源车通勤流量',
            type: 'bar',
            stack: 'total',
            data: commuteScaleData.map((item) => item.newEnergy),
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

  // 双峰分布图表
  useEffect(() => {
    if (!isVisible) return;

    if (timeDistChartRef.current) {
      const chart = echarts.init(timeDistChartRef.current);
      const option: echarts.EChartsOption = {
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderColor: 'rgba(34, 211, 238, 0.3)',
          textStyle: { color: '#fff' },
          formatter: '{b}小时: {c}次',
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '18%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: commuteTimeDistributionData.map((item) => item.time),
          name: '通勤时长（小时）',
          nameLocation: 'middle',
          nameGap: 30,
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
        },
        yAxis: {
          type: 'value',
          name: '频次',
          nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)' },
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            type: 'bar',
            data: commuteTimeDistributionData.map((item, index) => {
              // 0.6-0.7小时区间（杭州都市圈）用青色高亮
              const isHangzhouCircle = index === 3;
              // 1.8-2.0小时区间（中长距离）用橙色高亮 - 仅覆盖52、79、68三个柱子
              const isLongDistance = index === 9 || index === 10 || index === 11;
              return {
                value: item.count,
                itemStyle: {
                  color: isHangzhouCircle
                    ? '#06b6d4'
                    : isLongDistance
                    ? '#f59e0b'
                    : '#3b82f6',
                },
              };
            }),
            barWidth: '60%',
            label: {
              show: true,
              position: 'top',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: 10,
            },
            markArea: {
              silent: true,
              data: [
                [
                  {
                    name: '杭州都市圈\n(0.6-0.7h)',
                    xAxis: '0.5-0.6',
                    itemStyle: { color: 'rgba(6, 182, 212, 0.15)' },
                    label: { 
                      color: '#06b6d4',
                      fontSize: 10,
                      position: 'insideTop',
                      distance: 0,
                      offset: [0, -20],
                    },
                  },
                  { xAxis: '0.7-0.8' },
                ],
                [
                  {
                    name: '中长距离出行\n(1.8-2.0h)',
                    xAxis: '1.5-1.8',
                    itemStyle: { color: 'rgba(245, 158, 11, 0.15)' },
                    label: { 
                      color: '#f59e0b',
                      fontSize: 10,
                      position: 'insideTop',
                      distance: 0,
                      offset: [0, -20],
                    },
                  },
                  { xAxis: '2.0-2.2' },
                ],
              ],
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

    if (extremeChartRef.current) {
      const chart = echarts.init(extremeChartRef.current);
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
          data: ['燃油车极端通勤占比', '新能源车极端通勤占比'],
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
          data: extremeCommuteData.map((item) => item.name.replace('2025', '') + '月'),
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
        },
        yAxis: {
          type: 'value',
          axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
          axisLabel: { color: 'rgba(255, 255, 255, 0.6)', formatter: '{value}%' },
          splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
        },
        series: [
          {
            name: '燃油车极端通勤占比',
            type: 'line',
            data: extremeCommuteData.map((item) => item.fuel),
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 2 },
            itemStyle: { color: '#3b82f6' },
          },
          {
            name: '新能源车极端通勤占比',
            type: 'line',
            data: extremeCommuteData.map((item) => item.newEnergy),
            smooth: true,
            lineStyle: { color: '#10b981', width: 2 },
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
    <section id="commute" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">跨区域通勤分析</h2>
          <p className="text-white/60 text-lg">通勤规模、时耗与极端通勤情况分析</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div
            className={`glass-card p-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">通勤车辆规模 TOP5</h3>
            </div>
            <div ref={scaleChartRef} className="h-72" />
          </div>

          <div
            className={`glass-card p-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">通勤时长双峰分布</h3>
            </div>
            <div ref={timeDistChartRef} className="h-72" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            className={`lg:col-span-2 glass-card p-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">极端通勤流量占比趋势</h3>
            </div>
            <div ref={extremeChartRef} className="h-64" />
          </div>

          <div
            className={`glass-card p-6 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h4 className="text-lg font-semibold text-white mb-4">核心洞察</h4>
            <div className="space-y-4 text-white/70 text-sm leading-relaxed">
              <p>
                <span className="text-cyan-400 font-medium">杭州市&lt;-&gt;绍兴市</span>
                通勤流量高达975,481辆次/年，为全省最高，凸显"杭绍一体化"已进入深度协同阶段
              </p>
              <p>
                <span className="text-cyan-400 font-medium">杭绍、杭嘉、杭湖</span>
                三者合计占全省通勤流量的50%以上，反映核心城市通勤集中
              </p>
              <p>
                通勤时长呈现<span className="text-cyan-400 font-medium">"双峰分布"</span>
                特征：0.6-0.7小时主要为杭州-绍兴、杭州-湖州、杭州-嘉兴、湖州-嘉兴，体现杭州城市圈；
                2.0小时集中于中长距离出行，典型路径包括杭州到台州、杭州到舟山、金华到温州、湖州到金华
              </p>
              <p>
                极端通勤（单程超过60分钟）整体占比很低，在
                <span className="text-cyan-400 font-medium">0.03%-0.05%</span>
                左右浮动
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
