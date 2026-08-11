<?php
/**
 * Base Controller
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/../helpers/functions.php';

abstract class BaseController {
    
    /**
     * Render View with Data
     */
    protected function render($viewPath, $data = []) {
        extract($data);
        $fullPath = __DIR__ . '/../views/' . $viewPath . '.php';

        if (file_exists($fullPath)) {
            require_once $fullPath;
        } else {
            die("View path not found: " . $viewPath);
        }
    }

    /**
     * JSON Response Helper
     */
    protected function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit();
    }

    /**
     * Enforce User Authentication and Role
     */
    protected function authorize($roles = []) {
        if (!isset($_SESSION['user_id'])) {
            header('Location: ' . BASE_URL . 'auth/login');
            exit();
        }

        if (!empty($roles) && !in_array($_SESSION['user_role'], $roles)) {
            http_response_code(403);
            die("Akses ditolak: Anda tidak memiliki wewenang untuk membuka halaman ini.");
        }
    }
}
