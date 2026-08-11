<!-- Master Kegiatan View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-diagram-project me-2 text-indigo-600"></i>Master Kegiatan Anggaran</h5>
            <p class="text-muted fs-7 m-0">Kelola Kegiatan Anggaran terikat pada Program Parent (Level 2 Hierarki)</p>
        </div>
        <div class="d-flex gap-2">
            <a href="<?= BASE_URL ?>kegiatan/create" class="btn btn-primary btn-sm fw-bold">
                <i class="fa-solid fa-plus me-1"></i> Tambah Kegiatan
            </a>
        </div>
    </div>

    <div class="card-body">
        <!-- Filter Bar Cascading -->
        <form action="<?= BASE_URL ?>kegiatan" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-5">
                <select name="program_id" class="form-select form-select-sm" onchange="this.form.submit()">
                    <option value="">-- Semua Program Parent --</option>
                    <?php foreach ($programList as $prg): ?>
                        <option value="<?= $prg['id'] ?>" <?= ($program_id == $prg['id']) ? 'selected' : '' ?>>
                            [<?= htmlspecialchars($prg['kode_program']) ?>] <?= htmlspecialchars($prg['nama_program']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-12 col-md-4">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari Kode atau Nama Kegiatan...">
            </div>
            <div class="col-12 col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Filter</button>
                <a href="<?= BASE_URL ?>kegiatan" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- Data Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th style="width: 140px;">Kode Kegiatan</th>
                        <th>Program Induk</th>
                        <th>Nama Kegiatan Anggaran</th>
                        <th class="text-center" style="width: 130px;">Sub-Kegiatan</th>
                        <th class="text-end" style="width: 120px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($kegiatanList)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">Data Kegiatan Anggaran tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($kegiatanList as $k): ?>
                            <tr>
                                <td>
                                    <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono fs-7 px-2 py-1">
                                        <?= htmlspecialchars($k['kode_kegiatan']) ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="text-dark fw-bold">[<?= htmlspecialchars($k['kode_program']) ?>]</div>
                                    <div class="text-muted fs-8 text-truncate" style="max-width: 250px;"><?= htmlspecialchars($k['nama_program']) ?></div>
                                </td>
                                <td class="fw-bold text-dark"><?= htmlspecialchars($k['nama_kegiatan']) ?></td>
                                <td class="text-center">
                                    <a href="<?= BASE_URL ?>subkegiatan?kegiatan_id=<?= $k['id'] ?>" class="badge bg-light text-dark border font-mono text-decoration-none">
                                        <i class="fa-solid fa-list-check me-1 text-success"></i> <?= $k['total_sub'] ?? 0 ?> Sub
                                    </a>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>kegiatan/edit/<?= $k['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="<?= BASE_URL ?>kegiatan/delete/<?= $k['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus Kegiatan ini?');" title="Hapus">
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
