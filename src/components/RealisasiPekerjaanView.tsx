import React, { useState } from 'react';
import { 
  FileCheck2, Plus, Search, Filter, Eye, Trash2, Edit3, Save, ArrowLeft, 
  Building2, Calendar, FileText, CheckCircle2, Clock, AlertTriangle, 
  DollarSign, Hash, Layers, ShieldAlert, Sparkles, Check, ArrowRight
} from 'lucide-react';

interface MultiRekeningItem {
  id: number;
  kode_rekening: string;
  nama_rekening: string;
  pagu_rekening: number;
  nilai_realisasi: number;
}

interface RealisasiItem {
  id: number;
  nomor_sp: string;
  tanggal_sp: string;
  lama_pekerjaan: number;
  tanggal_mulai: string;
  tanggal_selesai: string;
  paket_id: number;
  nama_paket: string;
  nomor_paket: string;
  pagu_paket: number;
  program: string;
  kegiatan: string;
  sub_kegiatan: string;
  kode_sub_kegiatan: string;
  penyedia_id: number;
  nama_perusahaan: string;
  nama_penyedia: string;
  npwp: string;
  nama_bank: string;
  nomor_rekening: string;
  pemegang_rekening: string;
  alamat_penyedia: string;
  nilai_kontrak: number;
  nomor_bapsthp: string;
  nomor_bapb: string;
  tanggal_ba: string;
  nomor_ba: string;
  status: 'proses' | 'selesai' | 'draft';
  rekening_list: MultiRekeningItem[];
  total_terbayar: number;
  pembayaran_count: number;
}

// Sample initial data matching Tahap 1-4
const initialRealisasiList: RealisasiItem[] = [
  {
    id: 1,
    nomor_sp: 'REAL/2026/00001',
    tanggal_sp: '2026-02-10',
    lama_pekerjaan: 45,
    tanggal_mulai: '2026-02-10',
    tanggal_selesai: '2026-03-27',
    paket_id: 101,
    nomor_paket: 'PKT-2026-001',
    nama_paket: 'Pengadaan Server HP ProLiant & Lisensi Database OS',
    pagu_paket: 250000000,
    program: 'Program Dukungan Manajemen & Teknologi Informasi',
    kegiatan: 'Pengadaan & Pemeliharaan Sarana Prasarana IT UPTD',
    sub_kegiatan: 'Pengadaan Hardware & Server Jaringan Dinas',
    kode_sub_kegiatan: '1.01.02.2.01.01',
    penyedia_id: 1,
    nama_perusahaan: 'PT Bintang Buana Komputer',
    nama_penyedia: 'H. Ahmad Subardjo, M.Kom',
    npwp: '01.345.678.9-402.000',
    nama_bank: 'Bank BJB Cabang Utama',
    nomor_rekening: '0012345678901',
    pemegang_rekening: 'PT Bintang Buana Komputer',
    alamat_penyedia: 'Jl. Ahmad Yani No. 88, Cilegon, Banten',
    nilai_kontrak: 245000000,
    nomor_bapsthp: 'BAPSTHP/2026/001',
    nomor_bapb: 'BAPB/2026/001',
    tanggal_ba: '2026-03-28',
    nomor_ba: 'BA-BAYAR/2026/001',
    status: 'proses',
    total_terbayar: 122500000,
    pembayaran_count: 1,
    rekening_list: [
      { id: 10, kode_rekening: '5.1.02.02.01.0001', nama_rekening: 'Belanja Modal Peralatan Komputer & Server', pagu_rekening: 180000000, nilai_realisasi: 175000000 },
      { id: 11, kode_rekening: '5.1.02.02.01.0002', nama_rekening: 'Belanja Modal Lisensi Perangkat Lunak', pagu_rekening: 70000000, nilai_realisasi: 70000000 }
    ]
  },
  {
    id: 2,
    nomor_sp: 'REAL/2026/00002',
    tanggal_sp: '2026-02-15',
    lama_pekerjaan: 30,
    tanggal_mulai: '2026-02-15',
    tanggal_selesai: '2026-03-17',
    paket_id: 102,
    nomor_paket: 'PKT-2026-002',
    nama_paket: 'Pemeliharaan Gedung & Instalasi Kelistrikan UPTD',
    pagu_paket: 150000000,
    program: 'Program Peningkatan Pelayanan Umum Dinas',
    kegiatan: 'Pemeliharaan Sarana Gedung Kantor UPTD',
    sub_kegiatan: 'Rehabilitasi Sedang Gedung & Kelistrikan',
    kode_sub_kegiatan: '1.01.02.2.02.03',
    penyedia_id: 2,
    nama_perusahaan: 'CV Karya Utama Konstruksi',
    nama_penyedia: 'Ir. H. Hendra Wijaya',
    npwp: '02.987.654.3-401.000',
    nama_bank: 'Bank BRI KCP Cilegon',
    nomor_rekening: '012301000999301',
    pemegang_rekening: 'CV Karya Utama Konstruksi',
    alamat_penyedia: 'Kawasan Industri Cilegon Blok C No. 12',
    nilai_kontrak: 148500000,
    nomor_bapsthp: 'BAPSTHP/2026/002',
    nomor_bapb: 'BAPB/2026/002',
    tanggal_ba: '2026-03-18',
    nomor_ba: 'BA-BAYAR/2026/002',
    status: 'selesai',
    total_terbayar: 148500000,
    pembayaran_count: 2,
    rekening_list: [
      { id: 20, kode_rekening: '5.1.02.03.01.0005', nama_rekening: 'Belanja Pemeliharaan Bangunan Gedung', pagu_rekening: 100000000, nilai_realisasi: 98500000 },
      { id: 21, kode_rekening: '5.1.02.03.01.0008', nama_rekening: 'Belanja Bahan Pemeliharaan Instalasi Listrik', pagu_rekening: 50000000, nilai_realisasi: 50000000 }
    ]
  }
];

