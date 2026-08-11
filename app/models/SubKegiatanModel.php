<?php
/**
 * SubKegiatanModel - Model Master Sub Kegiatan Anggaran
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class SubKegiatanModel extends BaseModel {

    protected $table = 'sub_kegiatan';

    /**
     * Dapatkan Sub Kegiatan Lengkap Dengan Hierarki Parent (Program & Kegiatan)
     */
    public function getAllSubKegiatan($programId = null, $kegiatanId = null, $search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT sk.*, k.kode_kegiatan, k.nama_kegiatan, p.kode_program, p.nama_program,
                       (SELECT COUNT(*) FROM paket_pekerjaan pk WHERE pk.sub_kegiatan_id = sk.id) as total_paket
                FROM {$this->table} sk
                JOIN kegiatan k ON sk.kegiatan_id = k.id
                JOIN program p ON sk.program_id = p.id
                WHERE 1=1";
        
        $params = [];

        if (!empty($programId)) {
            $sql .= " AND sk.program_id = :program_id";
            $params['program_id'] = $programId;
        }

        if (!empty($kegiatanId)) {
            $sql .= " AND sk.kegiatan_id = :kegiatan_id";
            $params['kegiatan_id'] = $kegiatanId;
        }

        if (!empty($search)) {
            $sql .= " AND (sk.kode_sub_kegiatan LIKE :search OR sk.nama_sub_kegiatan LIKE :search OR k.nama_kegiatan LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY p.kode_program ASC, k.kode_kegiatan ASC, sk.kode_sub_kegiatan ASC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Get Sub Kegiatan Berdasarkan Kegiatan ID (untuk Cascading Dropdown)
     */
    public function getByKegiatanId($kegiatanId) {
        $sql = "SELECT * FROM {$this->table} WHERE kegiatan_id = :kegiatan_id ORDER BY kode_sub_kegiatan ASC";
        return $this->fetchAll($sql, ['kegiatan_id' => $kegiatanId]);
    }

    /**
     * Cek Duplikasi Kode Sub Kegiatan
     */
    public function isKodeExists($kegiatanId, $kode, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE kegiatan_id = :kegiatan_id AND kode_sub_kegiatan = :kode";
        $params = ['kegiatan_id' => $kegiatanId, 'kode' => $kode];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Tambah Sub Kegiatan
     */
    public function createSubKegiatan($data) {
        $sql = "INSERT INTO {$this->table} (program_id, kegiatan_id, kode_sub_kegiatan, nama_sub_kegiatan, created_at) 
                VALUES (:program_id, :kegiatan_id, :kode_sub_kegiatan, :nama_sub_kegiatan, NOW())";
        
        return $this->execute($sql, [
            'program_id'        => $data['program_id'],
            'kegiatan_id'       => $data['kegiatan_id'],
            'kode_sub_kegiatan' => sanitize($data['kode_sub_kegiatan']),
            'nama_sub_kegiatan' => sanitize($data['nama_sub_kegiatan'])
        ]);
    }

    /**
     * Update Sub Kegiatan
     */
    public function updateSubKegiatan($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                program_id = :program_id, 
                kegiatan_id = :kegiatan_id, 
                kode_sub_kegiatan = :kode_sub_kegiatan, 
                nama_sub_kegiatan = :nama_sub_kegiatan,
                updated_at = NOW() 
                WHERE id = :id";
        
        return $this->execute($sql, [
            'id'                => $id,
            'program_id'        => $data['program_id'],
            'kegiatan_id'       => $data['kegiatan_id'],
            'kode_sub_kegiatan' => sanitize($data['kode_sub_kegiatan']),
            'nama_sub_kegiatan' => sanitize($data['nama_sub_kegiatan'])
        ]);
    }

    /**
     * Cek Apakah Digunakan di Paket Pekerjaan
     */
    public function isUsedInPaket($id) {
        $sql = "SELECT COUNT(*) as total FROM paket_pekerjaan WHERE sub_kegiatan_id = :id";
        $res = $this->fetch($sql, ['id' => $id]);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Hapus Sub Kegiatan
     */
    public function deleteSubKegiatan($id) {
        if ($this->isUsedInPaket($id)) {
            return false;
        }
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }
}
