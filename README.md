# SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS (SIMKEU UPTD)

![PHP Version](https://img.shields.io/badge/PHP-8.2%2B-blue)
![Database](https://img.shields.io/badge/Database-MySQL%208.x-orange)
![Architecture](https://img.shields.io/badge/Architecture-PHP%20Native%20MVC-emerald)
![Security](https://img.shields.io/badge/Security-PDO%20%7C%20CSRF%20%7C%20XSS%20%7C%20BCRYPT-rose)

Sistem Informasi Anggaran dan Realisasi Keuangan Dinas (SIMKEU UPTD) adalah aplikasi manajemen keuangan berbasis web yang dirancang khusus untuk mengelola anggaran, alokasi multi-rekening belanja, transaksi realisasi pekerjaan, pembayaran SP2D, kalkulasi pajak otomatis (PPN, PPh21, PPh22, PPh23 Jasa & PPh23 Makan), eksekutif dashboard, serta laporan keuangan instansi pemerintah.

---

## 🏛️ ARSITEKTUR APLIKASI (PHP NATIVE MVC)

Aplikasi ini menggunakan pola desain **Model-View-Controller (MVC)** murni tanpa framework berat, memastikan performa tinggi dan kemudahan eksekusi di lingkungan XAMPP Windows.

```text
keuangan/
├── app/
│   ├── controllers/
│   │   ├── AuthController.php
│   │   ├── MasterController.php
│   │   ├── PaketPekerjaanController.php
│   │   ├── RealisasiController.php
│   │   ├── PembayaranController.php
│   │   ├── DashboardController.php
│   │   ├── LaporanController.php
│   │   ├── ImportExportController.php
│   │   └── SystemController.php
│   ├── models/
│   │   ├── AuthModel.php
│   │   ├── MasterModel.php
│   │   ├── PaketPekerjaanModel.php
│   │   ├── RealisasiModel.php
│   │   ├── PembayaranModel.php
│   │   ├── DashboardModel.php
│   │   ├── LaporanModel.php
│   │   ├── ImportExportModel.php
│   │   └── SystemModel.php
│   ├── views/
│   │   ├── layout/
│   │   ├── auth/
│   │   ├── master/
│   │   ├── paket/
│   │   ├── realisasi/
│   │   ├── pembayaran/
│   │   ├── dashboard/
│   │   ├── laporan/
│   │   ├── import_export/
│   │   └── system/
│   ├── helpers/
│   └── libraries/
├── config/
│   ├── config.php
│   └── database.php
├── database/
│   ├── db_keuangan_uptd.sql
│   └── seed_data.sql
├── public/
│   ├── css/
│   ├── js/
│   └── uploads/
├── storage/
│   ├── backups/
│   ├── logs/
│   └── exports/
├── index.php
└── .htaccess
```

---

## 📊 RELASI DAN ENTITAS DATABASE (`db_keuangan_uptd`)

Aplikasi mengelola rantai relasi data transaksi keuangan dari hulu ke hilir:
```text
PROGRAM ──> KEGIATAN ──> SUB KEGIATAN ──> PAKET PEKERJAAN ──> PAKET_PEKERJAAN_REKENING ──> REKENING BELANJA
                                                │
                                                └──> REALISASI ──> PEMBAYARAN ──> PAJAK
```

---

## 🛡️ RUMUS DAN VALIDASI PAJAK (PAJAK CALCULATOR)

- **PPN 11%**: `(Nilai Pembayaran / 1,11) × 11%`
- **PPh21**: Input Manual Sesuai Tarif Efektif / Golongan.
- **PPh22 (Barang)**: `(Nilai Pembayaran / 1,11) × 1,5%`
- **PPh23 (Jasa)**: `(Nilai Pembayaran / 1,11) × 2%`
- **PPh23 (Makan/Konsumsi)**: `Nilai Pembayaran × 2%`
- **Total Potongan Pajak**: `PPN + PPh21 + PPh22 + PPh23 Jasa + PPh23 Makan`
- **Nilai Bersih Diterima Penyedia**: `Nilai Pembayaran - Total Potongan Pajak`

*Perhitungan pajak berjalan realtime di browser (JavaScript) dan divalidasi ulang secara persisten di server PHP.*

---

## 🔑 PERANAN & AKSES USER (ROLES)

1. **ADMIN**: Akses penuh seluruh master data, transaksi, audit log, backup database & pengaturan instansi.
2. **OPERATOR**: Mengelola master data, merekam transaksi realisasi, pembayaran SP2D, kalkulasi pajak, dan mengunduh laporan.
3. **PIMPINAN**: Memantau Executive Dashboard, visualisasi realisasi anggaran, statistik pekerjaan, serta ekspor dokumen PDF/Excel.

---

## ⚡ PETUNJUK MEMULAI (QUICK START)
1. Salin seluruh folder aplikasi ke `C:\xampp\htdocs\keuangan`.
2. Impor `database/db_keuangan_uptd.sql` ke phpMyAdmin.
3. Buka browser di `http://localhost/keuangan/`.
4. Untuk petunjuk detail instalasi & troubleshooting, silakan baca **[INSTALL_XAMPP.md](INSTALL_XAMPP.md)**.

---
*Sistem Informasi Anggaran dan Realisasi Keuangan Dinas - Dikembangkan dengan standar PHP Native MVC, PDO Security & Strict Financial Validation Rules.*
