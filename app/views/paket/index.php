<!-- Paket Pekerjaan Index View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-box-archive me-2 text-primary"></i>Kelola Paket Pekerjaan & Alokasi Pagu</h5>
            <p class="text-muted fs-7 m-0">Daftar Paket Pekerjaan Terkait Sub-Kegiatan DPA 2026 Beserta Multi-Rekening Belanja</p>
        </div>
        <a href="<?= BASE_URL ?>paketpekerjaan/create" class="btn btn-primary btn-sm fw-bold">
            <i class="fa-solid fa-plus me-1"></i> Buat Paket Pekerjaan Baru
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
        <form action="<?= BASE_URL ?>paketpekerjaan" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-4">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari Kode/Nomor Paket, Nama Paket...">
            </div>
            <div class="col-12 col-md-4">
                <select name="program_id" class="form-select form-select-sm">
                    <option value="">-- Semua Program --</option>
                    <?php foreach ($programList as $prog): ?>
                        <option value="<?= $prog['id'] ?>" <?= ($program_id == $prog['id']) ? 'selected' : '' ?>>
                            [<?= htmlspecialchars($prog['kode_program']) ?>] <?= htmlspecialchars($prog['nama_program']) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div class="col-12 col-md-4 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Filter</button>
                <a href="<?= BASE_URL ?>paketpekerjaan" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- Paket Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th>Nomor & Nama Paket</th>
                        <th>Sub-Kegiatan DPA</th>
                        <th class="text-end">Pagu Paket</th>
                        <th class="text-end">Pagu Rekening</th>
                        <th class="text-end">Sisa Paket</th>
                        <th class="text-center" style="width: 130px;">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($paketList)): ?>
                        <tr>
                            <td colspan="6" class="text-center py-4 text-muted">Belum ada data Paket Pekerjaan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($paketList as $p): ?>
                            <?php 
                                $paguPaket = floatval($p['pagu_paket']);
                                $paguRekening = floatval($p['total_pagu_rekening']);
                                $sisaPaket = $paguPaket - $paguRekening;
                            ?>
                            <tr>
                                <td>
                                    <div class="fw-bold text-dark fs-6"><?= htmlspecialchars($p['nama_paket']) ?></div>
                                    <span class="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono fs-8">
                                        <i class="fa-solid fa-hashtag me-1"></i><?= htmlspecialchars($p['nomor_paket']) ?>
                                    </span>
                                    <span class="badge bg-light text-secondary border fs-8 ms-1">
                                        <i class="fa-solid fa-list-check me-1"></i><?= $p['total_rekening_count'] ?> Rekening
                                    </span>
                                </td>
                                <td>
                                    <div class="fw-semibold text-dark fs-7"><?= htmlspecialchars($p['nama_sub_kegiatan']) ?></div>
                                    <div class="font-mono text-muted fs-8"><?= htmlspecialchars($p['kode_sub_kegiatan']) ?></div>
                                </td>
                                <td class="text-end fw-bold font-mono fs-7 text-dark">
                                    Rp <?= number_format($paguPaket, 0, ',', '.') ?>
                                </td>
                                <td class="text-end fw-bold font-mono fs-7 text-primary">
                                    Rp <?= number_format($paguRekening, 0, ',', '.') ?>
                                </td>
                                <td class="text-end font-mono fs-7 <?= ($sisaPaket < 0) ? 'text-danger fw-bold' : 'text-success' ?>">
                                    Rp <?= number_format($sisaPaket, 0, ',', '.') ?>
                                </td>
                                <td class="text-center">
                                    <div class="btn-group btn-group-sm">
                                        <a href="<?= BASE_URL ?>paketpekerjaan/detail/<?= $p['id'] ?>" class="btn btn-outline-info" title="Detail & Multi Rekening">
                                            <i class="fa-solid fa-eye"></i>
                                        </a>
                                        <a href="<?= BASE_URL ?>paketpekerjaan/edit/<?= $p['id'] ?>" class="btn btn-outline-primary" title="Edit Paket">
                                            <i class="fa-solid fa-pen-to-square"></i>
                                        </a>
                                        <a href="<?= BASE_URL ?>paketpekerjaan/delete/<?= $p['id'] ?>" class="btn btn-outline-danger" onclick="return confirm('Hapus paket pekerjaan ini?');" title="Hapus Paket">
                                            <i class="fa-solid fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
