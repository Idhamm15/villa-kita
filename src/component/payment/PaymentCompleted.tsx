export default function PaymentCompleted() {

    return (

        <div className="rounded-2xl bg-white p-8 shadow-lg text-center">

            <h2 className="text-2xl font-bold">

                Completed your payment?

            </h2>

            <p className="mt-3 text-gray-500">

                Once payment is confirmed, we will automatically verify it.

            </p>

            <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700">

                Yes, I Have Paid

            </button>

        </div>

    )

}