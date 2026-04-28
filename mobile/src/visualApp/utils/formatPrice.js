export const formatPrice = (value) => {
  const num = Number(value || 0);
  return `$ ${num.toLocaleString('es-UY')}`;
};
