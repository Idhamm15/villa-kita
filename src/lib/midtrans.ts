import midtransClient from "midtrans-client";

export const snap = new midtransClient.Snap({
  isProduction: process.env.MIDTRANS_IS_PRODUCTION === "true",
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const MIDTRANS_URL =
  process.env.MIDTRANS_IS_PRODUCTION === "true"
    ? "https://api.midtrans.com/v1/payment-links"
    : "https://api.sandbox.midtrans.com/v1/payment-links";

export const MIDTRANS_AUTH =
  "Basic " +
  Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64");