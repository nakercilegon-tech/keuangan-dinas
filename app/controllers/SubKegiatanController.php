<?php
/**
 * SubKegiatanController - Controller Master Sub Kegiatan Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/SubKegiatanModel.php';
require_once __DIR__ . '/../models/KegiatanModel.php';
require_once __DIR__ . '/../models/ProgramModel.php';

class SubKegiatanController extends BaseController {

    private $subKegiatanModel;
    private $kegiatanModel;
    private $programModel;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: " . BASE_URL . "auth/login");
            exit();
        }
        $this->subKegiatanModel = new SubKegiatanModel();
        $this->kegiatanModel    = new KegiatanModel();
        $this->programModel     = new ProgramModel();
    }

    public function index() {
        $program_id  = $_GET['program_id'] ?? '';
        $kegiatan_id = $_GET['kegiatan_id'] ?? '';
        $search      = $_GET['search'] ?? '';

        $subList     = $this->subKegiatanModel->getAllSubKegiatan($program_id, $kegiatan_id, $search);
        $programList = $this->programModel->getAllProgram();
        $kegiatanList = !empty($program_id) ? $this->kegiatanModel->getByProgramId($program_id) : [];

        $data = [
            'title'        => 'Master Sub-Kegiatan Anggaran',
            'subList'      => $subList,
            'programList'  => $programList,
            'kegiatanList' => $kegiatanList,
            'program_id'   => $program_id,
            'kegiatan_id'  => $kegiatan_id,
            'search'       => $search,
            'csrf_token'   => generate_csrf_token()
        ];

        $this->view('subkegiatan/index', $data);
    }

    public function create() {
        $data = [
            'title'       => 'Tambah Sub-Kegiatan Anggaran',
            'programList' => $this->programModel->getAllProgram(),
            'csrf_token'  => generate_csrf_token()
        ];
        $this->view('subkegiatan/create', $data);
    }

    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF Invalid!';
                header("Location: " . BASE_URL . "subkegiatan/create");
                exit();
            }

            $program_id        = $_POST['program_id'] ?? '';
            $kegiatan_id       = $_POST['kegiatan_id'] ?? '';
            $kode_sub_kegiatan = trim($_POST['kode_sub_kegiatan'] ?? '');
            $nama_sub_kegiatan = trim($_POST['nama_sub_kegiatan'] ?? '');

            if (empty($program_id) || empty($kegiatan_id) || empty($kode_sub_kegiatan) || empty($nama_sub_kegiatan)) {
                $_SESSION['flash_error'] = 'Semua field wajib diisi!';
                header("Location: " . BASE_URL . "subkegiatan/create");
                exit();
            }

            if ($this->subKegiatanModel->isKodeExists($kegiatan_id, $kode_sub_kegiatan)) {
                $_SESSION['flash_error'] = "Kode Sub-Kegiatan '{$kode_sub_kegiatan}' sudah terdaftar pada Kegiatan terpilih!";
                header("Location: " . BASE_URL . "subkegiatan/create");
                exit();
            }

            $res = $this->subKegiatanModel->createSubKegiatan([
                'program_id'        => $program_id,
                'kegiatan_id'       => $kegiatan_id,
                'kode_sub_kegiatan' => $kode_sub_kegiatan,
                'nama_sub_kegiatan' => $nama_sub_kegiatan
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Sub-Kegiatan berhasil ditambahkan.';
                header("Location: " . BASE_URL . "subkegiatan");
            } else {
                $_SESSION['flash_error'] = 'Gagal menambahkan Sub-Kegiatan.';
                header("Location: " . BASE_URL . "subkegiatan/create");
            }
            exit();
        }
    }

    public function edit($id) {
        $sub = $this->subKegiatanModel->find($id);
        if (!$sub) {
            $_SESSION['flash_error'] = 'Sub-Kegiatan tidak ditemukan!';
            header("Location: " . BASE_URL . "subkegiatan");
            exit();
        }

        $data = [
            'title'        => 'Edit Sub-Kegiatan Anggaran',
            'sub'          => $sub,
            'programList'  => $this->programModel->getAllProgram(),
            'kegiatanList' => $this->kegiatanModel->getByProgramId($sub['program_id']),
            'csrf_token'   => generate_csrf_token()
        ];
        $this->view('subkegiatan/edit', $data);
    }

    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'CSRF Token Invalid!';
                header("Location: " . BASE_URL . "subkegiatan/edit/" . $id);
                exit();
            }

            $program_id        = $_POST['program_id'] ?? '';
            $kegiatan_id       = $_POST['kegiatan_id'] ?? '';
            $kode_sub_kegiatan = trim($_POST['kode_sub_kegiatan'] ?? '');
            $nama_sub_kegiatan = trim($_POST['nama_sub_kegiatan'] ?? '');

            if ($this->subKegiatanModel->isKodeExists($kegiatan_id, $kode_sub_kegiatan, $id)) {
                $_SESSION['flash_error'] = "Kode Sub-Kegiatan '{$kode_sub_kegiatan}' sudah terdaftar!";
                header("Location: " . BASE_URL . "subkegiatan/edit/" . $id);
                exit();
            }

            $res = $this->subKegiatanModel->updateSubKegiatan($id, [
                'program_id'        => $program_id,
                'kegiatan_id'       => $kegiatan_id,
                'kode_sub_kegiatan' => $kode_sub_kegiatan,
                'nama_sub_kegiatan' => $nama_sub_kegiatan
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Sub-Kegiatan berhasil diperbarui.';
                header("Location: " . BASE_URL . "subkegiatan");
            } else {
                $_SESSION['flash_error'] = 'Gagal memperbarui Sub-Kegiatan.';
                header("Location: " . BASE_URL . "subkegiatan/edit/" . $id);
            }
            exit();
        }
    }

    public function delete($id) {
        if ($this->subKegiatanModel->isUsedInPaket($id)) {
            $_SESSION['flash_error'] = 'Gagal Menghapus: Sub-Kegiatan ini sudah terikat pada Paket Pekerjaan!';
            header("Location: " . BASE_URL . "subkegiatan");
            exit();
        }

        $res = $this->subKegiatanModel->deleteSubKegiatan($id);
        if ($res) {
            $_SESSION['flash_success'] = 'Sub-Kegiatan berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Sub-Kegiatan.';
        }
        header("Location: " . BASE_URL . "subkegiatan");
        exit();
    }

    /**
     * AJAX Endpoint: Get Sub-Kegiatan Options by Kegiatan ID
     */
    public function get_by_kegiatan($kegiatanId) {
        header('Content-Type: application/json');
        $items = $this->subKegiatanModel->getByKegiatanId($kegiatanId);
        echo json_encode(['status' => 'success', 'data' => $items]);
        exit();
    }
}
