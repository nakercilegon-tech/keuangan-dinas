<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - SIMKEU UPTD 2026</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: system-ui, -apple-system, sans-serif;
        }
        .login-card {
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 440px;
            padding: 36px;
        }
    </style>
</head>
<body>

<div class="login-card">
    <div class="text-center mb-4">
        <div class="d-inline-flex align-items-center justify-content-center bg-indigo-50 p-3 rounded-circle text-primary mb-2">
            <i class="fa-solid fa-vault fs-2"></i>
        </div>
        <h4 class="fw-bold text-dark m-0">SIMKEU UPTD</h4>
        <p class="text-muted fs-7 mt-1">Sistem Informasi Anggaran & Realisasi Keuangan Dinas TA 2026</p>
    </div>

    <?php if (isset($_SESSION['flash_error'])): ?>
        <div class="alert alert-danger alert-dismissible fade show fs-7" role="alert">
            <i class="fa-solid fa-circle-exclamation me-2"></i><?= $_SESSION['flash_error'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['flash_error']); ?>
    <?php endif; ?>

    <?php if (isset($_SESSION['flash_success'])): ?>
        <div class="alert alert-success alert-dismissible fade show fs-7" role="alert">
            <i class="fa-solid fa-circle-check me-2"></i><?= $_SESSION['flash_success'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
        <?php unset($_SESSION['flash_success']); ?>
    <?php endif; ?>

    <form action="<?= BASE_URL ?>auth/processLogin" method="POST" class="mt-3">
        <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

        <div class="mb-3">
            <label class="form-label fw-semibold fs-7 text-dark">Username</label>
            <div class="input-group">
                <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-user text-muted"></i></span>
                <input type="text" name="username" class="form-control border-start-0 bg-light fs-7" placeholder="Masukkan username" required autofocus>
            </div>
        </div>

        <div class="mb-4">
            <label class="form-label fw-semibold fs-7 text-dark">Password</label>
            <div class="input-group">
                <span class="input-group-text bg-light border-end-0"><i class="fa-solid fa-lock text-muted"></i></span>
                <input type="password" name="password" class="form-control border-start-0 bg-light fs-7" placeholder="Masukkan password" required>
            </div>
        </div>

        <button type="submit" class="btn btn-primary w-100 py-2.5 fw-bold fs-7 rounded-3 shadow-sm">
            <i class="fa-solid fa-right-to-bracket me-2"></i> Masuk ke Sistem
        </button>
    </form>

    <div class="mt-4 pt-3 border-top text-center">
        <span class="text-muted fs-8">Default Demo Credentials:</span>
        <div class="d-flex justify-content-center gap-2 mt-1">
            <span class="badge bg-light text-dark border">admin / admin123</span>
            <span class="badge bg-light text-dark border">operator / operator123</span>
            <span class="badge bg-light text-dark border">pimpinan / pimpinan123</span>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
