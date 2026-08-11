import React, { useState } from 'react';
import { 
  FileUp, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Building2, 
  Table, 
  Database,
  FileCheck,
  RefreshCw
} from 'lucide-react';

interface ImportRow {
  line: number;
  data: string[];
  status: 'VALID' | 'ERROR';
  errors: string[];
}

export const ImportExportView: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('program');
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [importCompleted, setImportCompleted] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>('Draft_Master_Import_2026.xlsx');
  const [notification, setNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);

  // Sample Validation Result Data
  const previewRows: ImportRow[] = [
    {
      line: 2,
      data: ['1.02.01', 'Program Dukungan Manajemen UPTD Latihan Kerja'],
      status: 'VALID',
      errors: []
    },
    {
      line: 3,
      data: ['1.02.02', 'Program Pengelolaan Keuangan & Aset UPTD'],
      status: 'VALID',
      errors: []
    },
    {
      line: 4,
      data: ['', 'Program Tanpa Kode'],
      status: 'ERROR',
      errors: ['Kolom "kode_program" wajib diisi & tidak boleh kosong.']
    },
    {
      line: 5,
      data: ['1.02.03', 'Program Layanan Teknis Operasional UPTD'],
      status: 'VALID',
      errors: []
    },
    {
      line: 6,
      data: ['1.02.04', 'Program Pengembangan Sarana Pelatihan Kerja'],
      status: 'VALID',
      errors: []
    }
  ];

  const validCount = previewRows.filter(r => r.status === 'VALID').length;
  const errorCount = previewRows.filter(r => r.status === 'ERROR').length;

  const showToast = (type: 'success' | 'info' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setIsUploaded(true);
      setImportCompleted(false);
      showToast('info', `File ${e.target.files[0].name} berhasil dibaca. Menampilkan hasil validasi preview...`);
    }
  };

  const handleExecuteImport = () => {
    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      setImportCompleted(true);
      showToast('success', `Berhasil mengimpor ${validCount} baris data ${selectedEntity.toUpperCase()} ke database db_keuangan_uptd!`);
    }, 1500);
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
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-emerald-500/20">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30">
                TAHAP 10 • BULK IMPORT & EXPORT CENTER
              </span>
              <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full border border-indigo-500/30">
                PhpSpreadsheet & DomPDF/TCPDF
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <FileSpreadsheet className="w-7 h-7 text-emerald-400" />
              Import & Export Data Keuangan UPTD
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl">
              Alur lengkap impor data Excel (Program, Kegiatan, Sub-Kegiatan, Rekening, Penyedia, Paket Pekerjaan) dengan validasi baris & error preview, serta ekspor laporan LRA & Pekerjaan ke Excel/PDF.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-emerald-900/40 border border-emerald-500/30 rounded-xl text-right">
              <p className="text-[10px] text-emerald-300 uppercase tracking-wider font-bold">Database Target</p>
              <p className="text-xs font-mono font-bold text-white">db_keuangan_uptd</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Import Control Center */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <FileUp className="w-4 h-4 text-emerald-600" />
                1. Workflow Import Excel Massal
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full font-mono font-semibold">
                6 Master Entitas
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pilih Master Entitas Data Target</label>
                <select
                  value={selectedEntity}
                  onChange={(e) => {
                    setSelectedEntity(e.target.value);
                    setIsUploaded(false);
                    setImportCompleted(false);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="program">Master Program (2 Kolom: kode, nama)</option>
                  <option value="kegiatan">Master Kegiatan (3 Kolom: program, kode, nama)</option>
                  <option value="sub_kegiatan">Master Sub-Kegiatan (3 Kolom: kegiatan, kode, nama)</option>
                  <option value="rekening">Master Rekening Belanja (3 Kolom: kode, nama, jenis)</option>
                  <option value="penyedia">Master Penyedia / Rekanan (7 Kolom)</option>
                  <option value="paket_pekerjaan">Master Paket Pekerjaan (6 Kolom)</option>
                </select>
              </div>

              {/* Template Download Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 mb-0.5">Template Format Excel ({selectedEntity.toUpperCase()})</p>
                  <p className="text-[11px] text-slate-500">Unduh susunan header resmi agar lolos validasi sistem.</p>
                </div>
                <button
                  onClick={() => showToast('info', `Template Excel untuk Master ${selectedEntity.toUpperCase()} berhasil diunduh.`)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>

              {/* File Upload Box */}
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleSimulateUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <FileSpreadsheet className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 mb-1">
                  Click / Drag File Excel ke sini untuk Unggah
                </p>
                <p className="text-[11px] text-slate-500">
                  Mendukung format .XLSX, .XLS, atau .CSV (Maksimal 10MB)
                </p>
              </div>

              {isUploaded && !importCompleted && (
                <button
                  onClick={handleExecuteImport}
                  disabled={isImporting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isImporting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Memproses Impot Batch Database...</span>
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      <span>Konfirmasi & Eksekusi Import ({validCount} Valid Row)</span>
                    </>
                  )}
                </button>
              )}

              {importCompleted && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-900">
                  <div className="flex items-center gap-2 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Import Data Selesai Diproses!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Sebanyak {validCount} baris data berhasil disimpan ke tabel <strong>{selectedEntity}</strong>. Audit log transaksi telah dicatat.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Export Quick Trigger Box */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-600" />
              2. Export Laporan Resmi
            </h3>
            <p className="text-xs text-slate-600">
              Cetak atau unduh laporan LRA, Pekerjaan, Pembayaran & Pajak dengan header resmi instansi & border Excel.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => showToast('success', 'File Excel LRA 2026 berhasil di-generate dengan Auto-Width & Border.')}
                className="p-3 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700">LRA Excel</span>
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-[10px] text-slate-500">Laporan_Realisasi_Anggaran_2026.xlsx</p>
              </button>

              <button
                onClick={() => showToast('info', 'File PDF LRA 2026 siap dicetak dengan logo & Kop Dinas.')}
                className="p-3 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-rose-700">LRA PDF</span>
                  <Download className="w-4 h-4 text-rose-600" />
                </div>
                <p className="text-[10px] text-slate-500">Laporan_LRA_2026_Official.pdf</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview & Validation Results Table */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Preview & Validation Result ({fileName})
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Analisis kelayakan baris sebelum ditulis ke database</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-full border border-emerald-500/30">
                  {validCount} Valid
                </span>
                <span className="px-2.5 py-1 bg-rose-500/20 text-rose-300 text-[10px] font-bold rounded-full border border-rose-500/30">
                  {errorCount} Error
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-3 gap-4 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold">Total Baris File</p>
                <p className="text-lg font-bold font-mono text-slate-800">{previewRows.length}</p>
              </div>
              <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200">
                <p className="text-[10px] text-emerald-700 uppercase font-bold">Lolos Validasi</p>
                <p className="text-lg font-bold font-mono text-emerald-700">{validCount}</p>
              </div>
              <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-200">
                <p className="text-[10px] text-rose-700 uppercase font-bold">Baris Bermasalah</p>
                <p className="text-lg font-bold font-mono text-rose-700">{errorCount}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] tracking-wider font-bold border-b border-slate-200">
                    <th className="p-3 text-center w-16">Baris</th>
                    <th className="p-3">Kolom 1 (Kode)</th>
                    <th className="p-3">Kolom 2 (Nama / Deskripsi)</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3">Detail Validasi / Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {previewRows.map((row) => (
                    <tr key={row.line} className={row.status === 'ERROR' ? 'bg-rose-50/40' : 'hover:bg-slate-50'}>
                      <td className="p-3 text-center font-mono font-bold text-slate-500">#{row.line}</td>
                      <td className="p-3 font-mono font-semibold text-slate-900">
                        {row.data[0] || <span className="text-rose-500 font-bold italic">&lt;KOSONG&gt;</span>}
                      </td>
                      <td className="p-3 font-medium text-slate-800">{row.data[1]}</td>
                      <td className="p-3 text-center">
                        {row.status === 'VALID' ? (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 w-20 mx-auto">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            VALID
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 bg-rose-100 text-rose-800 border border-rose-200 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 w-20 mx-auto">
                            <XCircle className="w-3 h-3 text-rose-600" />
                            ERROR
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {row.status === 'VALID' ? (
                          <span className="text-slate-400 text-[11px]">Siap dimasukkan ke database.</span>
                        ) : (
                          <span className="text-rose-700 font-semibold text-[11px] flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                            {row.errors.join(', ')}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
