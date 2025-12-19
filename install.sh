#!/bin/bash
cd /workspaces/blokkk
npm install --legacy-peer-deps
echo "=== npm install completed ==="
npx prisma migrate dev --name init
echo "=== prisma migrate completed ==="
npx prisma db seed
echo "=== prisma seed completed ==="
