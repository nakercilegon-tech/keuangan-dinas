-- =====================================================================
-- SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS (db_keuangan_uptd)
-- COMBINED DATABASE STRUCTURE & SEED DATA (TAHUN 2026)
-- ARCHITECTURE: PHP Native MVC | DATABASE: MySQL 8.x / MariaDB
-- IMPORT READY FOR PHPMYADMIN & XAMPP
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `db_keuangan_uptd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_keuangan_uptd`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- 1. Tabel: users
-- --------------------------------------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(50) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nama_lengkap` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `role` ENUM('ADMIN', 'OPERATOR', 'PIMPINAN') NOT NULL DEFAULT 'OPERATOR',
  `status` ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif',
  `last_login` DATETIME NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_users_username` (`username`),
  UNIQUE KEY `uk_users_email` (`email`),
  INDEX `idx_users_role` (`role`),
  INDEX `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Tabel: program
-- --------------------------------------------------------
DROP TABLE IF EXISTS `program`;
CREATE TABLE `program` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kode_program` VARCHAR(50) NOT NULL,
  `nama_program` VARCHAR(255) NOT NULL,
  `tahun_anggaran` YEAR NOT NULL DEFAULT '2026',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_program_kode` (`kode_program`),
  INDEX `idx_program_tahun` (`tahun_anggaran`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Tabel: kegiatan
-- --------------------------------------------------------
DROP TABLE IF EXISTS `kegiatan`;
CREATE TABLE `kegiatan` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `program_id` INT UNSIGNED NOT NULL,
  `kode_kegiatan` VARCHAR(50) NOT NULL,
  `nama_kegiatan` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_kegiatan_kode` (`kode_kegiatan`),
  INDEX `idx_kegiatan_program` (`program_id`),
  CONSTRAINT `fk_kegiatan_program` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Tabel: sub_kegiatan