// Sample Available Master Pakets for Auto-Fill
const masterPaketOptions = [
  {
    id: 101,
    nomor_paket: 'PKT-2026-001',
    nama_paket: 'Pengadaan Server HP ProLiant & Lisensi Database OS',
    pagu_paket: 250000000,
    program: 'Program Dukungan Manajemen & Teknologi Informasi',
    kegiatan: 'Pengadaan & Pemeliharaan Sarana Prasarana IT UPTD',
    sub_kegiatan: 'Pengadaan Hardware & Server Jaringan Dinas',
    kode_sub_kegiatan: '1.01.02.2.01.01',
    rekening_list: [
      { id: 10, kode_rekening: '5.1.02.02.01.0001', nama_rekening: 'Belanja Modal Peralatan Komputer & Server', pagu_rekening: 180000000, nilai_realisasi: 180000000 },
      { id: 11, kode_rekening: '5.1.02.02.01.0002', nama_rekening: 'Belanja Modal Lisensi Perangkat Lunak', pagu_rekening: 70000000, nilai_realisasi: 70000000 }
    ]
  },
  {
    id: 102,
    nomor_paket: 'PKT-2026-002',
    nama_paket: 'Pemeliharaan Gedung & Instalasi Kelistrikan UPTD',
    pagu_paket: 150000000,
    program: 'Program Peningkatan Pelayanan Umum Dinas',
    kegiatan: 'Pemeliharaan Sarana Gedung Kantor UPTD',
    sub_kegiatan: 'Rehabilitasi Sedang Gedung & Kelistrikan',
    kode_sub_kegiatan: '1.01.02.2.02.03',
    rekening_list: [
      { id: 20, kode_rekening: '5.1.02.03.01.0005', nama_rekening: 'Belanja Pemeliharaan Bangunan Gedung', pagu_rekening: 100000000, nilai_realisasi: 100000000 },
      { id: 21, kode_rekening: '5.1.02.03.01.0008', nama_rekening: 'Belanja Bahan Pemeliharaan Instalasi Listrik', pagu_rekening: 50000000, nilai_realisasi: 50000000 }
    ]
  },
  {
    id: 103,
    nomor_paket: 'PKT-2026-003',
    nama_paket: 'Pengadaan ATK & Bahan Cetak Kantor UPTD Semester I',
    pagu_paket: 85000000,
    program: 'Program Dukungan Operasional Perkantoran',
    kegiatan: 'Penyediaan Komponen Instalasi & Operasional',
    sub_kegiatan: 'Penyediaan ATK, Bahan Cetak & Penggandaan',
    kode_sub_kegiatan: '1.01.02.2.03.01',
    rekening_list: [
      { id: 30, kode_rekening: '5.1.02.01.01.0024', nama_rekening: 'Belanja Alat Tulis Kantor (ATK)', pagu_rekening: 50000000, nilai_realisasi: 50000000 },
      { id: 31, kode_rekening: '5.1.02.01.01.0025', nama_rekening: 'Belanja Barang Cetak dan Penggandaan', pagu_rekening: 35000000, nilai_realisasi: 35000000 }
    ]
  }
];

