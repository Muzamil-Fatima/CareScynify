import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

// ── CSS ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

  .dd-layout {
    display: flex;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
    background: #f8fafc;
  }

  /* SIDEBAR */
  .dd-sidebar {
    width: 195px;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    padding: 22px 14px;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 100;
  }
  .dd-brand {
    font-size: 16px;
    font-weight: 700;
    color: #16a34a;
    margin-bottom: 26px;
    letter-spacing: -0.3px;
  }
  .dd-nav {
    display: flex;
    flex-direction: column;
    gap: 3px;
    flex: 1;
  }
  .dd-nav-btn {
    padding: 9px 12px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 400;
    color: #4b5563;
    cursor: pointer;
    border: none;
    background: none;
    text-align: left;
    width: 100%;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.15s;
  }
  .dd-nav-btn:hover { background: #f0fdf4; color: #16a34a; }
  .dd-nav-btn.active { background: #dcfce7; color: #15803d; font-weight: 600; }

  .dd-user-box {
    margin-top: auto;
    padding: 11px 13px;
    background: #dcfce7;
    border-radius: 10px;
  }
  .dd-user-name { font-size: 13px; font-weight: 600; color: #14532d; }
  .dd-user-role { font-size: 11px; color: #16a34a; margin-top: 2px; }
  .dd-logout {
    margin-top: 8px; font-size: 11px; color: #16a34a;
    background: none; border: none; cursor: pointer;
    padding: 0; font-weight: 600; font-family: 'DM Sans', sans-serif;
  }

  /* MAIN */
  .dd-main {
    flex: 1;
    margin-left: 195px;
    padding: 26px 28px;
  }

  /* TOPBAR */
  .dd-topbar {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }
  .dd-title { font-size: 21px; font-weight: 700; color: #0f172a; letter-spacing: -0.3px; }
  .dd-sub { font-size: 12.5px; color: #6b7280; margin-top: 3px; }
  .dd-date-chip {
    padding: 7px 16px;
    border: 1px solid #d1d5db;
    border-radius: 99px;
    font-size: 12.5px;
    font-weight: 500;
    color: #374151;
    background: #fff;
  }

  /* STAT CARDS */
  .dd-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 18px;
  }
  .dd-stat {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 15px 17px;
  }
  .dd-stat-lbl { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
  .dd-stat-val { font-size: 28px; font-weight: 700; color: #0f172a; letter-spacing: -0.5px; }
  .dd-stat-sub { font-size: 12px; margin-top: 4px; }
  .txt-gray  { color: #6b7280; }
  .txt-red   { color: #dc2626; }
  .txt-blue  { color: #1d4ed8; }
  .txt-green { color: #15803d; }

  /* TWO COL */
  .dd-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  /* CARD */
  .dd-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 17px;
  }
  .dd-card-title {
    font-size: 14px;
    font-weight: 600;
    color: #0f172a;
    margin-bottom: 14px;
  }

  /* PATIENT ROWS */
  .dd-patient-row {
    display: flex;
    align-items: center;
    gap: 11px;
    padding: 10px 0;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    transition: background 0.1s;
    border-radius: 6px;
    padding-left: 4px;
  }
  .dd-patient-row:last-child { border-bottom: none; }
  .dd-patient-row:hover { background: #f8fafc; }

  .dd-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 700;
    flex-shrink: 0;
  }
  .av-blue   { background: #dbeafe; color: #1e40af; }
  .av-green  { background: #dcfce7; color: #15803d; }
  .av-purple { background: #f3e8ff; color: #7e22ce; }
  .av-amber  { background: #fef3c7; color: #92400e; }

  .dd-p-name { font-size: 13px; font-weight: 600; color: #0f172a; }
  .dd-p-sub  { font-size: 11.5px; color: #9ca3af; margin-top: 1px; }

  .dd-badge {
    margin-left: auto;
    padding: 4px 11px;
    border-radius: 99px;
    font-size: 11.5px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .b-urgent  { background: #fef2f2; color: #dc2626; border: 1px solid #fecaca; }
  .b-review  { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
  .b-inlab   { background: #dbeafe; color: #1d4ed8; border: 1px solid #bfdbfe; }
  .b-done    { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }

  /* BAR CHART */
  .dd-bar-wrap { margin-top: 4px; }
  .dd-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .dd-bar-lbl { font-size: 12px; color: #4b5563; width: 42px; flex-shrink: 0; font-weight: 500; }
  .dd-bar-track {
    flex: 1; height: 8px;
    background: #f1f5f9;
    border-radius: 99px;
    overflow: hidden;
  }
  .dd-bar-fill { height: 100%; border-radius: 99px; background: #16a34a; transition: width 0.6s ease; }
  .dd-bar-val { font-size: 12px; color: #6b7280; width: 22px; text-align: right; }

  /* MODAL */
  .dd-modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.3);
    display: flex; align-items: center; justify-content: center;
    z-index: 999; padding: 20px;
  }
  .dd-modal {
    background: #fff;
    border-radius: 16px;
    width: 100%; max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 26px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.15);
  }
  .dd-modal-head {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 18px;
  }
  .dd-modal-title { font-size: 17px; font-weight: 700; color: #0f172a; }
  .dd-close-btn {
    width: 30px; height: 30px; border-radius: 50%;
    border: 1px solid #e2e8f0; background: #f8fafc;
    cursor: pointer; font-size: 14px;
    display: flex; align-items: center; justify-content: center; color: #6b7280;
  }
  .dd-form-group { margin-bottom: 14px; }
  .dd-form-label { display: block; font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 5px; }
  .dd-form-input, .dd-form-select, .dd-form-textarea {
    width: 100%; padding: 9px 12px;
    border: 1px solid #d1d5db; border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px;
    color: #0f172a; background: #fff; outline: none;
    transition: border-color 0.15s;
  }
  .dd-form-input:focus, .dd-form-select:focus, .dd-form-textarea:focus {
    border-color: #16a34a;
    box-shadow: 0 0 0 3px rgba(22,163,74,0.1);
  }
  .dd-form-textarea { resize: vertical; min-height: 80px; }
  .dd-btn-row { display: flex; gap: 10px; margin-top: 6px; }
  .dd-submit-btn {
    flex: 1; padding: 10px;
    background: #16a34a; color: #fff;
    border: none; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer; transition: background 0.15s;
  }
  .dd-submit-btn:hover { background: #15803d; }
  .dd-submit-btn:disabled { background: #86efac; cursor: not-allowed; }
  .dd-cancel-btn {
    padding: 10px 18px;
    background: #f8fafc; color: #374151;
    border: 1px solid #e2e8f0; border-radius: 8px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 500; cursor: pointer;
  }
  .dd-error   { background: #fef2f2; color: #b91c1c; font-size: 13px; padding: 10px 13px; border-radius: 8px; margin-bottom: 12px; }
  .dd-success { background: #f0fdf4; color: #15803d; font-size: 13px; padding: 10px 13px; border-radius: 8px; margin-bottom: 12px; }

  /* PATIENT DETAIL in modal */
  .dd-detail-box {
    background: #f8fafc; border: 1px solid #e2e8f0;
    border-radius: 10px; padding: 14px; margin-bottom: 16px;
  }
  .dd-detail-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px; }
  .dd-detail-row:last-child { margin-bottom: 0; }
  .dd-detail-lbl { color: #6b7280; }
  .dd-detail-val { font-weight: 600; color: #0f172a; }

  /* TOAST */
  .dd-toast {
    position: fixed; bottom: 24px; right: 24px;
    background: #f0fdf4; border: 1px solid #bbf7d0;
    border-radius: 10px; padding: 12px 18px;
    color: #15803d; font-size: 13.5px; font-weight: 600;
    z-index: 9999; box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    font-family: 'DM Sans', sans-serif;
  }

  /* Loading */
  .dd-loading { color: #94a3b8; font-size: 13px; padding: 12px 0; }
  .dd-empty   { color: #94a3b8; font-size: 13px; text-align: center; padding: 20px 0; }
`;

// ── Nav items ──────────────────────────────────────────────────────────────
const NAV = [
  { key: 'dashboard',   label: 'Dashboard' },
  { key: 'patients',    label: 'My Patients' },
  { key: 'reports',     label: 'Review Reports' },
  { key: 'appointments',label: 'Appointments' },
  { key: 'catalog',     label: 'Test Catalog' },
];

// ── Dummy fallback data ────────────────────────────────────────────────────
const DUMMY_PATIENTS = [
  { _id: '1', name: 'Ahmed Khan',  initials: 'AK', avClass: 'av-blue',   sub: 'CBC · waiting review', status: 'Urgent',  bClass: 'b-urgent' },
  { _id: '2', name: 'Sana Arif',   initials: 'SA', avClass: 'av-green',  sub: 'Sugar · ready',        status: 'Review',  bClass: 'b-review' },
  { _id: '3', name: 'M. Hassan',   initials: 'MH', avClass: 'av-purple', sub: 'LFT · in progress',    status: 'In Lab',  bClass: 'b-inlab'  },
];

const DUMMY_BARS = [
  { label: 'CBC',   pct: 85, val: 24 },
  { label: 'Sugar', pct: 64, val: 18 },
  { label: 'LFT',   pct: 50, val: 14 },
  { label: 'Urine', pct: 32, val: 9  },
  { label: 'KFT',   pct: 21, val: 6  },
];

// ── Review Modal ───────────────────────────────────────────────────────────
function ReviewModal({ patient, onClose, onSaved }) {
  const [form, setForm]     = useState({ result: '', notes: '', status: 'Completed' });
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError('');
    try {
      // Update billing record test result
      if (patient.billId) {
        await api.put(`/billing/${patient.billId}`, {
          tests: patient.tests?.map(t =>
            t._id === patient.testId
              ? { ...t, result: form.result, status: form.status }
              : t
          )
        });
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || 'Kuch masla hua');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dd-modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="dd-modal">
        <div className="dd-modal-head">
          <span className="dd-modal-title">Report Review</span>
          <button className="dd-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Patient info */}
        <div className="dd-detail-box">
          <div className="dd-detail-row">
            <span className="dd-detail-lbl">Patient</span>
            <span className="dd-detail-val">{patient.name}</span>
          </div>
          <div className="dd-detail-row">
            <span className="dd-detail-lbl">Test</span>
            <span className="dd-detail-val">{patient.testName || patient.sub}</span>
          </div>
          <div className="dd-detail-row">
            <span className="dd-detail-lbl">Status</span>
            <span className={`dd-badge ${patient.bClass}`}>{patient.status}</span>
          </div>
        </div>

        {error && <div className="dd-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="dd-form-group">
            <label className="dd-form-label">Result Value</label>
            <input
              className="dd-form-input"
              placeholder="e.g. 12.5 g/dL, Normal, 140 mg/dL"
              value={form.result}
              onChange={e => setForm({ ...form, result: e.target.value })}
              required
            />
          </div>
          <div className="dd-form-group">
            <label className="dd-form-label">Status Update</label>
            <select
              className="dd-form-select"
              value={form.status}
              onChange={e => setForm({ ...form, status: e.target.value })}
            >
              <option value="Completed">Completed — Report Ready</option>
              <option value="In Progress">In Progress — Still Processing</option>
              <option value="Pending">Pending — Awaiting Sample</option>
            </select>
          </div>
          <div className="dd-form-group">
            <label className="dd-form-label">Doctor Notes</label>
            <textarea
              className="dd-form-textarea"
              placeholder="Clinical notes, recommendations..."
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
            />
          </div>
          <div className="dd-btn-row">
            <button type="button" className="dd-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="dd-submit-btn" disabled={saving}>
              {saving ? 'Saving...' : '✓ Finalize Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export default function DoctorDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeNav,    setActiveNav]    = useState('dashboard');
  const [stats,        setStats]        = useState({ todayPatients: 18, reportsPending: 7, reviewedToday: 11 });
  const [patients,     setPatients]     = useState(DUMMY_PATIENTS);
  const [barData,      setBarData]      = useState(DUMMY_BARS);
  const [loading,      setLoading]      = useState(false);
  const [reviewModal,  setReviewModal]  = useState(null);   // selected patient
  const [toast,        setToast]        = useState('');

  // ── fetch real data ──
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Pending bills = patients to review
        const { data } = await api.get('/billing', { params: { paymentStatus: '', limit: 10 } });
        if (data.bills?.length > 0) {
          const rows = data.bills.flatMap(b =>
            b.tests.map(t => ({
              _id:      t._id || b._id,
              billId:   b._id,
              testId:   t._id,
              tests:    b.tests,
              name:     b.patient?.name || 'Unknown',
              initials: (b.patient?.name || 'UN').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
              avClass:  ['av-blue','av-green','av-purple','av-amber'][Math.floor(Math.random()*4)],
              testName: t.testName,
              sub:      `${t.testName} · ${t.status?.toLowerCase()}`,
              status:   t.status === 'Completed' ? 'Done'
                      : t.status === 'In Progress' ? 'In Lab'
                      : t.status === 'Pending' ? 'Urgent' : 'Review',
              bClass:   t.status === 'Completed' ? 'b-done'
                      : t.status === 'In Progress' ? 'b-inlab'
                      : 'b-urgent',
            }))
          );
          if (rows.length > 0) setPatients(rows.slice(0, 5));

          const pending  = rows.filter(r => r.status === 'Urgent' || r.status === 'Review').length;
          const done     = rows.filter(r => r.status === 'Done').length;
          setStats(s => ({ ...s, reportsPending: pending, reviewedToday: done }));
        }

        // Tests by category
        const cats = await api.get('/dashboard/tests-by-category');
        if (cats.data?.length > 0) {
          const max = cats.data[0]?.count || 1;
          setBarData(cats.data.slice(0, 5).map(d => ({
            label: d._id,
            pct:   Math.round((d.count / max) * 100),
            val:   d.count,
          })));
        }
      } catch { /* use dummy */ }
      finally { setLoading(false); }
    };
    fetchData();
  }, [toast]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <>
      <style>{css}</style>
      <div className="dd-layout">

        {/* ── SIDEBAR ── */}
        <aside className="dd-sidebar">
          <div className="dd-brand">CareSynify</div>
          <nav className="dd-nav">
            {NAV.map(item => (
              <button
                key={item.key}
                className={`dd-nav-btn ${activeNav === item.key ? 'active' : ''}`}
                onClick={() => setActiveNav(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="dd-user-box">
            <div className="dd-user-name">{user?.name || 'Dr. Razia'}</div>
            <div className="dd-user-role">Doctor</div>
            <button className="dd-logout" onClick={handleLogout}>Sign out →</button>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="dd-main">

          {/* Topbar */}
          <div className="dd-topbar">
            <div>
              <div className="dd-title">Doctor Dashboard</div>
              <div className="dd-sub">Good morning, {user?.name || 'Dr. Razia'}</div>
            </div>
            <div className="dd-date-chip">{today}</div>
          </div>

          {/* ── STAT CARDS ── */}
          <div className="dd-stat-grid">
            <div className="dd-stat">
              <div className="dd-stat-lbl">Today's Patients</div>
              <div className="dd-stat-val">{stats.todayPatients}</div>
              <div className="dd-stat-sub txt-gray">+3 from yesterday</div>
            </div>
            <div className="dd-stat">
              <div className="dd-stat-lbl">Reports Pending</div>
              <div className="dd-stat-val txt-red">{stats.reportsPending}</div>
              <div className="dd-stat-sub txt-red">need review</div>
            </div>
            <div className="dd-stat">
              <div className="dd-stat-lbl">Reviewed Today</div>
              <div className="dd-stat-val txt-blue">{stats.reviewedToday}</div>
              <div className="dd-stat-sub txt-blue">reports signed</div>
            </div>
          </div>

          {/* ── TWO COL ── */}
          <div className="dd-two-col">

            {/* Patients to Review */}
            <div className="dd-card">
              <div className="dd-card-title">Patients to Review</div>
              {loading ? (
                <div className="dd-loading">Loading patients...</div>
              ) : patients.length === 0 ? (
                <div className="dd-empty">Koi patient nahi hai abhi</div>
              ) : (
                patients.map((p, i) => (
                  <div
                    key={p._id || i}
                    className="dd-patient-row"
                    onClick={() => setReviewModal(p)}
                    title="Click karein review ke liye"
                  >
                    <div className={`dd-avatar ${p.avClass}`}>{p.initials}</div>
                    <div style={{ flex: 1 }}>
                      <div className="dd-p-name">{p.name}</div>
                      <div className="dd-p-sub">{p.sub}</div>
                    </div>
                    <span className={`dd-badge ${p.bClass}`}>{p.status}</span>
                  </div>
                ))
              )}
            </div>

            {/* Tests by Category */}
            <div className="dd-card">
              <div className="dd-card-title">Tests by Category</div>
              <div className="dd-bar-wrap">
                {barData.map((b, i) => (
                  <div className="dd-bar-row" key={i}>
                    <span className="dd-bar-lbl">{b.label}</span>
                    <div className="dd-bar-track">
                      <div className="dd-bar-fill" style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="dd-bar-val">{b.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ── REVIEW MODAL ── */}
        {reviewModal && (
          <ReviewModal
            patient={reviewModal}
            onClose={() => setReviewModal(null)}
            onSaved={() => {
              setReviewModal(null);
              showToast(`✅ ${reviewModal.name} ki report finalize ho gayi!`);
            }}
          />
        )}

        {/* ── TOAST ── */}
        {toast && <div className="dd-toast">{toast}</div>}
      </div>
    </>
  );
}
