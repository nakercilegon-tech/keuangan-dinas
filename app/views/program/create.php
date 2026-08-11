<!-- Form Tambah Program View -->
<div class="card border-0 shadow-sm rounded-3 max-w-xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-plus me-2 text-primary"></i>Tambah Program Anggaran</h5>
        <a href="<?= BASE_URL ?>program" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
    </div>

    <div class="card-body p-4">
        <form action="<?= BASE_URL ?>program/store" method="POST">
            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Kode Program <span class="text-danger">*</span></label>
                <input type="text" name="kode_program" class="form-control form-control-sm font-mono" placeholder="cth: 1.02.01" required>
                <div class="form-text fs-8">Gunakan format standar kodefikasi permendagri / DPA (unik).</div>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Nama Program Anggaran <span class="text-danger">*</span></label>
                <textarea name="nama_program" class="form-control form-control-sm" rows="3" placeholder="cth: PROGRAM PENUNJANG URUSAN PEMERINTAHAN DAERAH KABUPATEN/KOTA" required></textarea>
            </div>

            <div class="mb-3">
                <label class="form-label fw-semibold fs-7">Tahun Anggaran</label>
                <input type="text" name="tahun_anggaran" value="2026" class="form-control form-control-sm font-mono" required>
            </div>

            <div class="pt-3 border-top d-flex justify-content-end gap-2">
                <a href="<?= BASE_URL ?>program" class="btn btn-light border btn-sm px-3">Batal</a>
                <button type="submit" class="btn btn-primary btn-sm px-4 fw-bold"><i class="fa-solid fa-floppy-disk me-1"></i> Simpan Program</button>
            </div>
        </form>
    </div>
</div>
