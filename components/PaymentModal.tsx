
import React, { useState } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, X, AlertCircle, Loader2, Check } from 'lucide-react';

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

  const handleVerify = () => {
    // Basic validation for M-PESA codes (usually 10 alphanumeric characters)
    if (code.length < 8) {
      setError('Please enter a valid M-PESA transaction code (e.g., SKL1234567)');
      return;
    }
    
    setVerifying(true);
    setError('');
    
    // Simulate server-side verification against the provided number 0791085514
    setTimeout(() => {
      setVerifying(false);
      setIsSuccess(true);
      
      // Delay to show the success state before auto-closing and triggering the success callback
      setTimeout(() => {
        onClose();   // Automatically close the modal
        onSuccess(); // Trigger success callback to update parent UI (e.g., unlock features)
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
          <h3 className="text-2xl font-black dark:text-white mb-2">Payment Verified!</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Thank you. {title} has been permanently unlocked on this device.
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
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Smartphone className="text-emerald-600 w-8 h-8" />
          </div>
          
          <h3 className="text-2xl font-black dark:text-white mb-2">Premium Activation</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            To unlock <span className="font-bold text-slate-900 dark:text-slate-200">{title}</span> and all other premium features, please follow these steps:
          </p>

          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl mb-6 text-left border border-slate-100 dark:border-slate-700">
            <ol className="text-xs space-y-3 text-slate-600 dark:text-slate-400 font-medium">
              <li className="flex items-start">
                <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 shrink-0 text-[10px]">1</span>
                Send <span className="text-slate-900 dark:text-white font-bold mx-1">KSh 100.00</span> to M-PESA number:
              </li>
              <li className="text-center py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-xl font-black text-blue-600 tracking-wider">0791085514</span>
              </li>
              <li className="flex items-start">
                <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center mr-2 shrink-0 text-[10px]">2</span>
                Enter the transaction code from the M-PESA SMS below.
              </li>
            </ol>
          </div>

          <div className="relative mb-6">
            <input 
              type="text" 
              placeholder="Enter Transaction Code"
              className={`w-full p-4 bg-white dark:bg-slate-700 border-2 rounded-2xl text-center font-bold uppercase tracking-widest focus:outline-none transition-all ${
                error ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/10' : 'border-slate-200 dark:border-slate-600 focus:border-blue-500'
              }`}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {error && (
              <p className="text-[10px] text-rose-500 mt-2 font-bold flex items-center justify-center">
                <AlertCircle className="w-3 h-3 mr-1" /> {error}
              </p>
            )}
          </div>

          <button 
            onClick={handleVerify}
            disabled={verifying}
            className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-70 active:scale-95"
          >
            {verifying ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              'Unlock Permanently'
            )}
          </button>
          
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <p className="text-[10px] text-slate-400 font-medium italic">
              Developed by BahatiTech Solutions. One-time payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
