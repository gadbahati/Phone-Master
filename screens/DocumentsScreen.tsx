
import React, { useState, useRef } from 'react';
import { 
  FileBox, 
  Image as ImageIcon, 
  Edit3, 
  ArrowLeftRight, 
  ChevronRight,
  Zap,
  CheckCircle2,
  Loader2,
  Lock,
  Download
} from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface Props {
  language: Language;
}

export const DocumentsScreen: React.FC<Props> = ({ language }) => {
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language].docs;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      startProcess();
    }
  };

  const startProcess = () => {
    setProcessing(true);
    setComplete(false);
    // Simulate processing time
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
    }, 2500);
  };

  const handleDownload = () => {
    if (!selectedFile) return;
    const url = URL.createObjectURL(selectedFile);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PhoneMaster_${selectedFile.name}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tools = [
    {
      id: 'compress',
      title: t.compress,
      description: t.compressDesc,
      icon: <FileBox className="text-white w-6 h-6" />,
      color: 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20'
    },
    {
      id: 'img2pdf',
      title: t.img2pdf,
      description: t.img2pdfDesc,
      icon: <ImageIcon className="text-white w-6 h-6" />,
      color: 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/20'
    },
    {
      id: 'edit',
      title: t.edit,
      description: t.editDesc,
      icon: <Edit3 className="text-white w-6 h-6" />,
      color: 'bg-gradient-to-br from-amber-400 to-orange-600 shadow-amber-500/20'
    },
    {
      id: 'convert',
      title: t.pdf2word,
      description: t.pdf2wordDesc,
      icon: <ArrowLeftRight className="text-white w-6 h-6" />,
      color: 'bg-gradient-to-br from-fuchsia-500 to-purple-600 shadow-fuchsia-500/20'
    }
  ];

  if (activeTool) {
    return (
      <div className="p-4 md:p-6 pb-24 h-full animate-in slide-in-from-right-12 duration-500">
        <button 
          onClick={() => { setActiveTool(null); setComplete(false); setSelectedFile(null); }}
          className="flex items-center text-indigo-500 mb-8 font-black text-[10px] uppercase tracking-widest hover:text-indigo-700 transition-colors"
        >
          <ChevronRight className="rotate-180 mr-2 w-4 h-4" /> {t.back}
        </button>
        
        <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 italic">
                {tools.find(t => t.id === activeTool)?.title}
            </h2>
            <p className="text-indigo-400 font-bold uppercase text-[10px] tracking-widest">{t.ready}</p>
        </div>

        <div className="border-4 border-dashed border-indigo-100 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-16 flex flex-col items-center justify-center shadow-xl relative overflow-hidden group">
          <input 
            type="file" 
            className="hidden" 
            id="file-input-main" 
            ref={fileInputRef}
            onChange={handleFileChange} 
          />
          <label htmlFor="file-input-main" className="cursor-pointer text-center relative z-10 w-full">
            <div className="w-20 h-20 md:w-28 md:h-28 bg-indigo-50 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mx-auto mb-6 shadow-lg border border-white group-hover:scale-110 transition-transform duration-500">
              {processing ? (
                <Loader2 className="text-blue-500 w-10 h-10 md:w-14 md:h-14 animate-spin" />
              ) : (
                <Zap className="text-blue-500 w-10 h-10 md:w-14 md:h-14" />
              )}
            </div>
            <p className="text-lg md:text-2xl font-black text-slate-900 italic mb-2">
              {selectedFile ? selectedFile.name : t.choose}
            </p>
            <p className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.2em]">
              {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB` : 'Up to 200MB'}
            </p>
          </label>
        </div>

        {processing && (
          <div className="mt-12 text-center animate-in zoom-in duration-300">
            <div className="w-full bg-slate-100 h-2 rounded-full mb-4 overflow-hidden">
                <div className="h-full bg-blue-500 animate-[progress_2.5s_ease-in-out]"></div>
            </div>
            <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">{t.working}</p>
          </div>
        )}

        {complete && (
          <div className="mt-12 p-6 md:p-10 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center text-center animate-in slide-in-from-bottom-8 duration-500 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-emerald-500 mb-4" />
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{t.success}</h3>
            <p className="text-[10px] md:text-xs text-emerald-600 font-bold uppercase tracking-widest mb-8">{t.saved}</p>
            <button 
              onClick={handleDownload}
              className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition-all"
            >
              <Download className="mr-2 w-5 h-5" /> {t.download}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">{t.title}</h1>
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center shadow-sm">
            <Lock className="w-5 h-5 text-indigo-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="flex items-center p-5 md:p-8 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all active:scale-[0.98] relative overflow-hidden group shadow-md"
          >
            <div className={`w-14 h-14 md:w-18 md:h-18 ${tool.color} rounded-2xl md:rounded-3xl flex items-center justify-center mr-6 shadow-xl relative z-10 shrink-0`}>
              {tool.icon}
            </div>
            <div className="text-left flex-1 relative z-10">
              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight mb-1 italic">{tool.title}</h3>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tool.description}</p>
            </div>
            <ChevronRight className="text-indigo-400 group-hover:text-blue-600 transition-colors relative z-10" />
          </button>
        ))}
      </div>
      
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};
