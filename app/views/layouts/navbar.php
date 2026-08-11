<!-- Main Content Area -->
<div id="content">
    <!-- Top Navbar -->
    <header class="top-navbar d-flex align-items-center justify-content-between shadow-xs">
        <div class="d-flex align-items-center gap-3">
            <button class="btn btn-sm btn-light border" id="sidebarCollapse">
                <i class="fa-solid fa-bars"></i>
            </button>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb m-0 fs-7">
                    <li class="breadcrumb-item"><a href="<?= BASE_URL ?>dashboard" class="text-decoration-none text-secondary">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page"><?= $page_title ?? 'Dashboard' ?></li>
                </ol>
            </nav>
        </div>

        <div class="d-flex align-items-center gap-3">
            <!-- Role Badge -->
            <?php
            $role = $_SESSION['user_role'] ?? 'OPERATOR';
            $badgeClass = $role === 'ADMIN' ? 'bg-danger' : ($role === 'PIMPINAN' ? 'bg-primary' : 'bg-success');
            ?>
            <span class="badge <?= $badgeClass ?> px-2.5 py-1.5 font-mono" style="font-size: 11px;">
                <i class="fa-solid fa-user-shield me-1"></i><?= $role ?>
            </span>

            <!-- User Dropdown -->
            <div class="dropdown">
                <button class="btn btn-light btn-sm border dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                    <i class="fa-solid fa-circle-user text-indigo-600 fs-5"></i>
                    <span class="fw-semibold fs-7"><?= $_SESSION['nama_lengkap'] ?? 'Pengguna' ?></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    <li><a class="dropdown-item fs-7" href="<?= BASE_URL ?>profile"><i class="fa-solid fa-user-gear me-2 text-secondary"></i> Profil Saya</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item fs-7 text-danger" href="<?= BASE_URL ?>auth/logout"><i class="fa-solid fa-right-from-bracket me-2"></i> Logout / Keluar</a></li>
                </ul>
            </div>
        </div>
    </header>

    <!-- Body Wrapper -->
    <main class="main-body">
        <!-- Flash Message Alerts -->
        <?php if (isset($_SESSION['flash_success'])): ?>
            <div class="alert alert-success alert-dismissible fade show border-0 shadow-sm mb-4" role="alert">
                <i class="fa-solid fa-circle-check me-2"></i><?= $_SESSION['flash_success'] ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['flash_success']); ?>
        <?php endif; ?>

        <?php if (isset($_SESSION['flash_error'])): ?>
            <div class="alert alert-danger alert-dismissible fade show border-0 shadow-sm mb-4" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-2"></i><?= $_SESSION['flash_error'] ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <?php unset($_SESSION['flash_error']); ?>
        <?php endif; ?>
