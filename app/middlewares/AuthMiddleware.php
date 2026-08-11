<?php
/**
 * Authentication & Authorization Middleware
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/../helpers/functions.php';

class AuthMiddleware {

    /**
     * Pastikan Pengguna Sudah Login
     */
    public static function checkAuth() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (!isset($_SESSION['user_id']) || empty($_SESSION['user_id'])) {
            $_SESSION['flash_error'] = "Silakan login terlebih dahulu untuk mengakses sistem.";
            header('Location: ' . BASE_URL . 'auth/login');
            exit();
        }
    }

    /**
     * Otorisasi Berdasarkan Role Pengguna
     * @param array $allowedRoles Array of allowed roles e.g. ['ADMIN', 'OPERATOR']
     */
    public static function checkRole($allowedRoles = []) {
        self::checkAuth();

        $userRole = $_SESSION['user_role'] ?? '';

        if (!empty($allowedRoles) && !in_array($userRole, $allowedRoles)) {
            $_SESSION['flash_error'] = "Akses ditolak: Anda tidak memiliki wewenang untuk membuka halaman tersebut.";
            header('Location: ' . BASE_URL . 'dashboard');
            exit();
        }
    }

    /**
     * Cegah Halaman Login Dibuka Jika Sudah Authenticated
     */
    public static function checkGuest() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
            header('Location: ' . BASE_URL . 'dashboard');
            exit();
        }
    }
}
