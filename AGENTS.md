# AGENTS.md — Jejak Peradaban: Takhta yang Kosong

Dokumen ini adalah panduan utama untuk AI coding agent yang bekerja di repository/folder proyek ini. Baca sebelum mengubah file. Ikuti instruksi ini sepanjang sesi, termasuk saat memperbaiki error dan menerima prompt lanjutan.

## 1. Misi proyek

Bangun proof-of-concept video animasi sejarah sinematik menggunakan **Remotion + React**.

- Judul seri: **JEJAK PERADABAN**
- Episode: **Takhta yang Kosong**
- Topik: kematian Alexander Agung pada 323 SM dan perebutan kekuasaan oleh para penerusnya.
- Output pertama: teaser vertikal berdurasi **45 detik**.
- Target output: **1080 × 1920**, **30 fps**, **1350 frame**, MP4 dengan codec H.264.
- Bahasa narasi dan teks layar: Bahasa Indonesia.
- Pengguna adalah pemula dalam editing video dan ilustrasi. Kode harus terstruktur, mudah dipahami, dan mudah disesuaikan.

Ini adalah teaser/proof-of-concept, bukan video dokumenter penuh berdurasi 10–11 menit.

## 2. Aturan kerja agent

1. **Periksa kondisi proyek sebelum bertindak.** Baca `package.json`, struktur folder, file entry point, dan dokumentasi yang ada. Jangan menghapus atau menimpa pekerjaan pengguna tanpa memeriksa isinya.
2. Periksa lingkungan: jalankan `node -v` dan `npm -v`. Jika tidak tersedia, jelaskan masalah dan berikan instruksi yang jelas; jangan berpura-pura bisa melanjutkan pengujian.
3. Gunakan dokumentasi Remotion yang sesuai dengan versi dependency proyek. Jika Agent Skills Remotion tersedia, baca dan gunakan skill yang relevan, terutama best practices, create, markup, maps, studio, dan render.
4. Jika folder belum menjadi proyek Remotion, buat proyek menggunakan alur resmi Remotion. Contoh alur CLI yang dapat digunakan setelah memastikan folder tujuan aman:
   - `npx create-video@latest --yes --blank <nama-folder>`
   - masuk ke folder proyek
   - instal Agent Skills dengan perintah resmi yang sesuai dokumentasi terkini
   - jalankan `npm run dev`
   Jangan jalankan perintah scaffold yang membuat folder baru di dalam folder proyek yang sudah benar, dan jangan menjalankan scaffold di atas proyek yang sudah ada.
5. Sebelum menambah library, tanyakan apakah fitur itu benar-benar membutuhkannya. Prioritaskan kemampuan bawaan Remotion, React, CSS, SVG, dan aset lokal.
6. Jangan menggunakan API berbayar, token rahasia, layanan cloud berbayar, atau asset berlisensi yang tidak jelas untuk prototipe ini. Jangan menaruh secret di source code.
7. Jangan menggunakan `setTimeout`, `setInterval`, animasi CSS yang berjalan sendiri, atau logika berbasis waktu browser untuk mengatur adegan. Animasi video harus deterministik berdasarkan frame Remotion, misalnya `useCurrentFrame()`, `useVideoConfig()`, `interpolate()`, dan `spring()` sesuai kebutuhan.
8. Gunakan komponen kecil yang reusable. Hindari satu file besar yang memuat seluruh video jika pemisahan komponen akan meningkatkan keterbacaan.
9. Jangan mengarang hasil test. Laporkan dengan jujur perintah yang benar-benar dijalankan, hasilnya, kendala, dan pekerjaan yang belum selesai.
10. Jangan merender video panjang atau berkali-kali tanpa kebutuhan. Mulai dengan preview dan pemeriksaan frame, kemudian lakukan render final ketika komposisi stabil.
11. Jika ada instruksi yang bertentangan, utamakan keselamatan file pengguna, dokumentasi resmi Remotion untuk API, lalu brief proyek ini. Jelaskan keputusan penting secara singkat.

## 3. Arahan kreatif dan visual

### Nuansa

Ciptakan rasa dokumenter sejarah premium: dramatis, serius, atmosferik, bertekstur, dan sinematik. Hindari tampilan template generik, UI aplikasi, emoji dekoratif, efek berlebihan, atau transisi yang terasa seperti slideshow.

### Palet

Gunakan palet yang konsisten dan hemat:
- Oker / pasir: nuansa gurun dan batu kuno.
- Biru lapis lazuli: aksen kerajaan dan peta.
- Perunggu: aksen artefak dan garis.
- Krem: teks utama dan detail peta.
- Hitam / cokelat sangat gelap: latar dan adegan dramatis.

Definisikan warna sebagai design tokens agar mudah disesuaikan.

### Komposisi dan gerak

