<!-- Edit Paket Pekerjaan View -->
<div class="card border-0 shadow-sm rounded-3 max-w-5xl mx-auto">
    <div class="card-header bg-white py-3 border-bottom d-flex align-items-center justify-content-between">
        <div>
            <h5 class="card-title fw-bold text-dark m-0"><i class="fa-solid fa-pen-to-square me-2 text-primary"></i>Edit Paket Pekerjaan & Alokasi Multi-Rekening</h5>
            <p class="text-muted fs-7 m-0">Perbarui Data Paket dan Distribusi Pagu Rekening</p>
        </div>
        <a href="<?= BASE_URL ?>paketpekerjaan/detail/<?= $paket['id'] ?>" class="btn btn-light btn-sm border"><i class="fa-solid fa-arrow-left me-1"></i> Kembali</a>
    </div>

    <div class="card-body p-4">
        <?php if (!empty($_SESSION['flash_error'])): ?>
            <div class="alert alert-danger alert-dismissible fade show fs-7" role="alert">
                <i class="fa-solid fa-triangle-exclamation me-2"></i><?= $_SESSION['flash_error']; unset($_SESSION['flash_error']); ?>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        <?php endif; ?>

        <form action="<?= BASE_URL ?>paketpekerjaan/update/<?= $paket['id'] ?>" method="POST" id="formPaket">
            <input type="hidden" name="csrf_token" value="<?= $csrf_token ?>">

            <!-- SECTION 1: HEADER PAKET -->
            <div class="bg-light p-3 rounded border mb-4">
                <h6 class="fw-bold text-dark fs-7 mb-3 border-bottom pb-2"><i class="fa-solid fa-diagram-project me-2 text-indigo-600"></i>1. Klasifikasi Sub-Kegiatan DPA</h6>
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold fs-7 text-dark">Program <span class="text-danger">*</span></label>
                        <select name="program_id" id="program_id" class="form-select form-select-sm" required>
                            <?php foreach ($programList as $prog): ?>
                                <option value="<?= $prog['id'] ?>" <?= ($paket['program_id'] == $prog['id']) ? 'selected' : '' ?>>
                                    [<?= htmlspecialchars($prog['kode_program']) ?>] <?= htmlspecialchars($prog['nama_program']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold fs-7 text-dark">Kegiatan <span class="text-danger">*</span></label>
                        <select name="kegiatan_id" id="kegiatan_id" class="form-select form-select-sm" required>
                            <?php foreach ($kegiatanList as $keg): ?>
                                <option value="<?= $keg['id'] ?>" <?= ($paket['kegiatan_id'] == $keg['id']) ? 'selected' : '' ?>>
                                    [<?= htmlspecialchars($keg['kode_kegiatan']) ?>] <?= htmlspecialchars($keg['nama_kegiatan']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>

                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold fs-7 text-dark">Sub-Kegiatan <span class="text-danger">*</span></label>
                        <select name="sub_kegiatan_id" id="sub_kegiatan_id" class="form-select form-select-sm" required>
                            <?php foreach ($subList as $sub): ?>
                                <option value="<?= $sub['id'] ?>" <?= ($paket['sub_kegiatan_id'] == $sub['id']) ? 'selected' : '' ?>>
                                    [<?= htmlspecialchars($sub['kode_sub_kegiatan']) ?>] <?= htmlspecialchars($sub['nama_sub_kegiatan']) ?>
                                </option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
            </div>

            <!-- SECTION 2: IDENTITAS PAKET -->
            <div class="bg-light p-3 rounded border mb-4">
                <h6 class="fw-bold text-dark fs-7 mb-3 border-bottom pb-2"><i class="fa-solid fa-file-contract me-2 text-indigo-600"></i>2. Identitas & Total Pagu Paket</h6>
                <div class="row g-3">
                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold fs-7 text-dark">Nomor Paket <span class="text-danger">*</span></label>
                        <input type="text" name="nomor_paket" value="<?= htmlspecialchars($paket['nomor_paket']) ?>" class="form-control form-control-sm font-mono" required>
                    </div>

                    <div class="col-12 col-md-8">
                        <label class="form-label fw-bold fs-7 text-dark">Nama Paket Pekerjaan <span class="text-danger">*</span></label>
                        <input type="text" name="nama_paket" value="<?= htmlspecialchars($paket['nama_paket']) ?>" class="form-control form-control-sm" required>
                    </div>

                    <div class="col-12 col-md-6">
                        <label class="form-label fw-bold fs-7 text-dark">Total Pagu Paket (Rp) <span class="text-danger">*</span></label>
                        <div class="input-group input-group-sm">
                            <span class="input-group-text fw-bold">Rp</span>
                            <input type="number" name="pagu_paket" id="pagu_paket" value="<?= $paket['pagu_paket'] ?>" class="form-control form-control-sm font-mono fw-bold text-primary fs-6" required min="1" oninput="calculateTotalRekening()">
                        </div>
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label fw-bold fs-7 text-dark">Tahun Anggaran</label>
                        <input type="text" name="tahun_anggaran" value="<?= htmlspecialchars($paket['tahun_anggaran']) ?>" class="form-control form-control-sm font-mono" readonly>
                    </div>

                    <div class="col-12 col-md-3">
                        <label class="form-label fw-bold fs-7 text-dark">Status Paket</label>
                        <select name="status" class="form-select form-select-sm">
                            <option value="AKTIF" <?= ($paket['status'] === 'AKTIF') ? 'selected' : '' ?>>AKTIF</option>
                            <option value="DRAFT" <?= ($paket['status'] === 'DRAFT') ? 'selected' : '' ?>>DRAFT</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-bold fs-7 text-dark">Keterangan Tambahan</label>
                        <input type="text" name="keterangan" value="<?= htmlspecialchars($paket['keterangan'] ?? '') ?>" class="form-control form-control-sm">
                    </div>
                </div>
            </div>

            <!-- SECTION 3: MULTI-REKENING ALLOCATION -->
            <div class="bg-white p-3 rounded border mb-4">
                <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
                    <h6 class="fw-bold text-dark fs-7 m-0"><i class="fa-solid fa-list-ol me-2 text-indigo-600"></i>3. Alokasi Multi-Rekening Belanja</h6>
                    <button type="button" class="btn btn-sm btn-outline-success fw-bold" onclick="addRekeningRow()">
                        <i class="fa-solid fa-plus me-1"></i> Tambah Rekening
                    </button>
                </div>

                <div class="table-responsive">
                    <table class="table table-sm table-bordered align-middle fs-7" id="tableRekening">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 60%;">Rekening Belanja</th>
                                <th class="text-end" style="width: 35%;">Pagu Rekening (Rp)</th>
                                <th class="text-center" style="width: 5%;">Aksi</th>
                            </tr>
                        </thead>
                        <tbody id="rekeningContainer">
                            <?php foreach ($paket['rekening_list'] as $pkr): ?>
                                <tr class="rekening-row">
                                    <td>
                                        <select name="rekening_id[]" class="form-select form-select-sm" required>
                                            <option value="">-- Pilih Rekening Belanja --</option>
                                            <?php foreach ($rekeningList as $rek): ?>
                                                <option value="<?= $rek['id'] ?>" <?= ($pkr['rekening_id'] == $rek['id']) ? 'selected' : '' ?>>
                                                    [<?= htmlspecialchars($rek['kode_rekening']) ?>] <?= htmlspecialchars($rek['nama_rekening']) ?>
                                                </option>
                                            <?php endforeach; ?>
                                        </select>
                                    </td>
                                    <td>
                                        <div class="input-group input-group-sm">
                                            <span class="input-group-text">Rp</span>
                                            <input type="number" name="pagu_rekening[]" value="<?= $pkr['pagu_rekening'] ?>" class="form-control form-control-sm font-mono text-end pagu-rekening-input" required min="0" oninput="calculateTotalRekening()">
                                        </div>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeRekeningRow(this)"><i class="fa-solid fa-xmark"></i></button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                        <tfoot class="table-light fw-bold">
                            <tr>
                                <td class="text-end">Total Pagu Rekening:</td>
                                <td class="text-end font-mono fs-6 text-primary" id="displayTotalRekening">Rp 0</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="text-end">Sisa Alokasi Paket:</td>
                                <td class="text-end font-mono fs-6" id="displaySisaPaket">Rp 0</td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div id="validationAlert" class="alert alert-danger fs-7 m-0 d-none">
                    <i class="fa-solid fa-triangle-exclamation me-2"></i><strong>Peringatan Validasi:</strong> Total Pagu Rekening melebihi Pagu Paket!
                </div>
            </div>

            <div class="d-flex justify-content-end gap-2 border-top pt-3">
                <a href="<?= BASE_URL ?>paketpekerjaan/detail/<?= $paket['id'] ?>" class="btn btn-light btn-sm border">Batal</a>
                <button type="submit" id="btnSubmit" class="btn btn-primary btn-sm fw-bold"><i class="fa-solid fa-save me-1"></i> Perbarui Paket Pekerjaan</button>
            </div>
        </form>
    </div>
</div>

<script>
const rekeningOptionsHTML = `<?php foreach ($rekeningList as $rek): ?>
    <option value="<?= $rek['id'] ?>">[<?= htmlspecialchars($rek['kode_rekening']) ?>] <?= htmlspecialchars($rek['nama_rekening']) ?></option>
<?php endforeach; ?>`;

function addRekeningRow() {
    const container = document.getElementById('rekeningContainer');
    const tr = document.createElement('tr');
    tr.className = 'rekening-row';
    tr.innerHTML = `
        <td>
            <select name="rekening_id[]" class="form-select form-select-sm" required>
                <option value="">-- Pilih Rekening Belanja --</option>
                ${rekeningOptionsHTML}
            </select>
        </td>
        <td>
            <div class="input-group input-group-sm">
                <span class="input-group-text">Rp</span>
                <input type="number" name="pagu_rekening[]" class="form-control form-control-sm font-mono text-end pagu-rekening-input" required min="0" value="0" oninput="calculateTotalRekening()">
            </div>
        </td>
        <td class="text-center">
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="removeRekeningRow(this)"><i class="fa-solid fa-xmark"></i></button>
        </td>
    `;
    container.appendChild(tr);
    calculateTotalRekening();
}

function removeRekeningRow(btn) {
    const rows = document.querySelectorAll('.rekening-row');
    if (rows.length <= 1) {
        alert('Minimal harus ada 1 baris rekening!');
        return;
    }
    btn.closest('tr').remove();
    calculateTotalRekening();
}

function calculateTotalRekening() {
    const paguPaket = parseFloat(document.getElementById('pagu_paket').value) || 0;
    const inputs = document.querySelectorAll('.pagu-rekening-input');
    let totalRekening = 0;

    inputs.forEach(input => {
        totalRekening += parseFloat(input.value) || 0;
    });

    const sisa = paguPaket - totalRekening;

    document.getElementById('displayTotalRekening').innerText = 'Rp ' + totalRekening.toLocaleString('id-ID');
    
    const displaySisa = document.getElementById('displaySisaPaket');
    displaySisa.innerText = 'Rp ' + sisa.toLocaleString('id-ID');

    const alertBox = document.getElementById('validationAlert');
    const btnSubmit = document.getElementById('btnSubmit');

    if (totalRekening > paguPaket && paguPaket > 0) {
        displaySisa.className = 'text-end font-mono fs-6 text-danger fw-bold';
        alertBox.classList.remove('d-none');
        btnSubmit.disabled = true;
    } else {
        displaySisa.className = 'text-end font-mono fs-6 text-success fw-bold';
        alertBox.classList.add('d-none');
        btnSubmit.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', calculateTotalRekening);
</script>
