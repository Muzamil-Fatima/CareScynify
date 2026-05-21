import React from 'react';

export default function SidebarControls({ elements, toggleElement, selectedElement, updateElementText }) {
  return (
    <aside className="w-80 bg-white border-r border-slate-200 p-5 flex flex-col gap-6 overflow-y-auto print:hidden">
      <div>
        <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-3">1. Layout Controls</h3>
        <p className="text-xs text-slate-500 mb-4">Prescription ke structure me sections shamil ya khatam karne ke liye toggle karain:</p>
        <div className="space-y-2">
          {elements.map(el => (
            <label key={el.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition">
              <span className="text-sm font-medium capitalize">{el.id.replace('_', ' ')}</span>
              <input 
                type="checkbox" 
                checked={el.active} 
                onChange={() => toggleElement(el.id)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
            </label>
          ))}
        </div>
      </div>

      <hr className="border-slate-200" />

      {selectedElement && (
        <div>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-400 mb-3">2. Edit Selection</h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
            <p className="text-xs font-bold text-blue-600 capitalize">Editing: {selectedElement.id}</p>
            
            {selectedElement.type === 'header' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Hospital / Clinic Name</label>
                  <input 
                    type="text" 
                    value={selectedElement.title}
                    onChange={(e) => updateElementText(selectedElement.id, { title: e.target.value })}
                    className="w-full text-sm p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Doctor Info Subtitle</label>
                  <textarea 
                    rows="3"
                    value={selectedElement.subtitle}
                    onChange={(e) => updateElementText(selectedElement.id, { subtitle: e.target.value })}
                    className="w-full text-sm p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
              </>
            )}

            {selectedElement.type === 'footer' && (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Footer Text</label>
                <input 
                  type="text" 
                  value={selectedElement.text}
                  onChange={(e) => updateElementText(selectedElement.id, { text: e.target.value })}
                  className="w-full text-sm p-2 border border-slate-300 rounded focus:ring-1 focus:ring-blue-500 outline-none"
                />
              </div>
            )}
            
            {['patient_info', 'rx_section', 'notes'].includes(selectedElement.type) && (
              <p className="text-xs text-slate-500 italic">Is area ka layout standardized hai jo patient dynamic inputs se link hai.</p>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}