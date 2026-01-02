
import React, { useState } from 'react';
import { X, Heart, Smartphone, CreditCard, Copy, Check, ExternalLink } from 'lucide-react';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<string | null>(null);

  const handleMpesa = () => {
    const number = '0791085514';
    navigator.clipboard.writeText(number);
    setCopied('mpesa');
    setTimeout(() => {
      setCopied(null);
      // Try to open dialer with M-PESA USSD as a courtesy
      window.location.href = 'tel:*334#';
    }, 1500);
  };

  const handlePaypal = () => {
    const email = 'gadbahati7@gmail.com';
    navigator.clipboard.writeText(email);
    setCopied('paypal');
    setTimeout(() => {
      setCopied(null);
      // Redirect to PayPal donation link
      window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${email}&currency_code=USD`, '_blank');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-[3rem] p-8 max-w-sm w-full relative shadow-2xl border border-white/10 animate-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Heart className="text-rose-500 w-10 h-10 fill-rose-500" />
          </div>
          
          <h3 className="text-2xl font-black dark:text-white mb-2">Support BahatiTech</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed font-medium">
            Tap to copy details and automatically open the payment gateway.
          </p>

          <div className="space-y-4">
            {/* M-PESA Option */}
            <button 
              onClick={handleMpesa}
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 text-left transition-all active:scale-[0.98] hover:bg-emerald-50 dark:hover:bg-emerald-900/10 group"
            >
              <div className="flex items-center mb-3">
                <Smartphone className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support via M-PESA</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-black text-slate-900 dark:text-white tracking-widest">0791085514</span>
                <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  {copied === 'mpesa' ? <Check className="w-4 h-4 text-emerald-500" /> : <ExternalLink className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
              <p className="text-[9px] text-emerald-600 font-bold uppercase mt-2">Recipient: Gad Bahati • Opens Toolkit</p>
            </button>

            {/* PayPal Option */}
            <button 
              onClick={handlePaypal}
              className="w-full bg-slate-50 dark:bg-slate-900/50 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 text-left transition-all active:scale-[0.98] hover:bg-blue-50 dark:hover:bg-blue-900/10"
            >
              <div className="flex items-center mb-3">
                <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Support via PayPal</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate max-w-[180px]">gadbahati7@gmail.com</span>
                <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                  {copied === 'paypal' ? <Check className="w-4 h-4 text-blue-500" /> : <ExternalLink className="w-4 h-4 text-slate-400" />}
                </div>
              </div>
              <p className="text-[9px] text-blue-600 font-bold uppercase mt-2">Direct Redirect to Checkout</p>
            </button>
          </div>

          <p className="mt-8 text-[10px] text-slate-400 font-medium italic">
            © 2026 BahatiTech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
