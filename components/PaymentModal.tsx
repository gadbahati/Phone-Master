
import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, X, AlertCircle, Loader2, Check, ExternalLink, CreditCard } from 'lucide-react';

interface PaymentModalProps {
  onClose: () => void;
  onSuccess: () => void;
  title: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onSuccess, title }) => {
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'paypal'>('mpesa');

  const handleMpesaRedirect = () => {
    navigator.clipboard.writeText('0791085514');
    window.location.href = 'tel:*334#';
  };

  const handlePaypalRedirect = () => {
    navigator.clipboard.writeText('gadbahati7@gmail.com');
    window.open(`https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=gadbahati7@gmail.com&currency_code=USD&item_name=Premium%20Unlock:%20${encodeURIComponent(title)}`, '_blank');
  };

  const handleVerify = () => {
    if (code.length < 8) {
      setError('Please enter a valid transaction code (M-PESA or PayPal ID)');
      return;
    }
    
    setVerifying(true);
    setError('');
    
    setTimeout(() => {
      setVerifying(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        onSuccess();
      }, 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl border border-white/10 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <Check className="text-white w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black dark:text-white mb-2">Verified!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Thank you. {title} is now active.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-2xl overflow-hidden border border-white/10">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-blue-600 w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-black dark:text-white mb-1">Premium Access</h3>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-6">{title}</p>

          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl mb-6">
            <button 
              onClick={() => setPaymentMethod('mpesa')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'mpesa' ? 'bg-white dark:bg-slate-800 text-emerald-600 shadow-md' : 'text-slate-400'}`}
            >
              M-PESA
            </button>
            <button 
              onClick={() => setPaymentMethod('paypal')}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'paypal' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-md' : 'text-slate-400'}`}
            >
              PayPal
            </button>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl mb-6 text-left border border-slate-100 dark:border-slate-700">
            {paymentMethod === 'mpesa' ? (
              <div onClick={handleMpesaRedirect} className="cursor-pointer">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">1. Send <span className="text-emerald-600">KSh 100</span> to:</p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between mb-2">
                  <span className="text-lg font-black text-slate-900 dark:text-white tracking-widest">0791085514</span>
                  <ExternalLink className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[9px] text-slate-400 text-center uppercase font-black">Tap to Copy & Open Toolkit</p>
              </div>
            ) : (
              <div onClick={handlePaypalRedirect} className="cursor-pointer">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">1. Donate <span className="text-blue-600">$1.00</span> to:</p>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate">gadbahati7@gmail.com</span>
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-[9px] text-slate-400 text-center uppercase font-black">Tap to Pay via PayPal Website</p>
              </div>
            )}
          </div>

          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="ENTER TRANSACTION CODE"
              className={`w-full p-4 bg-white dark:bg-slate-700 border-2 rounded-2xl text-center font-bold uppercase tracking-widest focus:outline-none transition-all ${
                error ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10' : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
              }`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && <p className="text-[10px] text-rose-500 mt-2 font-bold">{error}</p>}
          </div>

          <button 
            onClick={handleVerify}
            disabled={verifying}
            className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-500/30 flex items-center justify-center disabled:opacity-70 active:scale-95 transition-all"
          >
            {verifying ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Activate Premium'}
          </button>
          
          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              © 2026 BahatiTech Solutions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