// Sample Master Penyedia Options
const masterPenyediaOptions = [
  {
    id: 1,
    nama_perusahaan: 'PT Bintang Buana Komputer',
    nama_penyedia: 'H. Ahmad Subardjo, M.Kom',
    npwp: '01.345.678.9-402.000',
    nama_bank: 'Bank BJB Cabang Utama',
    nomor_rekening: '0012345678901',
    pemegang_rekening: 'PT Bintang Buana Komputer',
    alamat_penyedia: 'Jl. Ahmad Yani No. 88, Cilegon, Banten'
  },
  {
    id: 2,
    nama_perusahaan: 'CV Karya Utama Konstruksi',
    nama_penyedia: 'Ir. H. Hendra Wijaya',
    npwp: '02.987.654.3-401.000',
    nama_bank: 'Bank BRI KCP Cilegon',
    nomor_rekening: '012301000999301',
    pemegang_rekening: 'CV Karya Utama Konstruksi',
    alamat_penyedia: 'Kawasan Industri Cilegon Blok C No. 12'
  },
  {
    id: 3,
    nama_perusahaan: 'PT Sinar Grafindo Mandiri',
    nama_penyedia: 'Dra. Hj. Ratna Sari',
    npwp: '03.111.222.3-402.000',
    nama_bank: 'Bank Mandiri Cabang Cilegon',
    nomor_rekening: '1630009876543',
    pemegang_rekening: 'PT Sinar Grafindo Mandiri',
    alamat_penyedia: 'Jl. Raya Merak Km 4.5, Cilegon'
  }
];

