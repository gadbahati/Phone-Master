
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { TabType } from './types';
import { DocumentsScreen } from './screens/DocumentsScreen';
import { MediaScreen } from './screens/MediaScreen';
import { AudioScreen } from './screens/AudioScreen';
import { SecurityScreen } from './screens/SecurityScreen';
import { CodesScreen } from './screens/CodesScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { StorageScreen } from './screens/StorageScreen';
import { Onboarding } from './screens/Onboarding';
import { FloatingAIScout } from './components/FloatingAIScout';
import { WidgetSystem } from './components/WidgetSystem';
import { antivirusService } from './services/antivirusService';
import { ShieldCheck, Info, Loader2, Smartphone } from 'lucide-react';
import { Language, translations } from './services/i18n';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Documents');
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [showWidget, setShowWidget] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'loading' } | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('phone_master_onboarding_seen');
    if (hasSeenOnboarding) setShowOnboarding(false);

    const isDark = localStorage.getItem('phone_master_dark_mode') === 'true';
    setDarkMode(isDark);
    if (isDark) document.body.classList.add('dark');

    const storedLang = localStorage.getItem('phone_master_language') as Language;
    if (storedLang) setLanguage(storedLang);
    
    const widgetInstalled = localStorage.getItem('pm_widget_installed') === 'true';
    if (widgetInstalled) setShowWidget(true);

    const initAntivirus = async () => {
      try {
        const needsUpdate = await antivirusService.checkForUpdates();
        if (needsUpdate) {
          setToast({ message: "Checking security core...", type: 'loading' });
          const newStatus = await antivirusService.performUpdate();
          setToast({ message: `Secure core v${newStatus.version}`, type: 'success' });
          setTimeout(() => setToast(null), 4000);
        }
      } catch (e) {
        setToast(null);
      }
    };
    initAntivirus();
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('phone_master_onboarding_seen', 'true');
    setShowOnboarding(false);
    setToast({ message: "Welcome to Phone Master Pro!", type: 'info' });
    setTimeout(() => setToast(null), 5000);
  };

  const handleThemeToggle = (val: boolean) => {
    setDarkMode(val);
    localStorage.setItem('phone_master_dark_mode', String(val));
    if (val) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('phone_master_language', lang);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'Documents': return <DocumentsScreen language={language} />;
      case 'Media': return <MediaScreen language={language} />;
      case 'Audio': return <AudioScreen language={language} />;
      case 'Security': return <SecurityScreen language={language} />;
      case 'Codes': return <CodesScreen />;
      case 'Settings': return (
        <SettingsScreen 
          darkMode={darkMode} 
          setDarkMode={handleThemeToggle} 
          widgetEnabled={showWidget} 
          setWidgetEnabled={(val) => {
            setShowWidget(val);
            localStorage.setItem('pm_widget_installed', String(val));
          }}
          language={language}
          setLanguage={handleLanguageChange}
        />
      );
      // Ensure storage screen is rendered if we decide to add a tab for it later or redirect
      default: return <DocumentsScreen language={language} />;
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} language={language}>
      {renderScreen()}

      {showWidget && (
        <WidgetSystem 
          onOpenApp={(tab) => { setActiveTab(tab); setShowWidget(false); }}
          onClose={() => setShowWidget(false)}
          onQuickAction={(action) => {
            if (action === 'security' || action === 'optimize') setActiveTab('Security');
            if (action === 'ai') setActiveTab('Media');
            setShowWidget(false);
          }}
        />
      )}

      <FloatingAIScout />

      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-sm animate-in slide-in-from-top-12 duration-500">
          <div className="glass p-5 rounded-[2rem] shadow-2xl flex items-center border border-white/50">
            <div className="mr-4">
              {toast.type === 'loading' ? <Loader2 className="w-6 h-6 animate-spin text-blue-500" /> : <ShieldCheck className="w-6 h-6 text-emerald-500" />}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest leading-tight flex-1">
              {toast.message}
            </p>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
