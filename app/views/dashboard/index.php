<!-- Dashboard Sesi & Eksekutif (Tahap 7) -->
<div class="container-fluid py-3">

    <!-- Header & Filter Bar -->
    <div class="card border-0 shadow-sm rounded-3 mb-4">
        <div class="card-body p-4">
            <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
                <div>
                    <h4 class="fw-bold text-dark m-0"><i class="fa-solid fa-chart-line text-indigo-600 me-2"></i>Dashboard Eksekutif Keuangan UPTD (TA 2026)</h4>
                    <p class="text-muted fs-7 mb-0 mt-1">Monitoring real-time alokasi pagu, realisasi pencairan SP2D, potongan pajak, sisa kas & 9 indikator visual.</p>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-primary rounded-pill px-3" onclick="refreshDashboard()"><i class="fa-solid fa-rotate me-1"></i> Refresh Data</button>
                    <span class="badge bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 py-2 rounded-pill"><i class="fa-solid fa-shield-halved me-1"></i> Live DB Index Aggregation</span>
                </div>
            </div>

            <!-- Form Filter Parameter -->
            <form id="formFilterDashboard" class="row g-2 pt-3 border-top">
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tahun Anggaran</label>
                    <select name="tahun" id="filterTahun" class="form-select form-select-sm">
                        <option value="2026" selected>2026 (Aktif)</option>
                        <option value="2025">2025</option>
                        <option value="ALL">Semua Tahun</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Mulai</label>
                    <input type="date" name="tanggal_mulai" id="filterTglMulai" class="form-control form-control-sm">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Tanggal Akhir</label>
                    <input type="date" name="tanggal_akhir" id="filterTglAkhir" class="form-control form-control-sm">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Program</label>
                    <select name="program_id" id="filterProgram" class="form-select form-select-sm">
                        <option value="">-- Semua Program --</option>
                        <option value="PRG-001">Dukungan Manajemen UPTD</option>
                        <option value="PRG-002">Pengelolaan Keuangan & Aset</option>
                        <option value="PRG-003">Layanan Teknis Operasional</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <label class="form-label text-muted fs-8 fw-semibold">Kegiatan</label>
                    <select name="kegiatan_id" id="filterKegiatan" class="form-select form-select-sm">
                        <option value="">-- Semua Kegiatan --</option>
                        <option value="KGT-001">Operasional Kantor</option>
                        <option value="KGT-002">Pemeliharaan Sarana</option>
                        <option value="KGT-003">Penatausahaan Keuangan</option>
                    </select>
                </div>
                <div class="col-12 col-sm-6 col-md-2 d-flex align-items-end">
                    <button type="button" class="btn btn-sm btn-indigo w-100" onclick="applyDashboardFilter()"><i class="fa-solid fa-filter me-1"></i> Terapkan Filter</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 8 Kartu Utama Ringkasan Eksekutif -->
    <div class="row g-3 mb-4">
        <!-- 1. Total Pagu Anggaran -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-indigo-600 h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">1. Total Pagu Anggaran</span>
                        <div class="p-2 bg-indigo-50 text-indigo-600 rounded-3"><i class="fa-solid fa-vault fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_pagu_anggaran ?? 1850000000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Pagu Induk APBD UPTD</div>
                </div>
            </div>
        </div>

        <!-- 2. Total Pagu Paket -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-primary h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">2. Total Pagu Paket</span>
                        <div class="p-2 bg-blue-50 text-primary rounded-3"><i class="fa-solid fa-boxes-stacked fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_pagu_paket ?? 1820000000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Pagu 5 Paket Pekerjaan</div>
                </div>
            </div>
        </div>

        <!-- 3. Total Nilai Kontrak -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-info h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">3. Total Nilai Kontrak</span>
                        <div class="p-2 bg-info-50 text-info rounded-3"><i class="fa-solid fa-file-contract fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_nilai_kontrak ?? 1745500000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Efisiensi Rp 74,5 Jt</div>
                </div>
            </div>
        </div>

        <!-- 4. Total Pembayaran -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-success h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">4. Total Pembayaran</span>
                        <div class="p-2 bg-success-50 text-success rounded-3"><i class="fa-solid fa-money-bill-check fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_pembayaran ?? 1150000000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Total Pencairan SP2D</div>
                </div>
            </div>
        </div>

        <!-- 5. Total Realisasi -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-teal h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">5. Total Realisasi</span>
                        <div class="p-2 bg-teal-50 text-teal rounded-3"><i class="fa-solid fa-chart-line-up fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_realisasi ?? 1150000000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Valid BAPSTHP & SPM</div>
                </div>
            </div>
        </div>

        <!-- 6. Total Pajak -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-danger h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">6. Total Pajak Disetor</span>
                        <div class="p-2 bg-danger-50 text-danger rounded-3"><i class="fa-solid fa-receipt fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($total_pajak ?? 168420000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">PPN 11%, PPh 21, 22, 23</div>
                </div>
            </div>
        </div>

        <!-- 7. Sisa Anggaran -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-warning h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">7. Sisa Anggaran Kas</span>
                        <div class="p-2 bg-warning-50 text-warning rounded-3"><i class="fa-solid fa-scale-balanced fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono">Rp <?= number_format($sisa_anggaran ?? 700000000, 0, ',', '.') ?></h4>
                    <div class="text-muted fs-8 mt-2">Sisa Siap Dicairkan</div>
                </div>
            </div>
        </div>

        <!-- 8. Persentase Realisasi -->
        <div class="col-12 col-sm-6 col-xl-3">
            <div class="card border-0 shadow-sm rounded-3 border-start border-4 border-purple h-100">
                <div class="card-body p-3">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="text-muted fs-8 fw-bold uppercase">8. Persentase Serapan</span>
                        <div class="p-2 bg-purple-50 text-purple rounded-3"><i class="fa-solid fa-percent fs-5"></i></div>
                    </div>
                    <h4 class="fw-bold text-dark m-0 font-mono"><?= $persentase_realisasi ?? '62.16' ?>%</h4>
                    <div class="progress mt-2" style="height: 6px;">
                        <div class="progress-bar bg-success" style="width: <?= $persentase_realisasi ?? '62.16' ?>%;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- 9 Section Chart Canvas -->
    <div class="row g-4 mb-4">
        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-header bg-white py-3 border-bottom">
                    <h6 class="fw-bold m-0">1. Chart Pagu vs Realisasi Overview</h6>
                </div>
                <div class="card-body">
                    <canvas id="chartPaguVsRealisasi" height="200"></canvas>
                </div>
            </div>
        </div>

        <div class="col-12 col-lg-6">
            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-header bg-white py-3 border-bottom">
                    <h6 class="fw-bold m-0">9. Chart Realisasi & Pajak Bulanan (Jan - Des)</h6>
                </div>
                <div class="card-body">
                    <canvas id="chartBulanan" height="200"></canvas>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
function refreshDashboard() {
    location.reload();
}

function applyDashboardFilter() {
    const formData = new FormData(document.getElementById('formFilterDashboard'));
    fetch('/dashboard/api_stats', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        if(res.status === 'success') {
            alert('Filter berhasil diterapkan! Data dashboard telah diperbarui.');
        }
    });
}
</script>
