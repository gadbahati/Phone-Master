
import React from 'react';
import { Cpu, ShieldCheck, Zap, Music, X, Search, Sparkles, Brain } from 'lucide-react';

interface WidgetSystemProps {
  onOpenApp: (tab: any) => void;
  onClose: () => void;
  onQuickAction: (action: string) => void;
}

export const WidgetSystem: React.FC<WidgetSystemProps> = ({ onOpenApp, onClose, onQuickAction }) => {
  return (
    <div className="fixed inset-x-4 top-24 z-[300] animate-in slide-in-from-top-12 duration-500">
      <div className="glass dark:bg-slate-900/90 rounded-[2rem] p-5 shadow-2xl border-2 border-blue-500/20">
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2 shadow-lg shadow-blue-500/30">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Phone Master</p>
              <p className="text-[8px] font-bold text-slate-400">Active Monitoring Enabled</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => onQuickAction('ai')}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl border border-indigo-500/20 group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform">
              <Brain className="text-white w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">Bahati AI</span>
          </button>

          <button 
            onClick={() => onQuickAction('optimize')}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20 group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400">Optimize</span>
          </button>

          <button 
            onClick={() => onQuickAction('security')}
            className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20 group active:scale-95 transition-all"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2 shadow-lg shadow-blue-500/40 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400">Security</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between px-2 py-2 bg-slate-50 dark:bg-slate-950/50 rounded-xl">
          <div className="flex items-center">
            <Cpu className="w-3 h-3 text-slate-400 mr-2" />
            <span className="text-[9px] font-bold text-slate-400 uppercase">System: Healthy</span>
          </div>
          <button onClick={() => onOpenApp('Documents')} className="text-[9px] font-black text-blue-600 uppercase">Open Hub →</button>
        </div>
      </div>
    </div>
  );
};
