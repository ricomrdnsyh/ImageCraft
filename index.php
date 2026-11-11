<?php
// Otomatis arahkan atau muat tampilan aplikasi build dist di Laragon
if (file_exists(__DIR__ . '/dist/index.html')) {
    header('Location: dist/');
    exit;
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Convert & Enhance Gambar</title>
  <style>
    body { background: #020617; color: #f8fafc; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; text-align: center; }
    .card { background: #0f172a; padding: 2rem; border-radius: 1rem; border: 1px solid #1e293b; max-width: 500px; }
    code { background: #1e293b; padding: 0.2rem 0.4rem; border-radius: 0.25rem; color: #38bdf8; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Convert & Enhance Gambar</h2>
    <p>Jalankan <code>npm run dev</code> untuk live development, atau <code>npm run build</code> untuk memperbarui versi produksi.</p>
  </div>
</body>
</html>

