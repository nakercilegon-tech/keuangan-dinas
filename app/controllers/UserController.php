<?php
/**
 * UserController - Manajemen Pengguna (Role ADMIN)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/UserModel.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';

class UserController extends BaseController {

    private $userModel;

    public function __construct() {
        // Hanya ADMIN yang boleh mengakses manajemen user
        AuthMiddleware::checkRole(['ADMIN']);
        $this->userModel = new UserModel();
    }

    /**
     * Index - Daftar Semua User
     */
    public function index() {
        $search = $_GET['search'] ?? '';
        $role   = $_GET['role'] ?? '';

        $users = $this->userModel->getAllUsers($search, $role);

        $data = [
            'page_title' => 'Manajemen Pengguna System - SIMKEU UPTD',
            'active_menu' => 'users',
            'users'      => $users,
            'search'     => $search,
            'role_filter' => $role
        ];

        $this->render('users/index', $data);
    }

    /**
     * Tampilkan Form Tambah User
     */
    public function create() {
        $data = [
            'page_title'  => 'Tambah Pengguna Baru - SIMKEU UPTD',
            'active_menu' => 'users',
            'csrf_token'  => $this->generateCsrfToken()
        ];

        $this->render('users/create', $data);
    }

    /**
     * Simpan User Baru
     */
    public function store() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('users');
        }

        if (!isset($_POST['csrf_token']) || !verifyCsrfToken($_POST['csrf_token'])) {
            $this->setFlash('flash_error', 'Sesi tidak valid. Coba lagi.');
            $this->redirect('users/create');
        }

        $username     = trim($_POST['username'] ?? '');
        $password     = trim($_POST['password'] ?? '');
        $nama_lengkap = trim($_POST['nama_lengkap'] ?? '');
        $email        = trim($_POST['email'] ?? '');
        $role         = trim($_POST['role'] ?? 'OPERATOR');

        if (empty($username) || empty($password) || empty($nama_lengkap) || empty($email)) {
            $this->setFlash('flash_error', 'Field Username, Password, Nama Lengkap, dan Email wajib diisi.');
            $this->redirect('users/create');
        }

        if ($this->userModel->isUsernameExists($username)) {
            $this->setFlash('flash_error', "Username '{$username}' sudah digunakan.");
            $this->redirect('users/create');
        }

        $userData = [
            'username'     => $username,
            'password'     => $password,
            'nama_lengkap' => $nama_lengkap,
            'email'        => $email,
            'nip'          => trim($_POST['nip'] ?? ''),
            'jabatan'      => trim($_POST['jabatan'] ?? ''),
            'role'         => $role,
            'status'       => trim($_POST['status'] ?? 'aktif')
        ];

        if ($this->userModel->createUser($userData)) {
            $this->setFlash('flash_success', 'Pengguna baru berhasil ditambahkan.');
            $this->redirect('users');
        } else {
            $this->setFlash('flash_error', 'Gagal menambahkan pengguna baru.');
            $this->redirect('users/create');
        }
    }

    /**
     * Form Edit User
     */
    public function edit($id) {
        $user = $this->userModel->findById($id);

        if (!$user) {
            $this->setFlash('flash_error', 'Pengguna tidak ditemukan.');
            $this->redirect('users');
        }

        $data = [
            'page_title'  => 'Edit Pengguna - ' . $user['nama_lengkap'],
            'active_menu' => 'users',
            'user'        => $user,
            'csrf_token'  => $this->generateCsrfToken()
        ];

        $this->render('users/edit', $data);
    }

    /**
     * Update Data User
     */
    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('users');
        }

        if (!isset($_POST['csrf_token']) || !verifyCsrfToken($_POST['csrf_token'])) {
            $this->setFlash('flash_error', 'Sesi tidak valid.');
            $this->redirect('users/edit/' . $id);
        }

        $userData = [
            'nama_lengkap' => trim($_POST['nama_lengkap'] ?? ''),
            'email'        => trim($_POST['email'] ?? ''),
            'nip'          => trim($_POST['nip'] ?? ''),
            'jabatan'      => trim($_POST['jabatan'] ?? ''),
            'role'         => trim($_POST['role'] ?? 'OPERATOR'),
            'status'       => trim($_POST['status'] ?? 'aktif'),
            'password'     => trim($_POST['password'] ?? '') // Opsional jika diisi
        ];

        if ($this->userModel->updateUser($id, $userData)) {
            $this->setFlash('flash_success', 'Data pengguna berhasil diperbarui.');
            $this->redirect('users');
        } else {
            $this->setFlash('flash_error', 'Gagal memperbarui data pengguna.');
            $this->redirect('users/edit/' . $id);
        }
    }

    /**
     * Hapus User
     */
    public function delete($id) {
        // Mencegah hapus akun sendiri
        if ($id == $_SESSION['user_id']) {
            $this->setFlash('flash_error', 'Anda tidak dapat menghapus akun Anda sendiri yang sedang aktif.');
            $this->redirect('users');
        }

        if ($this->userModel->deleteUser($id)) {
            $this->setFlash('flash_success', 'Pengguna berhasil dihapus.');
        } else {
            $this->setFlash('flash_error', 'Gagal menghapus pengguna.');
        }

        $this->redirect('users');
    }
}
