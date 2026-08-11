import React, { useState } from 'react';
import { SAMPLE_SEED_DATA } from '../data/databaseInfo';
import { Users, UserPlus, Search, Shield, KeyRound, Check, Trash2, Edit, AlertCircle, ShieldAlert } from 'lucide-react';

interface UserRecord {
  id: number;
  username: string;
  nama_lengkap: string;
  email: string;
  nip?: string;
  jabatan?: string;
  role: 'ADMIN' | 'OPERATOR' | 'PIMPINAN';
  status: 'aktif' | 'nonaktif';
  last_login?: string;
}

export const UserManagementView: React.FC = () => {
  const [userList, setUserList] = useState<UserRecord[]>([
    {
      id: 1,
      username: 'admin',
      nama_lengkap: 'Administrator Utama',
      email: 'admin@dinas.go.id',
      nip: '19800101 200501 1 001',
      jabatan: 'Pranata Komputer Ahli Muda',
      role: 'ADMIN',
      status: 'aktif',
      last_login: '2026-08-11 08:30:00'
    },
    {
      id: 2,
      username: 'operator_keuangan',
      nama_lengkap: 'Ahmad Budiarto, S.E.',
      email: 'operator@dinas.go.id',
      nip: '19850412 201001 1 005',
      jabatan: 'Bendahara Pengeluaran UPTD',
      role: 'OPERATOR',
      status: 'aktif',
      last_login: '2026-08-11 07:15:00'
    },
    {
      id: 3,
      username: 'pimpinan_uptd',
      nama_lengkap: 'Drs. H. Hendra Wijaya, M.Si.',
      email: 'pimpinan@dinas.go.id',
      nip: '19750812 199803 1 002',
      jabatan: 'Kepala UPTD Pelatihan Kerja',
      role: 'PIMPINAN',
      status: 'aktif',
      last_login: '2026-08-10 14:00:00'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nama_lengkap: '',
    email: '',
    nip: '',
    jabatan: '',
    role: 'OPERATOR' as 'ADMIN' | 'OPERATOR' | 'PIMPINAN',
    status: 'aktif' as 'aktif' | 'nonaktif'
  });

  const [notification, setNotification] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditUser(null);
    setFormData({
      username: '',
      password: '',
      nama_lengkap: '',
      email: '',
      nip: '',
      jabatan: '',
      role: 'OPERATOR',
      status: 'aktif'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (u: UserRecord) => {
    setEditUser(u);
    setFormData({
      username: u.username,
      password: '', // Blank unless changing
      nama_lengkap: u.nama_lengkap,
      email: u.email,
      nip: u.nip || '',
      jabatan: u.jabatan || '',
      role: u.role,
      status: u.status
    });
    setIsModalOpen(true);
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editUser) {
      // Update existing
      setUserList(userList.map(u => u.id === editUser.id ? {
        ...u,
        nama_lengkap: formData.nama_lengkap,
        email: formData.email,
        nip: formData.nip,
        jabatan: formData.jabatan,
        role: formData.role,
        status: formData.status
      } : u));
      setNotification(`Data pengguna '${formData.nama_lengkap}' berhasil diperbarui.`);
    } else {
      // Create new
      const newUser: UserRecord = {
        id: Date.now(),
        username: formData.username,
        nama_lengkap: formData.nama_lengkap,
        email: formData.email,
        nip: formData.nip,
        jabatan: formData.jabatan,
        role: formData.role,
        status: formData.status,
        last_login: 'Belum pernah'
      };
      setUserList([...userList, newUser]);
      setNotification(`Pengguna baru '${formData.nama_lengkap}' berhasil dibuat.`);
    }
    setIsModalOpen(false);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDeleteUser = (id: number, name: string) => {
    if (id === 1) {
      alert('Administrator Utama (ID 1) tidak dapat dihapus.');
      return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna '${name}'?`)) {
      setUserList(userList.filter(u => u.id !== id));
      setNotification(`Pengguna '${name}' berhasil dihapus.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const filteredUsers = userList.filter(u => {
    const matchSearch = u.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter ? u.role === roleFilter : true;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <span>Manajemen Pengguna Systems (Khusus Role ADMIN)</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan akun, otorisasi role akses (ADMIN, OPERATOR, PIMPINAN), & reset password dengan password_hash()
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Pengguna</span>
        </button>
      </div>

      {/* Notification banner */}
      {notification && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-semibold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama, username, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Semua Role --</option>
          <option value="ADMIN">ADMIN (Akses Penuh)</option>
          <option value="OPERATOR">OPERATOR (Input & Realisasi)</option>
          <option value="PIMPINAN">PIMPINAN (Monitoring & Export)</option>
        </select>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Username & Nama</th>
                <th className="px-4 py-3">NIP / Jabatan</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role Hak Akses</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Login Terakhir</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-bold text-slate-900">{u.nama_lengkap}</div>
                    <span className="font-mono text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">
                      @{u.username}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-slate-800 font-medium">{u.jabatan || '-'}</div>
                    <div className="font-mono text-[10px] text-slate-400">NIP: {u.nip || '-'}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                      u.role === 'ADMIN'
                        ? 'bg-rose-100 text-rose-800 border border-rose-200'
                        : u.role === 'PIMPINAN'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.status === 'aktif' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[11px]">{u.last_login}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleOpenEditModal(u)}
                        className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u.id, u.nama_lengkap)}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Hapus User"
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
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
              {editUser ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}
            </h3>

            <form onSubmit={handleSaveUser} className="space-y-3 text-xs">
              {!editUser && (
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                    placeholder="operator2"
                  />
                </div>
              )}

              <div className="space-y-1">
                <label className="font-bold text-slate-700">{editUser ? 'Password Baru (Opsional)' : 'Password *'}</label>
                <input
                  type="password"
                  required={!editUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  placeholder={editUser ? 'Biarkan kosong jika tidak diubah' : 'Minimal 6 karakter'}
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={formData.nama_lengkap}
                  onChange={(e) => setFormData({ ...formData, nama_lengkap: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NIP</label>
                  <input
                    type="text"
                    value={formData.nip}
                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Jabatan</label>
                  <input
                    type="text"
                    value={formData.jabatan}
                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Role Hak Akses</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="OPERATOR">OPERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="PIMPINAN">PIMPINAN</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">Status Akun</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-bold"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="nonaktif">Nonaktif</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
