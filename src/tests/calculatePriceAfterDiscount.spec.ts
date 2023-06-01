import calculatePriceAfterDiscount from "../priceCalculator/calculatePriceAfterDiscount";

// Arrange
const price = 10.0;

describe("Calculate price after discount", () => {
  describe("when the discount is 0", () => {
    it("returns the price of the item", () => {
      // ACT
      const value = calculatePriceAfterDiscount(price, 0);

      // ASSERT
      expect(value).toEqual(price);
    });
  });

  describe("when the discount is 10", () => {
    it("returns the price of the item minus the discount", () => {
      // ACT
      const value = calculatePriceAfterDiscount(price, 10);

      // ASSERT
      expect(value).toEqual(9.0);
    });
  });

  describe("when the discount is less than 0", () => {
    it("returns the price of the item", () => {
      // ACT
      const value = calculatePriceAfterDiscount(price, -1);

      // ASSERT
      expect(value).toEqual(price);
    });
  });
});
