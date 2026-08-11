<?php
/**
 * RekeningModel - Model Master Rekening Belanja
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class RekeningModel extends BaseModel {

    protected $table = 'rekening_belanja';

    /**
     * Dapatkan Semua Rekening Belanja
     */
    public function getAllRekening($jenisBelanja = null, $search = '', $limit = 100, $offset = 0) {
        $sql = "SELECT r.*,
                       (SELECT COALESCE(SUM(pkr.pagu_rekening), 0) FROM paket_pekerjaan_rekening pkr WHERE pkr.rekening_id = r.id) as total_dialokasikan
                FROM {$this->table} r
                WHERE 1=1";
        
        $params = [];

        if (!empty($jenisBelanja)) {
            $sql .= " AND r.jenis_belanja = :jenis_belanja";
            $params['jenis_belanja'] = $jenisBelanja;
        }

        if (!empty($search)) {
            $sql .= " AND (r.kode_rekening LIKE :search OR r.nama_rekening LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY r.kode_rekening ASC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Cek Kode Rekening Unik
     */
    public function isKodeExists($kode, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE kode_rekening = :kode";
        $params = ['kode' => $kode];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Tambah Rekening Belanja
     */
    public function createRekening($data) {
        $sql = "INSERT INTO {$this->table} (kode_rekening, nama_rekening, jenis_belanja, created_at) 
                VALUES (:kode_rekening, :nama_rekening, :jenis_belanja, NOW())";
        
        return $this->execute($sql, [
            'kode_rekening' => sanitize($data['kode_rekening']),
            'nama_rekening' => sanitize($data['nama_rekening']),
            'jenis_belanja' => sanitize($data['jenis_belanja'] ?? 'Belanja Barang dan Jasa')
        ]);
    }

    /**
     * Update Rekening Belanja
     */
    public function updateRekening($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                kode_rekening = :kode_rekening, 
                nama_rekening = :nama_rekening, 
                jenis_belanja = :jenis_belanja,
                updated_at = NOW() 
                WHERE id = :id";
        
        return $this->execute($sql, [
            'id'            => $id,
            'kode_rekening' => sanitize($data['kode_rekening']),
            'nama_rekening' => sanitize($data['nama_rekening']),
            'jenis_belanja' => sanitize($data['jenis_belanja'] ?? 'Belanja Barang dan Jasa')
        ]);
    }

    /**
     * Cek Apakah Rekening Digunakan di Paket Pekerjaan Rekening
     */
    public function isUsedInPaket($id) {
        $sql = "SELECT COUNT(*) as total FROM paket_pekerjaan_rekening WHERE rekening_id = :id";
        $res = $this->fetch($sql, ['id' => $id]);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Hapus Rekening Belanja
     */
    public function deleteRekening($id) {
        if ($this->isUsedInPaket($id)) {
            return false;
        }
        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }
}
