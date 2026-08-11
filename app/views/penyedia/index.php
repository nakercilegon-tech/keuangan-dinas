<!-- Master Penyedia View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-building me-2 text-indigo-600"></i>Master Penyedia / Rekanan Perusahaan</h5>
            <p class="text-muted fs-7 m-0">Kelola Data Profil Perusahaan, NPWP, & Rekening Bank Rekanan Pihak Ketiga</p>
        </div>
        <a href="<?= BASE_URL ?>penyedia/create" class="btn btn-primary btn-sm fw-bold">
            <i class="fa-solid fa-plus me-1"></i> Tambah Penyedia Baru
        </a>
    </div>

    <div class="card-body">
        <!-- Flash Alerts -->
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

        <!-- Search Bar -->
        <form action="<?= BASE_URL ?>penyedia" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-6">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari Nama Perusahaan, NPWP, Penyedia, atau Bank...">
            </div>
            <div class="col-12 col-md-3">
                <select name="status" class="form-select form-select-sm">
                    <option value="">-- Semua Status --</option>
                    <option value="aktif" <?= ($status === 'aktif') ? 'selected' : '' ?>>Aktif</option>
                    <option value="nonaktif" <?= ($status === 'nonaktif') ? 'selected' : '' ?>>Non-Aktif</option>
                </select>
            </div>
            <div class="col-12 col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Filter</button>
                <a href="<?= BASE_URL ?>penyedia" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- Penyedia Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th>Nama Perusahaan / Direktur</th>
                        <th>NPWP / Kontak</th>
                        <th>Informasi Rekening Bank</th>
                        <th class="text-center" style="width: 100px;">Status</th>
                        <th class="text-end" style="width: 120px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($penyediaList)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">Data Penyedia tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($penyediaList as $p): ?>
                            <tr>
                                <td>
                                    <div class="fw-bold text-dark fs-6"><?= htmlspecialchars($p['nama_perusahaan']) ?></div>
                                    <div class="text-muted fs-8"><i class="fa-solid fa-user me-1 text-primary"></i> <?= htmlspecialchars($p['nama_penyedia']) ?> (Direktur)</div>
                                    <div class="text-muted fs-8 text-truncate" style="max-width: 300px;"><i class="fa-solid fa-location-dot me-1 text-danger"></i> <?= htmlspecialchars($p['alamat']) ?></div>
                                </td>
                                <td>
                                    <span class="badge bg-light text-dark border font-mono fs-7 mb-1">
                                        <i class="fa-solid fa-id-card me-1 text-success"></i> <?= htmlspecialchars($p['npwp']) ?>
                                    </span>
                                    <div class="text-muted fs-8"><i class="fa-solid fa-phone me-1"></i> <?= htmlspecialchars($p['telepon'] ?? '-') ?></div>
                                    <div class="text-muted fs-8"><i class="fa-solid fa-envelope me-1"></i> <?= htmlspecialchars($p['email'] ?? '-') ?></div>
                                </td>
                                <td>
                                    <div class="fw-bold text-indigo-700"><?= htmlspecialchars($p['nama_bank']) ?></div>
                                    <div class="font-mono text-dark fw-bold"><?= htmlspecialchars($p['nomor_rekening']) ?></div>
                                    <div class="text-muted fs-8">a.n. <?= htmlspecialchars($p['pemegang_rekening']) ?></div>
                                </td>
                                <td class="text-center">
                                    <?php if (($p['status'] ?? 'aktif') === 'aktif'): ?>
                                        <span class="badge bg-success-subtle text-success border border-success-subtle">Aktif</span>
                                    <?php else: ?>
                                        <span class="badge bg-secondary-subtle text-secondary border border-secondary-subtle">Non-Aktif</span>
                                    <?php endif; ?>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>penyedia/edit/<?= $p['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit Penyedia">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="<?= BASE_URL ?>penyedia/delete/<?= $p['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Hapus penyedia perusahaan ini?');" title="Hapus Penyedia">
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
