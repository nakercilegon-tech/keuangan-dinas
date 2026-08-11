<?php
/**
 * View: Form Input Pembayaran & Kalkulator Pajak Realtime (Tahap 6)
 */
?>
<div class="container-fluid py-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h3 class="fw-bold text-dark mb-1">
                <i class="bi bi-calculator-fill text-primary me-2"></i>Form Input Pembayaran & Kalkulator Pajak
            </h3>
            <p class="text-muted small mb-0">
                Pilih SP Realisasi Pekerjaan, masukkan nilai pembayaran, dan atur pemotongan pajak secara realtime.
            </p>
        </div>
        <a href="/pembayaran" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i> Kembali ke Daftar
        </a>
    </div>

    <!-- Alert Flash Message -->
    <?php if (isset($_SESSION['flash'])): ?>
        <div class="alert alert-<?= $_SESSION['flash']['type'] ?> alert-dismissible fade show shadow-sm" role="alert">
            <i class="bi bi-exclamation-triangle-fill me-2"></i> <?= $_SESSION['flash']['message'] ?>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        <?php unset($_SESSION['flash']); ?>
    <?php endif; ?>

    <form method="POST" action="/pembayaran/store" id="formPembayaran">
        <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

        <div class="row g-4">
            <!-- Left Column: Header & Realisasi Selection -->
            <div class="col-lg-7">
                <!-- Card 1: Informasi Kontrak / SP Realisasi -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="fw-bold mb-0 text-dark">
                            <i class="bi bi-file-earmark-text text-indigo me-2"></i>1. Informasi Surat Pesanan / Realisasi
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Pilih Paket Realisasi Pekerjaan (SP) <span class="text-danger">*</span></label>
                            <select name="realisasi_id" id="realisasi_id" class="form-select form-select-lg border-indigo" required>
                                <option value="">-- Pilih Kontrak Realisasi Pekerjaan --</option>
                                <?php foreach ($realisasiList as $rel): ?>
                                    <option value="<?= $rel['id'] ?>" <?= (isset($selectedRealisasi['id']) && $selectedRealisasi['id'] == $rel['id']) ? 'selected' : '' ?>>
                                        <?= htmlspecialchars($rel['nomor_sp']) ?> | <?= htmlspecialchars($rel['nama_paket']) ?> (<?= htmlspecialchars($rel['nama_perusahaan']) ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <!-- Realisasi Detail Banner (Auto Updated via JS) -->
                        <div id="realisasiInfoBox" class="p-3 bg-light rounded-3 border mb-3 <?= empty($selectedRealisasi) ? 'd-none' : '' ?>">
                            <div class="row g-2 text-dark small">
                                <div class="col-md-6">
                                    <span class="text-muted d-block">Paket Pekerjaan:</span>
                                    <strong id="infoNamaPaket"><?= htmlspecialchars($selectedRealisasi['nama_paket'] ?? '-') ?></strong>
                                </div>
                                <div class="col-md-6">
                                    <span class="text-muted d-block">Penyedia / Penyedia:</span>
                                    <strong id="infoPenyedia"><?= htmlspecialchars($selectedRealisasi['nama_perusahaan'] ?? '-') ?></strong>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <span class="text-muted d-block">Nilai Kontrak (SP):</span>
                                    <span class="fw-bold text-dark" id="infoNilaiKontrak">Rp <?= number_format($selectedRealisasi['nilai_kontrak'] ?? 0, 0, ',', '.') ?></span>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <span class="text-muted d-block">Total Terbayar:</span>
                                    <span class="fw-bold text-primary" id="infoTotalTerbayar">Rp <?= number_format($selectedRealisasi['total_terbayar'] ?? 0, 0, ',', '.') ?></span>
                                </div>
                                <div class="col-md-4 mt-2">
                                    <span class="text-muted d-block">Sisa Kontrak:</span>
                                    <span class="fw-bold text-success fs-6" id="infoSisaKontrak">Rp <?= number_format($selectedRealisasi['sisa_kontrak'] ?? 0, 0, ',', '.') ?></span>
                                </div>
                            </div>
                        </div>

                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label fw-semibold">Nomor Transaksi Pembayaran <span class="text-danger">*</span></label>
                                <input type="text" name="nomor_transaksi" id="nomor_transaksi" class="form-control font-monospace" 
                                       value="<?= htmlspecialchars($autoTrxNo) ?>" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-semibold">Tanggal Pembayaran <span class="text-danger">*</span></label>
                                <input type="date" name="tanggal_pembayaran" id="tanggal_pembayaran" class="form-control" 
                                       value="<?= date('Y-m-d') ?>" required>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold">Nilai Pembayaran Bruto (Rp) <span class="text-danger">*</span></label>
                                <div class="input-group input-group-lg">
                                    <span class="input-group-text bg-success text-white fw-bold">Rp</span>
                                    <input type="number" name="nilai_pembayaran" id="nilai_pembayaran" class="form-control fw-bold fs-4 text-success" 
                                           placeholder="0" step="1" required min="1">
                                </div>
                                <div class="form-text text-muted">
                                    Maksimal pembayaran sebesar sisa kontrak: <strong id="maxPayHint" class="text-danger">Rp 0</strong>
                                </div>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold">Keterangan / Peruntukan Pembayaran</label>
                                <textarea name="keterangan" id="keterangan" class="form-control" rows="2" 
                                          placeholder="Contoh: Pembayaran Termin 1 (50%) Pekerjaan Pelatihan Las Batch 1"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2: Berita Acara & Kelengkapan Dokumen -->
                <div class="card border-0 shadow-sm">
                    <div class="card-header bg-white py-3 border-bottom">
                        <h6 class="fw-bold mb-0 text-dark">
                            <i class="bi bi-journal-check text-primary me-2"></i>2. Berita Acara & Kelengkapan Pencairan
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Nomor BAPSTHP</label>
                                <input type="text" name="nomor_bapsthp" id="nomor_bapsthp" class="form-control form-control-sm" 
                                       value="<?= htmlspecialchars($selectedRealisasi['nomor_bapsthp'] ?? '') ?>" placeholder="BAPSTHP/001/2026">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Nomor BAPB</label>
                                <input type="text" name="nomor_bapb" id="nomor_bapb" class="form-control form-control-sm" 
                                       value="<?= htmlspecialchars($selectedRealisasi['nomor_bapb'] ?? '') ?>" placeholder="BAPB/001/2026">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Tanggal Berita Acara (BA)</label>
                                <input type="date" name="tanggal_ba" id="tanggal_ba" class="form-control form-control-sm" 
                                       value="<?= htmlspecialchars($selectedRealisasi['tanggal_ba'] ?? date('Y-m-d')) ?>">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small fw-semibold">Nomor BA Pembayaran</label>
                                <input type="text" name="nomor_ba" id="nomor_ba" class="form-control form-control-sm" 
                                       value="<?= htmlspecialchars($selectedRealisasi['nomor_ba'] ?? '') ?>" placeholder="BA-PEMB/001/2026">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Live Tax Calculator -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm sticky-top" style="top: 1rem;">
                    <div class="card-header bg-dark text-white py-3 d-flex justify-content-between align-items-center">
                        <h6 class="fw-bold mb-0">
                            <i class="bi bi-receipt-cutoff text-warning me-2"></i>Perhitungan Pajak Realtime
                        </h6>
                        <span class="badge bg-warning text-dark">PHP & JS Engine</span>
                    </div>
                    <div class="card-body">
                        <!-- Checkbox Opsi Pemotongan Pajak -->
                        <div class="mb-3">
                            <label class="form-label fw-bold text-secondary small text-uppercase mb-2">Pilih Komponen Pemotongan Pajak:</label>
                            
                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input tax-trigger" type="checkbox" name="is_ppn" id="is_ppn" value="1" checked>
                                <label class="form-check-label fw-semibold" for="is_ppn">
                                    PPN (11%) <span class="text-muted small ms-1">(11/111 × Nilai Pembayaran)</span>
                                </label>
                            </div>

                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input tax-trigger" type="checkbox" name="is_pph22" id="is_pph22" value="1">
                                <label class="form-check-label fw-semibold" for="is_pph22">
                                    PPh Pasal 22 (1,5%) <span class="text-muted small ms-1">(Barang / Komputer)</span>
                                </label>
                            </div>

                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input tax-trigger" type="checkbox" name="is_pph23_jasa" id="is_pph23_jasa" value="1">
                                <label class="form-check-label fw-semibold" for="is_pph23_jasa">
                                    PPh Pasal 23 Jasa (2%) <span class="text-muted small ms-1">(Jasa / Pemeliharaan)</span>
                                </label>
                            </div>

                            <div class="form-check form-switch mb-2">
                                <input class="form-check-input tax-trigger" type="checkbox" name="is_pph23_makan" id="is_pph23_makan" value="1">
                                <label class="form-check-label fw-semibold" for="is_pph23_makan">
                                    PPh Pasal 23 Makan (2%) <span class="text-muted small ms-1">(Konsumsi / Katering)</span>
                                </label>
                            </div>

                            <div class="mt-2">
                                <label class="form-label small fw-semibold" for="pph21_manual">PPh Pasal 21 Honor (Manual Rp)</label>
                                <input type="number" name="pph21_manual" id="pph21_manual" class="form-control form-control-sm tax-trigger" placeholder="0" step="1">
                            </div>
                        </div>

                        <hr>

                        <!-- Display Breakdown Pajak -->
                        <div class="bg-light p-3 rounded-3 border">
                            <div class="d-flex justify-content-between mb-2">
                                <span class="text-muted small">Dasar Pengenaan Pajak (DPP):</span>
                                <span class="fw-bold text-dark" id="displayDPP">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between mb-1 small text-secondary">
                                <span>PPN (11%):</span>
                                <span class="fw-semibold text-danger" id="displayPPN">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between mb-1 small text-secondary">
                                <span>PPh Pasal 21:</span>
                                <span class="fw-semibold text-danger" id="displayPPh21">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between mb-1 small text-secondary">
                                <span>PPh Pasal 22 (1,5%):</span>
                                <span class="fw-semibold text-danger" id="displayPPh22">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between mb-1 small text-secondary">
                                <span>PPh Pasal 23 Jasa (2%):</span>
                                <span class="fw-semibold text-danger" id="displayPPh23Jasa">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between mb-1 small text-secondary">
                                <span>PPh Pasal 23 Makan (2%):</span>
                                <span class="fw-semibold text-danger" id="displayPPh23Makan">Rp 0</span>
                            </div>

                            <hr class="my-2">

                            <div class="d-flex justify-content-between mb-2">
                                <span class="fw-bold text-dark">TOTAL PAJAK:</span>
                                <span class="fw-bold text-danger fs-6" id="displayTotalPajak">Rp 0</span>
                            </div>

                            <div class="d-flex justify-content-between p-2 bg-success-subtle text-success border border-success rounded-2">
                                <span class="fw-bold">NILAI BERSIH DITERIMA:</span>
                                <span class="fw-bold fs-5" id="displayNilaiBersih">Rp 0</span>
                            </div>
                        </div>

                        <div class="mt-4">
                            <button type="submit" class="btn btn-success btn-lg w-100 shadow">
                                <i class="bi bi-check-circle-fill me-1"></i> Simpan Pembayaran & Pajak
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- JavaScript Calculator & Dynamic AJAX Handler -->
<script>
document.addEventListener('DOMContentLoaded', function () {
    const realisasiSelect = document.getElementById('realisasi_id');
    const nilaiInput = document.getElementById('nilai_pembayaran');
    const isPpn = document.getElementById('is_ppn');
    const isPph22 = document.getElementById('is_pph22');
    const isPph23Jasa = document.getElementById('is_pph23_jasa');
    const isPph23Makan = document.getElementById('is_pph23_makan');
    const pph21Manual = document.getElementById('pph21_manual');

    let currentSisaKontrak = 0;

    function formatRupiah(number) {
        return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(number));
    }

    function calculateTaxes() {
        const nilai = parseFloat(nilaiInput.value) || 0;
        
        // Validation check against sisa kontrak
        if (currentSisaKontrak > 0 && nilai > currentSisaKontrak) {
            nilaiInput.classList.add('is-invalid');
        } else {
            nilaiInput.classList.remove('is-invalid');
        }

        if (nilai <= 0) {
            document.getElementById('displayDPP').innerText = 'Rp 0';
            document.getElementById('displayPPN').innerText = 'Rp 0';
            document.getElementById('displayPPh21').innerText = 'Rp 0';
            document.getElementById('displayPPh22').innerText = 'Rp 0';
            document.getElementById('displayPPh23Jasa').innerText = 'Rp 0';
            document.getElementById('displayPPh23Makan').innerText = 'Rp 0';
            document.getElementById('displayTotalPajak').innerText = 'Rp 0';
            document.getElementById('displayNilaiBersih').innerText = 'Rp 0';
            return;
        }

        const dpp = Math.round(nilai / 1.11);
        const ppn = isPpn.checked ? Math.round((nilai / 1.11) * 0.11) : 0;
        const pph22 = isPph22.checked ? Math.round((nilai / 1.11) * 0.015) : 0;
        const pph23Jasa = isPph23Jasa.checked ? Math.round((nilai / 1.11) * 0.02) : 0;
        const pph23Makan = isPph23Makan.checked ? Math.round(nilai * 0.02) : 0;
        const pph21 = parseFloat(pph21Manual.value) || 0;

        const totalPajak = ppn + pph21 + pph22 + pph23Jasa + pph23Makan;
        const nilaiBersih = nilai - totalPajak;

        document.getElementById('displayDPP').innerText = formatRupiah(dpp);
        document.getElementById('displayPPN').innerText = formatRupiah(ppn);
        document.getElementById('displayPPh21').innerText = formatRupiah(pph21);
        document.getElementById('displayPPh22').innerText = formatRupiah(pph22);
        document.getElementById('displayPPh23Jasa').innerText = formatRupiah(pph23Jasa);
        document.getElementById('displayPPh23Makan').innerText = formatRupiah(pph23Makan);
        document.getElementById('displayTotalPajak').innerText = formatRupiah(totalPajak);
        document.getElementById('displayNilaiBersih').innerText = formatRupiah(nilaiBersih);
    }

    // Trigger tax recalculation on any input change
    nilaiInput.addEventListener('input', calculateTaxes);
    document.querySelectorAll('.tax-trigger').forEach(elem => {
        elem.addEventListener('change', calculateTaxes);
        elem.addEventListener('input', calculateTaxes);
    });

    // Realisasi Dropdown Change Event -> Fetch Info via Fetch API
    realisasiSelect.addEventListener('change', function () {
        const id = this.value;
        if (!id) {
            document.getElementById('realisasiInfoBox').classList.add('d-none');
            currentSisaKontrak = 0;
            document.getElementById('maxPayHint').innerText = 'Rp 0';
            return;
        }

        fetch('/pembayaran/realisasi-info/' + id)
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success' && result.data) {
                    const data = result.data;
                    document.getElementById('infoNamaPaket').innerText = data.nama_paket || '-';
                    document.getElementById('infoPenyedia').innerText = data.nama_perusahaan || '-';
                    document.getElementById('infoNilaiKontrak').innerText = formatRupiah(data.nilai_kontrak);
                    document.getElementById('infoTotalTerbayar').innerText = formatRupiah(data.total_terbayar);
                    document.getElementById('infoSisaKontrak').innerText = formatRupiah(data.sisa_kontrak);

                    currentSisaKontrak = parseFloat(data.sisa_kontrak) || 0;
                    document.getElementById('maxPayHint').innerText = formatRupiah(currentSisaKontrak);

                    if (data.nomor_bapsthp) document.getElementById('nomor_bapsthp').value = data.nomor_bapsthp;
                    if (data.nomor_bapb) document.getElementById('nomor_bapb').value = data.nomor_bapb;
                    if (data.tanggal_ba) document.getElementById('tanggal_ba').value = data.tanggal_ba;
                    if (data.nomor_ba) document.getElementById('nomor_ba').value = data.nomor_ba;

                    document.getElementById('realisasiInfoBox').classList.remove('d-none');
                    calculateTaxes();
                }
            })
            .catch(err => console.error(err));
    });

    // Trigger initial calculation if realisasi is already pre-selected
    if (realisasiSelect.value) {
        realisasiSelect.dispatchEvent(new Event('change'));
    }
});
</script>
