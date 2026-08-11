    </main> <!-- End Main Body -->

    <footer class="bg-white border-top py-3 px-4 text-center text-muted fs-8">
        <div>SISTEM INFORMASI ANGGARAN DAN REALISASI KEUANGAN DINAS (SIMKEU UPTD) &copy; 2026</div>
        <div class="text-secondary font-mono text-xs mt-0.5">PHP Native MVC Architecture • MySQL InnoDB • Secure Session Auth</div>
    </footer>
</div> <!-- End Content -->
</div> <!-- End Wrapper -->

<!-- Bootstrap 5 JS Bundle -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/bootstrap.bundle.min.js"></script>
<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script>
document.getElementById('sidebarCollapse')?.addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('d-none');
    }
});
</script>
</body>
</html>
