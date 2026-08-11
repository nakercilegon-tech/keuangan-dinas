<?php
/**
 * AuthController - Otentikasi & Sesi
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';

class AuthController extends BaseController {

    private $userModel;

    public function __construct() {
        $this->userModel = new UserModel();
    }

    /**
     * Tampilkan Halaman Login
     */
    public function login() {
        AuthMiddleware::checkGuest();

        $data = [
            'page_title' => 'Login System - SIMKEU UPTD',
            'csrf_token' => $this->generateCsrfToken()
        ];

        $this->render('auth/login', $data, false); // No main layout
    }

    /**
     * Proses Submit Login
     */
    public function processLogin() {
        AuthMiddleware::checkGuest();

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('auth/login');
        }

        // Validasi CSRF Token
        if (!isset($_POST['csrf_token']) || !verifyCsrfToken($_POST['csrf_token'])) {
            $this->setFlash('flash_error', 'Sesi tidak valid (CSRF Token Mismatch). Silakan coba lagi.');
            $this->redirect('auth/login');
        }

        $username = trim($_POST['username'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if (empty($username) || empty($password)) {
            $this->setFlash('flash_error', 'Username dan Password wajib diisi.');
            $this->redirect('auth/login');
        }

        $user = $this->userModel->verifyCredentials($username, $password);

        if ($user) {
            // Set Session Data
            session_regenerate_id(true);
            $_SESSION['user_id']       = $user['id'];
            $_SESSION['username']      = $user['username'];
            $_SESSION['nama_lengkap']  = $user['nama_lengkap'];
            $_SESSION['user_email']    = $user['email'];
            $_SESSION['user_role']     = $user['role'];
            $_SESSION['login_time']    = time();

            // Record Audit Log
            $this->recordAuditLog($user['id'], 'LOGIN', 'Berhasil login ke sistem dari IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'));

            $this->setFlash('flash_success', 'Selamat datang kembali, ' . $user['nama_lengkap'] . ' (' . $user['role'] . ')');
            $this->redirect('dashboard');
        } else {
            $this->setFlash('flash_error', 'Username atau Password salah, atau akun Anda dinonaktifkan.');
            $this->redirect('auth/login');
        }
    }

    /**
     * Proses Logout
     */
    public function logout() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (isset($_SESSION['user_id'])) {
            $this->recordAuditLog($_SESSION['user_id'], 'LOGOUT', 'User berhasil keluar dari sistem');
        }

        // Unset and destroy session
        $_SESSION = array();

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }

        session_destroy();

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        $this->setFlash('flash_success', 'Anda telah keluar dari sistem.');
        $this->redirect('auth/login');
    }

    /**
     * Internal Audit Log Helper
     */
    private function recordAuditLog($userId, $action, $details) {
        try {
            $sql = "INSERT INTO audit_logs (user_id, action, module, details, ip_address, created_at) 
                    VALUES (:user_id, :action, 'AUTH', :details, :ip, NOW())";
            $this->userModel->execute($sql, [
                'user_id' => $userId,
                'action'  => $action,
                'details' => $details,
                'ip'      => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
            ]);
        } catch (Exception $e) {
            // Log silently or ignore
        }
    }
}
