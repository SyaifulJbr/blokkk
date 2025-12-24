# 🚗 GiorBaliTour - Website Rental Mobil Bali

**Website rental mobil di Bali dengan durasi 10 jam, termasuk sopir dan bensin. Review ditujukan untuk layanan secara keseluruhan.**

---

## 📋 Ringkasan Proyek

- **Nama Proyek:** GiorBaliTour
- **Deskripsi:** Website rental mobil di Bali dengan sistem review dan manajemen admin
- **Teknologi:** Next.js 14, TypeScript, Tailwind CSS, Prisma, SQLite, next-intl, shadcn/ui
- **Fitur Utama:**
  - 🚗 Daftar mobil rental dengan detail lengkap
  - ⭐ Sistem review layanan
  - 🔐 Autentikasi user dengan OTP verification
  - 🔒 Password policy enforcement & account lockout
  - 🛡️ Rate limiting untuk keamanan
  - 🌐 Multi-bahasa (8 bahasa)
  - 👑 Dashboard admin tersembunyi
  - 📱 Responsive design

---

## 🚀 Quick Start (Setup Cepat)

### Prasyarat
- Node.js 18+ atau Bun
- Git

### 1. Clone Repository
```bash
git clone https://github.com/SyaifulJbr/blokkk.git
cd blokkk
```

### 2. Install Dependencies
```bash
# Menggunakan Bun (recommended)
bun install

# Atau menggunakan npm
npm install
```

### 3. Setup Database
```bash
# Push schema ke database
bunx prisma db push

# Seed database dengan data awal
bun prisma/seed.js
```

### 4. Jalankan Development Server
```bash
bun run dev
```

🎉 **Aplikasi berjalan di `http://localhost:3000`**

---

## 🗄️ Database & Seeding Detail

### Struktur Database
Database menggunakan **SQLite** dengan 3 tabel utama:

#### 📊 Model Database
```prisma
model User {
  id                String    @id @default(cuid())
  email             String    @unique
  name              String
  password          String
  role              String    @default("USER")  // USER | ADMIN
  reviews           Review[]
  // OTP and Email Verification
  otp               String?                     // 6-digit OTP untuk verification
  otpExpiry         DateTime?                   // OTP expiry time (10 menit)
  isVerified        Boolean    @default(false)   // User verification status
  // Account Lockout
  failedAttempts    Int        @default(0)      // Counter untuk failed login attempts
  lockUntil         DateTime?                   // Waktu kunci akun (jika > 5 failed attempts)
}

model Car {
  id           String @id @default(cuid())
  name         String
  capacity     Int
  transmission String   // MANUAL | AUTOMATIC
  pricePerDay  Int
  imageUrl     String
  description  String
  isAvailable  Boolean @default(true)
}

model Review {
  id        String   @id @default(cuid())
  userName  String
  comment   String
  rating    Int      //1-5
  createdAt DateTime @default(now())
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
}
```

### 🌱 Data Seeding

#### 🚗 Mobil (8 unit)
1. **All New Avanza** - 6 seats, Manual - Rp 550.000/hari
2. **Avanza** - 6 seats, Manual - Rp 500.000/hari
3. **Hiace Commuter** - 12 seats, Manual - Rp 900.000/hari
4. **Hiace Premio** - 12 seats, Automatic - Rp 1.100.000/hari
5. **Innova Reborn** - 7 seats, Automatic - Rp 750.000/hari
6. **Toyota Alphard** - 7 seats, Automatic - Rp 1.500.000/hari
7. **Toyota Vellfire** - 7 seats, Automatic - Rp 1.500.000/hari
8. **Xpander** - 7 seats, Manual - Rp 600.000/hari

#### ⭐ Review (10 buah)
- Review dari User1 hingga User10
- Rating 4-5 bintang
- Komentar sample dalam Bahasa Indonesia

#### 👑 Admin User
- **Email:** `admin@giorbalitour.com`
- **Password:** `admin123`
- **Role:** `ADMIN`
- **Verified:** ✅ Pre-verified (tidak perlu OTP)
- **Access:** Login langsung, bisa akses dashboard admin

#### 👤 Regular Users
- **Password:** Minimum 8 karakter (lihat Password Policy)
- **Verification:** Wajib verifikasi OTP via email
- **Login:** Hanya setelah email diverifikasi
- **Development Mode:** OTP ditampilkan di UI untuk testing

### 📝 Script Seeding

