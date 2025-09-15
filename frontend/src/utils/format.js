export const formatPrice = (price) => {
  if (price == null || price === "") return "₹0.00";

  const parsed = Number(price);
  if (isNaN(parsed)) return "₹0.00";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(parsed);
};
