<!-- /app/views/realisasi/index.php -->
<!-- Halaman Index Daftar Realisasi Pekerjaan (Tahap 5) -->

<div class="container-fluid px-4 py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
            <h4 class="fw-bold mb-1"><i class="bi bi-file-earmark-check me-2"></i>Modul Realisasi Pekerjaan</h4>
            <p class="text-muted small mb-0">Kelola SP / Kontrak Pekerjaan, Multi-Rekening Belanja, BAPSTHP & BAPB</p>
        </div>
        <div>
            <a href="/realisasi/create" class="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
                <i class="bi bi-plus-lg me-1"></i> Tambah Realisasi / Kontrak Baru
            </a>
        </div>
    </div>

    <!-- Filter & Search Bar -->
    <div class="card border-0 shadow-sm mb-4">
        <div class="card-body p-3">
            <form method="GET" action="/realisasi" class="row g-2">
                <div class="col-md-4">
                    <div class="input-group input-group-sm">
                        <span class="input-group-text bg-light"><i class="bi bi-search"></i></span>
                        <input type="text" name="search" class="form-control" placeholder="Cari No. SP, Paket, Perusahaan..." value="<?= htmlspecialchars($data['search'] ?? '') ?>">
                    </div>
                </div>
                <div class="col-md-3">
                    <select name="status" class="form-select form-select-sm">
                        <option value="">-- Semua Status --</option>
                        <option value="draft" <?= ($data['status'] ?? '') == 'draft' ? 'selected' : '' ?>>Draft</option>
                        <option value="proses" <?= ($data['status'] ?? '') == 'proses' ? 'selected' : '' ?>>Proses Pekerjaan</option>
                        <option value="selesai" <?= ($data['status'] ?? '') == 'selesai' ? 'selected' : '' ?>>Selesai</option>
                        <option value="batal" <?= ($data['status'] ?? '') == 'batal' ? 'selected' : '' ?>>Batal</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-secondary btn-sm w-100"><i class="bi bi-filter me-1"></i>Filter</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Table List -->
    <div class="card border-0 shadow-sm">
        <div class="card-body p-0">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0 text-sm">
                    <thead class="table-light text-secondary">
                        <tr>
                            <th class="ps-3" style="width: 50px;">#</th>
                            <th>No. SP / Kontrak</th>
                            <th>Paket Pekerjaan & Sub-Kegiatan</th>
                            <th>Penyedia / Perusahaan</th>
                            <th class="text-end">Nilai Kontrak</th>
                            <th class="text-end">Terbayar</th>
                            <th class="text-center">Status</th>
                            <th class="text-center pe-3">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (empty($data['realisasiList'])): ?>
                            <tr>
                                <td colspan="8" class="text-center py-5 text-muted">
                                    <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                                    Belum ada data transaksi realisasi pekerjaan. Klik <strong>"Tambah Realisasi"</strong> untuk memulai.
                                </td>
                            </tr>
                        <?php else: ?>
                            <?php foreach ($data['realisasiList'] as $idx => $r): ?>
                                <tr>
                                    <td class="ps-3 fw-bold text-muted"><?= $idx + 1 ?></td>
                                    <td>
                                        <div class="fw-bold text-primary"><?= htmlspecialchars($r['nomor_sp']) ?></div>
                                        <div class="text-muted small"><i class="bi bi-calendar-event me-1"></i><?= date('d/m/Y', strtotime($r['tanggal_sp'])) ?> (<?= intval($r['lama_pekerjaan']) ?> Hari)</div>
                                    </td>
                                    <td>
                                        <div class="fw-semibold text-dark"><?= htmlspecialchars($r['nama_paket']) ?></div>
                                        <span class="badge bg-light text-dark border font-monospace small"><?= htmlspecialchars($r['kode_sub_kegiatan']) ?></span>
                                        <small class="text-muted d-block text-truncate" style="max-width: 250px;"><?= htmlspecialchars($r['nama_sub_kegiatan']) ?></small>
                                    </td>
                                    <td>
                                        <div class="fw-bold"><?= htmlspecialchars($r['nama_perusahaan']) ?></div>
                                        <small class="text-muted"><?= htmlspecialchars($r['nama_penyedia']) ?> (NPWP: <?= htmlspecialchars($r['npwp']) ?>)</small>
                                    </td>
                                    <td class="text-end fw-bold">
                                        Rp <?= number_format($r['nilai_kontrak'], 0, ',', '.') ?>
                                    </td>
                                    <td class="text-end text-success fw-bold">
                                        Rp <?= number_format($r['total_terbayar'], 0, ',', '.') ?>
                                        <div class="progress mt-1" style="height: 4px;">
                                            <?php 
                                                $pct = $r['nilai_kontrak'] > 0 ? ($r['total_terbayar'] / $r['nilai_kontrak']) * 100 : 0;
                                            ?>
                                            <div class="progress-bar bg-success" style="width: <?= min(100, $pct) ?>%"></div>
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <?php if ($r['status'] == 'selesai'): ?>
                                            <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1">Selesai</span>
                                        <?php elseif ($r['status'] == 'proses'): ?>
                                            <span class="badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1">Proses</span>
                                        <?php else: ?>
                                            <span class="badge bg-secondary-subtle text-secondary border px-2 py-1"><?= ucfirst($r['status']) ?></span>
                                        <?php endif; ?>
                                    </td>
                                    <td class="text-center pe-3">
                                        <a href="/realisasi/detail/<?= $r['id'] ?>" class="btn btn-outline-info btn-sm me-1" title="Rincian & Histori Pembayaran">
                                            <i class="bi bi-eye"></i> Rincian
                                        </a>
                                        <a href="/realisasi/delete/<?= $r['id'] ?>" class="btn btn-outline-danger btn-sm btn-delete" onclick="return confirm('Yakin ingin menghapus transaksi realisasi ini?');" title="Hapus">
                                            <i class="bi bi-trash"></i>
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
</div>
