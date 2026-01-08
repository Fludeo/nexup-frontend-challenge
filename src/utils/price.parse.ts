export const formatPrice = (amount: number, withDecimal = true) => {
  return amount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: withDecimal ? 2 : 0,
  });
};
