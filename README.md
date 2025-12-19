
### **Ringkasan Proyek: GiorBaliTour**

*   **Nama Proyek:** GiorBaliTour
*   **Deskripsi:** Website rental mobil di Bali dengan durasi 10 jam, termasuk sopir dan bensin. Review ditujukan untuk layanan secara keseluruhan.
*   **Teknologi:** Next.js 18, TypeScript, Tailwind CSS, **Prisma**, SQLite (Development), Auth.js, next-intl.
*   **Fitur Utama:** Landing Page, Daftar Mobil, Detail Mobil, Review Layanan (Login untuk posting), Dashboard Admin Tersembunyi, Multi-bahasa (8 bahasa).

---

### **Langkah 0: Setup Proyek untuk Development Lokal dengan Prisma**

**Tujuan:** Membangun struktur proyek dasar dengan semua dependensi dan konfigurasi awal untuk lingkungan development lokal menggunakan Prisma.

**Prompt untuk AI:**
> "AI, kita akan membangun website rental mobil untuk Bali bernama 'GiorBaliTour'. Untuk development, kita akan menggunakan **database SQLite lokal** dengan ORM **Prisma**. Gunakan **Next.js 18 dengan App Router**, **TypeScript**, dan **Tailwind CSS**.
>
> 1.  Buatkan struktur proyek Next.js baru dengan perintah `npx create-next-app@latest giorbali-tour --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`.
> 2.  Setelah proyek dibuat, instal dependensi berikut: `prisma`, `@prisma/client`, `auth.js`, `next-intl`, `bcryptjs`.
> 3.  Inisialisasi Prisma dengan perintah `npx prisma init`.
> 4.  Buka file `.env` yang dibuat oleh Prisma dan ubah isinya menjadi:
>     ```
>     # Database
>     DATABASE_URL="file:./dev.db"
>
>     # NextAuth
>     NEXTAUTH_SECRET="your-super-secret-key-here" # Ganti dengan key acak
>     NEXTAUTH_URL="http://localhost:3000"
>     ```
> 5.  Siapkan konfigurasi dasar untuk `tailwind.config.ts`. Buat juga struktur folder yang rapi: `src/components/ui`, `src/lib`, `src/actions`, `scripts`."

**Hasil yang Diharapkan:**
*   Proyek Next.js 18 yang berjalan di `localhost:3000`.
*   File `.env` untuk konfigurasi lingkungan.
*   Dependensi terinstal, termasuk Prisma.
*   File `prisma/schema.prisma` kosong dan struktur folder yang rapi.

---

### **Langkah 1: Desain Database & Seeding dengan Prisma**

**Tujuan:** Membuat skema database dengan Prisma dan mengisinya dengan data awal (mobil dan review).

