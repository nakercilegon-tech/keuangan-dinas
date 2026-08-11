<?php
/**
 * KegiatanModel - Model Master Kegiatan Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class KegiatanModel extends BaseModel {

    protected $table = 'kegiatan';

    /**
     * Dapatkan Kegiatan Dengan Informasi Program Parent
     */
    public function getAllKegiatan($programId = null, $search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT k.*, p.kode_program, p.nama_program,
                       (SELECT COUNT(*) FROM sub_kegiatan sk WHERE sk.kegiatan_id = k.id) as total_sub
                FROM {$this->table} k
                JOIN program p ON k.program_id = p.id
                WHERE 1=1";
        
        $params = [];

        if (!empty($programId)) {
            $sql .= " AND k.program_id = :program_id";
            $params['program_id'] = $programId;
        }

        if (!empty($search)) {
            $sql .= " AND (k.kode_kegiatan LIKE :search OR k.nama_kegiatan LIKE :search OR p.nama_program LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY p.kode_program ASC, k.kode_kegiatan ASC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Get Kegiatan berdasarkan Program ID (untuk Cascading Dropdown)
     */
    public function getByProgramId($programId) {
        $sql = "SELECT * FROM {$this->table} WHERE program_id = :program_id ORDER BY kode_kegiatan ASC";
        return $this->fetchAll($sql, ['program_id' => $programId]);
    }

    /**
     * Cek Duplikasi Kode Kegiatan dalam Program yang sama
     */
    public function isKodeExists($programId, $kode, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE program_id = :program_id AND kode_kegiatan = :kode";
        $params = ['program_id' => $programId, 'kode' => $kode];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Tambah Kegiatan
     */
    public function createKegiatan($data) {
        $sql = "INSERT INTO {$this->table} (program_id, kode_kegiatan, nama_kegiatan, created_at) 
                VALUES (:program_id, :kode_kegiatan, :nama_kegiatan, NOW())";
        
        return $this->execute($sql, [
            'program_id'    => $data['program_id'],
            'kode_kegiatan' => sanitize($data['kode_kegiatan']),
            'nama_kegiatan' => sanitize($data['nama_kegiatan'])
        ]);
    }

    /**
     * Update Kegiatan
     */
    public function updateKegiatan($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                program_id = :program_id, 
                kode_kegiatan = :kode_kegiatan, 
                nama_kegiatan = :nama_kegiatan,
                updated_at = NOW() 
                WHERE id = :id";
        
        return $this->execute($sql, [
            'id'            => $id,
            'program_id'    => $data['program_id'],
            'kode_kegiatan' => sanitize($data['kode_kegiatan']),
            'nama_kegiatan' => sanitize($data['nama_kegiatan'])
        ]);
    }

    /**
     * Cek Apakah Memiliki Child (Sub Kegiatan)
     */
    public function hasChildren($id) {
        $sql = "SELECT COUNT(*) as total FROM sub_kegiatan WHERE kegiatan_id = :id";
        $res = $this->fetch($sql, ['id' => $id]);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Hapus Kegiatan
     */
    public function deleteKegiatan($id) {
        if ($this->hasChildren($id)) {
            return false;
        }
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }
}
