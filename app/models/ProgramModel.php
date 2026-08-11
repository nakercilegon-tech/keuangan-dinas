<?php
/**
 * ProgramModel - Model Master Program Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class ProgramModel extends BaseModel {

    protected $table = 'program';

    /**
     * Dapatkan Semua Program Dengan Filter & Pagination
     */
    public function getAllProgram($search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT p.*, 
                       (SELECT COUNT(*) FROM kegiatan k WHERE k.program_id = p.id) as total_kegiatan,
                       (SELECT COALESCE(SUM(pk.pagu_paket), 0) FROM paket_pekerjaan pk WHERE pk.program_id = p.id) as total_pagu
                FROM {$this->table} p
                WHERE 1=1";
        
        $params = [];

        if (!empty($search)) {
            $sql .= " AND (p.kode_program LIKE :search OR p.nama_program LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY p.kode_program ASC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Hitung Total Program untuk Pagination
     */
    public function countAllProgram($search = '') {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE 1=1";
        $params = [];

        if (!empty($search)) {
            $sql .= " AND (kode_program LIKE :search OR nama_program LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0);
    }

    /**
     * Cek Duplikasi Kode Program
     */
    public function isKodeExists($kode, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE kode_program = :kode";
        $params = ['kode' => $kode];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Tambah Program
     */
    public function createProgram($data) {
        $sql = "INSERT INTO {$this->table} (kode_program, nama_program, tahun_anggaran, created_at) 
                VALUES (:kode_program, :nama_program, :tahun_anggaran, NOW())";
        
        return $this->execute($sql, [
            'kode_program'   => sanitize($data['kode_program']),
            'nama_program'   => sanitize($data['nama_program']),
            'tahun_anggaran' => sanitize($data['tahun_anggaran'] ?? '2026')
        ]);
    }

    /**
     * Update Program
     */
    public function updateProgram($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                kode_program = :kode_program, 
                nama_program = :nama_program, 
                tahun_anggaran = :tahun_anggaran,
                updated_at = NOW() 
                WHERE id = :id";
        
        return $this->execute($sql, [
            'id'             => $id,
            'kode_program'   => sanitize($data['kode_program']),
            'nama_program'   => sanitize($data['nama_program']),
            'tahun_anggaran' => sanitize($data['tahun_anggaran'] ?? '2026')
        ]);
    }

    /**
     * Cek Apakah Program Memiliki Child (Kegiatan)
     */
    public function hasChildren($id) {
        $sql = "SELECT COUNT(*) as total FROM kegiatan WHERE program_id = :id";
        $res = $this->fetch($sql, ['id' => $id]);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Hapus Program
     */
    public function deleteProgram($id) {
        if ($this->hasChildren($id)) {
            return false; // Tidak boleh dihapus jika masih ada kegiatan
        }
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }
}
