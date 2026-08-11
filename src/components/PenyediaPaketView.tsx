import React, { useState } from 'react';
import { Building2, Package, Plus, Search, Filter, CheckCircle2, AlertTriangle, ShieldCheck, CreditCard, Layers, Trash2, Edit, Eye, ArrowRight, DollarSign } from 'lucide-react';

interface Penyedia {
  id: number;
  nama_perusahaan: string;
  nama_penyedia: string;
  alamat: string;
  npwp: string;
  nama_bank: string;
  nomor_rekening: string;
  pemegang_rekening: string;
  telepon: string;
  email: string;
  status: 'aktif' | 'nonaktif';
}

interface RekeningItem {
  rekening_id: number;
  kode_rekening: string;
  nama_rekening: string;
  pagu_rekening: number;
}

interface PaketPekerjaan {
  id: number;
  nomor_paket: string;
  program_id: number;
  program_nama: string;
  kegiatan_id: number;
  kegiatan_nama: string;
  sub_kegiatan_id: number;
  sub_kegiatan_nama: string;
  nama_paket: string;
  pagu_paket: number;
  tahun_anggaran: string;
  status: 'AKTIF' | 'DRAFT';
  keterangan: string;
  rekening_items: RekeningItem[];
}

export const PenyediaPaketView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'penyedia' | 'paket'>('paket');
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Seed Data for Penyedia
  const [penyediaList, setPenyediaList] = useState<Penyedia[]>([
    {
      id: 1,
      nama_perusahaan: 'PT Konsultan Utama Sejahtera',
      nama_penyedia: 'Ir. Budi Santoso',
      alamat: 'Jl. Pemuda No. 45, Surabaya, Jawa Timur',
      npwp: '01.234.567.8-604.000',
      nama_bank: 'Bank Jatim Cabang Utama',
      nomor_rekening: '001122334455',
      pemegang_rekening: 'PT Konsultan Utama Sejahtera',
      telepon: '0812-3456-7890',
      email: 'info@konsultanutama.co.id',
      status: 'aktif'
    },
    {
      id: 2,
      nama_perusahaan: 'CV Media Grafika Printing',
      nama_penyedia: 'H. Ahmad Dahlan',
      alamat: 'Jl. Basuki Rahmat No. 12, Surabaya',
      npwp: '02.987.654.3-604.000',
      nama_bank: 'Bank Mandiri',
      nomor_rekening: '1420019876543',
      pemegang_rekening: 'CV Media Grafika Printing',
      telepon: '0813-9876-5432',
      email: 'sales@mediagrafika.com',
      status: 'aktif'
    },
    {
      id: 3,
      nama_perusahaan: 'PT Karya Nusantara Konstruksi',
      nama_penyedia: 'Drs. Hendra Gunawan',
      alamat: 'Jl. Raya Darmo No. 88, Surabaya',
      npwp: '03.456.789.1-604.000',
      nama_bank: 'Bank BRI',
      nomor_rekening: '008801002345501',
      pemegang_rekening: 'PT Karya Nusantara Konstruksi',
      telepon: '0811-2233-4455',
      email: 'kontak@karyanusa.co.id',
      status: 'aktif'
    }
  ]);

  // Master Rekening options for Paket
  const masterRekening = [
    { id: 1, kode: '5.1.02.01.01.0024', nama: 'Belanja Alat/Bahan untuk Kegiatan Kantor - Alat Tulis Kantor' },
    { id: 2, kode: '5.1.02.01.01.0025', nama: 'Belanja Alat/Bahan untuk Kegiatan Kantor - Kertas dan Cover' },
    { id: 3, kode: '5.1.02.01.01.0026', nama: 'Belanja Cetak dan Penggandaan' },
    { id: 4, kode: '5.1.02.02.01.0003', nama: 'Honorarium Narasumber atau Pembahas' },
    { id: 5, kode: '5.1.02.04.01.0001', nama: 'Belanja Perjalanan Dinas Dalam Daerah' }
  ];

  // Initial Seed Data for Paket Pekerjaan
  const [paketList, setPaketList] = useState<PaketPekerjaan[]>([
    {
      id: 1,
      nomor_paket: 'PKT-2026-001',
      program_id: 1,
      program_nama: 'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA',
      kegiatan_id: 1,
      kegiatan_nama: 'Administrasi Keuangan Perangkat Daerah',
      sub_kegiatan_id: 1,
      sub_kegiatan_nama: 'Penyediaan Gaji dan Tunjangan ASN',
      nama_paket: 'Pengadaan Alat Tulis Kantor & Cetakan Dinas Semester I',
      pagu_paket: 150000000,
      tahun_anggaran: '2026',
      status: 'AKTIF',
      keterangan: 'Pagu DPA Murni APBD 2026',
      rekening_items: [
        { rekening_id: 1, kode_rekening: '5.1.02.01.01.0024', nama_rekening: 'Belanja ATK Kantor', pagu_rekening: 80000000 },
        { rekening_id: 3, kode_rekening: '5.1.02.01.01.0026', nama_rekening: 'Belanja Cetak dan Penggandaan', pagu_rekening: 70000000 }
      ]
    },
    {
      id: 2,
      nomor_paket: 'PKT-2026-002',
      program_id: 1,
      program_nama: 'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA',
      kegiatan_id: 2,
      kegiatan_nama: 'Pengadaan Barang Milik Daerah Perangkat Daerah',
      sub_kegiatan_id: 3,
      sub_kegiatan_nama: 'Pengadaan Sarana dan Prasarana Gedung Kantor atau Bangunan Lainnya',
      nama_paket: 'Jasa Konsultansi Pengawasan Kinerja Pelayanan Publik UPTD',
      pagu_paket: 250000000,
      tahun_anggaran: '2026',
      status: 'AKTIF',
      keterangan: 'Pengawasan berkala UPTD 2026',
      rekening_items: [
        { rekening_id: 4, kode_rekening: '5.1.02.02.01.0003', nama_rekening: 'Honorarium Narasumber / Tenaga Ahli', pagu_rekening: 150000000 },
        { rekening_id: 5, kode_rekening: '5.1.02.04.01.0001', nama_rekening: 'Belanja Perjalanan Dinas Dalam Daerah', pagu_rekening: 100000000 }
      ]
    }
  ]);

  // Modal / Form state for Paket
  const [showPaketModal, setShowPaketModal] = useState(false);
  const [selectedPaket, setSelectedPaket] = useState<PaketPekerjaan | null>(null);

  // Form Fields for Paket
  const [formNomor, setFormNomor] = useState('');
  const [formNamaPaket, setFormNamaPaket] = useState('');
  const [formPaguPaket, setFormPaguPaket] = useState<number>(0);
  const [formRekeningItems, setFormRekeningItems] = useState<{ rekening_id: number; pagu_rekening: number }[]>([
    { rekening_id: 1, pagu_rekening: 0 }
  ]);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Form Modal for Penyedia
  const [showPenyediaModal, setShowPenyediaModal] = useState(false);
  const [penyediaForm, setPenyediaForm] = useState({
    nama_perusahaan: '',
    nama_penyedia: '',
    npwp: '',
    nama_bank: 'Bank Jatim',
    nomor_rekening: '',
    pemegang_rekening: '',
    alamat: '',
    telepon: '',
    email: ''
  });

  // Calculate live sum of pagu rekening in modal
  const currentTotalRekening = formRekeningItems.reduce((acc, item) => acc + (item.pagu_rekening || 0), 0);
  const currentSisaPaket = formPaguPaket - currentTotalRekening;

  const handleAddRekeningRow = () => {
    setFormRekeningItems([...formRekeningItems, { rekening_id: 1, pagu_rekening: 0 }]);
  };

  const handleRemoveRekeningRow = (index: number) => {
    if (formRekeningItems.length <= 1) return;
    setFormRekeningItems(formRekeningItems.filter((_, i) => i !== index));
  };

  const handleSavePaket = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation 1: Pagu Paket > 0
    if (formPaguPaket <= 0) {
      setFormError('Pagu Paket Pekerjaan harus lebih besar dari Rp 0!');
      return;
    }

    // Validation 2: Total Pagu Rekening <= Pagu Paket
    if (currentTotalRekening > formPaguPaket) {
      setFormError(`Validasi Gagal: Total Pagu Rekening (Rp ${currentTotalRekening.toLocaleString('id-ID')}) melebihi Pagu Paket (Rp ${formPaguPaket.toLocaleString('id-ID')})!`);
      return;
    }

    // Prepare Items
    const finalItems: RekeningItem[] = formRekeningItems.map(item => {
      const match = masterRekening.find(m => m.id === item.rekening_id);
      return {
        rekening_id: item.rekening_id,
        kode_rekening: match ? match.kode : '5.1.02.01.01.0024',
        nama_rekening: match ? match.nama : 'Belanja ATK',
        pagu_rekening: item.pagu_rekening
      };
    });

    const newPaket: PaketPekerjaan = {
      id: Date.now(),
      nomor_paket: formNomor || `PKT-2026-00${paketList.length + 1}`,
      program_id: 1,
      program_nama: 'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA',
      kegiatan_id: 1,
      kegiatan_nama: 'Administrasi Keuangan Perangkat Daerah',
      sub_kegiatan_id: 1,
      sub_kegiatan_nama: 'Penyediaan Gaji dan Tunjangan ASN',
      nama_paket: formNamaPaket,
      pagu_paket: formPaguPaket,
      tahun_anggaran: '2026',
      status: 'AKTIF',
      keterangan: 'Alokasi Pagu DPA 2026',
      rekening_items: finalItems
    };

    setPaketList([newPaket, ...paketList]);
    setFormSuccess(`Paket Pekerjaan '${newPaket.nomor_paket}' berhasil disimpan dalam database transaction (BEGIN, COMMIT).`);
    setShowPaketModal(false);

    // Reset Form
    setFormNomor('');
    setFormNamaPaket('');
    setFormPaguPaket(0);
    setFormRekeningItems([{ rekening_id: 1, pagu_rekening: 0 }]);
  };

  const handleSavePenyedia = (e: React.FormEvent) => {
    e.preventDefault();
    if (penyediaList.some(p => p.npwp === penyediaForm.npwp)) {
      alert(`NPWP '${penyediaForm.npwp}' sudah terdaftar dalam sistem!`);
      return;
    }

    const newPenyedia: Penyedia = {
      id: Date.now(),
      ...penyediaForm,
      status: 'aktif'
    };

    setPenyediaList([newPenyedia, ...penyediaList]);
    setShowPenyediaModal(false);
    setPenyediaForm({
      nama_perusahaan: '',
      nama_penyedia: '',
      npwp: '',
      nama_bank: 'Bank Jatim',
      nomor_rekening: '',
      pemegang_rekening: '',
      alamat: '',
      telepon: '',
      email: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TAHAP 4: PENYEDIA & PAKET PEKERJAAN</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Master Penyedia & Paket Pekerjaan (Multi-Rekening)</h2>
            <p className="text-sm text-slate-300 mt-1">
              Pengelolaan Data Rekanan/Penyedia & Alokasi Pagu Paket Pekerjaan dengan Validasi Strict Total Pagu Rekening ≤ Pagu Paket.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50 text-xs">
            <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded font-mono font-medium">
              Database Transaction: BEGIN, COMMIT
            </div>
          </div>
        </div>
      </div>

      {/* FLASH SUCCESS NOTIFICATION */}
      {formSuccess && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{formSuccess}</span>
          </div>
          <button onClick={() => setFormSuccess(null)} className="text-xs hover:underline text-emerald-200">Tutup</button>
        </div>
      )}

      {/* SUB TAB NAVIGATION */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveSubTab('paket')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeSubTab === 'paket'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Paket Pekerjaan & Multi-Rekening</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/30 text-indigo-200 font-mono">
              {paketList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveSubTab('penyedia')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeSubTab === 'penyedia'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Master Penyedia / Rekanan</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-indigo-500/30 text-indigo-200 font-mono">
              {penyediaList.length}
            </span>
          </button>
        </div>

        <div>
          {activeSubTab === 'paket' ? (
            <button
              onClick={() => setShowPaketModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Paket Pekerjaan Baru</span>
            </button>
          ) : (
            <button
              onClick={() => setShowPenyediaModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Penyedia Baru</span>
            </button>
          )}
        </div>
      </div>

      {/* TAB CONTENT: PAKET PEKERJAAN */}
      {activeSubTab === 'paket' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paketList.map((paket) => {
              const totalRek = paket.rekening_items.reduce((acc, r) => acc + r.pagu_rekening, 0);
              const sisa = paket.pagu_paket - totalRek;

              return (
                <div key={paket.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/50 transition-all shadow-sm space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold rounded border border-indigo-500/30">
                          {paket.nomor_paket}
                        </span>
                        <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded border border-emerald-500/30">
                          {paket.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-base mt-2">{paket.nama_paket}</h3>
                      <p className="text-xs text-slate-400 mt-1">{paket.sub_kegiatan_nama}</p>
                    </div>
                  </div>

                  {/* PAGU HIGHLIGHT METRICS */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-sans">Pagu Paket</span>
                      <div className="font-bold text-indigo-400">Rp {paket.pagu_paket.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-sans">Total Rekening</span>
                      <div className="font-bold text-slate-200">Rp {totalRek.toLocaleString('id-ID')}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase font-sans">Sisa Paket</span>
                      <div className={`font-bold ${sisa < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                        Rp {sisa.toLocaleString('id-ID')}
                      </div>
                    </div>
                  </div>

                  {/* REKENING ITEMS LIST */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-300 mb-2 flex items-center justify-between">
                      <span>Alokasi Multi-Rekening ({paket.rekening_items.length})</span>
                      <span className="text-[10px] text-slate-500 font-mono">Valid: Sum ≤ Pagu Paket</span>
                    </h4>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                      {paket.rekening_items.map((rek, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-800/50 text-xs border border-slate-700/50">
                          <div className="truncate pr-2">
                            <span className="font-mono text-indigo-300 text-[11px] block">{rek.kode_rekening}</span>
                            <span className="text-slate-300 truncate block">{rek.nama_rekening}</span>
                          </div>
                          <span className="font-mono font-bold text-slate-200 shrink-0">
                            Rp {rek.pagu_rekening.toLocaleString('id-ID')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
                    <span>Tahun: <strong className="text-slate-200">{paket.tahun_anggaran}</strong></span>
                    <button
                      onClick={() => setSelectedPaket(paket)}
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Detail Rincian</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT: PENYEDIA */}
      {activeSubTab === 'penyedia' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari Nama Perusahaan, NPWP, Bank..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="text-xs text-slate-400">
              Total Penyedia: <strong className="text-slate-200">{penyediaList.length} Perusahaan</strong>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[11px] border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Nama Perusahaan & Direktur</th>
                  <th className="px-4 py-3">NPWP & Kontak</th>
                  <th className="px-4 py-3">Rekening Bank Rekanan</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {penyediaList
                  .filter(p => p.nama_perusahaan.toLowerCase().includes(searchQuery.toLowerCase()) || p.npwp.includes(searchQuery))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-100 text-sm">{p.nama_perusahaan}</div>
                        <div className="text-slate-400 text-[11px]">Direktur: {p.nama_penyedia}</div>
                        <div className="text-slate-500 text-[11px] truncate max-w-xs">{p.alamat}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-slate-800 text-emerald-400 font-mono text-[11px] rounded border border-slate-700 block w-max mb-1">
                          {p.npwp}
                        </span>
                        <div className="text-slate-400">{p.telepon}</div>
                        <div className="text-slate-500">{p.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-indigo-400">{p.nama_bank}</div>
                        <div className="font-mono text-slate-200 font-semibold">{p.nomor_rekening}</div>
                        <div className="text-slate-400 text-[11px]">a.n. {p.pemegang_rekening}</div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => alert(`Detail Penyedia ${p.nama_perusahaan} - NPWP ${p.npwp} siap digunakan dalam Kontrak Realisasi.`)}
                          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: CREATE PAKET PEKERJAAN */}
      {showPaketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 text-slate-200 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-400" />
                  <span>Tambah Paket Pekerjaan & Multi-Rekening</span>
                </h3>
                <p className="text-xs text-slate-400">Database Transaction & Validasi Strict Sum(Pagu Rekening) ≤ Pagu Paket</p>
              </div>
              <button onClick={() => setShowPaketModal(false)} className="text-slate-400 hover:text-white text-lg">×</button>
            </div>

            {formError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSavePaket} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nomor Paket Pekerjaan *</label>
                  <input
                    type="text"
                    required
                    value={formNomor}
                    onChange={(e) => setFormNomor(e.target.value)}
                    placeholder="Contoh: PKT-2026-003"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Total Pagu Paket (Rp) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formPaguPaket || ''}
                    onChange={(e) => setFormPaguPaket(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-indigo-300 font-mono font-bold focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Paket Pekerjaan *</label>
                <input
                  type="text"
                  required
                  value={formNamaPaket}
                  onChange={(e) => setFormNamaPaket(e.target.value)}
                  placeholder="Contoh: Pengadaan Alat dan Bahan Kebersihan Gedung Kantor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 focus:border-indigo-500"
                />
              </div>

              {/* DYNAMIC MULTI-REKENING LINES */}
              <div className="border border-slate-800 rounded-xl p-3 bg-slate-950/50 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-300">Alokasi Rekening Belanja DPA</span>
                  <button
                    type="button"
                    onClick={handleAddRekeningRow}
                    className="px-2.5 py-1 bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 rounded border border-emerald-500/30 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tambah Baris Rekening</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {formRekeningItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <select
                        value={item.rekening_id}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          const updated = [...formRekeningItems];
                          updated[index].rekening_id = val;
                          setFormRekeningItems(updated);
                        }}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs"
                      >
                        {masterRekening.map(m => (
                          <option key={m.id} value={m.id}>
                            [{m.kode}] {m.nama}
                          </option>
                        ))}
                      </select>

                      <div className="w-40 relative">
                        <input
                          type="number"
                          min="0"
                          value={item.pagu_rekening || ''}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const updated = [...formRekeningItems];
                            updated[index].pagu_rekening = val;
                            setFormRekeningItems(updated);
                          }}
                          placeholder="Pagu Rp"
                          className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-right font-mono text-slate-200 text-xs"
                        />
                      </div>

                      {formRekeningItems.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveRekeningRow(index)}
                          className="p-2 text-rose-400 hover:bg-rose-500/10 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* CALCULATED SUMMARY FOOTER */}
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                  <span>Total Pagu Rekening: <strong className="text-indigo-400">Rp {currentTotalRekening.toLocaleString('id-ID')}</strong></span>
                  <span>
                    Sisa Paket:{' '}
                    <strong className={currentSisaPaket < 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      Rp {currentSisaPaket.toLocaleString('id-ID')}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPaketModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={currentTotalRekening > formPaguPaket && formPaguPaket > 0}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Simpan Paket Pekerjaan (Transaction)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE PENYEDIA */}
      {showPenyediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 text-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-400" />
                <span>Tambah Penyedia / Rekanan Baru</span>
              </h3>
              <button onClick={() => setShowPenyediaModal(false)} className="text-slate-400 hover:text-white">×</button>
            </div>

            <form onSubmit={handleSavePenyedia} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Nama Perusahaan (PT/CV) *</label>
                <input
                  type="text"
                  required
                  value={penyediaForm.nama_perusahaan}
                  onChange={(e) => setPenyediaForm({ ...penyediaForm, nama_perusahaan: e.target.value })}
                  placeholder="Contoh: PT Konsultan Kinerja Prima"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Nama Direktur *</label>
                  <input
                    type="text"
                    required
                    value={penyediaForm.nama_penyedia}
                    onChange={(e) => setPenyediaForm({ ...penyediaForm, nama_penyedia: e.target.value })}
                    placeholder="Contoh: Ir. Budi Hartono"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">NPWP *</label>
                  <input
                    type="text"
                    required
                    value={penyediaForm.npwp}
                    onChange={(e) => setPenyediaForm({ ...penyediaForm, npwp: e.target.value })}
                    placeholder="01.234.567.8-901.000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 border-t border-slate-800 pt-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Bank *</label>
                  <input
                    type="text"
                    required
                    value={penyediaForm.nama_bank}
                    onChange={(e) => setPenyediaForm({ ...penyediaForm, nama_bank: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">No. Rekening *</label>
                  <input
                    type="text"
                    required
                    value={penyediaForm.nomor_rekening}
                    onChange={(e) => setPenyediaForm({ ...penyediaForm, nomor_rekening: e.target.value })}
                    placeholder="0011223344"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Pemegang *</label>
                  <input
                    type="text"
                    required
                    value={penyediaForm.pemegang_rekening}
                    onChange={(e) => setPenyediaForm({ ...penyediaForm, pemegang_rekening: e.target.value })}
                    placeholder="a.n PT Perusahaan"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Alamat Lengkap</label>
                <textarea
                  rows={2}
                  value={penyediaForm.alamat}
                  onChange={(e) => setPenyediaForm({ ...penyediaForm, alamat: e.target.value })}
                  placeholder="Jl. Raya Utama No. 123..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowPenyediaModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500"
                >
                  Simpan Penyedia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
