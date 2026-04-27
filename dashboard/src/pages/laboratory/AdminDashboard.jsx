import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

// ── icons ──────────────────────────────────────────────────────────────────
const Icon = ({ d, color = 'currentColor', size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

// ── helpers ────────────────────────────────────────────────────────────────
function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 60000);
  if (diff < 1)  return 'Just now';
  if (diff < 60) return `${diff} mins ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hrs ago`;
  return `${Math.floor(diff / 1440)} days ago`;
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function fmtRevenue(v) {
  if (v >= 100000) return `Rs ${(v / 100000).toFixed(1)}L`;
  if (v >= 1000)   return `Rs ${(v / 1000).toFixed(1)}K`;
  return `Rs ${v}`;
}

const avatarColors = [
  { bg: '#E6F1FB', color: '#0C447C' },
  { bg: '#EAF3DE', color: '#27500A' },
  { bg: '#EEEDFE', color: '#3C3489' },
  { bg: '#FAEEDA', color: '#633806' },
  { bg: '#FCEBEB', color: '#7C1919' },
];
const initials = (name) =>
  name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'UN';

const BAR_COLORS = ['#185FA5','#3B6D11','#854F0B','#534AB7','#A32D2D','#0F6E56'];

// ── styles (inline) ────────────────────────────────────────────────────────
const s = {
  layout:   { display:'flex', minHeight:'100vh', fontFamily:'DM Sans, sans-serif', background:'#f8fafc' },
  sidebar:  { width:200, background:'#fff', borderRight:'1px solid #e2e8f0', display:'flex', flexDirection:'column', padding:'20px 14px', position:'fixed', top:0, left:0, bottom:0, zIndex:100 },
  brand:    { fontSize:17, fontWeight:700, color:'#A32D2D', marginBottom:2 },
  role:     { fontSize:10, color:'#94a3b8', textTransform:'uppercase', letterSpacing:1, marginBottom:20, paddingBottom:14, borderBottom:'1px solid #f1f5f9' },
  navItem:  (active) => ({
    display:'flex', alignItems:'center', gap:9, padding:'8px 10px',
    borderRadius:8, fontSize:13, fontWeight: active ? 600 : 400,
    color: active ? '#A32D2D' : '#64748b',
    background: active ? '#FCEBEB' : 'transparent',
    cursor:'pointer', marginBottom:2, border:'none', width:'100%', textAlign:'left',
    transition:'all 0.15s',
  }),
  main:     { flex:1, marginLeft:200, padding:'24px 28px' },
  topbar:   { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 },
  h1:       { fontSize:22, fontWeight:700, letterSpacing:-0.3, marginBottom:3 },
  sub:      { fontSize:12.5, color:'#64748b' },
  bell:     { width:36, height:36, borderRadius:'50%', border:'1px solid #e2e8f0', background:'#fff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', position:'relative', color:'#64748b' },
  bellDot:  { position:'absolute', top:7, right:7, width:7, height:7, background:'#E24B4A', borderRadius:'50%' },
  grid4:    { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:16 },
  statCard: (bg) => ({ background:bg, borderRadius:12, padding:'14px 16px', color:'#fff' }),
  statLbl:  { fontSize:12, opacity:0.85, marginBottom:5 },
  statVal:  { fontSize:24, fontWeight:700, letterSpacing:-0.5 },
  statSub:  { fontSize:11.5, marginTop:5, opacity:0.9 },
  warn:     { color:'#FCA5A5' },
  grid2:    { display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:12 },
  card:     { background:'#fff', border:'1px solid #e2e8f0', borderRadius:12, padding:16 },
  cardHead: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 },
  cardTitle:{ fontSize:14, fontWeight:600 },
  badge:    (bg, color) => ({ display:'inline-flex', alignItems:'center', gap:4, fontSize:11, padding:'3px 9px', borderRadius:99, fontWeight:600, background:bg, color }),
  row:      { display:'flex', alignItems:'center', gap:10, padding:'8px 0', borderBottom:'1px solid #f1f5f9' },
  rowLast:  { borderBottom:'none', paddingBottom:0 },
  avatar:   (i) => ({ width:32, height:32, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600, flexShrink:0, background:avatarColors[i%5].bg, color:avatarColors[i%5].color }),
  rn:       { fontSize:13, fontWeight:600 },
  rs:       { fontSize:11.5, color:'#94a3b8' },
  barLbl:   { fontSize:11, color:'#94a3b8', width:48, flexShrink:0 },
  barTrack: { flex:1, height:7, background:'#f1f5f9', borderRadius:99, overflow:'hidden' },
  barFill:  (w, bg) => ({ width:`${w}%`, height:'100%', borderRadius:99, background:bg }),
  barVal:   { fontSize:11, color:'#94a3b8', width:24, textAlign:'right' },
  grid2sm:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 },
  ab:       { background:'#f8fafc', border:'1px solid #e2e8f0', borderRadius:10, padding:'12px', cursor:'pointer', transition:'all 0.15s' },
  abLbl:    { fontSize:12.5, fontWeight:600, color:'#0f172a', marginTop:4 },
  abSub:    { fontSize:11, color:'#94a3b8' },
  dot:      (bg) => ({ width:8, height:8, borderRadius:'50%', flexShrink:0, marginTop:4, background:bg }),
  userBox:  { marginTop:'auto', padding:'10px 12px', background:'#FCEBEB', borderRadius:10 },
  userName: { fontSize:12.5, fontWeight:600, color:'#7C1919' },
  userRole: { fontSize:11, color:'#A32D2D' },
};

