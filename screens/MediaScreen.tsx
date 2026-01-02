
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
  Maximize2,
  X
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
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [smartResult, setSmartResult] = useState<SmartScanResult | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'ai'>('status');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handleDownload = (imgUrl: string) => {
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = `Status_${Date.now()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAnalysis = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProcessing(true);
    setSmartResult(null);
    setOcrResult(null);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setPreviewImage(base64);
      try {
        const result = await analyzeDocument(base64);
        setSmartResult(result);
      } catch (error) {
        console.error(error);
        alert(language === 'en' ? "Analysis failed. Please check internet." : "Uchambuzi umefeli. Tafadhali angalia mtandao.");
      } finally {
        setProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      {showPayment && (
        <PaymentModal 
          title="Bahati AI Toolkit" 
          onClose={() => setShowPayment(false)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
      
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">{t.title}</h1>
        <p className="text-[10px] md:text-xs text-slate-500 font-bold uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
      </div>

      <div className="flex bg-slate-200/50 p-1.5 rounded-2xl mb-8 max-w-sm mx-auto">
        <button 
          onClick={() => setActiveTab('status')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'status' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-500'}`}
        >
          {t.status}
        </button>
        <button 
          onClick={() => setActiveTab('ai')}
          className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${activeTab === 'ai' ? 'bg-white shadow-lg text-blue-600' : 'text-slate-500'}`}
        >
          <Sparkles className="w-3 h-3 mr-1.5" />
          {t.lens}
        </button>
      </div>

      {activeTab === 'status' ? (
        <section className="animate-in fade-in duration-300">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
              <div key={i} className="relative group aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-200 shadow-lg border-2 border-white">
                <img 
                  src={`https://picsum.photos/seed/status-${i}/600/800`} 
                  alt="Status" 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <button 
                    onClick={() => handleDownload(`https://picsum.photos/seed/status-${i}/1200/1600`)}
                    className="bg-white text-slate-900 w-full py-3 rounded-xl text-[10px] font-black flex items-center justify-center shadow-2xl active:scale-95 transition-all"
                  >
                    <Download className="w-4 h-4 mr-2" /> {t.save}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="animate-in slide-in-from-right-4 duration-300">
          <div className="mb-8 p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
             <div className="relative z-10">
                <div className="flex items-center mb-4">
                    <Scan className="w-6 h-6 mr-3" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Bahati Neural Engine</span>
                </div>
                <h2 className="text-3xl font-black mb-3 leading-tight">{t.lens}</h2>
                <p className="text-sm opacity-90 leading-relaxed font-medium">
                  {t.snap}
                </p>
             </div>
          </div>

          {!isPremium ? (
            <button 
              onClick={() => setShowPayment(true)}
              className="w-full p-12 bg-white border-4 border-dashed border-blue-100 rounded-[3rem] flex flex-col items-center group active:scale-95 transition-all shadow-xl hover:border-blue-300"
            >
              <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                <CreditCard className="text-blue-500 w-10 h-10" />
              </div>
              <p className="font-black text-slate-900 text-xl">{t.unlock}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-2 tracking-widest">KSh 100 • One-time</p>
            </button>
          ) : (
            <div className="space-y-6">
              {!smartResult && !processing ? (
                <div className="grid grid-cols-1 gap-4">
                  <input type="file" accept="image/*" className="hidden" id="smart-lens-input" onChange={handleAnalysis} />
                  <label 
                    htmlFor="smart-lens-input" 
                    className="flex flex-col items-center justify-center p-16 border-4 border-dashed border-blue-500/20 rounded-[3.5rem] bg-blue-50/10 cursor-pointer hover:bg-blue-50 transition-all group"
                  >
                    <div className="w-24 h-24 bg-white rounded-[2.5rem] flex items-center justify-center mb-6 shadow-xl border border-slate-100 group-hover:scale-110 transition-all">
                        <Camera className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="font-black text-slate-900 text-lg uppercase tracking-tight">{t.aiAnalysis}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Tap to capture or upload</p>
                  </label>
                </div>
              ) : (
                <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden animate-in zoom-in duration-500">
                  <div className="relative aspect-video bg-slate-100">
                    {previewImage && <img src={previewImage} className="w-full h-full object-cover" />}
                    {processing && (
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
                            <div className="scanner-line"></div>
                            <Loader2 className="w-12 h-12 text-white animate-spin mb-4" />
                            <p className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Analyzing receipt...</p>
                        </div>
                    )}
                    <button 
                        onClick={() => {setSmartResult(null); setPreviewImage(null);}} 
                        className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {smartResult && (
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{smartResult.category}</span>
                            <button onClick={() => {setSmartResult(null); setPreviewImage(null);}} className="text-[10px] font-black text-slate-400 uppercase">{t.back}</button>
                        </div>
                        <p className="text-lg font-bold text-slate-900 mb-8 leading-tight italic">"{smartResult.summary}"</p>
                        
                        <div className="space-y-3">
                            {smartResult.entities.map((ent, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ent.label}</span>
                                    <span className="text-sm font-black text-slate-900">{ent.value}</span>
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-black transition-colors"
                            onClick={() => {
                                const text = smartResult.entities.map(e => `${e.label}: ${e.value}`).join('\n');
                                navigator.clipboard.writeText(text);
                                alert(language === 'en' ? "Details copied!" : "Maelezo yamenakiliwa!");
                            }}
                        >
                            <Copy className="w-4 h-4 mr-2" /> Copy Details
                        </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