#### File yang Tersedia:
- `prisma/seed.js` - **Script utama (recommended)**
- `prisma/seed.ts` - Versi TypeScript
- `prisma/seed-reviews.ts` - Khusus untuk review tambahan
- `prisma/seed-yearly-reviews.ts` - Review tahunan

#### Cara Menjalankan Seeding:

**✅ Cara 1: Menggunakan Bun (Recommended)**
```bash
# Seed utama (mobil + review + admin)
bun prisma/seed.js

# Reset dan seed ulang
bun prisma/seed.js
```

**✅ Cara 2: Menggunakan npm/node**
```bash
# Install tsx jika belum ada
npm install -D tsx

# Jalankan seeding
npx tsx prisma/seed.ts
```

**✅ Cara 3: Melalui package.json**
```bash
# Jika sudah dikonfigurasi di package.json
npm run seed
```

#### 🔧 Konfigurasi Package.json
Pastikan `package.json` memiliki konfigurasi seeding:
```json
{
  "prisma": {
    "seed": "bun prisma/seed.js"
  },
  "scripts": {
    "seed": "bun prisma/seed.js"
  }
}
```

---

## 🔐 Sistem Autentikasi & Keamanan

### ✅ Fitur Autentikasi

#### 1. **Registrasi User dengan OTP Verification**
- **Password Policy Enforcement:**
  - Minimum 8 karakter (wajib)
  - Password strength indicator (Lemah/Sedang/Kuat/Sangat Kuat)
  - Real-time validation dengan visual checklist
- **OTP Email Verification:**
  - 6-digit OTP dikirim ke email (valid 10 menit)
  - User harus verifikasi email sebelum bisa login
  - Development mode: OTP ditampilkan di UI untuk testing

#### 2. **Login dengan Account Lockout**
- **Rate Limiting:** 3 requests per 5 menit per IP
- **Account Lockout System:**
  - 5 failed attempts → akun terkunci 5 menit
  - Progressive delay untuk setiap percobaan gagal:
    - 1-2 attempts: 0s delay
    - 3rd attempt: 2s delay
    - 4th attempt: 5s delay
    - 5th attempt: 10s delay + lockout
- **Countdown Timer:** Menunjukkan waktu tersisa sampai akun bisa login kembali
- **Remaining Attempts Warning:** Muncul ketika sisa 2-3 percobaan

#### 3. **API Endpoints**
- `POST /api/auth/register` - Registrasi user dengan OTP generation
- `POST /api/auth/verify-otp` - Verifikasi email user
- `POST /api/auth/login` - Login dengan account lockout
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### 🔒 Security Features

1. **Password Strength Indicator** - Visual feedback untuk user
2. **OTP Email Verification** - Email verification sebelum login
3. **Rate Limiting** - Mencegah brute force attack
4. **Account Lockout** - Progressive delay + 5 minute lockout
5. **Session Management** - localStorage untuk persist user session
6. **Console Logging** - Debugging aktif di server dan frontend

### 📝 Password Strength Levels

| Level | Kriteria | Warna |
|-------|----------|--------|
| 🔴 Lemah | < 8 karakter | Red |
| 🟡 Sedang | 8+ karakter | Yellow |
| 🟢 Kuat | 8+ karakter + huruf besar/kecil + angka | Green |
| 🔵 Sangat Kuat | Kuat + karakter unik | Blue |

### 🛠️ Utility Functions

File `src/lib/auth-utils.ts` menyediakan:

- `validatePassword()` - Validasi password dengan strength scoring
- `generateOTP()` - Generate 6-digit OTP
- `checkRateLimit()` - Rate limiting logic
- `isAccountLocked()` - Cek status account lockout
- `calculateLockoutDuration()` - Hitung durasi lockout
- `getClientIP()` - Extract IP dari request headers

---

## 🌐 Multi-Bahasa

Website mendukung 8 bahasa:
- 🇺🇸 English (en) - Default
- 🇮🇩 Bahasa Indonesia (id)
- 🇨🇳 中文 (zh)
- 🇰🇷 한국어 (ko)
- 🇸🇦 العربية (ar)
- 🇹🇷 Türkçe (tr)
- 🇷🇺 Русский (ru)
- 🇵🇹 Português (pt)

---

## 👑 Akses Admin

- **URL:** `/tanian` (dashboard tersembunyi)
- **Email:** `admin@giorbalitour.com`
- **Password:** `admin123`

---

## 📁 Struktur Proyek

