import { useState, useEffect } from 'react';
import { BarChart3, Menu, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const economyNavItems = [
  { id: 'summary', label: '研究摘要' },
  { id: 'vitality', label: '经济活力' },
  { id: 'connection', label: '城际连接' },
  { id: 'logistics', label: '物流活力' },
  { id: 'green', label: '绿色交通' },
  { id: 'industry', label: '产业聚集' },
  { id: 'corridor', label: '经济走廊' },
  { id: 'conclusion', label: '结论展望' },
];

const livelihoodNavItems = [
  { id: 'summary', label: '研究摘要' },
  { id: 'commute', label: '跨区域通勤' },
  { id: 'logistics', label: '物流保障' },
  { id: 'green', label: '绿色出行' },
  { id: 'resilience', label: '路网韧性' },
  { id: 'conclusion', label: '结论展望' },
];

interface NavigationProps {
  reportType: 'economy' | 'livelihood';
}

export default function Navigation({ reportType }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();

  const navItems = reportType === 'economy' ? economyNavItems : livelihoodNavItems;
  const reportTitle = reportType === 'economy' ? '交通看·区域经济' : '交通看·民生';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = navItems.map((item) => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = section.element.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 hover:bg-white/5 px-3 py-2 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-cyan-400" />
                </div>
                <span className="text-white font-semibold hidden sm:block">{reportTitle}</span>
                {isDropdownOpen ? (
                  <ChevronUp className="w-4 h-4 text-white/60" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/60" />
                )}
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-white/10 rounded-xl shadow-xl overflow-hidden">
                  <Link
                    to="/"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      location.pathname === '/' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <div className="font-medium">交通看·区域经济</div>
                      <div className="text-xs text-white/50">浙江省区域经济分析</div>
                    </div>
                  </Link>
                  <Link
                    to="/livelihood"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                      location.pathname === '/livelihood'
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-white/80 hover:bg-white/5'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <BarChart3 className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <div className="font-medium">交通看·民生</div>
                      <div className="text-xs text-white/50">大众出行分析</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    activeSection === item.id
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-16 left-4 right-4 bg-card border border-white/10 rounded-xl p-4 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          {/* Report switch in mobile menu */}
          <div className="mb-4 pb-4 border-b border-white/10">
            <div className="text-xs text-white/50 mb-2">切换报告</div>
            <div className="flex gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm text-center transition-all ${
                  location.pathname === '/' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/60'
                }`}
              >
                区域经济
              </Link>
              <Link
                to="/livelihood"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm text-center transition-all ${
                  location.pathname === '/livelihood' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-white/60'
                }`}
              >
                民生
              </Link>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full px-4 py-3 rounded-lg text-left transition-all ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
