import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FinalIntegrationTestView } from './components/FinalIntegrationTestView';
import { SystemSecurityView } from './components/SystemSecurityView';
import { ImportExportView } from './components/ImportExportView';
import { LaporanPekerjaanPembayaranPajakView } from './components/LaporanPekerjaanPembayaranPajakView';
import { LaporanRealisasiAnggaranView } from './components/LaporanRealisasiAnggaranView';
import { DashboardView } from './components/DashboardView';
import { ErdView } from './components/ErdView';
import { TableStructureView } from './components/TableStructureView';
import { SqlViewer } from './components/SqlViewer';
import { SeedExplorerView } from './components/SeedExplorerView';
import { TaxCalculator } from './components/TaxCalculator';
import { PhpMvcCodeBrowser } from './components/PhpMvcCodeBrowser';
import { AuthSimView } from './components/AuthSimView';
import { UserManagementView } from './components/UserManagementView';
import { MasterAnggaranView } from './components/MasterAnggaranView';
import { PenyediaPaketView } from './components/PenyediaPaketView';
import { RealisasiPekerjaanView } from './components/RealisasiPekerjaanView';
import { PembayaranPajakView } from './components/PembayaranPajakView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('final-integration');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'final-integration' && <FinalIntegrationTestView />}
        {activeTab === 'system-security' && <SystemSecurityView />}
        {activeTab === 'import-export' && <ImportExportView />}
        {activeTab === 'laporan-pekerjaan-pajak' && <LaporanPekerjaanPembayaranPajakView />}
        {activeTab === 'laporan-anggaran' && <LaporanRealisasiAnggaranView />}
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'pembayaran-pajak' && <PembayaranPajakView />}
        {activeTab === 'realisasi' && <RealisasiPekerjaanView />}
        {activeTab === 'penyedia-paket' && <PenyediaPaketView />}
        {activeTab === 'master-anggaran' && <MasterAnggaranView />}

        {activeTab === 'auth' && <AuthSimView />}
        {activeTab === 'users-mgt' && <UserManagementView />}
        {activeTab === 'erd' && <ErdView />}
        {activeTab === 'tables' && <TableStructureView />}
        {activeTab === 'sql' && <SqlViewer />}
        {activeTab === 'seed' && <SeedExplorerView />}
        {activeTab === 'tax' && <TaxCalculator />}
        {activeTab === 'php-mvc' && <PhpMvcCodeBrowser />}
      </main>

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center border-t border-slate-200 mt-12 text-xs text-slate-500">
        <p className="font-semibold text-slate-700">
          SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS (SIMKEU UPTD)
        </p>
        <p className="mt-1 font-mono text-[11px] text-slate-400">
          Database: db_keuangan_uptd • Arsitektur: PHP Native MVC • Tahun Anggaran: 2026
        </p>
      </footer>
    </div>
  );
}