**Prompt untuk AI:**
> "Berdasarkan proyek GiorBaliTour, buatkan skema Prisma lengkap di file `prisma/schema.prisma`. Skema ini harus memiliki model:
> 1.  `User`: `id` (String, @id @default(cuid())), `email` (String, @unique), `name` (String), `password` (String), `role` (Enum, ['USER', 'ADMIN'], @default(USER)).
> 2.  `Car`: `id` (String, @id @default(cuid())), `name` (String), `capacity` (Int), `transmission` (Enum, ['MANUAL', 'AUTOMATIC']), `pricePerDay` (Int), `imageUrl` (String), `description` (String), `isAvailable` (Boolean, @default(true)).
> 3.  `Review`: `id` (String, @id @default(cuid())), `userName` (String), `comment` (String), `rating` (Int), `createdAt` (DateTime, @default(now())), `userId` (String? @relation(fields: [userId], references: [id])), `user` (User? @relation(fields: [userId], references: [id])).
>
> **Catatan:** Model `Review` memiliki relasi opsional ke `User`. Review ini ditujukan untuk layanan secara keseluruhan.
>
> Setelah itu, buatkan script seeding di `prisma/seed.ts`. Script ini harus mengisi database dengan 8 mobil berikut dan 10 review fake.
>
> **Data Mobil:**
> - { name: 'All New Avanza', capacity: 6, transmission: 'MANUAL', pricePerDay: 550000, imageUrl: 'https://www.giorbalitour.com/images/cars/all-new-avanza.png', description: 'Mobil keluarga yang nyaman dan irit untuk perjalanan di Bali.' }
> - { name: 'Avanza', capacity: 6, transmission: 'MANUAL', pricePerDay: 500000, imageUrl: 'https://www.giorbalitour.com/images/cars/avanza.png', description: 'Pilihan ekonomis untuk perjalanan Anda.' }
> - { name: 'Hiace Commuter', capacity: 12, transmission: 'MANUAL', pricePerDay: 900000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-commuter.png', description: 'Sempurna untuk rombongan besar.' }
> - { name: 'Hiace Premio', capacity: 12, transmission: 'AUTOMATIC', pricePerDay: 1100000, imageUrl: 'https://www.giorbalitour.com/images/cars/hiace-premio.png', description: 'Versi premium dari Hiace.' }
> - { name: 'Innova Reborn', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 750000, imageUrl: 'https://www.giorbalitour.com/images/cars/innova-reborn.webp', description: 'Mobil MPV medium yang elegan.' }
> - { name: 'Toyota Alphard', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-alphard.png.webp', description: 'Luxury class, pengalaman premium.' }
> - { name: 'Toyota Vellfire', capacity: 7, transmission: 'AUTOMATIC', pricePerDay: 1500000, imageUrl: 'https://www.giorbalitour.com/images/cars/toyota-vellfire.png', description: 'Kemewahan dan gaya dalam satu paket.' }
> - { name: 'Xpander', capacity: 7, transmission: 'MANUAL', pricePerDay: 600000, imageUrl: 'https://www.giorbalitour.com/images/cars/xpander.png', description: 'Mobil modern dan tangguh.' }
>
> **Data Review:** Buat 10 review dengan `userName` acak dan `userId` null."

**Hasil yang Diharapkan:**
*   File `prisma/schema.prisma` yang lengkap.
*   File `prisma/seed.ts` yang siap digunakan.
*   **Anda harus menjalankan perintah berikut di terminal:**
    1.  `npx prisma migrate dev --name init` (untuk membuat tabel di database).
    2.  Buka `package.json` dan tambahkan `"prisma": { "seed": "tsx prisma/seed.ts" }`.
    3.  Instal `tsx` sebagai dev dependency: `npm install -D tsx`.
    4.  Jalankan seeding: `npx prisma db seed`.

---

### **Langkah 2: Setup Internasionalisasi, Autentikasi & Styling**

**Tujuan:** Menerapkan i18n, autentikasi, dan tema visual.

**Prompt untuk AI:**
> "Lakukan tiga tugas berikut:
> 1.  **Internasionalisasi:** Konfigurasi `next-intl` untuk 8 bahasa (en, id, zh, ko, ar, tr, ru, pt) dengan **bahasa default (`en`) di path `/`**. Buat file terjemahan dasar di `messages/en.json` dan `messages/id.json` (contoh: 'Home', 'Cars', 'About', 'Contact'). Buat komponen `LanguageSwitcher` dengan dukungan RTL untuk bahasa Arab.
> 2.  **Autentikasi:** Buat file `src/lib/auth.ts` untuk mengonfigurasi Auth.js dengan Credentials Provider. Gunakan `bcryptjs` untuk hash password. Buat halaman `/login` dan `/register` dengan form yang valid.
> 3.  **Styling:** Terapkan **tema global untuk GiorBaliTour** di `globals.css`:
>     - Warna utama: **Hijau** (misal: `--primary-color: #16a34a;`).
>     - Efek visual: **Neon Shadow** (misal: `--neon-shadow: 0 0 15px rgba(34, 197, 94, 0.5);`).
>     - Gunakan variabel CSS ini di seluruh komponen."

**Hasil yang Diharapkan:**
*   Sistem i18n yang berfungsi.
*   Fitur login/register yang terhubung ke database Prisma.
*   Tampilan dengan tema hijau dan neon shadow yang konsisten.

---

### **Langkah 3: Fitur Admin (Dashboard Tersembunyi di `/tanian`)**

**Tujuan:** Membuat dashboard admin yang aman untuk mengelola mobil.

**Prompt untuk AI:**
> "Buatkan halaman admin yang sangat aman di route `/tanian`.
> 1.  Gunakan route group `src/app/(tanian)`. Di dalamnya, buat `layout.tsx`. **Ini adalah Server Component.**
> 2.  Di baris paling atas dari komponen `layout.tsx`, lakukan pengecekan server-side:
>     - Ambil session user menggunakan `getServerSession(authOptions)`.
>     - Jika tidak ada session ATAU `session.user.role !== 'ADMIN'`, panggil fungsi `notFound()`.
> 3.  Buat halaman `/tanian/cars/page.tsx` untuk manajemen mobil (CRUD).
> 4.  Buat **Server Action** di `src/actions/admin-cars.ts` yang menangani logika CRUD mobil (create, read, update, delete). Pastikan setiap aksi melakukan pengecekan role admin.
> 5.  **Form untuk menambah/mengedit mobil harus memiliki:** input untuk `name`, `capacity`, `transmission`, `pricePerDay`, `description`, input teks untuk `imageUrl`, dan checkbox untuk `isAvailable`."

**Hasil yang Diharapkan:**
*   Dashboard admin yang aman di path `/tanian`.
*   Form manajemen mobil yang fungsional dan terlindungi.

---

### **Langkah 4: Halaman Publik & Review Layanan di Homepage**

**Tujuan:** Membangun halaman utama yang menampilkan mobil dan review untuk keseluruhan layanan.

**Prompt untuk AI:**
> "Buatkan halaman-halaman publik berikut:
> 1.  **Landing Page (`src/app/page.tsx`):**
>     - Hero section dengan teks yang menarik.
>     - Tampilkan 'Featured Cars' (ambil 3 mobil dari database **dimana `isAvailable` = true**).
>     - Di bawahnya, tampilkan section 'Customer Reviews'. **Ambil 3 review terbaru dari tabel `Review`**.
>     - Di bawah daftar review, tampilkan **form 'Leave a Review'**. Jika user belum login, tampilkan tombol 'Login to Leave a Review'. Jika sudah login, tampilkan form untuk `rating` (bintang) dan `comment`.
> 2.  **Halaman Mobil (`src/app/cars/page.tsx`):** Tampilkan **hanya mobil yang `isAvailable` = true** dalam grid.
> 3.  **Halaman Detail Mobil (`src/app/cars/[id]/page.tsx`):** Tampilkan detail mobil. **Halaman ini TIDAK lagi memiliki section review.** Pastikan halaman ini tidak dapat diakses jika mobilnya `isAvailable` = false (tampilkan `notFound()`).
> 4.  **Halaman About & Contact:** Buat halaman statis `src/app/about/page.tsx` dan `src/app/contact/page.tsx`. Di halaman Contact, tampilkan informasi kontak berikut:
>     - **Email:** giorginomalik@gmail.com
>     - **WhatsApp:** +6285854965523
>     - **Instagram:** @gior.malik"

**Hasil yang Diharapkan:**
*   Halaman publik yang dinamis dan fokus, dengan sistem review yang disederhanakan dan informasi kontak yang lengkap.

---

### **Langkah 5: Finalisasi & Footer**

**Tujuan:** Menyempurnakan website dengan komponen Header dan Footer yang konsisten.

**Prompt untuk AI:**
> "Buatkan komponen `Header` dan `Footer` yang konsisten untuk semua halaman.
> - **Header:** Logo 'GiorBaliTour', navigasi utama (Home, Cars, About, Contact), `LanguageSwitcher`, dan kondisional tombol Login/Profile.
> - **Footer:** Tampilkan informasi kontak (Email, WhatsApp, Instagram) dan link navigasi.
> Pastikan website sepenuhnya responsif di mobile dan desktop. Terapkan tema hijau & neon shadow pada komponen-komponen ini. Gunakan komponen ini di root layout `src/app/layout.tsx`."

**Hasil yang Diharapkan:**
*   Website GiorBaliTour yang utuh, profesional, responsif, dan siap untuk dikembangkan lebih lanjut.

Dengan mengikuti panduan ini langkah demi langkah, Anda akan membangun fondasi yang kokoh untuk proyek **GiorBaliTour** dengan praktik terbaik dan teknologi yang modern. Selamat mengerjakan
