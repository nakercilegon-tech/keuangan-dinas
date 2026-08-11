import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Printer, 
  FileSpreadsheet, 
  FileCheck, 
  Filter, 
  Search, 
  RotateCcw, 
  Building2, 
  Calculator, 
  TrendingUp, 
  Download,
  SlidersHorizontal,
  ChevronRight,
  ShieldAlert,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

interface LraItem {
  id: string;
  kodeProgram: string;
  namaProgram: string;
  kodeKegiatan: string;
  namaKegiatan: string;
  kodeSubKegiatan: string;
  namaSubKegiatan: string;
  kodeRekening: string;
  namaRekening: string;
  pagu: number;
  realisasi: number;
}

export const LaporanRealisasiAnggaranView: React.FC = () => {
  const [filterTahun, setFilterTahun] = useState<string>('2026');
  const [filterProgram, setFilterProgram] = useState<string>('ALL');
  const [filterKegiatan, setFilterKegiatan] = useState<string>('ALL');
  const [filterTglMulai, setFilterTglMulai] = useState<string>('2026-01-01');
  const [filterTglAkhir, setFilterTglAkhir] = useState<string>('2026-12-31');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'info'; message: string } | null>(null);

  // Initial Seed Data Transaksi DB Realisasi Anggaran 2026
  const initialData: LraItem[] = [
    {
      id: 'LRA-001',
      kodeProgram: '1.02.01',
      namaProgram: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kodeKegiatan: '1.02.01.2.01',
      namaKegiatan: 'Kegiatan Pelayanan & Operasional Perkantoran UPTD',
      kodeSubKegiatan: '1.02.01.2.01.0001',
      namaSubKegiatan: 'Penyediaan Alat Tulis Kantor & Bahan Cetakan',
      kodeRekening: '5.1.02.01.01.0024',
      namaRekening: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Alat Tulis Kantor',
      pagu: 150000000,
      realisasi: 142500000
    },
    {
      id: 'LRA-002',
      kodeProgram: '1.02.01',
      namaProgram: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kodeKegiatan: '1.02.01.2.01',
      namaKegiatan: 'Kegiatan Pelayanan & Operasional Perkantoran UPTD',
      kodeSubKegiatan: '1.02.01.2.01.0002',
      namaSubKegiatan: 'Honorarium Pengelola Keuangan & Pejabat PPTK',
      kodeRekening: '5.1.01.03.01.0001',
      namaRekening: 'Belanja Honorarium Penanggungjawab Pengelola Keuangan',
      pagu: 150000000,
      realisasi: 150000000
    },
    {
      id: 'LRA-003',
      kodeProgram: '1.02.01',
      namaProgram: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kodeKegiatan: '1.02.01.2.02',
      namaKegiatan: 'Kegiatan Pemeliharaan Sarana & Prasarana UPTD',
      kodeSubKegiatan: '1.02.01.2.02.0003',
      namaSubKegiatan: 'Pemeliharaan Gedung Kantor & Servis AC Berkala',
      kodeRekening: '5.1.02.03.02.0035',
      namaRekening: 'Belanja Pemeliharaan Bangunan Gedung-Bangunan Tempat Kerja',
      pagu: 350000000,
      realisasi: 200000000
    },
    {
      id: 'LRA-004',
      kodeProgram: '1.02.02',
      namaProgram: 'Program Pengelolaan Keuangan & Aset UPTD',
      kodeKegiatan: '1.02.02.2.01',
      namaKegiatan: 'Kegiatan Penatausahaan Keuangan & Aset Daerah',
      kodeSubKegiatan: '1.02.02.2.01.0004',
      namaSubKegiatan: 'Penyediaan Jasa Kebersihan & Petugas Keamanan Kantor',
      kodeRekening: '5.1.02.02.01.0008',
      namaRekening: 'Belanja Jasa Tenaga Kebersihan & Security Kantor',
      pagu: 280000000,
      realisasi: 134000000
    },
    {
      id: 'LRA-005',
      kodeProgram: '1.02.03',
      namaProgram: 'Program Layanan Teknis Operasional UPTD',
      kodeKegiatan: '1.02.03.2.01',
      namaKegiatan: 'Kegiatan Pelayanan Pelatihan & Sertifikasi UPTD',
      kodeSubKegiatan: '1.02.03.2.01.0005',
      namaSubKegiatan: 'Pengadaan Server Cloud & Peralatan Komputer Pelatihan',
      kodeRekening: '5.2.02.05.01.0001',
      namaRekening: 'Belanja Modal Peralatan Komputer - Mainframe/Server',
      pagu: 200000000,
      realisasi: 190000000
    },
    {
      id: 'LRA-006',
      kodeProgram: '1.02.01',
      namaProgram: 'Program Dukungan Manajemen UPTD Latihan Kerja',
      kodeKegiatan: '1.02.01.2.01',
      namaKegiatan: 'Kegiatan Pelayanan & Operasional Perkantoran UPTD',
      kodeSubKegiatan: '1.02.01.2.01.0006',
      namaSubKegiatan: 'Penyediaan Makan & Minum Rapat / Kedinasan',
      kodeRekening: '5.1.02.01.01.0052',
      namaRekening: 'Belanja Makanan dan Minuman Rapat',
      pagu: 120000000,
      realisasi: 115000000
    }
  ];

  // Filtering Logic
  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const matchProgram = filterProgram === 'ALL' || item.kodeProgram === filterProgram;
      const matchKegiatan = filterKegiatan === 'ALL' || item.kodeKegiatan === filterKegiatan;
      const matchSearch = searchTerm === '' || 
        item.namaProgram.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.namaKegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.namaSubKegiatan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.namaRekening.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kodeRekening.includes(searchTerm);
      return matchProgram && matchKegiatan && matchSearch;
    });
  }, [filterProgram, filterKegiatan, searchTerm]);

  // Totals Calculation
  const totals = useMemo(() => {
    const pagu = filteredData.reduce((acc, curr) => acc + curr.pagu, 0);
    const realisasi = filteredData.reduce((acc, curr) => acc + curr.realisasi, 0);
    const sisa = pagu - realisasi;
    const persen = pagu > 0 ? (realisasi / pagu) * 100 : 0;
    return { pagu, realisasi, sisa, persen };
  }, [filteredData]);

  const showToast = (type: 'success' | 'info', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleExportExcel = () => {
    showToast('success', 'File Excel Laporan Realisasi Anggaran 2026 berhasil di-generate.');
  };

  const handleExportPdf = () => {
    showToast('info', 'File PDF Laporan Realisasi Anggaran (Landscape Format) siap didownload.');
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
                TAHAP 8 • PELAPORAN REALISASI ANGGARAN
              </span>
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                TA 2026
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FileText className="w-7 h-7 text-indigo-400" />
              Laporan Realisasi Anggaran (LRA) UPTD
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Penyajian real-time serapan anggaran DPA per Program, Kegiatan, Sub-Kegiatan, dan Kode Rekening Belanja berdasarkan seluruh transaksi pembukuan database.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 shadow-sm flex items-center gap-2 transition-all"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>Print Laporan</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPdf}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow-md shadow-rose-600/20 flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <Filter className="w-4 h-4 text-indigo-600" />
            <span>Parameter & Filter Laporan</span>
          </div>
          <button
            onClick={() => {
              setFilterTahun('2026');
              setFilterProgram('ALL');
              setFilterKegiatan('ALL');
              setSearchTerm('');
            }}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filter</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tahun Anggaran</label>
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="2026">TA 2026 (Aktif)</option>
              <option value="2025">TA 2025</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Program</label>
            <select
              value={filterProgram}
              onChange={(e) => setFilterProgram(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">-- Semua Program --</option>
              <option value="1.02.01">Program Dukungan Manajemen</option>
              <option value="1.02.02">Program Pengelolaan Keuangan</option>
              <option value="1.02.03">Program Layanan Teknis</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kegiatan</label>
            <select
              value={filterKegiatan}
              onChange={(e) => setFilterKegiatan(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">-- Semua Kegiatan --</option>
              <option value="1.02.01.2.01">Pelayanan & Operasional</option>
              <option value="1.02.01.2.02">Pemeliharaan Sarana</option>
              <option value="1.02.02.2.01">Penatausahaan Keuangan</option>
              <option value="1.02.03.2.01">Pelayanan Pelatihan</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Periode Awal</label>
            <input
              type="date"
              value={filterTglMulai}
              onChange={(e) => setFilterTglMulai(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Periode Akhir</label>
            <input
              type="date"
              value={filterTglAkhir}
              onChange={(e) => setFilterTglAkhir(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5" />
          <input
            type="text"
            placeholder="Cari Berdasarkan Kode Rekening, Nama Rekening, Sub-Kegiatan, atau Program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Pagu DPA</div>
          <div className="text-xl font-bold font-mono text-slate-900">
            Rp {totals.pagu.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Alokasi Anggaran Induk</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-200 shadow-sm bg-emerald-50/20">
          <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">Total Realisasi SP2D</div>
          <div className="text-xl font-bold font-mono text-emerald-700">
            Rp {totals.realisasi.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-600 mt-1">Total Pencairan Sah</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-sm bg-amber-50/20">
          <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider mb-1">Sisa Anggaran Kas</div>
          <div className="text-xl font-bold font-mono text-amber-700">
            Rp {totals.sisa.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-amber-600 mt-1">Siap Dicairkan</div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-indigo-200 shadow-sm bg-indigo-50/20">
          <div className="text-xs font-semibold text-indigo-700 uppercase tracking-wider mb-1">Persentase Serapan</div>
          <div className="text-xl font-bold font-mono text-indigo-700">
            {totals.persen.toFixed(2)}%
          </div>
          <div className="w-full bg-indigo-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${Math.min(totals.persen, 100)}%` }}></div>
          </div>
        </div>
      </div>

      {/* Main Table Document Component */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Header Info */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Tabel DPA & Serapan Realisasi Anggaran Dinas (TA 2026)
            </span>
          </div>
          <span className="text-xs font-medium text-slate-500">
            Menampilkan <strong>{filteredData.length}</strong> baris data
          </span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[10px] tracking-wider font-bold">
                <th className="p-3 border-r border-slate-800">Kode Program</th>
                <th className="p-3 border-r border-slate-800 min-w-[160px]">Program</th>
                <th className="p-3 border-r border-slate-800">Kode Kegiatan</th>
                <th className="p-3 border-r border-slate-800 min-w-[160px]">Kegiatan</th>
                <th className="p-3 border-r border-slate-800">Kode Sub-Kegiatan</th>
                <th className="p-3 border-r border-slate-800 min-w-[180px]">Sub-Kegiatan</th>
                <th className="p-3 border-r border-slate-800">Kode Rekening</th>
                <th className="p-3 border-r border-slate-800 min-w-[200px]">Nama Rekening</th>
                <th className="p-3 border-r border-slate-800 text-right bg-indigo-900/80">Pagu (Rp)</th>
                <th className="p-3 border-r border-slate-800 text-right bg-emerald-900/80">Realisasi (Rp)</th>
                <th className="p-3 border-r border-slate-800 text-right bg-amber-900/80">Sisa (Rp)</th>
                <th className="p-3 text-center bg-purple-900/80">% Serapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const sisa = item.pagu - item.realisasi;
                  const persen = item.pagu > 0 ? (item.realisasi / item.pagu) * 100 : 0;
                  return (
                    <tr key={item.id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="p-3 font-mono text-center font-semibold text-slate-600 bg-slate-50/50">{item.kodeProgram}</td>
                      <td className="p-3 font-medium text-slate-800">{item.namaProgram}</td>
                      <td className="p-3 font-mono text-center font-semibold text-slate-600 bg-slate-50/50">{item.kodeKegiatan}</td>
                      <td className="p-3 text-slate-700">{item.namaKegiatan}</td>
                      <td className="p-3 font-mono text-center font-semibold text-slate-600 bg-slate-50/50">{item.kodeSubKegiatan}</td>
                      <td className="p-3 text-slate-700">{item.namaSubKegiatan}</td>
                      <td className="p-3 font-mono text-center font-bold text-indigo-700 bg-indigo-50/40">{item.kodeRekening}</td>
                      <td className="p-3 font-semibold text-slate-900">{item.namaRekening}</td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900 bg-slate-50/30">
                        Rp {item.pagu.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/30">
                        Rp {item.realisasi.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-amber-700 bg-amber-50/30">
                        Rp {sisa.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-indigo-700 bg-indigo-50/30">
                        {persen.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={12} className="p-8 text-center text-slate-400">
                    Tidak ada data laporan yang sesuai dengan filter pencarian.
                  </td>
                </tr>
              )}
            </tbody>
            {/* Footer Total Summary Row */}
            <tfoot className="bg-slate-900 text-white font-bold font-mono text-xs">
              <tr>
                <td colSpan={8} className="p-3.5 text-right uppercase tracking-wider text-slate-300">
                  TOTAL KESELURUHAN REALISASI ANGGARAN:
                </td>
                <td className="p-3.5 text-right text-indigo-300 bg-indigo-950">
                  Rp {totals.pagu.toLocaleString('id-ID')}
                </td>
                <td className="p-3.5 text-right text-emerald-300 bg-emerald-950">
                  Rp {totals.realisasi.toLocaleString('id-ID')}
                </td>
                <td className="p-3.5 text-right text-amber-300 bg-amber-950">
                  Rp {totals.sisa.toLocaleString('id-ID')}
                </td>
                <td className="p-3.5 text-center text-purple-300 bg-purple-950">
                  {totals.persen.toFixed(2)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Official Print Preview Modal */}
      {isPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <Printer className="w-5 h-5 text-indigo-600" />
                <span>Preview Cetak Official Laporan Realisasi Anggaran</span>
              </div>
              <button
                onClick={() => setIsPrintModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm px-2"
              >
                ✕
              </button>
            </div>

            {/* Official Kop Surat Document Paper */}
            <div className="p-8 border border-slate-300 bg-white shadow-inner font-serif space-y-6 text-slate-900">
              <div className="text-center border-b-4 border-double border-slate-900 pb-3">
                <h3 className="text-base font-bold tracking-wider uppercase m-0">PEMERINTAH KOTA CILEGON</h3>
                <h2 className="text-lg font-extrabold tracking-wider uppercase m-0">DINAS TENAGA KERJA</h2>
                <h3 className="text-base font-bold tracking-wider uppercase m-0">UPTD LATIHAN KERJA</h3>
                <p className="text-[11px] font-sans text-slate-600 m-0 mt-1">
                  Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten 42436
                </p>
                <p className="text-[11px] font-sans text-slate-600 m-0">
                  Website: disnaker.cilegon.go.id | Email: uptd.blk@cilegon.go.id
                </p>
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-extrabold text-sm uppercase underline tracking-wide">
                  LAPORAN REALISASI ANGGARAN (LRA)
                </h4>
                <p className="text-xs text-slate-600 font-sans">
                  TAHUN ANGGARAN 2026 | PERIODE: s/d {new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-800 text-[10px] font-sans">
                  <thead>
                    <tr className="bg-slate-100 uppercase font-bold text-center">
                      <th className="border border-slate-800 p-1.5">Kode Prog</th>
                      <th className="border border-slate-800 p-1.5">Program</th>
                      <th className="border border-slate-800 p-1.5">Kode Keg</th>
                      <th className="border border-slate-800 p-1.5">Kegiatan</th>
                      <th className="border border-slate-800 p-1.5">Kode SubKeg</th>
                      <th className="border border-slate-800 p-1.5">Sub Kegiatan</th>
                      <th className="border border-slate-800 p-1.5">Kode Rek</th>
                      <th className="border border-slate-800 p-1.5">Nama Rekening</th>
                      <th className="border border-slate-800 p-1.5 text-right">Pagu (Rp)</th>
                      <th className="border border-slate-800 p-1.5 text-right">Realisasi (Rp)</th>
                      <th className="border border-slate-800 p-1.5 text-right">Sisa (Rp)</th>
                      <th className="border border-slate-800 p-1.5 text-center">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-slate-800 p-1.5 font-mono text-center">{item.kodeProgram}</td>
                        <td className="border border-slate-800 p-1.5">{item.namaProgram}</td>
                        <td className="border border-slate-800 p-1.5 font-mono text-center">{item.kodeKegiatan}</td>
                        <td className="border border-slate-800 p-1.5">{item.namaKegiatan}</td>
                        <td className="border border-slate-800 p-1.5 font-mono text-center">{item.kodeSubKegiatan}</td>
                        <td className="border border-slate-800 p-1.5">{item.namaSubKegiatan}</td>
                        <td className="border border-slate-800 p-1.5 font-mono text-center font-bold">{item.kodeRekening}</td>
                        <td className="border border-slate-800 p-1.5">{item.namaRekening}</td>
                        <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {item.pagu.toLocaleString('id-ID')}</td>
                        <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {item.realisasi.toLocaleString('id-ID')}</td>
                        <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {(item.pagu - item.realisasi).toLocaleString('id-ID')}</td>
                        <td className="border border-slate-800 p-1.5 text-center font-mono">
                          {(item.pagu > 0 ? (item.realisasi / item.pagu) * 100 : 0).toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="font-bold bg-slate-100">
                    <tr>
                      <td colSpan={8} className="border border-slate-800 p-1.5 text-right uppercase">TOTAL:</td>
                      <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {totals.pagu.toLocaleString('id-ID')}</td>
                      <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {totals.realisasi.toLocaleString('id-ID')}</td>
                      <td className="border border-slate-800 p-1.5 text-right font-mono">Rp {totals.sisa.toLocaleString('id-ID')}</td>
                      <td className="border border-slate-800 p-1.5 text-center font-mono">{totals.persen.toFixed(2)}%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Signature Blocks */}
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
