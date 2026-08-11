<?php
/**
 * View: Kuitansi & Detail Rincian Pemotongan Pajak (Tahap 6)
 */
?>
<div class="container py-4">
    <div class="d-flex justify-content-between align-items-center mb-4 print-hide">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-receipt text-primary me-2"></i>Kuitansi Pembayaran & Rincian Pajak
            </h3>
            <p class="text-muted small mb-0">
                Bukti transaksi pembayaran pencairan anggaran dan potongan pajak resmi.
            </p>
        </div>
        <div class="d-flex gap-2">
            <button onclick="window.print()" class="btn btn-outline-dark">
                <i class="bi bi-printer me-1"></i> Cetak Kuitansi
            </button>
            <a href="/pembayaran" class="btn btn-secondary">
                <i class="bi bi-arrow-left me-1"></i> Kembali
            </a>
        </div>
    </div>

    <!-- Alert Flash Message -->
    <?php if (isset($_SESSION['flash'])): ?>
        <div class="alert alert-<?= $_SESSION['flash']['type'] ?> alert-dismissible fade show shadow-sm print-hide" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i> <?= $_SESSION['flash']['message'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash']); ?>
    <?php endif; ?>

    <!-- Printable Receipt Card -->
    <div class="card border-0 shadow-lg p-4 bg-white" id="printableReceipt">
        <!-- Header Instansi -->
        <div class="text-center border-bottom pb-3 mb-4">
            <h5 class="fw-bold text-uppercase tracking-wide mb-1">PEMERINTAH PROVINSI BANTEN</h5>
            <h4 class="fw-bold text-uppercase text-indigo mb-1">DINAS TENAGA KERJA DAN TRANSMIGRASI</h4>
            <h6 class="fw-semibold text-secondary mb-0">UPTD PELATIHAN KERJA DANA ALOKASI APBD TAHUN 2026</h6>
            <p class="small text-muted mb-0">Jl. Jenderal Sudirman No. 45, Cilegon, Banten • Telp. (0254) 391234</p>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <span class="badge bg-dark fs-6 px-3 py-2">
                NOMOR TRANSAKSI: <?= htmlspecialchars($pembayaran['nomor_transaksi']) ?>
            </span>
            <span class="text-muted fw-semibold">
                Tanggal Transaksi: <?= date('d F Y', strtotime($pembayaran['tanggal_pembayaran'])) ?>
            </span>
        </div>

        <!-- Detail Kontrak & Penyedia Grid -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border">
                    <h6 class="fw-bold text-dark border-bottom pb-2 mb-2"><i class="bi bi-file-earmark-text me-1"></i> Data Pekerjaan / SP</h6>
                    <table class="table table-sm table-borderless mb-0 text-secondary small">
                        <tr>
                            <td style="width: 130px;">Paket Pekerjaan</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['nama_paket']) ?></td>
                        </tr>
                        <tr>
                            <td>Nomor SP/Kontrak</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['nomor_sp']) ?></td>
                        </tr>
                        <tr>
                            <td>Nilai Kontrak</td>
                            <td class="fw-bold text-dark">: Rp <?= number_format($pembayaran['nilai_kontrak'], 0, ',', '.') ?></td>
                        </tr>
                        <tr>
                            <td>Pembayaran Ke</td>
                            <td class="fw-bold text-primary">: Termin <?= $pembayaran['pembayaran_ke'] ?></td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="col-md-6">
                <div class="p-3 bg-light rounded-3 border">
                    <h6 class="fw-bold text-dark border-bottom pb-2 mb-2"><i class="bi bi-building me-1"></i> Data Rekening Penyedia / Penyedia</h6>
                    <table class="table table-sm table-borderless mb-0 text-secondary small">
                        <tr>
                            <td style="width: 130px;">Nama Perusahaan</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['nama_perusahaan']) ?></td>
                        </tr>
                        <tr>
                            <td>NPWP</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['npwp']) ?></td>
                        </tr>
                        <tr>
                            <td>Bank / No. Rek</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['nama_bank']) ?> - <?= htmlspecialchars($pembayaran['nomor_rekening']) ?></td>
                        </tr>
                        <tr>
                            <td>Atas Nama</td>
                            <td class="fw-bold text-dark">: <?= htmlspecialchars($pembayaran['pemegang_rekening']) ?></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Rincian Pembayaran & Taxes Table -->
        <div class="table-responsive mb-4">
            <table class="table table-bordered border-dark align-middle">
                <thead class="bg-light text-center fw-bold">
                    <tr>
                        <th>Uraian Transaksi</th>
                        <th style="width: 250px;">Komponen Hitungan</th>
                        <th style="width: 220px;" class="text-end">Jumlah (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="fw-bold">
                            NILAI PEMBAYARAN BRUTO
                            <div class="text-muted small fw-normal"><?= htmlspecialchars($pembayaran['keterangan']) ?></div>
                        </td>
                        <td class="text-center font-monospace small">NILAI_PEMBAYARAN</td>
                        <td class="text-end fw-bold fs-6 text-dark">
                            Rp <?= number_format($pembayaran['nilai_pembayaran'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr>
                        <td>Dasar Pengenaan Pajak (DPP)</td>
                        <td class="text-center font-monospace small">Nilai / 1,11</td>
                        <td class="text-end text-muted">
                            Rp <?= number_format($pembayaran['dpp'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr class="table-danger-subtle">
                        <td colspan="3" class="fw-bold text-danger text-uppercase small">
                            <i class="bi bi-scissors me-1"></i> RINCIAN PEMOTONGAN PAJAK (TAX DEDUCTION)
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">1. Pajak Pertambahan Nilai (PPN 11%)</td>
                        <td class="text-center font-monospace small">(Nilai / 1,11) × 11%</td>
                        <td class="text-end text-danger fw-semibold">
                            Rp <?= number_format($pembayaran['ppn'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">2. PPh Pasal 21 (Honorarium / Tenaga Ahli)</td>
                        <td class="text-center font-monospace small">MANUAL</td>
                        <td class="text-end text-danger fw-semibold">
                            Rp <?= number_format($pembayaran['pph21'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">3. PPh Pasal 22 (Pengadaan Barang / Komputer 1.5%)</td>
                        <td class="text-center font-monospace small">(Nilai / 1,11) × 1,5%</td>
                        <td class="text-end text-danger fw-semibold">
                            Rp <?= number_format($pembayaran['pph22'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">4. PPh Pasal 23 Jasa (Jasa / Pemeliharaan 2%)</td>
                        <td class="text-center font-monospace small">(Nilai / 1,11) × 2%</td>
                        <td class="text-end text-danger fw-semibold">
                            Rp <?= number_format($pembayaran['pph23_jasa'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr>
                        <td class="ps-4">5. PPh Pasal 23 Makan (Konsumsi Rapat / Katering 2%)</td>
                        <td class="text-center font-monospace small">Nilai × 2%</td>
                        <td class="text-end text-danger fw-semibold">
                            Rp <?= number_format($pembayaran['pph23_makan'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr class="fw-bold bg-light">
                        <td colspan="2" class="text-end text-uppercase">TOTAL POTONGAN PAJAK:</td>
                        <td class="text-end text-danger fs-6">
                            Rp <?= number_format($pembayaran['total_pajak'], 0, ',', '.') ?>
                        </td>
                    </tr>
                    <tr class="table-success fw-bold">
                        <td colspan="2" class="text-end text-uppercase text-success fs-6">NILAI BERSIH DIBAYARKAN (NETTO):</td>
                        <td class="text-end text-success fs-5">
                            Rp <?= number_format($pembayaran['nilai_bersih'], 0, ',', '.') ?>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Document Signatures Footer -->
        <div class="row text-center mt-5 pt-3">
            <div class="col-6">
                <p class="small text-muted mb-1">Setuju Dibayar,</p>
                <p class="fw-bold mb-5">Kuasa Pengguna Anggaran / Pejabat</p>
                <p class="fw-bold text-decoration-underline mb-0">Drs. H. Hendra Wijaya, M.Si.</p>
                <p class="small text-muted mb-0">NIP. 19750812 199803 1 002</p>
            </div>
            <div class="col-6">
                <p class="small text-muted mb-1">Cilegon, <?= date('d F Y', strtotime($pembayaran['tanggal_pembayaran'])) ?></p>
                <p class="fw-bold mb-5">Bendahara Pengeluaran UPTD</p>
                <p class="fw-bold text-decoration-underline mb-0">Siti Rahmawati, A.Md.</p>
                <p class="small text-muted mb-0">NIP. 19880415 201101 2 005</p>
            </div>
        </div>
    </div>
</div>

<style>
@media print {
    .print-hide { display: none !important; }
    body { background-color: white !important; }
    #printableReceipt { border: none !important; box-shadow: none !important; }
}
</style>
