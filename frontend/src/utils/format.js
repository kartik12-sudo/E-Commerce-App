export const formatPrice = (price) => {
  if (price == null || price === "") return "$0.00";

  const parsed = Number(price);
  if (isNaN(parsed)) return "$0.00";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(parsed);
};