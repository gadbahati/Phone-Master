
import React from 'react';
import { LucideIcon, FileText, Camera, Music, ShieldCheck, Settings as SettingsIcon, Terminal } from 'lucide-react';
import { TabType } from '../types';
import { Language, translations } from '../services/i18n';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode: boolean;
  language: Language;
}

const NavItem: React.FC<{
  tab: TabType;
  label: string;
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  color: string;
}> = ({ tab, label, active, onClick, icon: Icon, color }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full py-2 transition-all duration-300 relative ${
      active ? color : 'text-slate-400'
    }`}
  >
    {active && (
      <div className={`absolute -top-1 w-8 h-1 rounded-full ${color.replace('text-', 'bg-')} blur-sm`}></div>
    )}
    <Icon className={`w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 ${active ? 'scale-125 translate-y-[-2px]' : ''}`} />
    <span className={`text-[8px] md:text-[10px] mt-1 font-black uppercase tracking-widest transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, darkMode, language }) => {
  const t = translations[language].nav;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <main className="flex-1 pb-32 overflow-hidden relative">
        <div className="h-full w-full overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
          
          {/* Universal Footer Branding */}
          <div className="py-16 text-center opacity-40 select-none pointer-events-none">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-6 opacity-20"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 dark:text-slate-400">
              BahatiTech Solutions • Ecosystem Pro
            </p>
          </div>
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-[200] safe-bottom pb-6 px-4 pointer-events-none flex justify-center">
        <div className="glass rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-lg h-20 md:h-24 flex justify-around items-center px-6 pointer-events-auto border border-white/40 dark:border-white/10">
          <NavItem 
            tab="Documents" 
            label={t.Files}
            active={activeTab === 'Documents'} 
            onClick={() => setActiveTab('Documents')} 
            icon={FileText} 
            color="text-blue-500"
          />
          <NavItem 
            tab="Media" 
            label={t.Media}
            active={activeTab === 'Media'} 
            onClick={() => setActiveTab('Media')} 
            icon={Camera} 
            color="text-purple-500"
          />
          <NavItem 
            tab="Audio" 
            label={t.Audio}
            active={activeTab === 'Audio'} 
            onClick={() => setActiveTab('Audio')} 
            icon={Music} 
            color="text-pink-500"
          />
          <NavItem 
            tab="Security" 
            label={t.Health}
            active={activeTab === 'Security'} 
            onClick={() => setActiveTab('Security')} 
            icon={ShieldCheck} 
            color="text-indigo-500"
          />
          <NavItem 
            tab="Codes" 
            label={t.Codes}
            active={activeTab === 'Codes'} 
            onClick={() => setActiveTab('Codes')} 
            icon={Terminal} 
            color="text-emerald-500"
          />
          <NavItem 
            tab="Settings" 
            label={t.Setup}
            active={activeTab === 'Settings'} 
            onClick={() => setActiveTab('Settings')} 
            icon={SettingsIcon} 
            color="text-amber-500"
          />
        </div>
      </nav>
    </div>
  );
};
