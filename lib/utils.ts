import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);
}

export function formatToRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase() // ubah menjadi huruf kecil
    .replace(/[^\w\s-]/g, "") // hapus karakter khusus
    .trim() // hapus spasi di awal dan akhir
    .replace(/\s+/g, "-") // ubah spasi menjadi tanda hubung
    .replace(/--+/g, "-"); // menghilangkan tanda hubung ganda
}
