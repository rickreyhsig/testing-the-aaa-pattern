import calculateCartItemPrice from '../priceCalculator/calculateCartItemPrice';
import calculateGrossPrice from '../priceCalculator/calculateGrossPrice';
import calculatePriceAfterDiscount from '../priceCalculator/calculatePriceAfterDiscount';
import { Product, CartItem, ProductType, ProductDiscount, Brand } from '../types';

// Mock the calculateGrossPrice function
jest.mock('../priceCalculator/calculateGrossPrice', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((product) => {
    return 15;
  }),
}));

// Mock the calculateGrossPrice function
jest.mock('../priceCalculator/calculatePriceAfterDiscount', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((price, discount) => {
    if (price === 0 || discount === 0) return price;
    if (discount < 0) return price;
    return (price * (100 - discount)) / 100;
  }),
}));

describe('calculateCartItemPrice', () => {
  it('should calculate the cart item price correctly when calculateGrossPrice is mocked', () => {
    const brand: Brand = {
      id: '7',
      name: 'some_brand',
    }

    const product_discount: ProductDiscount = {
      isEnabled: false,
      percentage: 0
    }

    const product: Product = {
      id: '1',
      name: 'Example Product',
      net_price: 10,
      type: ProductType.FOOD,
      discount: product_discount,
      brand: brand,
    };

    const cartItem: CartItem = {
      product: product,
      quantity: 2,
    };

    const result = calculateCartItemPrice(cartItem);

    expect(result).toEqual({
      net_price: 20,
      gross_price: 30,
      gross_price_discounted: 30,
    });

    expect(calculateGrossPrice).toHaveBeenCalledTimes(1);
    expect(calculateGrossPrice).toHaveBeenCalledWith(cartItem.product);
  });
});

describe('Calculate price after discount', () => {
  it('should calculate the cart item price correctly when calculatePriceAfterDiscount is mocked', () => {
    const brand: Brand = {
      id: '7',
      name: 'some_brand',
    }

    const product_discount: ProductDiscount = {
      isEnabled: true,
      percentage: 10
    }

    const product: Product = {
      id: '1',
      name: 'Example Product',
      net_price: 10,
      type: ProductType.FOOD,
      discount: product_discount,
      brand: brand,
    };

    const cartItem: CartItem = {
      product: product,
      quantity: 2,
    };

    const result = calculateCartItemPrice(cartItem);

    expect(result).toEqual({
      net_price: 20,
      gross_price: 30,
      gross_price_discounted: 27,
    });

    expect(calculateGrossPrice).toHaveBeenCalledTimes(2);
    expect(calculatePriceAfterDiscount).toHaveBeenCalledTimes(1);
  });
});
