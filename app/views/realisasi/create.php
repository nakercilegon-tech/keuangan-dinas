<!-- /app/views/realisasi/create.php -->
<!-- Form Tambah Realisasi Pekerjaan Baru (Tahap 5) -->

<div class="container-fluid px-4 py-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
            <h4 class="fw-bold mb-1"><i class="bi bi-file-earmark-plus me-2"></i>Input Realisasi / Kontrak Pekerjaan</h4>
            <p class="text-muted small mb-0">Lengkapi data Surat Pesanan, Rekanan Penyedia, Alokasi Multi-Rekening, dan BA</p>
        </div>
        <a href="/realisasi" class="btn btn-outline-secondary btn-sm rounded-pill px-3">
            <i class="bi bi-arrow-left me-1"></i> Kembali ke Daftar
        </a>
    </div>

    <form method="POST" action="/realisasi/store" id="formRealisasi">
        <input type="hidden" name="csrf_token" value="<?= $data['csrf_token'] ?>">

        <div class="row g-4">
            <!-- Left Column: Selection & Auto Fill Info -->
            <div class="col-lg-7">
                <!-- 1. PILIH PAKET PEKERJAAN (AJAX AUTO FILL) -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-primary text-white py-2 fw-semibold">
                        <i class="bi bi-box-seam me-2"></i>1. Pilih Paket Pekerjaan (Auto-Fill Program & Sub-Kegiatan)
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold text-dark">Pilih Paket Pekerjaan <span class="text-danger">*</span></label>
                            <select name="paket_id" id="paket_id" class="form-select" required onchange="loadPaketDetailAjax(this.value)">
                                <option value="">-- Pilih Paket Pekerjaan --</option>
                                <?php foreach ($data['paketList'] as $p): ?>
                                    <option value="<?= $p['id'] ?>">
                                        <?= htmlspecialchars($p['nomor_paket']) ?> - <?= htmlspecialchars($p['nama_paket']) ?> (Pagu Paket: Rp <?= number_format($p['pagu_paket'], 0, ',', '.') ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                            <small class="text-muted">Memilih paket akan otomatis mengisikan Program, Kegiatan, Sub-Kegiatan, Pagu Paket, dan Daftar Rekening.</small>
                        </div>

                        <!-- Auto-filled Paket Info Box -->
                        <div id="paketInfoBox" class="p-3 bg-light rounded border border-secondary-subtle d-none">
                            <div class="row g-2 text-sm">
                                <div class="col-md-12">
                                    <span class="badge bg-primary me-1" id="lblKodeProgram">-</span>
                                    <span class="fw-bold" id="lblNamaProgram">-</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="badge bg-secondary me-1" id="lblKodeKegiatan">-</span>
                                    <span class="text-dark" id="lblNamaKegiatan">-</span>
                                </div>
                                <div class="col-md-12">
                                    <span class="badge bg-info text-dark me-1" id="lblKodeSubKegiatan">-</span>
                                    <span class="fw-semibold text-dark" id="lblNamaSubKegiatan">-</span>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <small class="text-muted d-block">Pagu Paket:</small>
                                    <span class="fs-6 fw-bold text-success" id="lblPaguPaket">Rp 0</span>
                                </div>
                                <div class="col-md-6 mt-2">
                                    <small class="text-muted d-block">Tahun Anggaran:</small>
                                    <span class="fw-bold text-dark" id="lblTahunAnggaran">2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. PILIH PENYEDIA / REKANAN (AJAX AUTO FILL) -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-dark text-white py-2 fw-semibold">
                        <i class="bi bg-building me-2"></i>2. Data Penyedia / Rekanan (Auto-Fill Profile & Rekening Bank)
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Pilih Perusahaan / Penyedia <span class="text-danger">*</span></label>
                            <select name="penyedia_id" id="penyedia_id" class="form-select" required onchange="loadPenyediaDetailAjax(this.value)">
                                <option value="">-- Pilih Rekanan Penyedia --</option>
                                <?php foreach ($data['penyediaList'] as $py): ?>
                                    <option value="<?= $py['id'] ?>">
                                        <?= htmlspecialchars($py['nama_perusahaan']) ?> (a.n <?= htmlspecialchars($py['nama_penyedia']) ?>)
                                    </option>
                                <?php endforeach; ?>
                            </select>
                        </div>

                        <!-- Auto-filled Penyedia Info Box -->
                        <div id="penyediaInfoBox" class="p-3 bg-light rounded border border-secondary-subtle d-none">
                            <div class="row g-2 text-sm">
                                <div class="col-md-6">
                                    <small class="text-muted d-block">Nama Perusahaan:</small>
                                    <span class="fw-bold text-dark" id="lblNamaPerusahaan">-</span>
                                </div>
                                <div class="col-md-6">
                                    <small class="text-muted d-block">Direktur / Penanggung Jawab:</small>
                                    <span class="fw-bold text-dark" id="lblNamaPenyedia">-</span>
                                </div>
                                <div class="col-md-6">
                                    <small class="text-muted d-block">NPWP Perusahaan:</small>
                                    <span class="font-monospace fw-bold text-primary" id="lblNpwp">-</span>
                                </div>
                                <div class="col-md-6">
                                    <small class="text-muted d-block">Bank & No. Rekening:</small>
                                    <span class="fw-bold text-dark" id="lblBankRekening">-</span>
                                </div>
                                <div class="col-md-12">
                                    <small class="text-muted d-block">Alamat Perusahaan:</small>
                                    <span class="text-muted" id="lblAlamatPenyedia">-</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. RINCIAN MULTI-REKENING BELANJA -->
                <div class="card border-0 shadow-sm mb-4">
                    <div class="card-header bg-secondary text-white py-2 fw-semibold">
                        <i class="bi bi-list-check me-2"></i>3. Alokasi Nilai Realisasi Multi-Rekening
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-bordered align-middle mb-0 text-sm" id="tableMultiRekening">
                                <thead class="table-light">
                                    <tr>
                                        <th>Kode & Nama Rekening</th>
                                        <th class="text-end" style="width: 160px;">Pagu Rekening</th>
                                        <th class="text-end" style="width: 200px;">Nilai Realisasi (Rp)</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyMultiRekening">
                                    <tr>
                                        <td colspan="3" class="text-center text-muted py-3">Pilih Paket Pekerjaan terlebih dahulu untuk memuat daftar rekening.</td>
                                    </tr>
                                </tbody>
                                <tfoot class="table-light fw-bold">
                                    <tr>
                                        <td class="text-end">Total Realisasi Rekening:</td>
                                        <td class="text-end text-muted" id="footTotalPagu">Rp 0</td>
                                        <td class="text-end text-primary fs-6" id="footTotalRealisasi">Rp 0</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Form Inputs Transaksi Realisasi -->
            <div class="col-lg-5">
                <div class="card border-0 shadow-sm sticky-top" style="top: 1rem;">
                    <div class="card-header bg-dark text-white py-2 fw-semibold">
                        <i class="bi bi-card-checklist me-2"></i>4. Data Surat Pesanan (SP) & Berita Acara
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Nomor SP / Kontrak <span class="text-danger">*</span></label>
                            <input type="text" name="nomor_sp" id="nomor_sp" class="form-control font-monospace fw-bold text-primary" value="<?= $data['nomorSpAuto'] ?>" required>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Tanggal SP</label>
                                <input type="date" name="tanggal_sp" id="tanggal_sp" class="form-control form-control-sm" value="<?= date('Y-m-d') ?>" required>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Lama Pekerjaan (Hari)</label>
                                <input type="number" name="lama_pekerjaan" id="lama_pekerjaan" class="form-control form-control-sm" value="30" required onchange="calcTanggalSelesai()">
                            </div>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Tanggal Mulai</label>
                                <input type="date" name="tanggal_mulai" id="tanggal_mulai" class="form-control form-control-sm" value="<?= date('Y-m-d') ?>" required onchange="calcTanggalSelesai()">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label fw-bold small">Tanggal Selesai</label>
                                <input type="date" name="tanggal_selesai" id="tanggal_selesai" class="form-control form-control-sm" value="<?= date('Y-m-d', strtotime('+30 days')) ?>" required>
                            </div>
                        </div>

                        <div class="mb-3 p-3 bg-primary-subtle rounded border border-primary-subtle">
                            <label class="form-label fw-bold text-primary mb-1">Nilai Kontrak / Realisasi (Rp) <span class="text-danger">*</span></label>
                            <input type="number" name="nilai_kontrak" id="nilai_kontrak" class="form-control form-control-lg fw-bold text-end" placeholder="0" step="1000" required onkeyup="validateNilaiKontrak()" onchange="validateNilaiKontrak()">
                            <small id="errNilaiKontrak" class="text-danger d-block mt-1 fw-semibold"></small>
                        </div>

                        <hr class="my-3">

                        <!-- Data BA (Berita Acara) -->
                        <h6 class="fw-bold text-secondary mb-3"><i class="bi bi-file-text me-1"></i>Dokumen Berita Acara (BAPSTHP & BAPB)</h6>

                        <div class="row g-2 mb-2">
                            <div class="col-md-6">
                                <label class="form-label small">Nomor BAPSTHP</label>
                                <input type="text" name="nomor_bapsthp" class="form-control form-control-sm" placeholder="BAPSTHP/2026/001">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small">Nomor BAPB</label>
                                <input type="text" name="nomor_bapb" class="form-control form-control-sm" placeholder="BAPB/2026/001">
                            </div>
                        </div>

                        <div class="row g-2 mb-3">
                            <div class="col-md-6">
                                <label class="form-label small">Nomor BA Pembayaran</label>
                                <input type="text" name="nomor_ba" class="form-control form-control-sm" placeholder="BA/2026/001">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label small">Tanggal BA</label>
                                <input type="date" name="tanggal_ba" class="form-control form-control-sm">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold small">Status Transaksi Pekerjaan</label>
                            <select name="status" class="form-select form-select-sm">
                                <option value="proses" selected>Proses Pekerjaan</option>
                                <option value="selesai">Selesai Pekerjaan</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        <div class="d-grid mt-4">
                            <button type="submit" id="btnSubmit" class="btn btn-primary btn-lg shadow-sm">
                                <i class="bi bi-save me-1"></i> Simpan Transaksi Realisasi
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- AJAX JavaScript handlers for Tahap 5 -->
<script>
let currentPaguPaket = 0;

function loadPaketDetailAjax(paketId) {
    if (!paketId) {
        document.getElementById('paketInfoBox').classList.add('d-none');
        document.getElementById('tbodyMultiRekening').innerHTML = '<tr><td colspan="3" class="text-center text-muted py-3">Pilih Paket Pekerjaan terlebih dahulu.</td></tr>';
        return;
    }

    fetch('/realisasi/ajaxPaketDetail/' + paketId)
        .then(res => res.json())
        .then(res => {
            if (res.status === 'success') {
                const p = res.data;
                currentPaguPaket = parseFloat(p.pagu_paket);

                document.getElementById('lblKodeProgram').innerText = p.kode_program;
                document.getElementById('lblNamaProgram').innerText = p.nama_program;
                document.getElementById('lblKodeKegiatan').innerText = p.kode_kegiatan;
                document.getElementById('lblNamaKegiatan').innerText = p.nama_kegiatan;
                document.getElementById('lblKodeSubKegiatan').innerText = p.kode_sub_kegiatan;
                document.getElementById('lblNamaSubKegiatan').innerText = p.nama_sub_kegiatan;
                document.getElementById('lblPaguPaket').innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(p.pagu_paket);
                document.getElementById('lblTahunAnggaran').innerText = p.tahun_anggaran;

                document.getElementById('paketInfoBox').classList.remove('d-none');

                // Render Multi-Rekening
                let html = '';
                let totalPaguRek = 0;
                if (p.rekening_list && p.rekening_list.length > 0) {
                    p.rekening_list.forEach((rek, idx) => {
                        totalPaguRek += parseFloat(rek.pagu_rekening);
                        html += `
                            <tr>
                                <td>
                                    <div class="font-monospace fw-bold text-dark">${rek.kode_rekening}</div>
                                    <div>${rek.nama_rekening}</div>
                                    <input type="hidden" name="paket_rekening_id[]" value="${rek.id}">
                                </td>
                                <td class="text-end fw-semibold text-muted">
                                    Rp ${new Intl.NumberFormat('id-ID').format(rek.pagu_rekening)}
                                </td>
                                <td>
                                    <input type="number" name="nilai_realisasi[]" class="form-control form-control-sm text-end input-real-rek" 
                                           value="${rek.pagu_rekening}" max="${rek.pagu_rekening}" onkeyup="calcTotalRealisasiRekening()" onchange="calcTotalRealisasiRekening()">
                                </td>
                            </tr>
                        `;
                    });
                } else {
                    html = '<tr><td colspan="3" class="text-center text-muted">Belum ada alokasi rekening pada paket ini.</td></tr>';
                }

                document.getElementById('tbodyMultiRekening').innerHTML = html;
                document.getElementById('footTotalPagu').innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(totalPaguRek);
                
                // Auto set initial Nilai Kontrak
                document.getElementById('nilai_kontrak').value = p.pagu_paket;
                calcTotalRealisasiRekening();
                validateNilaiKontrak();
            }
        });
}

function loadPenyediaDetailAjax(penyediaId) {
    if (!penyediaId) {
        document.getElementById('penyediaInfoBox').classList.add('d-none');
        return;
    }

    fetch('/realisasi/ajaxPenyediaDetail/' + penyediaId)
        .then(res => res.json())
        .then(res => {
            if (res.status === 'success') {
                const py = res.data;
                document.getElementById('lblNamaPerusahaan').innerText = py.nama_perusahaan;
                document.getElementById('lblNamaPenyedia').innerText = py.nama_penyedia;
                document.getElementById('lblNpwp').innerText = py.npwp;
                document.getElementById('lblBankRekening').innerText = py.nama_bank + ' - ' + py.nomor_rekening + ' (a.n ' + py.pemegang_rekening + ')';
                document.getElementById('lblAlamatPenyedia').innerText = py.alamat;
                document.getElementById('penyediaInfoBox').classList.remove('d-none');
            }
        });
}

function calcTotalRealisasiRekening() {
    let inputs = document.querySelectorAll('.input-real-rek');
    let total = 0;
    inputs.forEach(inp => {
        total += parseFloat(inp.value) || 0;
    });

    document.getElementById('footTotalRealisasi').innerText = 'Rp ' + new Intl.NumberFormat('id-ID').format(total);
}

function calcTanggalSelesai() {
    let tglMulai = document.getElementById('tanggal_mulai').value;
    let lama = parseInt(document.getElementById('lama_pekerjaan').value) || 0;

    if (tglMulai && lama > 0) {
        let dt = new Date(tglMulai);
        dt.setDate(dt.getDate() + lama);
        let yyyy = dt.getFullYear();
        let mm = String(dt.getMonth() + 1).padStart(2, '0');
        let dd = String(dt.getDate()).padStart(2, '0');
        document.getElementById('tanggal_selesai').value = `${yyyy}-${mm}-${dd}`;
    }
}

function validateNilaiKontrak() {
    let nilai = parseFloat(document.getElementById('nilai_kontrak').value) || 0;
    let errElem = document.getElementById('errNilaiKontrak');
    let btn = document.getElementById('btnSubmit');

    if (currentPaguPaket > 0 && nilai > currentPaguPaket) {
        errElem.innerText = '❌ Nilai Kontrak (Rp ' + new Intl.NumberFormat('id-ID').format(nilai) + ') melebihi Pagu Paket (Rp ' + new Intl.NumberFormat('id-ID').format(currentPaguPaket) + ')!';
        btn.disabled = true;
    } else {
        errElem.innerText = '';
        btn.disabled = false;
    }
}
</script>
