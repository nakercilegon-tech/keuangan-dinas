<!-- View System, Audit, Backup & Settings (Tahap 11) -->
<div class="container-fluid py-3">

    <!-- Flash Notification -->
    <?php if (isset($_SESSION['flash_message'])): ?>
        <div class="alert alert-success alert-dismissible fade show rounded-3 shadow-sm border-0 mb-4" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i><?= htmlspecialchars($_SESSION['flash_message']) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash_message']); ?>
    <?php endif; ?>

    <?php if (isset($_SESSION['flash_error'])): ?>
        <div class="alert alert-danger alert-dismissible fade show rounded-3 shadow-sm border-0 mb-4" role="alert">
            <i class="fa-solid fa-triangle-exclamation me-2"></i><?= htmlspecialchars($_SESSION['flash_error']) ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash_error']); ?>
    <?php endif; ?>

    <!-- Title Banner -->
    <div class="card border-0 shadow-sm rounded-3 mb-4 bg-dark text-white">
        <div class="card-body p-4">
            <div class="d-flex align-items-center justify-content-between">
                <div>
                    <span class="badge bg-indigo-500 text-white px-3 py-1 rounded-pill mb-2 fs-8 font-mono">TAHAP 11 • KEAMANAN, AUDIT, BACKUP & PENGATURAN</span>
                    <h3 class="fw-bold mb-1"><i class="fa-solid fa-shield-halved text-emerald-400 me-2"></i>Pusat Keamanan, Audit Trail & Cadangan Sistem</h3>
                    <p class="text-slate-300 fs-7 mb-0">Manajemen log aktivitas pengguna, backup/restore database SQL, identitas instansi, serta audit hardening aplikasi.</p>
                </div>
                <div class="text-end d-none d-md-block">
                    <span class="badge bg-emerald-500 text-white px-3 py-1 rounded-pill fs-8"><i class="fa-solid fa-lock me-1"></i> Hardened MVC Engine Active</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Tabs -->
    <ul class="nav nav-pills nav-fill bg-white p-2 rounded-3 shadow-sm mb-4 border" id="systemTabs" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active fw-bold fs-7 py-2" id="audit-tab" data-bs-toggle="tab" data-bs-target="#audit-pane" type="button" role="tab">
                <i class="fa-solid fa-clock-rotate-left me-2 text-indigo-600"></i>Audit Log Aktivitas
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold fs-7 py-2" id="backup-tab" data-bs-toggle="tab" data-bs-target="#backup-pane" type="button" role="tab">
                <i class="fa-solid fa-database me-2 text-emerald-600"></i>Backup & Restore Database
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold fs-7 py-2" id="settings-tab" data-bs-toggle="tab" data-bs-target="#settings-pane" type="button" role="tab">
                <i class="fa-solid fa-sliders me-2 text-amber-600"></i>Pengaturan Instansi
            </button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link fw-bold fs-7 py-2" id="security-tab" data-bs-toggle="tab" data-bs-target="#security-pane" type="button" role="tab">
                <i class="fa-solid fa-user-shield me-2 text-rose-600"></i>Security Audit Review
            </button>
        </li>
    </ul>

    <!-- Tab Contents -->
    <div class="tab-content" id="systemTabsContent">

        <!-- Tab 1: Audit Log -->
        <div class="tab-pane fade show active" id="audit-pane" role="tabpanel">
            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-between">
                    <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-list-check text-indigo-600 me-2"></i>Audit Log Transaksi & Akun</h5>
                    <span class="badge bg-slate-100 text-slate-700 font-mono">100+ Total Log</span>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover align-middle mb-0 fs-7">
                            <thead class="bg-light text-muted uppercase fs-8">
                                <tr>
                                    <th class="ps-4">ID / Waktu</th>
                                    <th>Pengguna & Role</th>
                                    <th>Kode Aktivitas</th>
                                    <th>Uraian / Deskripsi Kegiatan</th>
                                    <th class="pe-4 text-end">IP Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($audit_logs as $log): ?>
                                    <tr>
                                        <td class="ps-4">
                                            <span class="fw-bold font-mono text-dark">#<?= $log['id'] ?></span>
                                            <div class="text-muted fs-8"><?= $log['created_at'] ?></div>
                                        </td>
                                        <td>
                                            <span class="fw-semibold text-dark"><?= htmlspecialchars($log['user']) ?></span>
                                        </td>
                                        <td>
                                            <span class="badge bg-indigo-100 text-indigo-800 border border-indigo-200 font-mono fs-8">
                                                <?= htmlspecialchars($log['action']) ?>
                                            </span>
                                        </td>
                                        <td>
                                            <p class="mb-0 text-slate-700 fs-7"><?= htmlspecialchars($log['description']) ?></p>
                                        </td>
                                        <td class="pe-4 text-end font-mono text-muted fs-8">
                                            <?= htmlspecialchars($log['ip_address']) ?>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 2: Backup & Restore -->
        <div class="tab-pane fade" id="backup-pane" role="tabpanel">
            <div class="row g-4">
                <div class="col-12 col-lg-5">
                    <div class="card border-0 shadow-sm rounded-3 h-100">
                        <div class="card-header bg-white py-3 border-bottom">
                            <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-download text-emerald-600 me-2"></i>Buat Cadangan Database Baru</h5>
                        </div>
                        <div class="card-body p-4 text-center">
                            <div class="p-4 bg-emerald-50 rounded-3 mb-4 border border-emerald-200">
                                <i class="fa-solid fa-database text-emerald-600 fa-3x mb-3"></i>
                                <h6 class="fw-bold text-dark mb-1">Backup Database db_keuangan_uptd</h6>
                                <p class="text-muted fs-7 mb-0">Proses ini akan mengekspor seluruh tabel, struktur, relasi, dan data transaksi ke dalam file SQL terkompresi.</p>
                            </div>
                            <form action="/system/create_backup" method="POST">
                                <button type="submit" class="btn btn-emerald w-100 py-2.5 rounded-3 fw-bold text-white">
                                    <i class="fa-solid fa-floppy-disk me-2"></i> Generate SQL Backup Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-lg-7">
                    <div class="card border-0 shadow-sm rounded-3 h-100">
                        <div class="card-header bg-white py-3 border-bottom">
                            <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-clock-history text-indigo-600 me-2"></i>Daftar File Backup SQL</h5>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-hover align-middle mb-0 fs-7">
                                    <thead class="bg-light text-muted uppercase fs-8">
                                        <tr>
                                            <th class="ps-4">Nama File SQL</th>
                                            <th>Ukuran</th>
                                            <th>Tanggal Dibuat</th>
                                            <th class="pe-4 text-end">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($backups as $b): ?>
                                            <tr>
                                                <td class="ps-4 font-mono fw-bold text-dark">
                                                    <i class="fa-solid fa-file-code text-indigo-600 me-2"></i><?= htmlspecialchars($b['filename']) ?>
                                                </td>
                                                <td class="font-mono text-muted"><?= $b['size'] ?></td>
                                                <td class="text-muted"><?= $b['created_at'] ?></td>
                                                <td class="pe-4 text-end">
                                                    <div class="btn-group">
                                                        <a href="/storage/backups/<?= $b['filename'] ?>" class="btn btn-sm btn-outline-secondary" download><i class="fa-solid fa-download"></i></a>
                                                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal" data-bs-target="#restoreModal" data-file="<?= $b['filename'] ?>">
                                                            <i class="fa-solid fa-rotate-left"></i> Restore
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab 3: Pengaturan Instansi -->
        <div class="tab-pane fade" id="settings-pane" role="tabpanel">
            <div class="card border-0 shadow-sm rounded-3">
                <div class="card-header bg-white py-3 border-bottom">
                    <h5 class="fw-bold text-dark m-0"><i class="fa-solid fa-building text-amber-600 me-2"></i>Identitas Instansi & Pengaturan Kop Surat Laporan</h5>
                </div>
                <div class="card-body p-4">
                    <form action="/system/update_settings" method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?? 'sample_csrf_token' ?>">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold fs-7">Nama Instansi Induk</label>
                                <input type="text" name="nama_instansi" class="form-control fs-7" value="<?= htmlspecialchars($settings['nama_instansi']) ?>" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold fs-7">Nama UPTD / Unit Kerja</label>
                                <input type="text" name="nama_uptd" class="form-control fs-7" value="<?= htmlspecialchars($settings['nama_uptd']) ?>" required>
                            </div>
                            <div class="col-md-12">
                                <label class="form-label fw-semibold fs-7">Alamat Lengkap Perkantoran</label>
                                <textarea name="alamat" class="form-control fs-7" rows="2"><?= htmlspecialchars($settings['alamat']) ?></textarea>
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold fs-7">Nomor Telepon / Fax</label>
                                <input type="text" name="telepon" class="form-control fs-7" value="<?= htmlspecialchars($settings['telepon']) ?>">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold fs-7">Email Resmi Instansi</label>
                                <input type="email" name="email" class="form-control fs-7" value="<?= htmlspecialchars($settings['email']) ?>">
                            </div>
                            <div class="col-md-4">
                                <label class="form-label fw-semibold fs-7">Tahun Anggaran Berjalan</label>
                                <input type="number" name="tahun_anggaran" class="form-control fs-7 font-mono fw-bold" value="<?= htmlspecialchars($settings['tahun_anggaran']) ?>">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold fs-7">Nama Pimpinan / Kepala UPTD</label>
                                <input type="text" name="nama_pimpinan" class="form-control fs-7" value="<?= htmlspecialchars($settings['nama_pimpinan']) ?>">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold fs-7">NIP Pimpinan</label>
                                <input type="text" name="nip_pimpinan" class="form-control fs-7 font-mono" value="<?= htmlspecialchars($settings['nip_pimpinan']) ?>">
                            </div>
                        </div>

                        <div class="mt-4 pt-3 border-top text-end">
                            <button type="submit" class="btn btn-amber text-white fw-bold px-4 py-2 rounded-3">
                                <i class="fa-solid fa-check me-1"></i> Simpan Perubahan Pengaturan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Tab 4: Security Health -->
        <div class="tab-pane fade" id="security-pane" role="tabpanel">
            <div class="row g-4">
                <?php foreach ($security_health as $sec): ?>
                    <div class="col-12 col-md-6 col-lg-4">
                        <div class="card border-0 shadow-sm rounded-3 h-100">
                            <div class="card-body p-4">
                                <div class="d-flex align-items-center justify-content-between mb-3">
                                    <span class="badge bg-emerald-100 text-emerald-800 border border-emerald-200 fw-bold fs-8">
                                        <i class="fa-solid fa-shield-check me-1"></i><?= $sec['status'] ?>
                                    </span>
                                    <i class="fa-solid fa-lock text-slate-400"></i>
                                </div>
                                <h6 class="fw-bold text-dark mb-2"><?= htmlspecialchars($sec['title']) ?></h6>
                                <p class="text-muted fs-8 mb-0"><?= htmlspecialchars($sec['detail']) ?></p>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

    </div>