- Gunakan layering 2.5D yang ringan: foreground, midground, background, parallax sederhana, slow push-in, pan, dan pergerakan debu.
- Bangun animasi dari SVG, CSS, gradient, bentuk geometris, tekstur lokal, dan aset lokal yang tersedia.
- Gunakan tipografi yang kuat dan terbaca pada layar ponsel. Pastikan teks tidak terpotong dan aman dari area UI platform.
- Gunakan transisi yang bermotivasi secara naratif: fade, dissolve, masked reveal, atau pergerakan kamera semu yang halus.
- Jangan memenuhi layar dengan teks. Satu pesan visual utama per adegan.
- Hindari efek film grain atau partikel yang terlalu berat sehingga render lambat.
- Pastikan komposisi tetap menarik tanpa mengandalkan gambar eksternal yang gagal dimuat.

### Aset dan hak cipta

- Utamakan aset lokal yang dibuat untuk proyek ini menggunakan SVG/CSS atau aset yang lisensinya jelas.
- Jangan mengandalkan hotlink gambar dari internet. Render harus tetap berfungsi offline setelah dependency dan aset lokal tersedia.
- Jangan menggunakan foto, ilustrasi, musik, font, atau rekaman yang hak pakainya tidak jelas.
- Jika aset berlisensi diperlukan, jelaskan sumber, lisensi, dan langkah pemasangannya. Jangan mengklaim suatu aset bebas hak cipta tanpa verifikasi.
- Untuk musik dan sound design awal, boleh sediakan placeholder atau petunjuk cue audio; jangan mengunduh atau menanam audio berhak cipta tanpa izin.

## 4. Storyboard teaser 45 detik

Buat satu komposisi utama bernama jelas, misalnya `TakhtaKosongTeaser`, dengan durasi tepat 45 detik pada 30 fps.

### Adegan 1 — 00:00–00:08 (frame 0–239)
**Fungsi:** membangun misteri dan suasana.

- Mulai dari gelap.
- Siluet arsitektur istana Babilonia muncul perlahan dari kegelapan dan debu.
- Kamera virtual bergerak perlahan mendekat.
- Teks sangat minimal, bila diperlukan.
- Jangan menampilkan detail sejarah yang tidak bisa dipertanggungjawabkan sebagai fakta spesifik.

### Adegan 2 — 00:08–00:18 (frame 240–539)
**Fungsi:** menunjukkan kekosongan kekuasaan.

- Close-up ilustratif: tekstur batu, kain, bayangan prajurit, pintu atau lorong istana.
- Gunakan komposisi dan pencahayaan untuk membangun ketegangan.
- Gerakan harus halus dan terarah; hindari potongan acak.

### Adegan 3 — 00:18–00:30 (frame 540–899)
**Fungsi:** memberi konteks geografis.

- Tampilkan peta ilustratif kawasan Makedonia, Mesir, dan wilayah bekas imperium Alexander sesuai kebutuhan narasi.
- Sorot Babilonia sebagai lokasi kematian Alexander.
- Label harus terbaca, tidak tumpang tindih, dan ditempatkan dengan akurat secara geografis.
- Peta boleh bersifat stilisasi artistik, tetapi jangan menampilkan batas negara modern seolah-olah merupakan batas politik abad ke-4 SM.
- Jika peta historis yang akurat belum tersedia, nyatakan atau dokumentasikan bahwa peta merupakan ilustrasi skematis.

### Adegan 4 — 00:30–00:40 (frame 900–1199)
**Fungsi:** mengajukan pertanyaan utama.

Tampilkan pertanyaan utama secara dramatis dan terbaca:

**“Siapa yang akan mewarisi imperium ini?”**

Gunakan jeda, kontras, dan gerakan kamera semu untuk memberi bobot. Jangan menambah paragraf penjelasan.

### Adegan 5 — 00:40–00:45 (frame 1200–1349)
**Fungsi:** title card.

- Tampilkan judul **JEJAK PERADABAN**.
- Subjudul **TAKHTA YANG KOSONG**.
- Komposisi harus terasa sebagai penutup teaser dokumenter, bukan bumper generik.
- Pastikan seluruh teks muat dengan nyaman di layar vertikal.

Rentang frame di atas adalah panduan storyboard. Pastikan tidak ada gap atau overlap yang tidak disengaja, dan total durasi tetap 1350 frame.

## 5. Batasan dan kehati-hatian sejarah

Narasi inti yang menjadi landasan teaser:
- Alexander Agung meninggal di Babilonia pada 323 SM.
- Tidak ada penyelesaian suksesi yang langsung dan stabil.
- Para penerusnya kemudian bersaing memperebutkan kekuasaan dan wilayah.
- Pertikaian para penerus berlanjut selama beberapa dekade.

Untuk teaser singkat, jangan memasukkan terlalu banyak nama, klaim, atau tanggal jika tidak diperlukan.

**Pisahkan dengan jelas:**
- Fakta sejarah yang kuat dukungannya.
- Tradisi atau kisah dari sumber kuno.
- Hal yang masih diperdebatkan sejarawan.
- Rekonstruksi kreatif yang dibuat demi visual.

Jangan mengarang kutipan, dialog historis, sumber primer, atau detail kostum/arsitektur seolah-olah semuanya pasti akurat. Jika menambahkan klaim faktual baru, verifikasi melalui sumber tepercaya dan catat referensi di dokumentasi proyek. Hindari menampilkan rekonstruksi artistik sebagai rekaman autentik.

