interface PaymentTotalProps {
  booking: {
    discount: string;
    totalPrice: string;
    product: {
      price: string;
      serviceFee: string;
    };
  };
}

export default function PaymentTotal({ booking }: PaymentTotalProps) {

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
  }).format(value);
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold">
        Payment Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Harga Villa/Trip</span>
          <span>{formatCurrency(Number(booking.product.price))}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(Number(booking.product.price))}</span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span>{formatCurrency(Number(booking.product.serviceFee))}</span>
        </div>
        <div className="flex justify-between">
          <span>Diskon</span>
          <span>{formatCurrency(Number(booking.discount))}</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-blue-600">
          <span>Total</span>
          <span>{formatCurrency(Number(booking.totalPrice))}</span>
        </div>

      </div>

    </div>
  );
}