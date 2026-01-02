
import React, { useState } from 'react';
import { Music, X, Mic, Loader2, Sparkles, AlertCircle, Zap } from 'lucide-react';

export const FloatingAIScout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [permissionStep, setPermissionStep] = useState(0); 
  const [result, setResult] = useState<{ artist: string; song: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startListening = async () => {
    setIsListening(true);
    setResult(null);
    setError(null);

    setTimeout(() => {
      const success = Math.random() > 0.1;
      if (success) {
        setResult({
          artist: "Ayra Starr",
          song: "Rush"
        });
      } else {
        setError("I couldn't hear the song. Please try again or move closer.");
      }
      setIsListening(false);
    }, 4000);
  };

  const handleInitialClick = () => {
    if (permissionStep === 0) setPermissionStep(1);
    else setIsOpen(true);
  };

  if (permissionStep === 1) {
    return (
      <div className="fixed inset-0 z-[500] bg-white/90 backdrop-blur-2xl flex items-center justify-center p-8">
        <div className="bg-white rounded-[3rem] p-10 max-w-sm w-full text-center shadow-2xl border border-slate-200 animate-in zoom-in duration-300">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/20">
            <span className="text-4xl font-black text-white italic">B</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Bahati AI Music Finder</h3>
          <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
            Allow Bahati AI Music Finder to listen and tell you the name of songs playing around you.
          </p>
          <button 
            onClick={() => { setPermissionStep(2); setIsOpen(true); }}
            className="w-full py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/30 active:scale-95 transition-all"
          >
            Authorize Bahati AI Music Finder
          </button>
          <button onClick={() => setPermissionStep(0)} className="mt-6 text-xs font-black text-slate-400 uppercase tracking-widest">Not Now</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-6 bottom-24 z-[200]">
        <button 
          onClick={handleInitialClick}
          className={`relative group w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-2xl border-4 border-white transition-all active:scale-90 pulse-neon ${permissionStep === 2 ? 'animate-pulse' : ''}`}
        >
          <div className="absolute inset-0 rounded-full border border-blue-500/20 radar-ring"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
          <span className="text-2xl font-black text-blue-600 italic relative z-10">B</span>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center border-2 border-white">
             <Sparkles className="text-white w-2.5 h-2.5" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[210] flex items-end justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="relative glass w-full max-w-md rounded-[3rem] p-10 pb-14 shadow-2xl animate-in slide-in-from-bottom-full duration-500 border border-white overflow-hidden">
            <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 transition-colors"><X /></button>
            
            <div className="text-center relative z-10">
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full mb-8">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Bahati AI Finder</span>
              </div>

              {!result && !isListening && !error && (
                <>
                  <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">What song is this?</h2>
                  <p className="text-sm text-slate-500 mb-10 px-6 leading-relaxed font-medium">Tap the button and I will listen to the music and find the name for you.</p>
                  <button 
                    onClick={startListening}
                    className="w-28 h-28 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40 text-white hover:scale-110 active:scale-95 transition-all border border-white/20"
                  >
                    <Mic className="w-12 h-12" />
                  </button>
                  <p className="mt-8 text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Tap to listen</p>
                </>
              )}

              {isListening && (
                <div className="py-10">
                   <div className="flex justify-center items-center gap-2 h-20 mb-8">
                    {[1,2,3,4,5,6,7,8].map(i => (
                      <div 
                        key={i} 
                        className="w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full animate-bounce" 
                        style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Finding song...</h2>
                  <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Searching database</p>
                </div>
              )}

              {result && (
                <div className="animate-in zoom-in duration-300">
                  <div className="w-44 h-44 bg-slate-100 rounded-[2.5rem] mx-auto mb-8 overflow-hidden shadow-2xl border-4 border-white ring-8 ring-blue-50">
                    <img src={`https://picsum.photos/seed/${result.song}/400/400`} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 leading-tight mb-1">{result.song}</h2>
                  <p className="text-blue-600 font-black text-xl mb-10">{result.artist}</p>
                  <div className="flex gap-4">
                    <button className="flex-1 py-5 bg-slate-100 rounded-2xl font-black text-xs uppercase text-slate-600 tracking-widest hover:bg-slate-200 transition-colors">History</button>
                    <button className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20">Play Now</button>
                  </div>
                </div>
              )}

              {error && (
                <div className="animate-in fade-in duration-300">
                  <AlertCircle className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                  <p className="text-rose-600 font-black text-lg mb-8 leading-tight">{error}</p>
                  <button 
                    onClick={startListening}
                    className="w-full py-5 bg-slate-100 rounded-2xl font-black text-xs uppercase text-slate-600 tracking-widest border border-slate-200"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
