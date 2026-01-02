
import React, { useState } from 'react';
import { Music, Scissors, Sliders, ChevronRight, Sparkles, Loader2, CheckCircle, Download, Disc } from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
}

export const AudioScreen: React.FC<Props> = ({ language }) => {
  const [selectedFormat, setSelectedFormat] = useState('MP3');
  const [selectedBitrate, setSelectedBitrate] = useState('192kbps');
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const t = translations[language].audio;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const startConvert = () => {
    if (!fileName) return;
    setProcessing(true);
    setComplete(false);
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 3000);
  };

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">{t.title}</h1>
        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
      </div>

      <div className="mb-8 p-8 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[3rem] text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <Sparkles className="w-5 h-5 mr-3 text-amber-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Bahati Premium</span>
          </div>
          <h2 className="text-2xl font-black mb-2 leading-tight">AI Music Discovery</h2>
          <p className="text-sm opacity-90 leading-relaxed font-medium mb-6">
            Identify any song playing around you instantly using the Bahati AI core.
          </p>
          <div className="inline-flex items-center bg-white/20 px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">
             <span className="text-[10px] font-black uppercase tracking-widest">Tap the "B" icon below</span>
          </div>
        </div>
        <Disc className="absolute top-1/2 -right-12 -translate-y-1/2 w-48 h-48 opacity-10 animate-[spin_10s_linear_infinite]" />
      </div>

      <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-100 mb-6">
        <div className="flex flex-col items-center justify-center h-48 border-4 border-dashed border-indigo-50 rounded-[2.5rem] mb-8 bg-indigo-50/10 group hover:bg-indigo-50 transition-colors">
          <input type="file" accept="audio/*" className="hidden" id="audio-input" onChange={handleFileChange} />
          <label htmlFor="audio-input" className="text-center cursor-pointer w-full p-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <Music className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-lg font-black text-slate-900 italic">{fileName || t.select}</p>
            {fileName && <p className="text-[10px] text-indigo-400 font-black uppercase mt-1">Ready to convert</p>}
          </label>
        </div>

        {fileName && !complete && !processing && (
            <div className="space-y-6 animate-in slide-in-from-bottom-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t.format}</label>
                        <select 
                            value={selectedFormat} 
                            onChange={(e) => setSelectedFormat(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase focus:outline-none focus:border-blue-500"
                        >
                            <option>MP3</option>
                            <option>AAC</option>
                            <option>WAV</option>
                            <option>FLAC</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{t.bitrate}</label>
                        <select 
                            value={selectedBitrate} 
                            onChange={(e) => setSelectedBitrate(e.target.value)}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-black uppercase focus:outline-none focus:border-blue-500"
                        >
                            <option>128kbps</option>
                            <option>192kbps</option>
                            <option>320kbps</option>
                        </select>
                    </div>
                </div>

                <button 
                    onClick={startConvert}
                    className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 flex items-center justify-center active:scale-95 transition-all"
                >
                    <Sliders className="w-6 h-6 mr-3" /> {t.convert}
                </button>
            </div>
        )}

        {processing && (
            <div className="py-12 text-center animate-in zoom-in">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Rendering audio stream...</p>
            </div>
        )}

        {complete && (
            <div className="py-8 text-center animate-in slide-in-from-bottom-4">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black text-slate-900 mb-2 italic">Conversion Done!</h3>
                <p className="text-xs text-slate-400 font-bold uppercase mb-8">Format: {selectedFormat} @ {selectedBitrate}</p>
                <button 
                    onClick={() => {setComplete(false); setFileName(null);}}
                    className="w-full py-5 bg-emerald-500 text-white rounded-2xl font-black flex items-center justify-center shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                >
                    <Download className="mr-3 w-6 h-6" /> Download Audio
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
