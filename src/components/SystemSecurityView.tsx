import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Sliders, 
  Clock, 
  UserCheck, 
  FileCode, 
  Download, 
  RotateCcw, 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  ShieldAlert, 
  FileText,
  KeyRound,
  HardDrive
} from 'lucide-react';

interface AuditLog {
  id: number;
  user: string;
  action: string;
  description: string;
  ip_address: string;
  created_at: string;
}

interface BackupFile {
  filename: string;
  size: string;
  created_at: string;
  tables: number;
  status: string;
}

export const SystemSecurityView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audit' | 'backup' | 'settings' | 'security'>('audit');
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  
  // Settings State
  const [settings, setSettings] = useState({
    nama_instansi: 'DINAS TENAGA KERJA DAN TRANSMIGRASI',
    nama_uptd: 'UPTD LATIHAN KERJA DINAS TENAGA KERJA',
    alamat: 'Jl. Raya Merak No. 12, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon',
    telepon: '(0254) 388123',
    email: 'uptd.lks@cilegon.go.id',
    tahun_anggaran: '2026',
    nama_pimpinan: 'Ir. H. Hendra Wijaya, ST., M.T.',
    nip_pimpinan: '19750812 200112 1 002',
    nama_bendahara: 'Ahmad Fauzi, A.Md.Ak',
    nip_bendahara: '19880315 201001 1 005'
  });

  // Restore Modal State
  const [restoreModalFile, setRestoreModalFile] = useState<string | null>(null);
  const [isRestoring, setIsRestoring] = useState<boolean>(false);
  const [isGeneratingBackup, setIsGeneratingBackup] = useState<boolean>(false);

  // Sample Audit Trail Data
  const [auditLogs] = useState<AuditLog[]>([
    {
      id: 105,
      user: 'Ahmad Operator (Operator Keuangan)',
      action: 'PEMBAYARAN_CREATE',
      description: 'Merekam SP2D Pembayaran #SP2D-2026-008 Nilai Rp 45.000.000 (SP-001/UPTD/2026)',
      ip_address: '192.168.1.15',
      created_at: '2026-08-11 10:15:22'
    },
    {
      id: 104,
      user: 'Dra. Hj. Siti Aminah, M.Si (Admin)',
      action: 'EXPORT_EXCEL',
      description: 'Mengunduh Laporan Realisasi Anggaran LRA TA 2026 format Excel',
      ip_address: '192.168.1.10',
      created_at: '2026-08-11 09:42:05'
    },
    {
      id: 103,
      user: 'Ahmad Operator (Operator Keuangan)',
      action: 'IMPORT_EXCEL',
      description: 'Impor massal Master Rekening Belanja (45 baris data sukses)',
      ip_address: '192.168.1.15',
      created_at: '2026-08-11 08:30:11'
    },
    {
      id: 102,
      user: 'Dra. Hj. Siti Aminah, M.Si (Admin)',
      action: 'DATABASE_BACKUP',
      description: 'Membuat cadangan database db_keuangan_uptd_2026_08_11.sql',
      ip_address: '192.168.1.10',
      created_at: '2026-08-10 17:00:00'
    },
    {
      id: 101,
      user: 'Ir. H. Hendra Wijaya, ST (Pimpinan UPTD)',
      action: 'AUTH_LOGIN',
      description: 'Login berhasil sebagai role PIMPINAN (Session ID regenerated)',
      ip_address: '192.168.1.5',
      created_at: '2026-08-10 08:05:00'
    }
  ]);

  // Backup List State
  const [backups, setBackups] = useState<BackupFile[]>([
    {
      filename: 'db_keuangan_uptd_2026-08-11_100000.sql',
      size: '14.8 MB',
      created_at: '2026-08-11 10:00:00',
      tables: 15,
      status: 'VERIFIED'
    },
    {
      filename: 'db_keuangan_uptd_2026-08-01_170000.sql',
      size: '14.2 MB',
      created_at: '2026-08-01 17:00:00',
      tables: 15,
      status: 'VERIFIED'
    }
  ]);

  const showToast = (type: 'success' | 'info' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleGenerateBackup = () => {
    setIsGeneratingBackup(true);
    setTimeout(() => {
      const newBackup: BackupFile = {
        filename: `db_keuangan_uptd_${new Date().toISOString().slice(0,10)}_${Date.now().toString().slice(-6)}.sql`,
        size: '14.9 MB',
        created_at: new Date().toISOString().replace('T', ' ').slice(0, 19),
        tables: 15,
        status: 'VERIFIED'
      };
      setBackups([newBackup, ...backups]);
      setIsGeneratingBackup(false);
      showToast('success', `Berhasil membuat cadangan database SQL ${newBackup.filename}!`);
    }, 1200);
  };

  const handleExecuteRestore = () => {
    if (!restoreModalFile) return;
    setIsRestoring(true);
    setTimeout(() => {
      setIsRestoring(false);
      setRestoreModalFile(null);
      showToast('success', `Restorasi database db_keuangan_uptd dari ${restoreModalFile} sukses tanpa error!`);
    }, 1500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Pengaturan instansi, alamat & NIP pimpinan berhasil diperbarui di database.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {restoreModalFile && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-rose-100 space-y-4 animate-scale-up">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="p-3 bg-rose-100 rounded-xl">
                <AlertTriangle className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Konfirmasi Restore Database</h3>
                <p className="text-xs text-slate-500">Tindakan berisiko tinggi / override data</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <p className="text-xs font-semibold text-slate-700">File Backup Target:</p>
              <p className="text-xs font-mono font-bold text-rose-700 break-all">{restoreModalFile}</p>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Restorasi database akan menimpa seluruh tabel aktif (program, kegiatan, realisasi, SP2D, pajak) di <strong>db_keuangan_uptd</strong> dengan snapshot SQL tersebut.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRestoreModalFile(null)}
                disabled={isRestoring}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={handleExecuteRestore}
                disabled={isRestoring}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isRestoring ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Restoring Database SQL...</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ya, Restore Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-xl border border-indigo-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                TAHAP 11 • AUDIT LOG, BACKUP & SECURITY HARDENING
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                PDO Prepared • CSRF • XSS • Role Auth
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              Keamanan, Audit Trail & Cadangan Sistem
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Pusat log histori transaksi, manajemen backup & restore SQL otomatis, pengaturan identitas instansi untuk kop PDF, serta hasil audit kesehatan keamanan sistem.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-emerald-950/60 border border-emerald-500/30 rounded-xl text-right">
              <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Status Keamanan</p>
              <p className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" /> HARDENED & SECURE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('audit')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Audit Log Aktivitas</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'backup'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Backup & Restore Database</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'settings'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Pengaturan Instansi</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            activeTab === 'security'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Security Audit Health Review</span>
        </button>
      </div>

      {/* TAB 1: AUDIT LOG */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Histori Audit Trail User & System Actions
            </h3>
            <span className="text-[10px] bg-slate-800 text-indigo-300 font-mono px-2.5 py-1 rounded-full border border-indigo-500/30">
              Audit Logs Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                  <th className="p-3 w-28">ID / Waktu</th>
                  <th className="p-3">Pengguna & Role</th>
                  <th className="p-3">Aksi / Action Code</th>
                  <th className="p-3">Rincian Deskripsi Kegiatan</th>
                  <th className="p-3 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-mono">
                      <span className="font-bold text-slate-900">#{log.id}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{log.created_at}</p>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{log.user}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono text-[10px] font-bold rounded-lg">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-800">{log.description}</td>
                    <td className="p-3 text-right font-mono text-slate-500">{log.ip_address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: BACKUP & RESTORE */}
      {activeTab === 'backup' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 text-center">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block text-emerald-600">
                <HardDrive className="w-10 h-10 mx-auto" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Buat Cadangan Database SQL</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Ekspor seluruh skema tabel, relasi constraint & data transaksi di db_keuangan_uptd ke file SQL.
                </p>
              </div>

              <button
                onClick={handleGenerateBackup}
                disabled={isGeneratingBackup}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {isGeneratingBackup ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Membuat File Backup SQL...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4" />
                    <span>Generate SQL Backup Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-emerald-400" />
                  Arsip Backup Database SQL
                </h3>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-1 rounded-md">
                  /storage/backups/
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                      <th className="p-3">Nama File Backup</th>
                      <th className="p-3">Ukuran</th>
                      <th className="p-3">Tanggal Dibuat</th>
                      <th className="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {backups.map((b) => (
                      <tr key={b.filename} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900 flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{b.filename}</span>
                        </td>
                        <td className="p-3 font-mono text-slate-500">{b.size}</td>
                        <td className="p-3 text-slate-600">{b.created_at}</td>
                        <td className="p-3 text-center space-x-1">
                          <button
                            onClick={() => showToast('info', `Mengunduh file ${b.filename}...`)}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs"
                            title="Download SQL"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setRestoreModalFile(b.filename)}
                            className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold rounded-lg text-[11px] inline-flex items-center gap-1"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Restore
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                Pengaturan Identitas Instansi & Kop Surat Official
              </h3>
              <p className="text-xs text-slate-500">Data ini otomatis digunakan pada seluruh dokumen cetak PDF LRA, BAPB, Kuitansi & Header Dashboard.</p>
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Simpan Perubahan</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Instansi Induk</label>
              <input
                type="text"
                value={settings.nama_instansi}
                onChange={(e) => setSettings({ ...settings, nama_instansi: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama UPTD / Unit Kerja</label>
              <input
                type="text"
                value={settings.nama_uptd}
                onChange={(e) => setSettings({ ...settings, nama_uptd: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Alamat Lengkap Perkantoran</label>
              <textarea
                value={settings.alamat}
                onChange={(e) => setSettings({ ...settings, alamat: e.target.value })}
                rows={2}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Telepon / Fax</label>
              <input
                type="text"
                value={settings.telepon}
                onChange={(e) => setSettings({ ...settings, telepon: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Resmi Instansi</label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Tahun Anggaran Berjalan</label>
              <input
                type="text"
                value={settings.tahun_anggaran}
                onChange={(e) => setSettings({ ...settings, tahun_anggaran: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Pimpinan / Kepala UPTD</label>
              <input
                type="text"
                value={settings.nama_pimpinan}
                onChange={(e) => setSettings({ ...settings, nama_pimpinan: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
        </form>
      )}

      {/* TAB 4: SECURITY AUDIT */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <Lock className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">PDO Prepared Statements</h4>
            <p className="text-xs text-slate-600">
              100% Query SQL di Model menggunakan parameterized binding PDO. Melindungi penuh dari ancaman SQL Injection.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <KeyRound className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">CSRF Token Validation</h4>
            <p className="text-xs text-slate-600">
              Seluruh form POST dilengkapi token acak SHA-256 per session yang divalidasi ketat di Controller.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">XSS Sanitization Engine</h4>
            <p className="text-xs text-slate-600">
              Output variabel di view diproteksi fungsi htmlspecialchars(ENT_QUOTES, UTF-8) mencegah eksekusi skrip jahat.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <UserCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Password BCRYPT Hashing</h4>
            <p className="text-xs text-slate-600">
              Otentikasi menggunakan password_hash() BCRYPT & password_verify() tanpa penyimpanan plaintext.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <HardDrive className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Direct Folder Access Lock</h4>
            <p className="text-xs text-slate-600">
              Aturan .htaccess memblokir akses HTTP publik langsung ke direktori /config, /storage, /database & /vendor.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                PASSED / SECURE
              </span>
              <Database className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Financial Transaction Lock</h4>
            <p className="text-xs text-slate-600">
              Setiap transaksi SP2D & Realisasi dibungkus PDO BEGIN, COMMIT, ROLLBACK & validasi saldo server-side.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
