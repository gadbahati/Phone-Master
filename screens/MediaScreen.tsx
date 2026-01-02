
import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Image as ImageIcon, 
  Zap, 
  Download, 
  CreditCard, 
  Loader2, 
  Sparkles, 
  AlertCircle, 
  Scan, 
  Copy, 
  CheckCircle2,
  X,
  MessageSquare,
  Send,
  Lock,
  Unlock,
  Eye,
  EyeOff
} from 'lucide-react';
import { performOCR, analyzeDocument } from '../services/geminiService';
import { PaymentModal } from '../components/PaymentModal';
import { SmartScanResult } from '../types';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
}

export const MediaScreen: React.FC<Props> = ({ language }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [smartResult, setSmartResult] = useState<SmartScanResult | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'ai' | 'wa' | 'vault'>('status');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [vaultLocked, setVaultLocked] = useState(true);
  const [passcode, setPasscode] = useState('');
  
  const [waNumber, setWaNumber] = useState('');
  const [waText, setWaText] = useState('');

  const t = translations[language].media;

  useEffect(() => {
    const paid = localStorage.getItem('phone_master_premium') === 'true';
    setIsPremium(paid);
  }, []);

  const handlePaymentSuccess = () => {
    localStorage.setItem('phone_master_premium', 'true');
    setIsPremium(true);
    setShowPayment(false);
  };

  const handleVaultUnlock = () => {
    if (passcode === '1234') setVaultLocked(false);
    else alert('Incorrect Passcode');
  };

  return (
    <div className="p-4 md:p-12 pb-32 h-full overflow-y-auto">
      {showPayment && <PaymentModal title="Bahati Pro Ecosystem" onClose={() => setShowPayment(false)} onSuccess={handlePaymentSuccess} />}
      
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 italic tracking-tighter dark:text-white leading-none">{t.title}</h1>
        <p className="text-[10px] md:text-xs text-indigo-500 font-bold uppercase tracking-[0.4em] mt-3">{t.subtitle}</p>
      </div>

      <div className="flex bg-slate-200/50 dark:bg-slate-900/50 p-2 rounded-[2.5rem] mb-12 border border-white/50 dark:border-white/10 max-w-4xl mx-auto overflow-x-auto scrollbar-hide shadow-inner">
        {['status', 'ai', 'wa', 'vault'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-4 px-6 rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all flex items-center justify-center whitespace-nowrap ${activeTab === tab ? 'bg-white dark:bg-slate-800 shadow-xl text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}
          >
             {tab === 'status' && <ImageIcon className="w-4 h-4 mr-2" />}
             {tab === 'ai' && <Sparkles className="w-4 h-4 mr-2" />}
             {tab === 'wa' && <MessageSquare className="w-4 h-4 mr-2" />}
             {tab === 'vault' && <Lock className="w-4 h-4 mr-2" />}
             {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === 'status' && (
        <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 max-w-7xl mx-auto animate-in fade-in duration-500">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
            <div key={i} className="relative group aspect-[3/4] rounded-[3rem] overflow-hidden bg-slate-200 shadow-xl border-4 border-white dark:border-slate-800 transition-all hover:scale-[1.02]">
              <img src={`https://picsum.photos/seed/status-id-${i}/800/1200`} alt="Status" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white text-black py-4 rounded-2xl font-black text-[10px] uppercase flex items-center justify-center shadow-2xl">
                  <Download className="w-4 h-4 mr-2" /> {t.save}
                </button>
              </div>
            </div>
          ))}
        </section>
      )}

      {activeTab === 'ai' && (
        <section className="max-w-4xl mx-auto animate-in slide-in-from-right-12 duration-500">
           <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-12 rounded-[4rem] text-white shadow-2xl mb-10 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black italic mb-4 leading-none">{t.lens}</h2>
              <p className="text-sm md:text-lg opacity-80 font-medium">{t.snap}</p>
           </div>
           
           {!isPremium ? (
             <button onClick={() => setShowPayment(true)} className="w-full p-20 bg-white dark:bg-slate-800 border-4 border-dashed border-indigo-100 dark:border-slate-700 rounded-[4rem] flex flex-col items-center group shadow-2xl transition-all active:scale-[0.98]">
                <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner">
                   <CreditCard className="w-12 h-12 text-indigo-600" />
                </div>
                <h3 className="text-2xl font-black italic">{t.unlock}</h3>
                <p className="text-[10px] text-slate-400 font-black mt-2 tracking-[0.5em]">LIFETIME LICENSE • KSh 100</p>
             </button>
           ) : (
             <div className="p-20 bg-slate-50 dark:bg-slate-900 border-4 border-dashed border-blue-500/20 rounded-[4rem] flex flex-col items-center cursor-pointer hover:bg-blue-50 transition-all">
                <Camera className="w-16 h-16 text-blue-600 mb-6" />
                <h3 className="text-xl font-black uppercase tracking-widest">{t.aiAnalysis}</h3>
             </div>
           )}
        </section>
      )}

      {activeTab === 'wa' && (
        <section className="max-w-2xl mx-auto animate-in zoom-in duration-500">
           <div className="bg-white dark:bg-slate-800 p-12 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 space-y-8">
              <div className="text-center mb-8">
                 <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="w-10 h-10 text-emerald-600" />
                 </div>
                 <h2 className="text-3xl font-black italic">{t.waDirect}</h2>
              </div>
              <input type="tel" placeholder={t.waPlaceholder} value={waNumber} onChange={e => setWaNumber(e.target.value)} className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] font-black text-xl text-center focus:border-emerald-500 transition-all outline-none" />
              <textarea placeholder={t.waMessage} rows={4} value={waText} onChange={e => setWaText(e.target.value)} className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] font-medium resize-none focus:border-emerald-500 transition-all outline-none" />
              <button className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl italic shadow-2xl shadow-emerald-500/40 flex items-center justify-center active:scale-[0.98] transition-all">
                 <Send className="w-6 h-6 mr-3" /> {t.waSend}
              </button>
           </div>
        </section>
      )}

      {activeTab === 'vault' && (
        <section className="max-w-4xl mx-auto animate-in slide-in-from-bottom-12 duration-500">
           {vaultLocked ? (
             <div className="bg-white dark:bg-slate-800 p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 dark:border-slate-700 text-center">
                <div className="w-28 h-28 bg-rose-50 dark:bg-rose-900/20 rounded-[3rem] flex items-center justify-center mx-auto mb-10 shadow-inner">
                   <Lock className="w-14 h-14 text-rose-500" />
                </div>
                <h2 className="text-4xl font-black italic mb-4">Secure Vault</h2>
                <p className="text-sm text-slate-500 mb-12 max-w-xs mx-auto font-medium">Your private media is encrypted and hidden from the gallery.</p>
                <input 
                  type="password" 
                  maxLength={4} 
                  placeholder="PIN" 
                  value={passcode} 
                  onChange={e => setPasscode(e.target.value)} 
                  className="w-48 p-6 bg-slate-50 dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-700 rounded-[2rem] font-black text-3xl text-center tracking-[1em] mb-8 focus:border-rose-500 outline-none" 
                />
                <button onClick={handleVaultUnlock} className="w-full py-6 bg-slate-900 dark:bg-white dark:text-black text-white rounded-[2.5rem] font-black text-xl italic transition-all active:scale-[0.98] shadow-xl">
                   Unlock Media
                </button>
                {!isPremium && <p className="mt-8 text-[9px] font-black text-rose-500 uppercase tracking-widest">Premium Unlock Required for Permanent Vault</p>}
             </div>
           ) : (
             <div className="animate-in zoom-in duration-500">
                <div className="flex items-center justify-between mb-8 px-6">
                   <h3 className="text-2xl font-black italic">Vault Items (0)</h3>
                   <button onClick={() => setVaultLocked(true)} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl"><EyeOff className="w-5 h-5 text-slate-500" /></button>
                </div>
                <div className="p-20 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-[4rem] text-center">
                   <ImageIcon className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No encrypted items yet</p>
                </div>
             </div>
           )}
        </section>
      )}
    </div>
  );
};
