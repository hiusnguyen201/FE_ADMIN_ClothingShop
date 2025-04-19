export function normalizeVietnamese(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D") // Handle đ/Đ
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // Optional: remove extra spaces
}

export function formatCurrencyVND(price: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}
