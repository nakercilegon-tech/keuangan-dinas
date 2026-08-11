<!-- View Laporan Realisasi Anggaran (LRA) - Tahap 8 -->
<div class="container-fluid py-3">

    <!-- Action Toolbar & Filter Bar -->
    <div class="card border-0 shadow-sm rounded-3 mb-4 no-print">
        <div class="card-body p-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                <div>
                    <h4 class="fw-bold text-dark m-0"><i class="fa-solid fa-file-invoice-dollar text-indigo-600 me-2"></i>Laporan Realisasi Anggaran (LRA)</h4>
                    <p class="text-muted fs-7 mb-0 mt-1">Laporan serapan anggaran DPA per Program, Kegiatan, Sub-Kegiatan & Rekening Belanja TA 2026.</p>
                </div>

                <div class="d-flex align-items-center gap-2">
                    <button type="button" onclick="window.print()" class="btn btn-sm btn-dark rounded-pill px-3"><i class="fa-solid fa-print me-1"></i> Cetak Laporan</button>
                    <a href="/laporan/export_excel" class="btn btn-sm btn-success rounded-pill px-3"><i class="fa-solid fa-file-excel me-1"></i> Export Excel</a>
                    <a href="/laporan/export_pdf" target="_blank" class="btn btn-sm btn-danger rounded-pill px-3"><i class="fa-solid fa-file-pdf me-1"></i> Export PDF</a>
                </div>
            </div>

            <!-- Filter Panel -->
            <form method="GET" action="/laporan/realisasi_anggaran" class="row g-2 pt-3 border-top">
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tahun Anggaran</label>
                    <select name="tahun" class="form-select form-select-sm">
                        <option value="2026" selected>2026</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Mulai</label>
                    <input type="date" name="tanggal_mulai" class="form-control form-control-sm" value="<?= $_GET['tanggal_mulai'] ?? '' ?>">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Akhir</label>
                    <input type="date" name="tanggal_akhir" class="form-control form-control-sm" value="<?= $_GET['tanggal_akhir'] ?? '' ?>">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Program</label>
                    <select name="program_id" class="form-select form-select-sm">
                        <option value="">-- Semua Program --</option>
                        <option value="PRG-001">Dukungan Manajemen UPTD</option>
                        <option value="PRG-002">Pengelolaan Keuangan & Aset</option>
                        <option value="PRG-003">Layanan Teknis Operasional</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Kegiatan</label>
                    <select name="kegiatan_id" class="form-select form-select-sm">
                        <option value="">-- Semua Kegiatan --</option>
                        <option value="KGT-001">Operasional Kantor</option>
                        <option value="KGT-002">Pemeliharaan Sarana</option>
                        <option value="KGT-003">Penatausahaan Keuangan</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2 d-flex align-items-end">
                    <button type="submit" class="btn btn-sm btn-indigo w-100"><i class="fa-solid fa-filter me-1"></i> Filter Data</button>
                </div>
            </form>
        </div>
    </div>

    <!-- DOCUMENT KOP SURAT & REPORT TABLE CONTAINER -->
    <div class="card border-0 shadow-sm rounded-3 p-4 bg-white" id="printableReport">
        
        <!-- Kop Surat Resmi Pemerintah Kota Cilegon -->
        <div class="text-center border-bottom border-dark border-3 pb-3 mb-4">
            <h5 class="fw-bold mb-0 text-dark uppercase tracking-wider">PEMERINTAH KOTA CILEGON</h5>
            <h4 class="fw-bold mb-0 text-dark uppercase tracking-wider">DINAS TENAGA KERJA</h4>
            <h5 class="fw-bold mb-1 text-dark uppercase tracking-wider">UPTD LATIHAN KERJA</h5>
            <p class="fs-8 text-secondary mb-0">Jl. Raya Merak No. 123, Kel. Rawa Arum, Kec. Grogol, Kota Cilegon - Banten 42436</p>
            <p class="fs-8 text-secondary mb-0">Website: disnaker.cilegon.go.id | Email: uptd.blk@cilegon.go.id</p>
        </div>

        <!-- Judul Laporan & Metadata -->
        <div class="text-center mb-4">
            <h5 class="fw-bold text-dark text-decoration-underline mb-1">LAPORAN REALISASI ANGGARAN (LRA)</h5>
            <p class="fs-7 text-muted mb-0">Tahun Anggaran: <strong>2026</strong> | Periode: <strong>s/d <?= date('d F Y') ?></strong></p>
        </div>

        <!-- Tabel Laporan Realisasi Anggaran -->
        <div class="table-responsive">
            <table className="table table-bordered table-striped table-hover align-middle fs-7">
                <thead class="table-dark text-center uppercase fs-8">
                    <tr>
                        <th rowspan="2" class="align-middle">Kode Program</th>
                        <th rowspan="2" class="align-middle">Program</th>
                        <th rowspan="2" class="align-middle">Kode Kegiatan</th>
                        <th rowspan="2" class="align-middle">Kegiatan</th>
                        <th rowspan="2" class="align-middle">Kode Sub-Kegiatan</th>
                        <th rowspan="2" class="align-middle">Sub-Kegiatan</th>
                        <th rowspan="2" class="align-middle">Kode Rekening</th>
                        <th rowspan="2" class="align-middle">Nama Rekening Belanja</th>
                        <th colspan="4" class="align-middle">Anggaran & Realisasi (Rupiah)</th>
                    </tr>
                    <tr>
                        <th class="bg-indigo-700">Pagu (Rp)</th>
                        <th class="bg-emerald-700">Realisasi (Rp)</th>
                        <th class="bg-amber-700">Sisa (Rp)</th>
                        <th class="bg-purple-700">% Serapan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!empty($list_realisasi)): ?>
                        <?php foreach ($list_realisasi as $row): ?>
                            <tr>
                                <td class="font-mono text-center fw-semibold"><?= $row['kode_program'] ?></td>
                                <td><?= $row['nama_program'] ?></td>
                                <td class="font-mono text-center fw-semibold"><?= $row['kode_kegiatan'] ?></td>
                                <td><?= $row['nama_kegiatan'] ?></td>
                                <td class="font-mono text-center fw-semibold"><?= $row['kode_sub_kegiatan'] ?></td>
                                <td><?= $row['nama_sub_kegiatan'] ?></td>
                                <td class="font-mono text-center fw-bold text-indigo-700"><?= $row['kode_rekening'] ?></td>
                                <td class="fw-medium"><?= $row['nama_rekening'] ?></td>
                                <td class="text-end font-mono font-bold">Rp <?= number_format($row['pagu'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono font-bold text-emerald-700">Rp <?= number_format($row['realisasi'], 0, ',', '.') ?></td>
                                <td class="text-end font-mono font-bold text-amber-700">Rp <?= number_format($row['sisa'], 0, ',', '.') ?></td>
                                <td class="text-center font-mono font-bold text-indigo-600"><?= number_format($row['persentase'], 2) ?>%</td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
                <tfoot class="table-secondary fw-bold font-mono fs-7">
                    <tr>
                        <td colspan="8" class="text-end text-uppercase">TOTAL KESELURUHAN:</td>
                        <td class="text-end text-indigo-900">Rp <?= number_format($total_pagu ?? 1250000000, 0, ',', '.') ?></td>
                        <td class="text-end text-emerald-800">Rp <?= number_format($total_realisasi ?? 931500000, 0, ',', '.') ?></td>
                        <td class="text-end text-amber-800">Rp <?= number_format($total_sisa ?? 318500000, 0, ',', '.') ?></td>
                        <td class="text-center text-purple-900"><?= number_format($total_persentase ?? 74.52, 2) ?>%</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Kolom Tanda Tangan Official -->
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
