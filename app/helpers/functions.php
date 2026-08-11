<?php
/**
 * Helper Functions
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

/**
 * Format Angka Ke Rupiah
 */
function formatRupiah($angka, $withPrefix = true) {
    if ($angka === null || $angka === '') return $withPrefix ? 'Rp 0' : '0';
    $formatted = number_format((float)$angka, 0, ',', '.');
    return $withPrefix ? 'Rp ' . $formatted : $formatted;
}

/**
 * Sanitasi Input XSS
 */
function sanitize($data) {
    if (is_array($data)) {
        foreach ($data as $key => $value) {
            $data[$key] = sanitize($value);
        }
        return $data;
    }
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate CSRF Token
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verifikasi CSRF Token
 */
function verifyCSRFToken($token) {
    if (!isset($_SESSION['csrf_token']) || empty($token)) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Kalkulasi Pajak Resmi Berdasarkan Kontrak Proyek
 * @param float $nilaiPembayaran
 * @param float $pph21Manual
 * @return array
 */
function hitungPajakPemerintah($nilaiPembayaran, $pph21Manual = 0.00) {
    $nilaiPembayaran = max(0, (float)$nilaiPembayaran);
    
    // Dasar Pengenaan Pajak DPP (Nilai Pembayaran / 1.11)
    $dpp = $nilaiPembayaran / 1.11;

    // 1. PPN = (NILAI PEMBAYARAN / 1,11) * 11%
    $ppn = round($dpp * 0.11, 2);

    // 2. PPH21 = MANUAL
    $pph21 = round((float)$pph21Manual, 2);

    // 3. PPH22 = (NILAI PEMBAYARAN / 1,11) * 1,5%
    $pph22 = round($dpp * 0.015, 2);

    // 4. PPH23 JASA = (NILAI PEMBAYARAN / 1,11) * 2%
    $pph23_jasa = round($dpp * 0.02, 2);

    // 5. PPH23 MAKAN = NILAI PEMBAYARAN * 2%
    $pph23_makan = round($nilaiPembayaran * 0.02, 2);

    // TOTAL PAJAK = PPN + PPH21 + PPH22 + PPH23 JASA + PPH23 MAKAN
    $total_pajak = round($ppn + $pph21 + $pph22 + $pph23_jasa + $pph23_makan, 2);

    // NILAI BERSIH = NILAI PEMBAYARAN - TOTAL PAJAK
    $nilai_bersih = round($nilaiPembayaran - $total_pajak, 2);

    return [
        'nilai_pembayaran' => $nilaiPembayaran,
        'dpp'              => round($dpp, 2),
        'ppn'              => $ppn,
        'pph21'            => $pph21,
        'pph22'            => $pph22,
        'pph23_jasa'       => $pph23_jasa,
        'pph23_makan'      => $pph23_makan,
        'total_pajak'      => $total_pajak,
        'nilai_bersih'     => $nilai_bersih
    ];
}

/**
 * Audit Log Helper
 */
function writeAuditLog($action, $tableName, $recordId, $description) {
    try {
        $db = Database::getInstance();
        $userId = $_SESSION['user_id'] ?? null;
        $ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        $agent = $_SERVER['HTTP_USER_AGENT'] ?? 'System';

        $db->query(
            "INSERT INTO audit_logs (user_id, action, table_name, record_id, description, ip_address, user_agent) 
             VALUES (?, ?, ?, ?, ?, ?, ?)",
            [$userId, $action, $tableName, $recordId, $description, $ip, $agent]
        );
    } catch (Exception $e) {
        error_log("Failed to write audit log: " . $e->getMessage());
    }
}
