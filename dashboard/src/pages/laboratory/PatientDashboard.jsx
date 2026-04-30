import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

// ── inline styles ──────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .pd-layout {
    display: flex;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: #f8fafc;
  }

  /* ── SIDEBAR ── */
  .pd-sidebar {
    width: 200px;
    background: #ffffff;
    border-right: 1px solid #e8ecf0;
    display: flex;
    flex-direction: column;
    padding: 24px 16px;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
  }
  .pd-brand {
    font-size: 17px;
    font-weight: 700;
    color: #1a56db;
    margin-bottom: 28px;
    letter-spacing: -0.3px;
  }
  .pd-nav {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
  }
  .pd-nav-item {
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 400;
    color: #4b5563;
    cursor: pointer;
    border: none;
    background: none;
    text-align: left;
    transition: all 0.15s;
    width: 100%;
  }
  .pd-nav-item:hover { background: #f0f4ff; color: #1a56db; }
  .pd-nav-item.active {
    background: #e8f0fe;
    color: #1a56db;
    font-weight: 600;
  }
  .pd-user-box {
    margin-top: auto;
    padding: 11px 13px;
    background: #e8f0fe;
    border-radius: 10px;
  }
  .pd-user-name { font-size: 13px; font-weight: 600; color: #1e3a8a; }
  .pd-user-role { font-size: 11px; color: #1a56db; margin-top: 1px; }

  /* ── MAIN ── */
  .pd-main {
    flex: 1;
    margin-left: 200px;
    padding: 28px 30px;
  }

  /* ── TOPBAR ── */
  .pd-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 22px;
  }
  .pd-title { font-size: 22px; font-weight: 700; color: #0f172a; letter-spacing: -0.4px; }
  .pd-subtitle { font-size: 13px; color: #6b7280; margin-top: 3px; }
  .pd-id-chip {
    padding: 7px 16px;
    border: 1px solid #d1d5db;
    border-radius: 99px;
    font-size: 12.5px;
    font-weight: 500;
    color: #374151;
    background: #fff;
  }

  /* ── STAT CARDS ── */
  .pd-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 20px;
  }
  .pd-stat {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 12px;
    padding: 16px 18px;
  }
  .pd-stat-lbl { font-size: 12px; color: #6b7280; margin-bottom: 6px; }
  .pd-stat-val { font-size: 26px; font-weight: 700; letter-spacing: -0.5px; }
  .pd-stat-sub { font-size: 12px; margin-top: 3px; }
  .blue-txt { color: #1a56db; }
  .green-txt { color: #15803d; }
  .amber-txt { color: #b45309; }

  /* ── TWO COL ── */
  .pd-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* ── CARD ── */
  .pd-card {
    background: #fff;
    border: 1px solid #e8ecf0;
    border-radius: 12px;
    padding: 18px;
  }
  .pd-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 14px;
  }

  /* ── TEST ROWS ── */
  .pd-test-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
  }
  .pd-test-row:last-child { border: none; padding-bottom: 0; }
  .pd-test-icon {
    width: 38px; height: 38px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 700;
    flex-shrink: 0;
  }
  .icon-cbc { background: #dbeafe; color: #1e40af; }
  .icon-lft { background: #fef3c7; color: #92400e; }
  .icon-sugar { background: #f3e8ff; color: #7e22ce; }
  .icon-kft  { background: #fce7f3; color: #9d174d; }
  .icon-urine { background: #ecfdf5; color: #065f46; }
  .pd-test-name { font-size: 13px; font-weight: 600; color: #0f172a; }
  .pd-test-date { font-size: 11.5px; color: #9ca3af; margin-top: 1px; }
  .pd-badge {
    margin-left: auto;
    padding: 4px 11px;
    border-radius: 99px;
    font-size: 11.5px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .badge-ready   { background: #dcfce7; color: #15803d; }
  .badge-pending { background: #fef3c7; color: #b45309; }
  .badge-progress { background: #dbeafe; color: #1e40af; }

  /* ── QUICK ACTIONS ── */
  .pd-action-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .pd-action-btn {
    background: #f8fafc;
    border: 1px solid #e8ecf0;
    border-radius: 10px;
    padding: 14px;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s;
    width: 100%;
  }
  .pd-action-btn:hover {
    background: #f0f4ff;
    border-color: #bfdbfe;
  }
  .pd-action-title { font-size: 13px; font-weight: 600; color: #0f172a; margin-bottom: 3px; }
  .pd-action-sub { font-size: 11.5px; color: #9ca3af; }

  /* ── MODAL ── */
  .pd-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
    z-index: 999; padding: 20px;
  }
  .pd-modal {
    background: #fff;
    border-radius: 16px;
    width: 100%; max-width: 460px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 26px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }
  .pd-modal-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
  }
  .pd-modal-title { font-size: 17px; font-weight: 700; color: #0f172a; }
  .pd-close-btn {
    width: 30px; height: 30px;
    border-radius: 50%; border: 1px solid #e8ecf0;
    background: #f8fafc; cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center;
    color: #6b7280;
  }
  .pd-form-group { margin-bottom: 14px; }
  .pd-form-label { display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 5px; }
  .pd-form-input, .pd-form-select {
    width: 100%; padding: 9px 12px;
    border: 1px solid #d1d5db; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    color: #0f172a; background: #fff; outline: none;
    transition: border-color 0.15s;
  }
  .pd-form-input:focus, .pd-form-select:focus {
    border-color: #1a56db;
    box-shadow: 0 0 0 3px rgba(26,86,219,0.1);
  }
  .pd-submit-btn {
    width: 100%; padding: 10px;
    background: #1a56db; color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer; margin-top: 6px;
    transition: background 0.15s;
  }
  .pd-submit-btn:hover { background: #1e40af; }
  .pd-submit-btn:disabled { background: #93c5fd; cursor: not-allowed; }
  .pd-error { background: #fef2f2; color: #b91c1c; font-size: 13px; padding: 10px 13px; border-radius: 8px; margin-bottom: 12px; }
  .pd-success { background: #f0fdf4; color: #15803d; font-size: 13px; padding: 10px 13px; border-radius: 8px; margin-bottom: 12px; }
`;

// ── nav items ──────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { key: 'reports',       label: 'My Reports' },
  { key: 'book',          label: 'Book Test' },
  { key: 'appointments',  label: 'Appointments' },
  { key: 'billing',       label: 'Billing' },
  { key: 'profile',       label: 'Profile' },
];

// ── dummy fallback data ────────────────────────────────────────────────────
const DUMMY_TESTS = [
  { _id: '1', name: 'Complete Blood Count', category: 'CBC', date: 'Apr 20, 2025', status: 'Ready' },
  { _id: '2', name: 'Liver Function',       category: 'LFT', date: 'Apr 15, 2025', status: 'Ready' },
  { _id: '3', name: 'Blood Sugar',          category: 'Sugar', date: 'Apr 25, 2025', status: 'Pending' },
];

const iconClass = { CBC:'icon-cbc', LFT:'icon-lft', Sugar:'icon-sugar', KFT:'icon-kft', Urine:'icon-urine' };
const badgeClass = { Ready:'badge-ready', Pending:'badge-pending', 'In Progress':'badge-progress' };

// ── Book Test Modal ────────────────────────────────────────────────────────
function BookTestModal({ onClose, onSuccess }) {
  const [tests,   setTests]   = useState([]);
  const [form,    setForm]    = useState({ testId: '', date: '', notes: '' });
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');

  useEffect(() => {
    api.get('/tests').then(r => setTests(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      // Book test → create a billing record
      const selected = tests.find(t => t._id === form.testId);
      if (!selected) { setError('Koi test select karein'); setSaving(false); return; }
      await api.post('/billing', {
        tests: [{ test: selected._id, testName: selected.name, price: selected.price, status: 'Pending' }],
        totalAmount: selected.price,
        finalAmount: selected.price,
        paymentStatus: 'Pending',
        notes: form.notes,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch masla hua, dobara koshish karein');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="pd-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="pd-modal">
        <div className="pd-modal-head">
          <span className="pd-modal-title">Book a Test</span>
          <button className="pd-close-btn" onClick={onClose}>✕</button>
        </div>
        {error && <div className="pd-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="pd-form-group">
            <label className="pd-form-label">Test Select Karein *</label>
            <select className="pd-form-select" value={form.testId} onChange={e => setForm({...form, testId: e.target.value})} required>
              <option value="">-- Test chunein --</option>
              {tests.map(t => (
                <option key={t._id} value={t._id}>{t.name} — Rs {t.price}</option>
              ))}
            </select>
          </div>
          <div className="pd-form-group">
            <label className="pd-form-label">Date</label>
            <input className="pd-form-input" type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
          </div>
          <div className="pd-form-group">
            <label className="pd-form-label">Notes (optional)</label>
            <input className="pd-form-input" placeholder="Koi khas baat..." value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
          </div>
          <button className="pd-submit-btn" type="submit" disabled={saving}>
            {saving ? 'Booking...' : 'Book Test'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── main component ─────────────────────────────────────────────────────────
export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeNav,   setActiveNav]   = useState('reports');
  const [myTests,     setMyTests]     = useState(DUMMY_TESTS);
  const [stats,       setStats]       = useState({ testsDone: 12, reportsReady: 3, nextAppt: 'Apr 30', nextDoctor: 'Dr. Razia' });
  const [showBook,    setShowBook]    = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading,     setLoading]     = useState(false);

  // Fetch patient's bills/tests
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/billing');
        if (data.bills?.length > 0) {
          const allTests = data.bills.flatMap(b =>
            b.tests.map(t => ({
              _id: t._id,
              name: t.testName,
              category: t.testName?.split(' ')[0] || 'CBC',
              date: new Date(b.createdAt).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
              status: t.status === 'Completed' ? 'Ready' : t.status === 'In Progress' ? 'In Progress' : 'Pending',
            }))
          );
          if (allTests.length > 0) setMyTests(allTests);
          const ready = allTests.filter(t => t.status === 'Ready').length;
          setStats(s => ({ ...s, testsDone: allTests.length, reportsReady: ready }));
        }
      } catch { /* use dummy data */ }
      finally { setLoading(false); }
    };
    fetch();
  }, [showSuccess]);

  const handleLogout = () => { logout(); navigate('/login'); };

  const handleAction = (key) => {
    if (key === 'book')          setShowBook(true);
    else if (key === 'reports')  setActiveNav('reports');
    else if (key === 'billing')  setActiveNav('billing');
    else if (key === 'history')  setActiveNav('reports');
  };

  return (
    <>
      <style>{css}</style>
      <div className="pd-layout">

        {/* ── SIDEBAR ── */}
        <aside className="pd-sidebar">
          <div className="pd-brand">CareSynify</div>
          <nav className="pd-nav">
            {NAV_ITEMS.map(item => (
              <button
                key={item.key}
                className={`pd-nav-item ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveNav(item.key);
                  if (item.key === 'book') setShowBook(true);
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="pd-user-box">
            <div className="pd-user-name">{user?.name || 'Ahmed Khan'}</div>
            <div className="pd-user-role">Patient</div>
            <button
              onClick={handleLogout}
              style={{ marginTop:8, fontSize:11, color:'#1a56db', background:'none', border:'none', cursor:'pointer', padding:0, fontWeight:600 }}
            >
              Sign out →
            </button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="pd-main">

          {/* Topbar */}
          <div className="pd-topbar">
            <div>
              <div className="pd-title">My Health Dashboard</div>
              <div className="pd-subtitle">Good morning, {user?.name?.split(' ')[0] || 'Ahmed'}</div>
            </div>
            <div className="pd-id-chip">Patient ID: P-00421</div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="pd-stat-grid">
            <div className="pd-stat">
              <div className="pd-stat-lbl">Tests Done</div>
              <div className="pd-stat-val blue-txt">{stats.testsDone}</div>
              <div className="pd-stat-sub blue-txt">this year</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-lbl">Reports Ready</div>
              <div className="pd-stat-val green-txt">{stats.reportsReady}</div>
              <div className="pd-stat-sub green-txt">download now</div>
            </div>
            <div className="pd-stat">
              <div className="pd-stat-lbl">Next Appointment</div>
              <div className="pd-stat-val amber-txt" style={{ fontSize:18, marginTop:4 }}>{stats.nextAppt}</div>
              <div className="pd-stat-sub amber-txt">{stats.nextDoctor}</div>
            </div>
          </div>

          {/* ── TWO COL ── */}
          <div className="pd-two-col">

            {/* My Recent Tests */}
            <div className="pd-card">
              <div className="pd-card-title">My Recent Tests</div>
              {loading ? (
                <p style={{ color:'#94a3b8', fontSize:13 }}>Loading...</p>
              ) : myTests.slice(0, 4).map((t, i) => (
                <div className="pd-test-row" key={t._id || i}>
                  <div className={`pd-test-icon ${iconClass[t.category] || 'icon-cbc'}`}>
                    {t.category?.slice(0, 5) || 'CBC'}
                  </div>
                  <div style={{ flex:1 }}>
                    <div className="pd-test-name">{t.name}</div>
                    <div className="pd-test-date">{t.date}</div>
                  </div>
                  <span className={`pd-badge ${badgeClass[t.status] || 'badge-pending'}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pd-card">
              <div className="pd-card-title">Quick Actions</div>
              <div className="pd-action-grid">
                {[
                  { key:'book',    title:'Book a Test',  sub:'Schedule new lab test' },
                  { key:'reports', title:'My Reports',   sub:'Download results' },
                  { key:'billing', title:'Pay Bill',     sub:'View invoices' },
                  { key:'history', title:'History',      sub:'All past tests' },
                ].map(a => (
                  <button key={a.key} className="pd-action-btn" onClick={() => handleAction(a.key)}>
                    <div className="pd-action-title">{a.title}</div>
                    <div className="pd-action-sub">{a.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── MODALS ── */}
        {showBook && (
          <BookTestModal
            onClose={() => setShowBook(false)}
            onSuccess={() => { setShowBook(false); setShowSuccess(true); setTimeout(() => setShowSuccess(false), 3000); }}
          />
        )}

        {showSuccess && (
          <div style={{ position:'fixed', bottom:24, right:24, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:'12px 18px', color:'#15803d', fontSize:13.5, fontWeight:600, zIndex:9999, boxShadow:'0 4px 20px rgba(0,0,0,0.1)' }}>
            ✅ Test successfully book ho gaya!
          </div>
        )}
      </div>
    </>
  );
}
