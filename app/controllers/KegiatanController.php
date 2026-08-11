<?php
/**
 * KegiatanController - Controller Master Kegiatan Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/KegiatanModel.php';
require_once __DIR__ . '/../models/ProgramModel.php';

class KegiatanController extends BaseController {

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
        $this->kegiatanModel = new KegiatanModel();
        $this->programModel  = new ProgramModel();
    }

    public function index() {
        $program_id = $_GET['program_id'] ?? '';
        $search     = $_GET['search'] ?? '';

        $kegiatanList = $this->kegiatanModel->getAllKegiatan($program_id, $search);
        $programList  = $this->programModel->getAllProgram();

        $data = [
            'title'        => 'Master Kegiatan Anggaran',
            'kegiatanList' => $kegiatanList,
            'programList'  => $programList,
            'program_id'   => $program_id,
            'search'       => $search,
            'csrf_token'   => generate_csrf_token()
        ];

        $this->view('kegiatan/index', $data);
    }

    public function create() {
        $data = [
            'title'       => 'Tambah Kegiatan Anggaran',
            'programList' => $this->programModel->getAllProgram(),
            'csrf_token'  => generate_csrf_token()
        ];
        $this->view('kegiatan/create', $data);
    }

    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'CSRF Token Invalid!';
                header("Location: " . BASE_URL . "kegiatan/create");
                exit();
            }

            $program_id    = $_POST['program_id'] ?? '';
            $kode_kegiatan = trim($_POST['kode_kegiatan'] ?? '');
            $nama_kegiatan = trim($_POST['nama_kegiatan'] ?? '');

            if (empty($program_id) || empty($kode_kegiatan) || empty($nama_kegiatan)) {
                $_SESSION['flash_error'] = 'Program Parent, Kode, & Nama Kegiatan Wajib Diisi!';
                header("Location: " . BASE_URL . "kegiatan/create");
                exit();
            }

            if ($this->kegiatanModel->isKodeExists($program_id, $kode_kegiatan)) {
                $_SESSION['flash_error'] = "Kode Kegiatan '{$kode_kegiatan}' sudah ada pada Program terpilih!";
                header("Location: " . BASE_URL . "kegiatan/create");
                exit();
            }

            $res = $this->kegiatanModel->createKegiatan([
                'program_id'    => $program_id,
                'kode_kegiatan' => $kode_kegiatan,
                'nama_kegiatan' => $nama_kegiatan
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Kegiatan Anggaran berhasil disimpan.';
                header("Location: " . BASE_URL . "kegiatan");
            } else {
                $_SESSION['flash_error'] = 'Gagal menyimpan Kegiatan.';
                header("Location: " . BASE_URL . "kegiatan/create");
            }
            exit();
        }
    }

    public function edit($id) {
        $kegiatan = $this->kegiatanModel->find($id);
        if (!$kegiatan) {
            $_SESSION['flash_error'] = 'Kegiatan tidak ditemukan!';
            header("Location: " . BASE_URL . "kegiatan");
            exit();
        }

        $data = [
            'title'       => 'Edit Kegiatan Anggaran',
            'kegiatan'    => $kegiatan,
            'programList' => $this->programModel->getAllProgram(),
            'csrf_token'  => generate_csrf_token()
        ];
        $this->view('kegiatan/edit', $data);
    }

    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'CSRF Token Invalid!';
                header("Location: " . BASE_URL . "kegiatan/edit/" . $id);
                exit();
            }

            $program_id    = $_POST['program_id'] ?? '';
            $kode_kegiatan = trim($_POST['kode_kegiatan'] ?? '');
            $nama_kegiatan = trim($_POST['nama_kegiatan'] ?? '');

            if ($this->kegiatanModel->isKodeExists($program_id, $kode_kegiatan, $id)) {
                $_SESSION['flash_error'] = "Kode Kegiatan '{$kode_kegiatan}' sudah ada pada Program ini!";
                header("Location: " . BASE_URL . "kegiatan/edit/" . $id);
                exit();
            }

            $res = $this->kegiatanModel->updateKegiatan($id, [
                'program_id'    => $program_id,
                'kode_kegiatan' => $kode_kegiatan,
                'nama_kegiatan' => $nama_kegiatan
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Kegiatan berhasil diperbarui.';
                header("Location: " . BASE_URL . "kegiatan");
            } else {
                $_SESSION['flash_error'] = 'Gagal memperbarui Kegiatan.';
                header("Location: " . BASE_URL . "kegiatan/edit/" . $id);
            }
            exit();
        }
    }

    public function delete($id) {
        if ($this->kegiatanModel->hasChildren($id)) {
            $_SESSION['flash_error'] = 'Gagal Menghapus: Kegiatan ini masih memiliki Sub-Kegiatan turunan!';
            header("Location: " . BASE_URL . "kegiatan");
            exit();
        }

        $res = $this->kegiatanModel->deleteKegiatan($id);
        if ($res) {
            $_SESSION['flash_success'] = 'Kegiatan berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Kegiatan.';
        }
        header("Location: " . BASE_URL . "kegiatan");
        exit();
    }

    /**
     * AJAX Endpoint: Get Kegiatan Options by Program ID
     */
    public function get_by_program($programId) {
        header('Content-Type: application/json');
        $items = $this->kegiatanModel->getByProgramId($programId);
        echo json_encode(['status' => 'success', 'data' => $items]);
        exit();
    }
}
