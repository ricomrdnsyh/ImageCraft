# Desain Teknis: Aplikasi Web Kompres & Peningkat Kualitas Gambar (Client-Side)

**Tanggal:** 2026-11-11  
**Status:** Disetujui  
**Target Platform:** Web Browser (Desktop & Mobile)  
**Lingkungan Kerja:** `c:\laragon\www\convert-gambar`  

---

## 1. Ringkasan Eksekutif & Tujuan

Aplikasi web sederhana, modern, dan cepat untuk kebutuhan:
1. **Kompresi Gambar:** Mengurangi ukuran file gambar (JPEG, PNG, WebP) dengan kontrol rasio kualitas, opsi pengubahan resolusi (*resize*), dan konversi format gambar.
2. **Peningkat Kualitas Gambar (Image Enhancer / Upscaler):** Meningkatkan resolusi dan ketajaman gambar buram/kecil menggunakan model AI Super-Resolution ringan (skala 2x dan 4x) serta penyesuaian filter ketajaman (*sharpening*) dan kontras.

Seluruh proses kompresi dan peningkatan kualitas berjalan **100% di sisi klien (Client-Side / Browser)** menggunakan WebAssembly dan WebGL. Tidak ada file gambar yang diunggah ke server pihak ketiga atau server backend, sehingga menjaga privasi pengguna, berbiaya hosting \$0, dan sangat cepat.

---

## 2. Arsitektur & Pilihan Teknologi

### 2.1 Tech Stack
* **Frontend Framework:** React 18 / 19 + TypeScript dengan Vite sebagai bundler/build tool.
  * *Output:* Static HTML/JS/CSS di folder `dist` yang bisa langsung dijalankan via Laragon (Apache/Nginx) atau di-host di platform static mana pun (Vercel, GitHub Pages, Netlify).
* **Styling:** Tailwind CSS (dengan Tailwind Typography & Lucide React untuk ikon modern).
* **Engine Kompresi:** HTML5 Canvas API + `browser-image-compression`.
* **Engine Peningkat Kualitas (AI Enhancer):** UpscalerJS / ONNX Runtime Web (dengan backend WebGL untuk akselerasi grafis di browser) dan algoritma filter ketajaman Canvas sebagai penyempurna.

### 2.2 Diagram Alur Arsitektur
```
[ Pengguna ] ─── Unggah Gambar ───> [ Validasi File (Tipe MIME & Ukuran) ]
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
            [ Tab 1: Kompresi ]                           [ Tab 2: Enhancer ]
                     │                                             │
      ┌──────────────┴──────────────┐               ┌──────────────┴──────────────┐
      ▼                             ▼               ▼                             ▼
[ Canvas / WebAssembly ]     [ Resize & Target ]  [ Model AI (WebGL) ]    [ Canvas Sharpen ]
      │                             │               │                             │
      └──────────────┬──────────────┘               └──────────────┬──────────────┘
                     ▼                                             ▼
          [ Hasil Kompresi ]                            [ Hasil Rekonstruksi HD ]
                     │                                             │
                     └──────────────────────┬──────────────────────┘
                                            ▼
                           [ Before/After Split Slider ]
                                            ▼
                           [ Unduh Gambar (JPG/PNG/WebP) ]
```

---

## 3. Fitur & Alur Pengguna (User Flow)

### 3.1 Navigasi Utama
Antarmuka satu halaman (*Single Page Application*) dengan tab navigasi di bagian atas:
1. **Tab "Kompres Gambar"**
2. **Tab "Tingkatkan Kualitas (AI)"**
Dilengkapi status badge privasi: *"100% Diproses di Browser Anda. Gambar Tidak Pernah Diunggah ke Server."*

---

### 3.2 Alur Fitur 1: Kompres Gambar
1. **Input:** Drag & drop atau klik file gambar (mendukung JPG, JPEG, PNG, WebP).
2. **Tampilan Awal:** Menampilkan informasi gambar asli (nama file, resolusi pixel, dan ukuran dalam KB/MB).
3. **Panel Kontrol Pengguna:**
   * **Slider Kualitas:** Nilai 10% s.d. 100% (default: 80%).
   * **Preset Skala Resize:** 100% (asli), 75%, 50%, 25%, atau input manual lebar (*width*)/tinggi (*height*) dengan kunci rasio aspek (*aspect ratio lock*).
   * **Format Output:** Opsi konversi ke `WebP` (rekomendasi ukuran minimal), `JPEG`, `PNG`, atau `Sama dengan Asli`.
4. **Pratinjau & Perbandingan:**
   * Komponen **Interactive Before/After Slider** yang dapat digeser untuk melihat perbandingan ketajaman sebelum vs sesudah kompresi secara instan.
   * Widget statistik: *Ukuran Asli vs Ukuran Hasil*, serta persentase penghematan (misal: *Hemat 78%*).
5. **Aksi Unduh:** Tombol *Download* dengan nama file yang disesuaikan (contoh: `gambar-compressed.webp`).

---

