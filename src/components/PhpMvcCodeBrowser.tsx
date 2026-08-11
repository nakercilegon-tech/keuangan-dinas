import React, { useState, useEffect } from 'react';
import { Server, Folder, FileText, Copy, Check, Terminal } from 'lucide-react';

export const PhpMvcCodeBrowser: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('/config/config.php');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const fileTree = [
    {
      folder: 'app / controllers (Tahap 2-12)',
      files: [
        { path: '/app/controllers/SystemController.php', label: 'SystemController.php', desc: 'Controller Audit, Backup, Settings & Security (Tahap 11)' },
        { path: '/app/controllers/ImportExportController.php', label: 'ImportExportController.php', desc: 'Controller Import Excel & Export Laporan (Tahap 10)' },
        { path: '/app/controllers/LaporanController.php', label: 'LaporanController.php', desc: 'Controller Laporan Realisasi Pekerjaan, Pembayaran & Pajak (Tahap 9)' },
        { path: '/app/controllers/DashboardController.php', label: 'DashboardController.php', desc: 'Controller Dashboard & API Stats (Tahap 7)' },
        { path: '/app/controllers/PembayaranController.php', label: 'PembayaranController.php', desc: 'Controller Pembayaran & Pajak (Tahap 6)' },
        { path: '/app/controllers/RealisasiController.php', label: 'RealisasiController.php', desc: 'Controller Realisasi, Auto-Fill & BA' },
        { path: '/app/controllers/PenyediaController.php', label: 'PenyediaController.php', desc: 'CRUD Master Rekanan / Penyedia' },
        { path: '/app/controllers/PaketPekerjaanController.php', label: 'PaketPekerjaanController.php', desc: 'CRUD Paket & Multi-Rekening' },
        { path: '/app/controllers/ProgramController.php', label: 'ProgramController.php', desc: 'CRUD Program Anggaran' },
        { path: '/app/controllers/KegiatanController.php', label: 'KegiatanController.php', desc: 'CRUD Kegiatan Anggaran' },
        { path: '/app/controllers/SubKegiatanController.php', label: 'SubKegiatanController.php', desc: 'CRUD Sub-Kegiatan' },
        { path: '/app/controllers/RekeningController.php', label: 'RekeningController.php', desc: 'CRUD Rekening Belanja' },
        { path: '/app/controllers/AuthController.php', label: 'AuthController.php', desc: 'Login, Logout, & Session Init' },
        { path: '/app/controllers/UserController.php', label: 'UserController.php', desc: 'CRUD Pengguna & Role Guard' },
        { path: '/app/controllers/BaseController.php', label: 'BaseController.php', desc: 'Base Controller MVC' }
      ]
    },
    {
      folder: 'app / models & middlewares (Tahap 1-12)',
      files: [
        { path: '/app/models/SystemModel.php', label: 'SystemModel.php', desc: 'Model Audit Trail, Backup Engine & Settings (Tahap 11)' },
        { path: '/app/models/ImportExportModel.php', label: 'ImportExportModel.php', desc: 'Model Bulk Import Engine & Excel Validation (Tahap 10)' },
        { path: '/app/models/LaporanModel.php', label: 'LaporanModel.php', desc: 'Model Laporan Realisasi Anggaran, Pekerjaan & Pajak (Tahap 8 & 9)' },
        { path: '/app/models/DashboardModel.php', label: 'DashboardModel.php', desc: 'Model Dashboard & Query Index Aggregation (Tahap 7)' },
        { path: '/app/models/PembayaranModel.php', label: 'PembayaranModel.php', desc: 'Model Pembayaran, Pajak & PDO Transaction (Tahap 6)' },
        { path: '/app/models/RealisasiModel.php', label: 'RealisasiModel.php', desc: 'Model Realisasi, Auto-Number & Multi-Rekening' },
        { path: '/app/models/PenyediaModel.php', label: 'PenyediaModel.php', desc: 'Model Penyedia & Unik NPWP' },
        { path: '/app/models/PaketPekerjaanModel.php', label: 'PaketPekerjaanModel.php', desc: 'Model Paket & Multi-Rekening Transaction' },
        { path: '/app/models/ProgramModel.php', label: 'ProgramModel.php', desc: 'Model Program & Child Check' },
        { path: '/app/models/KegiatanModel.php', label: 'KegiatanModel.php', desc: 'Model Kegiatan & Cascading' },
        { path: '/app/models/SubKegiatanModel.php', label: 'SubKegiatanModel.php', desc: 'Model Sub-Kegiatan & Paket' },
        { path: '/app/models/RekeningModel.php', label: 'RekeningModel.php', desc: 'Model Rekening Belanja' },
        { path: '/app/models/UserModel.php', label: 'UserModel.php', desc: 'User Model & Hashing' },
        { path: '/app/middlewares/AuthMiddleware.php', label: 'AuthMiddleware.php', desc: 'Session Auth & Role Verification' },
        { path: '/app/models/BaseModel.php', label: 'BaseModel.php', desc: 'Base Model PDO Prepared Statements' },
        { path: '/app/helpers/functions.php', label: 'functions.php', desc: 'Helper Sanitasi & Kalkulasi Pajak' }
      ]
    },

    {
      folder: 'app / views & layouts (Tahap 2-12)',
      files: [
        { path: '/app/views/system/index.php', label: 'system/index.php', desc: 'View Audit, Backup, Settings & Security Review (Tahap 11)' },
        { path: '/app/views/import_export/index.php', label: 'import_export/index.php', desc: 'View Import & Export Center (Tahap 10)' },
        { path: '/app/views/laporan/realisasi_pekerjaan.php', label: 'laporan/realisasi_pekerjaan.php', desc: 'View Laporan Realisasi Pekerjaan (Tahap 9)' },
        { path: '/app/views/laporan/pembayaran.php', label: 'laporan/pembayaran.php', desc: 'View Laporan Pembayaran (Tahap 9)' },
        { path: '/app/views/laporan/pajak.php', label: 'laporan/pajak.php', desc: 'View Laporan Pajak (Tahap 9)' },
        { path: '/app/views/laporan/realisasi_anggaran.php', label: 'laporan/realisasi_anggaran.php', desc: 'View Laporan Realisasi Anggaran LRA (Tahap 8)' },
        { path: '/app/views/pembayaran/index.php', label: 'pembayaran/index.php', desc: 'View Daftar Transaksi Pembayaran' },
        { path: '/app/views/pembayaran/create.php', label: 'pembayaran/create.php', desc: 'View Form Input & Realtime Tax Calculator' },
        { path: '/app/views/pembayaran/detail.php', label: 'pembayaran/detail.php', desc: 'View Kuitansi Pembayaran & Rincian Pajak' },
        { path: '/app/views/realisasi/index.php', label: 'realisasi/index.php', desc: 'View Index Realisasi Pekerjaan' },
        { path: '/app/views/realisasi/create.php', label: 'realisasi/create.php', desc: 'View Form Multi-Rekening & Auto Fill' },
        { path: '/app/views/realisasi/detail.php', label: 'realisasi/detail.php', desc: 'View Detail Contract & Payments' },
        { path: '/app/views/penyedia/index.php', label: 'penyedia/index.php', desc: 'View Master Penyedia' },
        { path: '/app/views/penyedia/create.php', label: 'penyedia/create.php', desc: 'View Form Tambah Penyedia' },
        { path: '/app/views/paket/index.php', label: 'paket/index.php', desc: 'View Daftar Paket Pekerjaan' },
        { path: '/app/views/paket/create.php', label: 'paket/create.php', desc: 'View Form Multi-Rekening Paket' },
        { path: '/app/views/paket/detail.php', label: 'paket/detail.php', desc: 'View Detail Rincian Paket' },
        { path: '/app/views/auth/login.php', label: 'login.php', desc: 'View Form Login' },
        { path: '/app/views/dashboard/index.php', label: 'dashboard/index.php', desc: 'View Dashboard Utama' },
        { path: '/app/views/users/index.php', label: 'users/index.php', desc: 'View Tabel Users' },
        { path: '/app/views/layouts/sidebar.php', label: 'layouts/sidebar.php', desc: 'View Sidebar Navigasi' }
      ]
    },
    {
      folder: 'config & root files',
      files: [
        { path: '/config/config.php', label: 'config.php', desc: 'Konstanta & Environment' },
        { path: '/config/database.php', label: 'database.php', desc: 'Koneksi PDO & Transaksi' },
        { path: '/index.php', label: 'index.php', desc: 'Front Controller Routing' }
      ]
    }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/file?path=${encodeURIComponent(selectedFile)}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content || 'Content not found');
        setLoading(false);
      })
      .catch((err) => {
        setContent(`Error loading file: ${err.message}`);
        setLoading(false);
      });
  }, [selectedFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-600" />
          <span>Penjelajah Berkas PHP Native MVC (Fondasi Tahap 1)</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Inspeksi langsung berkas konfigurasi, helper, base controller/model, dan router aplikasi PHP.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Folder Tree */}
        <div className="lg:col-span-4 space-y-4">
          {fileTree.map((group, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 p-3 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
                <Folder className="w-3.5 h-3.5 text-indigo-500" />
                <span>{group.folder}</span>
              </div>

              <div className="space-y-1">
                {group.files.map((file) => {
                  const isSelected = selectedFile === file.path;
                  return (
                    <button
                      key={file.path}
                      onClick={() => setSelectedFile(file.path)}
                      className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-indigo-600 border-indigo-600 text-white font-semibold shadow-xs'
                          : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <FileText className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                        <span className="font-mono">{file.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Code Display */}
        <div className="lg:col-span-8 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-slate-200">{selectedFile}</span>
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
            </button>
          </div>

          <div className="p-4 overflow-x-auto max-h-[550px]">
            {loading ? (
              <div className="flex items-center justify-center py-12 text-slate-500 text-xs">
                Memuat kode PHP...
              </div>
            ) : (
              <pre className="font-mono text-xs text-indigo-300 leading-relaxed whitespace-pre font-normal">
                {content}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
