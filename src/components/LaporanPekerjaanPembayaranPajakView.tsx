import React, { useState, useMemo } from 'react';
import { 
  FileCheck2, 
  Receipt, 
  CreditCard, 
  Filter, 
  Search, 
  RotateCcw, 
  Printer, 
  FileSpreadsheet, 
  Download, 
  Building2, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowUpRight,
  Calculator
} from 'lucide-react';

interface PekerjaanItem {
  no: number;
  program: string;
  kegiatan: string;
  subKegiatan: string;
  paket: string;
  paguPaket: number;
  nilaiKontrak: number;
  totalPembayaran: number;
  sisaKontrak: number;
  persentase: number; // Nilai Kontrak / Pagu Paket * 100%
  penyedia: string;
  status: string;
}

interface PembayaranItem {
  paket: string;
  pekerjaan: string;
  nomorSp: string;
  penyedia: string;
  pembayaranKe: number;
  tanggal: string;
  rekening: string;
  nilaiPembayaran: number;
  totalPajak: number;
  nilaiBersih: number;
}

interface PajakItem {
  paket: string;
  penyedia: string;
  tanggal: string;
  pembayaran: number;
  ppn: number;
  pph21: number;
  pph22: number;
  pph23Jasa: number;
  pph23Makan: number;
  totalPajak: number;
}

