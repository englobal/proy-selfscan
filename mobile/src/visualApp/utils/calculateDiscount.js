export const calculateDiscount = (subtotal) => {
  const value = Number(subtotal || 0);
  return value >= 30000 ? Math.round(value * 0.1) : 0;
};
