
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Moon, 
  Sun, 
  Star, 
  Heart, 
  ChevronRight,
  ExternalLink,
  Layout as LayoutIcon,
  Languages,
  CheckCircle2,
  MessageCircle,
  PhoneCall
} from 'lucide-react';
import { Language, translations } from '../services/i18n';
import { SupportModal } from '../components/SupportModal';

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
  const [showSupport, setShowSupport] = useState(false);
  const t = translations[language].settings;

  const handleCall = () => {
    window.open('tel:0791085514');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/254791085514');
  };

  const handleRate = () => {
    // Placeholder package name for Phone Master
    const packageName = 'com.bahatitech.phonemaster';
    window.open(`https://play.google.com/store/apps/details?id=${packageName}`, '_blank');
  };

  return (
    <div className="p-4 md:p-8 pb-32 h-full overflow-y-auto scroll-smooth">
      {showSupport && <SupportModal onClose={() => setShowSupport(false)} />}
      
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 italic tracking-tighter dark:text-white">{t.title}</h1>
        <p className="text-[10px] md:text-xs text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">{t.subtitle}</p>
      </div>

      <div className="space-y-12 max-w-4xl mx-auto">
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-6">Preference</h3>
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-700">
            {/* Language Switcher */}
            <div className="p-6 md:p-10 border-b border-slate-50 dark:border-slate-700 bg-slate-50/20 dark:bg-slate-900/10">
              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-sm">
                  <Languages className="w-7 h-7 text-emerald-600" />
                </div>
                <div>
                  <span className="font-black text-base text-slate-900 dark:text-white block uppercase tracking-tight">{t.langTitle}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.langDesc}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center ${language === 'en' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105' : 'bg-white dark:bg-slate-700 text-slate-400 border border-slate-100 dark:border-slate-600'}`}
                >
                  {language === 'en' && <CheckCircle2 className="w-4 h-4 mr-2" />} English
                </button>
                <button 
                  onClick={() => setLanguage('sw')}
                  className={`py-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center ${language === 'sw' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-105' : 'bg-white dark:bg-slate-700 text-slate-400 border border-slate-100 dark:border-slate-600'}`}
                >
                  {language === 'sw' && <CheckCircle2 className="w-4 h-4 mr-2" />} Kiswahili
                </button>
              </div>
            </div>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full flex items-center justify-between p-6 md:p-10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-sm">
                  {darkMode ? <Moon className="w-7 h-7 text-blue-600" /> : <Sun className="w-7 h-7 text-blue-600" />}
                </div>
                <span className="font-black text-base text-slate-900 dark:text-white uppercase tracking-tight">{t.themeTitle}</span>
              </div>
              <div className={`w-16 h-8 rounded-full p-1.5 transition-all ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${darkMode ? 'translate-x-8' : 'translate-x-0'}`} />
              </div>
            </button>

            <button 
              onClick={() => setWidgetEnabled(!widgetEnabled)}
              className="w-full flex items-center justify-between p-6 md:p-10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors border-t border-slate-50 dark:border-slate-700"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-sm">
                  <LayoutIcon className="w-7 h-7 text-indigo-600" />
                </div>
                <div className="text-left">
                  <span className="font-black text-base text-slate-900 dark:text-white block uppercase tracking-tight">{t.widgetTitle}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Floating 4x2 Control Center</span>
                </div>
              </div>
              <div className={`w-16 h-8 rounded-full p-1.5 transition-all ${widgetEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${widgetEnabled ? 'translate-x-8' : 'translate-x-0'}`} />
              </div>
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-6">Support & Help</h3>
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-50 dark:divide-slate-700">
            <button 
              onClick={() => setShowSupport(true)}
              className="w-full flex items-center justify-between p-6 md:p-10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-sm group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-rose-500" />
                </div>
                <span className="font-black text-base text-slate-900 dark:text-white uppercase tracking-tight">{t.support}</span>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </button>
            <button 
              onClick={handleRate}
              className="w-full flex items-center justify-between p-6 md:p-10 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-all group"
            >
              <div className="flex items-center">
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mr-5 shadow-sm group-hover:scale-110 transition-transform">
                  <Star className="w-7 h-7 text-amber-500" />
                </div>
                <span className="font-black text-base text-slate-900 dark:text-white uppercase tracking-tight">{t.rate}</span>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 transition-colors" />
            </button>
          </div>
        </section>

        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 px-6">{t.contactUs}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-4 p-8 bg-emerald-600 text-white rounded-[2.5rem] shadow-xl shadow-emerald-500/30 active:scale-95 transition-all group hover:bg-emerald-700"
            >
              <MessageCircle className="w-8 h-8 group-hover:animate-bounce" />
              <span className="font-black text-sm uppercase tracking-widest">{t.whatsapp}</span>
            </button>
            <button 
              onClick={handleCall}
              className="flex items-center justify-center gap-4 p-8 bg-blue-600 text-white rounded-[2.5rem] shadow-xl shadow-blue-500/30 active:scale-95 transition-all group hover:bg-blue-700"
            >
              <PhoneCall className="w-8 h-8 group-hover:animate-bounce" />
              <span className="font-black text-sm uppercase tracking-widest">{t.call}</span>
            </button>
          </div>
        </section>

        <div className="pt-24 text-center">
          <div className="relative inline-block mb-10">
             <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
             <div className="relative w-28 h-28 bg-blue-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/40">
                <ShieldCheck className="text-white w-14 h-14" />
             </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-12 rounded-[4rem] border border-slate-100 dark:border-slate-700 shadow-sm inline-block w-full">
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.4em] mb-4">{t.developedBy}</p>
            <p className="text-3xl font-black text-blue-600 tracking-tight mb-8">BahatiTech Solutions</p>
            <div className="h-px w-16 bg-slate-100 dark:bg-slate-700 mx-auto mb-8"></div>
            <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em]">{t.copyright}</p>
          </div>
          
          <p className="mt-12 text-[10px] text-slate-400 font-black uppercase tracking-[0.6em] opacity-30">v2.1.0 BUILD STABLE • REL-KENYA • 2026</p>
        </div>
      </div>
    </div>
  );
};
