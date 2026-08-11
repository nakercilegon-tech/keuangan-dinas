<?php
/**
 * Main Entry Point (Front Controller Routing)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/app/helpers/functions.php';

// Parse Requested Route
$url = $_GET['url'] ?? 'dashboard';
$url = rtrim($url, '/');
$url = filter_var($url, FILTER_SANITIZE_URL);
$urlParts = explode('/', $url);

$controllerName = !empty($urlParts[0]) ? ucfirst($urlParts[0]) . 'Controller' : 'DashboardController';
$methodName = !empty($urlParts[1]) ? $urlParts[1] : 'index';
$params = array_slice($urlParts, 2);

$controllerFile = __DIR__ . '/app/controllers/' . $controllerName . '.php';

if (file_exists($controllerFile)) {
    require_once $controllerFile;
    if (class_exists($controllerName)) {
        $controller = new $controllerName();
        if (method_exists($controller, $methodName)) {
            call_user_func_array([$controller, $methodName], $params);
            exit();
        }
    }
}

// Fallback Status Landing Page / API
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= APP_NAME ?></title>
    <link href="https://cdn.jsdelivr.net/style/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background: #f8fafc; font-family: 'Segoe UI', system-ui, sans-serif; color: #1e293b; }
        .hero-card { background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 2rem; }
    </style>
</head>
<body class="p-4">
    <div class="container max-w-4xl mx-auto my-5">
        <div class="hero-card border border-primary border-3">
            <span class="badge bg-primary px-3 py-2 text-uppercase mb-2">Tahap 1 Finished</span>
            <h2 class="fw-bold text-primary mb-3"><?= APP_NAME ?></h2>
            <p class="text-muted">Database & Architecture Core System UPTD Keuangan (db_keuangan_uptd)</p>
            <hr>
            <div class="row text-center my-4">
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <h4 class="fw-bold text-success">14</h4>
                        <small class="text-secondary">Tabel Database</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <h4 class="fw-bold text-info">2026</h4>
                        <small class="text-secondary">Tahun Anggaran</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <h4 class="fw-bold text-warning">PDO</h4>
                        <small class="text-secondary">Engine Database</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="p-3 bg-light rounded">
                        <h4 class="fw-bold text-danger">MVC</h4>
                        <small class="text-secondary">Arsitektur PHP</small>
                    </div>
                </div>
            </div>
            <div class="alert alert-info">
                <strong>Status Sistem:</strong> Seluruh 14 tabel database, relasi foreign key, indeks, file DDL/DML SQL, serta fungsi helper kalkulasi pajak PPN/PPh telah berhasil dibangun sesuai Kontrak Proyek.
            </div>
            <p class="mb-0 text-secondary">Akses file SQL di folder: <code>database/db_keuangan_uptd.sql</code></p>
        </div>
    </div>
</body>
</html>
