# INSTALLATION GUIDE - XAMPP WINDOWS
## SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS (SIMKEU UPTD)

Aplikasi **Sistem Informasi Anggaran dan Realisasi Keuangan Dinas** dibangun menggunakan arsitektur **PHP Native MVC** yang ringan, aman, dan kompatibel dengan lingkungan XAMPP Windows.

---

### PERSYARATAN SISTEM (SYSTEM REQUIREMENTS)
1. **XAMPP Windows**: Versi 8.2 atau yang lebih baru.
2. **PHP**: Versi 8.2+ dengan ekstensi `pdo_mysql`, `mbstring`, `gd`, dan `zip` aktif.
3. **Database**: MySQL 8.x / MariaDB 10.4+.
4. **Web Server**: Apache Web Server (Included in XAMPP).
5. **Browser**: Google Chrome, Mozilla Firefox, atau Microsoft Edge versi terbaru.

---

### LANGKAH INSTALASI DAN DEPLOYMENT (STEP-BY-STEP)

#### STEP 1: Persiapan Folder Aplikasi di XAMPP
1. Download atau salin seluruh folder proyek `keuangan` ke direktori `htdocs` XAMPP Anda:
   ```text
   C:\xampp\htdocs\keuangan
   ```
2. Pastikan struktur direktori berikut terbentuk dengan benar:
   ```text
   C:\xampp\htdocs\keuangan\
   ├── app/
   ├── config/
   ├── database/
   ├── public/
   ├── storage/
   ├── index.php
   ├── .htaccess
   ├── README.md
   └── INSTALL_XAMPP.md
   ```

#### STEP 2: Jalankan Apache dan MySQL pada XAMPP Control Panel
1. Buka **XAMPP Control Panel**.
2. Klik tombol **Start** pada modul **Apache**.
3. Klik tombol **Start** pada modul **MySQL**.
4. Pastikan kedua indikator berubah menjadi warna **Hijau**.

#### STEP 3: Buat dan Impor Database MySQL (`db_keuangan_uptd`)
1. Buka browser dan akses **phpMyAdmin** melalui URL:
   ```text
   http://localhost/phpmyadmin/
   ```
2. Klik menu **Databases** / **Basis Data**.
3. Buat database baru dengan nama:
   ```text
   db_keuangan_uptd
   ```
   *Collation: `utf8mb4_general_ci` atau `utf8mb4_unicode_ci`.*
4. Pilih database `db_keuangan_uptd`, lalu klik tab **Import**.
5. Pilih file skema SQL utama yang berada di:
   ```text
   C:\xampp\htdocs\keuangan\database\db_keuangan_uptd.sql
   ```
6. Klik **Go** / **Kirim** untuk mengeksekusi pembuatan seluruh tabel (`users`, `program`, `kegiatan`, `sub_kegiatan`, `rekening_belanja`, `penyedia`, `paket_pekerjaan`, `paket_pekerjaan_rekening`, `realisasi`, `realisasi_rekening`, `pembayaran`, `pajak`, `audit_logs`, `settings`).
7. *(Opsional)* Impor file data awal:
   ```text
   C:\xampp\htdocs\keuangan\database\seed_data.sql
   ```

#### STEP 4: Konfigurasi Koneksi Database PHP
1. Buka file `config/database.php` menggunakan text editor (VS Code / Notepad++).
2. Sesuaikan kredensial database lokal XAMPP Anda:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'db_keuangan_uptd');
   define('DB_USER', 'root');
   define('DB_PASS', ''); // Kosongkan jika XAMPP default
   define('DB_PORT', '3306');
   ```

#### STEP 5: Akses Aplikasi di Web Browser
Buka web browser dan akses URL berikut:
```text
http://localhost/keuangan/
```

---

### AKUN LOGIN DEFAULT (DEFAULT CREDENTIALS)

Aplikasi memiliki 3 peranan (role) utama dengan password terenkripsi BCRYPT:

| Role | Username | Password Default | Hak Akses & Wewenang |
| :--- | :--- | :--- | :--- |
| **ADMIN** | `admin` | `admin123` | Akses penuh seluruh modul master, transaksi, audit, backup & settings. |
| **OPERATOR** | `operator` | `operator123` | Input/edit master, transaksi realisasi, pembayaran, pajak & laporan. |
| **PIMPINAN** | `pimpinan` | `pimpinan123` | Akses executive dashboard, pantau laporan & ekspor dokumen. |

---

### CARA BACKUP & RESTORE DATABASE
1. **Backup Database**:
   - Masuk ke aplikasi sebagai **ADMIN**.
   - Buka menu **Pusat Keamanan, Audit & Backup** (Tahap 11).
   - Pilih tab **Backup & Restore Database**, lalu klik tombol **Generate SQL Backup Now**.
   - File cadangan SQL akan disimpan di folder `storage/backups/`.
2. **Restore Database**:
   - Pilih file backup dari daftar tabel.
   - Klik tombol **Restore**, lalu konfirmasi dialog peringatan.

---

### TROUBLESHOOTING UMUM

1. **Error `Database Connection Failed`**:
   - Pastikan MySQL service di XAMPP Control Panel sudah dalam keadaan **Started**.
   - Periksa kembali nama database `db_keuangan_uptd` dan port `3306` di `config/database.php`.

2. **Error `404 Not Found` atau Route Gagal**:
   - Pastikan modul `mod_rewrite` Apache aktif di XAMPP (`httpd.conf`).
   - Pastikan file `.htaccess` di root `C:\xampp\htdocs\keuangan\` tersedia dan tidak terhapus.

3. **Error Folder Permission (`storage/` or `public/uploads/`)**:
   - Di Windows, pastikan folder `storage/` dan `public/uploads/` memiliki izin Tulis (Write Permission).

---
*Dokumen Instalasi Resmi SIMKEU UPTD - Dinas Tenaga Kerja dan Transmigrasi.*
