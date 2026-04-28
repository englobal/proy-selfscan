import { calculateDiscount } from './calculateDiscount';

export const evaluateDiscount = (subtotal) => {
  const discount = calculateDiscount(subtotal);
  return {
    discount,
    payable: Number(subtotal || 0) - discount,
  };
};
