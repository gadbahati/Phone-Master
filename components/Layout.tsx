
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
    <Icon className={`w-5 h-5 transition-transform duration-500 ${active ? 'scale-125 translate-y-[-2px]' : ''}`} />
    {/* Labels (name tags) are now always visible with slight opacity when inactive */}
    <span className={`text-[8px] mt-1 font-black uppercase tracking-widest transition-all ${active ? 'opacity-100' : 'opacity-60'}`}>
      {label}
    </span>
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, darkMode, language }) => {
  const t = translations[language].nav;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 pb-24 overflow-hidden relative">
        <div className="h-full w-full overflow-y-auto">
          {children}
        </div>
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 z-[200] safe-bottom pb-4 px-4">
        <div className="glass rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-lg mx-auto h-20 flex justify-around items-center px-4">
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