// ── sidebar nav items ──────────────────────────────────────────────────────
const NAV = [
  { label:'Dashboard',   icon:'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',          path:'/dashboard' },
  { label:'Users & Staff',icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', path:'/staff' },
  { label:'Patients',    icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', path:'/patients' },
  { label:'Test Catalog',icon:'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2', path:'/test-catalog' },
  { label:'Reports',     icon:'M18 20V10M12 20V4M6 20v-6',                                  path:'/reports' },
  { label:'Billing',     icon:'M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',path:'/billing' },
  { label:'Settings',    icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',               path:'/settings' },
];

// ── quick action buttons ───────────────────────────────────────────────────
const ACTIONS = [
  { label:'Add Staff',    sub:'Doctor / Lab staff', icon:'M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6', color:'#A32D2D', path:'/staff' },
  { label:'View Users',   sub:'23 active members',  icon:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75', color:'#185FA5', path:'/staff' },
  { label:'Manage Tests', sub:'Test catalog',        icon:'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2', color:'#3B6D11', path:'/test-catalog' },
  { label:'Billing',      sub:'Monthly summary',     icon:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8', color:'#854F0B', path:'/billing' },
];

// ── main component ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats,     setStats]     = useState(null);
  const [recentReg, setRecentReg] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [activity,  setActivity]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [activePath, setActivePath] = useState('/dashboard');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, r, t, a] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/recent-registrations'),
          api.get('/dashboard/tests-by-category'),
          api.get('/dashboard/activity'),
        ]);
        setStats(s.data);
        setRecentReg(r.data);
        setChartData(t.data.map(d => ({ name: d._id, count: d.count })));
        setActivity(a.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleNav = (path) => {
    setActivePath(path);
    navigate(path);
  };

  const handleLogout = () => { logout(); navigate('/login'); };

  if (loading) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'#94a3b8', fontSize:14 }}>
        Loading Admin Panel...
      </div>
    );
  }

  return (
    <div style={s.layout}>

      {/* ── SIDEBAR ── */}
      <aside style={s.sidebar}>
        <div style={s.brand}>CareSynify</div>
        <div style={s.role}>Admin Panel</div>

        {NAV.map(item => (
          <button
            key={item.path}
            style={s.navItem(activePath === item.path)}
            onClick={() => handleNav(item.path)}
          >
            <Icon d={item.icon} color={activePath === item.path ? '#A32D2D' : '#94a3b8'} />
            {item.label}
          </button>
        ))}

        <div style={s.userBox}>
          <div style={s.userName}>{user?.name || 'Dr. Admin'}</div>
          <div style={s.userRole}>Super Admin</div>
          <button
            onClick={handleLogout}
            style={{ marginTop:8, fontSize:11, color:'#A32D2D', background:'none', border:'none', cursor:'pointer', padding:0, fontWeight:600 }}
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={s.main}>

        {/* Top bar */}
        <div style={s.topbar}>
          <div>
            <div style={s.h1}>Admin Panel</div>
            <div style={s.sub}>
              {greeting()}, {user?.name || 'Dr. Admin'} &nbsp;·&nbsp;
              {new Date().toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' })}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={s.bell}>
              <Icon d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" size={16} />
              <div style={s.bellDot} />
            </div>
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div style={s.grid4}>
          {[
            { label:'Total Patients',   value: stats?.totalPatients ?? 0,           sub:`+${stats?.patientsToday ?? 0} today`,         bg:'#185FA5', warn:false },
            { label:'Tests Today',      value: stats?.testsToday ?? 0,              sub:`+${stats?.testsGrowth ?? 0} vs yesterday`,    bg:'#3B6D11', warn:false },
            { label:'Revenue (Month)',  value: fmtRevenue(stats?.revenue ?? 0),     sub:`+${stats?.revenueGrowth ?? 0}% growth`,       bg:'#854F0B', warn:false },
            { label:'Active Staff',     value: stats?.activeStaff ?? 0,             sub:`${stats?.onLeave ?? 0} on leave`,             bg:'#A32D2D', warn:true  },
          ].map((c, i) => (
            <div key={i} style={s.statCard(c.bg)}>
              <div style={s.statLbl}>{c.label}</div>
              <div style={s.statVal}>{c.value}</div>
              <div style={{ ...s.statSub, ...(c.warn ? s.warn : {}) }}>{c.sub}</div>
            </div>
          ))}
        </div>

        {/* ── RECENT REGISTRATIONS + CHART ── */}
        <div style={s.grid2}>

          {/* Recent Registrations */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>Recent Registrations</span>
              <span style={s.badge('#E6F1FB','#185FA5')}>Today</span>
            </div>
            {recentReg.length === 0
              ? <p style={{ color:'#94a3b8', fontSize:13 }}>No registrations yet</p>
              : recentReg.map((r, i) => (
                <div key={r._id} style={{ ...s.row, ...(i === recentReg.length-1 ? s.rowLast : {}) }}>
                  <div style={s.avatar(i)}>{initials(r.name)}</div>
                  <div style={{ flex:1 }}>
                    <div style={s.rn}>{r.name}</div>
                    <div style={s.rs}>{r.type} · {timeAgo(r.time)}</div>
                  </div>
                  <span style={s.badge(
                    r.status === 'New' ? '#E6F1FB' : r.status === 'Active' ? '#EAF3DE' : '#f1f5f9',
                    r.status === 'New' ? '#185FA5' : r.status === 'Active' ? '#3B6D11' : '#475569'
                  )}>{r.status}</span>
                </div>
              ))
            }
          </div>

          {/* Tests by Category Chart */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>Tests by Category</span>
              <span style={s.badge('#EAF3DE','#3B6D11')}>This week</span>
            </div>
            {chartData.length === 0 ? (
              /* fallback static bars */
              <div style={{ marginTop:8 }}>
                {[['CBC',85,42],['LFT',65,32],['Sugar',55,27],['Urine',40,19],['TFT',28,13],['KFT',18,9]].map(([lbl,pct,val], i) => (
                  <div key={lbl} style={{ display:'flex', alignItems:'center', gap:8, marginBottom:8 }}>
                    <span style={s.barLbl}>{lbl}</span>
                    <div style={s.barTrack}><div style={s.barFill(pct, BAR_COLORS[i])} /></div>
                    <span style={s.barVal}>{val}</span>
                  </div>
                ))}
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData} barSize={20}>
                  <XAxis dataKey="name" tick={{ fontSize:10, fill:'#94a3b8' }} />
                  <YAxis tick={{ fontSize:10, fill:'#94a3b8' }} />
                  <Tooltip />
                  <Bar dataKey="count" radius={[4,4,0,0]}>
                    {chartData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ── USER MANAGEMENT + ACTIVITY ── */}
        <div style={s.grid2}>

          {/* Quick Actions */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>User Management</span>
            </div>
            <div style={s.grid2sm}>
              {ACTIONS.map((a, i) => (
                <div
                  key={i}
                  style={s.ab}
                  onClick={() => navigate(a.path)}
                  onMouseEnter={e => { e.currentTarget.style.background='#fff'; e.currentTarget.style.borderColor='#cbd5e1'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='#f8fafc'; e.currentTarget.style.borderColor='#e2e8f0'; }}
                >
                  <Icon d={a.icon} color={a.color} size={15} />
                  <div style={s.abLbl}>{a.label}</div>
                  <div style={s.abSub}>{a.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* System Activity */}
          <div style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>System Activity</span>
              <span style={{ ...s.badge('#EAF3DE','#3B6D11'), display:'inline-flex', alignItems:'center', gap:4 }}>
                <span style={{ width:6, height:6, borderRadius:'50%', background:'#639922', display:'inline-block', animation:'pulse 1.5s infinite' }} />
                Live
              </span>
            </div>

            {activity.length === 0 ? (
              /* fallback static */
              [
                { msg:'Report #4521 finalized by staff', time:'2 mins ago',  color:'#639922' },
                { msg:'New patient registered: Ali Raza', time:'8 mins ago',  color:'#378ADD' },
                { msg:'Dr. Hassan reviewed 3 reports',    time:'14 mins ago', color:'#EF9F27' },
                { msg:'Invoice INV-00892 paid — Rs 3,500',time:'21 mins ago', color:'#E24B4A' },
              ].map((a, i) => (
                <div key={i} style={{ ...s.row, alignItems:'flex-start', ...(i===3?s.rowLast:{}) }}>
                  <div style={s.dot(a.color)} />
                  <div style={{ flex:1 }}>
                    <div style={s.rn}>{a.msg}</div>
                    <div style={s.rs}>{a.time}</div>
                  </div>
                </div>
              ))
            ) : (
              activity.map((a, i) => (
                <div key={i} style={{ ...s.row, alignItems:'flex-start', ...(i===activity.length-1?s.rowLast:{}) }}>
                  <div style={s.dot(i===0?'#639922':i===1?'#378ADD':'#EF9F27')} />
                  <div style={{ flex:1 }}>
                    <div style={s.rn}>{a.message}</div>
                    <div style={s.rs}>{timeAgo(a.time)}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>

      {/* pulse animation */}
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </div>
  );
}
