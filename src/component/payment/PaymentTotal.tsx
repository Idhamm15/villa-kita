export default function PaymentTotal() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-xl font-bold">
        Payment Summary
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Villa</span>
          <span>Rp850.000</span>
        </div>

        <div className="flex justify-between">
          <span>Service Fee</span>
          <span>Rp25.000</span>
        </div>

        <hr />

        <div className="flex justify-between text-2xl font-bold text-blue-600">
          <span>Total</span>
          <span>Rp875.000</span>
        </div>

      </div>

    </div>
  );
}