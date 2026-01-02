
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Zap, 
  CheckCircle, 
  RefreshCw,
  Radar,
  Activity,
  Globe,
  Lock,
  BarChart3,
  Search
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { antivirusService } from '../services/antivirusService';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
}

export const SecurityScreen: React.FC<Props> = ({ language }) => {
  const [activeMode, setActiveMode] = useState<'antivirus' | 'optimizer' | 'network'>('antivirus');
  const [scanning, setScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFile, setCurrentFile] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [foundThreats, setFoundThreats] = useState<string[]>([]);
  const [scannedCount, setScannedCount] = useState(0);
  const [netSpeed] = useState({ up: '2.4', down: '18.5' });

  const t = translations[language].health;

  useEffect(() => {
    const paid = localStorage.getItem('phone_master_premium') === 'true';
    setIsPremium(paid);
  }, []);

  const appsToScan = [
    'WhatsApp', 'Facebook', 'TikTok', 'Instagram', 'M-PESA', 'Chrome', 'Gmail', 'YouTube', 
    'Settings', 'Camera', 'Gallery', 'Messages', 'Phone', 'Contacts', 'Calculator'
  ];

  const startAntivirusScan = () => {
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    setScannedCount(0);
    setFoundThreats([]);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      setScannedCount(prev => prev + Math.floor(Math.random() * 2));
      
      const appIndex = Math.floor((current / 100) * appsToScan.length);
      setCurrentFile(`${t.apps} ${appsToScan[appIndex % appsToScan.length]}`);
      
      if (current >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
        // Small chance to find "threat" (simulated)
        if (Math.random() > 0.95) setFoundThreats(['Suspect Cache Found']);
      }
    }, 40);
  };

  const startOptimization = () => {
    if (!isPremium) { setShowPayment(true); return; }
    setScanning(true);
    setScanComplete(false);
    setProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      setCurrentFile(['Clearing Cache', 'Killing Background Tasks', 'Optimizing RAM', 'Boosting CPU'][Math.floor(current / 26)]);
      if (current >= 100) {
        clearInterval(interval);
        setScanning(false);
        setScanComplete(true);
      }
    }, 30);
  };

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      {showPayment && (
        <PaymentModal 
          title="Speed Booster Pro" 
          onClose={() => setShowPayment(false)} 
          onSuccess={() => { setIsPremium(true); localStorage.setItem('phone_master_premium', 'true'); setShowPayment(false); }} 
        />
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 flex items-center italic tracking-tighter">
            <span className="text-blue-600 mr-2">B</span>
            {t.title}
          </h1>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-1">{t.subtitle}</p>
        </div>
      </div>

      <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-10 border border-white/50 max-w-sm mx-auto">
        <button 
          onClick={() => { setActiveMode('antivirus'); setScanComplete(false); }}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeMode === 'antivirus' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-500'}`}
        >
          <Radar className="w-3 h-3 mr-2" /> {t.protect}
        </button>
        <button 
          onClick={() => { setActiveMode('optimizer'); setScanComplete(false); }}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeMode === 'optimizer' ? 'bg-white shadow-lg text-amber-600' : 'text-slate-500'}`}
        >
          <Zap className="w-3 h-3 mr-2" /> {t.speedup}
        </button>
        <button 
          onClick={() => { setActiveMode('network'); setScanComplete(false); }}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeMode === 'network' ? 'bg-white shadow-lg text-emerald-600' : 'text-slate-500'}`}
        >
          <Globe className="w-3 h-3 mr-2" /> {t.internet}
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-6">
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 shadow-inner"></div>
          
          {scanning && (
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent ${activeMode === 'antivirus' ? 'border-blue-600' : 'border-amber-500'} animate-spin`}></div>
          )}
          
          <div className="z-10 text-center">
            {scanning ? (
              <div>
                <p className="text-5xl md:text-7xl font-black text-slate-900 italic tracking-tighter">{progress}%</p>
                <p className="text-[9px] text-blue-600 font-black uppercase tracking-[0.4em] mt-3">{t.working}</p>
              </div>
            ) : scanComplete ? (
              <div className="animate-in zoom-in duration-500">
                <CheckCircle className="w-20 h-20 md:w-28 md:h-28 text-emerald-500 mx-auto drop-shadow-xl" />
                <p className="text-xs font-black uppercase mt-6 text-slate-900 tracking-widest">{t.done}</p>
              </div>
            ) : (
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-slate-50">
                {activeMode === 'network' ? (
                     <div className="text-center">
                        <p className="text-3xl font-black text-emerald-600 italic">24ms</p>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ping</p>
                     </div>
                ) : (
                    <ShieldCheck className={`w-12 h-12 md:w-16 md:h-16 ${activeMode === 'antivirus' ? 'text-blue-600' : 'text-amber-500'}`} />
                )}
              </div>
            )}
          </div>
        </div>

        {!scanning && !scanComplete && activeMode !== 'network' && (
          <button 
            onClick={activeMode === 'antivirus' ? startAntivirusScan : startOptimization}
            className={`mt-14 w-full max-w-sm py-5 rounded-[2rem] font-black text-lg text-white shadow-2xl transition-all active:scale-95 ${
              activeMode === 'antivirus' ? 'bg-gradient-to-r from-blue-600 to-indigo-700 shadow-blue-500/30' : 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/30'
            }`}
          >
            {activeMode === 'antivirus' ? t.protect : t.speedup}
          </button>
        )}

        {activeMode === 'network' && (
            <div className="mt-12 w-full max-w-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 text-center shadow-md">
                        <p className="text-2xl font-black text-slate-900 italic">{netSpeed.down}<span className="text-xs ml-1 font-normal uppercase opacity-50">MB/s</span></p>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Down</p>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 text-center shadow-md">
                        <p className="text-2xl font-black text-slate-900 italic">{netSpeed.up}<span className="text-xs ml-1 font-normal uppercase opacity-50">MB/s</span></p>
                        <p className="text-[10px] font-black text-slate-400 uppercase mt-1 tracking-widest">Up</p>
                    </div>
                </div>
                
                <div className="bg-emerald-50 p-6 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between shadow-sm">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg shadow-emerald-500/20">
                            <Lock className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">{t.internetShield}</p>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t.active}</p>
                        </div>
                    </div>
                    <CheckCircle className="text-emerald-500 w-6 h-6" />
                </div>
            </div>
        )}

        {scanning && (
          <div className="mt-10 text-center w-full max-w-sm">
             <div className="p-5 bg-white rounded-[2rem] border border-slate-100 mb-4 overflow-hidden relative shadow-lg">
                <div className="scanner-line"></div>
                <p className="text-[10px] text-blue-600 truncate tracking-tight uppercase font-black">{currentFile || 'Please wait...'}</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
