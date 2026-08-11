import React, { useState } from 'react';
import { 
  DollarSign, 
  Receipt, 
  Calculator, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Building2, 
  Percent, 
  CreditCard, 
  Calendar, 
  Search, 
  Plus, 
  Printer, 
  ShieldCheck, 
  FileCode, 
  Database,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Landmark,
  UserCheck
} from 'lucide-react';

interface RealisasiItem {
  id: number;
  nomor_sp: string;
  nama_paket: string;
  nama_perusahaan: string;
  nilai_kontrak: number;
  total_terbayar: number;
  sisa_kontrak: number;
  npwp: string;
  nama_bank: string;
  nomor_rekening: string;
  pemegang_rekening: string;
  nomor_bapsthp?: string;
  nomor_bapb?: string;
  tanggal_ba?: string;
  nomor_ba?: string;
}

interface PembayaranItem {
  id: number;
  realisasi_id: number;
  nomor_transaksi: string;
  tanggal_pembayaran: string;
  nilai_pembayaran: number;
  pembayaran_ke: number;
  keterangan: string;
  dpp: number;
  ppn: number;
  pph21: number;
  pph22: number;
  pph23_jasa: number;
  pph23_makan: number;
  total_pajak: number;
  nilai_bersih: number;
  nama_paket: string;
  nomor_sp: string;
  nama_perusahaan: string;
  nama_bank: string;
  nomor_rekening: string;
}

