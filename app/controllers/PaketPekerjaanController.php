<?php
/**
 * PaketPekerjaanController - Controller Paket Pekerjaan & Multi-Rekening
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PaketPekerjaanModel.php';
require_once __DIR__ . '/../models/ProgramModel.php';
require_once __DIR__ . '/../models/KegiatanModel.php';
require_once __DIR__ . '/../models/SubKegiatanModel.php';
require_once __DIR__ . '/../models/RekeningModel.php';

class PaketPekerjaanController extends BaseController {

    private $paketModel;
    private $programModel;
    private $kegiatanModel;
    private $subKegiatanModel;
    private $rekeningModel;

    public function __construct() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        if (!isset($_SESSION['user_id'])) {
            header("Location: " . BASE_URL . "auth/login");
            exit();
        }
        $this->paketModel       = new PaketPekerjaanModel();
        $this->programModel     = new ProgramModel();
        $this->kegiatanModel    = new KegiatanModel();
        $this->subKegiatanModel = new SubKegiatanModel();
        $this->rekeningModel    = new RekeningModel();
    }

    public function index() {
        $program_id     = $_GET['program_id'] ?? '';
        $kegiatan_id    = $_GET['kegiatan_id'] ?? '';
        $sub_kegiatan_id = $_GET['sub_kegiatan_id'] ?? '';
        $search         = $_GET['search'] ?? '';

        $paketList   = $this->paketModel->getAllPaket($program_id, $kegiatan_id, $sub_kegiatan_id, $search);
        $programList = $this->programModel->getAllProgram();

        $data = [
            'title'           => 'Kelola Paket Pekerjaan (Pagu DPA 2026)',
            'paketList'       => $paketList,
            'programList'     => $programList,
            'program_id'      => $program_id,
            'kegiatan_id'     => $kegiatan_id,
            'sub_kegiatan_id' => $sub_kegiatan_id,
            'search'          => $search,
            'csrf_token'      => generate_csrf_token()
        ];

        $this->view('paket/index', $data);
    }

    public function detail($id) {
        $paket = $this->paketModel->getPaketDetail($id);
        if (!$paket) {
            $_SESSION['flash_error'] = 'Paket Pekerjaan tidak ditemukan!';
            header("Location: " . BASE_URL . "paketpekerjaan");
            exit();
        }

        $data = [
            'title' => 'Detail Alokasi Paket Pekerjaan: ' . $paket['nomor_paket'],
            'paket' => $paket
        ];

        $this->view('paket/detail', $data);
    }

    public function create() {
        $data = [
            'title'        => 'Tambah Paket Pekerjaan & Alokasi Rekening',
            'programList'  => $this->programModel->getAllProgram(),
            'rekeningList' => $this->rekeningModel->getAllRekening(),
            'csrf_token'   => generate_csrf_token()
        ];
        $this->view('paket/create', $data);
    }

    public function store() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF Invalid!';
                header("Location: " . BASE_URL . "paketpekerjaan/create");
                exit();
            }

            $nomor_paket     = trim($_POST['nomor_paket'] ?? '');
            $program_id      = $_POST['program_id'] ?? '';
            $kegiatan_id     = $_POST['kegiatan_id'] ?? '';
            $sub_kegiatan_id = $_POST['sub_kegiatan_id'] ?? '';
            $nama_paket      = trim($_POST['nama_paket'] ?? '');
            $pagu_paket      = floatval($_POST['pagu_paket'] ?? 0);
            $tahun_anggaran  = trim($_POST['tahun_anggaran'] ?? '2026');
            $status          = trim($_POST['status'] ?? 'AKTIF');
            $keterangan      = trim($_POST['keterangan'] ?? '');

            // Validasi Input Dasar
            if (empty($nomor_paket) || empty($sub_kegiatan_id) || empty($nama_paket) || $pagu_paket <= 0) {
                $_SESSION['flash_error'] = 'Nomor Paket, Sub-Kegiatan, Nama Paket, dan Pagu Paket ( > 0) wajib diisi!';
                header("Location: " . BASE_URL . "paketpekerjaan/create");
                exit();
            }

            // Cek Unik Nomor Paket
            if ($this->paketModel->isNomorPaketExists($nomor_paket)) {
                $_SESSION['flash_error'] = "Nomor Paket '{$nomor_paket}' sudah terdaftar!";
                header("Location: " . BASE_URL . "paketpekerjaan/create");
                exit();
            }

            // Process Multi Rekening Array
            $rekening_ids   = $_POST['rekening_id'] ?? [];
            $pagu_rekenings = $_POST['pagu_rekening'] ?? [];

            $rekeningItems = [];
            foreach ($rekening_ids as $index => $rekId) {
                if (!empty($rekId)) {
                    $pagu = floatval($pagu_rekenings[$index] ?? 0);
                    if ($pagu > 0) {
                        $rekeningItems[] = [
                            'rekening_id'   => $rekId,
                            'pagu_rekening' => $pagu
                        ];
                    }
                }
            }

            if (empty($rekeningItems)) {
                $_SESSION['flash_error'] = 'Wajib memilih minimal 1 Rekening Belanja dengan Pagu > 0!';
                header("Location: " . BASE_URL . "paketpekerjaan/create");
                exit();
            }

            try {
                $paketId = $this->paketModel->createPaketWithMultiRekening([
                    'nomor_paket'     => $nomor_paket,
                    'program_id'      => $program_id,
                    'kegiatan_id'     => $kegiatan_id,
                    'sub_kegiatan_id' => $sub_kegiatan_id,
                    'nama_paket'      => $nama_paket,
                    'pagu_paket'      => $pagu_paket,
                    'tahun_anggaran'  => $tahun_anggaran,
                    'status'          => $status,
                    'keterangan'      => $keterangan
                ], $rekeningItems);

                $_SESSION['flash_success'] = "Paket Pekerjaan '{$nomor_paket}' berhasil disimpan dengan " . count($rekeningItems) . " Alokasi Rekening.";
                header("Location: " . BASE_URL . "paketpekerjaan/detail/" . $paketId);
                exit();

            } catch (Exception $e) {
                $_SESSION['flash_error'] = $e->getMessage();
                header("Location: " . BASE_URL . "paketpekerjaan/create");
                exit();
            }
        }
    }

    public function edit($id) {
        $paket = $this->paketModel->getPaketDetail($id);
        if (!$paket) {
            $_SESSION['flash_error'] = 'Paket Pekerjaan tidak ditemukan!';
            header("Location: " . BASE_URL . "paketpekerjaan");
            exit();
        }

        $data = [
            'title'        => 'Edit Paket Pekerjaan & Alokasi Rekening',
            'paket'        => $paket,
            'programList'  => $this->programModel->getAllProgram(),
            'kegiatanList' => $this->kegiatanModel->getByProgramId($paket['program_id']),
            'subList'      => $this->subKegiatanModel->getByKegiatanId($paket['kegiatan_id']),
            'rekeningList' => $this->rekeningModel->getAllRekening(),
            'csrf_token'   => generate_csrf_token()
        ];

        $this->view('paket/edit', $data);
    }

    public function update($id) {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (!verify_csrf_token($_POST['csrf_token'] ?? '')) {
                $_SESSION['flash_error'] = 'Token CSRF Invalid!';
                header("Location: " . BASE_URL . "paketpekerjaan/edit/" . $id);
                exit();
            }

            $nomor_paket     = trim($_POST['nomor_paket'] ?? '');
            $program_id      = $_POST['program_id'] ?? '';
            $kegiatan_id     = $_POST['kegiatan_id'] ?? '';
            $sub_kegiatan_id = $_POST['sub_kegiatan_id'] ?? '';
            $nama_paket      = trim($_POST['nama_paket'] ?? '');
            $pagu_paket      = floatval($_POST['pagu_paket'] ?? 0);
            $tahun_anggaran  = trim($_POST['tahun_anggaran'] ?? '2026');
            $status          = trim($_POST['status'] ?? 'AKTIF');
            $keterangan      = trim($_POST['keterangan'] ?? '');

            if ($this->paketModel->isNomorPaketExists($nomor_paket, $id)) {
                $_SESSION['flash_error'] = "Nomor Paket '{$nomor_paket}' sudah terdaftar pada paket lain!";
                header("Location: " . BASE_URL . "paketpekerjaan/edit/" . $id);
                exit();
            }

            $rekening_ids   = $_POST['rekening_id'] ?? [];
            $pagu_rekenings = $_POST['pagu_rekening'] ?? [];

            $rekeningItems = [];
            foreach ($rekening_ids as $index => $rekId) {
                if (!empty($rekId)) {
                    $pagu = floatval($pagu_rekenings[$index] ?? 0);
                    if ($pagu > 0) {
                        $rekeningItems[] = [
                            'rekening_id'   => $rekId,
                            'pagu_rekening' => $pagu
                        ];
                    }
                }
            }

            try {
                $this->paketModel->updatePaketWithMultiRekening($id, [
                    'nomor_paket'     => $nomor_paket,
                    'program_id'      => $program_id,
                    'kegiatan_id'     => $kegiatan_id,
                    'sub_kegiatan_id' => $sub_kegiatan_id,
                    'nama_paket'      => $nama_paket,
                    'pagu_paket'      => $pagu_paket,
                    'tahun_anggaran'  => $tahun_anggaran,
                    'status'          => $status,
                    'keterangan'      => $keterangan
                ], $rekeningItems);

                $_SESSION['flash_success'] = 'Paket Pekerjaan berhasil diperbarui.';
                header("Location: " . BASE_URL . "paketpekerjaan/detail/" . $id);
                exit();

            } catch (Exception $e) {
                $_SESSION['flash_error'] = $e->getMessage();
                header("Location: " . BASE_URL . "paketpekerjaan/edit/" . $id);
                exit();
            }
        }
    }

    public function delete($id) {
        $res = $this->paketModel->deletePaket($id);
        if ($res) {
            $_SESSION['flash_success'] = 'Paket Pekerjaan berhasil dihapus.';
        } else {
            $_SESSION['flash_error'] = 'Gagal menghapus Paket Pekerjaan! Paket ini sudah memiliki riwayat pencairan realisasi.';
        }
        header("Location: " . BASE_URL . "paketpekerjaan");
        exit();
    }
}
