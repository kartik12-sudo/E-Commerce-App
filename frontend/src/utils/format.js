export const formatPrice = (price) => {
  if (price == null || price === "") return "$0.00";
  const parsed = Number(price);
  return isNaN(parsed) ? "$0.00" : `$${parsed.toFixed(2)}`;
};
