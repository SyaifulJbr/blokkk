# GiorBaliTour - Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Installation & Setup

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Setup Database
```bash
# Create database and run migrations
npx prisma migrate dev --name init

# Seed database with initial data
npx prisma db seed
```

### 3. Configure Environment Variables
Edit `.env` file (already provided):
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure
```
/workspaces/blokkk/
├── src/
│   ├── app/
│   │   ├── (tanian)/           # Admin dashboard (protected)
│   │   │   ├── cars/
│   │   │   │   └── page.tsx   # Admin car management
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── route.ts
│   │   │   ├── admin/
│   │   │   │   └── cars/
│   │   │   └── reviews/
│   │   ├── cars/
│   │   │   ├── page.tsx        # Car listing
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Car detail
│   │   ├── about/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── register/
│   │   ├── page.tsx            # Landing page
│   │   └── layout.tsx
│   ├── components/
│   │   └── ui/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       └── ReviewForm.tsx
│   ├── lib/
│   │   └── auth.ts             # Auth utilities
│   ├── actions/
│   │   └── admin-cars.ts       # Admin server actions
│   └── styles/
│       └── globals.css         # Global styles
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── seed.ts                 # Database seeding
├── messages/
│   ├── en.json                 # English translations
│   └── id.json                 # Indonesian translations
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── i18n.config.ts
```

## Features

### Landing Page (`/`)
- Featured cars carousel (3 available cars)
- Latest customer reviews (3 most recent)
- Leave a review form
- Responsive design with hero section

### Cars Listing (`/cars`)
- Grid display of all available cars
- Car details: capacity, transmission, price
- Link to detailed view

### Car Detail (`/cars/[id]`)
- Full car information
- Image gallery
- Price and specifications
- Related information

### Authentication
- **Login** (`/login`) - For existing users
- **Register** (`/register`) - Create new account
- Password hashing with bcryptjs
- Database integration via Prisma

### Admin Dashboard (`/tanian`)
- Protected route (admin only)
- Car management (CRUD operations)
- Add, edit, delete cars
- Toggle availability status

### About & Contact
- About page: Company information
- Contact page: Email, WhatsApp, Instagram details

### Multi-Language Support
- Supported languages: English, Indonesian, Chinese, Korean, Arabic, Turkish, Russian, Portuguese
- Language switcher in header
- RTL support for Arabic

## Database Schema

### User
- id, email (unique), name, password, role (USER/ADMIN)

### Car
- id, name, capacity, transmission (MANUAL/AUTOMATIC), pricePerDay, imageUrl, description, isAvailable

### Review
- id, userName, comment, rating, createdAt, userId (optional)

## Admin Credentials
```
Email: admin@giorbalitour.com
Password: admin123
```

## Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run prisma:studio  # Open Prisma Studio
npm run seed         # Reseed database
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Reviews
- `POST /api/reviews` - Create review

### Admin (Protected)
- `GET /api/admin/cars` - List all cars
- `POST /api/admin/cars` - Create car
- `PUT /api/admin/cars/[id]` - Update car
- `DELETE /api/admin/cars/[id]` - Delete car

## Styling
- Tailwind CSS for utility-first styling
- Custom theme colors: Primary green (#16a34a)
- Neon shadow effect for visual appeal
- Fully responsive (mobile, tablet, desktop)

## Theme Colors
```css
--primary-color: #16a34a;  /* Green */
--neon-shadow: 0 0 15px rgba(34, 197, 94, 0.5);
```

## Troubleshooting

### Database Error
If you encounter database errors:
```bash
rm prisma/dev.db
npx prisma migrate dev --name init
npx prisma db seed
```

### Port Already in Use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Dependency Issues
```bash
npm install --legacy-peer-deps
```

## Next Steps
1. Customize styling and branding
2. Implement payment integration
3. Add booking/reservation system
4. Enhance admin dashboard features
5. Deploy to production (Vercel recommended)

---

For questions or issues, contact: **giorginomalik@gmail.com**
