interface Product {
  id: string;
  name: string;
  location: string;
  priceStart: string;
  thumbnail: string;
}

// product detail
interface ProductImage {
  id: string;
  image: string | null;
}

interface ProductItem {
  id: string;
  name: string;
  type: string;
  sort: number;
}

interface ProductDetail {
  id: string;
  name: string;
  location?: string | null;
  address: string;
  urlMaps?: string | null;
  description: string;
  priceStart: string;
  price: string;
  thumbnail: string;
  totalBedroom: number;
  totalBathroom: number;
  maxGuest: number;
  typeUnit: string;
  stock: number;
  isActive: boolean;
  typeProperty: string[];
  typeBooking: string[];
  images: ProductImage[];
  items: ProductItem[];
}

export async function getProducts(): Promise<Product[]> {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products?page=1&limit=5`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch featured villas");
  }

  const json = await res.json();

  return json.data ?? [];
}

export async function getProductDetail(id: string): Promise<ProductDetail> {
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product detail");
  }

  const json = await res.json();

  return json.data ?? [];
}