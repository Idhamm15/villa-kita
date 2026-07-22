import { BookingStatus, Prisma, PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Start seeding...");

    // =========================
    // USER
    // =========================
    const password = await bcrypt.hash("admin123", 10);

    const admin = await prisma.user.upsert({
    where: {
        email: "admin@villakita.com",
    },
    update: {
        username: "admin",
        fullname: "Administrator",
        phone: "081234567890",
        address: "Jakarta",
        isActive: true,
    },
    create: {
        username: "admin",
        fullname: "Administrator",
        email: "admin@villakita.com",
        password,
        role: Role.ADMIN,
        phone: "081234567890",
        address: "Jakarta",
        isActive: true,
    },
    });

    const user = await prisma.user.upsert({
    where: {
        email: "user@villakita.com",
    },
    update: {
        username: "johndoe",
        fullname: "John Doe",
        phone: "081298765432",
        address: "Bogor",
        isActive: true,
    },
    create: {
        username: "johndoe",
        fullname: "John Doe",
        email: "user@villakita.com",
        password,
        role: Role.USER,
        phone: "081298765432",
        address: "Bogor",
        isActive: true,
    },
    });

  // =========================
  // CATEGORY
  // =========================
  const villaCategory = await prisma.categoryProduct.upsert({
    where: {
      slug: "villa",
    },
    update: {},
    create: {
      name: "Villa",
      slug: "villa",
      description: "Kategori seluruh villa",
    },
  });

  const tripCategory = await prisma.categoryProduct.upsert({
    where: {
      slug: "trip",
    },
    update: {},
    create: {
      name: "Trip",
      slug: "trip",
      description: "Kategori paket trip",
    },
  });

  // =========================
  // PRODUCT
  // =========================
  const villa = await prisma.product.upsert({
    where: {
      slug: "villa-puncak",
    },
    update: {},
    create: {
      categoryId: villaCategory.id,
      name: "Villa Puncak",
      slug: "villa-puncak",
      description: "Villa nyaman dengan pemandangan pegunungan.",
      thumbnail: "/uploads/villa-puncak.jpg",
      price: new Prisma.Decimal(1500000),
      location: "Puncak, Bogor",
      stock: 5,
    },
  });

  const trip = await prisma.product.upsert({
    where: {
      slug: "trip-bromo",
    },
    update: {},
    create: {
      categoryId: tripCategory.id,
      name: "Open Trip Bromo",
      slug: "trip-bromo",
      description: "Paket wisata Bromo 2 Hari 1 Malam.",
      thumbnail: "/uploads/bromo.jpg",
      price: new Prisma.Decimal(750000),
      location: "Bromo",
      stock: 50,
    },
  });

  // =========================
  // PRODUCT IMAGE
  // =========================
  await prisma.productImage.createMany({
    data: [
      {
        productId: villa.id,
        image: "/uploads/villa1.jpg",
      },
      {
        productId: villa.id,
        image: "/uploads/villa2.jpg",
      },
      {
        productId: trip.id,
        image: "/uploads/trip1.jpg",
      },
    ],
    skipDuplicates: true,
  });

  // =========================
  // BLOG
  // =========================
  await prisma.blog.upsert({
    where: {
      slug: "tips-memilih-villa",
    },
    update: {},
    create: {
      title: "5 Tips Memilih Villa untuk Liburan",
      slug: "tips-memilih-villa",
      thumbnail: "/uploads/blog1.jpg",
      content:
        "<p>Memilih villa yang tepat akan membuat liburan semakin menyenangkan.</p>",
      isPublished: true,
    },
  });

  await prisma.blog.upsert({
    where: {
      slug: "rekomendasi-trip-bromo",
    },
    update: {},
    create: {
      title: "Rekomendasi Trip ke Bromo",
      slug: "rekomendasi-trip-bromo",
      thumbnail: "/uploads/blog2.jpg",
      content:
        "<p>Bromo merupakan salah satu destinasi wisata terbaik di Indonesia.</p>",
      isPublished: true,
    },
  });

  // =========================
  // BOOKING
  // =========================
  await prisma.booking.create({
    data: {
      userId: user.id,
      productId: villa.id,
      checkIn: new Date("2026-08-01"),
      checkOut: new Date("2026-08-03"),
      totalGuest: 4,
      totalPrice: new Prisma.Decimal(3000000),
      status: BookingStatus.PAID,
      note: "Booking dari seeder",
    },
  });

  console.log("✅ Seeder selesai.");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });