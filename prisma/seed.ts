import { BookingStatus, PaymentStatus, Prisma, PrismaClient, ProductItemType, Role, TypeBooking, TypeProperty } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const password = await bcrypt.hash("password123", 10);

  /*
  |--------------------------------------------------------------------------
  | Users
  |--------------------------------------------------------------------------
  */

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@villakita.com",
    },
    update: {},
    create: {
      username: "admin",
      fullname: "Administrator",
      email: "admin@villakita.com",
      password,
      role: Role.ADMIN,
      phone: "081111111111",
      address: "Jakarta",
    },
  });

  const owner = await prisma.user.upsert({
    where: {
      email: "owner@villakita.com",
    },
    update: {},
    create: {
      username: "owner",
      fullname: "Villa Owner",
      email: "owner@villakita.com",
      password,
      role: Role.OWNER,
      phone: "082222222222",
      address: "Bandung",
    },
  });

  const user = await prisma.user.upsert({
    where: {
      email: "user@villakita.com",
    },
    update: {},
    create: {
      username: "user",
      fullname: "Regular User",
      email: "user@villakita.com",
      password,
      role: Role.USER,
      phone: "083333333333",
      address: "Surabaya",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Category
  |--------------------------------------------------------------------------
  */

  const villa = await prisma.categoryProduct.upsert({
    where: {
      slug: "villa",
    },
    update: {},
    create: {
      name: "Villa",
      slug: "villa",
      description: "Kategori Villa",
    },
  });

  const hotel = await prisma.categoryProduct.upsert({
    where: {
      slug: "hotel",
    },
    update: {},
    create: {
      name: "Hotel",
      slug: "hotel",
      description: "Kategori Hotel",
    },
  });

  const apartment = await prisma.categoryProduct.upsert({
    where: {
      slug: "apartment",
    },
    update: {},
    create: {
      name: "Apartment",
      slug: "apartment",
      description: "Kategori Apartment",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Product
  |--------------------------------------------------------------------------
  */

  const product1 = await prisma.product.create({
    data: {
      categoryId: villa.id,

      ownerId: owner.id,
      createdBy: admin.id,

      name: "Villa Puncak Indah",
      slug: "villa-puncak-indah",

      thumbnail: "/uploads/villa1.jpg",

      description:
        "Villa nyaman dengan pemandangan pegunungan.",

      location: "Puncak",
      address: "Jl. Raya Puncak No. 1",
      urlMaps: "https://maps.google.com",

      typeProperty: [TypeProperty.Villa],
      typeBooking: [TypeBooking.Menginap],

      totalBedroom: 4,
      totalBathroom: 3,
      maxGuest: 10,
      wide: 250,

      priceStart: BigInt(1000000),
      price: BigInt(1500000),

      serviceFee: BigInt(5000),

      typeUnit: "Entire Villa",

      stock: 5,
      capacity: 10,

      isActive: true,

      images: {
        create: [
          {
            image: "/uploads/villa1.jpg",
          },
          {
            image: "/uploads/villa2.jpg",
          },
        ],
      },
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Product Item
  |--------------------------------------------------------------------------
  */

  await prisma.productItem.createMany({
    data: [
      {
        productId: product1.id,
        type: ProductItemType.FACILITY,
        name: "Private Pool",
      },
      {
        productId: product1.id,
        type: ProductItemType.FACILITY,
        name: "WiFi",
      },
      {
        productId: product1.id,
        type: ProductItemType.FACILITY,
        name: "BBQ Area",
      },

      {
        productId: product1.id,
        type: ProductItemType.INCLUDE,
        name: "Breakfast",
      },
      {
        productId: product1.id,
        type: ProductItemType.INCLUDE,
        name: "Free Parking",
      },

      {
        productId: product1.id,
        type: ProductItemType.EXCLUDE,
        name: "Lunch",
      },
      {
        productId: product1.id,
        type: ProductItemType.EXCLUDE,
        name: "Airport Pickup",
      },
    ],
  });

  /*
  |--------------------------------------------------------------------------
  | Booking
  |--------------------------------------------------------------------------
  */

  await prisma.booking.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },

      product: {
        connect: {
          id: product1.id,
        },
      },

      bookingCode: "BK202608010001",
      orderId: "ORDER-202608010001",

      nameGuest: "Budi Santoso",
      email: "budi@gmail.com",
      phone: "08123456789",

      checkIn: new Date("2026-08-01"),
      checkOut: new Date("2026-08-03"),

      totalGuest: 4,
      totalPrice: BigInt(3000000),

      status: BookingStatus.PAID,
      paymentStatus: PaymentStatus.PAID,

      paymentMethod: "bank_transfer",
      transactionId: "TXN-202608010001",

      paidAt: new Date(),

      expiredAt: new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ),

      note: "Late check in",
    },
  });
  /*
  |--------------------------------------------------------------------------
  | Blog
  |--------------------------------------------------------------------------
  */

  await prisma.blog.createMany({
    data: [
      {
        title: "Tips Memilih Villa",
        slug: "tips-memilih-villa",
        thumbnail: "/uploads/blog1.jpg",
        content: "Lorem ipsum dolor sit amet.",
      },
      {
        title: "Liburan Bersama Keluarga",
        slug: "liburan-keluarga",
        thumbnail: "/uploads/blog2.jpg",
        content: "Lorem ipsum dolor sit amet.",
      },
    ],
  });

  /*
  |--------------------------------------------------------------------------
  | Voucher
  |--------------------------------------------------------------------------
  */

  await prisma.voucher.create({
    data: {
      code: "WELCOME10",
      description: "Diskon 10%",
      discount: 10,
      minPurchase: 1000000,
      dateExpired: new Date("2027-01-01"),
      status: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Partner
  |--------------------------------------------------------------------------
  */

  await prisma.partner.create({
    data: {
      image: "partner.png",
      status: true,
    },
  });

  console.log("✅ Seeding selesai");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });