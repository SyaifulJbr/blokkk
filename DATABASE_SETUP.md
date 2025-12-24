# 🗄️ Database Setup & Seeding Guide

**Panduan lengkap untuk setup database dan seeding data awal GiorBaliTour**

---

## 📋 Overview

GiorBaliTour menggunakan **Prisma ORM** dengan database **SQLite** untuk development. Database ini menyimpan data:
- 🚗 Mobil rental
- 👤 User (customer & admin)
- ⭐ Review layanan

---

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
bun install
```

### 2. Setup Database Schema
```bash
# Push schema ke database (buat tabel)
bunx prisma db push
```

### 3. Seed Database
```bash
# Jalankan seeding data awal
bun prisma/seed.js
```

### 4. Start Development
```bash
bun run dev
```

---

## 📊 Database Schema

### Tabel: User
```sql
- id: String (Primary Key)
- email: String (Unique)
- name: String
- password: String (Hashed)
- role: String (USER | ADMIN)
```

### Tabel: Car
```sql
- id: String (Primary Key)
- name: String
- capacity: Integer
- transmission: String (MANUAL | AUTOMATIC)
- pricePerDay: Integer
- imageUrl: String
- description: String
- isAvailable: Boolean (Default: true)
```

### Tabel: Review
```sql
- id: String (Primary Key)
- userName: String
- comment: String
- rating: Integer (1-5)
- createdAt: DateTime
- userId: String (Foreign Key, Optional)
```

---

## 🌱 Seeding Data

### File Seeding Tersedia

1. **`prisma/seed.js`** - ⭐ **Recommended**
   - Seed utama: mobil, review, admin
   - Menggunakan CommonJS (kompatibel dengan Bun)

2. **`prisma/seed.ts`** - Versi TypeScript
   - Sama seperti seed.js tapi dalam TypeScript

3. **`prisma/seed-reviews.ts`** - Review tambahan
   - Khusus untuk menambah 50+ review

4. **`prisma/seed-yearly-reviews.ts`** - Review tahunan
   - Review dengan distribusi tahunan

### Cara Menjalankan Seeding

#### ✅ Method 1: Bun (Recommended)
```bash
# Seed utama (mobil + review + admin)
bun prisma/seed.js

# Output yang diharapkan:
# Database seeded successfully!
```

#### ✅ Method 2: NPM/Node
```bash
# Install tsx jika belum ada
npm install -D tsx

# Jalankan seeding TypeScript
npx tsx prisma/seed.ts
```

#### ✅ Method 3: Package Script
```bash
# Jika package.json sudah dikonfigurasi
npm run seed
# atau
bun run seed
```

---

## 📝 Data yang Di-seed

### 🚗 Mobil Rental (8 unit)

| Nama | Kapasitas | Transmisi | Harga/hari |
|------|-----------|-----------|------------|
| All New Avanza | 6 seats | Manual | Rp 550.000 |
| Avanza | 6 seats | Manual | Rp 500.000 |
| Hiace Commuter | 12 seats | Manual | Rp 900.000 |
| Hiace Premio | 12 seats | Automatic | Rp 1.100.000 |
| Innova Reborn | 7 seats | Automatic | Rp 750.000 |
| Toyota Alphard | 7 seats | Automatic | Rp 1.500.000 |
| Toyota Vellfire | 7 seats | Automatic | Rp 1.500.000 |
| Xpander | 7 seats | Manual | Rp 600.000 |

### ⭐ Review (10 buah)
- **User1 - User10**: Rating 4-5 bintang
- **Komentar**: "Ini adalah review contoh nomor X. Layanan cukup baik."
- **Tanggal**: Otomatis (saat seeding)

### 👑 Admin User
- **Email**: `admin@giorbalitour.com`
- **Password**: `admin123` (hashed dengan bcrypt)
- **Role**: `ADMIN`

---

## 🔧 Konfigurasi Package.json

Pastikan `package.json` memiliki konfigurasi berikut:

```json
{
  "prisma": {
    "seed": "bun prisma/seed.js"
  },
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "prisma:studio": "prisma studio",
    "seed": "bun prisma/seed.js"
  },
  "devDependencies": {
    "tsx": "^4.21.0"
  }
}
```

---

## 🔄 Database Operations

### Cek Database
```bash
# Buka Prisma Studio (GUI)
bunx prisma studio

# Atau check via console
bunx prisma db seed
```

### Reset Database
```bash
# Hapus file database
rm -f db/custom.db

# Setup ulang
bunx prisma db push
bun prisma/seed.js
```

### Update Schema
```bash
# Edit prisma/schema.prisma
# Push changes ke database
bunx prisma db push

# Seed ulang jika perlu
bun prisma/seed.js
```

---

## 🛠️ Troubleshooting

### Issue: "Cannot find module './cjs/index.cjs'"
**Solution:** Gunakan `prisma/seed.js` bukan `prisma/seed.ts`

```bash
# ❌ Jangan ini
bunx tsx prisma/seed.ts

# ✅ Gunakan ini
bun prisma/seed.js
```

### Issue: "Database locked"
**Solution:** Hentikan server development terlebih dahulu

```bash
# Hentikan server
pkill -f "next dev"

# Reset database
rm -f db/custom.db
bunx prisma db push
bun prisma/seed.js

# Start ulang server
bun run dev
```

### Issue: "Port 3000 already in use"
**Solution:** Hentikan proses yang menggunakan port 3000

```bash
# Cari proses
lsof -i :3000

# Hentikan proses
kill -9 <PID>

# Atau gunakan port lain
bunx next dev --port 3001
```

---

## 📊 Verifikasi Data

Setelah seeding, verifikasi data dengan:

### Method 1: Prisma Studio
```bash
bunx prisma studio
# Buka http://localhost:5555
```

### Method 2: Check Script
Buat file `check-data.js`:
```javascript
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
  const cars = await prisma.car.count();
  const reviews = await prisma.review.count();
  const users = await prisma.user.count();
  
  console.log(`🚗 Cars: ${cars}`);
  console.log(`⭐ Reviews: ${reviews}`);
  console.log(`👥 Users: ${users}`);
  
  await prisma.$disconnect();
}

checkData();
```

Jalankan:
```bash
bun check-data.js
```

**Expected Output:**
```
🚗 Cars: 8
⭐ Reviews: 10
👥 Users: 1
```

---

## 🎯 Best Practices

1. **Always seed after fresh install**
   ```bash
   bun install
   bunx prisma db push
   bun prisma/seed.js
   ```

2. **Use version control for schema**
   ```bash
   git add prisma/schema.prisma
   git commit -m "Update database schema"
   ```

3. **Backup before major changes**
   ```bash
   cp db/custom.db db/custom.db.backup
   ```

4. **Test seeding in development**
   ```bash
   # Test seeding di development environment
   rm -f db/custom.db
   bunx prisma db push
   bun prisma/seed.js
   bun run dev
   ```

---

## 📞 Help & Support

Jika mengalami masalah dengan database:

1. **Cek file `.env`** - Pastikan `DATABASE_URL` benar
2. **Cek permissions** - Pastikan bisa menulis ke folder `db/`
3. **Restart services** - Hentikan dan restart development server
4. **Reset database** - Hapus dan buat ulang database

**Contact:** giorginomalik@gmail.com

---

🎉 **Database GiorBaliTour siap digunakan!**