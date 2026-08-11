<!-- View Laporan Pajak (Tahap 9) -->
<div class="container-fluid py-3">

    <div class="card border-0 shadow-sm rounded-3 mb-4 no-print">
        <div class="card-body p-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                <div>
                    <h4 class="fw-bold text-dark m-0"><i class="fa-solid fa-receipt text-danger me-2"></i>C. Laporan Pemotongan & Setoran Pajak</h4>
                    <p class="text-muted fs-7 mb-0 mt-1">Rekapitulasi rinci potongan PPN 11%, PPh21, PPh22, PPh23 Jasa & PPh23 Makan TA 2026.</p>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <button type="button" onclick="window.print()" class="btn btn-sm btn-dark rounded-pill px-3"><i class="fa-solid fa-print me-1"></i> Cetak Laporan</button>
                    <a href="/laporan/export_excel?type=pajak" class="btn btn-sm btn-success rounded-pill px-3"><i class="fa-solid fa-file-excel me-1"></i> Export Excel</a>
                    <a href="/laporan/export_pdf?type=pajak" target="_blank" class="btn btn-sm btn-danger rounded-pill px-3"><i class="fa-solid fa-file-pdf me-1"></i> Export PDF</a>
                </div>
            </div>

            <form method="GET" action="/laporan/pajak" class="row g-2 pt-3 border-top">
                <div class="col-12 col-sm-6 col-md-3">
                    <label class="form-label text-muted fs-8 fw-semibold">Tahun Anggaran</label>
                    <select name="tahun" class="form-select form-select-sm">
                        <option value="2026" selected>2026</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Mulai</label>
                    <input type="date" name="tanggal_mulai" class="form-control form-control-sm" value="<?= $_GET['tanggal_mulai'] ?? '' ?>">
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Akhir</label>
                    <input type="date" name="tanggal_akhir" class="form-control form-control-sm" value="<?= $_GET['tanggal_akhir'] ?? '' ?>">
                </div>
                <div class="col-12 col-sm-6 col-md-3 d-flex align-items-end">
                    <button type="submit" class="btn btn-sm btn-danger w-100 text-white"><i class="fa-solid fa-filter me-1"></i> Filter Data</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Printable Report Paper -->
    <div class="card border-0 shadow-sm rounded-3 p-4 bg-white" id="printableReport">
        <div class="text-center border-bottom border-dark border-3 pb-3 mb-4">
            <h5 class="fw-bold mb-0 text-dark uppercase tracking-wider">PEMERINTAH KOTA CILEGON</h5>
            <h4 class="fw-bold mb-0 text-dark uppercase tracking-wider">DINAS TENAGA KERJA</h4>
            <h5 class="fw-bold mb-1 text-dark uppercase tracking-wider">UPTD LATIHAN KERJA</h5>
            <p class="fs-8 text-secondary mb-0">Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten 42436</p>
        </div>

        <div class="text-center mb-4">
            <h5 class="fw-bold text-dark text-decoration-underline mb-1">LAPORAN PEMOTONGAN DAN SETORAN PAJAK (NPWP UPTD)</h5>
            <p class="fs-7 text-muted mb-0">Tahun Anggaran: <strong>2026</strong> | Periode: <strong>s/d <?= date('d F Y') ?></strong></p>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped align-middle fs-7">
                <thead class="table-dark text-center uppercase fs-8">
                    <tr>
                        <th rowspan="2" class="align-middle">Paket Pekerjaan</th>
                        <th rowspan="2" class="align-middle">Penyedia</th>
                        <th rowspan="2" class="align-middle">Tanggal SP2D</th>
                        <th rowspan="2" class="align-middle">Nilai Pembayaran (Rp)</th>
                        <th colspan="5" class="align-middle">Rincian Potongan Pajak (Rupiah)</th>
                        <th rowspan="2" class="align-middle bg-danger">Total Pajak (Rp)</th>
                    </tr>
                    <tr>
                        <th>PPN (11%)</th>
                        <th>PPh 21</th>
                        <th>PPh 22 (1.5%)</th>
                        <th>PPh 23 Jasa (2%)</th>
                        <th>PPh 23 Makan (2%)</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($list_pajak)): ?>
                        <?php foreach ($list_pajak as $row): ?>
                            <tr>
                                <td class="fw-bold text-indigo-700"><?= $row['paket'] ?></td>
                                <td class="fw-semibold"><?= $row['penyedia'] ?></td>
                                <td class="text-center font-mono"><?= date('d/m/Y', strtotime($row['tanggal'])) ?></td>
                                <td class="text-end font-mono font-bold">Rp <?= number_format($row['pembayaran'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono text-indigo-700">Rp <?= number_format($row['ppn'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono">Rp <?= number_format($row['pph21'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono">Rp <?= number_format($row['pph22'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono">Rp <?= number_format($row['pph23_jasa'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono">Rp <?= number_format($row['pph23_makan'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono font-bold text-danger bg-danger-subtle">Rp <?= number_format($row['total_pajak'], 0, ',', '.') ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <!-- Tanda Tangan -->
        <div class="row mt-5 pt-3">
            <div class="col-6 text-center">
                <p class="fs-8 mb-1">Mengetahui,</p>
                <p class="fs-8 fw-bold mb-5">KEPALA UPTD LATIHAN KERJA DINAS TENAGA KERJA KOTA CILEGON</p>
                <p class="fs-8 fw-bold text-decoration-underline mb-0">H. DEDI RACHMAT, S.ST, M.Si</p>
                <p class="fs-8 text-muted mb-0">NIP. 19780512 200501 1 008</p>
            </div>
            <div class="col-6 text-center">
                <p class="fs-8 mb-1">Cilegon, <?= date('d F Y') ?></p>
                <p class="fs-8 fw-bold mb-5">BENDAHARA PENGELUARAN UPTD</p>
                <p class="fs-8 fw-bold text-decoration-underline mb-0">SITI RAHMAWATI, S.E.</p>
                <p class="fs-8 text-muted mb-0">NIP. 19850920 201001 2 015</p>
            </div>
        </div>
    </div>
</div>
