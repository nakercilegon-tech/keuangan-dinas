import React, { useState } from 'react';
import { SAMPLE_SEED_DATA } from '../data/databaseInfo';
import { Users, FileText, Building2, PackageCheck, Receipt, DollarSign } from 'lucide-react';

export const SeedExplorerView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'users' | 'program' | 'penyedia' | 'paket' | 'pajak'>('paket');

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>Penjelajah Data Sampel (Tahun Anggaran 2026)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Data sampel yang siap diimport ke database <strong className="font-mono text-indigo-600">db_keuangan_uptd</strong>
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          {[
            { id: 'paket', label: 'Paket Pekerjaan 2026', icon: PackageCheck, count: SAMPLE_SEED_DATA.paket_pekerjaan.length },
            { id: 'pajak', label: 'Pembayaran & Pajak', icon: Receipt, count: SAMPLE_SEED_DATA.pembayaran_pajak.length },
            { id: 'penyedia', label: 'Penyedia / Vendor', icon: Building2, count: SAMPLE_SEED_DATA.penyedia.length },
            { id: 'program', label: 'Program Anggaran', icon: DollarSign, count: SAMPLE_SEED_DATA.program.length },
            { id: 'users', label: 'Users & Roles', icon: Users, count: SAMPLE_SEED_DATA.users.length }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] ${isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'}`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Tables */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {activeSection === 'paket' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Daftar Paket Pekerjaan Tahun 2026</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">No. Paket</th>
                    <th className="px-4 py-3">Nama Paket Pekerjaan</th>
                    <th className="px-4 py-3">Pagu Paket</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SAMPLE_SEED_DATA.paket_pekerjaan.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono font-bold text-indigo-600">{p.nomor_paket}</td>
                      <td className="px-4 py-3 font-medium text-slate-800">{p.nama_paket}</td>
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{formatRupiah(p.pagu_paket)}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          p.status === 'selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'pajak' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Data Sampel Pembayaran & Tax Deductions</h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase">
                  <tr>
                    <th className="px-4 py-3">No. Transaksi</th>
                    <th className="px-4 py-3">Tanggal</th>
                    <th className="px-4 py-3">Nilai Pembayaran</th>
                    <th className="px-4 py-3">PPN (11%)</th>
                    <th className="px-4 py-3">Potongan Lain</th>
                    <th className="px-4 py-3">Total Pajak</th>
                    <th className="px-4 py-3">Nilai Bersih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {SAMPLE_SEED_DATA.pembayaran_pajak.map((pj) => (
                    <tr key={pj.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-bold text-indigo-600">{pj.nomor_transaksi}</td>
                      <td className="px-4 py-3 font-sans text-slate-600">{pj.tanggal}</td>
                      <td className="px-4 py-3 font-bold text-slate-900">{formatRupiah(pj.nilai)}</td>
                      <td className="px-4 py-3 text-emerald-600">{formatRupiah(pj.ppn)}</td>
                      <td className="px-4 py-3 text-purple-600">
                        {pj.pph23_makan ? `PPh23 Makan: ${formatRupiah(pj.pph23_makan)}` : `PPh22: ${formatRupiah(pj.pph22 || 0)}`}
                      </td>
                      <td className="px-4 py-3 text-rose-600 font-bold">{formatRupiah(pj.total_pajak)}</td>
                      <td className="px-4 py-3 text-indigo-700 font-bold bg-indigo-50/50">{formatRupiah(pj.bersih)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'penyedia' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Data Master Penyedia / Vendor</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_SEED_DATA.penyedia.map((vendor) => (
                <div key={vendor.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">{vendor.nama_perusahaan}</div>
                  <div className="text-xs text-slate-600">Penanggung Jawab: <strong>{vendor.nama_penyedia}</strong></div>
                  <div className="text-xs font-mono bg-white p-2 rounded border border-slate-200 text-indigo-700">
                    NPWP: {vendor.npwp}
                  </div>
                  <div className="text-xs text-slate-500">{vendor.bank}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'program' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Master Program Anggaran Tahun 2026</h3>
            <div className="space-y-2">
              {SAMPLE_SEED_DATA.program.map((prog) => (
                <div key={prog.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-mono text-xs font-bold text-indigo-600">{prog.kode_program}</span>
                    <p className="text-xs font-semibold text-slate-800">{prog.nama_program}</p>
                  </div>
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 font-mono text-xs rounded-full font-bold">
                    TA {prog.tahun_anggaran}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'users' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Data Pengguna & Role Akses</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_SEED_DATA.users.map((u) => (
                <div key={u.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-indigo-600">@{u.username}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : u.role === 'OPERATOR' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-800">{u.nama_lengkap}</div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                  <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2">
                    Default Pass: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">{u.username}123</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
