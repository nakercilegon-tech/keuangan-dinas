<?php
/**
 * ImportExportController - Controller Pengelola Impor & Ekspor Data (Tahap 10)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/../models/ImportExportModel.php';

class ImportExportController {
    private $importExportModel;

    public function __construct() {
        $this->importExportModel = new ImportExportModel();
    }

    private function render($view, $data = []) {
        extract($data);
        require_once __DIR__ . "/../views/layout/header.php";
        require_once __DIR__ . "/../views/{$view}.php";
        require_once __DIR__ . "/../views/layout/footer.php";
    }

    /**
     * Halaman Utama Import & Export Center
     */
    public function index() {
        $data = [
            'page_title'  => 'Import & Export Center Data Keuangan UPTD (Tahap 10)',
            'active_menu' => 'import_export'
        ];

        $this->render('import_export/index', $data);
    }

    /**
     * Download Template Excel Master Data
     */
    public function download_template() {
        $entity = $_GET['entity'] ?? 'program';
        $template = $this->importExportModel->getTemplateColumns($entity);

        if (!$template) {
            die("Template untuk entitas {$entity} tidak ditemukan.");
        }

        header('Content-Type: text/csv; charset=utf-8');
        header("Content-Disposition: attachment; filename=Template_Import_{$entity}_2026.csv");

        $output = fopen('php://output', 'w');
        fputcsv($output, $template['headers']);
        fputcsv($output, $template['sample']);
        fclose($output);
        exit;
    }

    /**
     * Preview & Validasi File Excel Sebelum Import
     */
    public function preview_import() {
        if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['excel_file'])) {
            header('Location: /import_export');
            exit;
        }

        $entity = $_POST['entity'] ?? 'program';
        $file = $_FILES['excel_file'];

        // Validasi Keamanan File Upload
        $allowedExtensions = ['xlsx', 'xls', 'csv'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

        if (!in_array($ext, $allowedExtensions)) {
            $_SESSION['flash_error'] = 'Format file tidak didukung! Gunakan format .xlsx, .xls, atau .csv';
            header('Location: /import_export');
            exit;
        }

        $previewResult = $this->importExportModel->validateAndPreviewExcel($entity, $file['tmp_name']);

        $data = [
            'page_title'     => 'Preview & Validasi Impor Excel - SIMKEU UPTD',
            'active_menu'    => 'import_export',
            'preview_data'   => $previewResult,
            'original_name'  => $file['name']
        ];

        $this->render('import_export/preview', $data);
    }

    /**
     * Eksekusi Import Data
     */
    public function execute_import() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $entity = $_POST['entity'] ?? 'program';
            $result = $this->importExportModel->executeImport($entity, []);

            $_SESSION['flash_message'] = $result['message'];
            header('Location: /import_export');
            exit;
        }
    }

    /**
     * Export Master Data to Excel
     */
    public function export_master() {
        $entity = $_GET['entity'] ?? 'program';
        $filename = "Export_Master_" . ucfirst($entity) . "_2026.csv";

        header('Content-Type: text/csv; charset=utf-8');
        header("Content-Disposition: attachment; filename={$filename}");

        $output = fopen('php://output', 'w');
        fputcsv($output, ['Kode / ID', 'Nama / Deskripsi', 'Status', 'Tanggal Update']);
        fputcsv($output, ['M-001', 'Data Master Sample ' . ucfirst($entity), 'AKTIF', date('Y-m-d H:i:s')]);
        fclose($output);
        exit;
    }
}
