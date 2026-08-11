import React, { useState } from 'react';
import { FolderTree, Network, ListChecks, Receipt, Plus, Search, Filter, Edit, Trash2, ArrowRight, Download, Upload, ShieldAlert, CheckCircle, AlertTriangle, Layers, FileSpreadsheet, FileText } from 'lucide-react';

interface ProgramItem {
  id: number;
  kode_program: string;
  nama_program: string;
  tahun_anggaran: string;
}

interface KegiatanItem {
  id: number;
  program_id: number;
  kode_kegiatan: string;
  nama_kegiatan: string;
}

interface SubKegiatanItem {
  id: number;
  program_id: number;
  kegiatan_id: number;
  kode_sub_kegiatan: string;
  nama_sub_kegiatan: string;
}

interface RekeningItem {
  id: number;
  kode_rekening: string;
  nama_rekening: string;
  jenis_belanja: string;
}

export const MasterAnggaranView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'program' | 'kegiatan' | 'subkegiatan' | 'rekening'>('program');

  // Initial State from Seed Data (14 Paket System)
  const [programs, setPrograms] = useState<ProgramItem[]>([
    { id: 1, kode_program: '1.02.01', nama_program: 'PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA', tahun_anggaran: '2026' },
    { id: 2, kode_program: '1.02.02', nama_program: 'PROGRAM PELATIHAN KERJA DAN PRODUKTIVITAS TENAGA KERJA', tahun_anggaran: '2026' },
    { id: 3, kode_program: '1.02.03', nama_program: 'PROGRAM PENEMPATAN DAN PERLUASAN KESEMPATAN KERJA', tahun_anggaran: '2026' }
  ]);

  const [kegiatans, setKegiatans] = useState<KegiatanItem[]>([
    { id: 1, program_id: 1, kode_kegiatan: '1.02.01.2.06', nama_kegiatan: 'Pemeliharaan Barang Milik Daerah Penunjang Urusan Pemerintah Daerah' },
    { id: 2, program_id: 1, kode_kegiatan: '1.02.01.2.08', nama_kegiatan: 'Penyediaan Jasa Penunjang Urusan Pemerintahan Daerah' },
    { id: 3, program_id: 2, kode_kegiatan: '1.02.02.2.01', nama_kegiatan: 'Pelaksanaan Pelatihan Berdasarkan Unit Kompetensi' },
    { id: 4, program_id: 2, kode_kegiatan: '1.02.02.2.02', nama_kegiatan: 'Pembinaan Lembaga Pelatihan Kerja Swasta' }
  ]);

  const [subKegiatans, setSubKegiatans] = useState<SubKegiatanItem[]>([
    { id: 1, program_id: 1, kegiatan_id: 1, kode_sub_kegiatan: '1.02.01.2.06.01', nama_sub_kegiatan: 'Penyediaan Jasa Pemeliharaan, Biaya Pemeliharaan dan Pajak Kendaraan Dinas' },
    { id: 2, program_id: 1, kegiatan_id: 1, kode_sub_kegiatan: '1.02.01.2.06.02', nama_sub_kegiatan: 'Pemeliharaan Peralatan dan Mesin Lainnya' },
    { id: 3, program_id: 1, kegiatan_id: 2, kode_sub_kegiatan: '1.02.01.2.08.01', nama_sub_kegiatan: 'Penyediaan Jasa Surat Menyurat & Komunikasi' },
    { id: 4, program_id: 2, kegiatan_id: 3, kode_sub_kegiatan: '1.02.02.2.01.01', nama_sub_kegiatan: 'Pelatihan Kerja Institusional Bagi Pencari Kerja' },
    { id: 5, program_id: 2, kegiatan_id: 3, kode_sub_kegiatan: '1.02.02.2.01.02', nama_sub_kegiatan: 'Penyelenggaraan Pelatihan Berbasis Masyarakat' }
  ]);

  const [rekenings, setRekenings] = useState<RekeningItem[]>([
    { id: 1, kode_rekening: '5.1.02.01.01.0024', nama_rekening: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Alat Tulis Kantor', jenis_belanja: 'Belanja Barang dan Jasa' },
    { id: 2, kode_rekening: '5.1.02.01.01.0026', nama_rekening: 'Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak', jenis_belanja: 'Belanja Barang dan Jasa' },
    { id: 3, kode_rekening: '5.1.02.01.01.0052', nama_rekening: 'Belanja Makanan dan Minuman Rapat', jenis_belanja: 'Belanja Barang dan Jasa' },
    { id: 4, kode_rekening: '5.1.02.02.01.0003', nama_rekening: 'Belanja Honorarium Narasumber atau Pembahas', jenis_belanja: 'Belanja Barang dan Jasa' },
    { id: 5, kode_rekening: '5.2.02.05.01.0005', nama_rekening: 'Belanja Modal Peralatan Komputer - Personal Computer', jenis_belanja: 'Belanja Modal' },
    { id: 6, kode_rekening: '5.1.02.03.01.0010', nama_rekening: 'Belanja Pemeliharaan Peralatan dan Mesin - Kendaraan Bermotor', jenis_belanja: 'Belanja Pemeliharaan' }
  ]);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgramFilter, setSelectedProgramFilter] = useState<number | ''>('');
  const [selectedKegiatanFilter, setSelectedKegiatanFilter] = useState<number | ''>('');

  // Alerts & Modals
  const [alertMsg, setAlertMsg] = useState<{ type: 'success' | 'error'; text: string } | null>({
    type: 'success',
    text: 'Modul Master Data Anggaran (Tahap 3) Siap Digunakan. Uji coba fitur CRUD, Relasi Cascading, & Validasi Kode Unik.'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editId, setEditId] = useState<number | null>(null);

  // Form Fields State
  const [formProgram, setFormProgram] = useState({ kode: '', nama: '', tahun: '2026' });
  const [formKegiatan, setFormKegiatan] = useState({ program_id: 1, kode: '', nama: '' });
  const [formSub, setFormSub] = useState({ program_id: 1, kegiatan_id: 1, kode: '', nama: '' });
  const [formRekening, setFormRekening] = useState({ kode: '', nama: '', jenis: 'Belanja Barang dan Jasa' });

  // Cascading Filter Logic
  const filteredKegiatansForSelect = selectedProgramFilter
    ? kegiatans.filter(k => k.program_id === Number(selectedProgramFilter))
    : kegiatans;

  const handleOpenAdd = () => {
    setModalMode('create');
    setEditId(null);
    setFormProgram({ kode: '', nama: '', tahun: '2026' });
    setFormKegiatan({ program_id: programs[0]?.id || 1, kode: '', nama: '' });
    setFormSub({ program_id: programs[0]?.id || 1, kegiatan_id: kegiatans[0]?.id || 1, kode: '', nama: '' });
    setFormRekening({ kode: '', nama: '', jenis: 'Belanja Barang dan Jasa' });
    setIsModalOpen(true);
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formProgram.kode || !formProgram.nama) {
      setAlertMsg({ type: 'error', text: 'Kode Program dan Nama Program wajib diisi!' });
      return;
    }

    // Unique Code Validation
    const isDup = programs.some(p => p.kode_program.toLowerCase() === formProgram.kode.toLowerCase() && p.id !== editId);
    if (isDup) {
      setAlertMsg({ type: 'error', text: `Kode Program '${formProgram.kode}' sudah digunakan!` });
      return;
    }

    if (modalMode === 'create') {
      const newP: ProgramItem = {
        id: Date.now(),
        kode_program: formProgram.kode,
        nama_program: formProgram.nama,
        tahun_anggaran: formProgram.tahun
      };
      setPrograms([...programs, newP]);
      setAlertMsg({ type: 'success', text: `Program '${newP.kode_program}' berhasil ditambahkan.` });
    } else {
      setPrograms(programs.map(p => p.id === editId ? {
        ...p,
        kode_program: formProgram.kode,
        nama_program: formProgram.nama,
        tahun_anggaran: formProgram.tahun
      } : p));
      setAlertMsg({ type: 'success', text: `Program '${formProgram.kode}' berhasil diperbarui.` });
    }
    setIsModalOpen(false);
  };

  const handleDeleteProgram = (id: number, kode: string) => {
    // Check Child Dependency
    const hasKegiatan = kegiatans.some(k => k.program_id === id);
    if (hasKegiatan) {
      alert(`GAGAL HAPUS (FK Protection): Program '${kode}' masih memiliki Kegiatan turunan! Hapus Kegiatan terlebih dahulu.`);
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus Program '${kode}'?`)) {
      setPrograms(programs.filter(p => p.id !== id));
      setAlertMsg({ type: 'success', text: `Program '${kode}' berhasil dihapus.` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-900">Master Data Anggaran (Tahap 3)</h2>
            <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-800 text-[10px] font-bold rounded-full">
              Hierarki Permendagri / DPA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Program → Kegiatan → Sub-Kegiatan → Rekening Belanja. Dilengkapi Cascading Filter, Validasi Kode Unik, & Protection Delete.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => alert('Simulasi Import Excel (.xlsx) Data DPA Anggaran... File berhasil divalidasi & di-import.')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Excel</span>
          </button>
          <button
            onClick={() => alert('Simulasi Export Excel Master Data Anggaran DPA 2026... File downloaded.')}
            className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
          <button
            onClick={() => alert('Simulasi Cetak PDF Laporan Master Anggaran DPA 2026...')}
            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold rounded-xl border border-rose-200 flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {alertMsg && (
        <div className={`p-4 rounded-xl border text-xs flex items-center justify-between font-semibold ${
          alertMsg.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          <div className="flex items-center gap-2">
            {alertMsg.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{alertMsg.text}</span>
          </div>
          <button onClick={() => setAlertMsg(null)} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>
      )}

      {/* Sub Tabs Navigation */}
      <div className="flex bg-slate-200 p-1 rounded-xl gap-1 font-bold text-xs">
        <button
          onClick={() => { setActiveSubTab('program'); setSearchTerm(''); }}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'program' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>1. Program ({programs.length})</span>
        </button>

        <button
          onClick={() => { setActiveSubTab('kegiatan'); setSearchTerm(''); }}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'kegiatan' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>2. Kegiatan ({kegiatans.length})</span>
        </button>

        <button
          onClick={() => { setActiveSubTab('subkegiatan'); setSearchTerm(''); }}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'subkegiatan' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          <span>3. Sub-Kegiatan ({subKegiatans.length})</span>
        </button>

        <button
          onClick={() => { setActiveSubTab('rekening'); setSearchTerm(''); }}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTab === 'rekening' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>4. Rekening Belanja ({rekenings.length})</span>
        </button>
      </div>

      {/* Action & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Cari dalam ${activeSubTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Cascading Filter for Sub-Kegiatan */}
          {(activeSubTab === 'kegiatan' || activeSubTab === 'subkegiatan') && (
            <select
              value={selectedProgramFilter}
              onChange={(e) => setSelectedProgramFilter(e.target.value ? Number(e.target.value) : '')}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
            >
              <option value="">-- All Program Parent --</option>
              {programs.map(p => (
                <option key={p.id} value={p.id}>[{p.kode_program}] {p.nama_program.slice(0, 30)}...</option>
              ))}
            </select>
          )}

          {activeSubTab === 'subkegiatan' && (
            <select
              value={selectedKegiatanFilter}
              onChange={(e) => setSelectedKegiatanFilter(e.target.value ? Number(e.target.value) : '')}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
            >
              <option value="">-- All Kegiatan Parent --</option>
              {filteredKegiatansForSelect.map(k => (
                <option key={k.id} value={k.id}>[{k.kode_kegiatan}] {k.nama_kegiatan.slice(0, 30)}...</option>
              ))}
            </select>
          )}
        </div>

        <button
          onClick={handleOpenAdd}
          className="w-full sm:w-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data {activeSubTab.toUpperCase()}</span>
        </button>
      </div>

      {/* Main Table Content based on Tab */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {activeSubTab === 'program' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-32">Kode Program</th>
                  <th className="px-4 py-3">Nama Program Anggaran DPA</th>
                  <th className="px-4 py-3 text-center">Jml Kegiatan</th>
                  <th className="px-4 py-3 text-center">Tahun</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {programs
                  .filter(p => p.kode_program.toLowerCase().includes(searchTerm.toLowerCase()) || p.nama_program.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(p => {
                    const countKeg = kegiatans.filter(k => k.program_id === p.id).length;
                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {p.kode_program}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{p.nama_program}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-mono text-[10px] font-bold border">
                            {countKeg} Kegiatan
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center font-mono">{p.tahun_anggaran}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setModalMode('edit');
                                setEditId(p.id);
                                setFormProgram({ kode: p.kode_program, nama: p.nama_program, tahun: p.tahun_anggaran });
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                              title="Edit Program"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProgram(p.id, p.kode_program)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                              title="Hapus Program"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'kegiatan' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-36">Kode Kegiatan</th>
                  <th className="px-4 py-3">Program Induk (Level 1)</th>
                  <th className="px-4 py-3">Nama Kegiatan</th>
                  <th className="px-4 py-3 text-center">Sub-Kegiatan</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {kegiatans
                  .filter(k => {
                    const matchSearch = k.kode_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) || k.nama_kegiatan.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchPrg = selectedProgramFilter ? k.program_id === Number(selectedProgramFilter) : true;
                    return matchSearch && matchPrg;
                  })
                  .map(k => {
                    const prg = programs.find(p => p.id === k.program_id);
                    const countSub = subKegiatans.filter(s => s.kegiatan_id === k.id).length;
                    return (
                      <tr key={k.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {k.kode_kegiatan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800 text-[11px]">{prg?.kode_program}</div>
                          <div className="text-[10px] text-slate-500 truncate max-w-xs">{prg?.nama_program}</div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{k.nama_kegiatan}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-mono text-[10px] font-bold border border-emerald-200">
                            {countSub} Sub
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setModalMode('edit');
                                setEditId(k.id);
                                setFormKegiatan({ program_id: k.program_id, kode: k.kode_kegiatan, nama: k.nama_kegiatan });
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (subKegiatans.some(s => s.kegiatan_id === k.id)) {
                                  alert(`GAGAL HAPUS (FK Protection): Kegiatan '${k.kode_kegiatan}' masih memiliki Sub-Kegiatan!`);
                                  return;
                                }
                                if (confirm(`Hapus kegiatan '${k.kode_kegiatan}'?`)) {
                                  setKegiatans(kegiatans.filter(x => x.id !== k.id));
                                  setAlertMsg({ type: 'success', text: 'Kegiatan berhasil dihapus.' });
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'subkegiatan' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-40">Kode Sub-Kegiatan</th>
                  <th className="px-4 py-3">Hierarki Parent (Prog & Kegiatan)</th>
                  <th className="px-4 py-3">Nama Sub-Kegiatan DPA</th>
                  <th className="px-4 py-3 text-center">Paket Dialokasi</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subKegiatans
                  .filter(s => {
                    const matchSearch = s.kode_sub_kegiatan.toLowerCase().includes(searchTerm.toLowerCase()) || s.nama_sub_kegiatan.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchPrg = selectedProgramFilter ? s.program_id === Number(selectedProgramFilter) : true;
                    const matchKeg = selectedKegiatanFilter ? s.kegiatan_id === Number(selectedKegiatanFilter) : true;
                    return matchSearch && matchPrg && matchKeg;
                  })
                  .map(s => {
                    const prg = programs.find(p => p.id === s.program_id);
                    const keg = kegiatans.find(k => k.id === s.kegiatan_id);
                    return (
                      <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                            {s.kode_sub_kegiatan}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-800 text-[11px]">[{keg?.kode_kegiatan}] {keg?.nama_kegiatan}</div>
                          <div className="text-[10px] text-slate-500">Prog: {prg?.nama_program}</div>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">{s.nama_sub_kegiatan}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full font-mono text-[10px] font-bold border border-amber-200">
                            14 Paket Aktif
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setModalMode('edit');
                                setEditId(s.id);
                                setFormSub({ program_id: s.program_id, kegiatan_id: s.kegiatan_id, kode: s.kode_sub_kegiatan, nama: s.nama_sub_kegiatan });
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus Sub-Kegiatan '${s.kode_sub_kegiatan}'?`)) {
                                  setSubKegiatans(subKegiatans.filter(x => x.id !== s.id));
                                  setAlertMsg({ type: 'success', text: 'Sub-Kegiatan berhasil dihapus.' });
                                }
                              }}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}

        {activeSubTab === 'rekening' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-44">Kode Rekening</th>
                  <th className="px-4 py-3">Nama Rekening Belanja DPA</th>
                  <th className="px-4 py-3">Jenis Belanja</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rekenings
                  .filter(r => r.kode_rekening.toLowerCase().includes(searchTerm.toLowerCase()) || r.nama_rekening.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-700 bg-indigo-50/50">
                        {r.kode_rekening}
                      </td>
                      <td className="px-4 py-3 font-bold text-slate-900">{r.nama_rekening}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-mono text-[10px] font-bold border">
                          {r.jenis_belanja}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setModalMode('edit');
                              setEditId(r.id);
                              setFormRekening({ kode: r.kode_rekening, nama: r.nama_rekening, jenis: r.jenis_belanja });
                              setIsModalOpen(true);
                            }}
                            className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus Rekening '${r.kode_rekening}'?`)) {
                                setRekenings(rekenings.filter(x => x.id !== r.id));
                                setAlertMsg({ type: 'success', text: 'Rekening Belanja berhasil dihapus.' });
                              }
                            }}
                            className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Dialog Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              {modalMode === 'create' ? 'Tambah Data' : 'Edit Data'} - {activeSubTab.toUpperCase()}
            </h3>

            {activeSubTab === 'program' && (
              <form onSubmit={handleSaveProgram} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Kode Program *</label>
                  <input
                    type="text"
                    required
                    value={formProgram.kode}
                    onChange={(e) => setFormProgram({ ...formProgram, kode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    placeholder="cth: 1.02.04"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Nama Program Anggaran *</label>
                  <textarea
                    required
                    rows={3}
                    value={formProgram.nama}
                    onChange={(e) => setFormProgram({ ...formProgram, nama: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                    placeholder="Nama Program..."
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Tahun Anggaran</label>
                  <input
                    type="text"
                    value={formProgram.tahun}
                    onChange={(e) => setFormProgram({ ...formProgram, tahun: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl shadow-md">Simpan Program</button>
                </div>
              </form>
            )}

            {activeSubTab === 'kegiatan' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalMode === 'create') {
                  setKegiatans([...kegiatans, { id: Date.now(), program_id: formKegiatan.program_id, kode_kegiatan: formKegiatan.kode, nama_kegiatan: formKegiatan.nama }]);
                } else {
                  setKegiatans(kegiatans.map(k => k.id === editId ? { ...k, program_id: formKegiatan.program_id, kode_kegiatan: formKegiatan.kode, nama_kegiatan: formKegiatan.nama } : k));
                }
                setIsModalOpen(false);
                setAlertMsg({ type: 'success', text: 'Data Kegiatan berhasil disimpan.' });
              }} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Program Induk Parent *</label>
                  <select
                    value={formKegiatan.program_id}
                    onChange={(e) => setFormKegiatan({ ...formKegiatan, program_id: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    {programs.map(p => (
                      <option key={p.id} value={p.id}>[{p.kode_program}] {p.nama_program}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Kode Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={formKegiatan.kode}
                    onChange={(e) => setFormKegiatan({ ...formKegiatan, kode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Nama Kegiatan *</label>
                  <textarea
                    required
                    rows={2}
                    value={formKegiatan.nama}
                    onChange={(e) => setFormKegiatan({ ...formKegiatan, nama: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="pt-3 border-t flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Simpan Kegiatan</button>
                </div>
              </form>
            )}

            {activeSubTab === 'subkegiatan' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalMode === 'create') {
                  setSubKegiatans([...subKegiatans, { id: Date.now(), program_id: formSub.program_id, kegiatan_id: formSub.kegiatan_id, kode_sub_kegiatan: formSub.kode, nama_sub_kegiatan: formSub.nama }]);
                } else {
                  setSubKegiatans(subKegiatans.map(s => s.id === editId ? { ...s, program_id: formSub.program_id, kegiatan_id: formSub.kegiatan_id, kode_sub_kegiatan: formSub.kode, nama_sub_kegiatan: formSub.nama } : s));
                }
                setIsModalOpen(false);
                setAlertMsg({ type: 'success', text: 'Data Sub-Kegiatan berhasil disimpan.' });
              }} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Kegiatan Parent *</label>
                  <select
                    value={formSub.kegiatan_id}
                    onChange={(e) => {
                      const kgId = Number(e.target.value);
                      const kgObj = kegiatans.find(k => k.id === kgId);
                      setFormSub({ ...formSub, kegiatan_id: kgId, program_id: kgObj?.program_id || 1 });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    {kegiatans.map(k => (
                      <option key={k.id} value={k.id}>[{k.kode_kegiatan}] {k.nama_kegiatan}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">Kode Sub-Kegiatan *</label>
                  <input
                    type="text"
                    required
                    value={formSub.kode}
                    onChange={(e) => setFormSub({ ...formSub, kode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Nama Sub-Kegiatan *</label>
                  <textarea
                    required
                    rows={2}
                    value={formSub.nama}
                    onChange={(e) => setFormSub({ ...formSub, nama: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div className="pt-3 border-t flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Simpan Sub-Kegiatan</button>
                </div>
              </form>
            )}

            {activeSubTab === 'rekening' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                if (modalMode === 'create') {
                  setRekenings([...rekenings, { id: Date.now(), kode_rekening: formRekening.kode, nama_rekening: formRekening.nama, jenis_belanja: formRekening.jenis }]);
                } else {
                  setRekenings(rekenings.map(r => r.id === editId ? { ...r, kode_rekening: formRekening.kode, nama_rekening: formRekening.nama, jenis_belanja: formRekening.jenis } : r));
                }
                setIsModalOpen(false);
                setAlertMsg({ type: 'success', text: 'Data Rekening Belanja berhasil disimpan.' });
              }} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">Kode Rekening Belanja *</label>
                  <input
                    type="text"
                    required
                    value={formRekening.kode}
                    onChange={(e) => setFormRekening({ ...formRekening, kode: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    placeholder="5.1.02.01.01.0024"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Nama Rekening Belanja *</label>
                  <textarea
                    required
                    rows={2}
                    value={formRekening.nama}
                    onChange={(e) => setFormRekening({ ...formRekening, nama: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">Jenis Belanja</label>
                  <select
                    value={formRekening.jenis}
                    onChange={(e) => setFormRekening({ ...formRekening, jenis: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="Belanja Barang dan Jasa">Belanja Barang dan Jasa</option>
                    <option value="Belanja Modal">Belanja Modal</option>
                    <option value="Belanja Pegawai">Belanja Pegawai</option>
                    <option value="Belanja Pemeliharaan">Belanja Pemeliharaan</option>
                  </select>
                </div>
                <div className="pt-3 border-t flex justify-end gap-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold">Simpan Rekening</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
