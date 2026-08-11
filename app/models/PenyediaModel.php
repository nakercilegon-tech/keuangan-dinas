<?php
/**
 * PenyediaModel - Model Master Penyedia / Perusahaan
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class PenyediaModel extends BaseModel {

    protected $table = 'penyedia';

    /**
     * Dapatkan Semua Data Penyedia
     */
    public function getAllPenyedia($search = '', $status = '', $limit = 50, $offset = 0) {
        $sql = "SELECT p.*,
                       (SELECT COUNT(*) FROM realisasi r WHERE r.penyedia_id = p.id) as total_kontrak_pekerjaan
                FROM {$this->table} p
                WHERE 1=1";
        
        $params = [];

        if (!empty($status)) {
            $sql .= " AND p.status = :status";
            $params['status'] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (p.nama_perusahaan LIKE :search OR p.nama_penyedia LIKE :search OR p.npwp LIKE :search OR p.email LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY p.nama_perusahaan ASC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Cek NPWP Duplikat
     */
    public function isNpwpExists($npwp, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE npwp = :npwp";
        $params = ['npwp' => $npwp];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Tambah Penyedia Baru
     */
    public function createPenyedia($data) {
        $sql = "INSERT INTO {$this->table} 
                (nama_perusahaan, nama_penyedia, alamat, npwp, nama_bank, nomor_rekening, pemegang_rekening, telepon, email, status, created_at) 
                VALUES 
                (:nama_perusahaan, :nama_penyedia, :alamat, :npwp, :nama_bank, :nomor_rekening, :pemegang_rekening, :telepon, :email, :status, NOW())";
        
        return $this->execute($sql, [
            'nama_perusahaan'  => sanitize($data['nama_perusahaan']),
            'nama_penyedia'    => sanitize($data['nama_penyedia']),
            'alamat'           => sanitize($data['alamat']),
            'npwp'             => sanitize($data['npwp']),
            'nama_bank'        => sanitize($data['nama_bank']),
            'nomor_rekening'   => sanitize($data['nomor_rekening']),
            'pemegang_rekening'=> sanitize($data['pemegang_rekening']),
            'telepon'          => sanitize($data['telepon'] ?? ''),
            'email'            => sanitize($data['email'] ?? ''),
            'status'           => sanitize($data['status'] ?? 'aktif')
        ]);
    }

    /**
     * Update Penyedia
     */
    public function updatePenyedia($id, $data) {
        $sql = "UPDATE {$this->table} SET 
                nama_perusahaan = :nama_perusahaan, 
                nama_penyedia = :nama_penyedia, 
                alamat = :alamat, 
                npwp = :npwp, 
                nama_bank = :nama_bank, 
                nomor_rekening = :nomor_rekening, 
                pemegang_rekening = :pemegang_rekening, 
                telepon = :telepon, 
                email = :email, 
                status = :status,
                updated_at = NOW() 
                WHERE id = :id";
        
        return $this->execute($sql, [
            'id'               => $id,
            'nama_perusahaan'  => sanitize($data['nama_perusahaan']),
            'nama_penyedia'    => sanitize($data['nama_penyedia']),
            'alamat'           => sanitize($data['alamat']),
            'npwp'             => sanitize($data['npwp']),
            'nama_bank'        => sanitize($data['nama_bank']),
            'nomor_rekening'   => sanitize($data['nomor_rekening']),
            'pemegang_rekening'=> sanitize($data['pemegang_rekening']),
            'telepon'          => sanitize($data['telepon'] ?? ''),
            'email'            => sanitize($data['email'] ?? ''),
            'status'           => sanitize($data['status'] ?? 'aktif')
        ]);
    }

    /**
     * Hapus Penyedia
     */
    public function deletePenyedia($id) {
        $sqlCheck = "SELECT COUNT(*) as total FROM realisasi WHERE penyedia_id = :id";
        $res = $this->fetch($sqlCheck, ['id' => $id]);
        if (intval($res['total'] ?? 0) > 0) {
            return false; // Tidak boleh dihapus jika sudah pernah ada transaksi realisasi
        }

        $sql = "DELETE FROM {$this->table} WHERE id = :id";
        return $this->execute($sql, ['id' => $id]);
    }
}
