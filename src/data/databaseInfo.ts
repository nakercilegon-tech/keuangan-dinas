import { TableDefinition, TableRelation } from '../types';

export const ERD_TEXT = `
===================================================================================
                TEXT ERD - SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS
                DATABASE: db_keuangan_uptd (TAHUN 2026)
===================================================================================

[PROGRAM] (1)
   │
   └───< (N) [KEGIATAN] (1)
             │
             └───< (N) [SUB_KEGIATAN] (1)
                       │
                       └───< (N) [PAKET_PEKERJAAN] (1)
                                 │
                                 ├───< (N) [PAKET_PEKERJAAN_REKENING] (N) >─── [REKENING_BELANJA]
                                 │
                                 └───< (N) [REALISASI] (1) >────────────────── [PENYEDIA]
                                           │
                                           ├───< (N) [REALISASI_REKENING] (N) >─── [PAKET_PEKERJAAN_REKENING]
                                           │
                                           └───< (N) [PEMBAYARAN] (1)
                                                     │
                                                     └─── (1) [PAJAK] (1:1)

SYSTEM AUXILIARY TABLES:
 ├── [USERS] (Direct RBAC Auth & Audit Reference)
 ├── [AUDIT_LOGS] (FK: user_id -> users.id)
 └── [SETTINGS] (Key-Value System Configurations)
`;