export const LaporanPekerjaanPembayaranPajakView: React.FC = () => {
  const [activeReportTab, setActiveReportTab] = useState<'pekerjaan' | 'pembayaran' | 'pajak'>('pekerjaan');
  const [filterTahun, setFilterTahun] = useState<string>('2026');
  const [filterTglMulai, setFilterTglMulai] = useState<string>('2026-01-01');
  const [filterTglAkhir, setFilterTglAkhir] = useState<string>('2026-12-31');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // A. Sample Realisasi Pekerjaan
  const listPekerjaan: PekerjaanItem[] = [
    {
      no: 1,
      program: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kegiatan: 'Kegiatan Pelayanan & Operasional Perkantoran UPTD',
      subKegiatan: 'Penyediaan Alat Tulis Kantor & Bahan Cetakan',
      paket: 'Pengadaan Alat Tulis Kantor & Bahan Cetakan Tahap I',
      paguPaket: 150000000,
      nilaiKontrak: 142500000,
      totalPembayaran: 142500000,
      sisaKontrak: 0,
      persentase: 95.00,
      penyedia: 'CV Mandiri Jaya Gemilang',
      status: 'SELESAI (100%)'
    },
    {
      no: 2,
      program: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kegiatan: 'Kegiatan Pelayanan & Operasional Perkantoran UPTD',
      subKegiatan: 'Honorarium Pengelola Keuangan & Pejabat PPTK',
      paket: 'Honorarium Pengelola Keuangan Triwulan I & II',
      paguPaket: 150000000,
      nilaiKontrak: 150000000,
      totalPembayaran: 150000000,
      sisaKontrak: 0,
      persentase: 100.00,
      penyedia: 'Tim Pengelola Keuangan UPTD',
      status: 'SELESAI (100%)'
    },
    {
      no: 3,
      program: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kegiatan: 'Kegiatan Pemeliharaan Sarana & Prasarana UPTD',
      subKegiatan: 'Pemeliharaan Gedung Kantor & Servis AC Berkala',
      paket: 'Pemeliharaan Bangunan & Fasilitas Gedung BLK',
      paguPaket: 350000000,
      nilaiKontrak: 335000000,
      totalPembayaran: 200000000,
      sisaKontrak: 135000000,
      persentase: 95.71,
      penyedia: 'PT Banten Karya Utama',
      status: 'PROSES DIBAYAR (Termin 1)'
    },
    {
      no: 4,
      program: 'Program Pengelolaan Keuangan & Aset UPTD',
      kegiatan: 'Kegiatan Penatausahaan Keuangan & Aset Daerah',
      subKegiatan: 'Penyediaan Jasa Kebersihan & Petugas Keamanan Kantor',
      paket: 'Belanja Jasa Kebersihan & Keamanan Gedung Kantor',
      paguPaket: 280000000,
      nilaiKontrak: 268000000,
      totalPembayaran: 134000000,
      sisaKontrak: 134000000,
      persentase: 95.71,
      penyedia: 'CV Sentinel Security Services',
      status: 'PROSES DIBAYAR (Termin 1)'
    },
    {
      no: 5,
      program: 'Program Layanan Teknis Operasional UPTD',
      kegiatan: 'Kegiatan Pelayanan Pelatihan & Sertifikasi UPTD',
      subKegiatan: 'Pengadaan Server Cloud & Peralatan Komputer Pelatihan',
      paket: 'Pengadaan Komputer Mainframe & Cloud Server Training',
      paguPaket: 200000000,
      nilaiKontrak: 190000000,
      totalPembayaran: 190000000,
      sisaKontrak: 0,
      persentase: 95.00,
      penyedia: 'PT Cilegon Inovasi Teknologi',
      status: 'SELESAI (100%)'
    }
  ];

  // B. Sample Laporan Pembayaran
  const listPembayaran: PembayaranItem[] = [
    {
      paket: 'Pengadaan ATK & Bahan Cetakan Tahap I',
      pekerjaan: 'Pengadaan ATK & Bahan Cetakan Pelatihan Kerja UPTD',
      nomorSp: 'SP-001/BLK/2026',
      penyedia: 'CV Mandiri Jaya Gemilang',
      pembayaranKe: 1,
      tanggal: '2026-03-15',
      rekening: '5.1.02.01.01.0024 - Belanja Alat/Bahan ATK',
      nilaiPembayaran: 142500000,
      totalPajak: 16038288,
      nilaiBersih: 126461712
    },
    {
      paket: 'Honorarium Pengelola Keuangan',
      pekerjaan: 'Jasa Honorarium Penanggungjawab Pengelola Keuangan',
      nomorSp: 'SP-002/BLK/2026',
      penyedia: 'Tim Pengelola Keuangan UPTD',
      pembayaranKe: 1,
      tanggal: '2026-04-10',
      rekening: '5.1.01.03.01.0001 - Belanja Honorarium Pengelola',
      nilaiPembayaran: 150000000,
      totalPajak: 7500000,
      nilaiBersih: 142500000
    },
    {
      paket: 'Pemeliharaan Bangunan & Fasilitas Gedung BLK',
      pekerjaan: 'Pemeliharaan Bangunan Gedung-Bangunan Tempat Kerja',
      nomorSp: 'SP-003/BLK/2026',
      penyedia: 'PT Banten Karya Utama',
      pembayaranKe: 1,
      tanggal: '2026-05-20',
      rekening: '5.1.02.03.02.0035 - Pemeliharaan Gedung',
      nilaiPembayaran: 200000000,
      totalPajak: 23423423,
      nilaiBersih: 176576577
    },
    {
      paket: 'Belanja Jasa Kebersihan & Keamanan Gedung',
      pekerjaan: 'Belanja Jasa Tenaga Kebersihan & Security Kantor',
      nomorSp: 'SP-004/BLK/2026',
      penyedia: 'CV Sentinel Security Services',
      pembayaranKe: 1,
      tanggal: '2026-06-12',
      rekening: '5.1.02.02.01.0008 - Jasa Kebersihan & Security',
      nilaiPembayaran: 134000000,
      totalPajak: 15693693,
      nilaiBersih: 118306307
    },
    {
      paket: 'Pengadaan Komputer Mainframe & Cloud Server',
      pekerjaan: 'Belanja Modal Peralatan Komputer Mainframe/Server',
      nomorSp: 'SP-005/BLK/2026',
      penyedia: 'PT Cilegon Inovasi Teknologi',
      pembayaranKe: 1,
      tanggal: '2026-07-05',
      rekening: '5.2.02.05.01.0001 - Belanja Modal Komputer',
      nilaiPembayaran: 190000000,
      totalPajak: 21378378,
      nilaiBersih: 168621622
    }
  ];

  // C. Sample Laporan Pajak
  const listPajak: PajakItem[] = [
    {
      paket: 'Pengadaan ATK & Bahan Cetakan Tahap I',
      penyedia: 'CV Mandiri Jaya Gemilang',
      tanggal: '2026-03-15',
      pembayaran: 142500000,
      ppn: 14121622,
      pph21: 0,
      pph22: 1925676,
      pph23Jasa: 0,
      pph23Makan: 0,
      totalPajak: 16047298
    },
    {
      paket: 'Honorarium Pengelola Keuangan',
      penyedia: 'Tim Pengelola Keuangan UPTD',
      tanggal: '2026-04-10',
      pembayaran: 150000000,
      ppn: 0,
      pph21: 7500000,
      pph22: 0,
      pph23Jasa: 0,
      pph23Makan: 0,
      totalPajak: 7500000
    },
    {
      paket: 'Pemeliharaan Bangunan & Fasilitas Gedung BLK',
      penyedia: 'PT Banten Karya Utama',
      tanggal: '2026-05-20',
      pembayaran: 200000000,
      ppn: 19819820,
      pph21: 0,
      pph22: 0,
      pph23Jasa: 3603604,
      pph23Makan: 0,
      totalPajak: 23423424
    },
    {
      paket: 'Belanja Jasa Kebersihan & Keamanan Gedung',
      penyedia: 'CV Sentinel Security Services',
      tanggal: '2026-06-12',
      pembayaran: 134000000,
      ppn: 13279279,
      pph21: 0,
      pph22: 0,
      pph23Jasa: 2414414,
      pph23Makan: 0,
      totalPajak: 15693693
    },
    {
      paket: 'Pengadaan Komputer Mainframe & Cloud Server',
      penyedia: 'PT Cilegon Inovasi Teknologi',
      tanggal: '2026-07-05',
      pembayaran: 190000000,
      ppn: 18828829,
      pph21: 0,
      pph22: 2567568,
      pph23Jasa: 0,
      pph23Makan: 0,
      totalPajak: 21396397
    },
    {
      paket: 'Penyediaan Makan & Minum Rapat / Kedinasan',
      penyedia: 'CV Catering Selera Rasa',
      tanggal: '2026-08-01',
      pembayaran: 115000000,
      ppn: 0,
      pph21: 0,
      pph22: 0,
      pph23Jasa: 0,
      pph23Makan: 2300000,
      totalPajak: 2300000
    }
  ];

  // Search Filtered Lists
  const filteredPekerjaan = useMemo(() => {
    return listPekerjaan.filter(item => 
      searchTerm === '' ||
      item.paket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penyedia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subKegiatan.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredPembayaran = useMemo(() => {
    return listPembayaran.filter(item =>
      searchTerm === '' ||
      item.paket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penyedia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nomorSp.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredPajak = useMemo(() => {
    return listPajak.filter(item =>
      searchTerm === '' ||
      item.paket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.penyedia.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const showToast = (type: 'success' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
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

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-indigo-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                TAHAP 9 • TRILOGI LAPORAN KEUANGAN
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                TA 2026
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <Layers className="w-7 h-7 text-indigo-400" />
              Laporan Pekerjaan, Pembayaran & Pajak UPTD
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Integrasi 3 kelompok laporan resmi: Laporan Realisasi Pekerjaan (Paket & Kontrak), Laporan Pembayaran (Pencairan SP2D), dan Laporan Potongan Pajak (PPN, PPh21, PPh22, PPh23).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 shadow-sm flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Cetak Official</span>
            </button>
            <button
              onClick={() => showToast('success', 'File Excel Laporan Tahap 9 berhasil di-generate.')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={() => showToast('info', 'File PDF Laporan (Landscape Format) siap diunduh.')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Main Report Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveReportTab('pekerjaan')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'pekerjaan'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          <span>A. Laporan Realisasi Pekerjaan</span>
        </button>

        <button
          onClick={() => setActiveReportTab('pembayaran')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'pembayaran'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>B. Laporan Pembayaran SP2D</span>
        </button>

        <button
          onClick={() => setActiveReportTab('pajak')}
          className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'pajak'
              ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>C. Laporan Setoran Pajak</span>
        </button>
      </div>

      {/* Search & Filter Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari Berdasarkan Paket, Pekerjaan, Penyedia, atau Nomor SP..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <span className="text-xs font-semibold text-slate-500">Tahun:</span>
          <select
            value={filterTahun}
            onChange={(e) => setFilterTahun(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="2026">2026 (Aktif)</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* SUB-REPORT TAB CONTENT */}

      {/* TAB A: LAPORAN REALISASI PEKERJAAN */}
      {activeReportTab === 'pekerjaan' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-600" />
              Tabel A. Laporan Realisasi Pekerjaan (DPA & Efisiensi Kontrak)
            </h3>
            <span className="text-xs text-slate-500 font-medium">Menampilkan {filteredPekerjaan.length} paket pekerjaan</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                  <th className="p-3 text-center border-r border-slate-800">No</th>
                  <th className="p-3 border-r border-slate-800">Program</th>
                  <th className="p-3 border-r border-slate-800">Kegiatan</th>
                  <th className="p-3 border-r border-slate-800">Sub-Kegiatan</th>
                  <th className="p-3 border-r border-slate-800 font-extrabold text-indigo-300">Paket Pekerjaan</th>
                  <th className="p-3 border-r border-slate-800 text-right">Pagu Paket (Rp)</th>
                  <th className="p-3 border-r border-slate-800 text-right">Nilai Kontrak (Rp)</th>
                  <th className="p-3 border-r border-slate-800 text-right">Total Pembayaran (Rp)</th>
                  <th className="p-3 border-r border-slate-800 text-right">Sisa Kontrak (Rp)</th>
                  <th className="p-3 border-r border-slate-800 text-center">% Efisiensi</th>
                  <th className="p-3 border-r border-slate-800">Penyedia</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPekerjaan.map((item) => (
                  <tr key={item.no} className="hover:bg-indigo-50/30 transition-colors">
                    <td className="p-3 text-center font-mono font-bold text-slate-600">{item.no}</td>
                    <td className="p-3 font-medium text-slate-800">{item.program}</td>
                    <td className="p-3">{item.kegiatan}</td>
                    <td className="p-3">{item.subKegiatan}</td>
                    <td className="p-3 font-semibold text-indigo-900">{item.paket}</td>
                    <td className="p-3 text-right font-mono font-bold">Rp {item.paguPaket.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">Rp {item.nilaiKontrak.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">Rp {item.totalPembayaran.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-amber-700">Rp {item.sisaKontrak.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-center font-mono font-bold text-indigo-700">{item.persentase.toFixed(2)}%</td>
                    <td className="p-3 font-semibold text-slate-800">{item.penyedia}</td>
                    <td className="p-3 text-center">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB B: LAPORAN PEMBAYARAN */}
      {activeReportTab === 'pembayaran' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Receipt className="w-4 h-4 text-emerald-600" />
              Tabel B. Laporan Pembayaran Keuangan & SP2D
            </h3>
            <span className="text-xs text-slate-500 font-medium">Menampilkan {filteredPembayaran.length} transaksi pembayaran</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                  <th className="p-3 border-r border-slate-800">Paket Pekerjaan</th>
                  <th className="p-3 border-r border-slate-800">Uraian Pekerjaan</th>
                  <th className="p-3 border-r border-slate-800">Nomor SP</th>
                  <th className="p-3 border-r border-slate-800">Penyedia</th>
                  <th className="p-3 border-r border-slate-800 text-center">Pembayaran Ke</th>
                  <th className="p-3 border-r border-slate-800 text-center">Tanggal SP2D</th>
                  <th className="p-3 border-r border-slate-800">Rekening Belanja</th>
                  <th className="p-3 border-r border-slate-800 text-right">Nilai Pembayaran (Rp)</th>
                  <th className="p-3 border-r border-slate-800 text-right bg-rose-950/80">Total Pajak (Rp)</th>
                  <th className="p-3 text-right bg-emerald-950/80">Nilai Bersih (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPembayaran.map((item, idx) => (
                  <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="p-3 font-semibold text-indigo-900">{item.paket}</td>
                    <td className="p-3">{item.pekerjaan}</td>
                    <td className="p-3 font-mono text-center font-bold text-slate-800">{item.nomorSp}</td>
                    <td className="p-3 font-medium text-slate-800">{item.penyedia}</td>
                    <td className="p-3 font-mono text-center font-bold">Ke-{item.pembayaranKe}</td>
                    <td className="p-3 font-mono text-center">{item.tanggal}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{item.rekening}</td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900">Rp {item.nilaiPembayaran.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-rose-700">Rp {item.totalPajak.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700">Rp {item.nilaiBersih.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB C: LAPORAN PAJAK */}
      {activeReportTab === 'pajak' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-rose-600" />
              Tabel C. Laporan Pemotongan & Setoran Pajak UPTD
            </h3>
            <span className="text-xs text-slate-500 font-medium">Menampilkan {filteredPajak.length} data pemotongan pajak</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                  <th rowSpan={2} className="p-3 border-r border-slate-800 align-middle">Paket Pekerjaan</th>
                  <th rowSpan={2} className="p-3 border-r border-slate-800 align-middle">Penyedia</th>
                  <th rowSpan={2} className="p-3 border-r border-slate-800 align-middle text-center">Tanggal SP2D</th>
                  <th rowSpan={2} className="p-3 border-r border-slate-800 align-middle text-right">Nilai Pembayaran (Rp)</th>
                  <th colSpan={5} className="p-2 border-r border-slate-800 text-center bg-indigo-950">Rincian Potongan Pajak (Rupiah)</th>
                  <th rowSpan={2} className="p-3 text-right bg-rose-950 align-middle">Total Pajak (Rp)</th>
                </tr>
                <tr className="bg-slate-800 text-slate-200 uppercase text-[9px] tracking-wider font-bold">
                  <th className="p-2 text-right border-r border-slate-700">PPN (11%)</th>
                  <th className="p-2 text-right border-r border-slate-700">PPh 21</th>
                  <th className="p-2 text-right border-r border-slate-700">PPh 22 (1.5%)</th>
                  <th className="p-2 text-right border-r border-slate-700">PPh 23 Jasa (2%)</th>
                  <th className="p-2 text-right border-r border-slate-700">PPh 23 Makan (2%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPajak.map((item, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/30 transition-colors">
                    <td className="p-3 font-semibold text-indigo-900">{item.paket}</td>
                    <td className="p-3 font-medium text-slate-800">{item.penyedia}</td>
                    <td className="p-3 font-mono text-center">{item.tanggal}</td>
                    <td className="p-3 text-right font-mono font-bold">Rp {item.pembayaran.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono text-indigo-700 font-semibold">Rp {item.ppn.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono">Rp {item.pph21.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono">Rp {item.pph22.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono">Rp {item.pph23Jasa.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono">Rp {item.pph23Makan.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right font-mono font-bold text-rose-700 bg-rose-50/50">Rp {item.totalPajak.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Print Modal Preview */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Printer className="w-5 h-5 text-indigo-600" />
                <span>Preview Cetak Official Laporan Tahap 9</span>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>

            <div className="p-8 border border-slate-300 bg-white shadow-inner font-serif space-y-6 text-slate-900">
              <div className="text-center border-b-4 border-double border-slate-900 pb-3">
                <h3 className="text-base font-bold tracking-wider uppercase m-0">PEMERINTAH KOTA CILEGON</h3>
                <h2 className="text-lg font-extrabold tracking-wider uppercase m-0">DINAS TENAGA KERJA</h2>
                <h3 className="text-base font-bold tracking-wider uppercase m-0">UPTD LATIHAN KERJA</h3>
                <p className="text-[11px] font-sans text-slate-600 m-0 mt-1">
                  Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten 42436
                </p>
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-sm uppercase underline tracking-wide">
                  {activeReportTab === 'pekerjaan' && 'LAPORAN REALISASI PEKERJAAN'}
                  {activeReportTab === 'pembayaran' && 'LAPORAN PEMBAYARAN KEUANGAN SP2D'}
                  {activeReportTab === 'pajak' && 'LAPORAN PEMOTONGAN DAN SETORAN PAJAK'}
                </h4>
                <p className="text-xs text-slate-600 font-sans">
                  TAHUN ANGGARAN 2026 | PERIODE: s/d {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className="text-xs font-sans text-slate-700 text-center py-4 border border-dashed border-slate-300 rounded-lg bg-slate-50">
                Dokumen Laporan Resmi Siap Dicetak Sesuai Format Peraturan Walikota Cilegon No. 42 / 2026.
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs font-sans">
                <div>
                  <p className="m-0">Mengetahui,</p>
                  <p className="font-bold uppercase m-0 mt-1 mb-12">KEPALA UPTD LATIHAN KERJA DINAS TENAGA KERJA KOTA CILEGON</p>
                  <p className="font-bold underline m-0">H. DEDI RACHMAT, S.ST, M.Si</p>
                  <p className="text-slate-600 m-0">NIP. 19780512 200501 1 008</p>
                </div>
                <div>
                  <p className="m-0">Cilegon, {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  <p className="font-bold uppercase m-0 mt-1 mb-12">BENDAHARA PENGELUARAN UPTD</p>
                  <p className="font-bold underline m-0">SITI RAHMAWATI, S.E.</p>
                  <p className="text-slate-600 m-0">NIP. 19850920 201001 2 015</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  window.print();
                  setIsPrintModalOpen(false);
                }}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