</div>

<!-- Modal Restore Database Confirmation -->
<div class="modal fade" id="restoreModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 shadow-lg rounded-3">
            <div class="modal-header bg-danger text-white">
                <h5 class="modal-title fw-bold"><i class="fa-solid fa-triangle-exclamation me-2"></i>Konfirmasi Restore Database</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="/system/restore_backup" method="POST">
                <div class="modal-body p-4">
                    <p class="fw-bold text-dark mb-2">Apakah Anda yakin ingin memulihkan database db_keuangan_uptd?</p>
                    <p class="text-muted fs-7 mb-3">Proses restore akan mengode ulang tabel dan menimpa seluruh data transaksi aktif dengan isi cadangan SQL berikut:</p>
                    <div class="p-3 bg-light rounded-3 border font-mono fs-8 fw-bold text-danger text-center" id="restoreFilenameDisplay">
                        db_keuangan_uptd_2026-08-11_100000.sql
                    </div>
                    <input type="hidden" name="filename" id="restoreFilenameInput" value="">
                </div>
                <div class="modal-footer bg-light">
                    <button type="button" class="btn btn-secondary rounded-3 fs-7" data-bs-dismiss="modal">Batal</button>
                    <button type="submit" class="btn btn-danger fw-bold rounded-3 fs-7"><i class="fa-solid fa-rotate-left me-1"></i> Ya, Restore Database</button>
                </div>
            </form>
        </div>
    </div>
</div>
