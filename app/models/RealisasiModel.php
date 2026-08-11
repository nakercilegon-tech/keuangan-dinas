<?php
/**
 * RealisasiModel - Model Transaksi Realisasi Pekerjaan & Multi-Rekening
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS (TAHAP 5)
 */

require_once __DIR__ . '/BaseModel.php';

class RealisasiModel extends BaseModel {

    protected $table = 'realisasi';

    /**
     * Generate Nomor Transaksi Realisasi Otomatis
     * Format: REAL/2026/00001
     */
    public function generateNomorRealisasi($tahun = '2026') {
        $prefix = "REAL/{$tahun}/";
        $sql = "SELECT nomor_sp FROM {$this->table} WHERE nomor_sp LIKE :prefix ORDER BY id DESC LIMIT 1";
        $latest = $this->fetch($sql, ['prefix' => $prefix . '%']);

        if ($latest && !empty($latest['nomor_sp'])) {
            $parts = explode('/', $latest['nomor_sp']);
            $lastNum = intval(end($parts));
            $nextNum = str_pad($lastNum + 1, 5, '0', STR_PAD_LEFT);
        } else {
            $nextNum = '00001';
        }

        return $prefix . $nextNum;
    }

    /**
     * Dapatkan Semua Daftar Realisasi Pekerjaan (Lengkap dengan Paket, Penyedia & Progress Pembayaran)
     */
    public function getAllRealisasi($status = null, $search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT r.*,
                       pk.nomor_paket, pk.nama_paket, pk.pagu_paket, pk.tahun_anggaran,
                       py.nama_perusahaan, py.nama_penyedia, py.alamat as alamat_penyedia, 
                       py.npwp, py.nama_bank, py.nomor_rekening, py.pemegang_rekening,
                       p.kode_program, p.nama_program,
                       k.kode_kegiatan, k.nama_kegiatan,
                       sk.kode_sub_kegiatan, sk.nama_sub_kegiatan,
                       (SELECT COALESCE(SUM(pb.nilai_pembayaran), 0) FROM pembayaran pb WHERE pb.realisasi_id = r.id) as total_terbayar,
                       (SELECT COUNT(*) FROM pembayaran pb WHERE pb.realisasi_id = r.id) as jumlah_termin,
                       (r.nilai_kontrak - (SELECT COALESCE(SUM(pb.nilai_pembayaran), 0) FROM pembayaran pb WHERE pb.realisasi_id = r.id)) as sisa_kontrak
                FROM {$this->table} r
                JOIN paket_pekerjaan pk ON r.paket_id = pk.id
                JOIN penyedia py ON r.penyedia_id = py.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                JOIN kegiatan k ON sk.kegiatan_id = k.id
                JOIN program p ON k.program_id = p.id
                WHERE 1=1";
        
        $params = [];

        if (!empty($status)) {
            $sql .= " AND r.status = :status";
            $params['status'] = $status;
        }

        if (!empty($search)) {
            $sql .= " AND (r.nomor_sp LIKE :search 
                        OR pk.nama_paket LIKE :search 
                        OR py.nama_perusahaan LIKE :search 
                        OR py.nama_penyedia LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY r.created_at DESC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Dapatkan Detail Realisasi Pekerjaan Beserta Multi-Rekening, Detail Penyedia & Histori Pembayaran
     */
    public function getRealisasiDetail($id) {
        $sql = "SELECT r.*,
                       pk.nomor_paket, pk.nama_paket, pk.pagu_paket, pk.tahun_anggaran, pk.status as status_paket,
                       py.nama_perusahaan, py.nama_penyedia, py.alamat as alamat_penyedia, 
                       py.npwp, py.nama_bank, py.nomor_rekening, py.pemegang_rekening,
                       p.id as program_id, p.kode_program, p.nama_program,
                       k.id as kegiatan_id, k.kode_kegiatan, k.nama_kegiatan,
                       sk.id as sub_kegiatan_id, sk.kode_sub_kegiatan, sk.nama_sub_kegiatan,
                       (SELECT COALESCE(SUM(pb.nilai_pembayaran), 0) FROM pembayaran pb WHERE pb.realisasi_id = r.id) as total_terbayar,
                       (r.nilai_kontrak - (SELECT COALESCE(SUM(pb.nilai_pembayaran), 0) FROM pembayaran pb WHERE pb.realisasi_id = r.id)) as sisa_kontrak
                FROM {$this->table} r
                JOIN paket_pekerjaan pk ON r.paket_id = pk.id
                JOIN penyedia py ON r.penyedia_id = py.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                JOIN kegiatan k ON sk.kegiatan_id = k.id
                JOIN program p ON k.program_id = p.id
                WHERE r.id = :id";
        
        $realisasi = $this->fetch($sql, ['id' => $id]);

        if ($realisasi) {
            // 1. Dapatkan Rincian Multi-Rekening Realisasi
            $sqlRekening = "SELECT rr.*, pkr.pagu_rekening, pkr.rekening_id,
                                   rb.kode_rekening, rb.nama_rekening, rb.jenis_belanja
                            FROM realisasi_rekening rr
                            JOIN paket_pekerjaan_rekening pkr ON rr.paket_rekening_id = pkr.id
                            JOIN rekening_belanja rb ON pkr.rekening_id = rb.id
                            WHERE rr.realisasi_id = :realisasi_id
                            ORDER BY rb.kode_rekening ASC";
            $realisasi['rekening_list'] = $this->fetchAll($sqlRekening, ['realisasi_id' => $id]);

            // 2. Dapatkan Histori Pembayaran & Tax Breakdown
            $sqlPembayaran = "SELECT pb.*, 
                                     pj.ppn, pj.pph21, pj.pph22, pj.pph23_jasa, pj.pph23_makan, pj.total_pajak, pj.nilai_bersih
                              FROM pembayaran pb
                              LEFT JOIN pajak pj ON pb.id = pj.pembayaran_id
                              WHERE pb.realisasi_id = :realisasi_id
                              ORDER BY pb.pembayaran_ke ASC, pb.tanggal_pembayaran ASC";
            $realisasi['pembayaran_list'] = $this->fetchAll($sqlPembayaran, ['realisasi_id' => $id]);
        }

        return $realisasi;
    }

    /**
     * Cek Duplikasi Nomor SP
     */
    public function isNomorSpExists($nomorSp, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE nomor_sp = :nomor_sp";
        $params = ['nomor_sp' => $nomorSp];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * SIMPAN TRANSAKSI REALISASI PEKERJAAN (DATABASE TRANSACTION)
     * Validasi Keuangan:
     * 1. Nilai Kontrak <= Pagu Paket
     * 2. Alokasi per Rekening <= Pagu Rekening Paket
     */
    public function createRealisasi($data, $rekeningItems, $userId = null) {
        // Fetch Header Paket untuk Validasi Pagu Paket
        $sqlPaket = "SELECT pagu_paket, nama_paket FROM paket_pekerjaan WHERE id = :paket_id";
        $paket = $this->fetch($sqlPaket, ['paket_id' => $data['paket_id']]);

        if (!$paket) {
            throw new Exception("Paket Pekerjaan tidak ditemukan!");
        }

        $nilaiKontrak = floatval($data['nilai_kontrak'] ?? 0);
        $paguPaket = floatval($paket['pagu_paket']);

        // Validasi 1: Nilai Kontrak <= Pagu Paket
        if ($nilaiKontrak > $paguPaket) {
            throw new Exception("Validasi Keuangan Gagal: Nilai Kontrak (Rp " . number_format($nilaiKontrak, 0, ',', '.') . ") melebihi Pagu Paket (Rp " . number_format($paguPaket, 0, ',', '.') . ")!");
        }

        if ($nilaiKontrak <= 0) {
            throw new Exception("Nilai Kontrak harus lebih besar dari Rp 0!");
        }

        // Cek Nomor SP unik
        if ($this->isNomorSpExists($data['nomor_sp'])) {
            throw new Exception("Nomor SP/Kontrak '{$data['nomor_sp']}' sudah digunakan dalam sistem!");
        }

        try {
            $this->beginTransaction();

            // 1. Insert Header Realisasi
            $sqlHeader = "INSERT INTO {$this->table} 
                          (paket_id, penyedia_id, nomor_sp, tanggal_sp, lama_pekerjaan, tanggal_mulai, tanggal_selesai, nilai_kontrak, nomor_bapsthp, nomor_bapb, tanggal_ba, nomor_ba, status, created_at) 
                          VALUES 
                          (:paket_id, :penyedia_id, :nomor_sp, :tanggal_sp, :lama_pekerjaan, :tanggal_mulai, :tanggal_selesai, :nilai_kontrak, :nomor_bapsthp, :nomor_bapb, :tanggal_ba, :nomor_ba, :status, NOW())";
            
            $this->execute($sqlHeader, [
                'paket_id'       => $data['paket_id'],
                'penyedia_id'    => $data['penyedia_id'],
                'nomor_sp'       => sanitize($data['nomor_sp']),
                'tanggal_sp'     => $data['tanggal_sp'],
                'lama_pekerjaan' => intval($data['lama_pekerjaan']),
                'tanggal_mulai'   => $data['tanggal_mulai'],
                'tanggal_selesai' => $data['tanggal_selesai'],
                'nilai_kontrak'  => $nilaiKontrak,
                'nomor_bapsthp'  => sanitize($data['nomor_bapsthp'] ?? ''),
                'nomor_bapb'     => sanitize($data['nomor_bapb'] ?? ''),
                'tanggal_ba'     => !empty($data['tanggal_ba']) ? $data['tanggal_ba'] : null,
                'nomor_ba'       => sanitize($data['nomor_ba'] ?? ''),
                'status'         => sanitize($data['status'] ?? 'proses')
            ]);

            $realisasiId = $this->lastInsertId();

            // 2. Insert Rincian Multi-Rekening Realisasi
            $sqlItem = "INSERT INTO realisasi_rekening (realisasi_id, paket_rekening_id, nilai_realisasi) VALUES (:realisasi_id, :paket_rekening_id, :nilai_realisasi)";
            
            $totalNilaiRekening = 0;
            foreach ($rekeningItems as $item) {
                $nilaiRealisasi = floatval($item['nilai_realisasi'] ?? 0);
                if (!empty($item['paket_rekening_id']) && $nilaiRealisasi > 0) {
                    
                    // Cek Pagu Rekening Paket
                    $sqlPkr = "SELECT pagu_rekening FROM paket_pekerjaan_rekening WHERE id = :pkr_id";
                    $pkr = $this->fetch($sqlPkr, ['pkr_id' => $item['paket_rekening_id']]);
                    if ($pkr && $nilaiRealisasi > floatval($pkr['pagu_rekening'])) {
                        throw new Exception("Nilai Alokasi Rekening (Rp " . number_format($nilaiRealisasi, 0, ',', '.') . ") melebihi Pagu Rekening (Rp " . number_format($pkr['pagu_rekening'], 0, ',', '.') . ")!");
                    }

                    $this->execute($sqlItem, [
                        'realisasi_id'      => $realisasiId,
                        'paket_rekening_id' => $item['paket_rekening_id'],
                        'nilai_realisasi'   => $nilaiRealisasi
                    ]);

                    $totalNilaiRekening += $nilaiRealisasi;
                }
            }

            // Update status paket_pekerjaan ke 'berjalan'
            $this->execute("UPDATE paket_pekerjaan SET status = 'berjalan' WHERE id = :paket_id", ['paket_id' => $data['paket_id']]);

            // Audit Log
            $this->logAudit($userId, 'CREATE_REALISASI', 'realisasi', $realisasiId, "Membuat Realisasi Pekerjaan Nomor SP: {$data['nomor_sp']} Nilai: Rp " . number_format($nilaiKontrak, 0, ',', '.'));

            $this->commit();
            return $realisasiId;

        } catch (Exception $e) {
            $this->rollBack();
            throw $e;
        }
    }

    /**
     * UPDATE TRANSAKSI REALISASI PEKERJAAN
     */
    public function updateRealisasi($id, $data, $rekeningItems, $userId = null) {
        $sqlPaket = "SELECT pagu_paket FROM paket_pekerjaan WHERE id = :paket_id";
        $paket = $this->fetch($sqlPaket, ['paket_id' => $data['paket_id']]);

        $nilaiKontrak = floatval($data['nilai_kontrak'] ?? 0);
        $paguPaket = floatval($paket['pagu_paket'] ?? 0);

        if ($nilaiKontrak > $paguPaket) {
            throw new Exception("Nilai Kontrak (Rp " . number_format($nilaiKontrak, 0, ',', '.') . ") melebihi Pagu Paket!");
        }

        if ($this->isNomorSpExists($data['nomor_sp'], $id)) {
            throw new Exception("Nomor SP/Kontrak '{$data['nomor_sp']}' sudah digunakan oleh transaksi lain!");
        }

        try {
            $this->beginTransaction();

            $sqlUpdate = "UPDATE {$this->table} SET 
                          paket_id = :paket_id,
                          penyedia_id = :penyedia_id,
                          nomor_sp = :nomor_sp,
                          tanggal_sp = :tanggal_sp,
                          lama_pekerjaan = :lama_pekerjaan,
                          tanggal_mulai = :tanggal_mulai,
                          tanggal_selesai = :tanggal_selesai,
                          nilai_kontrak = :nilai_kontrak,
                          nomor_bapsthp = :nomor_bapsthp,
                          nomor_bapb = :nomor_bapb,
                          tanggal_ba = :tanggal_ba,
                          nomor_ba = :nomor_ba,
                          status = :status,
                          updated_at = NOW()
                          WHERE id = :id";
            
            $this->execute($sqlUpdate, [
                'id'             => $id,
                'paket_id'       => $data['paket_id'],
                'penyedia_id'    => $data['penyedia_id'],
                'nomor_sp'       => sanitize($data['nomor_sp']),
                'tanggal_sp'     => $data['tanggal_sp'],
                'lama_pekerjaan' => intval($data['lama_pekerjaan']),
                'tanggal_mulai'   => $data['tanggal_mulai'],
                'tanggal_selesai' => $data['tanggal_selesai'],
                'nilai_kontrak'  => $nilaiKontrak,
                'nomor_bapsthp'  => sanitize($data['nomor_bapsthp'] ?? ''),
                'nomor_bapb'     => sanitize($data['nomor_bapb'] ?? ''),
                'tanggal_ba'     => !empty($data['tanggal_ba']) ? $data['tanggal_ba'] : null,
                'nomor_ba'       => sanitize($data['nomor_ba'] ?? ''),
                'status'         => sanitize($data['status'] ?? 'proses')
            ]);

            // Re-insert multi-rekening
            $this->execute("DELETE FROM realisasi_rekening WHERE realisasi_id = :id", ['id' => $id]);

            $sqlItem = "INSERT INTO realisasi_rekening (realisasi_id, paket_rekening_id, nilai_realisasi) VALUES (:realisasi_id, :paket_rekening_id, :nilai_realisasi)";
            foreach ($rekeningItems as $item) {
                $nilaiRealisasi = floatval($item['nilai_realisasi'] ?? 0);
                if (!empty($item['paket_rekening_id']) && $nilaiRealisasi > 0) {
                    $this->execute($sqlItem, [
                        'realisasi_id'      => $id,
                        'paket_rekening_id' => $item['paket_rekening_id'],
                        'nilai_realisasi'   => $nilaiRealisasi
                    ]);
                }
            }

            $this->logAudit($userId, 'UPDATE_REALISASI', 'realisasi', $id, "Mengubah Realisasi Pekerjaan Nomor SP: {$data['nomor_sp']}");

            $this->commit();
            return true;

        } catch (Exception $e) {
            $this->rollBack();
            throw $e;
        }
    }

    /**
     * HAPUS REALISASI PEKERJAAN
     */
    public function deleteRealisasi($id, $userId = null) {
        $sqlCheck = "SELECT COUNT(*) as total FROM pembayaran WHERE realisasi_id = :id";
        $res = $this->fetch($sqlCheck, ['id' => $id]);
        if (intval($res['total'] ?? 0) > 0) {
            throw new Exception("Gagal Hapus: Transaksi realisasi ini sudah memiliki data pencairan/pembayaran!");
        }

        try {
            $this->beginTransaction();

            $realisasi = $this->fetch("SELECT nomor_sp FROM {$this->table} WHERE id = :id", ['id' => $id]);

            $this->execute("DELETE FROM realisasi_rekening WHERE realisasi_id = :id", ['id' => $id]);
            $this->execute("DELETE FROM {$this->table} WHERE id = :id", ['id' => $id]);

            $this->logAudit($userId, 'DELETE_REALISASI', 'realisasi', $id, "Menghapus Realisasi Pekerjaan Nomor SP: " . ($realisasi['nomor_sp'] ?? $id));

            $this->commit();
            return true;
        } catch (Exception $e) {
            $this->rollBack();
            throw $e;
        }
    }

    /**
     * Helper Log Audit
     */
    private function logAudit($userId, $action, $table, $recordId, $description) {
        try {
            $sql = "INSERT INTO audit_logs (user_id, action, table_name, record_id, description, ip_address, created_at) 
                    VALUES (:user_id, :action, :table_name, :record_id, :description, :ip, NOW())";
            $this->execute($sql, [
                'user_id'     => $userId,
                'action'      => $action,
                'table_name'  => $table,
                'record_id'   => $recordId,
                'description' => $description,
                'ip'          => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
            ]);
        } catch (Exception $e) {
            // Silence audit errors to prevent breaking main transaction
        }
    }
}
