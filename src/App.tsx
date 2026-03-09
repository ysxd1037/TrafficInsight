import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './sections/Navigation';

// Economy report sections
import EconomyHero from './sections/Hero';
import EconomySummary from './sections/Summary';
import EconomicVitality from './sections/EconomicVitality';
import IntercityConnection from './sections/IntercityConnection';
import LogisticsVitality from './sections/LogisticsVitality';
import GreenTransport from './sections/GreenTransport';
import IndustryCluster from './sections/IndustryCluster';
import EconomicCorridor from './sections/EconomicCorridor';
import EconomyConclusion from './sections/Conclusion';

// Livelihood report sections
import LivelihoodHero from './sections/livelihood/Hero';
import LivelihoodSummary from './sections/livelihood/Summary';
import CommuteAnalysis from './sections/livelihood/CommuteAnalysis';
import LogisticsSupport from './sections/livelihood/LogisticsSupport';
import GreenTravel from './sections/livelihood/GreenTravel';
import NetworkResilience from './sections/livelihood/NetworkResilience';
import LivelihoodConclusion from './sections/livelihood/Conclusion';

function EconomyReport() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation reportType="economy" />
      <main>
        <EconomyHero />
        <EconomySummary />
        <EconomicVitality />
        <IntercityConnection />
        <LogisticsVitality />
        <GreenTransport />
        <IndustryCluster />
        <EconomicCorridor />
        <EconomyConclusion />
      </main>
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            2025 交通看·区域经济 | 基于高速公路通行数据的浙江省区域经济分析报告
          </p>
        </div>
      </footer>
    </div>
  );
}

function LivelihoodReport() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation reportType="livelihood" />
      <main>
        <LivelihoodHero />
        <LivelihoodSummary />
        <CommuteAnalysis />
        <LogisticsSupport />
        <GreenTravel />
        <NetworkResilience />
        <LivelihoodConclusion />
      </main>
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/40 text-sm">
            2025 交通看·民生 | 基于高速公路通行数据的浙江省大众出行分析报告
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EconomyReport />} />
        <Route path="/livelihood" element={<LivelihoodReport />} />
      </Routes>
    </Router>
  );
}

export default App;
