<!-- Master Program View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-folder-tree me-2 text-indigo-600"></i>Master Program Anggaran 2026</h5>
            <p class="text-muted fs-7 m-0">Kelola daftar Program Anggaran Induk UPTD (Level 1 Hierarki Anggaran)</p>
        </div>
        <div class="d-flex gap-2">
            <a href="<?= BASE_URL ?>program/create" class="btn btn-primary btn-sm fw-bold">
                <i class="fa-solid fa-plus me-1"></i> Tambah Program Baru
            </a>
            <button class="btn btn-outline-success btn-sm font-bold" onclick="alert('Exporting Program List to Excel (.xlsx)...')">
                <i class="fa-solid fa-file-excel me-1"></i> Excel
            </button>
            <button class="btn btn-outline-danger btn-sm font-bold" onclick="alert('Exporting Program List to PDF...')">
                <i class="fa-solid fa-file-pdf me-1"></i> PDF
            </button>
        </div>
    </div>

    <div class="card-body">
        <!-- Flash Message Alerts -->
        <?php if (!empty($_SESSION['flash_success'])): ?>
            <div class="alert alert-success alert-dismissible fade show fs-7" role="alert">
                <i class="fa-solid fa-circle-check me-2"></i><?= $_SESSION['flash_success']; unset($_SESSION['flash_success']); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>
        <?php if (!empty($_SESSION['flash_error'])): ?>
            <div class="alert alert-danger alert-dismissible fade show fs-7" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-2"></i><?= $_SESSION['flash_error']; unset($_SESSION['flash_error']); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <!-- Filter Search Bar -->
        <form action="<?= BASE_URL ?>program" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-6">
                <div class="input-group input-group-sm">
                    <span class="input-group-text bg-light"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control" placeholder="Cari Kode Program atau Nama Program...">
                </div>
            </div>
            <div class="col-12 col-md-4 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Cari</button>
                <a href="<?= BASE_URL ?>program" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- Program Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th style="width: 150px;">Kode Program</th>
                        <th>Nama Program Anggaran</th>
                        <th class="text-center" style="width: 130px;">Jumlah Kegiatan</th>
                        <th class="text-end" style="width: 180px;">Total Pagu Paket</th>
                        <th class="text-end" style="width: 140px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($programs)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">Data Program Anggaran tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($programs as $p): ?>
                            <tr>
                                <td>
                                    <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono fs-7 px-2 py-1">
                                        <?= htmlspecialchars($p['kode_program']) ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($p['nama_program']) ?></div>
                                    <div class="text-muted fs-8">Tahun Anggaran: <?= htmlspecialchars($p['tahun_anggaran'] ?? '2026') ?></div>
                                </td>
                                <td class="text-center">
                                    <a href="<?= BASE_URL ?>kegiatan?program_id=<?= $p['id'] ?>" class="badge bg-light text-dark border font-mono text-decoration-none">
                                        <i class="fa-solid fa-diagram-project me-1 text-primary"></i> <?= $p['total_kegiatan'] ?? 0 ?> Kegiatan
                                    </a>
                                </td>
                                <td class="text-end font-mono fw-bold text-dark">
                                    Rp <?= number_format($p['total_pagu'] ?? 0, 0, ',', '.') ?>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>program/edit/<?= $p['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit Program">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="<?= BASE_URL ?>program/delete/<?= $p['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus Program ini? (Gagal jika masih memiliki kegiatan)');" title="Hapus Program">
                                        <i class="fa-solid fa-trash"></i>
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
