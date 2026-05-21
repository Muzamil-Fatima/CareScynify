import React from 'react';

export default function PrescriptionCanvas({ elements, selectedElement, setSelectedElement, patientData }) {
  return (
    <main className="flex-1 p-8 bg-slate-50 flex justify-center items-start overflow-y-auto print:p-0 print:bg-white">
      <div className="w-[210mm] min-h-[297mm] bg-white shadow-lg rounded-sm p-12 flex flex-col justify-between border border-slate-200 relative print:shadow-none print:border-none print:w-full print:min-h-0 print:p-4">
        
        <div className="space-y-6">
          {elements.map((el) => {
            if (!el.active) return null;
            const isSelected = selectedElement?.id === el.id;

            return (
              <div 
                key={el.id}
                onClick={() => setSelectedElement(el)}
                className={`group relative cursor-pointer rounded transition-all ${
                  isSelected ? 'ring-2 ring-blue-500 p-2 bg-blue-50/20' : 'hover:ring-1 hover:ring-dashed hover:ring-slate-300 p-2'
                }`}
              >
                <span className="absolute -top-2.5 left-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none print:hidden">
                  Click to Customize
                </span>

                {el.type === 'header' && (
                  <div className="border-b-2 border-blue-600 pb-4 flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{el.title}</h2>
                      <p className="text-sm text-slate-600 whitespace-pre-line mt-1">{el.subtitle}</p>
                    </div>
                    <div className="text-right text-xs text-slate-400 font-mono">Template ID: RX-2026</div>
                  </div>
                )}

                {el.type === 'patient_info' && (
                  <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200/60 text-sm print:bg-white print:border-slate-300">
                    <div><span className="font-semibold text-slate-500">Patient:</span> <p className="font-medium text-slate-900">{patientData.name}</p></div>
                    <div><span className="font-semibold text-slate-500">Age / Sex:</span> <p className="font-medium text-slate-900">{patientData.age} Y / {patientData.gender}</p></div>
                    <div><span className="font-semibold text-slate-500">Vitals:</span> <p className="font-medium text-slate-900">{patientData.bp} | {patientData.weight}</p></div>
                    <div className="text-right"><span className="font-semibold text-slate-500">Date:</span> <p className="font-medium text-slate-900">{patientData.date}</p></div>
                  </div>
                )}

                {el.type === 'rx_section' && (
                  <div className="pt-4 min-h-62.5">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-3xl font-serif font-bold text-blue-600">℞</span>
                      <div className="h-0.5 bg-slate-200 flex-1"></div>
                    </div>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                          <th className="pb-2 w-1/12">#</th>
                          <th className="pb-2 w-5/12">Medicine Name & Strength</th>
                          <th className="pb-2 w-2/12">Dosage</th>
                          <th className="pb-2 w-2/12">Duration</th>
                          <th className="pb-2 w-2/12">Instructions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {patientData.medicines.map((med, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/50">
                            <td className="py-3 font-medium text-slate-400">{idx + 1}</td>
                            <td className="py-3 font-semibold text-slate-900">{med.name || '---'}</td>
                            <td className="py-3 text-slate-700 font-mono">{med.dosage || '---'}</td>
                            <td className="py-3 text-slate-600">{med.duration || '---'}</td>
                            <td className="py-3 text-slate-500 italic">{med.instructions || '---'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {el.type === 'notes' && (
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-2">Advice & Clinical Notes</h4>
                    <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{patientData.notes || 'No specific notes.'}</p>
                  </div>
                )}

                {el.type === 'footer' && (
                  <div className="mt-12 pt-6 border-t-2 border-slate-100 flex justify-between items-end text-xs text-slate-500">
                    <p className="max-w-md">{el.text}</p>
                    <div className="text-center w-40">
                      <div className="border-b border-slate-400 h-8"></div>
                      <p className="mt-1 text-[10px] uppercase font-medium tracking-wider text-slate-400">Doctor Signature</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}