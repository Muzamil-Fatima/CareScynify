import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Pause, Play, CheckCircle2, FileText, Loader2 } from 'lucide-react';

export default function TestProcess() {
  const [tests] = useState([
    { id: 'T-001', patient: 'Ali Khan', test: 'CBC', stage: 2, status: 'Running', progress: 45 },
    { id: 'T-002', patient: 'Fatima Z.', test: 'GLUCOSE', stage: 4, status: 'Completed', progress: 100 },
    { id: 'T-003', patient: 'Ahmed R.', test: 'THYROID', stage: 1, status: 'Paused', progress: 0 },
  ]);

  const steps = ['Sample Received', 'Preparation', 'Running', 'Verification'];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar role="staff" />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-6">Test Process</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {tests.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <div className="flex justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-800">{t.patient}</h3>
                  <p className="text-[10px] text-slate-400 font-bold">{t.test} • {t.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-700">{t.status} • {t.progress}%</p>
                  <p className="text-[10px] text-slate-400 capitalize">{t.status === 'Completed' ? 'Finished' : 'Processing'}</p>
                </div>
              </div>

              {/* Advanced Stepper */}
              <div className="relative mb-8 px-2">
                <div className="flex justify-between mb-2">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${idx < t.stage ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-slate-100 border-slate-200'}`}>
                        {idx < t.stage ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 rounded-full bg-slate-300"></div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute top-3 left-6 right-6 h-0.5 bg-slate-100 -z-0"></div>
                <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase mt-2">
                  {steps.map((step, i) => <span key={i} className={i < t.stage ? 'text-emerald-600' : ''}>{step}</span>)}
                </div>
              </div>

              <div className="flex gap-3">
                {t.status === 'Completed' ? (
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                    <FileText size={14} /> View Report
                  </button>
                ) : (
                  <>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold">
                      {t.status === 'Paused' ? <Play size={14} /> : <Pause size={14} />} 
                      {t.status === 'Paused' ? 'Resume' : 'Pause'}
                    </button>
                    <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold">Complete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}