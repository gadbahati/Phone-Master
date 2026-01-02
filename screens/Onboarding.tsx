
import React, { useState } from 'react';
import { ShieldCheck, FileText, Zap, ChevronRight, Check } from 'lucide-react';

export const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Phone Master",
      description: "Your all-in-one professional toolkit for documents, media, and storage.",
      icon: <ShieldCheck className="w-20 h-20 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Secure Document Tools",
      description: "Compress PDFs, convert images, and edit documents—all processed locally on your device.",
      icon: <FileText className="w-20 h-20 text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      title: "Privacy & Compliance",
      description: "We respect your data. No background access, no auto-deletion, and zero data selling.",
      icon: <Zap className="w-20 h-20 text-amber-600" />,
      color: "bg-amber-50"
    }
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 flex flex-col p-8 transition-colors duration-500">
      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-10 right-8 z-[110] text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors py-2 px-4 rounded-full border border-slate-100 dark:border-slate-800"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className={`w-40 h-40 ${currentStep.color} dark:bg-slate-800/50 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner animate-in zoom-in duration-500`}>
          {currentStep.icon}
        </div>
        <div className="animate-in slide-in-from-bottom-4 duration-500 delay-150">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            {currentStep.title}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs text-lg leading-relaxed mx-auto font-medium">
            {currentStep.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full transition-all duration-300 ${i === step ? 'w-10 bg-blue-600' : 'w-2 bg-slate-200 dark:bg-slate-800'}`} 
            />
          ))}
        </div>
        
        <button 
          onClick={() => step < steps.length - 1 ? setStep(step + 1) : onComplete()}
          className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black flex items-center justify-center text-xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all hover:bg-blue-700"
        >
          {step === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight className="ml-2 w-6 h-6" />
        </button>
        
        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mt-2">
          Developed by BahatiTech Solutions
        </p>
      </div>
    </div>
  );
};
