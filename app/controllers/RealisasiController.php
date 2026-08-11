<?php
/**
 * RealisasiController - Controller Transaksi Realisasi Pekerjaan (Tahap 5)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/RealisasiModel.php';
require_once __DIR__ . '/../models/PaketPekerjaanModel.php';
require_once __DIR__ . '/../models/PenyediaModel.php';

class RealisasiController extends BaseController {

    private $realisasiModel;
    private $paketModel;
    private $penyediaModel;

    public function __construct() {
        parent::__construct();
        $this->requireAuth(); // Operator & Admin
        $this->realisasiModel = new RealisasiModel();
        $this->paketModel = new PaketPekerjaanModel();
        $this->penyediaModel = new PenyediaModel();
    }

    /**
     * Halaman Utama Index Daftar Realisasi Pekerjaan
     */
    public function index() {
        $search = $_GET['search'] ?? '';
        $status = $_GET['status'] ?? '';
        $page = intval($_GET['page'] ?? 1);
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $realisasiList = $this->realisasiModel->getAllRealisasi($status, $search, $limit, $offset);

        $data = [
            'title'         => 'Modul Realisasi Pekerjaan',
            'realisasiList' => $realisasiList,
            'search'        => $search,
            'status'        => $status,
            'page'          => $page
        ];

        $this->render('realisasi/index', $data);
    }

    /**
     * Form Tambah Realisasi Pekerjaan Baru (Auto Fill & AJAX Setup)
     */
    public function create() {
        $this->requireRole(['admin', 'operator']);

        $paketList = $this->paketModel->getAllPaket();
        $penyediaList = $this->penyediaModel->getAllPenyedia();
        $nomorSpAuto = $this->realisasiModel->generateNomorRealisasi();

        $data = [
            'title'        => 'Tambah Realisasi Pekerjaan Baru',
            'paketList'    => $paketList,
            'penyediaList' => $penyediaList,
            'nomorSpAuto'  => $nomorSpAuto,
            'csrf_token'   => generateCsrfToken()
        ];

        $this->render('realisasi/create', $data);
    }

    /**
     * Simpan Transaksi Realisasi Pekerjaan Baru
     */
    public function store() {
        $this->requireRole(['admin', 'operator']);

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/realisasi');
        }

        if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
            $this->setFlash('danger', 'Sesi tidak valid! CSRF token tidak cocok.');
            $this->redirect('/realisasi/create');
        }

        try {
            $paketId      = intval($_POST['paket_id'] ?? 0);
            $penyediaId   = intval($_POST['penyedia_id'] ?? 0);
            $nomorSp      = trim($_POST['nomor_sp'] ?? '');
            $tanggalSp    = trim($_POST['tanggal_sp'] ?? date('Y-m-d'));
            $lamaPekerjaan= intval($_POST['lama_pekerjaan'] ?? 30);
            $tanggalMulai  = trim($_POST['tanggal_mulai'] ?? date('Y-m-d'));
            $tanggalSelesai= trim($_POST['tanggal_selesai'] ?? date('Y-m-d', strtotime('+30 days')));
            $nilaiKontrak = floatval($_POST['nilai_kontrak'] ?? 0);

            if (empty($paketId) || empty($penyediaId) || empty($nomorSp) || $nilaiKontrak <= 0) {
                throw new Exception("Lengkapi seluruh field wajib (Paket, Penyedia, Nomor SP/Kontrak, Nilai Kontrak)!");
            }

            // Prepare Header Data
            $headerData = [
                'paket_id'       => $paketId,
                'penyedia_id'    => $penyediaId,
                'nomor_sp'       => $nomorSp,
                'tanggal_sp'     => $tanggalSp,
                'lama_pekerjaan' => $lamaPekerjaan,
                'tanggal_mulai'   => $tanggalMulai,
                'tanggal_selesai' => $tanggalSelesai,
                'nilai_kontrak'  => $nilaiKontrak,
                'nomor_bapsthp'  => trim($_POST['nomor_bapsthp'] ?? ''),
                'nomor_bapb'     => trim($_POST['nomor_bapb'] ?? ''),
                'tanggal_ba'     => !empty($_POST['tanggal_ba']) ? $_POST['tanggal_ba'] : null,
                'nomor_ba'       => trim($_POST['nomor_ba'] ?? ''),
                'status'         => trim($_POST['status'] ?? 'proses')
            ];

            // Prepare Multi-Rekening Items
            $rekeningItems = [];
            if (!empty($_POST['paket_rekening_id']) && is_array($_POST['paket_rekening_id'])) {
                foreach ($_POST['paket_rekening_id'] as $idx => $pkrId) {
                    $nilaiRel = floatval($_POST['nilai_realisasi'][$idx] ?? 0);
                    if ($pkrId && $nilaiRel > 0) {
                        $rekeningItems[] = [
                            'paket_rekening_id' => intval($pkrId),
                            'nilai_realisasi'   => $nilaiRel
                        ];
                    }
                }
            }

            $userId = $_SESSION['user_id'] ?? null;
            $realisasiId = $this->realisasiModel->createRealisasi($headerData, $rekeningItems, $userId);

            $this->setFlash('success', "Transaksi Realisasi Pekerjaan '{$nomorSp}' berhasil disimpan!");
            $this->redirect("/realisasi/detail/{$realisasiId}");

        } catch (Exception $e) {
            $this->setFlash('danger', $e->getMessage());
            $this->redirect('/realisasi/create');
        }
    }

    /**
     * Halaman Detail Rincian Realisasi Pekerjaan & Histori Pembayaran
     */
    public function detail($id) {
        $realisasi = $this->realisasiModel->getRealisasiDetail($id);

        if (!$realisasi) {
            $this->setFlash('danger', 'Data Realisasi Pekerjaan tidak ditemukan!');
            $this->redirect('/realisasi');
        }

        $data = [
            'title'     => 'Detail Realisasi Pekerjaan - ' . $realisasi['nomor_sp'],
            'realisasi' => $realisasi
        ];

        $this->render('realisasi/detail', $data);
    }

    /**
     * AJAX Endpoint: Get Detail Paket Pekerjaan untuk Auto-Fill Realisasi
     */
    public function ajaxPaketDetail($paketId) {
        header('Content-Type: application/json');
        
        $paket = $this->paketModel->getPaketDetail($paketId);
        if (!$paket) {
            echo json_encode(['status' => 'error', 'message' => 'Paket Pekerjaan tidak ditemukan']);
            exit;
        }

        echo json_encode([
            'status' => 'success',
            'data'   => $paket
        ]);
        exit;
    }

    /**
     * AJAX Endpoint: Get Detail Penyedia untuk Auto-Fill Profile Rekanan
     */
    public function ajaxPenyediaDetail($penyediaId) {
        header('Content-Type: application/json');

        $penyedia = $this->penyediaModel->getPenyediaById($penyediaId);
        if (!$penyedia) {
            echo json_encode(['status' => 'error', 'message' => 'Data Penyedia tidak ditemukan']);
            exit;
        }

        echo json_encode([
            'status' => 'success',
            'data'   => $penyedia
        ]);
        exit;
    }

    /**
     * Hapus Transaksi Realisasi Pekerjaan
     */
    public function delete($id) {
        $this->requireRole(['admin', 'operator']);

        try {
            $userId = $_SESSION['user_id'] ?? null;
            $this->realisasiModel->deleteRealisasi($id, $userId);
            $this->setFlash('success', 'Transaksi Realisasi Pekerjaan berhasil dihapus!');
        } catch (Exception $e) {
            $this->setFlash('danger', $e->getMessage());
        }

        $this->redirect('/realisasi');
    }
}
