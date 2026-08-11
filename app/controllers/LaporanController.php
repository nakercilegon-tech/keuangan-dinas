<?php
/**
 * LaporanController - Controller Laporan Realisasi Anggaran (Tahap 8)
 * SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS
 */

require_once __DIR__ . '/BaseController.php';
require_once __DIR__ . '/../models/LaporanModel.php';
require_once __DIR__ . '/../middlewares/AuthMiddleware.php';

class LaporanController extends BaseController {
    private $laporanModel;

    public function __construct() {
        AuthMiddleware::checkAuth();
        $this->laporanModel = new LaporanModel();
    }

    /**
     * Tampilkan Laporan Realisasi Anggaran
     */
    public function realisasi_anggaran() {
        $filters = [
            'tahun'           => $_GET['tahun'] ?? '2026',
            'periode'         => $_GET['periode'] ?? 'Tahun 2026',
            'tanggal_mulai'   => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir'   => $_GET['tanggal_akhir'] ?? '',
            'program_id'      => $_GET['program_id'] ?? '',
            'kegiatan_id'     => $_GET['kegiatan_id'] ?? '',
            'sub_kegiatan_id' => $_GET['sub_kegiatan_id'] ?? '',
            'rekening_id'     => $_GET['rekening_id'] ?? ''
        ];

        $listRealisasi = $this->laporanModel->getLaporanRealisasiAnggaran($filters);

        // Hitung Total Summary
        $totalPagu = 0;
        $totalRealisasi = 0;
        foreach ($listRealisasi as $row) {
            $totalPagu += $row['pagu'];
            $totalRealisasi += $row['realisasi'];
        }
        $totalSisa = $totalPagu - $totalRealisasi;
        $totalPersentase = $totalPagu > 0 ? round(($totalRealisasi / $totalPagu) * 100, 2) : 0;

        $data = [
            'page_title'       => 'Laporan Realisasi Anggaran (LRA) - SIMKEU UPTD',
            'active_menu'      => 'laporan_anggaran',
            'list_realisasi'   => $listRealisasi,
            'total_pagu'       => $totalPagu,
            'total_realisasi'  => $totalRealisasi,
            'total_sisa'       => $totalSisa,
            'total_persentase' => $totalPersentase,
            'filters'          => $filters,
            'header_instansi'  => [
                'pemkot'    => 'PEMERINTAH KOTA CILEGON',
                'dinas'     => 'DINAS TENAGA KERJA',
                'uptd'      => 'UPTD LATIHAN KERJA',
                'alamat'    => 'Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten',
                'tgl_cetak' => date('d F Y')
            ]
        ];

        $this->render('laporan/realisasi_anggaran', $data);
    }

    /**
     * Export Excel Laporan Realisasi Anggaran
     */
    public function export_excel() {
        $filters = [
            'tahun' => $_GET['tahun'] ?? '2026',
            'tanggal_mulai' => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir' => $_GET['tanggal_akhir'] ?? ''
        ];
        $data = $this->laporanModel->getLaporanRealisasiAnggaran($filters);

        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename="Laporan_Realisasi_Anggaran_2026.xls"');

        echo "PEMERINTAH KOTA CILEGON\nDINAS TENAGA KERJA - UPTD LATIHAN KERJA\nLAPORAN REALISASI ANGGARAN TAHUN 2026\n\n";
        echo "Kode Program\tProgram\tKode Kegiatan\tKegiatan\tKode Sub-Kegiatan\tSub-Kegiatan\tKode Rekening\tNama Rekening\tPagu\tRealisasi\tSisa\tPersentase (%)\n";

        foreach ($data as $r) {
            echo "{$r['kode_program']}\t{$r['nama_program']}\t{$r['kode_kegiatan']}\t{$r['nama_kegiatan']}\t{$r['kode_sub_kegiatan']}\t{$r['nama_sub_kegiatan']}\t{$r['kode_rekening']}\t{$r['nama_rekening']}\t{$r['pagu']}\t{$r['realisasi']}\t{$r['sisa']}\t{$r['persentase']}%\n";
        }
        exit;
    }

    /**
     * Export PDF (Landscape Format)
     */
    public function export_pdf() {
        // TCPDF / DomPDF Render Flow
        header('Content-Type: application/pdf');
        header('Content-Disposition: inline; filename="Laporan_Realisasi_Anggaran_UPTD.pdf"');
        echo "%PDF-1.4 Simulated PDF Document for Laporan Realisasi Anggaran Kota Cilegon";
        exit;
    }

    /**
     * A. Laporan Realisasi Pekerjaan (Tahap 9)
     */
    public function realisasi_pekerjaan() {
        $filters = [
            'tahun' => $_GET['tahun'] ?? '2026',
            'tanggal_mulai' => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir' => $_GET['tanggal_akhir'] ?? ''
        ];
        $listPekerjaan = $this->laporanModel->getLaporanRealisasiPekerjaan($filters);

        $data = [
            'page_title'     => 'Laporan Realisasi Pekerjaan - SIMKEU UPTD',
            'active_menu'    => 'laporan_pekerjaan',
            'list_pekerjaan' => $listPekerjaan,
            'filters'        => $filters
        ];

        $this->render('laporan/realisasi_pekerjaan', $data);
    }

    /**
     * B. Laporan Pembayaran (Tahap 9)
     */
    public function pembayaran() {
        $filters = [
            'tahun' => $_GET['tahun'] ?? '2026',
            'tanggal_mulai' => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir' => $_GET['tanggal_akhir'] ?? ''
        ];
        $listPembayaran = $this->laporanModel->getLaporanPembayaran($filters);

        $data = [
            'page_title'      => 'Laporan Pembayaran SP2D - SIMKEU UPTD',
            'active_menu'     => 'laporan_pembayaran',
            'list_pembayaran' => $listPembayaran,
            'filters'         => $filters
        ];

        $this->render('laporan/pembayaran', $data);
    }

    /**
     * C. Laporan Pajak (Tahap 9)
     */
    public function pajak() {
        $filters = [
            'tahun' => $_GET['tahun'] ?? '2026',
            'tanggal_mulai' => $_GET['tanggal_mulai'] ?? '',
            'tanggal_akhir' => $_GET['tanggal_akhir'] ?? ''
        ];
        $listPajak = $this->laporanModel->getLaporanPajak($filters);

        $data = [
            'page_title' => 'Laporan Pemotongan & Setoran Pajak - SIMKEU UPTD',
            'active_menu' => 'laporan_pajak',
            'list_pajak' => $listPajak,
            'filters'    => $filters
        ];

        $this->render('laporan/pajak', $data);
    }
}
