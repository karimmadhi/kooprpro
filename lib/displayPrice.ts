export function displayPrice(price: number) {
  if (isNaN(price)) return "";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
  return (price / 100).toFixed(2) + " €";
}

export function displayPriceWithoutSign(price: number) {
  console.log("price", price);
  if (price === 0) return "0.00";
  if (!price) return "";
  return (price / 100).toFixed(2);
}

export const getPrice = (products) => {
  let total = 0;
  for (let product of products) {
    let quantity = product?.quantity * product?.colissage || 0;
    total += quantity * product?.price * ((100 - product?.discount) / 100);
  }
  return displayPrice(total);
};

export const getQuantity = (products) => {
  let total = 0;
  for (let product of products) {
    let quantity = product?.quantity || 0;
    total += quantity;
  }
  return Math.ceil(total);
};

export const getNbProducts = (products) => {
  let total = 0;
  for (let product of products) {
    let quantity = product?.quantity * product?.colissage || 0;
    total += quantity;
  }
  return total;
};

export const getPriceFloat = (products) => {
  let total = 0;
  for (let product of products) {
    let quantity = product?.quantity * product?.colissage || 0;
    total += quantity * product?.price * ((100 - product?.discount) / 100);
  }
  return (total / 100).toFixed(2);
};
