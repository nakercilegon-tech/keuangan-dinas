<?php
/**
 * DashboardController - Beranda Sesi & Ringkasan Eksekutif (Tahap 7)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';
require_once __DIR__ . '/../models/DashboardModel.php';

class DashboardController extends BaseController {
    private $dashboardModel;

    public function __construct() {
        AuthMiddleware::checkAuth();
        $this->dashboardModel = new DashboardModel();
    }

    /**
     * Tampilkan Dashboard Ringkasan & Multi Grafik
     */
    public function index() {
        $filters = [
            'tahun' => $_GET['tahun'] ?? '2026',
            'tanggal_mulai' => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir' => $_GET['tanggal_akhir'] ?? '',
            'program_id' => $_GET['program_id'] ?? '',
            'kegiatan_id' => $_GET['kegiatan_id'] ?? '',
            'sub_kegiatan_id' => $_GET['sub_kegiatan_id'] ?? ''
        ];

        $chartsData = $this->dashboardModel->getChartsData($filters);

        $data = array_merge($chartsData['cards'], [
            'page_title'          => 'Dashboard Keuangan - SIMKEU UPTD 2026',
            'active_menu'         => 'dashboard',
            'user_name'           => $_SESSION['nama_lengkap'] ?? 'Administrator',
            'user_role'           => $_SESSION['user_role'] ?? 'OPERATOR',
            'charts'              => $chartsData,
            'filters'             => $filters
        ]);

        $this->render('dashboard/index', $data);
    }

    /**
     * AJAX Endpoint for Realtime Dashboard Filtering (Tahap 7)
     */
    public function api_stats() {
        header('Content-Type: application/json');

        $filters = [
            'tahun'           => $_GET['tahun'] ?? $_POST['tahun'] ?? '2026',
            'tanggal_mulai'   => $_GET['tanggal_mulai'] ?? $_POST['tanggal_mulai'] ?? '',
            'tanggal_akhir'   => $_GET['tanggal_akhir'] ?? $_POST['tanggal_akhir'] ?? '',
            'program_id'      => $_GET['program_id'] ?? $_POST['program_id'] ?? '',
            'kegiatan_id'     => $_GET['kegiatan_id'] ?? $_POST['kegiatan_id'] ?? '',
            'sub_kegiatan_id' => $_GET['sub_kegiatan_id'] ?? $_POST['sub_kegiatan_id'] ?? ''
        ];

        $data = $this->dashboardModel->getChartsData($filters);

        echo json_encode([
            'status' => 'success',
            'message' => 'Dashboard statistics loaded successfully',
            'filters' => $filters,
            'data' => $data
        ]);
        exit;
    }
}

