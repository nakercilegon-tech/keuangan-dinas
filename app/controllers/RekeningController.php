<?php
/**
 * RekeningController - Controller Master Rekening Belanja
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/RekeningModel.php';

class RekeningController extends BaseController {

    private $rekeningModel;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: " . BASE_URL . "auth/login");
            exit();
        }
        $this->rekeningModel = new RekeningModel();
    }

    public function index() {
        $jenis_belanja = $_GET['jenis_belanja'] ?? '';
        $search        = $_GET['search'] ?? '';

        $rekeningList = $this->rekeningModel->getAllRekening($jenis_belanja, $search);

        $data = [
            'title'         => 'Master Rekening Belanja',
            'rekeningList'  => $rekeningList,
            'jenis_belanja' => $jenis_belanja,
            'search'        => $search,
            'csrf_token'    => generate_csrf_token()
        ];

        $this->view('rekening/index', $data);
    }

    public function create() {
        $data = [
            'title'      => 'Tambah Rekening Belanja',
            'csrf_token' => generate_csrf_token()
        ];
        $this->view('rekening/create', $data);
    }

    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF Invalid!';
                header("Location: " . BASE_URL . "rekening/create");
                exit();
            }

            $kode_rekening = trim($_POST['kode_rekening'] ?? '');
            $nama_rekening = trim($_POST['nama_rekening'] ?? '');
            $jenis_belanja = trim($_POST['jenis_belanja'] ?? 'Belanja Barang dan Jasa');

            if (empty($kode_rekening) || empty($nama_rekening)) {
                $_SESSION['flash_error'] = 'Kode dan Nama Rekening Belanja wajib diisi!';
                header("Location: " . BASE_URL . "rekening/create");
                exit();
            }

            if ($this->rekeningModel->isKodeExists($kode_rekening)) {
                $_SESSION['flash_error'] = "Kode Rekening '{$kode_rekening}' sudah terdaftar!";
                header("Location: " . BASE_URL . "rekening/create");
                exit();
            }

            $res = $this->rekeningModel->createRekening([
                'kode_rekening' => $kode_rekening,
                'nama_rekening' => $nama_rekening,
                'jenis_belanja' => $jenis_belanja
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Rekening Belanja berhasil disimpan.';
                header("Location: " . BASE_URL . "rekening");
            } else {
                $_SESSION['flash_error'] = 'Gagal menyimpan Rekening Belanja.';
                header("Location: " . BASE_URL . "rekening/create");
            }
            exit();
        }
    }

    public function edit($id) {
        $rekening = $this->rekeningModel->find($id);
        if (!$rekening) {
            $_SESSION['flash_error'] = 'Data Rekening Belanja tidak ditemukan!';
            header("Location: " . BASE_URL . "rekening");
            exit();
        }

        $data = [
            'title'      => 'Edit Rekening Belanja',
            'rekening'   => $rekening,
            'csrf_token' => generate_csrf_token()
        ];
        $this->view('rekening/edit', $data);
    }

    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'CSRF Token Invalid!';
                header("Location: " . BASE_URL . "rekening/edit/" . $id);
                exit();
            }

            $kode_rekening = trim($_POST['kode_rekening'] ?? '');
            $nama_rekening = trim($_POST['nama_rekening'] ?? '');
            $jenis_belanja = trim($_POST['jenis_belanja'] ?? 'Belanja Barang dan Jasa');

            if ($this->rekeningModel->isKodeExists($kode_rekening, $id)) {
                $_SESSION['flash_error'] = "Kode Rekening '{$kode_rekening}' sudah digunakan!";
                header("Location: " . BASE_URL . "rekening/edit/" . $id);
                exit();
            }

            $res = $this->rekeningModel->updateRekening($id, [
                'kode_rekening' => $kode_rekening,
                'nama_rekening' => $nama_rekening,
                'jenis_belanja' => $jenis_belanja
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Rekening Belanja berhasil diperbarui.';
                header("Location: " . BASE_URL . "rekening");
            } else {
                $_SESSION['flash_error'] = 'Gagal memperbarui Rekening Belanja.';
                header("Location: " . BASE_URL . "rekening/edit/" . $id);
            }
            exit();
        }
    }

    public function delete($id) {
        if ($this->rekeningModel->isUsedInPaket($id)) {
            $_SESSION['flash_error'] = 'Gagal Menghapus: Rekening Belanja ini sedang dialokasikan pada Paket Pekerjaan!';
            header("Location: " . BASE_URL . "rekening");
            exit();
        }

        $res = $this->rekeningModel->deleteRekening($id);
        if ($res) {
            $_SESSION['flash_success'] = 'Rekening Belanja berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Rekening Belanja.';
        }
        header("Location: " . BASE_URL . "rekening");
        exit();
    }
}
