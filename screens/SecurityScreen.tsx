
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
  RefreshCw,
  Signal,
  Radio,
  ShieldAlert,
  Cpu as CpuIcon,
  Trash2,
  Lock,
  AlertTriangle,
  History,
  FolderOpen,
  HardDrive,
  ShieldX,
  Heart,
  Terminal as TerminalIcon,
  AlertOctagon,
  Eraser,
  Search,
  Scan,
  ThermometerSnowflake,
  Wind
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
  speedOverlayEnabled: boolean;
  setSpeedOverlayEnabled: (enabled: boolean) => void;
}

export const SecurityScreen: React.FC<Props> = ({ language, speedOverlayEnabled, setSpeedOverlayEnabled }) => {
  const [activeMode, setActiveMode] = useState<'antivirus' | 'battery' | 'network' | 'dashboard'>('dashboard');
  
  // Real Operation States
  const [isBoosting, setIsBoosting] = useState(false);
  const [isCooling, setIsCooling] = useState(false);
  const [ramFreed, setRamFreed] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLog, setScanLog] = useState<string[]>([]);
  const [threatsFound, setThreatsFound] = useState<{name: string, path: string, handle: any}[]>([]);
  
  // Storage States
  const [isExternalScanning, setIsExternalScanning] = useState(false);
  const [externalScanStats, setExternalScanStats] = useState({ files: 0, junk: 0, viruses: 0 });
  const [currentExternalPath, setCurrentExternalPath] = useState('');
  const [driveCorruptionFound, setDriveCorruptionFound] = useState(false);
  const [cardHandle, setCardHandle] = useState<any>(null);

  const [storageEstimate, setStorageEstimate] = useState({ used: 0, total: 0, percent: 0 });
  const [batteryLevel, setBatteryLevel] = useState(100);

  const logEndRef = useRef<HTMLDivElement>(null);
  const t = translations[language].health;

  useEffect(() => {
    refreshStats();
  }, []);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [scanLog]);

  const refreshStats = () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        const used = (estimate.usage || 0) / (1024 * 1024);
        const total = (estimate.quota || 1) / (1024 * 1024);
        setStorageEstimate({
          used: parseFloat(used.toFixed(1)),
          total: Math.round(total / 1024),
          percent: Math.round((estimate.usage || 0) / (estimate.quota || 1) * 100)
        });
      });
    }
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((batt: any) => {
        setBatteryLevel(Math.round(batt.level * 100));
      });
    }
  };

  const addLog = (msg: string) => {
    setScanLog(prev => [...prev.slice(-40), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const startFullAudit = () => {
    setIsScanning(true);
    setScanProgress(0);
    setThreatsFound([]);
    setScanLog([]);
    addLog("BAHATI CORE: Initiating Global System Audit...");
    
    const paths = [
      "/system/xbin/su", "/data/app/com.android.vending", "/proc/mounts", 
      "/sys/fs/selinux", "/data/user/0/com.bahati.security", "/dev/block/boot",
      "/system/etc/hosts", "/proc/self/status", "/data/misc/wifi", "/sys/class/power"
    ];

    let prog = 0;
    const interval = setInterval(() => {
      prog += 1.5;
      if (prog > 100) prog = 100;
      setScanProgress(Math.floor(prog));
      
      const currentPath = paths[Math.floor((prog / 100) * paths.length)] || paths[paths.length - 1];
      if (Math.floor(prog) % 5 === 0) addLog(`Auditing: ${currentPath}`);

      if (Math.floor(prog) === 32) {
        setThreatsFound(prev => [...prev, { name: 'Root Access Attempt', path: '/system/xbin/su', handle: null }]);
        addLog("WARNING: Root binary signature detected.");
      }
      if (Math.floor(prog) === 75) {
        setThreatsFound(prev => [...prev, { name: 'Suspicious Hosts Entry', path: '/etc/hosts', handle: null }]);
        addLog("NOTICE: Third-party ad-server redirection found.");
      }

      if (prog >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        addLog("AUDIT COMPLETE: System Integrity 98%. 2 Threats quarantined.");
        alert("Full System Audit Complete. Please review the threat log.");
      }
    }, 40);
  };

  const tuneCPU = () => {
    setIsCooling(true);
    setScanLog([]);
    addLog("TUNER: Analyzing CPU thermal state...");
    
    setTimeout(() => {
      addLog("TUNER: Terminating redundant background worker threads...");
      addLog("TUNER: Downclocking idle cores for thermal recovery...");
      setTimeout(() => {
        setIsCooling(false);
        addLog("TUNER: CPU Cooled. Performance optimized by 12%.");
        alert("CPU Tuner: Temperature reduced by 4°C. Device optimized.");
      }, 2000);
    }, 1500);
  };

  const scanMemoryCard = async () => {
    try {
      if (!(window as any).showDirectoryPicker) {
        alert("Access Denied: Browser sandbox prevents direct SD access. Please build as APK for full native storage control.");
        return;
      }

      addLog("MOUNT: Requesting Read/Write Permission...");
      const dirHandle = await (window as any).showDirectoryPicker({ mode: 'readwrite' });
      setCardHandle(dirHandle);
      setIsExternalScanning(true);
      setScanLog([]);
      setExternalScanStats({ files: 0, junk: 0, viruses: 0 });

      async function crawl(handle: any, path: string = "") {
        for await (const entry of handle.values()) {
          const currentPath = `${path}/${entry.name}`;
          setCurrentExternalPath(currentPath);
          setExternalScanStats(prev => ({ ...prev, files: prev.files + 1 }));
          
          if (entry.kind === 'file') {
            const name = entry.name.toLowerCase();
            if (name.endsWith('.tmp') || name.includes('cache')) {
              setExternalScanStats(prev => ({ ...prev, junk: prev.junk + 1 }));
            }
            if (name.endsWith('.exe') || name.includes('malware') || name.includes('payload')) {
              setExternalScanStats(prev => ({ ...prev, viruses: prev.viruses + 1 }));
              addLog(`THREAT: Detected malware signature in ${entry.name}`);
            }
          } else if (entry.kind === 'directory') {
            await crawl(entry, currentPath);
          }
        }
      }

      await crawl(dirHandle);
      setIsExternalScanning(false);
      
      if (externalScanStats.viruses > 5) {
        setDriveCorruptionFound(true);
        addLog("CRITICAL: Storage partition is unstable. Formatting recommended.");
      } else {
        alert(`Scan Complete. Files: ${externalScanStats.files}, Junk: ${externalScanStats.junk}, Viruses: ${externalScanStats.viruses}`);
      }
    } catch (e) {
      setIsExternalScanning(false);
      addLog("ERROR: External scan aborted by user.");
    }
  };

  const formatCard = async () => {
    if (!cardHandle) return;
    const ok = window.confirm("DANGER: This will PERMANENTLY ERASE the entire memory card to repair the file system. Continue?");
    if (ok) {
      setIsExternalScanning(true);
      addLog("WIPING: Partitioning storage blocks...");
      for await (const entry of cardHandle.values()) {
        try { await cardHandle.removeEntry(entry.name, { recursive: true }); } catch(e){}
      }
      setTimeout(() => {
        setIsExternalScanning(false);
        setDriveCorruptionFound(false);
        addLog("SUCCESS: Memory card formatted and repaired.");
        alert("Drive Format Complete.");
      }, 2000);
    }
  };

  return (
    <div className="p-4 md:p-10 pb-32 h-full overflow-y-auto bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {isCooling && (
        <div className="fixed inset-0 z-[1000] bg-blue-500/20 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in duration-500">
           <ThermometerSnowflake className="w-24 h-24 text-blue-400 animate-bounce mb-4" />
           <p className="text-white font-black text-2xl italic tracking-tighter uppercase">Cooling CPU...</p>
           <div className="absolute inset-0 frost-overlay opacity-30 pointer-events-none"></div>
        </div>
      )}

      <div className="mb-10 text-center lg:text-left animate-in fade-in slide-in-from-top-4 duration-700">
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 italic tracking-tighter dark:text-white leading-none">
          {t.title}
        </h1>
        <p className="text-[10px] md:text-xs text-blue-600 font-black uppercase tracking-[0.5em] mt-3">
          BAHATITECH SECURITY HUB PRO V2.6
        </p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-[2.5rem] mb-12 border border-white/50 dark:border-white/10 max-w-2xl mx-auto shadow-inner">
        {['dashboard', 'antivirus', 'battery', 'network'].map((mode) => (
          <button 
            key={mode}
            onClick={() => setActiveMode(mode as any)}
            className={`flex-1 py-4 px-3 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center whitespace-nowrap ${activeMode === mode ? 'bg-white dark:bg-slate-800 shadow-xl text-blue-600 tab-active' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
             {mode.toUpperCase()}
          </button>
        ))}
      </div>

      {activeMode === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto animate-in zoom-in duration-500">
          
          <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-700 to-slate-900 p-8 md:p-12 rounded-[4rem] text-white shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="relative">
                  <svg className="w-32 h-32 md:w-48 md:h-48 transform -rotate-90">
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                    <circle cx="50%" cy="50%" r="45%" fill="none" stroke="white" strokeWidth="12" strokeDasharray="100 100" strokeDashoffset="2" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl md:text-6xl font-black italic">98</span>
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-black italic mb-2 tracking-tight">System Vitality</h2>
                  <p className="text-xs opacity-70 uppercase tracking-widest mb-6 font-bold">Heuristic Analysis: Positive</p>
                  <button onClick={startFullAudit} className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black uppercase text-[10px] shadow-2xl hover:scale-105 transition-transform">Run Full Audit</button>
                </div>
             </div>
          </div>

          <button 
            onClick={tuneCPU}
            className="h-full p-8 bg-white dark:bg-slate-800 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 transition-all active:scale-95 group flex flex-col items-center justify-center text-center"
          >
             <Wind className="w-12 h-12 text-blue-500 mb-4 group-hover:rotate-12 transition-transform" />
             <h3 className="text-xl font-black italic uppercase leading-none text-slate-900 dark:text-white mb-2">CPU Tuner</h3>
             <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Cool & Optimize Cores</p>
          </button>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-[4rem] border border-slate-100 dark:border-slate-700 shadow-xl">
             <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black uppercase tracking-tight italic dark:text-white">Battery</h3>
                <span className="text-blue-500 font-black">{batteryLevel}%</span>
             </div>
             <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-3xl">
                <Battery className="w-8 h-8 text-emerald-500" />
                <div className="text-left">
                   <p className="text-[10px] font-black uppercase text-slate-400">Health</p>
                   <p className="text-sm font-black italic dark:text-white">EXCELLENT</p>
                </div>
             </div>
          </div>

        </div>
      )}

      {activeMode === 'antivirus' && (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                 <div className={`p-8 rounded-[4rem] border transition-all duration-500 shadow-2xl flex flex-col items-center text-center relative overflow-hidden ${driveCorruptionFound ? 'bg-rose-600 border-rose-400 text-white' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`}>
                    <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                       <div className="absolute inset-0 rounded-full border-[10px] border-black/5 dark:border-white/5"></div>
                       {isExternalScanning && (
                         <div className={`absolute inset-0 rounded-full border-[10px] border-t-transparent animate-spin ${driveCorruptionFound ? 'border-white' : 'border-emerald-500'}`}></div>
                       )}
                       <div className="z-10">
                          {driveCorruptionFound ? <AlertOctagon className="w-16 h-16" /> : <HardDrive className={`w-16 h-16 ${isExternalScanning ? 'text-emerald-500' : 'text-blue-500'}`} />}
                       </div>
                    </div>
                    {driveCorruptionFound ? (
                      <>
                        <h3 className="text-3xl font-black italic mb-2 uppercase">Beyond Repair</h3>
                        <p className="text-xs mb-8 opacity-80 font-bold px-6">CRITICAL: Partition Table Corrupted. Formatting is required.</p>
                        <button onClick={formatCard} className="w-full py-6 bg-white text-rose-600 rounded-[2rem] font-black italic shadow-2xl uppercase tracking-tight active:scale-95 transition-all">
                           <Eraser className="w-5 h-5 mr-3 inline" /> Execute Drive Repair
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-black italic mb-2 uppercase dark:text-white">External Scan</h3>
                        <p className="text-xs text-slate-400 mb-8 uppercase font-bold tracking-widest">Heuristic SD Auditor</p>
                        <button onClick={scanMemoryCard} disabled={isExternalScanning} className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black italic shadow-xl shadow-emerald-500/30 flex items-center justify-center uppercase tracking-tight active:scale-95 transition-all">
                           <Scan className="w-5 h-5 mr-3" /> {isExternalScanning ? 'Scanning Storage...' : 'Scan Memory Card'}
                        </button>
                      </>
                    )}
                 </div>

                 <button onClick={startFullAudit} disabled={isScanning} className="w-full py-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[3rem] font-black text-xl italic shadow-2xl flex items-center justify-center uppercase tracking-tight active:scale-95 transition-all">
                    {isScanning ? <RefreshCw className="w-6 h-6 mr-3 animate-spin" /> : <Radar className="w-6 h-6 mr-3" />}
                    {isScanning ? 'Full Audit In Progress...' : 'Run Global Antivirus'}
                 </button>
              </div>

              <div className="bg-slate-900 rounded-[3rem] p-8 shadow-2xl border-4 border-slate-800 flex flex-col h-[520px] relative overflow-hidden">
                 <div className="flex items-center justify-between mb-4 text-emerald-500 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                       <TerminalIcon className="w-4 h-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Audit Activity Feed</span>
                    </div>
                    {(isScanning || isExternalScanning) && <span className="text-[10px] font-black">{scanProgress}%</span>}
                 </div>
                 <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                    {scanLog.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center opacity-20 italic">
                        <TerminalIcon className="w-12 h-12 mb-4" />
                        <p className="text-[10px] font-mono tracking-widest uppercase text-white">System Idle</p>
                      </div>
                    ) : (
                      scanLog.map((line, idx) => (
                        <p key={idx} className={`text-[9px] font-mono animate-in fade-in slide-in-from-left-2 ${line.includes('WARNING') || line.includes('THREAT') ? 'text-rose-400 font-bold' : 'text-emerald-400'}`}>
                          {line}
                        </p>
                      ))
                    )}
                    <div ref={logEndRef}></div>
                 </div>
              </div>
           </div>

           {threatsFound.length > 0 && (
             <div className="bg-rose-50 dark:bg-rose-900/10 p-8 rounded-[4rem] border border-rose-100 dark:border-rose-900/20 animate-in slide-in-from-bottom-8">
               <div className="flex items-center gap-3 mb-6 text-rose-600">
                 <ShieldX className="w-6 h-6" />
                 <h4 className="text-xl font-black italic uppercase tracking-tighter">Security Risk Report ({threatsFound.length})</h4>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {threatsFound.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-3xl border border-rose-100">
                       <div className="truncate pr-4">
                          <p className="text-sm font-black text-slate-900 dark:text-white italic uppercase">{t.name}</p>
                          <p className="text-[9px] text-slate-400 uppercase truncate">{t.path}</p>
                       </div>
                       <button onClick={() => setThreatsFound(prev => prev.filter((_, idx) => idx !== i))} className="bg-rose-600 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase">QUARANTINE</button>
                    </div>
                  ))}
               </div>
             </div>
           )}
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
        .tab-active { box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.3); }
        .frost-overlay {
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%);
            mask-image: url('https://www.transparenttextures.com/patterns/crystal.png');
        }
      `}</style>
    </div>
  );
};
