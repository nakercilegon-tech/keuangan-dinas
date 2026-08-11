import React, { useState } from 'react';
import { LogIn, LogOut, ShieldCheck, UserCheck, AlertCircle, CheckCircle, LayoutDashboard, Lock, KeyRound, User, Users, FileText, Database, ShieldAlert } from 'lucide-react';

interface SimulatedUser {
  id: number;
  username: string;
  nama_lengkap: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR' | 'PIMPINAN';
  status: 'aktif' | 'nonaktif';
  last_login: string;
}

export const AuthSimView: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<SimulatedUser>({
    id: 1,
    username: 'admin',
    nama_lengkap: 'Administrator Utama',
    email: 'admin@dinas.go.id',
    role: 'ADMIN',
    status: 'aktif',
    last_login: '2026-08-11 08:30:00'
  });

  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [flashMsg, setFlashMsg] = useState<{ type: 'success' | 'error'; text: string } | null>({
    type: 'success',
    text: 'Sesi login berhasil diinisialisasi (Session ID: sess_7f8e12a9b3c4d5)'
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername === 'admin' && inputPassword === 'admin123') {
      setCurrentUser({
        id: 1,
        username: 'admin',
        nama_lengkap: 'Administrator Utama',
        email: 'admin@dinas.go.id',
        role: 'ADMIN',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
      setIsLoggedIn(true);
      setFlashMsg({ type: 'success', text: 'Selamat datang kembali, Administrator Utama (ADMIN)' });
    } else if (inputUsername === 'operator' && inputPassword === 'operator123') {
      setCurrentUser({
        id: 2,
        username: 'operator',
        nama_lengkap: 'Ahmad Budiarto, S.E.',
        email: 'operator@dinas.go.id',
        role: 'OPERATOR',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
      setIsLoggedIn(true);
      setFlashMsg({ type: 'success', text: 'Selamat datang kembali, Ahmad Budiarto (OPERATOR)' });
    } else if (inputUsername === 'pimpinan' && inputPassword === 'pimpinan123') {
      setCurrentUser({
        id: 3,
        username: 'pimpinan',
        nama_lengkap: 'Drs. H. Hendra Wijaya, M.Si.',
        email: 'pimpinan@dinas.go.id',
        role: 'PIMPINAN',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
      setIsLoggedIn(true);
      setFlashMsg({ type: 'success', text: 'Selamat datang kembali, Drs. H. Hendra Wijaya (PIMPINAN)' });
    } else {
      setFlashMsg({ type: 'error', text: 'Username atau Password salah! (Gunakan demo: admin/admin123, operator/operator123, pimpinan/pimpinan123)' });
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFlashMsg({ type: 'success', text: 'Anda telah berhasil keluar dari sistem.' });
  };

  const switchDemoRole = (role: 'ADMIN' | 'OPERATOR' | 'PIMPINAN') => {
    if (role === 'ADMIN') {
      setCurrentUser({
        id: 1,
        username: 'admin',
        nama_lengkap: 'Administrator Utama',
        email: 'admin@dinas.go.id',
        role: 'ADMIN',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
    } else if (role === 'OPERATOR') {
      setCurrentUser({
        id: 2,
        username: 'operator',
        nama_lengkap: 'Ahmad Budiarto, S.E.',
        email: 'operator@dinas.go.id',
        role: 'OPERATOR',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
    } else {
      setCurrentUser({
        id: 3,
        username: 'pimpinan',
        nama_lengkap: 'Drs. H. Hendra Wijaya, M.Si.',
        email: 'pimpinan@dinas.go.id',
        role: 'PIMPINAN',
        status: 'aktif',
        last_login: new Date().toLocaleString('id-ID')
      });
    }
    setIsLoggedIn(true);
    setFlashMsg({ type: 'success', text: `Switched active session to role: ${role}` });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Simulasi Otentikasi & Sesi Sesuai Tahap 2</h2>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded-full">
              PHP Session Auth Guard
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Uji coba simulasi Login, Session Management, CSRF Protection, Role Authorization (ADMIN, OPERATOR, PIMPINAN), & Dashboard Layout.
          </p>
        </div>

        {/* Quick Role Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <span className="text-[11px] font-bold text-slate-600 px-2">Ganti Sesi Role:</span>
          <button
            onClick={() => switchDemoRole('ADMIN')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              isLoggedIn && currentUser.role === 'ADMIN'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            ADMIN
          </button>
          <button
            onClick={() => switchDemoRole('OPERATOR')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              isLoggedIn && currentUser.role === 'OPERATOR'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            OPERATOR
          </button>
          <button
            onClick={() => switchDemoRole('PIMPINAN')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              isLoggedIn && currentUser.role === 'PIMPINAN'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-200'
            }`}
          >
            PIMPINAN
          </button>
        </div>
      </div>

      {/* Flash Messages Display */}
      {flashMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
            flashMsg.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border-rose-200 text-rose-800'
          }`}
        >
          <div className="flex items-center gap-2">
            {flashMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span className="font-semibold">{flashMsg.text}</span>
          </div>
          <button
            onClick={() => setFlashMsg(null)}
            className="text-slate-400 hover:text-slate-600 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      {!isLoggedIn ? (
        /* Login Screen Card */
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Masuk ke SIMKEU UPTD</h3>
            <p className="text-xs text-slate-500">Sistem Informasi Anggaran & Realisasi Keuangan 2026</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="admin / operator / pimpinan"
                  value={inputUsername}
                  onChange={(e) => setInputUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="admin123 / operator123 / pimpinan123"
                  value={inputPassword}
                  onChange={(e) => setInputPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk ke Sistem</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <span className="text-[11px] text-slate-400 block">Kredensial Demo Sesuai Tahap 2:</span>
            <div className="flex flex-wrap gap-1.5 justify-center font-mono text-[10px]">
              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded border">admin / admin123</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded border">operator / operator123</span>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded border">pimpinan / pimpinan123</span>
            </div>
          </div>
        </div>
      ) : (
        /* Logged In Dashboard Layout Preview */
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
          {/* Simulated Sidebar */}
          <div className="lg:col-span-3 bg-slate-950 p-4 border-r border-slate-800 space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <div className="p-1.5 bg-indigo-600 text-white rounded-lg">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-white block leading-none">SIMKEU UPTD</span>
                <span className="text-[10px] text-slate-400">TA 2026 • PHP MVC</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                BERANDA
              </div>
              <a href="#dashboard" className="flex items-center gap-2 px-3 py-2 bg-indigo-600/20 text-indigo-300 font-semibold rounded-lg border border-indigo-500/30">
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard Utama</span>
              </a>

              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
                MASTER DATA
              </div>
              {['Program', 'Kegiatan', 'Sub-Kegiatan', 'Rekening Belanja', 'Penyedia', 'Paket Pekerjaan'].map((m) => (
                <div key={m} className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-900">
                  {m}
                </div>
              ))}

              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
                REALISASI
              </div>
              {['Realisasi Pekerjaan', 'Pembayaran', 'Pajak (Tax)'].map((m) => (
                <div key={m} className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-900">
                  {m}
                </div>
              ))}

              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
                PELAPORAN
              </div>
              {['Realisasi Anggaran', 'Realisasi Pekerjaan'].map((m) => (
                <div key={m} className="px-3 py-1.5 text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-900">
                  {m}
                </div>
              ))}

              <div className="px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider pt-2">
                SISTEM
              </div>
              {currentUser.role === 'ADMIN' ? (
                <div className="px-3 py-1.5 text-emerald-400 font-bold bg-emerald-950/30 border border-emerald-500/30 rounded-lg flex items-center justify-between">
                  <span>User Management</span>
                  <span className="text-[9px] px-1 bg-emerald-500/20 rounded">FULL</span>
                </div>
              ) : (
                <div className="px-3 py-1.5 text-slate-600 line-through flex items-center justify-between" title="Khusus Role ADMIN">
                  <span>User Management</span>
                  <ShieldAlert className="w-3 h-3 text-rose-500" />
                </div>
              )}
              <div className="px-3 py-1.5 text-slate-400">Audit Log</div>
              <div className="px-3 py-1.5 text-slate-400">Backup Database</div>
            </div>
          </div>

          {/* Main Dashboard Panel */}
          <div className="lg:col-span-9 bg-slate-900 p-6 space-y-6">
            {/* Top Simulated Navbar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2 text-slate-400 font-mono">
                <span>Home</span> / <span className="text-white font-bold">Dashboard Tahap 2</span>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                  currentUser.role === 'ADMIN'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : currentUser.role === 'PIMPINAN'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {currentUser.role}
                </span>

                <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-semibold text-slate-200">{currentUser.nama_lengkap}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Role Privilege Matrix Callout */}
            <div className="p-4 rounded-xl border bg-slate-950/80 border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span>Akses Otorisasi Role Aktif (`{currentUser.role}`)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className={`p-3 rounded-lg border ${currentUser.role === 'ADMIN' ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <div className="font-bold mb-1">ADMIN (Akses Penuh)</div>
                  <p className="text-[11px] leading-relaxed">Full Control: Kelola User, Master Data, Input Realisasi, Laporan, & Audit Log.</p>
                </div>

                <div className={`p-3 rounded-lg border ${currentUser.role === 'OPERATOR' ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <div className="font-bold mb-1">OPERATOR (Input Data)</div>
                  <p className="text-[11px] leading-relaxed">Input/edit paket pekerjaan, SP, BAPB, pembayaran, & kalkulasi pajak.</p>
                </div>

                <div className={`p-3 rounded-lg border ${currentUser.role === 'PIMPINAN' ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                  <div className="font-bold mb-1">PIMPINAN (Monitoring)</div>
                  <p className="text-[11px] leading-relaxed">Monitoring ringkasan eksekutif, cetak PDF/Excel Laporan Realisasi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
