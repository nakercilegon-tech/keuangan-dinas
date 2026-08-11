<?php
/**
 * PembayaranController - Controller Transaksi Pembayaran & Tax Calculator (Tahap 6)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/PembayaranModel.php';
require_once __DIR__ . '/../models/RealisasiModel.php';

class PembayaranController extends BaseController {

    private $pembayaranModel;
    private $realisasiModel;

    public function __construct() {
        parent::__construct();
        $this->requireAuth();
        $this->pembayaranModel = new PembayaranModel();
        $this->realisasiModel = new RealisasiModel();
    }

    /**
     * Halaman Utama Index Daftar Transaksi Pembayaran & Pajak
     */
    public function index() {
        $search = $_GET['search'] ?? '';
        $page = intval($_GET['page'] ?? 1);
        $limit = 20;
        $offset = ($page - 1) * $limit;

        $pembayaranList = $this->pembayaranModel->getAllPembayaran($search, $limit, $offset);

        $data = [
            'title'          => 'Modul Pembayaran & Perhitungan Pajak',
            'pembayaranList' => $pembayaranList,
            'search'         => $search,
            'page'           => $page
        ];

        $this->render('pembayaran/index', $data);
    }

    /**
     * Form Input Pembayaran Baru & Hitung Pajak Realtime
     */
    public function create() {
        $this->requireRole(['admin', 'operator']);

        $realisasiId = intval($_GET['realisasi_id'] ?? 0);
        $realisasiList = $this->realisasiModel->getAllRealisasi('proses');
        $selectedRealisasi = null;

        if ($realisasiId > 0) {
            $selectedRealisasi = $this->realisasiModel->getRealisasiDetail($realisasiId);
        }

        $autoTrxNo = $this->pembayaranModel->generateNomorTransaksi();

        $data = [
            'title'             => 'Form Input Pembayaran & Hitung Pajak',
            'realisasiList'     => $realisasiList,
            'selectedRealisasi' => $selectedRealisasi,
            'autoTrxNo'         => $autoTrxNo,
            'csrf_token'        => generateCsrfToken()
        ];

        $this->render('pembayaran/create', $data);
    }

    /**
     * Simpan Pembayaran dan Pajak dengan Transaction PDO
     */
    public function store() {
        $this->requireRole(['admin', 'operator']);

        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->redirect('/pembayaran');
        }

        if (!validateCsrfToken($_POST['csrf_token'] ?? '')) {
            $this->setFlash('danger', 'Sesi tidak valid! CSRF token tidak sesuai.');
            $this->redirect('/pembayaran/create');
        }

        try {
            $data = [
                'realisasi_id'       => intval($_POST['realisasi_id'] ?? 0),
                'nomor_transaksi'    => trim($_POST['nomor_transaksi'] ?? ''),
                'tanggal_pembayaran' => trim($_POST['tanggal_pembayaran'] ?? date('Y-m-d')),
                'nilai_pembayaran'   => floatval($_POST['nilai_pembayaran'] ?? 0),
                'keterangan'         => trim($_POST['keterangan'] ?? ''),
                'nomor_bapsthp'      => trim($_POST['nomor_bapsthp'] ?? ''),
                'nomor_bapb'         => trim($_POST['nomor_bapb'] ?? ''),
                'tanggal_ba'         => trim($_POST['tanggal_ba'] ?? ''),
                'nomor_ba'           => trim($_POST['nomor_ba'] ?? '')
            ];

            $taxOptions = [
                'is_ppn'        => !empty($_POST['is_ppn']),
                'is_pph22'      => !empty($_POST['is_pph22']),
                'is_pph23_jasa' => !empty($_POST['is_pph23_jasa']),
                'is_pph23_makan'=> !empty($_POST['is_pph23_makan']),
                'pph21'         => floatval($_POST['pph21_manual'] ?? 0)
            ];

            $userId = $_SESSION['user']['id'] ?? 1;

            $result = $this->pembayaranModel->createPembayaran($data, $taxOptions, $userId);

            $this->setFlash('success', "Pembayaran TRX '{$result['nomor_transaksi']}' (Termin {$result['pembayaran_ke']}) sebesar Rp " . number_format($result['nilai_pembayaran'], 0, ',', '.') . " berhasil disimpan beserta rincian pajak!");
            $this->redirect('/pembayaran/detail/' . $result['pembayaran_id']);

        } catch (Exception $e) {
            $this->setFlash('danger', "Gagal Menyimpan Pembayaran: " . $e->getMessage());
            $this->redirect('/pembayaran/create' . (!empty($_POST['realisasi_id']) ? '?realisasi_id=' . $_POST['realisasi_id'] : ''));
        }
    }

    /**
     * Detail Kuitansi Pembayaran & Rincian Pajak
     */
    public function detail($id) {
        $pembayaran = $this->pembayaranModel->getPembayaranDetail($id);

        if (!$pembayaran) {
            $this->setFlash('danger', 'Data Transaksi Pembayaran tidak ditemukan!');
            $this->redirect('/pembayaran');
        }

        $data = [
            'title'      => 'Kuitansi & Rincian Pajak ' . $pembayaran['nomor_transaksi'],
            'pembayaran' => $pembayaran
        ];

        $this->render('pembayaran/detail', $data);
    }

    /**
     * AJAX Endpoint: Hitung Pajak Realtime dari Input JS
     */
    public function calculatePajakAjax() {
        header('Content-Type: application/json');

        $nilai = floatval($_GET['nilai'] ?? $_POST['nilai'] ?? 0);
        $taxOptions = [
            'is_ppn'        => !empty($_GET['is_ppn'] ?? $_POST['is_ppn']),
            'is_pph22'      => !empty($_GET['is_pph22'] ?? $_POST['is_pph22']),
            'is_pph23_jasa' => !empty($_GET['is_pph23_jasa'] ?? $_POST['is_pph23_jasa']),
            'is_pph23_makan'=> !empty($_GET['is_pph23_makan'] ?? $_POST['is_pph23_makan']),
            'pph21'         => floatval($_GET['pph21'] ?? $_POST['pph21'] ?? 0)
        ];

        $calc = $this->pembayaranModel->calculatePajak($nilai, $taxOptions);

        echo json_encode([
            'status' => 'success',
            'data'   => $calc
        ]);
        exit;
    }

    /**
     * AJAX Endpoint: Dapatkan Detail Realisasi untuk Auto Fill Form Pembayaran
     */
    public function getRealisasiInfoAjax($id) {
        header('Content-Type: application/json');

        $detail = $this->realisasiModel->getRealisasiDetail($id);

        if (!$detail) {
            echo json_encode(['status' => 'error', 'message' => 'Data realisasi tidak ditemukan']);
            exit;
        }

        echo json_encode([
            'status' => 'success',
            'data'   => $detail
        ]);
        exit;
    }
}
