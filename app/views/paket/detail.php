<!-- Detail Paket Pekerjaan View -->
<?php
    $paguPaket = floatval($paket['pagu_paket']);
    $totalPaguRekening = 0;
    foreach ($paket['rekening_list'] as $rek) {
        $totalPaguRekening += floatval($rek['pagu_rekening']);
    }
    $sisaPaket = $paguPaket - $totalPaguRekening;
?>

<div class="card border-0 shadow-sm rounded-3 max-w-5xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-file-circle-check me-2 text-primary"></i>Detail Paket Pekerjaan</h5>
            <p class="text-muted fs-7 m-0">Informasi Alokasi Pagu & Distribusi Rekening Belanja DPA</p>
        </div>
        <div class="d-flex gap-2">
            <a href="<?= BASE_URL ?>paketpekerjaan/edit/<?= $paket['id'] ?>" class="btn btn-outline-primary btn-sm fw-bold">
                <i class="fa-solid fa-pen-to-square me-1"></i> Edit Paket
            </a>
            <a href="<?= BASE_URL ?>paketpekerjaan" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
        </div>
    </div>

    <div class="card-body p-4">
        <!-- HEADER HIGHLIGHT -->
        <div class="row g-3 mb-4">
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded border">
                    <span class="text-muted fs-8 text-uppercase fw-bold">Pagu Total Paket</span>
                    <h4 class="fw-bold font-mono text-primary m-0 mt-1">Rp <?= number_format($paguPaket, 0, ',', '.') ?></h4>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded border">
                    <span class="text-muted fs-8 text-uppercase fw-bold">Total Rekening Dialokasikan</span>
                    <h4 class="fw-bold font-mono text-dark m-0 mt-1">Rp <?= number_format($totalPaguRekening, 0, ',', '.') ?></h4>
                </div>
            </div>
            <div class="col-12 col-md-4">
                <div class="p-3 bg-light rounded border">
                    <span class="text-muted fs-8 text-uppercase fw-bold">Sisa Pagu Unallocated</span>
                    <h4 class="fw-bold font-mono <?= ($sisaPaket < 0) ? 'text-danger' : 'text-success' ?> m-0 mt-1">Rp <?= number_format($sisaPaket, 0, ',', '.') ?></h4>
                </div>
            </div>
        </div>

        <!-- METADATA PAKET -->
        <div class="table-responsive mb-4">
            <table class="table table-sm table-bordered fs-7 align-middle">
                <tbody>
                    <tr>
                        <th class="bg-light text-muted" style="width: 25%;">Nomor Paket</th>
                        <td class="font-mono fw-bold text-dark"><?= htmlspecialchars($paket['nomor_paket']) ?></td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Nama Paket Pekerjaan</th>
                        <td class="fw-bold text-dark fs-6"><?= htmlspecialchars($paket['nama_paket']) ?></td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Program DPA</th>
                        <td>[<?= htmlspecialchars($paket['kode_program']) ?>] <?= htmlspecialchars($paket['nama_program']) ?></td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Kegiatan DPA</th>
                        <td>[<?= htmlspecialchars($paket['kode_kegiatan']) ?>] <?= htmlspecialchars($paket['nama_kegiatan']) ?></td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Sub-Kegiatan DPA</th>
                        <td>[<?= htmlspecialchars($paket['kode_sub_kegiatan']) ?>] <?= htmlspecialchars($paket['nama_sub_kegiatan']) ?></td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Tahun Anggaran / Status</th>
                        <td>
                            <span class="badge bg-light text-dark border font-mono me-2"><?= htmlspecialchars($paket['tahun_anggaran']) ?></span>
                            <span class="badge bg-success-subtle text-success border border-success-subtle"><?= htmlspecialchars($paket['status']) ?></span>
                        </td>
                    </tr>
                    <tr>
                        <th class="bg-light text-muted">Keterangan</th>
                        <td><?= htmlspecialchars($paket['keterangan'] ?? '-') ?></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- REKENING LIST TABLE -->
        <div class="border rounded p-3 bg-white">
            <h6 class="fw-bold text-dark fs-7 mb-3"><i class="fa-solid fa-list-check me-2 text-indigo-600"></i>Daftar Rekening Belanja Dialokasikan</h6>
            <div class="table-responsive">
                <table class="table table-hover table-bordered fs-7 align-middle">
                    <thead class="table-light font-mono text-secondary text-uppercase" style="font-size: 11px;">
                        <tr>
                            <th style="width: 5%;">#</th>
                            <th style="width: 20%;">Kode Rekening</th>
                            <th style="width: 45%;">Nama Rekening Belanja</th>
                            <th class="text-end" style="width: 30%;">Pagu Rekening</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($paket['rekening_list'])): ?>
                            <tr>
                                <td colspan="4" class="text-center py-3 text-muted">Belum ada alokasi rekening belanja.</td>
                            </tr>
                        <?php else: ?>
                            <?php $no = 1; foreach ($paket['rekening_list'] as $rek): ?>
                                <tr>
                                    <td class="text-center font-mono text-muted"><?= $no++ ?></td>
                                    <td class="font-mono fw-bold text-indigo-700"><?= htmlspecialchars($rek['kode_rekening']) ?></td>
                                    <td>
                                        <div class="fw-semibold text-dark"><?= htmlspecialchars($rek['nama_rekening']) ?></div>
                                        <span class="badge bg-light text-muted border fs-8"><?= htmlspecialchars($rek['jenis_belanja'] ?? 'Belanja Barang/Jasa') ?></span>
                                    </td>
                                    <td class="text-end font-mono fw-bold text-dark fs-7">
                                        Rp <?= number_format($rek['pagu_rekening'], 0, ',', '.') ?>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </tbody>
                    <tfoot class="table-light fw-bold font-mono fs-7">
                        <tr>
                            <td colspan="3" class="text-end">Total Alokasi Pagu Rekening:</td>
                            <td class="text-end text-primary">Rp <?= number_format($totalPaguRekening, 0, ',', '.') ?></td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>