### 3.3 Alur Fitur 2: Tingkatkan Kualitas (AI Enhancer)
1. **Input:** Drag & drop atau klik gambar dengan resolusi rendah atau buram.
2. **Panel Kontrol Pengguna:**
   * **Faktor Upscale AI:** Pilihan **2x** (rekonstruksi 2x lebih besar) atau **4x** (rekonstruksi 4x lebih besar).
   * **Slider Filter Tambahan:**
     * Ketajaman (*Sharpening*): Menguatkan kontur dan garis detail objek.
     * Kontras & Kecerahan (*Contrast & Brightness*): Menyeimbangkan pencahayaan gambar.
3. **Proses & Indikator:**
   * Tombol *"Tingkatkan Sekarang"*.
   * Tampilan *Progress Bar* dan status proses animasi (Memuat Model AI -> Menjalankan Rekonstruksi Piksel -> Selesai).
4. **Pratinjau & Perbandingan:**
   * Komponen **Interactive Before/After Slider** untuk membandingkan foto buram/pecah asli dengan hasil restorasi AI resolusi tinggi.
   * Widget statistik dimensi: *Dimensi Asal (misal 400x400 px) → Dimensi Hasil (misal 1600x1600 px)*.
5. **Aksi Unduh:** Tombol *Download Gambar HD*.

---

## 4. Struktur Komponen & Kode Modular

Proyek akan disusun secara modular di folder `src/`:

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Header aplikasi, logo, dan status privasi
│   │   └── TabNav.tsx             # Switcher tab Kompres vs Tingkatkan
│   ├── common/
│   │   ├── Dropzone.tsx           # Area unggah berkas serbaguna
│   │   ├── ComparisonSlider.tsx   # Slider interaktif Before/After
│   │   ├── StatsBadge.tsx         # Indikator ukuran file dan resolusi
│   │   └── ProgressBar.tsx        # Indikator progres pemrosesan AI
│   ├── compressor/
│   │   ├── CompressorView.tsx     # Tampilan terintegrasi tab kompresi
│   │   └── CompressControls.tsx   # Slider kualitas, pilihan format, resize
│   └── enhancer/
│       ├── EnhancerView.tsx       # Tampilan terintegrasi tab enhancer
│       └── EnhanceControls.tsx    # Pemilih skala 2x/4x, sharpening slider
├── lib/
│   ├── imageCompressor.ts         # Logika kompresi & konversi Canvas/WASM
│   ├── imageEnhancer.ts           # Logika inferensi AI (Upscaler/WebGL) & filter
│   └── utils.ts                   # Format bytes, helper download file, dimensi
├── types/
│   └── index.ts                   # Tipe data TypeScript (ImageState, Options, dll.)
├── App.tsx                        # Root component pengatur state tab
└── main.tsx                       # Entry point aplikasi
```

---

## 5. Penanganan Error, Batasan Memori, & Performa

1. **Pencegahan Out-of-Memory (OOM) Browser:**
   * Jika gambar input memiliki resolusi > 2000×2000 px saat memilih opsi Upscale 4x, aplikasi menampilkan peringatan/rekomendasi untuk menggunakan skala 2x agar tab browser tidak kehabisan memori grafis (VRAM).
2. **Pembersihan Siklus Hidup Memori (Object URL Cleanup):**
   * Menggunakan `URL.revokeObjectURL(url)` secara disiplin setiap kali gambar diganti atau diproses ulang guna menghindari kebocoran memori RAM browser.
3. **Transparansi PNG:**
   * Kompresi PNG tetap mempertahankan kanal alfa (*transparent background*) dengan tidak memaksakan background putih kecuali pengguna memilih format JPEG.
4. **Fallback Akselerasi:**
   * Jika browser klien tidak memiliki WebGL (atau akselerasi grafis dimatikan), modul peningkat kualitas akan otomatis beralih (*fallback*) ke algoritma *bicubic sharpening filter* berbasis Canvas agar aplikasi tetap berfungsi tanpa crash.

---

## 6. Rencana Verifikasi & Pengujian

1. **Pengujian Kompresi:**
   * Uji dengan format JPEG ukuran > 4 MB, pastikan hasil kompresi berkurang > 60% tanpa degradasi visual yang parah.
   * Uji dengan format PNG transparan, pastikan latar belakang tetap transparan setelah dikompres.
   * Uji fitur konversi format (PNG -> WebP) dan pastikan file terunduh dengan ekstensi yang sesuai.
2. **Pengujian Peningkat Kualitas (Enhancer):**
   * Uji gambar beresolusi rendah (misal 300x300 px), terapkan Upscale 2x dan 4x, verifikasi resolusi bertambah menjadi 600x600 px dan 1200x1200 px.
   * Uji responsivitas slider perbandingan Before/After pada layar desktop dan simulasi layar smartphone.
3. **Pengujian Build & Integrasi:**
   * Jalankan `npm run build` untuk memverifikasi tidak ada error TypeScript maupun dependensi bundler.
   * Verifikasi bahwa hasil build static dapat dibuka dengan lancar di lingkungan Laragon.
