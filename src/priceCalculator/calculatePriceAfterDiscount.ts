export default function calculatePriceAfterDiscount(
  price: number,
  discount: number
): number {
  if (price === 0 || discount === 0) return price;
  if (discount < 0) return price;
  return (price * (100 - discount)) / 100;
}
