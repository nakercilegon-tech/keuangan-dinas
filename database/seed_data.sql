-- =====================================================================
-- SEED DATA TAHUN 2026 FOR SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS
-- DATABASE: db_keuangan_uptd
-- =====================================================================

USE `db_keuangan_uptd`;

SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- Data Seed: users
-- Password default: 'admin123', 'operator123', 'pimpinan123' (didekripsi via password_hash bcrypt)
-- --------------------------------------------------------
TRUNCATE TABLE `users`;
INSERT INTO `users` (`id`, `username`, `password`, `nama_lengkap`, `email`, `role`, `status`, `last_login`, `created_at`) VALUES
(1, 'admin', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Administrator Utama', 'admin@dinas.go.id', 'ADMIN', 'aktif', '2026-08-10 08:30:00', '2026-01-02 08:00:00'),
(2, 'operator_keuangan', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Ahmad Budiarto, S.E.', 'operator@dinas.go.id', 'OPERATOR', 'aktif', '2026-08-11 07:15:00', '2026-01-02 08:10:00'),
(3, 'pimpinan_uptd', '$2y$10$e.C0p/0gA5sF.gWn6D1O3uO21G1sT5M0V5O0E0A0S0T0E0R0N0E', 'Drs. H. Hendra Wijaya, M.Si.', 'pimpinan@dinas.go.id', 'PIMPINAN', 'aktif', '2026-08-10 14:00:00', '2026-01-02 08:20:00');

-- --------------------------------------------------------
-- Data Seed: settings
-- --------------------------------------------------------
TRUNCATE TABLE `settings`;
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

-- --------------------------------------------------------
-- Data Seed: program (Tahun 2026)
-- --------------------------------------------------------
TRUNCATE TABLE `program`;
INSERT INTO `program` (`id`, `kode_program`, `nama_program`, `tahun_anggaran`) VALUES
(1, '1.02.01', 'Program Penunjang Urusan Pemerintahan Daerah Kabupaten/Kota', '2026'),
(2, '1.02.02', 'Program Pelatihan Kerja dan Produktivitas Tenaga Kerja', '2026'),
(3, '1.02.03', 'Program Penempatan Tenaga Kerja dan Perluasan Kesempatan Kerja', '2026');

-- --------------------------------------------------------
-- Data Seed: kegiatan
-- --------------------------------------------------------
TRUNCATE TABLE `kegiatan`;
INSERT INTO `kegiatan` (`id`, `program_id`, `kode_kegiatan`, `nama_kegiatan`) VALUES
(1, 1, '1.02.01.2.06', 'Pengadaan Barang Milik Daerah Penunjang Urusan Pemerintah Daerah'),
(2, 1, '1.02.01.2.08', 'Penyediaan Jasa Surat Menyurat, Komunikasi, Air dan Listrik'),
(3, 2, '1.02.02.2.01', 'Pelatihan Kerja Berbasis Kompetensi Tenaga Kerja UPTD'),
(4, 2, '1.02.02.2.02', 'Pemeliharaan Sarana dan Prasarana Workshop Pelatihan UPTD');

-- --------------------------------------------------------
-- Data Seed: sub_kegiatan
-- --------------------------------------------------------
TRUNCATE TABLE `sub_kegiatan`;
INSERT INTO `sub_kegiatan` (`id`, `program_id`, `kegiatan_id`, `kode_sub_kegiatan`, `nama_sub_kegiatan`) VALUES
(1, 1, 1, '1.02.01.2.06.02', 'Pengadaan Peralatan dan Mesin Kantor UPTD'),
(2, 1, 2, '1.02.01.2.08.01', 'Penyediaan Jasa Komunikasi, Sumber Daya Air dan Listrik'),
(3, 2, 3, '1.02.02.2.01.01', 'Pelaksanaan Pelatihan Vokasi dan Peningkatan Keterampilan Kerja'),
(4, 2, 4, '1.02.02.2.02.03', 'Pemeliharaan Rutin / Berkala Mesin Workshop Pelatihan');

-- --------------------------------------------------------
-- Data Seed: rekening_belanja
-- --------------------------------------------------------
TRUNCATE TABLE `rekening_belanja`;
INSERT INTO `rekening_belanja` (`id`, `kode_rekening`, `nama_rekening`, `jenis_belanja`) VALUES
(1, '5.1.02.01.01.0024', 'Belanja Alat/Bahan untuk Kegiatan Kantor-Alat Tulis Kantor', 'Belanja Barang dan Jasa'),
(2, '5.1.02.01.01.0026', 'Belanja Alat/Bahan untuk Kegiatan Kantor- Bahan Cetak dan Penggandaan', 'Belanja Barang dan Jasa'),
(3, '5.1.02.01.01.0052', 'Belanja Makanan dan Minuman Rapat/Pelatihan', 'Belanja Barang dan Jasa'),
(4, '5.1.02.02.01.0003', 'Belanja Jasa Tenaga Ahli / Instruktur Pelatihan Vokasi', 'Belanja Barang dan Jasa'),
(5, '5.2.02.05.01.0001', 'Belanja Modal Peralatan Komputer dan Laptop Workshop', 'Belanja Modal'),
(6, '5.1.02.03.01.0010', 'Belanja Pemeliharaan Peralatan dan Mesin Workshop', 'Belanja Barang dan Jasa');

-- --------------------------------------------------------
-- Data Seed: penyedia
-- --------------------------------------------------------
TRUNCATE TABLE `penyedia`;
INSERT INTO `penyedia` (`id`, `nama_perusahaan`, `nama_penyedia`, `alamat`, `npwp`, `nama_bank`, `nomor_rekening`, `pemegang_rekening`) VALUES
(1, 'PT Mitra Teknologi Utama', 'Ir. Bambang Setyo', 'Jl. Ahmad Yani No. 102, Cilegon', '01.234.567.8-401.000', 'Bank BJB', '0089123456789', 'PT MITRA TEKNOLOGI UTAMA'),
(2, 'CV Anugerah Jaya Printing', 'H. Muhammad Ridwan', 'Jl. Raya Merak Km 4, Cilegon', '02.987.654.3-402.000', 'Bank Mandiri', '1630001234567', 'CV ANUGERAH JAYA PRINTING'),
(3, 'CV Bintang Catering Nusantara', 'Siti Mariam, S.Sos.', 'Jl. Sunan Bonang No. 15, Serang', '03.456.789.1-403.000', 'Bank BRI', '011201009876504', 'CV BINTANG CATERING NUSANTARA'),
(4, 'PT Servisindo Presisi Teknik', 'Deden Kurniawan', 'Kawasan Industri Cilegon Kav. C3', '04.111.222.3-404.000', 'Bank BCA', '8830192837', 'PT SERVISINDO PRESISE TEKNIK');

-- --------------------------------------------------------
-- Data Seed: paket_pekerjaan
-- --------------------------------------------------------
TRUNCATE TABLE `paket_pekerjaan`;
INSERT INTO `paket_pekerjaan` (`id`, `nomor_paket`, `sub_kegiatan_id`, `nama_paket`, `pagu_paket`, `tahun_anggaran`, `status`, `keterangan`) VALUES
(1, 'PKT-2026-001', 3, 'Pengadaan Bahan & Konsumsi Pelatihan Las Berbasis Kompetensi Batch 1', 125000000.00, '2026', 'berjalan', 'Paket pelatihan kerja berbasis vokasi 2026'),
(2, 'PKT-2026-002', 1, 'Pengadaan Komputer Laptop Workshop Komputer UPTD', 85000000.00, '2026', 'selesai', 'Pengadaan 5 unit laptop laboratorium'),
(3, 'PKT-2026-003', 4, 'Pemeliharaan Rutin Mesin Bubut dan Las Workshop Otomotif', 45000000.00, '2026', 'berjalan', 'Servis berkala dan penggantian suku cadang mesin pelatihan');

-- --------------------------------------------------------
-- Data Seed: paket_pekerjaan_rekening
-- --------------------------------------------------------
TRUNCATE TABLE `paket_pekerjaan_rekening`;
INSERT INTO `paket_pekerjaan_rekening` (`id`, `paket_id`, `rekening_id`, `pagu_rekening`) VALUES
(1, 1, 1, 25000000.00), -- ATK Pelatihan
(2, 1, 2, 20000000.00), -- Bahan Cetak Modul
(3, 1, 3, 50000000.00), -- Makan Minum Peserta & Instruktur
(4, 1, 4, 30000000.00), -- Honor Jasa Instruktur
(5, 2, 5, 85000000.00), -- Belanja Modal Komputer
(6, 3, 6, 45000000.00); -- Belanja Pemeliharaan Mesin

-- --------------------------------------------------------
-- Data Seed: realisasi
-- --------------------------------------------------------
TRUNCATE TABLE `realisasi`;
INSERT INTO `realisasi` (`id`, `paket_id`, `penyedia_id`, `nomor_sp`, `tanggal_sp`, `lama_pekerjaan`, `tanggal_mulai`, `tanggal_selesai`, `nilai_kontrak`, `nomor_bapsthp`, `nomor_bapb`, `tanggal_ba`, `nomor_ba`, `status`) VALUES
(1, 1, 3, 'SP/UPTD-PEL/001/III/2026', '2026-03-01', 30, '2026-03-02', '2026-03-31', 120000000.00, 'BAPSTHP/001/IV/2026', 'BAPB/001/IV/2026', '2026-04-02', 'BA-PEMB/001/IV/2026', 'proses'),
(2, 2, 1, 'SP/UPTD-PEL/002/II/2026', '2026-02-10', 14, '2026-02-11', '2026-02-24', 82500000.00, 'BAPSTHP/002/III/2026', 'BAPB/002/III/2026', '2026-03-01', 'BA-PEMB/002/III/2026', 'selesai');

-- --------------------------------------------------------
-- Data Seed: realisasi_rekening
-- --------------------------------------------------------
TRUNCATE TABLE `realisasi_rekening`;
INSERT INTO `realisasi_rekening` (`id`, `realisasi_id`, `paket_rekening_id`, `nilai_realisasi`) VALUES
(1, 1, 1, 24000000.00),
(2, 1, 2, 18500000.00),
(3, 1, 3, 48000000.00),
(4, 1, 4, 29500000.00),
(5, 2, 5, 82500000.00);

-- --------------------------------------------------------
-- Data Seed: pembayaran
-- --------------------------------------------------------
TRUNCATE TABLE `pembayaran`;
INSERT INTO `pembayaran` (`id`, `realisasi_id`, `nomor_transaksi`, `tanggal_pembayaran`, `nilai_pembayaran`, `pembayaran_ke`, `keterangan`) VALUES
(1, 1, 'TRX-2026-04-001', '2026-04-05', 60000000.00, 1, 'Pembayaran Termin 1 (50%) Pekerjaan Pelatihan Las Batch 1'),
(2, 2, 'TRX-2026-03-012', '2026-03-05', 82500000.00, 1, 'Pembayaran Lunas 100% Pengadaan Laptop Workshop');

-- --------------------------------------------------------
-- Data Seed: pajak
-- Kalkulasi Sesuai Rumus Kontrak Proyek:
-- Pembayaran 1: Nilai = Rp 60.000.000 (Makan Minum / Jasa)
-- PPN = (60.000.000 / 1.11) * 0.11 = 5.945.945,95
-- PPH22 = (60.000.000 / 1.11) * 0.015 = 810.810,81
-- PPH23 Jasa = (60.000.000 / 1.11) * 0.02 = 1.081.081,08
-- Total Pajak = 7.837.837,84
-- Nilai Bersih = 52.162.162,16
-- --------------------------------------------------------
TRUNCATE TABLE `pajak`;
INSERT INTO `pajak` (`id`, `pembayaran_id`, `ppn`, `pph21`, `pph22`, `pph23_jasa`, `pph23_makan`, `total_pajak`, `nilai_bersih`) VALUES
(1, 1, 5945945.95, 0.00, 0.00, 0.00, 1200000.00, 7145945.95, 52854054.05),
(2, 2, 8175675.68, 0.00, 1114864.86, 0.00, 0.00, 9290540.54, 73209459.46);

-- --------------------------------------------------------
-- Data Seed: audit_logs
-- --------------------------------------------------------
TRUNCATE TABLE `audit_logs`;
INSERT INTO `audit_logs` (`id`, `user_id`, `action`, `table_name`, `record_id`, `description`, `ip_address`, `user_agent`) VALUES
(1, 1, 'INSERT', 'users', 1, 'Inisialisasi user Administrator Sistem', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'),
(2, 2, 'INSERT', 'paket_pekerjaan', 1, 'Membuat Paket Pekerjaan PKT-2026-001 senilai Rp 125.000.000', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0'),
(3, 2, 'INSERT', 'pembayaran', 1, 'Input pembayaran TRX-2026-04-001 sebesar Rp 60.000.000', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0');

SET FOREIGN_KEY_CHECKS = 1;
