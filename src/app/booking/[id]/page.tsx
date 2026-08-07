"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Navbar from "@/component/Navbar";

import BookingSteps from "@/component/booking/BookingSteps";
import BookingSummary from "@/component/booking/BookingSummary";
import BookingUserCard from "@/component/booking/BookingUserCard";
import BookingVisitorType from "@/component/booking/BookingVisitorType";
import ContactForm from "@/component/booking/ContactForm";
import { Product } from "@prisma/client";
import Cookies from "js-cookie";

export default function BookingPage() {
  const router = useRouter();

  /**
   * nanti ambil dari API profile
   */
  // const currentUser = {
  //   fullname: "Idham",
  //   role: "USER",
  // };

  const [currentUser, setCurrentUser] = useState<{
    user: {
      fullname: string;
      role: string;
      email?: string;
    };
  } | null>(null);
  

  useEffect(() => {
    const loadUser = async () => {
      try {

        const token = Cookies.get("access_token");
        
        const res = await fetch("/api/auth/me", {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();

        if (res.ok && json.status && json.data) {
          setCurrentUser({
            user: {
              fullname: json.data.name || json.data.fullname || "User",
              role: json.data.role || undefined,
              email: json.data.email || undefined,
            },
          });
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  /**
   * nanti ambil dari API detail villa
   */
  const { id } = useParams();

  const [product, setProduct] = useState<{
    id: string;
    name?: string;
    thumbnail?: string;
    roomName?: string;
    capacity?: number;
    price: number;
    serviceFee?: number;
  }>({
    id: "",
    name: "",
    thumbnail: "",
    roomName: "", 
    capacity: 0,
    price: 0,
    serviceFee: 0,
  });
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<{
    visitorType: "SELF" | "SOMEONE_ELSE";

    nameGuest: string;
    email: string;
    phone: string;

    checkIn: string;
    checkOut: string;

    totalGuest: number;

    voucherCode: string;
    discount: number;

    note: string;
  }>({
    visitorType: "SELF",

    nameGuest: "",
    email: "",
    phone: "",

    checkIn: "",
    checkOut: "",

    totalGuest: 1,

    voucherCode: "",
    discount: 0,

    note: "",
  });

  const [price, setPrice] = useState({
    nights: 1,
    subtotal: 0,
    serviceFee: 0,
    discount: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);

        const result = await response.json();

        if (response.ok) {
          setProduct(result.data);
        } else {
          console.error(result.message);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loadingProduct) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Produk tidak ditemukan.</div>;
  }


  const handleApplyVoucher = async () => {
    const code = booking.voucherCode.trim();

    if (!code) {
      alert("Masukkan kode voucher.");
      return;
    }

    try {
      const response = await fetch(
        `/api/vouchers/code/${encodeURIComponent(code)}`
      );

      const result = await response.json();

      if (!response.ok || !result.status) {
        alert(result.message);
        return;
      }

      setBooking((prev) => ({
        ...prev,
        discount: Number(result.data.discount),
        voucher: result.data,
      }));

      alert("Voucher berhasil digunakan.");
    } catch (error) {
      console.error(error);

      alert("Terjadi kesalahan saat memeriksa voucher.");
    }
  };

  const handleBooking = async () => {
    try {
      setLoading(true);

      let nights = 1;

      if (booking.checkIn && booking.checkOut) {
        const start = new Date(booking.checkIn);
        const end = new Date(booking.checkOut);

        const diff =
          (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24);

        nights = Math.max(1, Math.ceil(diff));
      }

      const roomPrice = Number(product.price) * nights;
      const serviceFee = Number(product.serviceFee);
      const discount = Number(booking.discount);

      const totalPrice = roomPrice + serviceFee - discount;

      // const tokenTemporary = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtczRmc2twdjAwMDJ4anhuNWh5MjF6aWQiLCJlbWFpbCI6InVzZXJAdmlsbGFraXRhLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzg1NDIzNzAxLCJleHAiOjE3ODU0MjQ2MDF9.pQKO3WDy5iAuNHiwHpjtSQp2hjKxj9nBOp3ww5SxQ6Q"

      const token = Cookies.get("token");
      const response = await fetch("/api/bookings", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization:
            // "Bearer " + localStorage.getItem("token"),
            "Bearer " + token,
        },

        body: JSON.stringify({
          productId: product.id,

          visitorType: booking.visitorType,

          nameGuest: booking.nameGuest,
          email: booking.email,
          phone: booking.phone,

          checkIn: booking.checkIn,
          checkOut: booking.checkOut,

          totalGuest: booking.totalGuest,

          discount: booking.discount,
          totalPrice,

          note: booking.note,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message);
        return;
      }

      router.push(
        `/booking/process/${result.data.orderId}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 py-10">

          <BookingSteps currentStep={0} />

          <div className="grid gap-8 lg:grid-cols-12">

            <div className="space-y-6 lg:col-span-8">

              <BookingUserCard
                user={ currentUser?.user || {
                  fullname: "User",
                  role: "USER",
                  email: "",
                }}
              />

              <BookingVisitorType
                value={booking.visitorType}
                onChange={(visitorType) =>
                  setBooking((prev) => ({
                    ...prev,
                    visitorType,
                  }))
                }
              />

              <ContactForm
                value={booking}
                onChange={setBooking }
                loading={loading}
                onSubmit={handleBooking}
              />

            </div>

            <div className="lg:col-span-4">

              <div className="sticky top-24">

                <BookingSummary
                  booking={booking}
                  product={product}
                  onVoucherChange={(voucherCode) =>
                    setBooking((prev) => ({
                      ...prev,
                      voucherCode,
                    }))
                  }
                  onApplyVoucher={handleApplyVoucher}
                />

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}