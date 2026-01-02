
import React, { useState } from 'react';
import { Terminal, Copy, Search, Info, ShieldCheck, Check, Smartphone } from 'lucide-react';
import { SystemCode } from '../types';

export const CodesScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const codes: SystemCode[] = [
    { code: '*#06#', title: 'Find My IMEI', description: 'Shows your phone unique serial number.', category: 'Information' },
    { code: '*#*#4636#*#*', title: 'Testing Menu', description: 'Details about battery, WiFi, and phone stats.', category: 'Testing' },
    { code: '*#*#34971539#*#*', title: 'Camera Check', description: 'Detailed info about your phone camera.', category: 'Testing' },
    { code: '*#*#1111#*#*', title: 'Software Version', description: 'See what version of software you have.', category: 'Information' },
    { code: '*#*#232339#*#*', title: 'WiFi Speed Test', description: 'Run a speed test on your wireless network.', category: 'Testing' },
    { code: '*#*#0842#*#*', title: 'Vibration Test', description: 'Check if your phone vibrate works.', category: 'Testing' },
    { code: '*#*#2664#*#*', title: 'Screen Test', description: 'Check if your touch screen is working well.', category: 'Testing' },
    { code: '*#*#0*#*#*', title: 'LCD Display Test', description: 'Check the screen for any bad pixels.', category: 'Testing' },
    { code: '*#0*#', title: 'Samsung Test Menu', description: 'Full hardware check for Samsung phones.', category: 'Testing' },
    { code: '*#*#64663#*#*', title: 'Xiaomi CIT Menu', description: 'Hardware check for Xiaomi and Redmi phones.', category: 'Testing' },
    { code: '*#*#426#*#*', title: 'Google Play Service', description: 'Diagnostics for Google services.', category: 'System' },
    { code: '*#*#225#*#*', title: 'Calendar Stats', description: 'See how many events are in your calendar.', category: 'Information' },
    { code: '*#*#759#*#*', title: 'Debug Menu', description: 'Advanced developer settings.', category: 'Advanced' }
  ];

  const filteredCodes = codes.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.includes(searchTerm)
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="p-6 pb-24 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 flex items-center italic">
          <span className="text-emerald-600 mr-2">#</span>
          Hidden Codes
        </h1>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Android Secret Database</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search for a code..."
          className="w-full pl-14 pr-4 py-5 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm focus:outline-none focus:border-blue-500 text-slate-900 font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredCodes.map((c) => (
          <div 
            key={c.code}
            className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:border-blue-500 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider mb-2 inline-block ${
                    c.category === 'Testing' ? 'bg-amber-100 text-amber-600' :
                    c.category === 'Information' ? 'bg-blue-100 text-blue-600' :
                    'bg-emerald-100 text-emerald-600'
                  }`}>
                    {c.category}
                </span>
                <h3 className="text-lg font-black text-slate-900 mb-1">{c.title}</h3>
                <p className="text-xs text-slate-500 font-medium">{c.description}</p>
              </div>
              <button 
                onClick={() => handleCopy(c.code)}
                className={`p-4 rounded-2xl transition-all ${
                  copiedCode === c.code ? 'bg-emerald-500 text-white' : 'bg-slate-50 text-slate-400'
                }`}
              >
                {copiedCode === c.code ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="mono text-blue-600 font-black tracking-widest text-sm">{c.code}</span>
              <button 
                onClick={() => handleCopy(c.code)}
                className="text-[9px] font-black text-slate-400 uppercase tracking-widest"
              >
                Copy Code
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-8 bg-amber-50 rounded-[2.5rem] border border-amber-100 flex items-start">
        <Info className="text-amber-500 w-6 h-6 mr-4 shrink-0 mt-1" />
        <div>
          <h4 className="font-black text-amber-800 text-sm uppercase">Note</h4>
          <p className="text-[11px] text-amber-700 font-medium leading-relaxed">
            These codes are for testing. Only use the ones you understand. Some codes might reset your phone or change settings.
          </p>
        </div>
      </div>
    </div>
  );
};
