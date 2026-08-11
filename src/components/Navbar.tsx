import React from 'react';
import { Database, FileCode, Calculator, Table, FileText, CheckCircle2, ShieldCheck, Server, Lock, Users, FolderTree, Package, FileCheck2, Receipt, LayoutDashboard, FileSpreadsheet, Layers, FileUp } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'final-integration', label: 'Final Test & Deployment (Tahap 12)', icon: CheckCircle2 },
    { id: 'system-security', label: 'Audit, Backup & Settings (Tahap 11)', icon: ShieldCheck },
    { id: 'import-export', label: 'Import & Export Center (Tahap 10)', icon: FileUp },
    { id: 'laporan-pekerjaan-pajak', label: 'Laporan Pekerjaan, Pembayaran & Pajak (Tahap 9)', icon: Layers },
    { id: 'laporan-anggaran', label: 'Laporan Realisasi Anggaran (Tahap 8)', icon: FileSpreadsheet },
    { id: 'dashboard', label: 'Dashboard Keuangan (Tahap 7)', icon: LayoutDashboard },
    { id: 'pembayaran-pajak', label: 'Pembayaran & Pajak (Tahap 6)', icon: Receipt },
    { id: 'realisasi', label: 'Realisasi Pekerjaan (Tahap 5)', icon: FileCheck2 },
    { id: 'penyedia-paket', label: 'Penyedia & Paket (Tahap 4)', icon: Package },
    { id: 'master-anggaran', label: 'Master Anggaran (Tahap 3)', icon: FolderTree },
    { id: 'auth', label: 'Login & Otentikasi (Tahap 2)', icon: Lock },
    { id: 'users-mgt', label: 'User Management (Tahap 2)', icon: Users },
    { id: 'erd', label: 'ERD & Arsitektur', icon: Database },
    { id: 'tables', label: 'Struktur 14 Tabel', icon: Table },
    { id: 'sql', label: 'SQL File Generator', icon: FileCode },
    { id: 'seed', label: 'Data Seed 2026', icon: FileText },
    { id: 'tax', label: 'Kalkulator Pajak', icon: Calculator },
    { id: 'php-mvc', label: 'Kode PHP MVC', icon: Server }
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600 rounded-xl shadow-lg shadow-emerald-500/20">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg leading-tight tracking-tight text-slate-100">
                  SIMKEU UPTD <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30">TAHAP 1 - 9 SELESAI</span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1.5">
                <span>Database: <strong className="text-emerald-300">db_keuangan_uptd</strong></span>
                <span>•</span>
                <span>PHP Native MVC</span>
                <span>•</span>
                <span>Laporan Pekerjaan, Pembayaran & Pajak (Tahap 9)</span>
              </p>
            </div>
          </div>


          <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 px-2 py-1">
              <ShieldCheck className="w-4 h-4" />
              <span>PDO Prepared Statements</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400 px-2 py-1 border-l border-slate-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>14 Tabel Utama Validated</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