export const RealisasiPekerjaanView: React.FC = () => {
  const [realisasiList, setRealisasiList] = useState<RealisasiItem[]>(initialRealisasiList);
  const [viewMode, setViewMode] = useState<'index' | 'create' | 'detail'>('index');
  const [selectedItem, setSelectedItem] = useState<RealisasiItem | null>(null);
  
  // Search & Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Form State for Create/Edit
  const [selectedPaketId, setSelectedPaketId] = useState<number | ''>('');
  const [selectedPenyediaId, setSelectedPenyediaId] = useState<number | ''>('');
  const [nomorSp, setNomorSp] = useState('REAL/2026/00003');
  const [tanggalSp, setTanggalSp] = useState('2026-08-11');
  const [lamaPekerjaan, setLamaPekerjaan] = useState(30);
  const [tanggalMulai, setTanggalMulai] = useState('2026-08-11');
  const [tanggalSelesai, setTanggalSelesai] = useState('2026-09-10');
  const [nilaiKontrak, setNilaiKontrak] = useState<number>(0);
  const [nomorBapsthp, setNomorBapsthp] = useState('');
  const [nomorBapb, setNomorBapb] = useState('');
  const [tanggalBa, setTanggalBa] = useState('');
  const [nomorBa, setNomorBa] = useState('');
  const [status, setStatus] = useState<'proses' | 'selesai' | 'draft'>('proses');

  // Auto-filled data states
  const [activePaket, setActivePaket] = useState<typeof masterPaketOptions[0] | null>(null);
  const [activePenyedia, setActivePenyedia] = useState<typeof masterPenyediaOptions[0] | null>(null);
  const [rekeningAllocations, setRekeningAllocations] = useState<MultiRekeningItem[]>([]);

  // Feedback Notification State
  const [alert, setAlert] = useState<{ type: 'success' | 'danger'; msg: string } | null>(null);

  // Auto Fill Handler when selecting Paket Pekerjaan
  const handlePaketChange = (paketIdNum: number) => {
    setSelectedPaketId(paketIdNum);
    const pkt = masterPaketOptions.find(p => p.id === paketIdNum);
    if (pkt) {
      setActivePaket(pkt);
      setNilaiKontrak(pkt.pagu_paket);
      setRekeningAllocations(pkt.rekening_list.map(r => ({ ...r })));
    } else {
      setActivePaket(null);
      setRekeningAllocations([]);
      setNilaiKontrak(0);
    }
  };

  // Auto Fill Handler when selecting Penyedia
  const handlePenyediaChange = (penyediaIdNum: number) => {
    setSelectedPenyediaId(penyediaIdNum);
    const py = masterPenyediaOptions.find(p => p.id === penyediaIdNum);
    if (py) {
      setActivePenyedia(py);
    } else {
      setActivePenyedia(null);
    }
  };

  // Recalculate end date based on start date & duration
  const handleLamaPekerjaanChange = (val: number) => {
    setLamaPekerjaan(val);
    if (tanggalMulai && val > 0) {
      const dt = new Date(tanggalMulai);
      dt.setDate(dt.getDate() + val);
      setTanggalSelesai(dt.toISOString().split('T')[0]);
    }
  };

  const handleTanggalMulaiChange = (dtStr: string) => {
    setTanggalMulai(dtStr);
    if (dtStr && lamaPekerjaan > 0) {
      const dt = new Date(dtStr);
      dt.setDate(dt.getDate() + lamaPekerjaan);
      setTanggalSelesai(dt.toISOString().split('T')[0]);
    }
  };

  // Multi-Rekening Realisasi Input Change
  const handleRekeningValueChange = (index: number, val: number) => {
    const updated = [...rekeningAllocations];
    updated[index].nilai_realisasi = val;
    setRekeningAllocations(updated);
  };

  // Save New Realisasi
  const handleSaveRealisasi = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPaketId || !selectedPenyediaId || !activePaket || !activePenyedia) {
      setAlert({ type: 'danger', msg: 'Harap pilih Paket Pekerjaan dan Rekanan Penyedia!' });
      return;
    }

    if (nilaiKontrak > activePaket.pagu_paket) {
      setAlert({ 
        type: 'danger', 
        msg: `Validasi Keuangan Gagal: Nilai Kontrak (Rp ${nilaiKontrak.toLocaleString('id-ID')}) melebihi Pagu Paket (Rp ${activePaket.pagu_paket.toLocaleString('id-ID')})!` 
      });
      return;
    }

    const newRecord: RealisasiItem = {
      id: Date.now(),
      nomor_sp: nomorSp,
      tanggal_sp: tanggalSp,
      lama_pekerjaan: lamaPekerjaan,
      tanggal_mulai: tanggalMulai,
      tanggal_selesai: tanggalSelesai,
      paket_id: activePaket.id,
      nama_paket: activePaket.nama_paket,
      nomor_paket: activePaket.nomor_paket,
      pagu_paket: activePaket.pagu_paket,
      program: activePaket.program,
      kegiatan: activePaket.kegiatan,
      sub_kegiatan: activePaket.sub_kegiatan,
      kode_sub_kegiatan: activePaket.kode_sub_kegiatan,
      penyedia_id: activePenyedia.id,
      nama_perusahaan: activePenyedia.nama_perusahaan,
      nama_penyedia: activePenyedia.nama_penyedia,
      npwp: activePenyedia.npwp,
      nama_bank: activePenyedia.nama_bank,
      nomor_rekening: activePenyedia.nomor_rekening,
      pemegang_rekening: activePenyedia.pemegang_rekening,
      alamat_penyedia: activePenyedia.alamat_penyedia,
      nilai_kontrak: nilaiKontrak,
      nomor_bapsthp: nomorBapsthp || 'BAPSTHP/2026/003',
      nomor_bapb: nomorBapb || 'BAPB/2026/003',
      tanggal_ba: tanggalBa || '2026-08-11',
      nomor_ba: nomorBa || 'BA-BAYAR/2026/003',
      status: status,
      total_terbayar: 0,
      pembayaran_count: 0,
      rekening_list: [...rekeningAllocations]
    };

    setRealisasiList([newRecord, ...realisasiList]);
    setAlert({ type: 'success', msg: `Transaksi Realisasi Pekerjaan '${nomorSp}' berhasil disimpan ke database!` });
    setViewMode('index');
    resetForm();
  };

  const handleDelete = (id: number) => {
    const target = realisasiList.find(r => r.id === id);
    if (target && target.pembayaran_count > 0) {
      setAlert({ type: 'danger', msg: `Gagal Hapus: Transaksi '${target.nomor_sp}' sudah memiliki ${target.pembayaran_count} termin pencairan terbayar!` });
      return;
    }

    if (confirm('Yakin ingin menghapus transaksi realisasi pekerjaan ini?')) {
      setRealisasiList(realisasiList.filter(r => r.id !== id));
      setAlert({ type: 'success', msg: 'Transaksi realisasi pekerjaan berhasil dihapus.' });
    }
  };

  const resetForm = () => {
    setSelectedPaketId('');
    setSelectedPenyediaId('');
    setActivePaket(null);
    setActivePenyedia(null);
    setRekeningAllocations([]);
    setNomorSp(`REAL/2026/000${realisasiList.length + 2}`);
    setNilaiKontrak(0);
    setNomorBapsthp('');
    setNomorBapb('');
    setNomorBa('');
  };

  const filteredList = realisasiList.filter(r => {
    const matchesSearch = r.nomor_sp.toLowerCase().includes(search.toLowerCase()) ||
                          r.nama_paket.toLowerCase().includes(search.toLowerCase()) ||
                          r.nama_perusahaan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === '' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalSumKontrak = realisasiList.reduce((acc, curr) => acc + curr.nilai_kontrak, 0);
  const totalSumTerbayar = realisasiList.reduce((acc, curr) => acc + curr.total_terbayar, 0);

  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {alert && (
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          alert.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
            : 'bg-rose-50 text-rose-800 border-rose-200'
        }`}>
          <div className="flex items-center gap-2">
            {alert.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 text-rose-600" />}
            <span className="text-sm font-semibold">{alert.msg}</span>
          </div>
          <button onClick={() => setAlert(null)} className="text-xs font-bold underline">Tutup</button>
        </div>
      )}

      {/* Main Mode View Switching */}
      {viewMode === 'index' && (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold tracking-wider uppercase mb-1">
                <Sparkles className="w-4 h-4" /> Tahap 5 - Transaksi Realisasi Pekerjaan
              </div>
              <h2 className="text-xl font-bold text-slate-800">Modul Realisasi Pekerjaan & Kontrak</h2>
              <p className="text-xs text-slate-5-0 mt-0.5">Kelola SP / Kontrak Pekerjaan, Multi-Rekening Belanja, BAPSTHP, BAPB & Auto-Fill AJAX</p>
            </div>
            <button
              onClick={() => { resetForm(); setViewMode('create'); setAlert(null); }}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-sm transition"
            >
              <Plus className="w-4 h-4" /> Tambah Realisasi / Kontrak Baru
            </button>
          </div>

          {/* Metric Overview Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Nilai Kontrak Realisasi</span>
                <DollarSign className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-2xl font-black text-slate-900">Rp {totalSumKontrak.toLocaleString('id-ID')}</div>
              <span className="text-xs text-slate-500 font-medium">{realisasiList.length} Transaksi SP / Kontrak</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">Total Realisasi Terbayar</span>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-emerald-700">Rp {totalSumTerbayar.toLocaleString('id-ID')}</div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${totalSumKontrak > 0 ? (totalSumTerbayar / totalSumKontrak) * 100 : 0}%` }}></div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">Sisa Komitmen Kontrak</span>
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-amber-700">Rp {(totalSumKontrak - totalSumTerbayar).toLocaleString('id-ID')}</div>
              <span className="text-xs text-amber-600 font-semibold">Siap dicairkan via Termin Pembayaran</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari No. SP, Nama Paket, Perusahaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-48"
            >
              <option value="">-- Semua Status --</option>
              <option value="proses">Proses Pekerjaan</option>
              <option value="selesai">Selesai</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Index Data Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">#</th>
                    <th className="py-3.5 px-4">No. SP / Kontrak</th>
                    <th className="py-3.5 px-4">Paket Pekerjaan & Sub-Kegiatan</th>
                    <th className="py-3.5 px-4">Rekanan Penyedia</th>
                    <th className="py-3.5 px-4 text-right">Nilai Kontrak</th>
                    <th className="py-3.5 px-4 text-right">Realisasi Terbayar</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-center w-28">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredList.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-slate-400">
                        <FileCheck2 className="w-10 h-10 mx-auto mb-2 opacity-50" />
                        Belum ada transaksi realisasi pekerjaan.
                      </td>
                    </tr>
                  ) : (
                    filteredList.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 text-center text-slate-400 font-medium">{idx + 1}</td>
                        <td className="py-3.5 px-4">
                          <div className="font-mono font-bold text-indigo-600">{item.nomor_sp}</div>
                          <div className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" /> {item.tanggal_sp} ({item.lama_pekerjaan} Hari)
                          </div>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-semibold text-slate-800 truncate" title={item.nama_paket}>{item.nama_paket}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <span className="inline-block px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-mono font-semibold text-slate-600">
                              {item.kode_sub_kegiatan}
                            </span>
                            <span className="text-xs text-slate-500 truncate">{item.sub_kegiatan}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-800">{item.nama_perusahaan}</div>
                          <div className="text-xs text-slate-500">{item.nama_penyedia} (NPWP: {item.npwp})</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                          Rp {item.nilai_kontrak.toLocaleString('id-ID')}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="font-bold text-emerald-600">Rp {item.total_terbayar.toLocaleString('id-ID')}</div>
                          <div className="text-[10px] text-slate-400 font-medium">{item.pembayaran_count} Termin</div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            item.status === 'selesai'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : item.status === 'proses'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {item.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => { setSelectedItem(item); setViewMode('detail'); }}
                              className="p-1.5 hover:bg-slate-100 text-indigo-600 rounded-lg transition"
                              title="Detail Realisasi"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE FORM VIEW WITH AUTO FILL AJAX SIMULATION */}
      {viewMode === 'create' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('index')}
                className="p-2 hover:bg-slate-100 text-slate-600 rounded-xl transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Input Realisasi / Kontrak Pekerjaan Baru</h3>
                <p className="text-xs text-slate-500">Pilih Paket Pekerjaan & Penyedia untuk mengaktifkan fitur Auto-Fill AJAX</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSaveRealisasi} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Selection Boxes */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. SELECT PAKET PEKERJAAN */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-indigo-600 text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
                  <Layers className="w-4 h-4" /> 1. Pilih Paket Pekerjaan (Auto-Fill Program & Sub-Kegiatan)
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Pilih Paket Pekerjaan <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={selectedPaketId}
                      onChange={(e) => handlePaketChange(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">-- Pilih Paket Pekerjaan --</option>
                      {masterPaketOptions.map(pkt => (
                        <option key={pkt.id} value={pkt.id}>
                          {pkt.nomor_paket} - {pkt.nama_paket} (Pagu: Rp {pkt.pagu_paket.toLocaleString('id-ID')})
                        </option>
                      ))}
                    </select>
                  </div>

                  {activePaket && (
                    <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-600 text-white font-mono rounded font-semibold">{activePaket.kode_sub_kegiatan}</span>
                        <span className="font-bold text-indigo-950">{activePaket.sub_kegiatan}</span>
                      </div>
                      <div className="text-slate-600 font-medium">Program: <span className="text-slate-900">{activePaket.program}</span></div>
                      <div className="text-slate-600 font-medium">Kegiatan: <span className="text-slate-900">{activePaket.kegiatan}</span></div>
                      <div className="pt-2 border-t border-indigo-200 flex justify-between items-center">
                        <span className="font-semibold text-slate-600">Pagu Paket Pekerjaan:</span>
                        <span className="text-base font-black text-indigo-700">Rp {activePaket.pagu_paket.toLocaleString('id-ID')}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. SELECT PENYEDIA */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-800 text-white px-5 py-3 font-bold text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> 2. Data Rekanan Penyedia (Auto-Fill Profiles & Rekening)
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Pilih Rekanan Penyedia <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={selectedPenyediaId}
                      onChange={(e) => handlePenyediaChange(Number(e.target.value))}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">-- Pilih Rekanan Penyedia --</option>
                      {masterPenyediaOptions.map(py => (
                        <option key={py.id} value={py.id}>
                          {py.nama_perusahaan} (a.n {py.nama_penyedia})
                        </option>
                      ))}
                    </select>
                  </div>

                  {activePenyedia && (
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="font-bold text-sm text-slate-900">{activePenyedia.nama_perusahaan}</div>
                      <div className="text-slate-600">Direktur / Penanggung Jawab: <span className="font-semibold text-slate-800">{activePenyedia.nama_penyedia}</span></div>
                      <div className="text-slate-600">NPWP Perusahaan: <span className="font-mono font-bold text-indigo-600">{activePenyedia.npwp}</span></div>
                      <div className="text-slate-600">Rekening Bank: <span className="font-semibold text-slate-800">{activePenyedia.nama_bank} - {activePenyedia.nomor_rekening}</span></div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. MULTI REKENING ALLOCATION TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-100 border-b border-slate-200 px-5 py-3 font-bold text-sm text-slate-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" /> 3. Alokasi Multi-Rekening Belanja
                </div>
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Kode & Nama Rekening</th>
                        <th className="py-2.5 px-4 text-right w-36">Pagu Rekening</th>
                        <th className="py-2.5 px-4 text-right w-44">Nilai Realisasi (Rp)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rekeningAllocations.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-6 text-center text-slate-400">
                            Pilih Paket Pekerjaan terlebih dahulu untuk memuat daftar rekening.
                          </td>
                        </tr>
                      ) : (
                        rekeningAllocations.map((rek, idx) => (
                          <tr key={rek.id}>
                            <td className="py-3 px-4">
                              <div className="font-mono font-bold text-slate-800">{rek.kode_rekening}</div>
                              <div className="text-slate-500 text-[11px]">{rek.nama_rekening}</div>
                            </td>
                            <td className="py-3 px-4 text-right font-medium text-slate-600">
                              Rp {rek.pagu_rekening.toLocaleString('id-ID')}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <input
                                type="number"
                                value={rek.nilai_realisasi}
                                onChange={(e) => handleRekeningValueChange(idx, Number(e.target.value))}
                                className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-right font-bold text-indigo-600 text-xs focus:ring-2 focus:ring-indigo-500"
                              />
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Transaction Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4 sticky top-6">
                <h4 className="font-bold text-slate-800 text-sm pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-600" /> Data Surat Pesanan (SP) & Berita Acara
                </h4>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nomor SP / Kontrak <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nomorSp}
                    onChange={(e) => setNomorSp(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-indigo-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tanggal SP</label>
                    <input
                      type="date"
                      value={tanggalSp}
                      onChange={(e) => setTanggalSp(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Lama Pekerjaan (Hari)</label>
                    <input
                      type="number"
                      value={lamaPekerjaan}
                      onChange={(e) => handleLamaPekerjaanChange(Number(e.target.value))}
                      required
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tanggal Mulai</label>
                    <input
                      type="date"
                      value={tanggalMulai}
                      onChange={(e) => handleTanggalMulaiChange(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Tanggal Selesai</label>
                    <input
                      type="date"
                      value={tanggalSelesai}
                      onChange={(e) => setTanggalSelesai(e.target.value)}
                      required
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                  <label className="block text-xs font-bold text-indigo-900">Nilai Kontrak Pekerjaan (Rp) <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    value={nilaiKontrak}
                    onChange={(e) => setNilaiKontrak(Number(e.target.value))}
                    required
                    className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-right font-black text-indigo-700 text-lg"
                  />
                  {activePaket && nilaiKontrak > activePaket.pagu_paket && (
                    <div className="text-[11px] font-bold text-rose-600 mt-1 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> Melebihi Pagu Paket (Rp {activePaket.pagu_paket.toLocaleString('id-ID')})!
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                  <div className="text-xs font-bold text-slate-700">Dokumen Berita Acara (BA)</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="No. BAPSTHP"
                      value={nomorBapsthp}
                      onChange={(e) => setNomorBapsthp(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <input
                      type="text"
                      placeholder="No. BAPB"
                      value={nomorBapb}
                      onChange={(e) => setNomorBapb(e.target.value)}
                      className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={activePaket ? nilaiKontrak > activePaket.pagu_paket : false}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" /> Simpan Transaksi Realisasi
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* DETAIL VIEW MODAL / PAGE */}
      {viewMode === 'detail' && selectedItem && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('index')}
                className="p-2 hover:bg-slate-100 text-slate-600 rounded-xl transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Detail Transaksi Realisasi Pekerjaan</h3>
                <p className="text-xs text-slate-500 font-mono">No. SP: {selectedItem.nomor_sp}</p>
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-indigo-600 text-white font-medium text-xs rounded-xl shadow-sm hover:bg-indigo-700 transition"
            >
              Cetak Detail Transaksi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs font-semibold uppercase opacity-80">Nilai Kontrak</div>
              <div className="text-xl font-black mt-1">Rp {selectedItem.nilai_kontrak.toLocaleString('id-ID')}</div>
              <div className="text-[11px] opacity-80 mt-1">Pagu Paket: Rp {selectedItem.pagu_paket.toLocaleString('id-ID')}</div>
            </div>

            <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs font-semibold uppercase opacity-80">Total Realisasi Terbayar</div>
              <div className="text-xl font-black mt-1">Rp {selectedItem.total_terbayar.toLocaleString('id-ID')}</div>
              <div className="text-[11px] opacity-80 mt-1">{selectedItem.pembayaran_count} Termin Pembayaran</div>
            </div>

            <div className="bg-amber-500 text-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs font-semibold uppercase opacity-80">Sisa Kontrak</div>
              <div className="text-xl font-black mt-1">Rp {(selectedItem.nilai_kontrak - selectedItem.total_terbayar).toLocaleString('id-ID')}</div>
              <div className="text-[11px] opacity-80 mt-1">Sisa yang belum dicairkan</div>
            </div>

            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-sm">
              <div className="text-xs font-semibold uppercase opacity-80">Status Kontrak</div>
              <div className="text-xl font-black mt-1 uppercase">{selectedItem.status}</div>
              <div className="text-[11px] opacity-80 mt-1">Tahun Anggaran 2026</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              {/* Hierarchy */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">Hierarki Program & Sub-Kegiatan</h4>
                <div>
                  <span className="font-semibold text-slate-500">Program: </span>
                  <span className="font-bold text-slate-900">{selectedItem.program}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Sub-Kegiatan: </span>
                  <span className="font-mono font-bold text-indigo-600">{selectedItem.kode_sub_kegiatan}</span> - <span className="font-bold text-slate-900">{selectedItem.sub_kegiatan}</span>
                </div>
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-semibold text-slate-500">Paket Pekerjaan: </span>
                  <span className="font-bold text-indigo-700 text-sm">{selectedItem.nama_paket} ({selectedItem.nomor_paket})</span>
                </div>
              </div>

              {/* Multi Rekening Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 font-bold text-xs text-slate-700">
                  Rincian Multi-Rekening Belanja
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Kode & Rekening</th>
                      <th className="py-2.5 px-4 text-right">Pagu Rekening</th>
                      <th className="py-2.5 px-4 text-right">Alokasi Realisasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedItem.rekening_list.map(rek => (
                      <tr key={rek.id}>
                        <td className="py-3 px-4">
                          <div className="font-mono font-bold text-slate-800">{rek.kode_rekening}</div>
                          <div className="text-slate-500">{rek.nama_rekening}</div>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-600 font-medium">Rp {rek.pagu_rekening.toLocaleString('id-ID')}</td>
                        <td className="py-3 px-4 text-right font-bold text-indigo-600">Rp {rek.nilai_realisasi.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Penyedia Card */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600" /> Profil Rekanan Penyedia
                </h4>
                <div>
                  <div className="font-bold text-sm text-slate-900">{selectedItem.nama_perusahaan}</div>
                  <div className="text-slate-500">Direktur: <span className="font-semibold text-slate-800">{selectedItem.nama_penyedia}</span></div>
                </div>
                <div>
                  <div className="text-slate-500">NPWP Perusahaan:</div>
                  <div className="font-mono font-bold text-indigo-600">{selectedItem.npwp}</div>
                </div>
                <div>
                  <div className="text-slate-500">Rekening Transfer:</div>
                  <div className="font-semibold text-slate-800">{selectedItem.nama_bank}</div>
                  <div className="font-mono text-slate-800">{selectedItem.nomor_rekening}</div>
                </div>
              </div>

              {/* Berita Acara */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
                <h4 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-600" /> Dokumen Berita Acara
                </h4>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">BAPSTHP:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedItem.nomor_bapsthp}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">BAPB:</span>
                  <span className="font-mono font-bold text-slate-800">{selectedItem.nomor_bapb}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Tanggal BA:</span>
                  <span className="font-semibold text-slate-800">{selectedItem.tanggal_ba}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
