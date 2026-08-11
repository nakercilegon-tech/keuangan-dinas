<?php
/**
 * PembayaranModel - Model Transaksi Pembayaran & Perhitungan Pajak (Tahap 6)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseModel.php';

class PembayaranModel extends BaseModel {

    protected $table = 'pembayaran';

    /**
     * Generate Nomor Transaksi Otomatis
     * Format: TRX-2026-08-001
     */
    public function generateNomorTransaksi($tahun = '2026') {
        $bulan = date('m');
        $prefix = "TRX-{$tahun}-{$bulan}-";
        $sql = "SELECT nomor_transaksi FROM {$this->table} WHERE nomor_transaksi LIKE :prefix ORDER BY id DESC LIMIT 1";
        $latest = $this->fetch($sql, ['prefix' => $prefix . '%']);

        if ($latest && !empty($latest['nomor_transaksi'])) {
            $parts = explode('-', $latest['nomor_transaksi']);
            $lastNum = intval(end($parts));
            $nextNum = str_pad($lastNum + 1, 3, '0', STR_PAD_LEFT);
        } else {
            $nextNum = '001';
        }

        return $prefix . $nextNum;
    }

    /**
     * Cek Duplikasi Nomor Transaksi
     */
    public function isNomorTransaksiExists($nomorTransaksi, $excludeId = null) {
        $sql = "SELECT COUNT(*) as total FROM {$this->table} WHERE nomor_transaksi = :nomor_transaksi";
        $params = ['nomor_transaksi' => $nomorTransaksi];

        if ($excludeId) {
            $sql .= " AND id != :excludeId";
            $params['excludeId'] = $excludeId;
        }

        $res = $this->fetch($sql, $params);
        return intval($res['total'] ?? 0) > 0;
    }

    /**
     * Dapatkan Semua Daftar Pembayaran
     */
    public function getAllPembayaran($search = '', $limit = 50, $offset = 0) {
        $sql = "SELECT pb.*, 
                       pj.ppn, pj.pph21, pj.pph22, pj.pph23_jasa, pj.pph23_makan, pj.total_pajak, pj.nilai_bersih,
                       r.nomor_sp, r.nilai_kontrak, r.tanggal_sp, r.nomor_bapsthp, r.nomor_bapb, r.tanggal_ba, r.nomor_ba,
                       pk.nomor_paket, pk.nama_paket, pk.pagu_paket,
                       py.nama_perusahaan, py.nama_penyedia, py.nama_bank, py.nomor_rekening, py.pemegang_rekening, py.npwp,
                       p.kode_program, p.nama_program,
                       sk.kode_sub_kegiatan, sk.nama_sub_kegiatan
                FROM {$this->table} pb
                JOIN pajak pj ON pb.id = pj.pembayaran_id
                JOIN realisasi r ON pb.realisasi_id = r.id
                JOIN paket_pekerjaan pk ON r.paket_id = pk.id
                JOIN penyedia py ON r.penyedia_id = py.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                JOIN kegiatan k ON sk.kegiatan_id = k.id
                JOIN program p ON k.program_id = p.id
                WHERE 1=1";

        $params = [];

        if (!empty($search)) {
            $sql .= " AND (pb.nomor_transaksi LIKE :search 
                        OR r.nomor_sp LIKE :search 
                        OR pk.nama_paket LIKE :search 
                        OR py.nama_perusahaan LIKE :search)";
            $params['search'] = '%' . $search . '%';
        }

        $sql .= " ORDER BY pb.created_at DESC LIMIT {$limit} OFFSET {$offset}";

        return $this->fetchAll($sql, $params);
    }

    /**
     * Dapatkan Detail Pembayaran Beserta Rincian Pajak & Realisasi
     */
    public function getPembayaranDetail($id) {
        $sql = "SELECT pb.*, 
                       pj.id as pajak_id, pj.ppn, pj.pph21, pj.pph22, pj.pph23_jasa, pj.pph23_makan, pj.total_pajak, pj.nilai_bersih,
                       r.id as realisasi_id, r.nomor_sp, r.nilai_kontrak, r.tanggal_sp, r.nomor_bapsthp, r.nomor_bapb, r.tanggal_ba, r.nomor_ba,
                       pk.id as paket_id, pk.nomor_paket, pk.nama_paket, pk.pagu_paket, pk.tahun_anggaran,
                       py.id as penyedia_id, py.nama_perusahaan, py.nama_penyedia, py.alamat as alamat_penyedia,
                       py.npwp, py.nama_bank, py.nomor_rekening, py.pemegang_rekening,
                       p.kode_program, p.nama_program,
                       k.kode_kegiatan, k.nama_kegiatan,
                       sk.kode_sub_kegiatan, sk.nama_sub_kegiatan
                FROM {$this->table} pb
                JOIN pajak pj ON pb.id = pj.pembayaran_id
                JOIN realisasi r ON pb.realisasi_id = r.id
                JOIN paket_pekerjaan pk ON r.paket_id = pk.id
                JOIN penyedia py ON r.penyedia_id = py.id
                JOIN sub_kegiatan sk ON pk.sub_kegiatan_id = sk.id
                JOIN kegiatan k ON sk.kegiatan_id = k.id
                JOIN program p ON k.program_id = p.id
                WHERE pb.id = :id";

        $pembayaran = $this->fetch($sql, ['id' => $id]);

        if ($pembayaran) {
            // Dapatkan DPP (Dasar Pengenaan Pajak)
            $pembayaran['dpp'] = round($pembayaran['nilai_pembayaran'] / 1.11, 2);

            // Dapatkan Histori Pembayaran Lainnya untuk Realisasi yang sama
            $sqlHistori = "SELECT pb2.id, pb2.nomor_transaksi, pb2.pembayaran_ke, pb2.tanggal_pembayaran, pb2.nilai_pembayaran, pj2.nilai_bersih
                           FROM pembayaran pb2
                           JOIN pajak pj2 ON pb2.id = pj2.pembayaran_id
                           WHERE pb2.realisasi_id = :realisasi_id
                           ORDER BY pb2.pembayaran_ke ASC";
            $pembayaran['histori_termin'] = $this->fetchAll($sqlHistori, ['realisasi_id' => $pembayaran['realisasi_id']]);
        }

        return $pembayaran;
    }

    /**
     * Dapatkan Histori Pembayaran Berdasarkan Realisasi ID
     */
    public function getPembayaranByRealisasi($realisasiId) {
        $sql = "SELECT pb.*, pj.ppn, pj.pph21, pj.pph22, pj.pph23_jasa, pj.pph23_makan, pj.total_pajak, pj.nilai_bersih
                FROM {$this->table} pb
                JOIN pajak pj ON pb.id = pj.pembayaran_id
                WHERE pb.realisasi_id = :realisasi_id
                ORDER BY pb.pembayaran_ke ASC, pb.tanggal_pembayaran ASC";
        return $this->fetchAll($sql, ['realisasi_id' => $realisasiId]);
    }

    /**
     * PERHITUNGAN RUMUS PAJAK RESMI KEUANGAN DINAS (PHP SERVER-SIDE)
     * 
     * PPN        = (NILAI PEMBAYARAN / 1,11) * 11%
     * PPH21      = MANUAL
     * PPH22      = (NILAI PEMBAYARAN / 1,11) * 1.5%
     * PPH23 JASA = (NILAI PEMBAYARAN / 1,11) * 2%
     * PPH23 MAKAN= NILAI PEMBAYARAN * 2%
     * TOTAL PAJAK= PPN + PPH21 + PPH22 + PPH23 JASA + PPH23 MAKAN
     * NILAI BERSIH= NILAI PEMBAYARAN - TOTAL PAJAK
     */
    public function calculatePajak($nilaiPembayaran, $options = []) {
        $nilai = floatval($nilaiPembayaran);
        if ($nilai <= 0) {
            return [
                'dpp' => 0,
                'ppn' => 0,
                'pph21' => 0,
                'pph22' => 0,
                'pph23_jasa' => 0,
                'pph23_makan' => 0,
                'total_pajak' => 0,
                'nilai_bersih' => 0
            ];
        }

        $dpp = round($nilai / 1.11, 2);

        $isPpn = !empty($options['is_ppn']);
        $isPph22 = !empty($options['is_pph22']);
        $isPph23Jasa = !empty($options['is_pph23_jasa']);
        $isPph23Makan = !empty($options['is_pph23_makan']);
        $pph21Manual = floatval($options['pph21'] ?? 0);

        $ppn = $isPpn ? round(($nilai / 1.11) * 0.11, 2) : 0.00;
        $pph21 = $pph21Manual > 0 ? $pph21Manual : 0.00;
        $pph22 = $isPph22 ? round(($nilai / 1.11) * 0.015, 2) : 0.00;
        $pph23Jasa = $isPph23Jasa ? round(($nilai / 1.11) * 0.02, 2) : 0.00;
        $pph23Makan = $isPph23Makan ? round($nilai * 0.02, 2) : 0.00;

        $totalPajak = round($ppn + $pph21 + $pph22 + $pph23Jasa + $pph23Makan, 2);
        $nilaiBersih = round($nilai - $totalPajak, 2);

        return [
            'dpp' => $dpp,
            'ppn' => $ppn,
            'pph21' => $pph21,
            'pph22' => $pph22,
            'pph23_jasa' => $pph23Jasa,
            'pph23_makan' => $pph23Makan,
            'total_pajak' => $totalPajak,
            'nilai_bersih' => $nilaiBersih
        ];
    }

    /**
     * PROSES INPUT PEMBAYARAN DAN PERHITUNGAN PAJAK (DATABASE TRANSACTION)
     * Validasi Keuangan:
     * 1. Nilai pembayaran > 0
     * 2. Realisasi valid dan aktif
     * 3. Total pembayaran <= Nilai Kontrak Realisasi
     * 4. Auto-increment pembayaran_ke (Termin 1, Termin 2, dst)
     * 5. Simpan ke tabel pembayaran & pajak
     * 6. Audit logs
     */
    public function createPembayaran($data, $taxOptions = [], $userId = null) {
        $realisasiId = intval($data['realisasi_id'] ?? 0);
        $nilaiPembayaran = floatval($data['nilai_pembayaran'] ?? 0);

        // Validasi 1: Nilai Pembayaran > 0
        if ($nilaiPembayaran <= 0) {
            throw new Exception("Validasi Keuangan Gagal: Nilai pembayaran harus lebih besar dari Rp 0!");
        }

        // Ambil data Realisasi
        $sqlRealisasi = "SELECT r.*, pk.pagu_paket, 
                                (SELECT COALESCE(SUM(pb.nilai_pembayaran), 0) FROM pembayaran pb WHERE pb.realisasi_id = r.id) as total_terbayar,
                                (SELECT COUNT(*) FROM pembayaran pb WHERE pb.realisasi_id = r.id) as last_termin
                         FROM realisasi r
                         JOIN paket_pekerjaan pk ON r.paket_id = pk.id
                         WHERE r.id = :id";
        $realisasi = $this->fetch($sqlRealisasi, ['id' => $realisasiId]);

        if (!$realisasi) {
            throw new Exception("Data Realisasi Pekerjaan (SP) tidak ditemukan!");
        }

        $nilaiKontrak = floatval($realisasi['nilai_kontrak']);
        $totalTerbayar = floatval($realisasi['total_terbayar']);
        $sisaKontrak = $nilaiKontrak - $totalTerbayar;

        // Validasi 2: Nilai Pembayaran <= Sisa Kontrak
        if ($nilaiPembayaran > $sisaKontrak) {
            throw new Exception("Validasi Keuangan Gagal: Nilai Pembayaran (Rp " . number_format($nilaiPembayaran, 0, ',', '.') . ") melebihi Sisa Kontrak Pekerjaan (Rp " . number_format($sisaKontrak, 0, ',', '.') . ")!");
        }

        // Cek Duplikasi Nomor Transaksi
        $nomorTransaksi = trim($data['nomor_transaksi'] ?? '');
        if (empty($nomorTransaksi)) {
            $nomorTransaksi = $this->generateNomorTransaksi();
        } else if ($this->isNomorTransaksiExists($nomorTransaksi)) {
            throw new Exception("Validasi Gagal: Nomor Transaksi '{$nomorTransaksi}' sudah terdaftar dalam sistem!");
        }

        $pembayaranKe = intval($realisasi['last_termin'] ?? 0) + 1;
        $tanggalPembayaran = $data['tanggal_pembayaran'] ?? date('Y-m-d');
        $keterangan = trim($data['keterangan'] ?? "Pembayaran Termin {$pembayaranKe}");

        // Hitung Pajak di Server PHP
        $calcPajak = $this->calculatePajak($nilaiPembayaran, $taxOptions);

        // MULAI DATABASE TRANSACTION
        $db = $this->getDb();
        $db->beginTransaction();

        try {
            // 1. Simpan Pembayaran
            $sqlInsertPb = "INSERT INTO {$this->table} 
                            (realisasi_id, nomor_transaksi, tanggal_pembayaran, nilai_pembayaran, pembayaran_ke, keterangan)
                            VALUES (:realisasi_id, :nomor_transaksi, :tanggal_pembayaran, :nilai_pembayaran, :pembayaran_ke, :keterangan)";
            
            $stmtPb = $db->prepare($sqlInsertPb);
            $stmtPb->execute([
                'realisasi_id' => $realisasiId,
                'nomor_transaksi' => $nomorTransaksi,
                'tanggal_pembayaran' => $tanggalPembayaran,
                'nilai_pembayaran' => $nilaiPembayaran,
                'pembayaran_ke' => $pembayaranKe,
                'keterangan' => $keterangan
            ]);

            $pembayaranId = $db->lastInsertId();

            // 2. Simpan Rincian Pajak
            $sqlInsertPajak = "INSERT INTO pajak 
                               (pembayaran_id, ppn, pph21, pph22, pph23_jasa, pph23_makan, total_pajak, nilai_bersih)
                               VALUES (:pembayaran_id, :ppn, :pph21, :pph22, :pph23_jasa, :pph23_makan, :total_pajak, :nilai_bersih)";
            
            $stmtPajak = $db->prepare($sqlInsertPajak);
            $stmtPajak->execute([
                'pembayaran_id' => $pembayaranId,
                'ppn' => $calcPajak['ppn'],
                'pph21' => $calcPajak['pph21'],
                'pph22' => $calcPajak['pph22'],
                'pph23_jasa' => $calcPajak['pph23_jasa'],
                'pph23_makan' => $calcPajak['pph23_makan'],
                'total_pajak' => $calcPajak['total_pajak'],
                'nilai_bersih' => $calcPajak['nilai_bersih']
            ]);

            // 3. Update Status Realisasi jika Sisa Kontrak = 0 (Lunas)
            $totalTerbayarBaru = $totalTerbayar + $nilaiPembayaran;
            if ($totalTerbayarBaru >= $nilaiKontrak) {
                $sqlUpdateReal = "UPDATE realisasi SET status = 'selesai' WHERE id = :id";
                $stmtUpdate = $db->prepare($sqlUpdateReal);
                $stmtUpdate->execute(['id' => $realisasiId]);
            } else {
                $sqlUpdateReal = "UPDATE realisasi SET status = 'proses' WHERE id = :id";
                $stmtUpdate = $db->prepare($sqlUpdateReal);
                $stmtUpdate->execute(['id' => $realisasiId]);
            }

            // 4. Update BA Info on Realisasi if provided
            if (!empty($data['nomor_bapsthp']) || !empty($data['nomor_bapb'])) {
                $sqlBa = "UPDATE realisasi SET 
                          nomor_bapsthp = COALESCE(:nomor_bapsthp, nomor_bapsthp),
                          nomor_bapb = COALESCE(:nomor_bapb, nomor_bapb),
                          tanggal_ba = COALESCE(:tanggal_ba, tanggal_ba),
                          nomor_ba = COALESCE(:nomor_ba, nomor_ba)
                          WHERE id = :id";
                $stmtBa = $db->prepare($sqlBa);
                $stmtBa->execute([
                    'nomor_bapsthp' => !empty($data['nomor_bapsthp']) ? $data['nomor_bapsthp'] : null,
                    'nomor_bapb' => !empty($data['nomor_bapb']) ? $data['nomor_bapb'] : null,
                    'tanggal_ba' => !empty($data['tanggal_ba']) ? $data['tanggal_ba'] : null,
                    'nomor_ba' => !empty($data['nomor_ba']) ? $data['nomor_ba'] : null,
                    'id' => $realisasiId
                ]);
            }

            // 5. Catat Audit Log
            $sqlAudit = "INSERT INTO audit_logs (user_id, action, table_name, record_id, description, ip_address)
                         VALUES (:user_id, 'INSERT', 'pembayaran', :record_id, :description, :ip)";
            $stmtAudit = $db->prepare($sqlAudit);
            $stmtAudit->execute([
                'user_id' => $userId,
                'record_id' => $pembayaranId,
                'description' => "Input Pembayaran TRX {$nomorTransaksi} (Termin {$pembayaranKe}) sebesar Rp " . number_format($nilaiPembayaran, 0, ',', '.') . " dengan Total Pajak Rp " . number_format($calcPajak['total_pajak'], 0, ',', '.'),
                'ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
            ]);

            $db->commit();
            return [
                'success' => true,
                'pembayaran_id' => $pembayaranId,
                'nomor_transaksi' => $nomorTransaksi,
                'pembayaran_ke' => $pembayaranKe,
                'nilai_pembayaran' => $nilaiPembayaran,
                'total_pajak' => $calcPajak['total_pajak'],
                'nilai_bersih' => $calcPajak['nilai_bersih']
            ];

        } catch (Exception $e) {
            $db->rollBack();
            throw $e;
        }
    }
}
