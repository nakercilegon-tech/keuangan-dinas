<?php
/**
 * PenyediaController - Controller Master Penyedia (Pihak Ketiga/Rekanan)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PenyediaModel.php';

class PenyediaController extends BaseController {

    private $penyediaModel;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: " . BASE_URL . "auth/login");
            exit();
        }
        $this->penyediaModel = new PenyediaModel();
    }

    public function index() {
        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';

        $penyediaList = $this->penyediaModel->getAllPenyedia($search, $status);

        $data = [
            'title'        => 'Master Penyedia / Rekanan Perusahaan',
            'penyediaList' => $penyediaList,
            'search'       => $search,
            'status'       => $status,
            'csrf_token'   => generate_csrf_token()
        ];

        $this->view('penyedia/index', $data);
    }

    public function create() {
        $data = [
            'title'      => 'Tambah Penyedia Baru',
            'csrf_token' => generate_csrf_token()
        ];
        $this->view('penyedia/create', $data);
    }

    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF tidak valid!';
                header("Location: " . BASE_URL . "penyedia/create");
                exit();
            }

            $nama_perusahaan   = trim($_POST['nama_perusahaan'] ?? '');
            $nama_penyedia     = trim($_POST['nama_penyedia'] ?? '');
            $alamat            = trim($_POST['alamat'] ?? '');
            $npwp              = trim($_POST['npwp'] ?? '');
            $nama_bank         = trim($_POST['nama_bank'] ?? '');
            $nomor_rekening    = trim($_POST['nomor_rekening'] ?? '');
            $pemegang_rekening = trim($_POST['pemegang_rekening'] ?? '');
            $telepon           = trim($_POST['telepon'] ?? '');
            $email             = trim($_POST['email'] ?? '');
            $status            = trim($_POST['status'] ?? 'aktif');

            if (empty($nama_perusahaan) || empty($nama_penyedia) || empty($npwp) || empty($nomor_rekening)) {
                $_SESSION['flash_error'] = 'Nama Perusahaan, Nama Penyedia, NPWP, dan Nomor Rekening wajib diisi!';
                header("Location: " . BASE_URL . "penyedia/create");
                exit();
            }

            if ($this->penyediaModel->isNpwpExists($npwp)) {
                $_SESSION['flash_error'] = "NPWP '{$npwp}' sudah terdaftar untuk perusahaan lain!";
                header("Location: " . BASE_URL . "penyedia/create");
                exit();
            }

            $res = $this->penyediaModel->createPenyedia([
                'nama_perusahaan'   => $nama_perusahaan,
                'nama_penyedia'     => $nama_penyedia,
                'alamat'            => $alamat,
                'npwp'              => $npwp,
                'nama_bank'         => $nama_bank,
                'nomor_rekening'    => $nomor_rekening,
                'pemegang_rekening' => $pemegang_rekening,
                'telepon'           => $telepon,
                'email'             => $email,
                'status'            => $status
            ]);

            if ($res) {
                $_SESSION['flash_success'] = "Penyedia '{$nama_perusahaan}' berhasil disimpan.";
                header("Location: " . BASE_URL . "penyedia");
            } else {
                $_SESSION['flash_error'] = "Gagal menyimpan data Penyedia.";
                header("Location: " . BASE_URL . "penyedia/create");
            }
            exit();
        }
    }

    public function edit($id) {
        $penyedia = $this->penyediaModel->find($id);
        if (!$penyedia) {
            $_SESSION['flash_error'] = 'Data Penyedia tidak ditemukan!';
            header("Location: " . BASE_URL . "penyedia");
            exit();
        }

        $data = [
            'title'      => 'Edit Data Penyedia',
            'penyedia'   => $penyedia,
            'csrf_token' => generate_csrf_token()
        ];
        $this->view('penyedia/edit', $data);
    }

    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'CSRF Token Invalid!';
                header("Location: " . BASE_URL . "penyedia/edit/" . $id);
                exit();
            }

            $nama_perusahaan   = trim($_POST['nama_perusahaan'] ?? '');
            $nama_penyedia     = trim($_POST['nama_penyedia'] ?? '');
            $alamat            = trim($_POST['alamat'] ?? '');
            $npwp              = trim($_POST['npwp'] ?? '');
            $nama_bank         = trim($_POST['nama_bank'] ?? '');
            $nomor_rekening    = trim($_POST['nomor_rekening'] ?? '');
            $pemegang_rekening = trim($_POST['pemegang_rekening'] ?? '');
            $telepon           = trim($_POST['telepon'] ?? '');
            $email             = trim($_POST['email'] ?? '');
            $status            = trim($_POST['status'] ?? 'aktif');

            if ($this->penyediaModel->isNpwpExists($npwp, $id)) {
                $_SESSION['flash_error'] = "NPWP '{$npwp}' sudah digunakan oleh perusahaan lain!";
                header("Location: " . BASE_URL . "penyedia/edit/" . $id);
                exit();
            }

            $res = $this->penyediaModel->updatePenyedia($id, [
                'nama_perusahaan'   => $nama_perusahaan,
                'nama_penyedia'     => $nama_penyedia,
                'alamat'            => $alamat,
                'npwp'              => $npwp,
                'nama_bank'         => $nama_bank,
                'nomor_rekening'    => $nomor_rekening,
                'pemegang_rekening' => $pemegang_rekening,
                'telepon'           => $telepon,
                'email'             => $email,
                'status'            => $status
            ]);

            if ($res) {
                $_SESSION['flash_success'] = 'Data Penyedia berhasil diperbarui.';
                header("Location: " . BASE_URL . "penyedia");
            } else {
                $_SESSION['flash_error'] = 'Gagal memperbarui data Penyedia.';
                header("Location: " . BASE_URL . "penyedia/edit/" . $id);
            }
            exit();
        }
    }

    public function delete($id) {
        $res = $this->penyediaModel->deletePenyedia($id);
        if ($res) {
            $_SESSION['flash_success'] = 'Penyedia berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Penyedia! Perusahaan ini sudah terkait dalam dokumen kontrak realisasi.';
        }
        header("Location: " . BASE_URL . "penyedia");
        exit();
    }
}