## 6. Struktur proyek yang disarankan

Pertahankan struktur yang dibuat oleh template jika sudah baik. Jika memulai dari nol, gunakan struktur yang sederhana, misalnya:

```text
jejak-peradaban-remotion/
├── public/
│   ├── images/
│   ├── audio/
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── DustParticles.tsx
│   │   ├── CinematicBackground.tsx
│   │   ├── MapScene.tsx
│   │   ├── SceneTitle.tsx
│   │   └── TitleCard.tsx
│   ├── scenes/
│   │   ├── OpeningScene.tsx
│   │   ├── PalaceDetailScene.tsx
│   │   ├── BabylonMapScene.tsx
│   │   ├── SuccessionQuestionScene.tsx
│   │   └── EndCardScene.tsx
│   ├── theme/
│   │   └── tokens.ts
│   ├── Root.tsx
│   └── index.ts
├── out/
├── README.md
└── AGENTS.md
```

Nama file di atas hanyalah saran. Sesuaikan dengan template aktual dan jangan membuat duplikasi struktur yang tidak diperlukan.

## 7. Kriteria kualitas dan verifikasi

Sebelum menyatakan pekerjaan selesai:

### Proyek
- [ ] Dependency terpasang tanpa error fatal.
- [ ] Entry point dan composition terdaftar dengan benar.
- [ ] Tidak ada import yang rusak atau aset lokal yang hilang.
- [ ] Tidak ada error console yang mengganggu preview.

### Video
- [ ] Durasi 45 detik, 30 fps, 1350 frame.
- [ ] Resolusi komposisi 1080 × 1920.
- [ ] Kelima adegan ada dan urutannya sesuai storyboard.
- [ ] Animasi deterministik berdasarkan frame.
- [ ] Teks terbaca di layar ponsel, tidak terpotong, dan tidak bertabrakan.
- [ ] Peta dan labelnya konsisten; tidak ada klaim geografis yang menyesatkan.
- [ ] Transisi, kontras, tempo, dan palet visual konsisten.
- [ ] Video tidak bergantung pada URL eksternal yang mungkin gagal dimuat.

### Pengujian dan render
- [ ] Jalankan `npm run dev` dan periksa preview jika lingkungan mendukung.
- [ ] Periksa beberapa frame penting: awal, pergantian adegan, peta, pertanyaan utama, dan title card.
- [ ] Lakukan render MP4 H.264 setelah preview stabil.
- [ ] Verifikasi file output benar-benar ada dan berukuran masuk akal.
- [ ] Jika memungkinkan, verifikasi durasi, resolusi, frame rate, dan codec output.
- [ ] Jika render gagal, laporkan error aktual dan perbaiki sebelum mengklaim selesai.

Jangan menyatakan bahwa MP4 berhasil dibuat kecuali file tersebut benar-benar telah dirender dan diverifikasi. Jika hanya preview yang berhasil, sebutkan dengan jelas bahwa render final belum dilakukan.

## 8. Perintah umum

Perintah aktual bergantung pada template dan isi `package.json`. Periksa scripts yang tersedia sebelum menjalankan perintah.

```bash
node -v
npm -v
npm install
npm run dev
```

Untuk render, gunakan composition ID yang benar-benar terdaftar dalam proyek. Bentuk umum perintah Remotion:

```bash
npx remotion render <composition-id> out/jejak-peradaban-teaser.mp4
```

Jangan menyalin perintah secara buta jika nama composition atau script proyek berbeda. Periksa dokumentasi Remotion yang cocok dengan versi terpasang.

## 9. README dan handoff

Buat atau perbarui `README.md` dalam Bahasa Indonesia yang menjelaskan:
- Prasyarat.
- Cara menginstal dependency.
- Cara menjalankan Remotion Studio.
- Cara melihat dan mengubah komposisi.
- Cara render MP4.
- Letak file output.
- Struktur folder penting.
- Aset yang masih berupa placeholder.
- Batasan atau masalah yang belum terselesaikan.

Saat menyelesaikan satu tahap, berikan ringkasan singkat:
1. File yang dibuat/diubah.
2. Fitur yang sudah berjalan.
3. Perintah pengujian yang benar-benar dijalankan dan hasilnya.
4. Lokasi file video jika render berhasil.
5. Kendala atau langkah manual yang masih dibutuhkan.

## 10. Langkah pertama agent

Saat pertama kali dijalankan:

1. Periksa isi folder dan kondisi Node.js/npm.
2. Ringkas kondisi awal dalam beberapa poin.
3. Jika ada prasyarat yang hilang, jelaskan cara memperbaikinya sebelum melanjutkan.
4. Jika lingkungan siap, buat atau validasi proyek Remotion sesuai dokumentasi resmi terkini.
5. Implementasikan teaser dengan urutan storyboard di atas.
6. Preview, perbaiki, dan render hanya setelah kualitas dasarnya layak.
7. Jangan berhenti pada kode yang tampak lengkap tetapi belum diuji.
