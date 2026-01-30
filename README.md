# Palindo.id Project

Repository ini merupakan monorepo yang menggabungkan Backend dan Frontend untuk aplikasi Palindo.id.

## Struktur Direktori

- **backend/**: Server-side application (Node.js, Express, Sequelize)
- **palindo-web/**: Client-side application (React, Vite)

## Persiapan (Setup)

1. Install semua dependencies (Root, Backend, dan Frontend):

   ```bash
   npm run install:all
   ```

2. Konfigurasi Environment Variables:
   - Pastikan membuat file `.env` di dalam folder `backend/` sesuai konfigurasi server.
   - Pastikan membuat file `.env` di dalam folder `palindo-web/` jika diperlukan oleh frontend.

## Menjalankan Aplikasi

Untuk menjalankan Backend dan Frontend secara bersamaan dalam mode development:

```bash
npm run dev
```

Atau jika ingin menjalankan production start:

```bash
npm start
```