export const TABLES_DATA: TableDefinition[] = [
  {
    name: 'users',
    description: 'Manajemen Pengguna Sistem & Hak Akses (RBAC)',
    primaryKey: 'id',
    foreignKeys: [],
    uniqueKeys: ['username', 'email'],
    indexes: ['role', 'status'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'username', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Nama Pengguna Unik Login' },
      { name: 'password', type: 'VARCHAR(255)', nullable: false, key: '', comment: 'Password Terenkripsi Bcrypt' },
      { name: 'nama_lengkap', type: 'VARCHAR(100)', nullable: false, key: '' },
      { name: 'email', type: 'VARCHAR(100)', nullable: false, key: 'UK' },
      { name: 'role', type: "ENUM('ADMIN','OPERATOR','PIMPINAN')", nullable: false, key: 'IDX' },
      { name: 'status', type: "ENUM('aktif','nonaktif')", nullable: false, key: 'IDX' },
      { name: 'last_login', type: 'DATETIME', nullable: true, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'program',
    description: 'Master Data Program Anggaran Dinas Tahun 2026',
    primaryKey: 'id',
    foreignKeys: [],
    uniqueKeys: ['kode_program'],
    indexes: ['tahun_anggaran'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'kode_program', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Contoh: 1.02.01' },
      { name: 'nama_program', type: 'VARCHAR(255)', nullable: false, key: '' },
      { name: 'tahun_anggaran', type: 'YEAR', nullable: false, key: 'IDX' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'kegiatan',
    description: 'Master Data Kegiatan Turunan Program',
    primaryKey: 'id',
    foreignKeys: ['program_id -> program.id'],
    uniqueKeys: ['kode_kegiatan'],
    indexes: ['program_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'program_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'kode_kegiatan', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Contoh: 1.02.01.2.06' },
      { name: 'nama_kegiatan', type: 'VARCHAR(255)', nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'sub_kegiatan',
    description: 'Master Data Sub Kegiatan Unit UPTD',
    primaryKey: 'id',
    foreignKeys: ['program_id -> program.id', 'kegiatan_id -> kegiatan.id'],
    uniqueKeys: ['kode_sub_kegiatan'],
    indexes: ['program_id', 'kegiatan_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'program_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'kegiatan_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'kode_sub_kegiatan', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Contoh: 1.02.01.2.06.02' },
      { name: 'nama_sub_kegiatan', type: 'VARCHAR(255)', nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'rekening_belanja',
    description: 'Kode Rekening Belanja APBD (Pegawai, Barang/Jasa, Modal)',
    primaryKey: 'id',
    foreignKeys: [],
    uniqueKeys: ['kode_rekening'],
    indexes: ['jenis_belanja'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'kode_rekening', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Contoh: 5.1.02.01.01.0024' },
      { name: 'nama_rekening', type: 'VARCHAR(255)', nullable: false, key: '' },
      { name: 'jenis_belanja', type: "ENUM('Belanja Pegawai','Belanja Barang dan Jasa','Belanja Modal',...)", nullable: false, key: 'IDX' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'penyedia',
    description: 'Data Vendor & Perusahaan Penyedia Barang/Jasa',
    primaryKey: 'id',
    foreignKeys: [],
    uniqueKeys: ['npwp'],
    indexes: ['nama_perusahaan'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'nama_perusahaan', type: 'VARCHAR(150)', nullable: false, key: 'IDX' },
      { name: 'nama_penyedia', type: 'VARCHAR(100)', nullable: false, key: '' },
      { name: 'alamat', type: 'TEXT', nullable: false, key: '' },
      { name: 'npwp', type: 'VARCHAR(30)', nullable: false, key: 'UK' },
      { name: 'nama_bank', type: 'VARCHAR(50)', nullable: false, key: '' },
      { name: 'nomor_rekening', type: 'VARCHAR(50)', nullable: false, key: '' },
      { name: 'pemegang_rekening', type: 'VARCHAR(100)', nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'paket_pekerjaan',
    description: 'Rincian Paket Anggaran Pekerjaan Dinas',
    primaryKey: 'id',
    foreignKeys: ['sub_kegiatan_id -> sub_kegiatan.id'],
    uniqueKeys: ['nomor_paket'],
    indexes: ['sub_kegiatan_id', 'tahun_anggaran', 'status'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'nomor_paket', type: 'VARCHAR(50)', nullable: false, key: 'UK', comment: 'Nomor Unik Paket PKT-2026-xxx' },
      { name: 'sub_kegiatan_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'nama_paket', type: 'VARCHAR(255)', nullable: false, key: '' },
      { name: 'pagu_paket', type: 'DECIMAL(15,2)', nullable: false, key: '' },
      { name: 'tahun_anggaran', type: 'YEAR', nullable: false, key: 'IDX' },
      { name: 'status', type: "ENUM('perencanaan','berjalan','selesai','batal')", nullable: false, key: 'IDX' },
      { name: 'keterangan', type: 'TEXT', nullable: true, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'paket_pekerjaan_rekening',
    description: 'Pemetaan Multi-Rekening per Paket Pekerjaan (Pagu Rekening)',
    primaryKey: 'id',
    foreignKeys: ['paket_id -> paket_pekerjaan.id', 'rekening_id -> rekening_belanja.id'],
    uniqueKeys: ['(paket_id, rekening_id)'],
    indexes: ['paket_id', 'rekening_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'paket_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'rekening_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'pagu_rekening', type: 'DECIMAL(15,2)', nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'realisasi',
    description: 'Data Kontrak / SP, Tanggal Pekerjaan & Berita Acara (BA)',
    primaryKey: 'id',
    foreignKeys: ['paket_id -> paket_pekerjaan.id', 'penyedia_id -> penyedia.id'],
    uniqueKeys: ['nomor_sp'],
    indexes: ['paket_id', 'penyedia_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'paket_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'penyedia_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'nomor_sp', type: 'VARCHAR(100)', nullable: false, key: 'UK', comment: 'Nomor SP / Kontrak' },
      { name: 'tanggal_sp', type: 'DATE', nullable: false, key: '' },
      { name: 'lama_pekerjaan', type: 'INT UNSIGNED', nullable: false, key: '', comment: 'Lama Pekerjaan (Hari)' },
      { name: 'tanggal_mulai', type: 'DATE', nullable: false, key: '' },
      { name: 'tanggal_selesai', type: 'DATE', nullable: false, key: '' },
      { name: 'nilai_kontrak', type: 'DECIMAL(15,2)', nullable: false, key: '' },
      { name: 'nomor_bapsthp', type: 'VARCHAR(100)', nullable: true, key: '' },
      { name: 'nomor_bapb', type: 'VARCHAR(100)', nullable: true, key: '' },
      { name: 'tanggal_ba', type: 'DATE', nullable: true, key: '' },
      { name: 'nomor_ba', type: 'VARCHAR(100)', nullable: true, key: '' },
      { name: 'status', type: "ENUM('draft','proses','selesai','batal')", nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'realisasi_rekening',
    description: 'Nilai Realisasi per Rekening Pekerjaan',
    primaryKey: 'id',
    foreignKeys: ['realisasi_id -> realisasi.id', 'paket_rekening_id -> paket_pekerjaan_rekening.id'],
    uniqueKeys: ['(realisasi_id, paket_rekening_id)'],
    indexes: ['realisasi_id', 'paket_rekening_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'realisasi_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'paket_rekening_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'nilai_realisasi', type: 'DECIMAL(15,2)', nullable: false, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'pembayaran',
    description: 'Riwayat Transaksi Pencairan Dana / Termin Pembayaran',
    primaryKey: 'id',
    foreignKeys: ['realisasi_id -> realisasi.id'],
    uniqueKeys: ['nomor_transaksi'],
    indexes: ['realisasi_id', 'tanggal_pembayaran'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'realisasi_id', type: 'INT UNSIGNED', nullable: false, key: 'FK' },
      { name: 'nomor_transaksi', type: 'VARCHAR(100)', nullable: false, key: 'UK' },
      { name: 'tanggal_pembayaran', type: 'DATE', nullable: false, key: 'IDX' },
      { name: 'nilai_pembayaran', type: 'DECIMAL(15,2)', nullable: false, key: '' },
      { name: 'pembayaran_ke', type: 'INT UNSIGNED', nullable: false, key: '' },
      { name: 'keterangan', type: 'TEXT', nullable: true, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'pajak',
    description: 'Detail Potongan Pajak PPN & PPh Sesuai Kontrak Proyek',
    primaryKey: 'id',
    foreignKeys: ['pembayaran_id -> pembayaran.id'],
    uniqueKeys: ['pembayaran_id'],
    indexes: ['pembayaran_id'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'pembayaran_id', type: 'INT UNSIGNED', nullable: false, key: 'UK' },
      { name: 'ppn', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: '(Nilai / 1,11) * 11%' },
      { name: 'pph21', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: 'MANUAL' },
      { name: 'pph22', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: '(Nilai / 1,11) * 1,5%' },
      { name: 'pph23_jasa', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: '(Nilai / 1,11) * 2%' },
      { name: 'pph23_makan', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: 'Nilai * 2%' },
      { name: 'total_pajak', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: 'PPN + PPH21 + PPH22 + PPH23_JASA + PPH23_MAKAN' },
      { name: 'nilai_bersih', type: 'DECIMAL(15,2)', nullable: false, key: '', comment: 'Nilai Pembayaran - Total Pajak' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  },
  {
    name: 'audit_logs',
    description: 'Catatan Audit Jejak Aktivitas Pengguna',
    primaryKey: 'id',
    foreignKeys: ['user_id -> users.id'],
    uniqueKeys: [],
    indexes: ['user_id', 'action', 'created_at'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'user_id', type: 'INT UNSIGNED', nullable: true, key: 'FK' },
      { name: 'action', type: 'VARCHAR(50)', nullable: false, key: 'IDX' },
      { name: 'table_name', type: 'VARCHAR(50)', nullable: true, key: '' },
      { name: 'record_id', type: 'INT UNSIGNED', nullable: true, key: '' },
      { name: 'description', type: 'TEXT', nullable: false, key: '' },
      { name: 'ip_address', type: 'VARCHAR(45)', nullable: true, key: '' },
      { name: 'user_agent', type: 'TEXT', nullable: true, key: '' },
      { name: 'created_at', type: 'TIMESTAMP', nullable: false, key: 'IDX' }
    ]
  },
  {
    name: 'settings',
    description: 'Konfigurasi Sistem, Pejabat Dinas & UPTD',
    primaryKey: 'id',
    foreignKeys: [],
    uniqueKeys: ['setting_key'],
    indexes: ['setting_key'],
    columns: [
      { name: 'id', type: 'INT UNSIGNED AUTO_INCREMENT', nullable: false, key: 'PK' },
      { name: 'setting_key', type: 'VARCHAR(50)', nullable: false, key: 'UK' },
      { name: 'setting_value', type: 'TEXT', nullable: false, key: '' },
      { name: 'setting_description', type: 'VARCHAR(255)', nullable: true, key: '' },
      { name: 'updated_at', type: 'TIMESTAMP', nullable: false, key: '' }
    ]
  }
];

export const RELATIONS_LIST: TableRelation[] = [
  { fromTable: 'program', fromCol: 'id', toTable: 'kegiatan', toCol: 'program_id', type: '1:N' },
  { fromTable: 'program', fromCol: 'id', toTable: 'sub_kegiatan', toCol: 'program_id', type: '1:N' },
  { fromTable: 'kegiatan', fromCol: 'id', toTable: 'sub_kegiatan', toCol: 'kegiatan_id', type: '1:N' },
  { fromTable: 'sub_kegiatan', fromCol: 'id', toTable: 'paket_pekerjaan', toCol: 'sub_kegiatan_id', type: '1:N' },
  { fromTable: 'paket_pekerjaan', fromCol: 'id', toTable: 'paket_pekerjaan_rekening', toCol: 'paket_id', type: '1:N' },
  { fromTable: 'rekening_belanja', fromCol: 'id', toTable: 'paket_pekerjaan_rekening', toCol: 'rekening_id', type: '1:N' },
  { fromTable: 'paket_pekerjaan', fromCol: 'id', toTable: 'realisasi', toCol: 'paket_id', type: '1:N' },
  { fromTable: 'penyedia', fromCol: 'id', toTable: 'realisasi', toCol: 'penyedia_id', type: '1:N' },
  { fromTable: 'realisasi', fromCol: 'id', toTable: 'realisasi_rekening', toCol: 'realisasi_id', type: '1:N' },
  { fromTable: 'paket_pekerjaan_rekening', fromCol: 'id', toTable: 'realisasi_rekening', toCol: 'paket_rekening_id', type: '1:N' },
  { fromTable: 'realisasi', fromCol: 'id', toTable: 'pembayaran', toCol: 'realisasi_id', type: '1:N' },
  { fromTable: 'pembayaran', fromCol: 'id', toTable: 'pajak', toCol: 'pembayaran_id', type: '1:1' },
  { fromTable: 'users', fromCol: 'id', toTable: 'audit_logs', toCol: 'user_id', type: '1:N' }
];

export const SAMPLE_SEED_DATA = {
  users: [
    { id: 1, username: 'admin', nama_lengkap: 'Administrator Utama', email: 'admin@dinas.go.id', role: 'ADMIN', status: 'aktif' },
    { id: 2, username: 'operator_keuangan', nama_lengkap: 'Ahmad Budiarto, S.E.', email: 'operator@dinas.go.id', role: 'OPERATOR', status: 'aktif' },
    { id: 3, username: 'pimpinan_uptd', nama_lengkap: 'Drs. H. Hendra Wijaya, M.Si.', email: 'pimpinan@dinas.go.id', role: 'PIMPINAN', status: 'aktif' }
  ],
  program: [
    { id: 1, kode_program: '1.02.01', nama_program: 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota', tahun_anggaran: '2026' },
    { id: 2, kode_program: '1.02.02', nama_program: 'Program Pelatihan Kerja dan Produktivitas Tenaga Kerja', tahun_anggaran: '2026' },
    { id: 3, kode_program: '1.02.03', nama_program: 'Program Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja', tahun_anggaran: '2026' }
  ],
  penyedia: [
    { id: 1, nama_perusahaan: 'PT Mitra Teknologi Utama', nama_penyedia: 'Ir. Bambang Setyo', npwp: '01.234.567.8-401.000', bank: 'Bank BJB' },
    { id: 2, nama_perusahaan: 'CV Anugerah Jaya Printing', nama_penyedia: 'H. Muhammad Ridwan', npwp: '02.987.654.3-402.000', bank: 'Bank Mandiri' },
    { id: 3, nama_perusahaan: 'CV Bintang Catering Nusantara', nama_penyedia: 'Siti Mariam, S.Sos.', npwp: '03.456.789.1-403.000', bank: 'Bank BRI' }
  ],
  paket_pekerjaan: [
    { id: 1, nomor_paket: 'PKT-2026-001', nama_paket: 'Pengadaan Bahan & Konsumsi Pelatihan Las Berbasis Kompetensi Batch 1', pagu_paket: 125000000, status: 'berjalan' },
    { id: 2, nomor_paket: 'PKT-2026-002', nama_paket: 'Pengadaan Komputer Laptop Workshop Komputer UPTD', pagu_paket: 85000000, status: 'selesai' },
    { id: 3, nomor_paket: 'PKT-2026-003', nama_paket: 'Pemeliharaan Rutin Mesin Bubut dan Las Workshop Otomotif', pagu_paket: 45000000, status: 'berjalan' }
  ],
  pembayaran_pajak: [
    { id: 1, nomor_transaksi: 'TRX-2026-04-001', tanggal: '2026-04-05', nilai: 60000000, ppn: 5945945.95, pph23_makan: 1200000, total_pajak: 7145945.95, bersih: 52854054.05 },
    { id: 2, nomor_transaksi: 'TRX-2026-03-012', tanggal: '2026-03-05', nilai: 82500000, ppn: 8175675.68, pph22: 1114864.86, total_pajak: 9290540.54, bersih: 73209459.46 }
  ]
};
