
import React from 'react';
import { 
  User, 
  ShieldCheck, 
  Moon, 
  Sun, 
  Star, 
  Share2, 
  Heart, 
  Info, 
  ChevronRight,
  ExternalLink,
  Smartphone,
  Layout as LayoutIcon,
  Languages,
  CheckCircle2
} from 'lucide-react';
import { Language, translations } from '../services/i18n';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  widgetEnabled: boolean;
  setWidgetEnabled: (val: boolean) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const SettingsScreen: React.FC<SettingsProps> = ({ 
  darkMode, 
  setDarkMode, 
  widgetEnabled, 
  setWidgetEnabled,
  language,
  setLanguage
}) => {
  const t = translations[language].settings;

  return (
    <div className="p-4 md:p-6 pb-24 h-full overflow-y-auto">
      <div className="mb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 italic tracking-tighter">{t.title}</h1>
        <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
      </div>

      <div className="space-y-10">
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-4">Preference</h3>
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100">
            {/* Language Switcher */}
            <div className="p-8 border-b border-slate-50 bg-slate-50/20">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                  <Languages className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <span className="font-black text-sm text-slate-900 block uppercase tracking-tight">{t.langTitle}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.langDesc}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${language === 'en' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white text-slate-400 border border-slate-100'}`}
                >
                  {language === 'en' && <CheckCircle2 className="w-3 h-3 mr-2" />} English
                </button>
                <button 
                  onClick={() => setLanguage('sw')}
                  className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center ${language === 'sw' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white text-slate-400 border border-slate-100'}`}
                >
                  {language === 'sw' && <CheckCircle2 className="w-3 h-3 mr-2" />} Kiswahili
                </button>
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                  {darkMode ? <Moon className="w-6 h-6 text-blue-600" /> : <Sun className="w-6 h-6 text-blue-600" />}
                </div>
                <span className="font-black text-sm text-slate-900 uppercase tracking-tight">{t.themeTitle}</span>
              </div>
              <div className={`w-14 h-7 rounded-full p-1 transition-all ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
            </button>

            <button 
              onClick={() => setWidgetEnabled(!widgetEnabled)}
              className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-colors border-t border-slate-50"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mr-4 shadow-sm">
                  <LayoutIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="text-left">
                  <span className="font-black text-sm text-slate-900 block uppercase tracking-tight">{t.widgetTitle}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Floating 4x2 Control Center</span>
                </div>
              </div>
              <div className={`w-14 h-7 rounded-full p-1 transition-all ${widgetEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${widgetEnabled ? 'translate-x-7' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-4">Community</h3>
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-slate-100 divide-y divide-slate-50">
            <button className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-all group">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-amber-500" />
                </div>
                <span className="font-black text-sm text-slate-900 uppercase tracking-tight">{t.rate}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-8 hover:bg-slate-50 transition-all group">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mr-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6 text-rose-500" />
                </div>
                <span className="font-black text-sm text-slate-900 uppercase tracking-tight">{t.support}</span>
              </div>
              <ExternalLink className="w-5 h-5 text-slate-300" />
            </button>
          </div>
        </section>

        <div className="pt-16 text-center">
          <div className="relative inline-block mb-8">
             <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse"></div>
             <div className="relative w-24 h-24 bg-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/30">
                <ShieldCheck className="text-white w-12 h-12" />
             </div>
          </div>
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter">Phone Master</h2>
          <p className="text-[10px] text-slate-400 mb-10 font-black uppercase tracking-[0.5em]">v2.0.1 BUILD STABLE</p>
          
          <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm inline-block w-full">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-3">{t.developedBy}</p>
            <p className="text-2xl font-black text-blue-600 tracking-tight">BahatiTech Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};
