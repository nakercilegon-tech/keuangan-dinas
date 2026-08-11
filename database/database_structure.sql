-- =====================================================================
-- DATABASE STRUCTURE FOR SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS
-- DATABASE: db_keuangan_uptd
-- ENGINE: InnoDB | CHARSET: utf8mb4 | COLLATION: utf8mb4_unicode_ci
-- TAHAP 1: ARSITEKTUR & STRUKTUR TABEL LENGKAP
-- =====================================================================

CREATE DATABASE IF NOT EXISTS `db_keuangan_uptd` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `db_keuangan_uptd`;

-- Disable Foreign Key Checks during setup
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

-- Re-enable Foreign Key Checks
SET FOREIGN_KEY_CHECKS = 1;
