<!-- Master Sub-Kegiatan View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-list-check me-2 text-indigo-600"></i>Master Sub-Kegiatan Anggaran</h5>
            <p class="text-muted fs-7 m-0">Level 3 Hierarki Anggaran - Tempat pengalokasian Paket Pekerjaan</p>
        </div>
        <a href="<?= BASE_URL ?>subkegiatan/create" class="btn btn-primary btn-sm fw-bold">
            <i class="fa-solid fa-plus me-1"></i> Tambah Sub-Kegiatan
        </a>
    </div>

    <div class="card-body">
        <!-- Filter Bar Cascading -->
        <form action="<?= BASE_URL ?>subkegiatan" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-4">
                <select name="program_id" class="form-select form-select-sm" onchange="this.form.submit()">
                    <option value="">-- Semua Program --</option>
                    <?php foreach ($programList as $prg): ?>
                        <option value="<?= $prg['id'] ?>" <?= ($program_id == $prg['id']) ? 'selected' : '' ?>>
                            [<?= htmlspecialchars($prg['kode_program']) ?>] <?= htmlspecialchars($prg['nama_program']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-12 col-md-4">
                <select name="kegiatan_id" class="form-select form-select-sm" onchange="this.form.submit()">
                    <option value="">-- Semua Kegiatan --</option>
                    <?php foreach ($kegiatanList as $kg): ?>
                        <option value="<?= $kg['id'] ?>" <?= ($kegiatan_id == $kg['id']) ? 'selected' : '' ?>>
                            [<?= htmlspecialchars($kg['kode_kegiatan']) ?>] <?= htmlspecialchars($kg['nama_kegiatan']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-12 col-md-4 d-flex gap-2">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari Kode/Nama Sub...">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter"></i></button>
                <a href="<?= BASE_URL ?>subkegiatan" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i></a>
            </div>
        </form>

        <!-- Sub Kegiatan Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th style="width: 140px;">Kode Sub</th>
                        <th>Program & Kegiatan Induk</th>
                        <th>Nama Sub-Kegiatan</th>
                        <th class="text-center" style="width: 120px;">Paket</th>
                        <th class="text-end" style="width: 120px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($subList)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">Data Sub-Kegiatan tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($subList as $s): ?>
                            <tr>
                                <td>
                                    <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono fs-7 px-2 py-1">
                                        <?= htmlspecialchars($s['kode_sub_kegiatan']) ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="text-dark fw-bold">[<?= htmlspecialchars($s['kode_kegiatan']) ?>] <?= htmlspecialchars($s['nama_kegiatan']) ?></div>
                                    <div class="text-muted fs-8">Prog: <?= htmlspecialchars($s['nama_program']) ?></div>
                                </td>
                                <td class="fw-bold text-dark"><?= htmlspecialchars($s['nama_sub_kegiatan']) ?></td>
                                <td class="text-center">
                                    <span class="badge bg-light text-dark border font-mono">
                                        <i class="fa-solid fa-box-archive me-1 text-warning"></i> <?= $s['total_paket'] ?? 0 ?> Paket
                                    </span>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>subkegiatan/edit/<?= $s['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="<?= BASE_URL ?>subkegiatan/delete/<?= $s['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin menghapus Sub-Kegiatan ini?');" title="Hapus">
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
