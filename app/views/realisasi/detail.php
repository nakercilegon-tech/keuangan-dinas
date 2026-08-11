<!-- /app/views/realisasi/detail.php -->
<!-- Halaman Detail Rincian Realisasi Pekerjaan & Histori Pembayaran (Tahap 5) -->

<?php $r = $data['realisasi']; ?>

<div class="container-fluid px-4 py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
            <h4 class="fw-bold mb-1">
                <i class="bi bi-file-earmark-text me-2"></i>Detail Transaksi Realisasi Pekerjaan
            </h4>
            <p class="text-muted small mb-0">Nomor SP: <strong class="text-primary font-monospace"><?= htmlspecialchars($r['nomor_sp']) ?></strong></p>
        </div>
        <div>
            <a href="/realisasi" class="btn btn-outline-secondary btn-sm rounded-pill px-3 me-2">
                <i class="bi bi-arrow-left me-1"></i> Kembali
            </a>
            <button onclick="window.print()" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
                <i class="bi bi-printer me-1"></i> Cetak Detail Transaksi
            </button>
        </div>
    </div>

    <!-- Summary Cards Row -->
    <div class="row g-3 mb-4">
        <div class="col-md-3">
            <div class="card border-0 shadow-sm bg-primary text-white p-3">
                <small class="text-white-50 text-uppercase fw-bold">Nilai Kontrak Pekerjaan</small>
                <div class="fs-4 fw-bold mt-1">Rp <?= number_format($r['nilai_kontrak'], 0, ',', '.') ?></div>
                <small class="text-white-50 mt-1">Pagu Paket: Rp <?= number_format($r['pagu_paket'], 0, ',', '.') ?></small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm bg-success text-white p-3">
                <small class="text-white-50 text-uppercase fw-bold">Total Pencairan Terbayar</small>
                <div class="fs-4 fw-bold mt-1">Rp <?= number_format($r['total_terbayar'], 0, ',', '.') ?></div>
                <small class="text-white-50 mt-1"><?= count($r['pembayaran_list']) ?> Termin Pembayaran</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm bg-warning text-dark p-3">
                <small class="text-dark-50 text-uppercase fw-bold">Sisa Nilai Kontrak</small>
                <div class="fs-4 fw-bold mt-1">Rp <?= number_format($r['sisa_kontrak'], 0, ',', '.') ?></div>
                <small class="text-dark-50 mt-1">Sisa yang belum dicairkan</small>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card border-0 shadow-sm bg-dark text-white p-3">
                <small class="text-white-50 text-uppercase fw-bold">Status Transaksi</small>
                <div class="fs-4 fw-bold mt-1 text-capitalize"><?= htmlspecialchars($r['status']) ?></div>
                <small class="text-white-50 mt-1">Tahun Anggaran <?= htmlspecialchars($r['tahun_anggaran']) ?></small>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <!-- Main Left Column -->
        <div class="col-lg-8">
            <!-- 1. HIERARKI PROGRAM, KEGIATAN & PAKET PEKERJAAN -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light py-2 fw-semibold text-dark">
                    <i class="bi bi-diagram-3 me-2"></i>Hierarki Program, Kegiatan & Paket Pekerjaan
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-md-12">
                            <small class="text-muted d-block">Program Anggaran:</small>
                            <span class="badge bg-primary font-monospace me-1"><?= htmlspecialchars($r['kode_program']) ?></span>
                            <strong class="text-dark"><?= htmlspecialchars($r['nama_program']) ?></strong>
                        </div>
                        <div class="col-md-12">
                            <small class="text-muted d-block">Kegiatan Anggaran:</small>
                            <span class="badge bg-secondary font-monospace me-1"><?= htmlspecialchars($r['kode_kegiatan']) ?></span>
                            <span class="text-dark fw-semibold"><?= htmlspecialchars($r['nama_kegiatan']) ?></span>
                        </div>
                        <div class="col-md-12">
                            <small class="text-muted d-block">Sub-Kegiatan Anggaran:</small>
                            <span class="badge bg-info text-dark font-monospace me-1"><?= htmlspecialchars($r['kode_sub_kegiatan']) ?></span>
                            <span class="text-dark fw-bold"><?= htmlspecialchars($r['nama_sub_kegiatan']) ?></span>
                        </div>
                        <div class="col-md-12 pt-2 border-top">
                            <small class="text-muted d-block">Nama Paket Pekerjaan:</small>
                            <div class="fs-6 fw-bold text-primary"><?= htmlspecialchars($r['nama_paket']) ?> (No. Paket: <?= htmlspecialchars($r['nomor_paket']) ?>)</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. RINCIAN MULTI-REKENING BELANJA -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-light py-2 fw-semibold text-dark">
                    <i class="bi bi-list-check me-2"></i>Alokasi Multi-Rekening Belanja
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped align-middle mb-0 text-sm">
                            <thead class="table-light">
                                <tr>
                                    <th>Kode Rekening</th>
                                    <th>Nama Rekening Belanja</th>
                                    <th class="text-end">Pagu Rekening</th>
                                    <th class="text-end">Alokasi Realisasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $totPagu = 0; $totReal = 0; ?>
                                <?php foreach ($r['rekening_list'] as $rek): ?>
                                    <?php $totPagu += $rek['pagu_rekening']; $totReal += $rek['nilai_realisasi']; ?>
                                    <tr>
                                        <td class="font-monospace fw-bold text-dark"><?= htmlspecialchars($rek['kode_rekening']) ?></td>
                                        <td><?= htmlspecialchars($rek['nama_rekening']) ?></td>
                                        <td class="text-end text-muted">Rp <?= number_format($rek['pagu_rekening'], 0, ',', '.') ?></td>
                                        <td class="text-end fw-bold text-primary">Rp <?= number_format($rek['nilai_realisasi'], 0, ',', '.') ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                            <tfoot class="table-light fw-bold">
                                <tr>
                                    <td colspan="2" class="text-end">Total Alokasi Multi-Rekening:</td>
                                    <td class="text-end text-muted">Rp <?= number_format($totPagu, 0, ',', '.') ?></td>
                                    <td class="text-end text-primary fs-6">Rp <?= number_format($totReal, 0, ',', '.') ?></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>

            <!-- 3. HISTORI PEMBAYARAN / TERMIN & PAJAK -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-dark text-white py-2 fw-semibold d-flex justify-content-between align-items-center">
                    <span><i class="bi bi-cash-stack me-2"></i>Histori Pencairan / Pembayaran</span>
                    <span class="badge bg-success"><?= count($r['pembayaran_list']) ?> Transaksi</span>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0 text-sm">
                            <thead class="table-light">
                                <tr>
                                    <th>Termin</th>
                                    <th>No. Transaksi</th>
                                    <th>Tanggal</th>
                                    <th class="text-end">Nilai Bruto</th>
                                    <th class="text-end">Total Pajak</th>
                                    <th class="text-end">Nilai Bersih</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php if (empty($r['pembayaran_list'])): ?>
                                    <tr>
                                        <td colspan="6" class="text-center text-muted py-4">
                                            Belum ada transaksi pencairan / pembayaran untuk kontrak pekerjaan ini.
                                        </td>
                                    </tr>
                                <?php else: ?>
                                    <?php foreach ($r['pembayaran_list'] as $pb): ?>
                                        <tr>
                                            <td class="fw-bold">Ke-<?= $pb['pembayaran_ke'] ?></td>
                                            <td class="font-monospace text-primary fw-semibold"><?= htmlspecialchars($pb['nomor_transaksi']) ?></td>
                                            <td><?= date('d/m/Y', strtotime($pb['tanggal_pembayaran'])) ?></td>
                                            <td class="text-end fw-bold">Rp <?= number_format($pb['nilai_pembayaran'], 0, ',', '.') ?></td>
                                            <td class="text-end text-danger fw-semibold">Rp <?= number_format($pb['total_pajak'] ?? 0, 0, ',', '.') ?></td>
                                            <td class="text-end text-success fw-bold">Rp <?= number_format($pb['nilai_bersih'] ?? $pb['nilai_pembayaran'], 0, ',', '.') ?></td>
                                        </tr>
                                    <?php endforeach; ?>
                                <?php endif; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sidebar Right Column -->
        <div class="col-lg-4">
            <!-- REKANAN PENYEDIA CARD -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-primary text-white py-2 fw-semibold">
                    <i class="bi bg-building me-2"></i>Profil Rekanan Penyedia
                </div>
                <div class="card-body">
                    <h6 class="fw-bold text-dark mb-1"><?= htmlspecialchars($r['nama_perusahaan']) ?></h6>
                    <small class="text-muted d-block mb-3">Direktur: <strong><?= htmlspecialchars($r['nama_penyedia']) ?></strong></small>

                    <div class="mb-2">
                        <small class="text-muted d-block">NPWP Perusahaan:</small>
                        <span class="font-monospace fw-bold text-primary"><?= htmlspecialchars($r['npwp']) ?></span>
                    </div>

                    <div class="mb-2">
                        <small class="text-muted d-block">Rekening Bank Transfer:</small>
                        <strong class="text-dark"><?= htmlspecialchars($r['nama_bank']) ?> - <?= htmlspecialchars($r['nomor_rekening']) ?></strong>
                        <small class="text-muted d-block">a.n <?= htmlspecialchars($r['pemegang_rekening']) ?></small>
                    </div>

                    <div class="mb-0">
                        <small class="text-muted d-block">Alamat Kantor:</small>
                        <span class="text-muted small"><?= htmlspecialchars($r['alamat_penyedia']) ?></span>
                    </div>
                </div>
            </div>

            <!-- DOKUMEN BERITA ACARA -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-header bg-secondary text-white py-2 fw-semibold">
                    <i class="bi bi-file-earmark-check me-2"></i>Dokumen Berita Acara (BA)
                </div>
                <div class="card-body">
                    <div class="mb-3 pb-2 border-bottom">
                        <small class="text-muted d-block">Nomor BAPSTHP:</small>
                        <strong class="font-monospace text-dark"><?= htmlspecialchars($r['nomor_bapsthp'] ?: '-') ?></strong>
                    </div>
                    <div class="mb-3 pb-2 border-bottom">
                        <small class="text-muted d-block">Nomor BAPB:</small>
                        <strong class="font-monospace text-dark"><?= htmlspecialchars($r['nomor_bapb'] ?: '-') ?></strong>
                    </div>
                    <div class="mb-3 pb-2 border-bottom">
                        <small class="text-muted d-block">Nomor BA Pembayaran:</small>
                        <strong class="font-monospace text-dark"><?= htmlspecialchars($r['nomor_ba'] ?: '-') ?></strong>
                    </div>
                    <div>
                        <small class="text-muted d-block">Tanggal BA:</small>
                        <span class="fw-semibold text-dark"><?= $r['tanggal_ba'] ? date('d F Y', strtotime($r['tanggal_ba'])) : '-' ?></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
