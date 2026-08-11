import React, { useState, useEffect } from 'react';
import { Copy, Download, Check, FileCode, Search, Terminal } from 'lucide-react';

export const SqlViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<string>('/database/db_keuangan_uptd.sql');
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const files = [
    { path: '/database/db_keuangan_uptd.sql', label: 'db_keuangan_uptd.sql (Lengkap)', desc: 'Gabungan DDL Struktur + Seed Data 2026' },
    { path: '/database/database_structure.sql', label: 'database_structure.sql (Hanya Tabel)', desc: 'Struktur 14 Tabel, PK, FK, Unique & Indeks' },
    { path: '/database/seed_data.sql', label: 'seed_data.sql (Hanya Data)', desc: 'Data Sampel Tahun 2026 Siap Import' },
    { path: '/INSTALL_XAMPP.md', label: 'INSTALL_XAMPP.md', desc: 'Panduan Import phpMyAdmin & XAMPP' }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/file?path=${encodeURIComponent(activeFile)}`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data.content || 'File content not found');
        setLoading(false);
      })
      .catch((err) => {
        setContent(`Error loading file: ${err.message}`);
        setLoading(false);
      });
  }, [activeFile]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = activeFile.split('/').pop() || 'file.sql';
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLines = searchFilter
    ? content.split('\n').filter(line => line.toLowerCase().includes(searchFilter.toLowerCase())).join('\n')
    : content;

  return (
    <div className="space-y-6">
      {/* Top File Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {files.map((f) => {
          const isActive = activeFile === f.path;
          return (
            <button
              key={f.path}
              onClick={() => setActiveFile(f.path)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-slate-900 border-indigo-500 text-white shadow-lg shadow-slate-900/20 ring-1 ring-indigo-500'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileCode className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="font-mono text-xs font-bold truncate">{f.label.split(' ')[0]}</span>
              </div>
              <p className={`text-[11px] leading-tight ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                {f.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* SQL Content Box */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-900 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span className="font-mono text-xs font-bold text-slate-200">{activeFile}</span>
            <span className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded border border-slate-700">
              {content.split('\n').length} baris
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari SQL statement..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-950 text-slate-200 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh File</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto max-h-[550px]">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-slate-500 text-xs">
              Mewat isi berkas SQL...
            </div>
          ) : (
            <pre className="font-mono text-xs text-slate-300 leading-relaxed whitespace-pre font-normal">
              {filteredLines}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};
