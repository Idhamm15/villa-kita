- npx prisma migrate reset
- npx prisma migrate dev --name init
- npx prisma migrate dev --name update-schema


# 1. Hapus folder migration lama
- rm -rf prisma/migrations

# 2. Buat migration baru dari schema saat ini
- npx prisma migrate dev --name init

# 3. Jalankan seeder (jika belum otomatis)
- npx prisma db seed

# Jika hapus semua table di supabase
- DROP SCHEMA public CASCADE;
- CREATE SCHEMA public;

# Jika tambah migrasi baru di tengah
- npx prisma migrate dev --name add-title-to-partner (nama commit)