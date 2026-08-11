<?php
/**
 * ProgramController - Controller Master Program Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/ProgramModel.php';

class ProgramController extends BaseController {

    private $programModel;

    public function __construct() {
        // Cek login
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: " . BASE_URL . "auth/login");
            exit();
        }
        $this->programModel = new ProgramModel();
    }

    /**
     * Halaman Index Master Program
     */
    public function index() {
        $search = $_GET['search'] ?? '';
        $page   = intval($_GET['page'] ?? 1);
        $limit  = 10;
        $offset = ($page - 1) * $limit;

        $programs = $this->programModel->getAllProgram($search, $limit, $offset);
        $total    = $this->programModel->countAllProgram($search);
        $totalPages = ceil($total / $limit);

        $data = [
            'title'       => 'Master Program Anggaran 2026',
            'programs'    => $programs,
            'search'      => $search,
            'currentPage' => $page,
            'totalPages'  => $totalPages,
            'totalData'   => $total,
            'csrf_token'  => generate_csrf_token()
        ];

        $this->view('program/index', $data);
    }

    /**
     * Form Tambah Program
     */
    public function create() {
        $data = [
            'title'      => 'Tambah Program Anggaran',
            'csrf_token' => generate_csrf_token()
        ];
        $this->view('program/create', $data);
    }

    /**
     * Simpan Program Baru
     */
    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF tidak valid!';
                header("Location: " . BASE_URL . "program/create");
                exit();
            }

            $kode_program   = trim($_POST['kode_program'] ?? '');
            $nama_program   = trim($_POST['nama_program'] ?? '');
            $tahun_anggaran = trim($_POST['tahun_anggaran'] ?? '2026');

            // Validasi
            if (empty($kode_program) || empty($nama_program)) {
                $_SESSION['flash_error'] = 'Kode Program dan Nama Program wajib diisi!';
                header("Location: " . BASE_URL . "program/create");
                exit();
            }

            // Cek Kode Unik
            if ($this->programModel->isKodeExists($kode_program)) {
                $_SESSION['flash_error'] = "Kode Program '{$kode_program}' sudah digunakan!";
                header("Location: " . BASE_URL . "program/create");
                exit();
            }

            $result = $this->programModel->createProgram([
                'kode_program'   => $kode_program,
                'nama_program'   => $nama_program,
                'tahun_anggaran' => $tahun_anggaran
            ]);

            if ($result) {
                $_SESSION['flash_success'] = 'Program Anggaran berhasil ditambahkan.';
                header("Location: " . BASE_URL . "program");
            } else {
                $_SESSION['flash_error'] = 'Gagal menyimpan Program Anggaran!';
                header("Location: " . BASE_URL . "program/create");
            }
            exit();
        }
    }

    /**
     * Form Edit Program
     */
    public function edit($id) {
        $program = $this->programModel->find($id);
        if (!$program) {
            $_SESSION['flash_error'] = 'Data Program tidak ditemukan!';
            header("Location: " . BASE_URL . "program");
            exit();
        }

        $data = [
            'title'      => 'Edit Program Anggaran',
            'program'    => $program,
            'csrf_token' => generate_csrf_token()
        ];

        $this->view('program/edit', $data);
    }

    /**
     * Update Data Program
     */
    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF tidak valid!';
                header("Location: " . BASE_URL . "program/edit/" . $id);
                exit();
            }

            $kode_program   = trim($_POST['kode_program'] ?? '');
            $nama_program   = trim($_POST['nama_program'] ?? '');
            $tahun_anggaran = trim($_POST['tahun_anggaran'] ?? '2026');

            if (empty($kode_program) || empty($nama_program)) {
                $_SESSION['flash_error'] = 'Kode Program dan Nama Program wajib diisi!';
                header("Location: " . BASE_URL . "program/edit/" . $id);
                exit();
            }

            if ($this->programModel->isKodeExists($kode_program, $id)) {
                $_SESSION['flash_error'] = "Kode Program '{$kode_program}' sudah digunakan oleh data lain!";
                header("Location: " . BASE_URL . "program/edit/" . $id);
                exit();
            }

            $result = $this->programModel->updateProgram($id, [
                'kode_program'   => $kode_program,
                'nama_program'   => $nama_program,
                'tahun_anggaran' => $tahun_anggaran
            ]);

            if ($result) {
                $_SESSION['flash_success'] = 'Program Anggaran berhasil diperbarui.';
                header("Location: " . BASE_URL . "program");
            } else {
                $_SESSION['flash_error'] = 'Gagal memperbarui Program Anggaran!';
                header("Location: " . BASE_URL . "program/edit/" . $id);
            }
            exit();
        }
    }

    /**
     * Hapus Program
     */
    public function delete($id) {
        if ($this->programModel->hasChildren($id)) {
            $_SESSION['flash_error'] = 'Gagal Menghapus: Program ini masih memiliki Kegiatan turunan! Hapus kegiatan terlebih dahulu.';
            header("Location: " . BASE_URL . "program");
            exit();
        }

        $result = $this->programModel->deleteProgram($id);
        if ($result) {
            $_SESSION['flash_success'] = 'Program Anggaran berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Program Anggaran.';
        }
        header("Location: " . BASE_URL . "program");
        exit();
    }
}
