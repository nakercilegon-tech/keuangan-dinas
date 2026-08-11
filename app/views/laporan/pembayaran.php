<!-- View Laporan Pembayaran (Tahap 9) -->
<div class="container-fluid py-3">

    <div class="card border-0 shadow-sm rounded-3 mb-4 no-print">
        <div class="card-body p-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                <div>
                    <h4 class="fw-bold text-dark m-0"><i class="fa-solid fa-money-bill-transfer text-emerald-600 me-2"></i>B. Laporan Pembayaran SP2D</h4>
                    <p class="text-muted fs-7 mb-0 mt-1">Rincian pencairan dana SP2D, nomor SP, penyedia, rekening, potongan pajak & penerimaan bersih TA 2026.</p>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <button type="button" onclick="window.print()" class="btn btn-sm btn-dark rounded-pill px-3"><i class="fa-solid fa-print me-1"></i> Cetak Laporan</button>
                    <a href="/laporan/export_excel?type=pembayaran" class="btn btn-sm btn-success rounded-pill px-3"><i class="fa-solid fa-file-excel me-1"></i> Export Excel</a>
                    <a href="/laporan/export_pdf?type=pembayaran" target="_blank" class="btn btn-sm btn-danger rounded-pill px-3"><i class="fa-solid fa-file-pdf me-1"></i> Export PDF</a>
                </div>
            </div>

            <form method="GET" action="/laporan/pembayaran" class="row g-2 pt-3 border-top">
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
                    <button type="submit" class="btn btn-sm btn-emerald w-100 text-white"><i class="fa-solid fa-filter me-1"></i> Filter Data</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Printable Official Document -->
    <div class="card border-0 shadow-sm rounded-3 p-4 bg-white" id="printableReport">
        <div class="text-center border-bottom border-dark border-3 pb-3 mb-4">
            <h5 class="fw-bold mb-0 text-dark uppercase tracking-wider">PEMERINTAH KOTA CILEGON</h5>
            <h4 class="fw-bold mb-0 text-dark uppercase tracking-wider">DINAS TENAGA KERJA</h4>
            <h5 class="fw-bold mb-1 text-dark uppercase tracking-wider">UPTD LATIHAN KERJA</h5>
            <p class="fs-8 text-secondary mb-0">Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten 42436</p>
        </div>

        <div class="text-center mb-4">
            <h5 class="fw-bold text-dark text-decoration-underline mb-1">LAPORAN PEMBAYARAN KEUANGAN UPTD</h5>
            <p class="fs-7 text-muted mb-0">Tahun Anggaran: <strong>2026</strong> | Periode: <strong>s/d <?= date('d F Y') ?></strong></p>
        </div>

        <div class="table-responsive">
            <table class="table table-bordered table-striped align-middle fs-7">
                <thead class="table-dark text-center uppercase fs-8">
                    <tr>
                        <th class="align-middle">Paket Pekerjaan</th>
                        <th class="align-middle">Uraian Pekerjaan</th>
                        <th class="align-middle">Nomor SP</th>
                        <th class="align-middle">Penyedia</th>
                        <th class="align-middle">Pembayaran Ke</th>
                        <th class="align-middle">Tanggal</th>
                        <th class="align-middle">Rekening Belanja</th>
                        <th class="align-middle">Nilai Pembayaran (Rp)</th>
                        <th class="align-middle">Total Pajak (Rp)</th>
                        <th class="align-middle">Nilai Bersih (Rp)</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($list_pembayaran)): ?>
                        <?php foreach ($list_pembayaran as $row): ?>
                            <tr>
                                <td class="fw-bold text-indigo-700"><?= $row['paket'] ?></td>
                                <td><?= $row['pekerjaan'] ?></td>
                                <td class="font-mono text-center font-bold text-dark"><?= $row['nomor_sp'] ?></td>
                                <td class="fw-semibold"><?= $row['penyedia'] ?></td>
                                <td class="text-center font-mono font-bold">Ke-<?= $row['pembayaran_ke'] ?></td>
                                <td class="text-center font-mono"><?= date('d/m/Y', strtotime($row['tanggal'])) ?></td>
                                <td class="font-mono fs-8"><?= $row['rekening'] ?></td>
                                <td class="text-end font-mono font-bold text-dark">Rp <?= number_format($row['nilai_pembayaran'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono font-bold text-danger">Rp <?= number_format($row['total_pajak'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono font-bold text-emerald-700">Rp <?= number_format($row['nilai_bersih'], 0, ',', '.') ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <!-- Tanda Tangan Official -->
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
