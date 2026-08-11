<!-- View Import & Export Center (Tahap 10) -->
<div class="container-fluid py-3">

    <!-- Flash Notification -->
    <?php if (isset($_SESSION['flash_message'])): ?>
        <div class="alert alert-success alert-dismissible fade show rounded-3 shadow-sm border-0 mb-4" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i><?= $_SESSION['flash_message'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash_message']); ?>
    <?php endif; ?>

    <?php if (isset($_SESSION['flash_error'])): ?>
        <div class="alert alert-danger alert-dismissible fade show rounded-3 shadow-sm border-0 mb-4" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i><?= $_SESSION['flash_error'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash_error']); ?>
    <?php endif; ?>

    <!-- Title Banner -->
    <div class="card border-0 shadow-sm rounded-3 mb-4 bg-dark text-white">
        <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <span class="badge bg-indigo-500 text-white px-3 py-1 rounded-pill mb-2 fs-8 font-mono">TAHAP 10 • MODUL IMPORT & EXPORT</span>
                    <h3 class="fw-bold mb-1"><i class="fa-solid fa-file-export text-emerald-400 me-2"></i>Import & Export Center Data Keuangan</h3>
                    <p class="text-slate-300 fs-7 mb-0">Fasilitas unggah massal Excel (Program, Kegiatan, Sub-Kegiatan, Rekening, Penyedia, Paket) dan ekspor laporan resmi PDF/Excel.</p>
                </div>
                <div class="text-end d-none d-md-block">
                    <span class="badge bg-emerald-500 text-white px-3 py-1 rounded-pill fs-8"><i class="fa-solid fa-shield-halved me-1"></i> Safe Bulk Transaction Engine</span>
                </div>
            </div>
        </div>
    </div>

    <div class="row g-4">
        <!-- Section 1: Import Master Data -->
        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3 h-100">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-file-excel text-success me-2"></i>1. Import Massal Master Data (Excel)</h5>
                </div>
                <div class="card-body p-4">
                    <form action="/import_export/preview_import" method="POST" enctype="multipart/form-data" class="space-y-4">
                        <div class="mb-3">
                            <label class="form-label fw-semibold text-dark fs-7">Pilih Entitas Data Master</label>
                            <select name="entity" class="form-select" required id="selectEntity">
                                <option value="program">Master Program (2 Kolom)</option>
                                <option value="kegiatan">Master Kegiatan (3 Kolom)</option>
                                <option value="sub_kegiatan">Master Sub-Kegiatan (3 Kolom)</option>
                                <option value="rekening">Master Rekening Belanja (3 Kolom)</option>
                                <option value="penyedia">Master Penyedia / Perusahaan (7 Kolom)</option>
                                <option value="paket_pekerjaan">Master Paket Pekerjaan (6 Kolom)</option>
                            </select>
                        </div>

                        <!-- Template Downloader Button -->
                        <div class="p-3 bg-light rounded-3 mb-3 border">
                            <div class="d-flex align-items-center justify-content-between">
                                <div>
                                    <p class="fw-bold text-dark mb-0 fs-7"><i class="fa-solid fa-download me-1 text-indigo-600"></i> Unduh Format Template Excel</p>
                                    <p class="text-muted fs-8 mb-0">Gunakan susunan kolom resmi agar tidak gagal validasi.</p>
                                </div>
                                <a href="/import_export/download_template?entity=program" id="btnDownloadTemplate" class="btn btn-sm btn-outline-indigo rounded-pill px-3">
                                    Download CSV/XLSX
                                </a>
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-semibold text-dark fs-7">Pilih File Spreadsheet (.xlsx, .xls, .csv)</label>
                            <input type="file" name="excel_file" class="form-control" accept=".xlsx,.xls,.csv" required>
                            <div class="form-text fs-8">Maksimal ukuran file: 10MB. Dilengkapi sanitasi file & validasi tipe MIME.</div>
                        </div>

                        <button type="submit" class="btn btn-indigo w-100 py-2 rounded-3 fw-bold">
                            <i class="fa-solid fa-magnifying-glass-chart me-1"></i> Unggah & Preview Validation
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Section 2: Export Data & Reports -->
        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3 h-100">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-file-pdf text-danger me-2"></i>2. Export Laporan Keuangan (Excel, PDF & Print)</h5>
                </div>
                <div class="card-body p-4">
                    <p class="text-muted fs-7 mb-3">Unduh dokumen resmi dalam format Excel (dengan auto-width, border, freeze pane & formula) atau PDF bertanda tangan instansi.</p>

                    <div class="list-group list-group-flush">
                        <div class="list-group-item px-0 py-3 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Laporan Realisasi Anggaran (LRA)</h6>
                                <p class="text-muted fs-8 mb-0">Program, Kegiatan, Sub-Kegiatan, Rekening, Pagu, Realisasi, Sisa & %</p>
                            </div>
                            <div class="btn-group">
                                <a href="/laporan/export_excel?type=lra" class="btn btn-sm btn-success"><i class="fa-solid fa-file-excel"></i> Excel</a>
                                <a href="/laporan/export_pdf?type=lra" target="_blank" class="btn btn-sm btn-danger"><i class="fa-solid fa-file-pdf"></i> PDF</a>
                            </div>
                        </div>

                        <div class="list-group-item px-0 py-3 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Laporan Realisasi Pekerjaan</h6>
                                <p class="text-muted fs-8 mb-0">Paket, Pagu Paket, Nilai Kontrak, Total Pembayaran, Sisa & Efisiensi</p>
                            </div>
                            <div class="btn-group">
                                <a href="/laporan/export_excel?type=pekerjaan" class="btn btn-sm btn-success"><i class="fa-solid fa-file-excel"></i> Excel</a>
                                <a href="/laporan/export_pdf?type=pekerjaan" target="_blank" class="btn btn-sm btn-danger"><i class="fa-solid fa-file-pdf"></i> PDF</a>
                            </div>
                        </div>

                        <div class="list-group-item px-0 py-3 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Laporan Pembayaran SP2D</h6>
                                <p class="text-muted fs-8 mb-0">Rincian SP2D, Pekerjaan, Nomor SP, Penyedia, Potongan & Nilai Bersih</p>
                            </div>
                            <div class="btn-group">
                                <a href="/laporan/export_excel?type=pembayaran" class="btn btn-sm btn-success"><i class="fa-solid fa-file-excel"></i> Excel</a>
                                <a href="/laporan/export_pdf?type=pembayaran" target="_blank" class="btn btn-sm btn-danger"><i class="fa-solid fa-file-pdf"></i> PDF</a>
                            </div>
                        </div>

                        <div class="list-group-item px-0 py-3 d-flex align-items-center justify-content-between">
                            <div>
                                <h6 class="fw-bold text-dark mb-0">Laporan Setoran Pajak</h6>
                                <p class="text-muted fs-8 mb-0">PPN 11%, PPh21, PPh22, PPh23 Jasa & PPh23 Makan</p>
                            </div>
                            <div class="btn-group">
                                <a href="/laporan/export_excel?type=pajak" class="btn btn-sm btn-success"><i class="fa-solid fa-file-excel"></i> Excel</a>
                                <a href="/laporan/export_pdf?type=pajak" target="_blank" class="btn btn-sm btn-danger"><i class="fa-solid fa-file-pdf"></i> PDF</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
document.getElementById('selectEntity').addEventListener('change', function() {
    const entity = this.value;
    document.getElementById('btnDownloadTemplate').href = '/import_export/download_template?entity=' + entity;
});
</script>
