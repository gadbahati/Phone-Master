
import React, { useState } from 'react';
import { Database, HardDrive, Trash2, FileWarning, Search, ChevronRight, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';

export const StorageScreen: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [foundItems, setFoundItems] = useState<any[]>([]);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);

  const startScan = () => {
    setScanning(true);
    // Realistically simulating large file discovery
    setTimeout(() => {
      setFoundItems([
        { id: '1', name: 'HighRes_Video_09.mp4', size: '425.8 MB', type: 'video' },
        { id: '2', name: 'Old_Backup_System.rar', size: '1.2 GB', type: 'system' },
        { id: '3', name: 'WhatsApp_Media_Cache', size: '640 MB', type: 'system' },
        { id: '4', name: 'Duplicate_Work_Photos.zip', size: '150 MB', type: 'image' }
      ]);
      setScanning(false);
    }, 2000);
  };

  const deleteItem = (id: string) => {
    setFoundItems(prev => prev.filter(item => item.id !== id));
    setShowConfirm(null);
  };

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">Storage</h1>
        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">Free up device space</p>
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8 opacity-5">
            <Database className="w-32 h-32" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center mr-3 shadow-inner">
                        <HardDrive className="text-blue-600 w-5 h-5" />
                    </div>
                    <h2 className="text-xl font-black text-slate-900 italic">Local Storage</h2>
                </div>
                <span className="text-[10px] font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest">85% Full</span>
            </div>
            
            <div className="h-6 w-full bg-slate-100 rounded-2xl overflow-hidden mb-8 flex border border-slate-50 shadow-inner">
                <div className="h-full bg-blue-500 w-[60%] transition-all duration-1000 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <div className="h-full bg-indigo-400 w-[15%]"></div>
                <div className="h-full bg-amber-400 w-[10%]"></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Apps</p>
                    <p className="text-lg font-black text-slate-900 italic">52<span className="text-xs ml-1 opacity-50">GB</span></p>
                </div>
                <div className="text-center">
                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-1">Media</p>
                    <p className="text-lg font-black text-slate-900 italic">28<span className="text-xs ml-1 opacity-50">GB</span></p>
                </div>
                <div className="text-center border-l border-slate-100">
                    <p className="text-[9px] text-emerald-500 font-black uppercase tracking-widest mb-1">Free</p>
                    <p className="text-lg font-black text-emerald-600 italic">14<span className="text-xs ml-1 opacity-50">GB</span></p>
                </div>
            </div>
        </div>
      </div>

      {!foundItems.length && !scanning ? (
        <button 
          onClick={startScan}
          className="w-full py-12 bg-white border-4 border-dashed border-indigo-50 rounded-[3rem] flex flex-col items-center group active:bg-indigo-50 transition-all shadow-lg hover:border-indigo-200"
        >
          <div className="w-20 h-20 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
            <Search className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-xl font-black text-slate-900 italic uppercase tracking-tight">Deep System Scan</p>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Identify safe-to-delete items</p>
        </button>
      ) : scanning ? (
        <div className="py-16 flex flex-col items-center animate-in zoom-in">
          <div className="relative w-24 h-24 mb-6">
             <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
             <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h3 className="text-2xl font-black text-slate-900 italic">Scanning Root...</h3>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-2">Analyzing metadata</p>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-8">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Findings ({foundItems.length})</h3>
            <button onClick={() => setFoundItems([])} className="text-[10px] text-blue-600 font-black uppercase tracking-widest">Clear List</button>
          </div>
          
          <div className="space-y-4">
            {foundItems.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-[2.5rem] flex items-center border border-slate-100 shadow-md group hover:border-blue-200 transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 shadow-lg relative shrink-0 ${
                  item.type === 'video' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  <FileWarning className="w-7 h-7" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-black text-slate-900 italic truncate mb-1">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{item.size}</p>
                </div>
                <button 
                  onClick={() => setShowConfirm(item.id)}
                  className="w-12 h-12 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-2xl transition-colors shrink-0"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          {showConfirm && (
            <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl">
              <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full shadow-2xl border border-white animate-in zoom-in duration-300">
                <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner mx-auto">
                  <AlertTriangle className="text-rose-600 w-10 h-10" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-3 text-center italic">Confirm Delete?</h4>
                <p className="text-sm text-slate-500 mb-10 text-center font-medium leading-relaxed">
                  This file will be permanently removed from your device. You cannot undo this.
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowConfirm(null)}
                    className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => deleteItem(showConfirm)}
                    className="flex-1 py-5 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-500/30 active:scale-95 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-start p-6 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 shadow-sm">
            <Smartphone className="w-6 h-6 text-blue-600 mr-4 shrink-0 mt-0.5" />
            <p className="text-[10px] text-blue-700 leading-relaxed font-bold uppercase tracking-tight">
              <span className="block mb-1 opacity-60">System Policy:</span> Phone Master does not auto-delete. All space reclamation must be manually authorized. No background file access is performed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
