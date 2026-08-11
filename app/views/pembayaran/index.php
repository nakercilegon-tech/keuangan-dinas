<?php
/**
 * View: Index Daftar Pembayaran & Perhitungan Pajak (Tahap 6)
 */
?>
<div class="container-fluid py-4">
    <!-- Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-cash-coin text-success me-2"></i>Modul Pembayaran & Perhitungan Pajak
            </h3>
            <p class="text-muted small mb-0">
                Pencatatan termin pembayaran, realisasi keuangan, dan kalkulasi pajak otomatis (PPN, PPh21, PPh22, PPh23).
            </p>
        </div>
        <div>
            <a href="/pembayaran/create" class="btn btn-primary shadow-sm px-3">
                <i class="bi bi-plus-lg me-1"></i> Input Pembayaran Baru
            </a>
        </div>
    </div>

    <!-- Alert Flash Message -->
    <?php if (isset($_SESSION['flash'])): ?>
        <div class="alert alert-<?= $_SESSION['flash']['type'] ?> alert-dismissible fade show shadow-sm" role="alert">
            <i class="bi bi-info-circle-fill me-2"></i> <?= $_SESSION['flash']['message'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash']); ?>
    <?php endif; ?>

    <!-- Filter & Search Card -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-3">
            <form method="GET" action="/pembayaran" class="row g-2 align-items-center">
                <div class="col-md-9">
                    <div class="input-group">
                        <span class="input-group-text bg-light border-end-0"><i class="bi bi-search text-muted"></i></span>
                        <input type="text" name="search" class="form-control border-start-0" 
                               placeholder="Cari nomor transaksi, nomor SP, nama paket, penyedia..." 
                               value="<?= htmlspecialchars($search ?? '') ?>">
                    </div>
                </div>
                <div class="col-md-3 d-flex gap-2">
                    <button type="submit" class="btn btn-dark w-100"><i class="bi bi-funnel"></i> Filter</button>
                    <a href="/pembayaran" class="btn btn-outline-secondary"><i class="bi bi-arrow-counterclockwise"></i> Reset</a>
                </div>
            </form>
        </div>
    </div>

    <!-- Data Table Card -->
    <div class="card border-0 shadow-sm">
        <div class="card-header bg-white py-3">
            <h6 class="fw-bold mb-0 text-dark"><i class="bi bi-list-check me-2"></i>Daftar Transaksi Pembayaran</h6>
        </div>
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="bg-light text-secondary text-uppercase small">
                        <tr>
                            <th class="ps-3" style="width: 50px;">No</th>
                            <th>No. Transaksi / Tgl</th>
                            <th>Paket Pekerjaan / No. SP</th>
                            <th>Penyedia / Bank</th>
                            <th class="text-end">Nilai Pembayaran</th>
                            <th class="text-end">Total Pajak</th>
                            <th class="text-end">Nilai Bersih</th>
                            <th class="text-center" style="width: 120px;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($pembayaranList)): ?>
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <i class="bi bi-inbox display-6 d-block mb-2"></i>
                                    Belum ada data transaksi pembayaran recorded.
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($pembayaranList as $index => $item): ?>
                                <tr>
                                    <td class="ps-3 fw-bold text-muted"><?= $index + 1 ?></td>
                                    <td>
                                        <div class="fw-bold text-primary"><?= htmlspecialchars($item['nomor_transaksi']) ?></div>
                                        <div class="text-muted small">
                                            <span class="badge bg-secondary-subtle text-secondary border me-1">Termin <?= $item['pembayaran_ke'] ?></span>
                                            <?= date('d/m/Y', strtotime($item['tanggal_pembayaran'])) ?>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="fw-semibold text-dark"><?= htmlspecialchars($item['nama_paket']) ?></div>
                                        <div class="text-muted small">SP: <span class="font-monospace text-dark"><?= htmlspecialchars($item['nomor_sp']) ?></span></div>
                                    </td>
                                    <td>
                                        <div class="fw-semibold"><?= htmlspecialchars($item['nama_perusahaan']) ?></div>
                                        <div class="text-muted small"><?= htmlspecialchars($item['nama_bank']) ?> - <?= htmlspecialchars($item['nomor_rekening']) ?></div>
                                    </td>
                                    <td class="text-end fw-bold text-dark">
                                        Rp <?= number_format($item['nilai_pembayaran'], 0, ',', '.') ?>
                                    </td>
                                    <td class="text-end fw-bold text-danger">
                                        Rp <?= number_format($item['total_pajak'], 0, ',', '.') ?>
                                    </td>
                                    <td class="text-end fw-bold text-success">
                                        Rp <?= number_format($item['nilai_bersih'], 0, ',', '.') ?>
                                    </td>
                                    <td class="text-center">
                                        <a href="/pembayaran/detail/<?= $item['id'] ?>" class="btn btn-sm btn-outline-info" title="Lihat Kuitansi & Pajak">
                                            <i class="bi bi-receipt"></i> Detail
                                        </a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
