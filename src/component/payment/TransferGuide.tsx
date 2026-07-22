"use client";

import {
    ChevronDown,
} from "lucide-react";

export default function TransferGuide() {

    const items = [
        "BNI Mobile Banking",
        "BNI ATM",
        "Internet Banking",
    ];

    return (

        <div className="rounded-2xl bg-white p-6 shadow-lg">

            <h2 className="text-2xl font-bold mb-6">

                How to Transfer

            </h2>

            <div className="space-y-4">

                {items.map(item => (

                    <details
                        key={item}
                        className="rounded-xl border"
                    >

                        <summary className="flex cursor-pointer list-none items-center justify-between p-5 font-semibold">

                            {item}

                            <ChevronDown />

                        </summary>

                        <div className="border-t p-5 text-gray-600 leading-8">

                            <ol className="list-decimal pl-5 space-y-2">

                                <li>Login ke aplikasi.</li>

                                <li>Pilih Virtual Account.</li>

                                <li>Masukkan nomor VA.</li>

                                <li>Pastikan nominal benar.</li>

                                <li>Konfirmasi pembayaran.</li>

                            </ol>

                        </div>

                    </details>

                ))}

            </div>

        </div>

    )

}