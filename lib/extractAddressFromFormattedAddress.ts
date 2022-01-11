const address: string = "6 Rue Maria Callas, 67380 Lingolsheim, France";

export const extractAddressFromFormattedAddress = (
  formattedAddress: string
) => {
  const data = {
    address: "",
    city: "",
    zipCode: "",
    country: "",
  };
  const elems = formattedAddress.split(",");
  if (elems.length < 2) return null;
  const zipAndCity = elems[1].trim().split(" ");
  data.address = elems[0].trim();
  data.zipCode = zipAndCity[0];
  data.city = zipAndCity[1];
  data.country = elems[2].trim();
  return data;
};
