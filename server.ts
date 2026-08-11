import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SISTEM INFORMASI ANGGARAN & REALISASI KEUANGAN DINAS',
    database: 'db_keuangan_uptd',
    tahun: 2026,
    tables_count: 14
  });
});

// Tax Calculation API
app.post('/api/calculate-tax', (req, res) => {
  const { nilaiPembayaran, pph21 = 0 } = req.body;
  const nilai = parseFloat(nilaiPembayaran) || 0;
  const pph21Val = parseFloat(pph21) || 0;

  const dpp = nilai / 1.11;
  const ppn = Math.round((dpp * 0.11) * 100) / 100;
  const pph22 = Math.round((dpp * 0.015) * 100) / 100;
  const pph23_jasa = Math.round((dpp * 0.02) * 100) / 100;
  const pph23_makan = Math.round((nilai * 0.02) * 100) / 100;

  const total_pajak = Math.round((ppn + pph21Val + pph22 + pph23_jasa + pph23_makan) * 100) / 100;
  const nilai_bersih = Math.round((nilai - total_pajak) * 100) / 100;

  res.json({
    nilai_pembayaran: nilai,
    dpp: Math.round(dpp * 100) / 100,
    ppn,
    pph21: pph21Val,
    pph22,
    pph23_jasa,
    pph23_makan,
    total_pajak,
    nilai_bersih
  });
});

// Get File Content Endpoint
app.get('/api/file', (req, res) => {
  const filepath = req.query.path as string;
  if (!filepath) {
    return res.status(400).json({ error: 'Path parameter required' });
  }

  const safePath = path.resolve(__dirname, filepath.replace(/^\//, ''));
  if (!safePath.startsWith(__dirname)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    if (fs.existsSync(safePath)) {
      const content = fs.readFileSync(safePath, 'utf-8');
      return res.json({ path: filepath, content });
    } else {
      return res.status(404).json({ error: 'File not found' });
    }
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SIMKEU UPTD Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
