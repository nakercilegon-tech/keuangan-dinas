<!-- Master Rekening Belanja View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-receipt me-2 text-indigo-600"></i>Master Rekening Belanja</h5>
            <p class="text-muted fs-7 m-0">Kodefikasi Rekening Belanja DPA (Barang/Jasa, Modal, Pegawai, dll)</p>
        </div>
        <a href="<?= BASE_URL ?>rekening/create" class="btn btn-primary btn-sm fw-bold">
            <i class="fa-solid fa-plus me-1"></i> Tambah Rekening
        </a>
    </div>

    <div class="card-body">
        <!-- Filter Bar -->
        <form action="<?= BASE_URL ?>rekening" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-5">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari Kodefikasi / Nama Rekening Belanja...">
            </div>
            <div class="col-12 col-md-4">
                <select name="jenis_belanja" class="form-select form-select-sm">
                    <option value="">-- Semua Jenis Belanja --</option>
                    <option value="Belanja Barang dan Jasa" <?= ($jenis_belanja === 'Belanja Barang dan Jasa') ? 'selected' : '' ?>>Belanja Barang & Jasa</option>
                    <option value="Belanja Modal" <?= ($jenis_belanja === 'Belanja Modal') ? 'selected' : '' ?>>Belanja Modal</option>
                    <option value="Belanja Pegawai" <?= ($jenis_belanja === 'Belanja Pegawai') ? 'selected' : '' ?>>Belanja Pegawai</option>
                    <option value="Belanja Pemeliharaan" <?= ($jenis_belanja === 'Belanja Pemeliharaan') ? 'selected' : '' ?>>Belanja Pemeliharaan</option>
                </select>
            </div>
            <div class="col-12 col-md-3 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Filter</button>
                <a href="<?= BASE_URL ?>rekening" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- Rekening Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th style="width: 170px;">Kode Rekening</th>
                        <th>Nama Rekening Belanja</th>
                        <th style="width: 200px;">Jenis Belanja</th>
                        <th class="text-end" style="width: 180px;">Total Alokasi Pagu</th>
                        <th class="text-end" style="width: 120px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($rekeningList)): ?>
                        <tr>
                            <td colspan="5" class="text-center py-4 text-muted">Data Rekening Belanja tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($rekeningList as $r): ?>
                            <tr>
                                <td>
                                    <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono fs-7 px-2 py-1">
                                        <?= htmlspecialchars($r['kode_rekening']) ?>
                                    </span>
                                </td>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($r['nama_rekening']) ?></div>
                                </td>
                                <td>
                                    <span class="badge bg-light text-dark border font-mono">
                                        <?= htmlspecialchars($r['jenis_belanja']) ?>
                                    </span>
                                </td>
                                <td class="text-end font-mono fw-bold text-dark">
                                    Rp <?= number_format($r['total_dialokasikan'] ?? 0, 0, ',', '.') ?>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>rekening/edit/<?= $r['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <a href="<?= BASE_URL ?>rekening/delete/<?= $r['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin menghapus Rekening ini?');" title="Hapus">
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