```
📦 GiorBaliTour
├── 📂 src/
│   ├── 📂 app/              # Next.js App Router
│   │   ├── 📂 [locale]/     # Halaman multi-bahasa
│   │   │   ├── 📄 register/page.tsx      # Register dengan OTP flow
│   │   │   ├── 📄 login/page.tsx         # Login dengan account lockout
│   │   │   └── 📄 layout.tsx             # Layout dengan AuthProvider
│   │   ├── 📂 api/          # API routes
│   │   │   └── 📂 auth/
│   │   │       ├── 📄 register/route.ts    # Register API
│   │   │       ├── 📄 verify-otp/route.ts # OTP verification API
│   │   │       ├── 📄 login/route.ts       # Login API
│   │   │       ├── 📄 logout/route.ts      # Logout API
│   │   │       └── 📄 me/route.ts          # Current user API
│   │   └── 📂 (tanian)/     # Dashboard admin
│   ├── 📂 components/       # Komponen UI
│   │   └── 📂 ui/          # shadcn/ui komponen
│   ├── 📂 lib/             # Library & utilities
│   │   ├── 📄 auth-utils.ts  # Auth utilities & security functions
│   │   ├── 📄 db.ts         # Prisma client
│   │   └── 📄 utils.ts     # Helper functions
│   ├── 📂 contexts/        # React contexts
│   │   └── 📄 AuthContext.tsx  # Auth state management
│   └── 📂 styles/          # CSS globals
├── 📂 prisma/
│   ├── 📄 schema.prisma        # Database schema (dengan field OTP & lockout)
│   ├── 📄 seed.js             # Script seeding utama (admin pre-verified)
│   └── 📂 migrations/      # Database migrations
├── 📂 messages/           # File terjemahan
├── 📂 public/             # Asset statis
└── 📂 skills/             # AI Skills
```

---

## 🛠️ Development Commands

```bash
# Install dependencies
bun install

# Development server
bun run dev

# Build production
bun run build

# Linting
bun run lint

# Database operations
bunx prisma db push      # Push schema ke DB
bunx prisma studio      # Buka database GUI
bun prisma/seed.js     # Seed database

# Database reset (hapus semua data)
rm -f db/custom.db
bunx prisma db push
bun prisma/seed.js
```

---

## 📞 Kontak

- **Email:** giorginomalik@gmail.com
- **WhatsApp:** +6285854965523
- **Instagram:** @gior.malik

---

## 🔄 Reset Database

Jika perlu me-reset database completely:

```bash
# Hapus file database
rm -f db/custom.db

# Push schema ulang
bunx prisma db push

# Seed ulang
bun prisma/seed.js
```

---

## 📝 Catatan Penting

1. **Environment Variables:** Pastikan file `.env` sudah dikonfigurasi dengan benar
2. **Database Location:** Database SQLite disimpan di `db/custom.db`
3. **Seeding:** Selalu jalankan seeding setelah fresh install atau database reset
4. **Admin Access:** Dashboard admin hanya bisa diakses oleh user dengan role `ADMIN`
5. **Port Default:** Development server berjalan di port 3000
6. **Password Policy:** User baru harus menggunakan password minimal 8 karakter
7. **OTP Verification:** User regular harus verifikasi email sebelum login (admin pre-verified)
8. **Rate Limiting:** API auth memiliki rate limiting 3 requests per 5 menit
9. **Account Lockout:** 5 failed login attempts akan mengunci akun selama 5 menit
10. **Development Mode:** Untuk testing, OTP ditampilkan langsung di UI tanpa perlu email server
11. **Database Reset:** Jika database error, jalankan `rm -f db/custom.db && bun run db:push` lalu seed ulang

### 🐛 Debugging

Semua API autentikasi memiliki console logging aktif untuk debugging:

**Server-side logs:**
- Cek `/home/z/my-project/dev.log` atau terminal dev server
- Format: `[Register API]`, `[Login API]`, `[VerifyOTP API]`

**Client-side logs:**
- Buka browser console (F12)
- Format: `[Register]`, `[Login]`, `[AuthContext]`

**Contoh debugging:**
```javascript
// Browser console
[Register] Attempting registration for: user@example.com
[Register] Registration successful
[Register] OTP: 123456

// Server terminal
[Register API] Processing registration request
[Register API] Generated OTP for user@example.com: 123456
[Register API] User created successfully
```

---

🎉 **Selamat mengembangkan GiorBaliTour!**