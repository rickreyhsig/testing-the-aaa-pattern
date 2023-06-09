import { Product } from "../types";

/**
 * Filters a list of products and returns products with discount only.
 * The results is sorted, ascending:from lowest to higher net discount value.
 * The net discount value for a product is calculated with the following formula:
 * net_discount = net_price * (100 - discount.percentage) / 100
 * @param {Product[]} productList
 * @returns {Product[]} the list of filtered products
 */
export default function filterAndSortByDiscount(productList:Product[]):Product[]{
    const filteredList = productList.filter(product => product.discount.isEnabled === true);
    const sortedList = filteredList.sort((a, b) => {
        const netDiscountA = a.net_price * (100 - a.discount.percentage) / 100;
        const netDiscountB = b.net_price * (100 - b.discount.percentage) / 100;
        return netDiscountA - netDiscountB;
    });
    return sortedList;
}