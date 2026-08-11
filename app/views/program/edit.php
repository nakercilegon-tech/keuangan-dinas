<!-- Form Edit Program View -->
<div class="card border-0 shadow-sm rounded-3 max-w-xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Edit Program Anggaran</h5>
        <a href="<?= BASE_URL ?>program" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
    </div>

    <div class="card-body p-4">
        <form action="<?= BASE_URL ?>program/update/<?= $program['id'] ?>" method="POST">
            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Kode Program <span class="text-danger">*</span></label>
                <input type="text" name="kode_program" value="<?= htmlspecialchars($program['kode_program']) ?>" class="form-control form-control-sm font-mono" required>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Nama Program Anggaran <span class="text-danger">*</span></label>
                <textarea name="nama_program" class="form-control form-control-sm" rows="3" required><?= htmlspecialchars($program['nama_program']) ?></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Tahun Anggaran</label>
                <input type="text" name="tahun_anggaran" value="<?= htmlspecialchars($program['tahun_anggaran'] ?? '2026') ?>" class="form-control form-control-sm font-mono" required>
            </div>

            <div class="pt-3 border-top d-flex justify-content-end gap-2">
                <a href="<?= BASE_URL ?>program" class="btn btn-light border btn-sm px-3">Batal</a>
                <button type="submit" class="btn btn-primary btn-sm px-4 fw-bold"><i class="fa-solid fa-floppy-disk me-1"></i> Perbarui Program</button>
            </div>
        </form>
    </div>
</div>
