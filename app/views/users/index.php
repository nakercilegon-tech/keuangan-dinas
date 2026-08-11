<!-- User Management Index View -->
<div class="card border-0 shadow-sm rounded-3">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between flex-wrap gap-2">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-users-gear me-2 text-primary"></i>Manajemen Pengguna Systems</h5>
            <p class="text-muted fs-7 m-0">Kelola akun, role hak akses (ADMIN, OPERATOR, PIMPINAN), & status pengguna</p>
        </div>
        <a href="<?= BASE_URL ?>users/create" class="btn btn-primary btn-sm fw-bold">
            <i class="fa-solid fa-user-plus me-1"></i> Tambah Pengguna Baru
        </a>
    </div>

    <div class="card-body">
        <!-- Filter Bar -->
        <form action="<?= BASE_URL ?>users" method="GET" class="row g-2 mb-4">
            <div class="col-12 col-md-5">
                <input type="text" name="search" value="<?= htmlspecialchars($search ?? '') ?>" class="form-control form-control-sm" placeholder="Cari username, nama, email, NIP...">
            </div>
            <div class="col-12 col-md-3">
                <select name="role" class="form-select form-select-sm">
                    <option value="">-- Semua Role Hak Akses --</option>
                    <option value="ADMIN" <?= ($role_filter ?? '') === 'ADMIN' ? 'selected' : '' ?>>ADMIN (Akses Penuh)</option>
                    <option value="OPERATOR" <?= ($role_filter ?? '') === 'OPERATOR' ? 'selected' : '' ?>>OPERATOR (Input & Realisasi)</option>
                    <option value="PIMPINAN" <?= ($role_filter ?? '') === 'PIMPINAN' ? 'selected' : '' ?>>PIMPINAN (Monitoring & Laporan)</option>
                </select>
            </div>
            <div class="col-12 col-md-4 d-flex gap-2">
                <button type="submit" class="btn btn-secondary btn-sm"><i class="fa-solid fa-filter me-1"></i> Filter</button>
                <a href="<?= BASE_URL ?>users" class="btn btn-light btn-sm border"><i class="fa-solid fa-rotate-right"></i> Reset</a>
            </div>
        </form>

        <!-- User Data Table -->
        <div class="table-responsive">
            <table class="table table-hover align-middle fs-7 border">
                <thead class="table-light text-uppercase font-mono text-secondary" style="font-size: 11px;">
                    <tr>
                        <th>Username / Nama</th>
                        <th>NIP & Jabatan</th>
                        <th>Email</th>
                        <th>Role Akses</th>
                        <th>Status</th>
                        <th>Login Terakhir</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($users)): ?>
                        <tr>
                            <td colspan="7" class="text-center py-4 text-muted">Data pengguna tidak ditemukan.</td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($users as $u): ?>
                            <tr>
                                <td>
                                    <div class="fw-bold text-dark"><?= htmlspecialchars($u['nama_lengkap']) ?></div>
                                    <span class="badge bg-light text-primary border font-mono">@<?= htmlspecialchars($u['username']) ?></span>
                                </td>
                                <td>
                                    <div class="text-dark"><?= htmlspecialchars($u['jabatan'] ?: '-') ?></div>
                                    <div class="text-muted font-mono fs-8">NIP: <?= htmlspecialchars($u['nip'] ?: '-') ?></div>
                                </td>
                                <td class="font-mono text-secondary"><?= htmlspecialchars($u['email']) ?></td>
                                <td>
                                    <?php
                                    $roleBadge = $u['role'] === 'ADMIN' ? 'bg-danger' : ($u['role'] === 'PIMPINAN' ? 'bg-primary' : 'bg-success');
                                    ?>
                                    <span class="badge <?= $roleBadge ?> font-mono"><?= $u['role'] ?></span>
                                </td>
                                <td>
                                    <?php if ($u['status'] === 'aktif'): ?>
                                        <span class="badge bg-success-subtle text-success border border-success-subtle">Aktif</span>
                                    <?php else: ?>
                                        <span class="badge bg-danger-subtle text-danger border border-danger-subtle">Nonaktif</span>
                                    <?php endif; ?>
                                </td>
                                <td class="font-mono text-muted fs-8">
                                    <?= $u['last_login'] ? date('d/m/Y H:i', strtotime($u['last_login'])) : 'Belum Pernah' ?>
                                </td>
                                <td class="text-end">
                                    <a href="<?= BASE_URL ?>users/edit/<?= $u['id'] ?>" class="btn btn-sm btn-outline-primary me-1" title="Edit User">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </a>
                                    <?php if ($u['id'] != $_SESSION['user_id']): ?>
                                        <a href="<?= BASE_URL ?>users/delete/<?= $u['id'] ?>" class="btn btn-sm btn-outline-danger" onclick="return confirm('Apakah Anda yakin ingin menghapus user ini?');" title="Hapus User">
                                            <i class="fa-solid fa-trash"></i>
                                        </a>
                                    <?php endif; ?>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
