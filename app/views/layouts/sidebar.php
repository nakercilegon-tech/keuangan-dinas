<!-- Sidebar Component -->
<nav id="sidebar">
    <div class="sidebar-header">
        <div class="d-flex items-center gap-2">
            <i class="fa-solid fa-vault text-indigo-400 fs-4 text-warning"></i>
            <div>
                <h6 class="m-0 fw-bold text-white fs-6">SIMKEU UPTD</h6>
                <span class="badge bg-indigo-500 text-white" style="font-size: 10px;">TA 2026</span>
            </div>
        </div>
    </div>

    <ul class="list-unstyled components">
        <li class="<?= ($active_menu ?? '') === 'dashboard' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>dashboard"><i class="fa-solid fa-gauge-high"></i> <span>Dashboard</span></a>
        </li>

        <div class="nav-section">MASTER DATA</div>
        <li class="<?= ($active_menu ?? '') === 'program' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>program"><i class="fa-solid fa-folder-tree"></i> <span>Program</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'kegiatan' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>kegiatan"><i class="fa-solid fa-list-check"></i> <span>Kegiatan</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'sub_kegiatan' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>subkegiatan"><i class="fa-solid fa-diagram-project"></i> <span>Sub-Kegiatan</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'rekening' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>rekening"><i class="fa-solid fa-receipt"></i> <span>Rekening Belanja</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'penyedia' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>penyedia"><i class="fa-solid fa-building"></i> <span>Penyedia / Vendor</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'paket' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>paket"><i class="fa-solid fa-box-archive"></i> <span>Paket Pekerjaan</span></a>
        </li>

        <div class="nav-section">REALISASI</div>
        <li class="<?= ($active_menu ?? '') === 'realisasi' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>realisasi"><i class="fa-solid fa-file-signature"></i> <span>Realisasi Pekerjaan</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'pembayaran' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>pembayaran"><i class="fa-solid fa-money-check-dollar"></i> <span>Pembayaran</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'pajak' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>pajak"><i class="fa-solid fa-calculator"></i> <span>Pajak (Tax Deductions)</span></a>
        </li>

        <div class="nav-section">PELAPORAN</div>
        <li class="<?= ($active_menu ?? '') === 'laporan_anggaran' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>laporan/anggaran"><i class="fa-solid fa-chart-line"></i> <span>Realisasi Anggaran</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'laporan_pekerjaan' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>laporan/pekerjaan"><i class="fa-solid fa-file-lines"></i> <span>Realisasi Pekerjaan</span></a>
        </li>

        <div class="nav-section">SISTEM</div>
        <?php if (($_SESSION['user_role'] ?? '') === 'ADMIN'): ?>
        <li class="<?= ($active_menu ?? '') === 'users' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>users"><i class="fa-solid fa-users-gear"></i> <span>User Management</span></a>
        </li>
        <?php endif; ?>
        <li class="<?= ($active_menu ?? '') === 'audit' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>audit"><i class="fa-solid fa-shield-halved"></i> <span>Audit Log</span></a>
        </li>
        <li class="<?= ($active_menu ?? '') === 'backup' ? 'active' : '' ?>">
            <a href="<?= BASE_URL ?>backup"><i class="fa-solid fa-database"></i> <span>Backup Database</span></a>
        </li>
    </ul>
</nav>
