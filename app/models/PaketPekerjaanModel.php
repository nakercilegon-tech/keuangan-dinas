<?php
/**
 * PaketPekerjaanModel - Model Paket Pekerjaan & Allocation Multi-Rekening
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class PaketPekerjaanModel extends BaseModel {

    protected $table = 'paket_pekerjaan';

    /**
     * Dapatkan Paket Pekerjaan Lengkap Dengan Info Program, Kegiatan, Sub-Kegiatan, dan Rekening
     */
    public function getAllPaket($programId = null, $kegiatanId = null, $subKegiatanId = null, $search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT pk.*, 
                       p.kode_program, p.nama_program,
                       k.kode_kegiatan, k.nama_kegiatan,
                       sk.kode_sub_kegiatan, sk.nama_sub_kegiatan,
                       (SELECT COALESCE(SUM(pkr.pagu_rekening), 0) FROM paket_pekerjaan_rekening pkr WHERE pkr.paket_id = pk.id) as total_pagu_rekening,
                       (SELECT COUNT(*) FROM paket_pekerjaan_rekening pkr WHERE pkr.paket_id = pk.id) as total_rekening_count,
                       (SELECT COALESCE(SUM(r.nilai_pembayaran), 0) FROM realisasi r WHERE r.paket_id = pk.id) as total_realisasi
                FROM {$this->table} pk
                JOIN program p ON pk.program_id = p.id
                JOIN kegiatan k ON pk.kegiatan_id = k.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                WHERE 1=1";
        
        $params = [];

        if (!empty($programId)) {
            $sql .= " AND pk.program_id = :program_id";
            $params['program_id'] = $programId;
        }

        if (!empty($kegiatanId)) {
            $sql .= " AND pk.kegiatan_id = :kegiatan_id";
            $params['kegiatan_id'] = $kegiatanId;
        }

        if (!empty($subKegiatanId)) {
            $sql .= " AND pk.sub_kegiatan_id = :sub_kegiatan_id";
            $params['sub_kegiatan_id'] = $subKegiatanId;
        }

        if (!empty($search)) {
            $sql .= " AND (pk.nomor_paket LIKE :search OR pk.nama_paket LIKE :search OR sk.nama_sub_kegiatan LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY pk.created_at DESC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Dapatkan Detail Paket Pekerjaan beserta daftar Rekening Dialokasikan
     */
    public function getPaketDetail($id) {
        $sql = "SELECT pk.*, 
                       p.kode_program, p.nama_program,
                       k.kode_kegiatan, k.nama_kegiatan,
                       sk.kode_sub_kegiatan, sk.nama_sub_kegiatan
                FROM {$this->table} pk
                JOIN program p ON pk.program_id = p.id
                JOIN kegiatan k ON pk.kegiatan_id = k.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                WHERE pk.id = :id";
        
        $paket = $this->fetch($sql, ['id' => $id]);

        if ($paket) {
            // Get Multi-Rekening
            $sqlRekening = "SELECT pkr.*, r.kode_rekening, r.nama_rekening, r.jenis_belanja,
                                  (SELECT COALESCE(SUM(rr.nilai_realisasi), 0) 
                                   FROM realisasi_rekening rr 
                                   WHERE rr.paket_rekening_id = pkr.id) as total_realisasi_rekening
                           FROM paket_pekerjaan_rekening pkr
                           JOIN rekening_belanja r ON pkr.rekening_id = r.id
                           WHERE pkr.paket_id = :paket_id
                           ORDER BY r.kode_rekening ASC";
            
            $paket['rekening_list'] = $this->fetchAll($sqlRekening, ['paket_id' => $id]);
        }

        return $paket;
    }

    /**
     * Cek Nomor Paket Unik
     */
    public function isNomorPaketExists($nomorPaket, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE nomor_paket = :nomor_paket";
        $params = ['nomor_paket' => $nomorPaket];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * SIMPAN PAKET PEKERJAAN BERSAMA MULTI-REKENING (TRANSACTION)
     * Validasi: Total Pagu Rekening <= Pagu Paket
     */
    public function createPaketWithMultiRekening($paketData, $rekeningItems) {
        // Validasi Pagu Rekening <= Pagu Paket
        $totalPaguRekening = 0;
        foreach ($rekeningItems as $item) {
            $totalPaguRekening += floatval($item['pagu_rekening'] ?? 0);
        }

        if ($totalPaguRekening > floatval($paketData['pagu_paket'])) {
            throw new Exception("Validasi Gagal: Total Pagu Rekening (Rp " . number_format($totalPaguRekening, 0, ',', '.') . ") melebihi Pagu Paket (Rp " . number_format($paketData['pagu_paket'], 0, ',', '.') . ")!");
        }

        try {
            $this->beginTransaction();

            // 1. Insert Header Paket Pekerjaan
            $sqlHeader = "INSERT INTO {$this->table} 
                          (nomor_paket, program_id, kegiatan_id, sub_kegiatan_id, nama_paket, pagu_paket, tahun_anggaran, status, keterangan, created_at) 
                          VALUES 
                          (:nomor_paket, :program_id, :kegiatan_id, :sub_kegiatan_id, :nama_paket, :pagu_paket, :tahun_anggaran, :status, :keterangan, NOW())";
            
            $this->execute($sqlHeader, [
                'nomor_paket'     => sanitize($paketData['nomor_paket']),
                'program_id'      => $paketData['program_id'],
                'kegiatan_id'     => $paketData['kegiatan_id'],
                'sub_kegiatan_id' => $paketData['sub_kegiatan_id'],
                'nama_paket'      => sanitize($paketData['nama_paket']),
                'pagu_paket'      => floatval($paketData['pagu_paket']),
                'tahun_anggaran'  => sanitize($paketData['tahun_anggaran'] ?? '2026'),
                'status'          => sanitize($paketData['status'] ?? 'DRAFT'),
                'keterangan'      => sanitize($paketData['keterangan'] ?? '')
            ]);

            $paketId = $this->lastInsertId();

            // 2. Insert Multi Rekening
            $sqlItem = "INSERT INTO paket_pekerjaan_rekening (paket_id, rekening_id, pagu_rekening) VALUES (:paket_id, :rekening_id, :pagu_rekening)";
            foreach ($rekeningItems as $item) {
                if (!empty($item['rekening_id']) && floatval($item['pagu_rekening']) > 0) {
                    $this->execute($sqlItem, [
                        'paket_id'      => $paketId,
                        'rekening_id'   => $item['rekening_id'],
                        'pagu_rekening' => floatval($item['pagu_rekening'])
                    ]);
                }
            }

            $this->commit();
            return $paketId;

        } catch (Exception $e) {
            $this->rollBack();
            throw $e;
        }
    }

    /**
     * UPDATE PAKET PEKERJAAN & MULTI REKENING (TRANSACTION)
     */
    public function updatePaketWithMultiRekening($id, $paketData, $rekeningItems) {
        $totalPaguRekening = 0;
        foreach ($rekeningItems as $item) {
            $totalPaguRekening += floatval($item['pagu_rekening'] ?? 0);
        }

        if ($totalPaguRekening > floatval($paketData['pagu_paket'])) {
            throw new Exception("Validasi Gagal: Total Pagu Rekening (Rp " . number_format($totalPaguRekening, 0, ',', '.') . ") melebihi Pagu Paket!");
        }

        try {
            $this->beginTransaction();

            // 1. Update Header
            $sqlUpdate = "UPDATE {$this->table} SET 
                          nomor_paket = :nomor_paket, 
                          program_id = :program_id, 
                          kegiatan_id = :kegiatan_id, 
                          sub_kegiatan_id = :sub_kegiatan_id, 
                          nama_paket = :nama_paket, 
                          pagu_paket = :pagu_paket, 
                          tahun_anggaran = :tahun_anggaran, 
                          status = :status, 
                          keterangan = :keterangan, 
                          updated_at = NOW() 
                          WHERE id = :id";
            
            $this->execute($sqlUpdate, [
                'id'              => $id,
                'nomor_paket'     => sanitize($paketData['nomor_paket']),
                'program_id'      => $paketData['program_id'],
                'kegiatan_id'     => $paketData['kegiatan_id'],
                'sub_kegiatan_id' => $paketData['sub_kegiatan_id'],
                'nama_paket'      => sanitize($paketData['nama_paket']),
                'pagu_paket'      => floatval($paketData['pagu_paket']),
                'tahun_anggaran'  => sanitize($paketData['tahun_anggaran'] ?? '2026'),
                'status'          => sanitize($paketData['status'] ?? 'DRAFT'),
                'keterangan'      => sanitize($paketData['keterangan'] ?? '')
            ]);

            // 2. Clear existing items and re-insert
            $sqlDeleteItems = "DELETE FROM paket_pekerjaan_rekening WHERE paket_id = :paket_id";
            $this->execute($sqlDeleteItems, ['paket_id' => $id]);

            $sqlItem = "INSERT INTO paket_pekerjaan_rekening (paket_id, rekening_id, pagu_rekening) VALUES (:paket_id, :rekening_id, :pagu_rekening)";
            foreach ($rekeningItems as $item) {
                if (!empty($item['rekening_id']) && floatval($item['pagu_rekening']) > 0) {
                    $this->execute($sqlItem, [
                        'paket_id'      => $id,
                        'rekening_id'   => $item['rekening_id'],
                        'pagu_rekening' => floatval($item['pagu_rekening'])
                    ]);
                }
            }

            $this->commit();
            return true;

        } catch (Exception $e) {
            $this->rollBack();
            throw $e;
        }
    }

    /**
     * Hapus Paket Pekerjaan
     */
    public function deletePaket($id) {
        $sqlCheck = "SELECT COUNT(*) as total FROM realisasi WHERE paket_id = :id";
        $res = $this->fetch($sqlCheck, ['id' => $id]);
        if (intval($res['total'] ?? 0) > 0) {
            return false; // Ada transaksi realisasi
        }

        try {
            $this->beginTransaction();
            $this->execute("DELETE FROM paket_pekerjaan_rekening WHERE paket_id = :id", ['id' => $id]);
            $this->execute("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);
            $this->commit();
            return true;
        } catch (Exception $e) {
            $this->rollBack();
            return false;
        }
    }
}
