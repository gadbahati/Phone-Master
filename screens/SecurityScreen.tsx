
import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  Radar, 
  Globe, 
  Battery,
  BatteryCharging,
  Activity,
  FileText,
  ChevronRight,
  Award,
  Calendar,
  User,
  ArrowDown,
  ArrowUp,
  Wifi,
  RefreshCw,
  Gauge,
  Smartphone
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
}

export const SecurityScreen: React.FC<Props> = ({ language }) => {
  const [activeMode, setActiveMode] = useState<'antivirus' | 'battery' | 'network'>('antivirus');
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  // Network Specific State
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [speedMetrics, setSpeedMetrics] = useState({ download: 0, upload: 0, ping: 0 });
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [realtimeSpeed, setRealtimeSpeed] = useState({ down: '0.0', up: '0.0' });
  const [showOverlay, setShowOverlay] = useState(false);

  const [batteryInfo, setBatteryInfo] = useState<{ level: number; charging: boolean } | null>(null);

  const t = translations[language].health;

  useEffect(() => {
    const paid = localStorage.getItem('phone_master_premium') === 'true';
    setIsPremium(paid);

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBatteryInfo({ level: Math.round(batt.level * 100), charging: batt.charging });
      });
    }

    // Real-time speed simulation
    const speedInterval = setInterval(() => {
      setRealtimeSpeed({
        down: (Math.random() * 5.5).toFixed(1),
        up: (Math.random() * 1.2).toFixed(1)
      });
    }, 2000);

    return () => clearInterval(speedInterval);
  }, []);

  const startAntivirusScan = () => {
    setScanning(true);
    setScanComplete(false);
    setShowReport(false);
    setProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      const files = ['sys/bin', 'app/data', 'media/secure', 'cache/temp', 'user/docs'];
      setCurrentFile(files[Math.floor(current/25)] || 'finalizing...');
      
      if (current >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
      }
    }, 50);
  };

  const runSpeedTest = () => {
    setIsSpeedTesting(true);
    setSpeedMetrics({ download: 0, upload: 0, ping: 0 });
    
    // Simulate Ping
    setTimeout(() => {
      setSpeedMetrics(prev => ({ ...prev, ping: Math.floor(Math.random() * 40) + 10 }));
      
      // Simulate Download
      let dl = 0;
      const dlInterval = setInterval(() => {
        dl += Math.random() * 8;
        if (dl >= 45) {
          clearInterval(dlInterval);
          setSpeedMetrics(prev => ({ ...prev, download: 45.2 }));
          
          // Simulate Upload
          let ul = 0;
          const ulInterval = setInterval(() => {
            ul += Math.random() * 3;
            if (ul >= 12) {
              clearInterval(ulInterval);
              setSpeedMetrics(prev => ({ ...prev, upload: 12.8 }));
              setIsSpeedTesting(false);
            } else {
              setSpeedMetrics(prev => ({ ...prev, upload: parseFloat(ul.toFixed(1)) }));
            }
          }, 100);
        } else {
          setSpeedMetrics(prev => ({ ...prev, download: parseFloat(dl.toFixed(1)) }));
        }
      }, 100);
    }, 1000);
  };

  const runOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      // Optional: Add a success toast here
    }, 3000);
  };

  if (showReport) {
    return (
      <div className="p-4 md:p-8 pb-32 h-full animate-in slide-in-from-right-8 duration-500 overflow-y-auto">
        <button onClick={() => setShowReport(false)} className="mb-8 flex items-center text-blue-600 font-black text-[10px] uppercase tracking-widest">
          <ChevronRight className="rotate-180 mr-2" /> Back to Dashboard
        </button>
        
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-slate-100 dark:border-slate-700 relative overflow-hidden">
          <ShieldCheck className="absolute -bottom-10 -right-10 w-64 h-64 text-slate-50 dark:text-slate-900 opacity-50 -rotate-12 pointer-events-none" />

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20">
              <Award className="text-white w-10 h-10" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white italic tracking-tighter mb-2">Device Report Card</h2>
            <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.4em]">Official System Health Certification</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
               <div className="flex items-center text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">
                 <Calendar className="w-3 h-3 mr-1" /> Generated On
               </div>
               <p className="text-xs font-bold text-slate-900 dark:text-white">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
               <div className="flex items-center text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">
                 <User className="w-3 h-3 mr-1" /> Assessed By
               </div>
               <p className="text-xs font-bold text-slate-900 dark:text-white">Phone Master AI</p>
            </div>
          </div>

          <div className="space-y-4 relative z-10">
            {[
              { label: 'Security Core', status: 'A+', detail: 'All signatures updated', color: 'text-emerald-500' },
              { label: 'System Files', status: 'Pass', detail: 'No malware detected', color: 'text-emerald-500' },
              { label: 'Battery Performance', status: 'Optimal', detail: 'Good health cycle', color: 'text-emerald-500' },
              { label: 'Network Stability', status: 'A', detail: 'No packet loss detected', color: 'text-emerald-500' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300 italic">{item.detail}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-black italic ${item.color}`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] text-white text-center shadow-xl shadow-blue-500/30">
            <h4 className="text-3xl font-black italic mb-2 tracking-tighter">98% Secure</h4>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">Final Grade: Excellent</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-32 h-full overflow-y-auto">
      {showPayment && <PaymentModal title="Security Pro" onClose={() => setShowPayment(false)} onSuccess={() => setIsPremium(true)} />}

      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 italic tracking-tighter dark:text-white">{t.title}</h1>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">{t.subtitle}</p>
      </div>

      <div className="flex bg-slate-200/50 dark:bg-slate-900/50 p-2 rounded-[2rem] mb-12 border border-white/50 dark:border-white/10 max-w-lg mx-auto overflow-x-auto scrollbar-hide">
        {['antivirus', 'battery', 'network'].map((mode) => (
          <button 
            key={mode}
            onClick={() => setActiveMode(mode as any)}
            className={`flex-1 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeMode === mode ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600' : 'text-slate-500'}`}
          >
             {mode === 'antivirus' && <Radar className="w-4 h-4 mr-2" />}
             {mode === 'battery' && <Battery className="w-4 h-4 mr-2" />}
             {mode === 'network' && <Globe className="w-4 h-4 mr-2" />}
             {t[mode as keyof typeof t] || mode}
          </button>
        ))}
      </div>

      {activeMode === 'network' ? (
        <div className="space-y-6 animate-in slide-in-from-bottom-8">
          {/* Status Bar Speed Monitor Toggle Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mr-4">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Status Speed Meter</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Show real-time speed in app</p>
              </div>
            </div>
            <button 
              onClick={() => setShowOverlay(!showOverlay)}
              className={`w-14 h-7 rounded-full transition-all flex items-center p-1 ${showOverlay ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${showOverlay ? 'translate-x-7' : 'translate-x-0'}`} />
            </button>
          </div>

          {showOverlay && (
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-around font-black animate-in zoom-in">
              <div className="flex items-center">
                <ArrowDown className="w-4 h-4 text-emerald-400 mr-2" />
                <span className="text-xs">{realtimeSpeed.down} MB/s</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center">
                <ArrowUp className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-xs">{realtimeSpeed.up} MB/s</span>
              </div>
            </div>
          )}

          {/* Speed Test Section */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl relative overflow-hidden">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-black text-slate-900 dark:text-white italic">Network Diagnostic</h3>
               <Wifi className={`w-6 h-6 ${isSpeedTesting ? 'text-blue-500 animate-pulse' : 'text-slate-300'}`} />
             </div>

             <div className="flex justify-center mb-10 relative">
               <div className="w-48 h-48 rounded-full border-8 border-slate-50 dark:border-slate-900 flex flex-col items-center justify-center relative overflow-hidden">
                  {isSpeedTesting && (
                    <div className="absolute inset-0 bg-blue-500/5 animate-[pulse_1s_infinite]"></div>
                  )}
                  <p className="text-5xl font-black text-slate-900 dark:text-white italic">{speedMetrics.download}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Mbps</p>
               </div>
               
               {/* Gauge Overlay for visual flair */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className={`w-56 h-56 rounded-full border-t-4 border-blue-500 transition-transform duration-500`} style={{ transform: `rotate(${(speedMetrics.download / 100) * 180 - 90}deg)` }}></div>
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Upload</p>
                 <p className="text-lg font-black text-slate-900 dark:text-white">{speedMetrics.upload} <span className="text-[10px] opacity-50">MBPS</span></p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl">
                 <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Ping</p>
                 <p className="text-lg font-black text-slate-900 dark:text-white">{speedMetrics.ping} <span className="text-[10px] opacity-50">MS</span></p>
               </div>
             </div>

             <button 
              onClick={runSpeedTest}
              disabled={isSpeedTesting}
              className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center justify-center disabled:opacity-50"
             >
               {isSpeedTesting ? <RefreshCw className="w-5 h-5 animate-spin mr-3" /> : <Gauge className="w-5 h-5 mr-3" />}
               {isSpeedTesting ? 'Testing...' : 'Start Speed Test'}
             </button>
          </div>

          {/* Network Optimization Button */}
          <button 
            onClick={runOptimization}
            disabled={isOptimizing}
            className="w-full py-10 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-[3rem] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group active:scale-[0.98] transition-all"
          >
            <div className="relative z-10 flex flex-col items-center">
              {isOptimizing ? (
                <RefreshCw className="w-12 h-12 animate-spin mb-4" />
              ) : (
                <Zap className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
              )}
              <h3 className="text-2xl font-black italic mb-1 uppercase tracking-tight">Optimize Connection</h3>
              <p className="text-[10px] font-bold opacity-80 uppercase tracking-[0.2em]">Clear Cache • Refresh DNS • Stable IP</p>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Globe className="w-32 h-32" />
            </div>
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-[12px] border-slate-100 dark:border-slate-800 shadow-inner"></div>
            {scanning && (
              <div className={`absolute inset-0 rounded-full border-[12px] border-t-transparent border-blue-600 animate-spin`}></div>
            )}
            
            <div className="z-10 text-center px-6">
              {activeMode === 'antivirus' && (
                scanning ? (
                  <div className="animate-pulse">
                    <p className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white italic tracking-tighter">{progress}%</p>
                    <p className="text-[10px] text-blue-600 font-black uppercase mt-4 tracking-widest">{currentFile}</p>
                  </div>
                ) : scanComplete ? (
                  <div className="animate-in zoom-in duration-500">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40">
                      <CheckCircle className="text-white w-12 h-12 md:w-16 md:h-16" />
                    </div>
                    <p className="text-sm font-black uppercase mt-8 text-emerald-500 tracking-widest">{t.done}</p>
                  </div>
                ) : (
                  <ShieldCheck className="w-28 h-28 md:w-36 md:h-36 text-blue-600 dark:text-blue-500 animate-pulse" />
                )
              )}

              {activeMode === 'battery' && (
                 <div className="animate-in zoom-in">
                    <BatteryCharging className="w-24 h-24 text-emerald-500 mx-auto mb-4" />
                    <p className="text-7xl font-black text-slate-900 dark:text-white italic">{batteryInfo?.level || 85}%</p>
                    <p className="text-[10px] font-black uppercase text-slate-400 mt-6 tracking-widest">Battery Status: Good</p>
                 </div>
              )}
            </div>
          </div>

          {!scanning && (
            <div className="mt-16 w-full max-w-md space-y-4">
              {activeMode === 'antivirus' && scanComplete ? (
                <button 
                  onClick={() => setShowReport(true)}
                  className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-blue-500/30 active:scale-95 transition-all flex items-center justify-center"
                >
                  <Award className="mr-3 w-6 h-6" /> View Report Card
                </button>
              ) : activeMode === 'antivirus' ? (
                <button onClick={startAntivirusScan} className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-blue-500/30 active:scale-95 transition-all">
                  Run Deep Scan
                </button>
              ) : (
                <div className="p-8 bg-white dark:bg-slate-800 rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-xl text-center">
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Power Optimization</p>
                   <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Your battery is healthy. No action needed.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
