import React, { useState } from 'react';
import { TABLES_DATA } from '../data/databaseInfo';
import { TableDefinition } from '../types';
import { Search, Key, ShieldAlert, Check, Layers, ChevronRight } from 'lucide-react';

export const TableStructureView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTableName, setSelectedTableName] = useState<string>('users');

  const filteredTables = TABLES_DATA.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    table.columns.some(col => col.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedTable = TABLES_DATA.find(t => t.name === selectedTableName) || TABLES_DATA[0];

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>Kamus Data Database (14 Tabel Utama)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Spesifikasi struktur tabel lengkap dengan Primary Key, Foreign Key, Unique Constraint, dan Indexing
          </p>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama tabel, field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Table Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-1">
            Daftar Tabel ({filteredTables.length} / 14)
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredTables.map((table) => {
              const isSelected = table.name === selectedTableName;
              return (
                <button
                  key={table.name}
                  onClick={() => setSelectedTableName(table.name)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold">{table.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                        isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {table.columns.length} col
                      </span>
                    </div>
                    <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {table.description}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Detail Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedTable && (
            <>
              {/* Table Header Detail */}
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="text-xl font-mono font-bold text-slate-900 flex items-center gap-2">
                    <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg border border-indigo-100 text-sm">
                      TABLE
                    </span>
                    <span>`{selectedTable.name}`</span>
                  </h3>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-medium rounded-full border border-slate-200">
                    Engine: InnoDB | utf8mb4
                  </span>
                </div>
                <p className="text-xs text-slate-600">{selectedTable.description}</p>

                {/* Constraints Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md border border-amber-200 text-xs font-mono">
                    <Key className="w-3.5 h-3.5 text-amber-600" />
                    <span>PK: {selectedTable.primaryKey}</span>
                  </div>

                  {selectedTable.foreignKeys.length > 0 && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-800 rounded-md border border-blue-200 text-xs font-mono">
                      <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
                      <span>FK: {selectedTable.foreignKeys.join(', ')}</span>
                    </div>
                  )}

                  {selectedTable.uniqueKeys.length > 0 && (
                    <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-md border border-emerald-200 text-xs font-mono">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>UK: {selectedTable.uniqueKeys.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Table Columns Data Grid */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Field / Column</th>
                      <th className="px-4 py-3">Data Type</th>
                      <th className="px-4 py-3">Key</th>
                      <th className="px-4 py-3">Null</th>
                      <th className="px-4 py-3">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {selectedTable.columns.map((col, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-900">{col.name}</td>
                        <td className="px-4 py-3 text-indigo-600 font-medium">{col.type}</td>
                        <td className="px-4 py-3">
                          {col.key === 'PK' && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded text-[10px]">PK</span>
                          )}
                          {col.key === 'FK' && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">FK</span>
                          )}
                          {col.key === 'UK' && (
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">UK</span>
                          )}
                          {col.key === 'IDX' && (
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold rounded text-[10px]">INDEX</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-sans">
                          {col.nullable ? (
                            <span className="text-slate-400">YES</span>
                          ) : (
                            <span className="text-rose-600 font-semibold">NO</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-sans text-slate-600 text-[11px]">
                          {col.comment || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
