
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  CheckCircle, 
  Radar, 
  Globe, 
  Lock,
  Battery,
  BatteryCharging,
  BatteryWarning,
  Activity,
  ArrowDown,
  ArrowUp,
  FileText,
  ChevronRight,
  ShieldQuestion
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
  
  const [batteryInfo, setBatteryInfo] = useState<{ level: number; charging: boolean } | null>(null);
  const [testingSpeed, setTestingSpeed] = useState(false);
  const [speedResult, setSpeedResult] = useState<{ down: string; up: string; ping: string } | null>(null);

  const t = translations[language].health;

  useEffect(() => {
    const paid = localStorage.getItem('phone_master_premium') === 'true';
    setIsPremium(paid);

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBatteryInfo({ level: Math.round(batt.level * 100), charging: batt.charging });
      });
    }
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

  if (showReport) {
    return (
      <div className="p-4 md:p-8 pb-32 h-full animate-in slide-in-from-right-8 duration-500 overflow-y-auto">
        <button onClick={() => setShowReport(false)} className="mb-8 flex items-center text-blue-600 font-black text-[10px] uppercase tracking-widest">
          <ChevronRight className="rotate-180 mr-2" /> Back to Dashboard
        </button>
        
        <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white italic tracking-tighter">Health Report</h2>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Phone Master Verified • 2026</p>
            </div>
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="text-emerald-500 w-10 h-10" />
            </div>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Security Core', status: 'Protected', detail: 'v2.1.0 Stable', color: 'text-emerald-500' },
              { label: 'System Files', status: 'Clean', detail: '14,205 Signatures Checked', color: 'text-emerald-500' },
              { label: 'Battery Health', status: 'Good', detail: 'Normal Performance', color: 'text-emerald-500' },
              { label: 'Memory Usage', status: 'Optimal', detail: 'Low Fragmentation', color: 'text-emerald-500' }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-300">{item.detail}</p>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 bg-blue-600 rounded-[2.5rem] text-white text-center shadow-xl shadow-blue-500/30">
            <h4 className="text-xl font-black italic mb-2">Overall Score: 98/100</h4>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Excellent Device Health</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 pb-32 h-full overflow-y-auto">
      {showPayment && <PaymentModal title="Speed Booster Pro" onClose={() => setShowPayment(false)} onSuccess={() => setIsPremium(true)} />}

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

      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[12px] border-slate-100 dark:border-slate-800 shadow-inner"></div>
          {(scanning || testingSpeed) && (
            <div className={`absolute inset-0 rounded-full border-[12px] border-t-transparent ${activeMode === 'antivirus' ? 'border-blue-600' : 'border-emerald-500'} animate-spin`}></div>
          )}
          
          <div className="z-10 text-center">
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

            {activeMode === 'network' && (
              <div className="animate-in zoom-in">
                <Activity className="w-24 h-24 text-emerald-500 mx-auto mb-4" />
                <p className="text-7xl font-black text-slate-900 dark:text-white italic">{speedResult?.down || '0.0'}</p>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">MB/s Stable</p>
              </div>
            )}
          </div>
        </div>

        {!scanning && (
          <div className="mt-16 w-full max-w-md space-y-4">
            {activeMode === 'antivirus' && scanComplete ? (
              <button 
                onClick={() => setShowReport(true)}
                className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all flex items-center justify-center"
              >
                <FileText className="mr-3 w-6 h-6" /> View Report Card
              </button>
            ) : activeMode === 'antivirus' ? (
              <button onClick={startAntivirusScan} className="w-full py-6 bg-blue-600 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-blue-500/30 active:scale-95 transition-all">
                Run Deep Scan
              </button>
            ) : activeMode === 'network' ? (
               <button className="w-full py-6 bg-emerald-600 text-white rounded-[2.5rem] font-black text-lg shadow-2xl shadow-emerald-500/30 active:scale-95 transition-all">
                Optimize Connection
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
    </div>
  );
};
