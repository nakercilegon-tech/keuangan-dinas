<!-- Edit Penyedia View -->
<div class="card border-0 shadow-sm rounded-3 max-w-3xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Edit Data Penyedia</h5>
        <a href="<?= BASE_URL ?>penyedia" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
    </div>

    <div class="card-body p-4">
        <?php if (!empty($_SESSION['flash_error'])): ?>
            <div class="alert alert-danger alert-dismissible fade show fs-7" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-2"></i><?= $_SESSION['flash_error']; unset($_SESSION['flash_error']); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <form action="<?= BASE_URL ?>penyedia/update/<?= $penyedia['id'] ?>" method="POST">
            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

            <div class="row g-3">
                <div class="col-12 col-md-6">
                    <label class="form-label fw-bold fs-7 text-dark">Nama Perusahaan <span class="text-danger">*</span></label>
                    <input type="text" name="nama_perusahaan" value="<?= htmlspecialchars($penyedia['nama_perusahaan']) ?>" class="form-control form-control-sm" required>
                </div>

                <div class="col-12 col-md-6">
                    <label class="form-label fw-bold fs-7 text-dark">Nama Direktur <span class="text-danger">*</span></label>
                    <input type="text" name="nama_penyedia" value="<?= htmlspecialchars($penyedia['nama_penyedia']) ?>" class="form-control form-control-sm" required>
                </div>

                <div class="col-12 col-md-6">
                    <label class="form-label fw-bold fs-7 text-dark">NPWP Perusahaan <span class="text-danger">*</span></label>
                    <input type="text" name="npwp" value="<?= htmlspecialchars($penyedia['npwp']) ?>" class="form-control form-control-sm font-mono" required>
                </div>

                <div class="col-12 col-md-6">
                    <label class="form-label fw-bold fs-7 text-dark">Status Penyedia</label>
                    <select name="status" class="form-select form-select-sm">
                        <option value="aktif" <?= ($penyedia['status'] === 'aktif') ? 'selected' : '' ?>>Aktif</option>
                        <option value="nonaktif" <?= ($penyedia['status'] === 'nonaktif') ? 'selected' : '' ?>>Non-Aktif</option>
                    </select>
                </div>

                <div class="col-12">
                    <label class="form-label fw-bold fs-7 text-dark">Alamat Lengkap Perusahaan</label>
                    <textarea name="alamat" rows="2" class="form-control form-control-sm"><?= htmlspecialchars($penyedia['alamat']) ?></textarea>
                </div>

                <div class="col-12 border-top pt-3">
                    <h6 class="fw-bold text-indigo-700 fs-7 mb-3"><i class="fa-solid fa-building-columns me-1"></i> Data Rekening Bank Rekanan</h6>
                </div>

                <div class="col-12 col-md-4">
                    <label class="form-label fw-bold fs-7 text-dark">Nama Bank <span class="text-danger">*</span></label>
                    <input type="text" name="nama_bank" value="<?= htmlspecialchars($penyedia['nama_bank']) ?>" class="form-control form-control-sm" required>
                </div>

                <div class="col-12 col-md-4">
                    <label class="form-label fw-bold fs-7 text-dark">Nomor Rekening <span class="text-danger">*</span></label>
                    <input type="text" name="nomor_rekening" value="<?= htmlspecialchars($penyedia['nomor_rekening']) ?>" class="form-control form-control-sm font-mono" required>
                </div>

                <div class="col-12 col-md-4">
                    <label class="form-label fw-bold fs-7 text-dark">Pemegang Rekening <span class="text-danger">*</span></label>
                    <input type="text" name="pemegang_rekening" value="<?= htmlspecialchars($penyedia['pemegang_rekening']) ?>" class="form-control form-control-sm" required>
                </div>

                <div class="col-12 col-md-6 border-top pt-3">
                    <label class="form-label fw-bold fs-7 text-dark">Nomor Telepon / WA</label>
                    <input type="text" name="telepon" value="<?= htmlspecialchars($penyedia['telepon'] ?? '') ?>" class="form-control form-control-sm">
                </div>

                <div class="col-12 col-md-6 border-top pt-3">
                    <label class="form-label fw-bold fs-7 text-dark">Email Official</label>
                    <input type="email" name="email" value="<?= htmlspecialchars($penyedia['email'] ?? '') ?>" class="form-control form-control-sm">
                </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-4 border-top pt-3">
                <a href="<?= BASE_URL ?>penyedia" class="btn btn-light btn-sm border">Batal</a>
                <button type="submit" class="btn btn-primary btn-sm fw-bold"><i class="fa-solid fa-save me-1"></i> Perbarui Penyedia</button>
            </div>
        </form>
    </div>
</div>
