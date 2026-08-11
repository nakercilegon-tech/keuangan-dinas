<!-- Profile View -->
<div class="card border-0 shadow-sm rounded-3 max-w-xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom">
        <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-user-gear me-2 text-primary"></i>Profil Pengguna Aktif</h5>
    </div>
    <div class="card-body p-4">
        <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
            <div class="bg-indigo-100 p-3 rounded-circle text-indigo-700">
                <i class="fa-solid fa-user-shield fs-2"></i>
            </div>
            <div>
                <h5 class="fw-bold m-0 text-dark"><?= $_SESSION['nama_lengkap'] ?? 'User' ?></h5>
                <span class="badge bg-primary font-mono mt-1"><?= $_SESSION['user_role'] ?? 'OPERATOR' ?></span>
                <span class="text-muted fs-8 font-mono d-block mt-0.5">@<?= $_SESSION['username'] ?? 'user' ?></span>
            </div>
        </div>

        <div class="space-y-3">
            <div class="row py-2 border-bottom">
                <div class="col-4 text-muted fs-7">Email Akun</div>
                <div class="col-8 fw-semibold fs-7 text-dark"><?= $_SESSION['user_email'] ?? 'email@dinas.go.id' ?></div>
            </div>
            <div class="row py-2 border-bottom">
                <div class="col-4 text-muted fs-7">Level Otentikasi</div>
                <div class="col-8 fw-semibold fs-7 text-success">PHP Session Encrypted (SHA256 / Bcrypt)</div>
            </div>
            <div class="row py-2">
                <div class="col-4 text-muted fs-7">Waktu Login</div>
                <div class="col-8 font-mono fs-7 text-secondary"><?= date('Y-m-d H:i:s') ?></div>
            </div>
        </div>

        <div class="mt-4 pt-3 border-top text-end">
            <a href="<?= BASE_URL ?>dashboard" class="btn btn-secondary btn-sm"><i class="fa-solid fa-house me-1"></i> Ke Dashboard</a>
        </div>
    </div>
</div>
