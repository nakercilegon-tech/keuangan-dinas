<!-- Create User Form View -->
<div class="card border-0 shadow-sm rounded-3 max-w-2xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-user-plus me-2 text-primary"></i>Tambah Pengguna Baru</h5>
        <a href="<?= BASE_URL ?>users" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
    </div>

    <div class="card-body p-4">
        <form action="<?= BASE_URL ?>users/store" method="POST">
            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

            <div class="row g-3">
                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Username <span class="text-danger">*</span></label>
                    <input type="text" name="username" class="form-control form-control-sm font-mono" placeholder="cth: operator2" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Password <span class="text-danger">*</span></label>
                    <input type="password" name="password" class="form-control form-control-sm font-mono" placeholder="Minimal 6 karakter" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Nama Lengkap <span class="text-danger">*</span></label>
                    <input type="text" name="nama_lengkap" class="form-control form-control-sm" placeholder="Nama lengkap & gelar" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Email <span class="text-danger">*</span></label>
                    <input type="email" name="email" class="form-control form-control-sm" placeholder="alamat@dinas.go.id" required>
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">NIP (Nomor Induk Pegawai)</label>
                    <input type="text" name="nip" class="form-control form-control-sm font-mono" placeholder="198501012010011001">
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Jabatan</label>
                    <input type="text" name="jabatan" class="form-control form-control-sm" placeholder="Bendahara Pengeluaran UPTD">
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Role Hak Akses <span class="text-danger">*</span></label>
                    <select name="role" class="form-select form-select-sm" required>
                        <option value="OPERATOR" selected>OPERATOR (Input Data Realisasi & Pembayaran)</option>
                        <option value="ADMIN">ADMIN (Akses Penuh Seluruh Fitur & Users)</option>
                        <option value="PIMPINAN">PIMPINAN (Monitoring Dashboard & Export Laporan)</option>
                    </select>
                </div>

                <div class="col-md-6">
                    <label class="form-label fw-semibold fs-7">Status Akun</label>
                    <select name="status" class="form-select form-select-sm">
                        <option value="aktif" selected>Aktif</option>
                        <option value="nonaktif">Nonaktif</option>
                    </select>
                </div>
            </div>

            <div class="mt-4 pt-3 border-top d-flex justify-content-end gap-2">
                <a href="<?= BASE_URL ?>users" class="btn btn-light border btn-sm px-3">Batal</a>
                <button type="submit" class="btn btn-primary btn-sm px-4 fw-bold"><i class="fa-solid fa-floppy-disk me-1"></i> Simpan Pengguna</button>
            </div>
        </form>
    </div>
</div>