export const PembayaranPajakView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'input' | 'list' | 'simulator' | 'code'>('input');
  
  // Seed Mock Data Realisasi
  const [realisasiList, setRealisasiList] = useState<RealisasiItem[]>([
    {
      id: 1,
      nomor_sp: 'SP/UPTD-PEL/001/III/2026',
      nama_paket: 'Pengadaan Bahan & Konsumsi Pelatihan Las Berbasis Kompetensi Batch 1',
      nama_perusahaan: 'CV Bintang Catering Nusantara',
      nilai_kontrak: 120000000,
      total_terbayar: 60000000,
      sisa_kontrak: 60000000,
      npwp: '03.456.789.1-403.000',
      nama_bank: 'Bank BRI',
      nomor_rekening: '011201009876504',
      pemegang_rekening: 'CV BINTANG CATERING NUSANTARA',
      nomor_bapsthp: 'BAPSTHP/001/IV/2026',
      nomor_bapb: 'BAPB/001/IV/2026',
      tanggal_ba: '2026-04-02',
      nomor_ba: 'BA-PEMB/001/IV/2026'
    },
    {
      id: 2,
      nomor_sp: 'SP/UPTD-PEL/002/II/2026',
      nama_paket: 'Pengadaan Komputer Laptop Workshop Komputer UPTD',
      nama_perusahaan: 'PT Mitra Teknologi Utama',
      nilai_kontrak: 82500000,
      total_terbayar: 82500000,
      sisa_kontrak: 0,
      npwp: '01.234.567.8-401.000',
      nama_bank: 'Bank BJB',
      nomor_rekening: '0089123456789',
      pemegang_rekening: 'PT MITRA TEKNOLOGI UTAMA',
      nomor_bapsthp: 'BAPSTHP/002/III/2026',
      nomor_bapb: 'BAPB/002/III/2026',
      tanggal_ba: '2026-03-01',
      nomor_ba: 'BA-PEMB/002/III/2026'
    },
    {
      id: 3,
      nomor_sp: 'SP/UPTD-PEL/003/IV/2026',
      nama_paket: 'Pemeliharaan Rutin Mesin Bubut dan Las Workshop Otomotif',
      nama_perusahaan: 'PT Servisindo Presisi Teknik',
      nilai_kontrak: 42000000,
      total_terbayar: 0,
      sisa_kontrak: 42000000,
      npwp: '04.111.222.3-404.000',
      nama_bank: 'Bank BCA',
      nomor_rekening: '8830192837',
      pemegang_rekening: 'PT SERVISINDO PRESISE TEKNIK',
      nomor_bapsthp: 'BAPSTHP/003/V/2026',
      nomor_bapb: 'BAPB/003/V/2026',
      tanggal_ba: '2026-05-01',
      nomor_ba: 'BA-PEMB/003/V/2026'
    }
  ]);

  // Seed Mock Data Pembayaran
  const [pembayaranList, setPembayaranList] = useState<PembayaranItem[]>([
    {
      id: 1,
      realisasi_id: 1,
      nomor_transaksi: 'TRX-2026-04-001',
      tanggal_pembayaran: '2026-04-05',
      nilai_pembayaran: 60000000,
      pembayaran_ke: 1,
      keterangan: 'Pembayaran Termin 1 (50%) Pekerjaan Pelatihan Las Batch 1',
      dpp: 54054054,
      ppn: 5945946,
      pph21: 0,
      pph22: 0,
      pph23_jasa: 0,
      pph23_makan: 1200000,
      total_pajak: 7145946,
      nilai_bersih: 52854054,
      nama_paket: 'Pengadaan Bahan & Konsumsi Pelatihan Las Berbasis Kompetensi Batch 1',
      nomor_sp: 'SP/UPTD-PEL/001/III/2026',
      nama_perusahaan: 'CV Bintang Catering Nusantara',
      nama_bank: 'Bank BRI',
      nomor_rekening: '011201009876504'
    },
    {
      id: 2,
      realisasi_id: 2,
      nomor_transaksi: 'TRX-2026-03-012',
      tanggal_pembayaran: '2026-03-05',
      nilai_pembayaran: 82500000,
      pembayaran_ke: 1,
      keterangan: 'Pembayaran Lunas 100% Pengadaan Laptop Workshop',
      dpp: 74324324,
      ppn: 8175676,
      pph21: 0,
      pph22: 1114865,
      pph23_jasa: 0,
      pph23_makan: 0,
      total_pajak: 9290541,
      nilai_bersih: 73209459,
      nama_paket: 'Pengadaan Komputer Laptop Workshop Komputer UPTD',
      nomor_sp: 'SP/UPTD-PEL/002/II/2026',
      nama_perusahaan: 'PT Mitra Teknologi Utama',
      nama_bank: 'Bank BJB',
      nomor_rekening: '0089123456789'
    }
  ]);

  // Form State
  const [selectedRealisasiId, setSelectedRealisasiId] = useState<number>(1);
  const [nomorTrx, setNomorTrx] = useState<string>('TRX-2026-08-003');
  const [tanggalPembayaran, setTanggalPembayaran] = useState<string>('2026-08-11');
  const [nilaiPembayaran, setNilaiPembayaran] = useState<number>(30000000);
  const [keterangan, setKeterangan] = useState<string>('Pembayaran Termin 2 (Sisa 50%) Pekerjaan Pelatihan Las Batch 1');
  
  // Tax Options
  const [isPpn, setIsPpn] = useState<boolean>(true);
  const [isPph22, setIsPph22] = useState<boolean>(false);
  const [isPph23Jasa, setIsPph23Jasa] = useState<boolean>(false);
  const [isPph23Makan, setIsPph23Makan] = useState<boolean>(true);
  const [pph21Manual, setPph21Manual] = useState<number>(0);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReceipt, setSelectedReceipt] = useState<PembayaranItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Selected Realisasi Details
  const selectedRealisasi = realisasiList.find(r => r.id === selectedRealisasiId) || realisasiList[0];

  // Realtime Tax Calculations
  const calculateTaxes = (nilai: number) => {
    if (nilai <= 0) return { dpp: 0, ppn: 0, pph21: 0, pph22: 0, pph23_jasa: 0, pph23_makan: 0, total_pajak: 0, nilai_bersih: 0 };
    
    const dpp = Math.round(nilai / 1.11);
    const ppnVal = isPpn ? Math.round((nilai / 1.11) * 0.11) : 0;
    const pph22Val = isPph22 ? Math.round((nilai / 1.11) * 0.015) : 0;
    const pph23JasaVal = isPph23Jasa ? Math.round((nilai / 1.11) * 0.02) : 0;
    const pph23MakanVal = isPph23Makan ? Math.round(nilai * 0.02) : 0;
    const pph21Val = pph21Manual > 0 ? pph21Manual : 0;

    const totalPajak = ppnVal + pph21Val + pph22Val + pph23JasaVal + pph23MakanVal;
    const nilaiBersih = nilai - totalPajak;

    return {
      dpp,
      ppn: ppnVal,
      pph21: pph21Val,
      pph22: pph22Val,
      pph23_jasa: pph23JasaVal,
      pph23_makan: pph23MakanVal,
      total_pajak: totalPajak,
      nilai_bersih: nilaiBersih
    };
  };

  const currentTaxes = calculateTaxes(nilaiPembayaran);

  // Handle Submit Form Pembayaran
  const handleSubmitPembayaran = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    if (!selectedRealisasi) {
      setErrorMessage("Silakan pilih Surat Pesanan Realisasi terlebih dahulu!");
      return;
    }

    if (nilaiPembayaran <= 0) {
      setErrorMessage("Nilai pembayaran harus lebih besar dari Rp 0!");
      return;
    }

    if (nilaiPembayaran > selectedRealisasi.sisa_kontrak) {
      setErrorMessage(`Validasi Keuangan Gagal: Nilai Pembayaran (Rp ${nilaiPembayaran.toLocaleString('id-ID')}) melebihi Sisa Kontrak Pekerjaan (Rp ${selectedRealisasi.sisa_kontrak.toLocaleString('id-ID')})!`);
      return;
    }

    // Process Payment
    const terminKe = (pembayaranList.filter(p => p.realisasi_id === selectedRealisasi.id).length) + 1;
    
    const newPayment: PembayaranItem = {
      id: Date.now(),
      realisasi_id: selectedRealisasi.id,
      nomor_transaksi: nomorTrx,
      tanggal_pembayaran: tanggalPembayaran,
      nilai_pembayaran: nilaiPembayaran,
      pembayaran_ke: terminKe,
      keterangan: keterangan || `Pembayaran Termin ${terminKe}`,
      dpp: currentTaxes.dpp,
      ppn: currentTaxes.ppn,
      pph21: currentTaxes.pph21,
      pph22: currentTaxes.pph22,
      pph23_jasa: currentTaxes.pph23_jasa,
      pph23_makan: currentTaxes.pph23_makan,
      total_pajak: currentTaxes.total_pajak,
      nilai_bersih: currentTaxes.nilai_bersih,
      nama_paket: selectedRealisasi.nama_paket,
      nomor_sp: selectedRealisasi.nomor_sp,
      nama_perusahaan: selectedRealisasi.nama_perusahaan,
      nama_bank: selectedRealisasi.nama_bank,
      nomor_rekening: selectedRealisasi.nomor_rekening
    };

    // Update Pembayaran List
    setPembayaranList([newPayment, ...pembayaranList]);

    // Update Realisasi Sisa Kontrak & Total Terbayar
    setRealisasiList(prev => prev.map(r => {
      if (r.id === selectedRealisasi.id) {
        const newTerbayar = r.total_terbayar + nilaiPembayaran;
        const newSisa = Math.max(0, r.nilai_kontrak - newTerbayar);
        return {
          ...r,
          total_terbayar: newTerbayar,
          sisa_kontrak: newSisa
        };
      }
      return r;
    }));

    setSuccessMessage(`Pembayaran TRX ${nomorTrx} (Termin ${terminKe}) sebesar Rp ${nilaiPembayaran.toLocaleString('id-ID')} dengan Total Pajak Rp ${currentTaxes.total_pajak.toLocaleString('id-ID')} berhasil diproses dengan PDO Transaction!`);
    
    // Auto reset transaction number for next entry
    setNomorTrx(`TRX-2026-08-00${pembayaranList.length + 2}`);
  };

  const filteredPembayaran = pembayaranList.filter(p => 
    p.nomor_transaksi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nama_paket.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nama_perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.nomor_sp.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPembayaranAll = pembayaranList.reduce((acc, curr) => acc + curr.nilai_pembayaran, 0);
  const totalPajakAll = pembayaranList.reduce((acc, curr) => acc + curr.total_pajak, 0);
  const totalBersihAll = pembayaranList.reduce((acc, curr) => acc + curr.nilai_bersih, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Calculator className="w-96 h-96" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
                Tahap 6 Selesai
              </span>
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold rounded-full">
                PDO Transaction & Auto Tax Calculator
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Modul Pembayaran & Perhitungan Pajak (Tahap 6)
            </h1>
            <p className="text-emerald-200/80 text-sm mt-1 max-w-2xl">
              Sistem pencatatan pencairan termin pembayaran pekerjaan, validasi keuangan sisa kontrak, dan kalkulasi otomatis potongan pajak PPN (11%), PPh22, PPh23, dan PPh21.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab('input')}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                activeSubTab === 'input' 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Plus className="w-4 h-4" />
              Input Pembayaran
            </button>
            <button
              onClick={() => setActiveSubTab('list')}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 transition-all ${
                activeSubTab === 'list' 
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Receipt className="w-4 h-4" />
              Daftar Transaksi ({pembayaranList.length})
            </button>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-emerald-700/50">
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/40">
            <p className="text-xs text-emerald-300">Total Pembayaran Bruto</p>
            <p className="text-lg font-bold text-white mt-0.5">
              Rp {totalPembayaranAll.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/40">
            <p className="text-xs text-emerald-300">Total Potongan Pajak</p>
            <p className="text-lg font-bold text-amber-300 mt-0.5">
              Rp {totalPajakAll.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/40">
            <p className="text-xs text-emerald-300">Total Nilai Bersih (Netto)</p>
            <p className="text-lg font-bold text-emerald-400 mt-0.5">
              Rp {totalBersihAll.toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-emerald-950/40 rounded-xl p-3 border border-emerald-700/40">
            <p className="text-xs text-emerald-300">Status Transaksi</p>
            <p className="text-sm font-semibold text-emerald-200 mt-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Realtime Verified
            </p>
          </div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex border-b border-slate-200 space-x-4">
        <button
          onClick={() => setActiveSubTab('input')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === 'input' 
              ? 'border-emerald-600 text-emerald-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Form Input & Tax Calculator
        </button>
        <button
          onClick={() => setActiveSubTab('list')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === 'list' 
              ? 'border-emerald-600 text-emerald-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Receipt className="w-4 h-4" />
          Daftar Kuitansi & Pajak
        </button>
        <button
          onClick={() => setActiveSubTab('simulator')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === 'simulator' 
              ? 'border-emerald-600 text-emerald-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Percent className="w-4 h-4" />
          Simulasi Rumus Pajak
        </button>
        <button
          onClick={() => setActiveSubTab('code')}
          className={`pb-3 font-semibold text-sm transition-all border-b-2 flex items-center gap-2 ${
            activeSubTab === 'code' 
              ? 'border-emerald-600 text-emerald-700' 
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCode className="w-4 h-4" />
          Kode PHP Model & Controller
        </button>
      </div>

      {/* Flash Messages */}
      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl flex items-start gap-3 shadow-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* TAB 1: FORM INPUT PEMBAYARAN & LIVE TAX CALCULATOR */}
      {activeSubTab === 'input' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Realisasi Info & Payment Input */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FileText className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-slate-800 text-base">1. Informasi Pekerjaan & SP Realisasi</h3>
              </div>

              {/* Select Realisasi Pekerjaan */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Kontrak Realisasi Pekerjaan (SP) <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedRealisasiId}
                  onChange={(e) => setSelectedRealisasiId(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white text-slate-800 font-medium text-sm"
                >
                  {realisasiList.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.nomor_sp} — {r.nama_paket} ({r.nama_perusahaan})
                    </option>
                  ))}
                </select>
              </div>

              {/* Realisasi Info Box */}
              {selectedRealisasi && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Penyedia / Pelaksana:</span>
                      <span className="font-bold text-slate-800">{selectedRealisasi.nama_perusahaan}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">NPWP:</span>
                      <span className="font-mono text-slate-800">{selectedRealisasi.npwp}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Rekening Bank:</span>
                      <span className="font-semibold text-slate-800">{selectedRealisasi.nama_bank} - {selectedRealisasi.nomor_rekening}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Atas Nama:</span>
                      <span className="font-semibold text-slate-800">{selectedRealisasi.pemegang_rekening}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200/60 text-center">
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-[11px] text-slate-500 block">Nilai Kontrak</span>
                      <span className="font-bold text-slate-800 text-xs">Rp {selectedRealisasi.nilai_kontrak.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg border border-slate-200">
                      <span className="text-[11px] text-slate-500 block">Total Terbayar</span>
                      <span className="font-bold text-blue-600 text-xs">Rp {selectedRealisasi.total_terbayar.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                      <span className="text-[11px] text-emerald-700 block font-medium">Sisa Kontrak</span>
                      <span className="font-extrabold text-emerald-700 text-sm">Rp {selectedRealisasi.sisa_kontrak.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Details Input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor Transaksi TRX <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nomorTrx}
                    onChange={(e) => setNomorTrx(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tanggal Pembayaran <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={tanggalPembayaran}
                    onChange={(e) => setTanggalPembayaran(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nilai Pembayaran Bruto (Rp) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400 font-bold text-lg">Rp</span>
                    <input
                      type="number"
                      value={nilaiPembayaran}
                      onChange={(e) => setNilaiPembayaran(Number(e.target.value))}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 font-extrabold text-xl text-emerald-700 focus:ring-2 focus:ring-emerald-500"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Maksimal pembayaran yang diperbolehkan: <strong className="text-rose-600">Rp {selectedRealisasi ? selectedRealisasi.sisa_kontrak.toLocaleString('id-ID') : 0}</strong>
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Keterangan Peruntukan Pembayaran
                  </label>
                  <textarea
                    rows={2}
                    value={keterangan}
                    onChange={(e) => setKeterangan(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-800 focus:ring-2 focus:ring-emerald-500"
                    placeholder="Contoh: Pembayaran Termin 2 (50%) Pekerjaan Pelatihan Las Batch 1"
                  />
                </div>
              </div>
            </div>

            {/* Document Berita Acara Details */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Landmark className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-800 text-base">2. Berita Acara & Kelengkapan Pencairan</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor BAPSTHP</label>
                  <input
                    type="text"
                    defaultValue={selectedRealisasi?.nomor_bapsthp || 'BAPSTHP/001/IV/2026'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor BAPB</label>
                  <input
                    type="text"
                    defaultValue={selectedRealisasi?.nomor_bapb || 'BAPB/001/IV/2026'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal BA</label>
                  <input
                    type="date"
                    defaultValue={selectedRealisasi?.tanggal_ba || '2026-04-02'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor BA Pembayaran</label>
                  <input
                    type="text"
                    defaultValue={selectedRealisasi?.nomor_ba || 'BA-PEMB/001/IV/2026'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Tax Options & Realtime Calculation Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-6 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <h3 className="font-bold text-lg">Perhitungan Pajak Realtime</h3>
                </div>
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-xs font-mono font-semibold rounded border border-amber-500/30">
                  PHP & JS Engine
                </span>
              </div>

              {/* Tax Selection Toggles */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Pilih Jenis Pemotongan Pajak:
                </p>

                <label className="flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isPpn}
                      onChange={(e) => setIsPpn(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">PPN (11%)</p>
                      <p className="text-[11px] text-slate-400">(Nilai Pembayaran / 1,11) × 11%</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    Rp {currentTaxes.ppn.toLocaleString('id-ID')}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isPph22}
                      onChange={(e) => setIsPph22(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">PPh Pasal 22 (1,5%)</p>
                      <p className="text-[11px] text-slate-400">Pengadaan Barang / Komputer</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    Rp {currentTaxes.pph22.toLocaleString('id-ID')}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isPph23Jasa}
                      onChange={(e) => setIsPph23Jasa(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">PPh Pasal 23 Jasa (2%)</p>
                      <p className="text-[11px] text-slate-400">Jasa / Servis / Pemeliharaan</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    Rp {currentTaxes.pph23_jasa.toLocaleString('id-ID')}
                  </span>
                </label>

                <label className="flex items-center justify-between p-3 bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isPph23Makan}
                      onChange={(e) => setIsPph23Makan(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 bg-slate-900 border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">PPh Pasal 23 Makan (2%)</p>
                      <p className="text-[11px] text-slate-400">Konsumsi / Katering Rapat</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-rose-400">
                    Rp {currentTaxes.pph23_makan.toLocaleString('id-ID')}
                  </span>
                </label>

                <div className="pt-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    PPh Pasal 21 Manual (Rp)
                  </label>
                  <input
                    type="number"
                    value={pph21Manual}
                    onChange={(e) => setPph21Manual(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-mono text-sm focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Tax Output Summary Box */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Dasar Pengenaan Pajak (DPP):</span>
                  <span className="font-mono text-white font-semibold">Rp {currentTaxes.dpp.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex justify-between text-xs text-slate-400">
                  <span>Total Potongan Pajak:</span>
                  <span className="font-mono text-rose-400 font-bold text-sm">
                    Rp {currentTaxes.total_pajak.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <span className="font-bold text-sm text-emerald-400">Nilai Bersih (Netto):</span>
                  <span className="font-extrabold text-xl font-mono text-emerald-400">
                    Rp {currentTaxes.nilai_bersih.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitPembayaran}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <CheckCircle2 className="w-5 h-5" />
                Simpan Transaksi Pembayaran & Pajak
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAFTAR TRANSAKSI PEMBAYARAN & PAJAK */}
      {activeSubTab === 'list' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Header & Search */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nomor transaksi, SP, paket pekerjaan, atau nama penyedia..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">No. TRX / Tgl</th>
                  <th className="py-3.5 px-4">Paket Pekerjaan / SP</th>
                  <th className="py-3.5 px-4">Penyedia / Bank</th>
                  <th className="py-3.5 px-4 text-right">Nilai Pembayaran</th>
                  <th className="py-3.5 px-4 text-right">Total Pajak</th>
                  <th className="py-3.5 px-4 text-right">Nilai Bersih</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredPembayaran.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-emerald-700">{item.nomor_transaksi}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px] font-semibold">
                          Termin {item.pembayaran_ke}
                        </span>
                        {item.tanggal_pembayaran}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 line-clamp-1">{item.nama_paket}</div>
                      <div className="text-xs text-slate-500 font-mono">SP: {item.nomor_sp}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{item.nama_perusahaan}</div>
                      <div className="text-xs text-slate-500">{item.nama_bank} - {item.nomor_rekening}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-800">
                      Rp {item.nilai_pembayaran.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-rose-600">
                      Rp {item.total_pajak.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-emerald-600">
                      Rp {item.nilai_bersih.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedReceipt(item)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        Kuitansi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: SIMULASI RUMUS PAJAK MANDIRI */}
      {activeSubTab === 'simulator' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
            <Percent className="w-5 h-5 text-emerald-600" />
            <h3 className="font-bold text-slate-800 text-lg">Tabel & Rumus Resmi Perhitungan Pajak Dinas</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded text-[10px] font-bold">PPN 11%</span>
              <h4 className="font-bold text-slate-800 text-sm">Pajak Pertambahan Nilai</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-indigo-100 px-1.5 py-0.5 rounded font-mono text-indigo-800">(NILAI_PEMBAYARAN / 1,11) × 11%</code>
              </p>
              <p className="text-[11px] text-slate-500">Dikenakan untuk semua transaksi pengadaan barang/jasa di atas Rp 2.000.000.</p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-amber-600 text-white rounded text-[10px] font-bold">PPh22 (1.5%)</span>
              <h4 className="font-bold text-slate-800 text-sm">PPh Pasal 22 Barang</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-amber-100 px-1.5 py-0.5 rounded font-mono text-amber-800">(NILAI_PEMBAYARAN / 1,11) × 1,5%</code>
              </p>
              <p className="text-[11px] text-slate-500">Dikenakan untuk pengadaan fisik/barang inventaris, komputer, dan peralatan kantor.</p>
            </div>

            <div className="p-4 rounded-xl border border-cyan-200 bg-cyan-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-cyan-600 text-white rounded text-[10px] font-bold">PPh23 Jasa (2%)</span>
              <h4 className="font-bold text-slate-800 text-sm">PPh Pasal 23 Jasa & Pemeliharaan</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-cyan-100 px-1.5 py-0.5 rounded font-mono text-cyan-800">(NILAI_PEMBAYARAN / 1,11) × 2%</code>
              </p>
              <p className="text-[11px] text-slate-500">Dikenakan untuk jasa instruktur, pemeliharaan mesin, servis kendaraan, dan sewa.</p>
            </div>

            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold">PPh23 Makan (2%)</span>
              <h4 className="font-bold text-slate-800 text-sm">PPh Pasal 23 Konsumsi / Katering</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-rose-100 px-1.5 py-0.5 rounded font-mono text-rose-800">NILAI_PEMBAYARAN × 2%</code>
              </p>
              <p className="text-[11px] text-slate-500">Dikenakan untuk penyediaan makanan, minuman, dan catering kegiatan pelatihan.</p>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white rounded text-[10px] font-bold">PPh21 Manual</span>
              <h4 className="font-bold text-slate-800 text-sm">PPh Pasal 21 Perorangan</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono text-emerald-800">INPUT MANUAL USER</code>
              </p>
              <p className="text-[11px] text-slate-500">Dikenakan untuk pembayaran honorarium perorangan/tenaga ahli non-badan usaha.</p>
            </div>

            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
              <span className="px-2.5 py-0.5 bg-purple-600 text-white rounded text-[10px] font-bold">NILAI BERSIH</span>
              <h4 className="font-bold text-slate-800 text-sm">Pencairan Netto ke Rekening</h4>
              <p className="text-xs text-slate-600">
                Formula: <code className="bg-purple-100 px-1.5 py-0.5 rounded font-mono text-purple-800">PEMBAYARAN - TOTAL_PAJAK</code>
              </p>
              <p className="text-[11px] text-slate-500">Nominal bersih yang ditransfer oleh Bendahara Pengeluaran UPTD ke penyedia.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SOURCE CODE PHP MVC */}
      {activeSubTab === 'code' && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileCode className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base">Source Code PHP MVC (Tahap 6)</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              /app/models/PembayaranModel.php & /app/controllers/PembayaranController.php
            </span>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs overflow-x-auto text-emerald-300 space-y-2">
            <p className="text-slate-400">// Sample execution method in PembayaranModel.php</p>
            <p className="text-blue-400">public function createPembayaran($data, $taxOptions = [], $userId = null) &#123;</p>
            <p className="pl-4 text-emerald-400">$db = $this-&gt;getDb();</p>
            <p className="pl-4 text-amber-300">$db-&gt;beginTransaction(); <span className="text-slate-500">// Atomic Transaction</span></p>
            <p className="pl-4 text-slate-300">try &#123;</p>
            <p className="pl-8 text-slate-300">// 1. Save to `pembayaran` table</p>
            <p className="pl-8 text-slate-300">// 2. Calculate and save to `pajak` table (PPN, PPh21, PPh22, PPh23)</p>
            <p className="pl-8 text-slate-300">// 3. Update status `realisasi` to finished/proses</p>
            <p className="pl-8 text-slate-300">// 4. Insert entry to `audit_logs`</p>
            <p className="pl-8 text-emerald-400">$db-&gt;commit();</p>
            <p className="pl-4 text-slate-300">&#125; catch (Exception $e) &#123;</p>
            <p className="pl-8 text-rose-400">$db-&gt;rollBack();</p>
            <p className="pl-8 text-rose-400">throw $e;</p>
            <p className="pl-4 text-slate-300">&#125;</p>
            <p className="text-blue-400">&#125;</p>
          </div>
        </div>
      )}

      {/* KUITANSI MODAL PREVIEW */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-6">
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>

            {/* Header Instansi */}
            <div className="text-center border-b pb-4">
              <h4 className="font-extrabold text-slate-800 text-sm uppercase">PEMERINTAH PROVINSI BANTEN</h4>
              <h3 className="font-black text-emerald-800 text-base uppercase">DINAS TENAGA KERJA DAN TRANSMIGRASI</h3>
              <p className="text-xs text-slate-600 font-medium">UPTD PELATIHAN KERJA DANA ALOKASI APBD TAHUN 2026</p>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="font-mono font-bold bg-slate-100 px-3 py-1 rounded">
                NO: {selectedReceipt.nomor_transaksi}
              </span>
              <span className="text-slate-500 font-medium">
                Tgl: {selectedReceipt.tanggal_pembayaran}
              </span>
            </div>

            {/* Receipt Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b">
                  <tr>
                    <th className="p-3">Uraian Transaksi</th>
                    <th className="p-3 text-right">Nominal (Rp)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3 font-semibold text-slate-800">
                      Nilai Pembayaran Bruto
                      <p className="text-[11px] font-normal text-slate-500">{selectedReceipt.keterangan}</p>
                    </td>
                    <td className="p-3 text-right font-bold text-slate-800">
                      Rp {selectedReceipt.nilai_pembayaran.toLocaleString('id-ID')}
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold text-rose-700">Pajak Pertambahan Nilai (PPN 11%)</td>
                    <td className="p-3 text-right font-semibold text-rose-700">Rp {selectedReceipt.ppn.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold text-rose-700">PPh Pasal 22 (1.5%)</td>
                    <td className="p-3 text-right font-semibold text-rose-700">Rp {selectedReceipt.pph22.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold text-rose-700">PPh Pasal 23 Jasa (2%)</td>
                    <td className="p-3 text-right font-semibold text-rose-700">Rp {selectedReceipt.pph23_jasa.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold text-rose-700">PPh Pasal 23 Makan (2%)</td>
                    <td className="p-3 text-right font-semibold text-rose-700">Rp {selectedReceipt.pph23_makan.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-3 font-semibold text-rose-700">PPh Pasal 21 Manual</td>
                    <td className="p-3 text-right font-semibold text-rose-700">Rp {selectedReceipt.pph21.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-rose-50 font-bold text-rose-800">
                    <td className="p-3">TOTAL POTONGAN PAJAK</td>
                    <td className="p-3 text-right">Rp {selectedReceipt.total_pajak.toLocaleString('id-ID')}</td>
                  </tr>
                  <tr className="bg-emerald-50 font-extrabold text-emerald-800 text-sm">
                    <td className="p-3">NILAI BERSIH DITERIMA (NETTO)</td>
                    <td className="p-3 text-right">Rp {selectedReceipt.nilai_bersih.toLocaleString('id-ID')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 text-white font-medium text-xs rounded-xl flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Cetak Kuitansi
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 font-medium text-xs rounded-xl"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
