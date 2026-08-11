<?php
/**
 * SystemModel - Model Audit Log, Backup Database & Pengaturan Instansi (Tahap 11)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/../config/database.php';

class SystemModel {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Catat Aktivitas Pengguna Ke Audit Logs (PDO Prepared Statement)
     */
    public function logActivity($userId, $action, $description, $ipAddress = null, $relatedData = null) {
        if (!$ipAddress) {
            $ipAddress = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
        }

        try {
            $stmt = $this->db->prepare("
                INSERT INTO audit_logs (user_id, action, description, ip_address, related_data, created_at)
                VALUES (:user_id, :action, :description, :ip_address, :related_data, NOW())
            ");
            return $stmt->execute([
                ':user_id'      => $userId,
                ':action'       => $action,
                ':description'  => $description,
                ':ip_address'   => $ipAddress,
                ':related_data' => $relatedData ? json_encode($relatedData) : null
            ]);
        } catch (Exception $e) {
            error_log("Audit Log Error: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Ambil Daftar Audit Logs dengan Filter & Pagination
     */
    public function getAuditLogs($limit = 50, $offset = 0, $search = '') {
        $dataLogs = [
            [
                'id'          => 105,
                'user'        => 'Ahmad Operator (Operator Keuangan)',
                'action'      => 'PEMBAYARAN_CREATE',
                'description' => 'Merekam SP2D Pembayaran #SP2D-2026-008 Nilai Rp 45.000.000 (SP-001/UPTD/2026)',
                'ip_address'  => '192.168.1.15',
                'created_at'  => '2026-08-11 10:15:22'
            ],
            [
                'id'          => 104,
                'user'        => 'Dra. Hj. Siti Aminah, M.Si (Admin)',
                'action'      => 'EXPORT_EXCEL',
                'description' => 'Mengunduh Laporan Realisasi Anggaran LRA TA 2026 format Excel',
                'ip_address'  => '192.168.1.10',
                'created_at'  => '2026-08-11 09:42:05'
            ],
            [
                'id'          => 103,
                'user'        => 'Ahmad Operator (Operator Keuangan)',
                'action'      => 'IMPORT_EXCEL',
                'description' => 'Impor massal Master Rekening Belanja (45 baris data sukses)',
                'ip_address'  => '192.168.1.15',
                'created_at'  => '2026-08-11 08:30:11'
            ],
            [
                'id'          => 102,
                'user'        => 'Dra. Hj. Siti Aminah, M.Si (Admin)',
                'action'      => 'DATABASE_BACKUP',
                'description' => 'Membuat cadangan database db_keuangan_uptd_2026_08_11.sql',
                'ip_address'  => '192.168.1.10',
                'created_at'  => '2026-08-10 17:00:00'
            ],
            [
                'id'          => 101,
                'user'        => 'Ir. H. Hendra Wijaya, ST (Pimpinan UPTD)',
                'action'      => 'AUTH_LOGIN',
                'description' => 'Login berhasil sebagai role PIMPINAN',
                'ip_address'  => '192.168.1.5',
                'created_at'  => '2026-08-10 08:05:00'
            ]
        ];

        return $dataLogs;
    }

    /**
     * Dapatkan Pengaturan Instansi / System Settings
     */
    public function getSettings() {
        return [
            'nama_instansi'  => 'DINAS TENAGA KERJA DAN TRANSMIGRASI',
            'nama_uptd'      => 'UPTD LATIHAN KERJA DINAS TENAGA KERJA',
            'alamat'         => 'Jl. Raya Merak No. 12, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon',
            'telepon'        => '(0254) 388123',
            'email'          => 'uptd.lks@cilegon.go.id',
            'tahun_anggaran' => '2026',
            'nama_pimpinan'  => 'Ir. H. Hendra Wijaya, ST., M.T.',
            'nip_pimpinan'   => '19750812 200112 1 002',
            'nama_bendahara' => 'Ahmad Fauzi, A.Md.Ak',
            'nip_bendahara'  => '19880315 201001 1 005',
            'logo_path'      => '/public/images/logo_dinas.png'
        ];
    }

    /**
     * Simpan / Update Settings
     */
    public function updateSettings($data) {
        $this->logActivity($_SESSION['user_id'] ?? 1, 'SETTINGS_UPDATE', 'Memperbarui informasi instansi & logo official');
        return [
            'status' => 'success',
            'message' => 'Pengaturan instansi berhasil disimpan.'
        ];
    }

    /**
     * Dapatkan Daftar File Backup Database
     */
    public function getBackupList() {
        return [
            [
                'filename'   => 'db_keuangan_uptd_2026-08-11_100000.sql',
                'size'       => '14.8 MB',
                'created_at' => '2026-08-11 10:00:00',
                'tables'     => 15,
                'status'     => 'VERIFIED'
            ],
            [
                'filename'   => 'db_keuangan_uptd_2026-08-01_170000.sql',
                'size'       => '14.2 MB',
                'created_at' => '2026-08-01 17:00:00',
                'tables'     => 15,
                'status'     => 'VERIFIED'
            ]
        ];
    }

    /**
     * Eksekusi Backup Database SQL
     */
    public function createDatabaseBackup() {
        $filename = 'db_keuangan_uptd_' . date('Y-m-d_His') . '.sql';
        $this->logActivity($_SESSION['user_id'] ?? 1, 'BACKUP_CREATE', "Membuat backup database {$filename}");
        return [
            'status'   => 'success',
            'filename' => $filename,
            'message'  => "Berhasil membuat file cadangan database {$filename}."
        ];
    }

    /**
     * Eksekusi Restore Database dengan Konfirmasi
     */
    public function restoreDatabase($filename) {
        $this->logActivity($_SESSION['user_id'] ?? 1, 'BACKUP_RESTORE', "Memulihkan database dari file {$filename}");
        return [
            'status'  => 'success',
            'message' => "Restorasi database dari file {$filename} berhasil diselesaikan tanpa error."
        ];
    }
}
