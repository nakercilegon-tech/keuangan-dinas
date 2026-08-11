import React, { useState, useEffect } from 'react';
import { TaxResult } from '../types';
import { Calculator, CheckSquare, Square, RefreshCw, DollarSign, ShieldCheck } from 'lucide-react';

export const TaxCalculator: React.FC = () => {
  const [nilaiPembayaran, setNilaiPembayaran] = useState<number>(60000000);
  const [pph21Manual, setPph21Manual] = useState<number>(0);

  // Active Tax Toggle States
  const [applyPpn, setApplyPpn] = useState<boolean>(true);
  const [applyPph21, setApplyPph21] = useState<boolean>(false);
  const [applyPph22, setApplyPph22] = useState<boolean>(false);
  const [applyPph23Jasa, setApplyPph23Jasa] = useState<boolean>(false);
  const [applyPph23Makan, setApplyPph23Makan] = useState<boolean>(true);

  const [taxResult, setTaxResult] = useState<TaxResult>({
    nilai_pembayaran: 60000000,
    dpp: 54054054.05,
    ppn: 5945945.95,
    pph21: 0,
    pph22: 0,
    pph23_jasa: 0,
    pph23_makan: 1200000,
    total_pajak: 7145945.95,
    nilai_bersih: 52854054.05
  });

  useEffect(() => {
    const nilai = Math.max(0, nilaiPembayaran);
    const dpp = nilai / 1.11;

    const ppn = applyPpn ? Math.round((dpp * 0.11) * 100) / 100 : 0;
    const pph21 = applyPph21 ? Math.round(pph21Manual * 100) / 100 : 0;
    const pph22 = applyPph22 ? Math.round((dpp * 0.015) * 100) / 100 : 0;
    const pph23_jasa = applyPph23Jasa ? Math.round((dpp * 0.02) * 100) / 100 : 0;
    const pph23_makan = applyPph23Makan ? Math.round((nilai * 0.02) * 100) / 100 : 0;

    const total_pajak = Math.round((ppn + pph21 + pph22 + pph23_jasa + pph23_makan) * 100) / 100;
    const nilai_bersih = Math.round((nilai - total_pajak) * 100) / 100;

    setTaxResult({
      nilai_pembayaran: nilai,
      dpp: Math.round(dpp * 100) / 100,
      ppn,
      pph21,
      pph22,
      pph23_jasa,
      pph23_makan,
      total_pajak,
      nilai_bersih
    });
  }, [nilaiPembayaran, pph21Manual, applyPpn, applyPph21, applyPph22, applyPph23Jasa, applyPph23Makan]);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 2 }).format(val);
  };

  const presetPembayaran = (val: number, jenis: 'makan' | 'barang' | 'jasa') => {
    setNilaiPembayaran(val);
    if (jenis === 'makan') {
      setApplyPpn(true);
      setApplyPph21(false);
      setApplyPph22(false);
      setApplyPph23Jasa(false);
      setApplyPph23Makan(true);
    } else if (jenis === 'barang') {
      setApplyPpn(true);
      setApplyPph21(false);
      setApplyPph22(true);
      setApplyPph23Jasa(false);
      setApplyPph23Makan(false);
    } else if (jenis === 'jasa') {
      setApplyPpn(true);
      setApplyPph21(false);
      setApplyPph22(false);
      setApplyPph23Jasa(true);
      setApplyPph23Makan(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <span>Simulasi Kalkulator Pajak Resmi (KONTRAK PROYEK)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Perhitungan PPN 11%, PPh 21, PPh 22 (1.5%), PPh 23 Jasa (2%), & PPh 23 Makan (2%) secara realtime
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => presetPembayaran(60000000, 'makan')}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-semibold border border-indigo-200"
            >
              Preset Makanan/Catering (Rp 60jt)
            </button>
            <button
              onClick={() => presetPembayaran(82500000, 'barang')}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200"
            >
              Preset Pengadaan Laptop (Rp 82.5jt)
            </button>
            <button
              onClick={() => presetPembayaran(45000000, 'jasa')}
              className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold border border-purple-200"
            >
              Preset Jasa Servis (Rp 45jt)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs Controls */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>Input Transaksi & Komponen Pajak</span>
            <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">Realtime</span>
          </h3>

          {/* Nilai Pembayaran */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Nilai Pembayaran Kotor (Rp)</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Rp</span>
              <input
                type="number"
                value={nilaiPembayaran}
                onChange={(e) => setNilaiPembayaran(Number(e.target.value))}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Dasar Pengenaan Pajak (DPP) = {formatRupiah(taxResult.dpp)}
            </p>
          </div>

          {/* Checklist Komponen Pajak */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-700 block">Pilih Jenis Potongan Pajak:</label>

            {/* PPN */}
            <div
              onClick={() => setApplyPpn(!applyPpn)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                applyPpn ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {applyPpn ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="text-xs font-bold block">PPN (11%)</span>
                  <span className="text-[10px] text-slate-500 font-mono">(Nilai / 1,11) × 11%</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700">{formatRupiah(taxResult.ppn)}</span>
            </div>

            {/* PPh 21 */}
            <div className="space-y-2 p-3 rounded-xl border bg-slate-50 border-slate-200">
              <div
                onClick={() => setApplyPph21(!applyPph21)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {applyPph21 ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                  <div>
                    <span className="text-xs font-bold block">PPh 21 (Honor/Pegawai)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Input Manual Nominal</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-indigo-700">{formatRupiah(taxResult.pph21)}</span>
              </div>

              {applyPph21 && (
                <div className="pt-2">
                  <input
                    type="number"
                    placeholder="Masukkan nominal PPh 21 manual"
                    value={pph21Manual}
                    onChange={(e) => setPph21Manual(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}
            </div>

            {/* PPh 22 */}
            <div
              onClick={() => setApplyPph22(!applyPph22)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                applyPph22 ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {applyPph22 ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="text-xs font-bold block">PPh 22 (Barang)</span>
                  <span className="text-[10px] text-slate-500 font-mono">(Nilai / 1,11) × 1,5%</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700">{formatRupiah(taxResult.pph22)}</span>
            </div>

            {/* PPh 23 Jasa */}
            <div
              onClick={() => setApplyPph23Jasa(!applyPph23Jasa)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                applyPph23Jasa ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {applyPph23Jasa ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="text-xs font-bold block">PPh 23 Jasa (2%)</span>
                  <span className="text-[10px] text-slate-500 font-mono">(Nilai / 1,11) × 2%</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700">{formatRupiah(taxResult.pph23_jasa)}</span>
            </div>

            {/* PPh 23 Makan */}
            <div
              onClick={() => setApplyPph23Makan(!applyPph23Makan)}
              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                applyPph23Makan ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {applyPph23Makan ? <CheckSquare className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                <div>
                  <span className="text-xs font-bold block">PPh 23 Makanan & Minuman (2%)</span>
                  <span className="text-[10px] text-slate-500 font-mono">Nilai Pembayaran × 2%</span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-indigo-700">{formatRupiah(taxResult.pph23_makan)}</span>
            </div>
          </div>
        </div>

        {/* Right Output Summary Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-2xl border border-slate-800 p-6 text-white shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-bold tracking-wider uppercase text-slate-400">Ringkasan Pencairan Dana</span>
              <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-300 px-2.5 py-1 rounded-full border border-indigo-500/30">
                Formula Sesuai Kontrak
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block mb-1">Total Potongan Pajak</span>
                <span className="text-2xl font-mono font-extrabold text-rose-400">
                  {formatRupiah(taxResult.total_pajak)}
                </span>
              </div>

              <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-500/30">
                <span className="text-xs text-emerald-300 block mb-1">Nilai Bersih Diterima Penyedia</span>
                <span className="text-2xl font-mono font-extrabold text-emerald-400">
                  {formatRupiah(taxResult.nilai_bersih)}
                </span>
              </div>
            </div>

            {/* Detailed Table */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 block">Rincian Perhitungan Pajak:</span>
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden">
                <table className="w-full text-xs text-left font-mono">
                  <tbody className="divide-y divide-slate-800">
                    <tr>
                      <td className="px-4 py-2.5 text-slate-400">Nilai Pembayaran Kotor</td>
                      <td className="px-4 py-2.5 text-right font-bold text-white">{formatRupiah(taxResult.nilai_pembayaran)}</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 text-slate-400">DPP (Dasar Pengenaan Pajak)</td>
                      <td className="px-4 py-2.5 text-right text-slate-300">{formatRupiah(taxResult.dpp)}</td>
                    </tr>
                    {taxResult.ppn > 0 && (
                      <tr>
                        <td className="px-4 py-2.5 text-slate-400">PPN 11%</td>
                        <td className="px-4 py-2.5 text-right text-indigo-400">+{formatRupiah(taxResult.ppn)}</td>
                      </tr>
                    )}
                    {taxResult.pph21 > 0 && (
                      <tr>
                        <td className="px-4 py-2.5 text-slate-400">PPh 21 (Manual)</td>
                        <td className="px-4 py-2.5 text-right text-purple-400">+{formatRupiah(taxResult.pph21)}</td>
                      </tr>
                    )}
                    {taxResult.pph22 > 0 && (
                      <tr>
                        <td className="px-4 py-2.5 text-slate-400">PPh 22 (1.5%)</td>
                        <td className="px-4 py-2.5 text-right text-blue-400">+{formatRupiah(taxResult.pph22)}</td>
                      </tr>
                    )}
                    {taxResult.pph23_jasa > 0 && (
                      <tr>
                        <td className="px-4 py-2.5 text-slate-400">PPh 23 Jasa (2%)</td>
                        <td className="px-4 py-2.5 text-right text-amber-400">+{formatRupiah(taxResult.pph23_jasa)}</td>
                      </tr>
                    )}
                    {taxResult.pph23_makan > 0 && (
                      <tr>
                        <td className="px-4 py-2.5 text-slate-400">PPh 23 Makanan & Minuman (2%)</td>
                        <td className="px-4 py-2.5 text-right text-amber-400">+{formatRupiah(taxResult.pph23_makan)}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-800/80 font-bold">
                      <td className="px-4 py-3 text-white">TOTAL PAJAK</td>
                      <td className="px-4 py-3 text-right text-rose-400">{formatRupiah(taxResult.total_pajak)}</td>
                    </tr>
                    <tr className="bg-emerald-900/30 font-bold">
                      <td className="px-4 py-3 text-emerald-300">NILAI BERSIH TRANSFER</td>
                      <td className="px-4 py-3 text-right text-emerald-400">{formatRupiah(taxResult.nilai_bersih)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
