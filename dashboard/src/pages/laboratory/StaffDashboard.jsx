import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
  .sd-layout { display:flex; min-height:100vh; font-family:'DM Sans',sans-serif; background:#f8fafc; }
  .sd-sidebar { width:195px; background:#fff; border-right:1px solid #e2e8f0; display:flex; flex-direction:column; padding:22px 14px; position:fixed; top:0; left:0; bottom:0; z-index:100; }
  .sd-brand { font-size:16px; font-weight:700; color:#7c3aed; margin-bottom:26px; }
  .sd-nav { display:flex; flex-direction:column; gap:3px; flex:1; }
  .sd-nav-btn { padding:9px 12px; border-radius:8px; font-size:13.5px; color:#4b5563; cursor:pointer; border:none; background:none; text-align:left; width:100%; font-family:'DM Sans',sans-serif; transition:all 0.15s; }
  .sd-nav-btn:hover { background:#f5f3ff; color:#7c3aed; }
  .sd-nav-btn.active { background:#ede9fe; color:#6d28d9; font-weight:600; }
  .sd-user-box { margin-top:auto; padding:11px 13px; background:#ede9fe; border-radius:10px; }
  .sd-user-name { font-size:13px; font-weight:600; color:#4c1d95; }
  .sd-user-role { font-size:11px; color:#7c3aed; margin-top:2px; }
  .sd-logout { margin-top:8px; font-size:11px; color:#7c3aed; background:none; border:none; cursor:pointer; padding:0; font-weight:600; font-family:'DM Sans',sans-serif; }
  .sd-main { flex:1; margin-left:195px; padding:26px 28px; }
  .sd-topbar { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; }
  .sd-title { font-size:21px; font-weight:700; color:#0f172a; letter-spacing:-0.3px; }
  .sd-sub { font-size:12.5px; color:#6b7280; margin-top:3px; }
  .sd-shift-chip { padding:7px 16px; border:1px solid #d1d5db; border-radius:99px; font-size:12.5px; font-weight:500; color:#374151; background:#fff; }
  .sd-stat-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:18px; }
  .sd-stat { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:15px 17px; }
  .sd-stat-lbl { font-size:12px; color:#6b7280; margin-bottom:5px; }
  .sd-stat-val { font-size:28px; font-weight:700; letter-spacing:-0.5px; }
  .sd-stat-sub { font-size:12px; margin-top:4px; }
  .c-purple{color:#7c3aed;} .c-amber{color:#b45309;} .c-green{color:#15803d;}
  .sd-two-col { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
  .sd-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:17px; }
  .sd-card-title { font-size:14px; font-weight:600; color:#0f172a; margin-bottom:14px; }
  .sd-reg-row { display:flex; align-items:center; gap:11px; padding:10px 0; border-bottom:1px solid #f1f5f9; }
  .sd-reg-row:last-child { border:none; padding-bottom:0; }
  .sd-avatar { width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; flex-shrink:0; }
  .av-purple{background:#ede9fe;color:#6d28d9;} .av-blue{background:#dbeafe;color:#1e40af;} .av-amber{background:#fef3c7;color:#92400e;} .av-green{background:#dcfce7;color:#15803d;}
  .sd-reg-name { font-size:13px; font-weight:600; color:#0f172a; }
  .sd-reg-sub  { font-size:11px; color:#9ca3af; margin-top:1px; }
  .sd-badge { margin-left:auto; padding:4px 11px; border-radius:99px; font-size:11.5px; font-weight:600; flex-shrink:0; }
  .b-new{background:#dbeafe;color:#1d4ed8;} .b-processing{background:#ede9fe;color:#6d28d9;} .b-done{background:#dcfce7;color:#15803d;} .b-pending{background:#fef3c7;color:#b45309;}
  .sd-task-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
  .sd-task-btn { background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; cursor:pointer; text-align:left; transition:all 0.15s; width:100%; font-family:'DM Sans',sans-serif; }
  .sd-task-btn:hover { background:#f5f3ff; border-color:#c4b5fd; }
  .sd-task-title { font-size:13px; font-weight:600; color:#0f172a; margin-bottom:3px; }
  .sd-task-sub   { font-size:11.5px; color:#9ca3af; }
  .sd-modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; z-index:999; padding:20px; }
  .sd-modal { background:#fff; border-radius:16px; width:100%; max-width:480px; max-height:90vh; overflow-y:auto; padding:26px; box-shadow:0 20px 50px rgba(0,0,0,0.15); }
  .sd-modal-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; }
  .sd-modal-title { font-size:17px; font-weight:700; color:#0f172a; }
  .sd-close-btn { width:30px; height:30px; border-radius:50%; border:1px solid #e2e8f0; background:#f8fafc; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; color:#6b7280; }
  .sd-form-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  .sd-form-full { grid-column:1/-1; }
  .sd-form-label { display:block; font-size:13px; font-weight:500; color:#374151; margin-bottom:5px; }
  .sd-form-input,.sd-form-select { width:100%; padding:9px 12px; border:1px solid #d1d5db; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:13.5px; color:#0f172a; background:#fff; outline:none; transition:border-color 0.15s; box-sizing:border-box; }
  .sd-form-input:focus,.sd-form-select:focus { border-color:#7c3aed; box-shadow:0 0 0 3px rgba(124,58,237,0.1); }
  .sd-info-box { background:#f5f3ff; padding:10px 12px; border-radius:8px; font-size:13px; color:#4c1d95; }
  .sd-btn-row { display:flex; gap:10px; margin-top:20px; }
  .sd-submit-btn { flex:1; padding:10px; background:#7c3aed; color:#fff; border:none; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:600; cursor:pointer; }
  .sd-submit-btn:hover { background:#6d28d9; }
  .sd-submit-btn:disabled { background:#c4b5fd; cursor:not-allowed; }
  .sd-cancel-btn { padding:10px 18px; background:#f8fafc; color:#374151; border:1px solid #e2e8f0; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:14px; cursor:pointer; }
  .sd-error { background:#fef2f2; color:#b91c1c; font-size:13px; padding:10px 13px; border-radius:8px; margin-bottom:12px; }
  .sd-toast { position:fixed; bottom:24px; right:24px; background:#f5f3ff; border:1px solid #c4b5fd; border-radius:10px; padding:12px 18px; color:#6d28d9; font-size:13.5px; font-weight:600; z-index:9999; box-shadow:0 4px 20px rgba(0,0,0,0.1); font-family:'DM Sans',sans-serif; }
  .sd-loading { color:#94a3b8; font-size:13px; padding:12px 0; }
`;

// ── Register Patient Modal ─────────────────────────────────────────────────
function RegisterModal({ onClose, onSaved }) {
  const [form, setForm] = useState({ name:'', phone:'', age:'', gender:'Male', bloodGroup:'', address:'' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      await api.post('/patients', { ...form, status:'New' });
      onSaved('✅ Patient register ho gaya!');
    } catch (err) { setError(err.response?.data?.message || 'Error hua'); }
    finally { setSaving(false); }
  };

  return (
    <div className="sd-modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="sd-modal">
        <div className="sd-modal-head">
          <span className="sd-modal-title">Register New Patient</span>
          <button className="sd-close-btn" onClick={onClose}>✕</button>
        </div>
        {error && <div className="sd-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="sd-form-grid">
            <div><label className="sd-form-label">Full Name *</label><input className="sd-form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Ahmed Khan"/></div>
            <div><label className="sd-form-label">Phone *</label><input className="sd-form-input" type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required placeholder="03XX-XXXXXXX"/></div>
            <div><label className="sd-form-label">Age</label><input className="sd-form-input" type="number" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} placeholder="25"/></div>
            <div><label className="sd-form-label">Gender</label><select className="sd-form-select" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})}><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div><label className="sd-form-label">Blood Group</label><select className="sd-form-select" value={form.bloodGroup} onChange={e=>setForm({...form,bloodGroup:e.target.value})}><option value="">Select</option>{['A+','A-','B+','B-','AB+','AB-','O+','O-'].map(b=><option key={b}>{b}</option>)}</select></div>
            <div><label className="sd-form-label">Address</label><input className="sd-form-input" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="City, Area"/></div>
          </div>
          <div className="sd-btn-row">
            <button type="button" className="sd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="sd-submit-btn" disabled={saving}>{saving?'Saving...':'Register Patient'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Add Test Modal ─────────────────────────────────────────────────────────
function AddTestModal({ onClose, onSaved }) {
  const [patients, setPatients] = useState([]);
  const [tests, setTests]       = useState([]);
  const [form, setForm]         = useState({ patientId:'', testId:'', paymentMethod:'Cash' });
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState('');

  useEffect(() => {
    api.get('/patients').then(r=>setPatients(r.data.patients||[])).catch(()=>{});
    api.get('/tests').then(r=>setTests(r.data||[])).catch(()=>{});
  }, []);

  const selected = tests.find(t=>t._id===form.testId);

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      if (!form.patientId) { setError('Patient select karein'); setSaving(false); return; }
      if (!form.testId)    { setError('Test select karein');    setSaving(false); return; }
      await api.post('/billing', {
        patient: form.patientId,
        tests: [{ test:form.testId, testName:selected?.name, price:selected?.price, status:'Pending' }],
        totalAmount: selected?.price||0,
        finalAmount: selected?.price||0,
        paymentStatus: 'Pending',
        paymentMethod: form.paymentMethod,
      });
      onSaved('✅ Test add ho gaya!');
    } catch (err) { setError(err.response?.data?.message||'Error hua'); }
    finally { setSaving(false); }
  };

  return (
    <div className="sd-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sd-modal">
        <div className="sd-modal-head">
          <span className="sd-modal-title">Add Test</span>
          <button className="sd-close-btn" onClick={onClose}>✕</button>
        </div>
        {error && <div className="sd-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="sd-form-grid">
            <div className="sd-form-full"><label className="sd-form-label">Patient *</label><select className="sd-form-select" value={form.patientId} onChange={e=>setForm({...form,patientId:e.target.value})} required><option value="">-- Patient chunein --</option>{patients.map(p=><option key={p._id} value={p._id}>{p.name} — {p.phone}</option>)}</select></div>
            <div className="sd-form-full"><label className="sd-form-label">Test *</label><select className="sd-form-select" value={form.testId} onChange={e=>setForm({...form,testId:e.target.value})} required><option value="">-- Test chunein --</option>{tests.map(t=><option key={t._id} value={t._id}>{t.name} — Rs {t.price}</option>)}</select></div>
            {selected && <div className="sd-form-full"><div className="sd-info-box">Category: {selected.category} | Price: Rs {selected.price} | TAT: {selected.turnaroundTime}</div></div>}
            <div className="sd-form-full"><label className="sd-form-label">Payment Method</label><select className="sd-form-select" value={form.paymentMethod} onChange={e=>setForm({...form,paymentMethod:e.target.value})}><option>Cash</option><option>Card</option><option>Online</option></select></div>
          </div>
          <div className="sd-btn-row">
            <button type="button" className="sd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="sd-submit-btn" disabled={saving}>{saving?'Adding...':'Add Test'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Generate Bill Modal ────────────────────────────────────────────────────
function BillModal({ onClose, onSaved }) {
  const [bills, setBills]   = useState([]);
  const [form, setForm]     = useState({ billId:'', discount:0, paymentMethod:'Cash' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    api.get('/billing', { params:{ paymentStatus:'Pending', limit:20 } })
      .then(r=>setBills(r.data.bills||[])).catch(()=>{});
  }, []);

  const sel    = bills.find(b=>b._id===form.billId);
  const final  = sel ? sel.totalAmount - (Number(form.discount)||0) : 0;

  const submit = async (e) => {
    e.preventDefault(); setSaving(true); setError('');
    try {
      if (!form.billId) { setError('Bill select karein'); setSaving(false); return; }
      await api.put(`/billing/${form.billId}`, { discount:Number(form.discount), finalAmount:final, paymentStatus:'Paid', paymentMethod:form.paymentMethod });
      onSaved(`✅ Bill paid! Rs ${final} receive hua.`);
    } catch (err) { setError(err.response?.data?.message||'Error hua'); }
    finally { setSaving(false); }
  };

  return (
    <div className="sd-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sd-modal">
        <div className="sd-modal-head">
          <span className="sd-modal-title">Generate Bill</span>
          <button className="sd-close-btn" onClick={onClose}>✕</button>
        </div>
        {error && <div className="sd-error">{error}</div>}
        <form onSubmit={submit}>
          <div className="sd-form-grid">
            <div className="sd-form-full"><label className="sd-form-label">Pending Bill *</label><select className="sd-form-select" value={form.billId} onChange={e=>setForm({...form,billId:e.target.value})} required><option value="">-- Bill chunein --</option>{bills.map(b=><option key={b._id} value={b._id}>{b.invoiceNumber} — {b.patient?.name} — Rs {b.totalAmount}</option>)}</select></div>
            {sel && <div className="sd-form-full"><div className="sd-info-box">Invoice: {sel.invoiceNumber} | Total: Rs {sel.totalAmount}</div></div>}
            <div><label className="sd-form-label">Discount (Rs)</label><input className="sd-form-input" type="number" min="0" value={form.discount} onChange={e=>setForm({...form,discount:e.target.value})} placeholder="0"/></div>
            <div><label className="sd-form-label">Final Amount</label><input className="sd-form-input" readOnly value={`Rs ${final}`} style={{background:'#f8fafc',fontWeight:600}}/></div>
            <div className="sd-form-full"><label className="sd-form-label">Payment Method</label><select className="sd-form-select" value={form.paymentMethod} onChange={e=>setForm({...form,paymentMethod:e.target.value})}><option>Cash</option><option>Card</option><option>Online</option></select></div>
          </div>
          <div className="sd-btn-row">
            <button type="button" className="sd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="sd-submit-btn" disabled={saving}>{saving?'Processing...':'✓ Mark as Paid'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Print Modal ────────────────────────────────────────────────────────────
function PrintModal({ onClose }) {
  const [bills, setBills]   = useState([]);
  const [billId, setBillId] = useState('');

  useEffect(() => {
    api.get('/billing',{params:{limit:30}}).then(r=>setBills(r.data.bills||[])).catch(()=>{});
  }, []);

  const handlePrint = () => {
    const b = bills.find(x=>x._id===billId);
    if (!b) return;
    const w = window.open('','_blank');
    w.document.write(`<html><head><title>${b.invoiceNumber}</title>
    <style>body{font-family:sans-serif;padding:30px;color:#0f172a;}h1{color:#7c3aed;}table{width:100%;border-collapse:collapse;margin-top:16px;}th,td{padding:10px;border:1px solid #e2e8f0;font-size:13px;}th{background:#f5f3ff;}</style>
    </head><body>
    <h1>CareSynify Lab Report</h1>
    <p><b>Invoice:</b> ${b.invoiceNumber} &nbsp; <b>Patient:</b> ${b.patient?.name||'N/A'} &nbsp; <b>Date:</b> ${new Date(b.createdAt).toLocaleDateString()}</p>
    <table><thead><tr><th>Test</th><th>Status</th><th>Result</th><th>Price</th></tr></thead>
    <tbody>${b.tests.map(t=>`<tr><td>${t.testName}</td><td>${t.status}</td><td>${t.result||'Pending'}</td><td>Rs ${t.price}</td></tr>`).join('')}</tbody></table>
    <p style="margin-top:16px;"><b>Total:</b> Rs ${b.totalAmount} | <b>Discount:</b> Rs ${b.discount||0} | <b>Final:</b> Rs ${b.finalAmount} | <b>Payment:</b> ${b.paymentStatus}</p>
    <p style="margin-top:20px;font-size:11px;color:#94a3b8;">Printed: ${new Date().toLocaleString()}</p>
    </body></html>`);
    w.document.close(); w.print(); onClose();
  };

  return (
    <div className="sd-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="sd-modal">
        <div className="sd-modal-head">
          <span className="sd-modal-title">Print Report</span>
          <button className="sd-close-btn" onClick={onClose}>✕</button>
        </div>
        <label className="sd-form-label">Report Select Karein *</label>
        <select className="sd-form-select" value={billId} onChange={e=>setBillId(e.target.value)}>
          <option value="">-- Report chunein --</option>
          {bills.map(b=><option key={b._id} value={b._id}>{b.invoiceNumber} — {b.patient?.name}</option>)}
        </select>
        <div className="sd-btn-row">
          <button className="sd-cancel-btn" onClick={onClose}>Cancel</button>
          <button className="sd-submit-btn" onClick={handlePrint} disabled={!billId}>🖨️ Print Report</button>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function StaffDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeNav,  setActiveNav]  = useState('dashboard');
  const [stats,      setStats]      = useState({ registered:9, processing:14, revenue:42000 });
  const [recentRegs, setRecentRegs] = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [modal,      setModal]      = useState(null);
  const [toast,      setToast]      = useState('');

  const showToast  = (msg) => { setToast(msg); setTimeout(()=>setToast(''),3500); };
  const closeModal = () => setModal(null);
  const onSaved    = (msg) => { closeModal(); showToast(msg); fetchData(); };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: pData } = await api.get('/patients', { params:{ limit:5 } });
      if (pData.patients?.length > 0) {
        setRecentRegs(pData.patients.map((p,i) => ({
          _id: p._id,
          name: p.name,
          initials: p.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase(),
          avClass: ['av-purple','av-blue','av-amber','av-green'][i%4],
          sub: `Registered · ${new Date(p.createdAt).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}`,
          status: p.status==='New'?'New': p.status==='Active'?'Done':'Processing',
          bClass: p.status==='New'?'b-new': p.status==='Active'?'b-done':'b-processing',
        })));
        setStats(s=>({...s, registered: pData.total||pData.patients.length}));
      }
      const { data: bData } = await api.get('/billing', { params:{ limit:50 } });
      if (bData.bills?.length > 0) {
        const proc = bData.bills.filter(b=>b.tests.some(t=>t.status==='In Progress')).length;
        const rev  = bData.bills.filter(b=>b.paymentStatus==='Paid').reduce((s,b)=>s+b.finalAmount,0);
        setStats(s=>({...s, processing:proc, revenue:rev}));
      }
    } catch {}
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const fmtRev = (v) => v>=100000?`Rs ${(v/100000).toFixed(1)}L`:v>=1000?`Rs ${(v/1000).toFixed(0)}K`:`Rs ${v}`;

  const DUMMY = [
    { _id:'1', name:'Zara Alam',  initials:'ZA', avClass:'av-purple', sub:'Registered · 9:14 AM', status:'New',        bClass:'b-new'        },
    { _id:'2', name:'Imran Khan', initials:'IK', avClass:'av-blue',   sub:'CBC booked · 9:02 AM', status:'Processing', bClass:'b-processing' },
    { _id:'3', name:'Nadia Butt', initials:'NB', avClass:'av-amber',  sub:'Report ready · 8:45 AM',status:'Done',      bClass:'b-done'       },
  ];
  const display = recentRegs.length > 0 ? recentRegs : DUMMY;

  return (
    <>
      <style>{css}</style>
      <div className="sd-layout">

        <aside className="sd-sidebar">
          <div className="sd-brand">CareSynify</div>
          <nav className="sd-nav">
            {[
              {key:'dashboard',        label:'Dashboard'},
              {key:'register-patient', label:'Register Patient'},
              {key:'process-tests',    label:'Process Tests'},
              {key:'billing',          label:'Billing'},
              {key:'reports',          label:'Reports'},
            ].map(item => (
              <button key={item.key} className={`sd-nav-btn ${activeNav===item.key?'active':''}`}
                onClick={() => {
                  setActiveNav(item.key);
                  if (item.key==='register-patient') setModal('register');
                  if (item.key==='process-tests')    setModal('addtest');
                  if (item.key==='billing')           setModal('bill');
                  if (item.key==='reports')           setModal('print');
                }}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sd-user-box">
            <div className="sd-user-name">{user?.name||'Sana Arif'}</div>
            <div className="sd-user-role">Lab Staff</div>
            <button className="sd-logout" onClick={()=>{logout();navigate('/login');}}>Sign out →</button>
          </div>
        </aside>

        <main className="sd-main">
          <div className="sd-topbar">
            <div>
              <div className="sd-title">Staff Dashboard</div>
              <div className="sd-sub">Good morning, {user?.name?.split(' ')[0]||'Sana'}</div>
            </div>
            <div className="sd-shift-chip">Shift: Morning</div>
          </div>

          <div className="sd-stat-grid">
            <div className="sd-stat"><div className="sd-stat-lbl">Registered Today</div><div className="sd-stat-val c-purple">{stats.registered}</div><div className="sd-stat-sub c-purple">patients</div></div>
            <div className="sd-stat"><div className="sd-stat-lbl">Tests Processing</div><div className="sd-stat-val c-amber">{stats.processing}</div><div className="sd-stat-sub c-amber">in progress</div></div>
            <div className="sd-stat"><div className="sd-stat-lbl">Bills Generated</div><div className="sd-stat-val c-green">{fmtRev(stats.revenue)}</div><div className="sd-stat-sub c-green">today</div></div>
          </div>

          <div className="sd-two-col">
            <div className="sd-card">
              <div className="sd-card-title">Recent Registrations</div>
              {loading ? <div className="sd-loading">Loading...</div> :
                display.map((r,i) => (
                  <div className="sd-reg-row" key={r._id||i}>
                    <div className={`sd-avatar ${r.avClass}`}>{r.initials}</div>
                    <div style={{flex:1}}>
                      <div className="sd-reg-name">{r.name}</div>
                      <div className="sd-reg-sub">{r.sub}</div>
                    </div>
                    <span className={`sd-badge ${r.bClass}`}>{r.status}</span>
                  </div>
                ))
              }
            </div>

            <div className="sd-card">
              <div className="sd-card-title">Quick Tasks</div>
              <div className="sd-task-grid">
                <button className="sd-task-btn" onClick={()=>setModal('register')}><div className="sd-task-title">Register Patient</div><div className="sd-task-sub">Add new patient</div></button>
                <button className="sd-task-btn" onClick={()=>setModal('addtest')}><div className="sd-task-title">Add Test</div><div className="sd-task-sub">Process sample</div></button>
                <button className="sd-task-btn" onClick={()=>setModal('bill')}><div className="sd-task-title">Generate Bill</div><div className="sd-task-sub">Create invoice</div></button>
                <button className="sd-task-btn" onClick={()=>setModal('print')}><div className="sd-task-title">Print Report</div><div className="sd-task-sub">Send to patient</div></button>
              </div>
            </div>
          </div>
        </main>

        {modal==='register' && <RegisterModal  onClose={closeModal} onSaved={onSaved} />}
        {modal==='addtest'  && <AddTestModal   onClose={closeModal} onSaved={onSaved} />}
        {modal==='bill'     && <BillModal      onClose={closeModal} onSaved={onSaved} />}
        {modal==='print'    && <PrintModal     onClose={closeModal} />}

        {toast && <div className="sd-toast">{toast}</div>}
      </div>
    </>
  );
}
