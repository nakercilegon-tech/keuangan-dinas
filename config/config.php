<?php
/**
 * Configuration File
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

// Basic App Configurations
define('APP_NAME', 'SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS');
define('APP_SHORT_NAME', 'SIMKEU UPTD');
define('APP_VERSION', '1.0.0-PROD');

// Base URL Configuration (XAMPP default: http://localhost/keuangan/)
define('BASE_URL', 'http://localhost/keuangan/');

// Timezone and Locale Setup
date_default_timezone_set('Asia/Jakarta');
setlocale(LC_TIME, 'id_ID.utf8', 'indonesian');

// Database Configurations
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'db_keuangan_uptd');
define('DB_CHARSET', 'utf8mb4');

// Session Security Configuration
if (session_status() === PHP_SESSION_NONE) {
    ini_set('session.cookie_httponly', 1);
    ini_set('session.use_only_cookies', 1);
    session_start();
}

// Upload Directories
define('UPLOAD_DIR', __DIR__ . '/../public/uploads/');
define('STORAGE_DIR', __DIR__ . '/../storage/');