-- --------------------------------------------------------
DROP TABLE IF EXISTS `sub_kegiatan`;
CREATE TABLE `sub_kegiatan` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `program_id` INT UNSIGNED NOT NULL,
  `kegiatan_id` INT UNSIGNED NOT NULL,
  `kode_sub_kegiatan` VARCHAR(50) NOT NULL,
  `nama_sub_kegiatan` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_sub_kegiatan_kode` (`kode_sub_kegiatan`),
  INDEX `idx_sub_kegiatan_program` (`program_id`),
  INDEX `idx_sub_kegiatan_kegiatan` (`kegiatan_id`),
  CONSTRAINT `fk_sub_kegiatan_program` FOREIGN KEY (`program_id`) REFERENCES `program` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_sub_kegiatan_kegiatan` FOREIGN KEY (`kegiatan_id`) REFERENCES `kegiatan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Tabel: rekening_belanja
-- --------------------------------------------------------
DROP TABLE IF EXISTS `rekening_belanja`;
CREATE TABLE `rekening_belanja` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `kode_rekening` VARCHAR(50) NOT NULL,
  `nama_rekening` VARCHAR(255) NOT NULL,
  `jenis_belanja` ENUM('Belanja Pegawai', 'Belanja Barang dan Jasa', 'Belanja Modal', 'Belanja Hibah', 'Belanja Bantuan Sosial', 'Belanja Tidak Terduga') NOT NULL DEFAULT 'Belanja Barang dan Jasa',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_rekening_kode` (`kode_rekening`),
  INDEX `idx_rekening_jenis` (`jenis_belanja`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 6. Tabel: penyedia
-- --------------------------------------------------------
DROP TABLE IF EXISTS `penyedia`;
CREATE TABLE `penyedia` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nama_perusahaan` VARCHAR(150) NOT NULL,
  `nama_penyedia` VARCHAR(100) NOT NULL,
  `alamat` TEXT NOT NULL,
  `npwp` VARCHAR(30) NOT NULL,
  `nama_bank` VARCHAR(50) NOT NULL,
  `nomor_rekening` VARCHAR(50) NOT NULL,
  `pemegang_rekening` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_penyedia_npwp` (`npwp`),
  INDEX `idx_penyedia_perusahaan` (`nama_perusahaan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 7. Tabel: paket_pekerjaan
-- --------------------------------------------------------
DROP TABLE IF EXISTS `paket_pekerjaan`;
CREATE TABLE `paket_pekerjaan` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `nomor_paket` VARCHAR(50) NOT NULL,
  `sub_kegiatan_id` INT UNSIGNED NOT NULL,
  `nama_paket` VARCHAR(255) NOT NULL,
  `pagu_paket` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `tahun_anggaran` YEAR NOT NULL DEFAULT '2026',
  `status` ENUM('perencanaan', 'berjalan', 'selesai', 'batal') NOT NULL DEFAULT 'perencanaan',
  `keterangan` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_paket_nomor` (`nomor_paket`),
  INDEX `idx_paket_sub_kegiatan` (`sub_kegiatan_id`),
  INDEX `idx_paket_tahun` (`tahun_anggaran`),
  INDEX `idx_paket_status` (`status`),
  CONSTRAINT `fk_paket_sub_kegiatan` FOREIGN KEY (`sub_kegiatan_id`) REFERENCES `sub_kegiatan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 8. Tabel: paket_pekerjaan_rekening
-- --------------------------------------------------------
DROP TABLE IF EXISTS `paket_pekerjaan_rekening`;
CREATE TABLE `paket_pekerjaan_rekening` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `paket_id` INT UNSIGNED NOT NULL,
  `rekening_id` INT UNSIGNED NOT NULL,
  `pagu_rekening` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_paket_rekening` (`paket_id`, `rekening_id`),
  INDEX `idx_ppr_paket` (`paket_id`),
  INDEX `idx_ppr_rekening` (`rekening_id`),
  CONSTRAINT `fk_ppr_paket` FOREIGN KEY (`paket_id`) REFERENCES `paket_pekerjaan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_ppr_rekening` FOREIGN KEY (`rekening_id`) REFERENCES `rekening_belanja` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 9. Tabel: realisasi
-- --------------------------------------------------------
DROP TABLE IF EXISTS `realisasi`;
CREATE TABLE `realisasi` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `paket_id` INT UNSIGNED NOT NULL,
  `penyedia_id` INT UNSIGNED NOT NULL,
  `nomor_sp` VARCHAR(100) NOT NULL COMMENT 'Nomor Surat Pesanan / Kontrak',
  `tanggal_sp` DATE NOT NULL,
  `lama_pekerjaan` INT UNSIGNED NOT NULL COMMENT 'Lama Pekerjaan dalam Hari Kalender',
  `tanggal_mulai` DATE NOT NULL,
  `tanggal_selesai` DATE NOT NULL,
  `nilai_kontrak` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `nomor_bapsthp` VARCHAR(100) NULL COMMENT 'Nomor BAPSTHP',
  `nomor_bapb` VARCHAR(100) NULL COMMENT 'Nomor BAPB',
  `tanggal_ba` DATE NULL,
  `nomor_ba` VARCHAR(100) NULL COMMENT 'Nomor BA Pembayaran',
  `status` ENUM('draft', 'proses', 'selesai', 'batal') NOT NULL DEFAULT 'draft',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_realisasi_nomor_sp` (`nomor_sp`),
  INDEX `idx_realisasi_paket` (`paket_id`),
  INDEX `idx_realisasi_penyedia` (`penyedia_id`),
  CONSTRAINT `fk_realisasi_paket` FOREIGN KEY (`paket_id`) REFERENCES `paket_pekerjaan` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_realisasi_penyedia` FOREIGN KEY (`penyedia_id`) REFERENCES `penyedia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 10. Tabel: realisasi_rekening
-- --------------------------------------------------------
DROP TABLE IF EXISTS `realisasi_rekening`;
CREATE TABLE `realisasi_rekening` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `realisasi_id` INT UNSIGNED NOT NULL,
  `paket_rekening_id` INT UNSIGNED NOT NULL,
  `nilai_realisasi` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_realisasi_paket_rekening` (`realisasi_id`, `paket_rekening_id`),
  INDEX `idx_rr_realisasi` (`realisasi_id`),
  INDEX `idx_rr_paket_rekening` (`paket_rekening_id`),
  CONSTRAINT `fk_rr_realisasi` FOREIGN KEY (`realisasi_id`) REFERENCES `realisasi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_rr_paket_rekening` FOREIGN KEY (`paket_rekening_id`) REFERENCES `paket_pekerjaan_rekening` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 11. Tabel: pembayaran
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pembayaran`;
CREATE TABLE `pembayaran` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `realisasi_id` INT UNSIGNED NOT NULL,
  `nomor_transaksi` VARCHAR(100) NOT NULL,
  `tanggal_pembayaran` DATE NOT NULL,
  `nilai_pembayaran` DECIMAL(15,2) NOT NULL DEFAULT 0.00,
  `pembayaran_ke` INT UNSIGNED NOT NULL DEFAULT 1,
  `keterangan` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_pembayaran_nomor_transaksi` (`nomor_transaksi`),
  INDEX `idx_pembayaran_realisasi` (`realisasi_id`),
  INDEX `idx_pembayaran_tanggal` (`tanggal_pembayaran`),
  CONSTRAINT `fk_pembayaran_realisasi` FOREIGN KEY (`realisasi_id`) REFERENCES `realisasi` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 12. Tabel: pajak
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pajak`;
CREATE TABLE `pajak` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `pembayaran_id` INT UNSIGNED NOT NULL,
  `ppn` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT '(NILAI PEMBAYARAN / 1,11) * 11%',
  `pph21` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'MANUAL',
  `pph22` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT '(NILAI PEMBAYARAN / 1,11) * 1.5%',
  `pph23_jasa` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT '(NILAI PEMBAYARAN / 1,11) * 2%',
  `pph23_makan` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'NILAI PEMBAYARAN * 2%',
  `total_pajak` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'PPN + PPH21 + PPH22 + PPH23_JASA + PPH23_MAKAN',
  `nilai_bersih` DECIMAL(15,2) NOT NULL DEFAULT 0.00 COMMENT 'NILAI PEMBAYARAN - TOTAL PAJAK',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_pajak_pembayaran` (`pembayaran_id`),
  CONSTRAINT `fk_pajak_pembayaran` FOREIGN KEY (`pembayaran_id`) REFERENCES `pembayaran` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 13. Tabel: audit_logs
-- --------------------------------------------------------
DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NULL,
  `action` VARCHAR(50) NOT NULL,
  `table_name` VARCHAR(50) NULL,
  `record_id` INT UNSIGNED NULL,
  `description` TEXT NOT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_audit_user` (`user_id`),
  INDEX `idx_audit_action` (`action`),
  INDEX `idx_audit_created` (`created_at`),
  CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 14. Tabel: settings
-- --------------------------------------------------------
DROP TABLE IF EXISTS `settings`;
CREATE TABLE `settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `setting_key` VARCHAR(50) NOT NULL,
  `setting_value` TEXT NOT NULL,
  `setting_description` VARCHAR(255) NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_settings_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- SEED DATA INSERTION (TAHUN 2026)
-- =====================================================================

INSERT INTO `users` (`id`, `username`, `password`, `nama_lengkap`, `email`, `role`, `status`, `last_login`, `created_at`) VALUES
(1, 'admin', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Administrator Utama', 'admin@dinas.go.id', 'ADMIN', 'aktif', '2026-08-10 08:30:00', '2026-01-02 08:00:00'),
(2, 'operator_keuangan', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Ahmad Budiarto, S.E.', 'operator@dinas.go.id', 'OPERATOR', 'aktif', '2026-08-11 07:15:00', '2026-01-02 08:10:00'),
(3, 'pimpinan_uptd', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Drs. H. Hendra Wijaya, M.Si.', 'pimpinan@dinas.go.id', 'PIMPINAN', 'aktif', '2026-08-10 14:00:00', '2026-01-02 08:20:00');

INSERT INTO `settings` (`id`, `setting_key`, `setting_value`, `setting_description`) VALUES
(1, 'nama_dinas', 'DINAS TENAGA KERJA DAN TRANSMIGRASI', 'Nama Instansi Induk Dinas'),
(2, 'nama_uptd', 'UPTD PELATIHAN KERJA DANA ALOKASI APBD', 'Nama UPTD Pengelola Keuangan'),
(3, 'alamat_dinas', 'Jl. Jenderal Sudirman No. 45, Cilegon, Banten', 'Alamat Kantor'),
(4, 'kepala_uptd', 'Drs. H. Hendra Wijaya, M.Si.', 'Nama Kepala UPTD'),
(5, 'nip_kepala_uptd', '19750812 199803 1 002', 'NIP Kepala UPTD'),
(6, 'bendahara_pengeluaran', 'Siti Rahmawati, A.Md.', 'Nama Bendahara Pengeluaran'),
(7, 'nip_bendahara', '19880415 201101 2 005', 'NIP Bendahara Pengeluaran'),
(8, 'tahun_anggaran_aktif', '2026', 'Tahun Anggaran Berjalan'),
(9, 'versi_sistem', '1.0.0-PROD', 'Versi Sistem Informasi Keuangan');

INSERT INTO `program` (`id`, `kode_program`, `nama_program`, `tahun_anggaran`) VALUES
(1, '1.02.01', 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota', '2026'),
(2, '1.02.02', 'Program Pelatihan Kerja dan Produktivitas Tenaga Kerja', '2026'),
(3, '1.02.03', 'Program Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja', '2026');

INSERT INTO `kegiatan` (`id`, `program_id`, `kode_kegiatan`, `nama_kegiatan`) VALUES
(1, 1, '1.02.01.2.06', 'Pengadaan Barang Milik Daerah Penunjang Urusan Pemerintah Daerah'),
(2, 1, '1.02.01.2.08', 'Penyediaan Jasa Surat Menyurat, Komunikasi, Air dan Listrik'),
(3, 2, '1.02.02.2.01', 'Pelatihan Kerja Berbasis Kompetensi Tenaga Kerja UPTD'),
(4, 2, '1.02.02.2.02', 'Pemeliharaan Sarana dan Prasarana Workshop Pelatihan UPTD');

INSERT INTO `sub_kegiatan` (`id`, `program_id`, `kegiatan_id`, `kode_sub_kegiatan`, `nama_sub_kegiatan`) VALUES
(1, 1, 1, '1.02.01.2.06.02', 'Pengadaan Peralatan dan Mesin Kantor UPTD'),
(2, 1, 2, '1.02.01.2.08.01', 'Penyediaan Jasa Komunikasi, Sumber Daya Air dan Listrik'),
(3, 2, 3, '1.02.02.2.01.01', 'Pelaksanaan Pelatihan Vokasi dan Peningkatan Keterampilan Kerja'),
(4, 2, 4, '1.02.02.2.02.03', 'Pemeliharaan Rutin / Berkala Mesin Workshop Pelatihan');

INSERT INTO `rekening_belanja` (`id`, `kode_rekening`, `nama_rekening`, `jenis_belanja`) VALUES
(1, '5.1.02.01.01.0024', 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor', 'Belanja Barang dan Jasa'),
(2, '5.1.02.01.01.0026', 'Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak dan Penggandaan', 'Belanja Barang dan Jasa'),
(3, '5.1.02.01.01.0052', 'Belanja Makanan dan Minuman Rapat/Pelatihan', 'Belanja Barang dan Jasa'),
(4, '5.1.02.02.01.0003', 'Belanja Jasa Tenaga Ahli / Instruktur Pelatihan Vokasi', 'Belanja Barang dan Jasa'),
(5, '5.2.02.05.01.0001', 'Belanja Modal Peralatan Komputer dan Laptop Workshop', 'Belanja Modal'),
(6, '5.1.02.03.01.0010', 'Belanja Pemeliharaan Peralatan dan Mesin Workshop', 'Belanja Barang dan Jasa');

INSERT INTO `penyedia` (`id`, `nama_perusahaan`, `nama_penyedia`, `alamat`, `npwp`, `nama_bank`, `nomor_rekening`, `pemegang_rekening`) VALUES
(1, 'PT Mitra Teknologi Utama', 'Ir. Bambang Setyo', 'Jl. Ahmad Yani No. 102, Cilegon', '01.234.567.8-401.000', 'Bank BJB', '0089123456789', 'PT MITRA TEKNOLOGI UTAMA'),
(2, 'CV Anugerah Jaya Printing', 'H. Muhammad Ridwan', 'Jl. Raya Merak Km 4, Cilegon', '02.987.654.3-402.000', 'Bank Mandiri', '1630001234567', 'CV ANUGERAH JAYA PRINTING'),
(3, 'CV Bintang Catering Nusantara', 'Siti Mariam, S.Sos.', 'Jl. Sunan Bonang No. 15, Serang', '03.456.789.1-403.000', 'Bank BRI', '011201009876504', 'CV BINTANG CATERING NUSANTARA'),
(4, 'PT Servisindo Presisi Teknik', 'Deden Kurniawan', 'Kawasan Industri Cilegon Kav. C3', '04.111.222.3-404.000', 'Bank BCA', '8830192837', 'PT SERVISINDO PRESISE TEKNIK');

INSERT INTO `paket_pekerjaan` (`id`, `nomor_paket`, `sub_kegiatan_id`, `nama_paket`, `pagu_paket`, `tahun_anggaran`, `status`, `keterangan`) VALUES
(1, 'PKT-2026-001', 3, 'Pengadaan Bahan & Konsumsi Pelatihan Las Berbasis Kompetensi Batch 1', 125000000.00, '2026', 'berjalan', 'Paket pelatihan kerja berbasis vokasi 2026'),
(2, 'PKT-2026-002', 1, 'Pengadaan Komputer Laptop Workshop Komputer UPTD', 85000000.00, '2026', 'selesai', 'Pengadaan 5 unit laptop laboratorium'),
(3, 'PKT-2026-003', 4, 'Pemeliharaan Rutin Mesin Bubut dan Las Workshop Otomotif', 45000000.00, '2026', 'berjalan', 'Servis berkala dan penggantian suku cadang mesin pelatihan');

INSERT INTO `paket_pekerjaan_rekening` (`id`, `paket_id`, `rekening_id`, `pagu_rekening`) VALUES
(1, 1, 1, 25000000.00),
(2, 1, 2, 20000000.00),
(3, 1, 3, 50000000.00),
(4, 1, 4, 30000000.00),
(5, 2, 5, 85000000.00),
(6, 3, 6, 45000000.00);

INSERT INTO `realisasi` (`id`, `paket_id`, `penyedia_id`, `nomor_sp`, `tanggal_sp`, `lama_pekerjaan`, `tanggal_mulai`, `tanggal_selesai`, `nilai_kontrak`, `nomor_bapsthp`, `nomor_bapb`, `tanggal_ba`, `nomor_ba`, `status`) VALUES
(1, 1, 3, 'SP/UPTD-PEL/001/III/2026', '2026-03-01', 30, '2026-03-02', '2026-03-31', 120000000.00, 'BAPSTHP/001/IV/2026', 'BAPB/001/IV/2026', '2026-04-02', 'BA-PEMB/001/IV/2026', 'proses'),
(2, 2, 1, 'SP/UPTD-PEL/002/II/2026', '2026-02-10', 14, '2026-02-11', '2026-02-24', 82500000.00, 'BAPSTHP/002/III/2026', 'BAPB/002/III/2026', '2026-03-01', 'BA-PEMB/002/III/2026', 'selesai');

INSERT INTO `realisasi_rekening` (`id`, `realisasi_id`, `paket_rekening_id`, `nilai_realisasi`) VALUES
(1, 1, 1, 24000000.00),
(2, 1, 2, 18500000.00),
(3, 1, 3, 48000000.00),
(4, 1, 4, 29500000.00),
(5, 2, 5, 82500000.00);

INSERT INTO `pembayaran` (`id`, `realisasi_id`, `nomor_transaksi`, `tanggal_pembayaran`, `nilai_pembayaran`, `pembayaran_ke`, `keterangan`) VALUES
(1, 1, 'TRX-2026-04-001', '2026-04-05', 60000000.00, 1, 'Pembayaran Termin 1 (50%) Pekerjaan Pelatihan Las Batch 1'),
(2, 2, 'TRX-2026-03-012', '2026-03-05', 82500000.00, 1, 'Pembayaran Lunas 100% Pengadaan Laptop Workshop');

INSERT INTO `pajak` (`id`, `pembayaran_id`, `ppn`, `pph21`, `pph22`, `pph23_jasa`, `pph23_makan`, `total_pajak`, `nilai_bersih`) VALUES
(1, 1, 5945945.95, 0.00, 0.00, 0.00, 1200000.00, 7145945.95, 52854054.05),
(2, 2, 8175675.68, 0.00, 1114864.86, 0.00, 0.00, 9290540.54, 73209459.46);

INSERT INTO `audit_logs` (`id`, `user_id`, `action`, `table_name`, `record_id`, `description`, `ip_address`, `user_agent`) VALUES
(1, 1, 'INSERT', 'users', 1, 'Inisialisasi user Administrator Sistem', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'),
(2, 2, 'INSERT', 'paket_pekerjaan', 1, 'Membuat Paket Pekerjaan PKT-2026-001 senilai Rp 125.000.000', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'),
(3, 2, 'INSERT', 'pembayaran', 1, 'Input pembayaran TRX-2026-04-001 sebesar Rp 60.000.000', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0');

SET FOREIGN_KEY_CHECKS = 1;
