import React, { useState } from 'react';
import {
  LayoutDashboard,
  Filter,
  RefreshCw,
  Wallet,
  Coins,
  Receipt,
  PieChart,
  BarChart3,
  TrendingUp,
  Building2,
  Calendar,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign,
  FileCheck,
  Search,
  ExternalLink
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  // Filter States
  const [tahun, setTahun] = useState<string>('2026');
  const [tanggalMulai, setTanggalMulai] = useState<string>('');
  const [tanggalAkhir, setTanggalAkhir] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');
  const [selectedKegiatan, setSelectedKegiatan] = useState<string>('ALL');
  const [selectedSubKegiatan, setSelectedSubKegiatan] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Sample DB Data calculated with SUM, JOIN & GROUP BY
  const totalPaguAnggaran = 1850000000;
  const totalPaguPaket = 1820000000;
  const totalNilaiKontrak = 1745500000;
  const totalPembayaran = 1150000000;
  const totalRealisasi = totalPembayaran;
  const totalPajak = 168420000;
  const sisaAnggaran = totalPaguAnggaran - totalRealisasi;
  const persentaseRealisasi = ((totalRealisasi / totalPaguAnggaran) * 100).toFixed(2);

  // Breakdown Pajak
  const detailPajak = {
    ppn: 114000000,
    pph21: 8520000,
    pph22: 15500000,
    pph23_jasa: 20400000,
    pph23_makan: 10000000,
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleResetFilter = () => {
    setTahun('2026');
    setTanggalMulai('');
    setTanggalAkhir('');
    setSelectedProgram('ALL');
    setSelectedKegiatan('ALL');
    setSelectedSubKegiatan('ALL');
  };

  // Top Paket Realisasi List
  const topPaketList = [
    {
      no: 'PKT-2026-002',
      nama: 'Pemeliharaan Gedung Kantor & Servis AC UPTD',
      penyedia: 'CV. Jaya Bintang Konstruksi',
      paguPaket: 350000000,
      nilaiKontrak: 335000000,
      realisasi: 200000000,
      sisa: 135000000,
      persen: '59.7%',
      status: 'Termin 2/3',
    },
    {
      no: 'PKT-2026-003',
      nama: 'Sewa Server Cloud & Lisensi Software Keuangan',
      penyedia: 'PT. Technology Solusindo',
      paguPaket: 200000000,
      nilaiKontrak: 190000000,
      realisasi: 190000000,
      sisa: 0,
      persen: '100.0%',
      status: 'Lunas 100%',
    },
    {
      no: 'PKT-2026-001',
      nama: 'Pengadaan Alat Tulis Kantor & Bahan Cetak UPTD',
      penyedia: 'CV. Utama Mandiri',
      paguPaket: 150000000,
      nilaiKontrak: 142500000,
      realisasi: 142500000,
      sisa: 0,
      persen: '100.0%',
      status: 'Lunas 100%',
    },
    {
      no: 'PKT-2026-004',
      nama: 'Jasa Kebersihan & Petugas Keamanan Kantor',
      penyedia: 'PT. Sejahtera Guard Service',
      paguPaket: 280000000,
      nilaiKontrak: 268000000,
      realisasi: 134000000,
      sisa: 134000000,
      persen: '50.0%',
      status: 'Termin 1/2',
    },
    {
      no: 'PKT-2026-005',
      nama: 'Penyediaan Makan Minum Rapat & Tamu UPTD',
      penyedia: 'CV. Berkah Catering',
      paguPaket: 120000000,
      nilaiKontrak: 115000000,
      realisasi: 115000000,
      sisa: 0,
      persen: '100.0%',
      status: 'Lunas 100%',
    },
  ];

  const filteredPaket = topPaketList.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.no.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.penyedia.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner & Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              TAHAP 7: DASHBOARD KEUANGAN
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
              Live DB Aggregation
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-indigo-600" />
            Dashboard Eksekutif Anggaran & Realisasi (TA 2026)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitoring real-time total pagu, realisasi pembayaran, potongan pajak, sisa kas anggaran & grafik visualisasi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 shadow-sm transition-all ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
            Refresh Data
          </button>
          <div className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 text-xs font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            PDO Queries Optimized
          </div>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-slate-800">Filter Parameter Dashboard</h3>
          </div>
          <button
            onClick={handleResetFilter}
            className="text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tahun Anggaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="2026">2026 (Aktif)</option>
              <option value="2025">2025</option>
              <option value="ALL">Semua Tahun</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tanggal Mulai</label>
            <input
              type="date"
              value={tanggalMulai}
              onChange={(e) => setTanggalMulai(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Tanggal Akhir</label>
            <input
              type="date"
              value={tanggalAkhir}
              onChange={(e) => setTanggalAkhir(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Program</label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="ALL">Semua Program (3)</option>
              <option value="PRG-001">Program Dukungan Manajemen UPTD</option>
              <option value="PRG-002">Program Pengelolaan Keuangan & Aset</option>
              <option value="PRG-003">Program Layanan Teknis Operasional UPTD</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Kegiatan</label>
            <select
              value={selectedKegiatan}
              onChange={(e) => setSelectedKegiatan(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="ALL">Semua Kegiatan (4)</option>
              <option value="KGT-001">Kegiatan Operasional Kantor</option>
              <option value="KGT-002">Kegiatan Pemeliharaan Sarana</option>
              <option value="KGT-003">Kegiatan Penatausahaan Keuangan</option>
              <option value="KGT-004">Kegiatan Pelayanan Publik UPTD</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sub-Kegiatan</label>
            <select
              value={selectedSubKegiatan}
              onChange={(e) => setSelectedSubKegiatan(e.target.value)}
              className="w-full text-xs rounded-xl border-slate-300 bg-slate-50/50 p-2 border focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            >
              <option value="ALL">Semua Sub-Kegiatan (5)</option>
              <option value="SUB-001">Pengadaan ATK & Cetakan</option>
              <option value="SUB-002">Honorarium Pengelola Keuangan</option>
              <option value="SUB-003">Pemeliharaan Gedung & AC</option>
              <option value="SUB-004">Jasa Kebersihan & Keamanan</option>
              <option value="SUB-005">Pengadaan Komputer & Server</option>
            </select>
          </div>
        </div>
      </div>

      {/* 8 CARDS MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Pagu Anggaran */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">1. Total Pagu Anggaran</span>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalPaguAnggaran)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Anggaran Induk UPTD</span>
            <span className="text-indigo-600 font-medium">100% Pagu</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600"></div>
        </div>

        {/* Card 2: Total Pagu Paket */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">2. Total Pagu Paket</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalPaguPaket)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Alokasi 5 Paket Pekerjaan</span>
            <span className="text-blue-600 font-medium">98.38% Alokasi</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"></div>
        </div>

        {/* Card 3: Total Nilai Kontrak */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-sky-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">3. Total Nilai Kontrak</span>
            <div className="p-2 bg-sky-50 text-sky-600 rounded-xl">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalNilaiKontrak)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Efisiensi Pengadaan</span>
            <span className="text-sky-600 font-medium">Hemat Rp 74.5 Jt</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-600"></div>
        </div>

        {/* Card 4: Total Pembayaran */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">4. Total Pembayaran (SP2D)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalPembayaran)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Kas Terbayarkan</span>
            <span className="text-emerald-600 font-medium">65.88% Kontrak</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600"></div>
        </div>

        {/* Card 5: Total Realisasi */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-teal-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">5. Total Realisasi Keuangan</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalRealisasi)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Capaian Fisik & Keuangan</span>
            <span className="text-teal-600 font-medium">Valid BAPSTHP</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-600"></div>
        </div>

        {/* Card 6: Total Pajak */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-rose-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">6. Total Potongan Pajak</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(totalPajak)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>PPN 11%, PPh 21, 22, 23</span>
            <span className="text-rose-600 font-medium">Setor Kas Negara</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-rose-600"></div>
        </div>

        {/* Card 7: Sisa Anggaran */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">7. Sisa Anggaran Kas</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-bold text-slate-900 tracking-tight font-mono">
            {formatRupiah(sisaAnggaran)}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
            <span>Sisa Pagu Siap Dicairkan</span>
            <span className="text-amber-600 font-medium">37.84% Sisa</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500"></div>
        </div>

        {/* Card 8: Persentase Realisasi */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-violet-300 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">8. Persentase Realisasi</span>
            <div className="p-2 bg-violet-50 text-violet-600 rounded-xl">
              <PieChart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 tracking-tight font-mono flex items-baseline gap-1">
            {persentaseRealisasi}%
          </div>
          <div className="mt-2">
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${persentaseRealisasi}%` }}
              ></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-600"></div>
        </div>
      </div>

      {/* 9 CHARTS VISUALIZATION GRID */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            Visualisasi Grafik Kinerja Anggaran & Realisasi (9 Visualizers)
          </h3>
          <span className="text-xs text-slate-500">Chart.js Responsive Standard</span>
        </div>

        {/* Row 1: Pagu vs Realisasi & Realisasi Bulanan */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart 1: Pagu vs Realisasi */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                1. Chart Pagu vs Realisasi Overview
              </h4>
              <span className="text-[11px] px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md font-medium">
                Sisa: {formatRupiah(sisaAnggaran)}
              </span>
            </div>
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Pagu Anggaran Induk</span>
                  <span className="font-mono">{formatRupiah(totalPaguAnggaran)}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-lg" style={{ width: '100%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Total Pagu Paket</span>
                  <span className="font-mono">{formatRupiah(totalPaguPaket)}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-lg" style={{ width: '98.3%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Nilai Kontrak Terikat</span>
                  <span className="font-mono">{formatRupiah(totalNilaiKontrak)}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden">
                  <div className="bg-sky-500 h-full rounded-lg" style={{ width: '94.3%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <span>Realisasi Pembayaran (SP2D)</span>
                  <span className="font-mono text-emerald-600 font-bold">{formatRupiah(totalRealisasi)}</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-lg overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-lg" style={{ width: `${persentaseRealisasi}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 9: Realisasi Bulanan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                9. Chart Tren Realisasi Bulanan (Jan - Des)
              </h4>
              <span className="text-[11px] px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-medium">
                Puncak: Mei (160 Jt)
              </span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 h-40 items-end pt-4 pb-2 border-b border-slate-100">
              {[
                { m: 'Jan', val: 85, tax: 12 },
                { m: 'Feb', val: 120, tax: 17 },
                { m: 'Mar', val: 145, tax: 21 },
                { m: 'Apr', val: 110, tax: 16 },
                { m: 'Mei', val: 160, tax: 23 },
                { m: 'Jun', val: 130, tax: 19 },
                { m: 'Jul', val: 150, tax: 22 },
                { m: 'Agu', val: 150, tax: 22 },
                { m: 'Sep', val: 100, tax: 14 },
                { m: 'Okt', val: 0, tax: 0 },
                { m: 'Nov', val: 0, tax: 0 },
                { m: 'Des', val: 0, tax: 0 },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1 group relative">
                  <div className="w-full bg-slate-100 h-28 rounded-t flex flex-col justify-end overflow-hidden">
                    <div
                      className="bg-emerald-500 w-full transition-all group-hover:bg-emerald-600"
                      style={{ height: `${(item.val / 160) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500">{item.m}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-emerald-500 rounded"></span>
                <span>Realisasi Pembayaran</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-rose-500 rounded"></span>
                <span>Potongan Pajak</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Program, Kegiatan, Sub-Kegiatan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart 2: Realisasi Program */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              2. Realisasi Per Program
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">PRG-001 Dukungan Manajemen</span>
                  <span className="font-mono text-indigo-600 font-bold">Rp 530 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full rounded-full" style={{ width: '62.3%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">PRG-002 Pengelolaan Keuangan</span>
                  <span className="font-mono text-indigo-600 font-bold">Rp 310 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full rounded-full" style={{ width: '62.0%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">PRG-003 Layanan Teknis UPTD</span>
                  <span className="font-mono text-indigo-600 font-bold">Rp 310 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-400 h-full rounded-full" style={{ width: '62.0%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 3: Realisasi Kegiatan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              3. Realisasi Per Kegiatan
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">KGT-001 Operasional Kantor</span>
                  <span className="font-mono text-blue-600 font-bold">Rp 420 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">KGT-002 Pemeliharaan Sarana</span>
                  <span className="font-mono text-blue-600 font-bold">Rp 260 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-slate-700">KGT-003 Penatausahaan Keuangan</span>
                  <span className="font-mono text-blue-600 font-bold">Rp 240 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 4: Realisasi Sub-Kegiatan */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              4. Realisasi Per Sub-Kegiatan
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 truncate">Pemeliharaan Gedung & AC</span>
                <span className="font-mono font-bold text-slate-800">Rp 320 Jt</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 truncate">Jasa Kebersihan & Security</span>
                <span className="font-mono font-bold text-slate-800">Rp 250 Jt</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 truncate">Pengadaan Komputer & Server</span>
                <span className="font-mono font-bold text-slate-800">Rp 250 Jt</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-600 truncate">Pengadaan ATK & Cetakan</span>
                <span className="font-mono font-bold text-slate-800">Rp 180 Jt</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-600 truncate">Honorarium Pengelola Keuangan</span>
                <span className="font-mono font-bold text-slate-800">Rp 150 Jt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Rekening, Pagu vs Kontrak, Kontrak vs Bayar, Pajak */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Chart 5: Realisasi Rekening */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              5. Realisasi Rekening
            </h4>
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between mb-1 text-[11px] text-slate-600">
                  <span>5.1.02.01 Bahan</span>
                  <span className="font-mono font-semibold">Rp 180 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[11px] text-slate-600">
                  <span>5.1.02.02 Jasa Kantor</span>
                  <span className="font-mono font-semibold">Rp 250 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-500 h-full" style={{ width: '82%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[11px] text-slate-600">
                  <span>5.1.02.03 Pemeliharaan</span>
                  <span className="font-mono font-semibold">Rp 320 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full" style={{ width: '91%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[11px] text-slate-600">
                  <span>5.2.02.05 Komputer</span>
                  <span className="font-mono font-semibold">Rp 250 Jt</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 6: Pagu Paket vs Kontrak */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              6. Pagu Paket vs Kontrak
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-002 Gedung</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Pagu: 350Jt</span>
                  <span className="text-indigo-600 font-mono font-bold">Kontrak: 335Jt</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-004 Kebersihan</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Pagu: 280Jt</span>
                  <span className="text-indigo-600 font-mono font-bold">Kontrak: 268Jt</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-003 Server</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Pagu: 200Jt</span>
                  <span className="text-indigo-600 font-mono font-bold">Kontrak: 190Jt</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 7: Kontrak vs Pembayaran */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              7. Kontrak vs Pembayaran
            </h4>
            <div className="space-y-2 text-xs">
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-001 ATK Kantor</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Kontrak: 142.5Jt</span>
                  <span className="text-emerald-600 font-mono font-bold">Lunas 100%</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-002 Gedung</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Kontrak: 335Jt</span>
                  <span className="text-amber-600 font-mono font-bold">Dicairkan: 200Jt</span>
                </div>
              </div>
              <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-semibold text-slate-800">PKT-2026-005 Makan Minum</div>
                <div className="flex justify-between mt-1 text-[11px]">
                  <span className="text-slate-500">Kontrak: 115Jt</span>
                  <span className="text-emerald-600 font-mono font-bold">Lunas 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Chart 8: Pajak Breakdown */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              8. Rincian Pajak (Doughnut)
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  PPN 11%
                </span>
                <span className="font-mono font-bold text-slate-800">{formatRupiah(detailPajak.ppn)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  PPh 22 (1.5%)
                </span>
                <span className="font-mono font-bold text-slate-800">{formatRupiah(detailPajak.pph22)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  PPh 23 Jasa (2%)
                </span>
                <span className="font-mono font-bold text-slate-800">{formatRupiah(detailPajak.pph23_jasa)}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500"></span>
                  PPh 23 Makan (2%)
                </span>
                <span className="font-mono font-bold text-slate-800">{formatRupiah(detailPajak.pph23_makan)}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                  PPh 21
                </span>
                <span className="font-mono font-bold text-slate-800">{formatRupiah(detailPajak.pph21)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOP PAKET PEKERJAAN REALTIME TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-indigo-600" />
              Monitoring Realisasi Paket Pekerjaan & Penyedia
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Data sinkronisasi dari database `paket_pekerjaan`, `realisasi`, `pembayaran` & `pajak`
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Cari nomor paket, nama, penyedia..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 w-full sm:w-64 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">No Paket & Nama Pekerjaan</th>
                <th className="py-3 px-4">Penyedia / Rekanan</th>
                <th className="py-3 px-4 text-right">Pagu Paket</th>
                <th className="py-3 px-4 text-right">Nilai Kontrak</th>
                <th className="py-3 px-4 text-right">Realisasi (SP2D)</th>
                <th className="py-3 px-4 text-right">Sisa Kontrak</th>
                <th className="py-3 px-4 text-center">Serapan</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPaket.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800 font-mono">{item.no}</div>
                    <div className="text-slate-600 text-xs mt-0.5 line-clamp-1">{item.nama}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-800">{item.penyedia}</div>
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-700">
                    {formatRupiah(item.paguPaket)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-800 font-semibold">
                    {formatRupiah(item.nilaiKontrak)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-emerald-600 font-bold">
                    {formatRupiah(item.realisasi)}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-600">
                    {formatRupiah(item.sisa)}
                  </td>
                  <td className="py-3 px-4 text-center font-bold text-indigo-600 font-mono">
                    {item.persen}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        item.status.includes('Lunas')
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
