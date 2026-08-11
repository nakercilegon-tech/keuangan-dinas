import React from 'react';
import { ERD_TEXT, RELATIONS_LIST } from '../data/databaseInfo';
import { ArrowRight, Database, Server, Key, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ErdView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner Overview */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Database className="w-3.5 h-3.5" />
              <span>Arsitektur Fondasi Tahap 1 Selesai</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS
            </h2>
            <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
              Database <strong className="text-indigo-300 font-mono">db_keuangan_uptd</strong> dirancang dengan 14 tabel relational InnoDB, dukungan multi-rekening pekerjaan, jejak audit, validasi keuangan bertingkat, dan kalkulasi otomatis pajak PPN/PPh.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 p-3 rounded-xl text-center">
              <div className="text-2xl font-extrabold text-indigo-400">14</div>
              <div className="text-[11px] text-slate-400 font-medium">Tabel Utama</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 p-3 rounded-xl text-center">
              <div className="text-2xl font-extrabold text-emerald-400">13</div>
              <div className="text-[11px] text-slate-400 font-medium">Relasi Foreign Key</div>
            </div>
            <div className="bg-slate-800/80 backdrop-blur border border-slate-700/80 p-3 rounded-xl text-center col-span-2 sm:col-span-1">
              <div className="text-2xl font-extrabold text-amber-400">2026</div>
              <div className="text-[11px] text-slate-400 font-medium">Tahun Anggaran</div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Flow Relasi Utama */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-indigo-600" />
              <span>Alur Relasi Bertingkat (Hierarki Keuangan)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Struktur cascading dari Program Anggaran hingga Potongan Pajak Pembayaran
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
          {[
            { step: '1', title: 'PROGRAM', code: 'program', bg: 'bg-blue-600' },
            { step: '2', title: 'KEGIATAN', code: 'kegiatan', bg: 'bg-indigo-600' },
            { step: '3', title: 'SUB KEGIATAN', code: 'sub_kegiatan', bg: 'bg-violet-600' },
            { step: '4', title: 'PAKET PEKERJAAN', code: 'paket_pekerjaan', bg: 'bg-purple-600' },
            { step: '5', title: 'PAKET REKENING', code: 'paket_pekerjaan_rekening', bg: 'bg-fuchsia-600' },
            { step: '6', title: 'REKENING BELANJA', code: 'rekening_belanja', bg: 'bg-pink-600' },
            { step: '7', title: 'REALISASI & SP', code: 'realisasi', bg: 'bg-rose-600' },
            { step: '8', title: 'PEMBAYARAN', code: 'pembayaran', bg: 'bg-amber-600' },
            { step: '9', title: 'PAJAK (PPN/PPh)', code: 'pajak', bg: 'bg-emerald-600' }
          ].map((item, idx, arr) => (
            <React.Fragment key={item.code}>
              <div className="flex flex-col items-center p-2.5 bg-white rounded-lg border border-slate-200 shadow-xs min-w-[120px]">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${item.bg} mb-1`}>
                  Tahap {item.step}
                </span>
                <span className="text-xs font-bold text-slate-800">{item.title}</span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5">`{item.code}`</span>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ERD Diagram Teks Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-950 rounded-2xl border border-slate-800 p-5 text-slate-200 shadow-md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Diagram ERD Teks Resmi</span>
            </h3>
            <span className="text-[11px] font-mono bg-slate-900 text-slate-400 px-2.5 py-1 rounded border border-slate-800">
              InnoDB / utf8mb4_unicode_ci
            </span>
          </div>

          <pre className="font-mono text-xs text-emerald-400 bg-slate-900/90 p-4 rounded-xl overflow-x-auto leading-relaxed border border-slate-800">
            {ERD_TEXT}
          </pre>
        </div>

        {/* Foreign Key Constraints Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              <span>Aturan Foreign Key & Relasi</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Daftar integritas referensial antar tabel</p>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {RELATIONS_LIST.map((rel, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-700">{rel.fromTable}.{rel.fromCol}</span>
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 font-mono text-[10px] rounded">
                    {rel.type}
                  </span>
                  <span className="font-mono font-bold text-emerald-700">{rel.toTable}.{rel.toCol}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <span><strong>ON DELETE CASCADE:</strong> Penghapusan otomatis pada kegiatan/sub-kegiatan & item rincian.</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>ON DELETE RESTRICT:</strong> Mencegah penghapusan master jika masih terhubung dengan transaksi.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
