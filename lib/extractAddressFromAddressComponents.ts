export const extractAddressFromAddressComponents = (
  addressComponents: Array<{
    long_name: string;
    short_name: string;
    types: string[];
  }>
) => {
  const data = {
    address: "",
    city: "",
    route: "",
    zipCode: "",
    streetNumber: "",
    country: "",
    countryShort: "",
    state: "",
  };
  for (const item of addressComponents) {
    if (item.types.includes("street_number"))
      data.streetNumber = item.short_name;
    if (item.types.includes("route")) data.route = item.short_name;
    if (item.types.includes("locality")) data.city = item.short_name;
    if (item.types.includes("postal_code")) data.zipCode = item.short_name;
    if (item.types.includes("country")) data.country = item.long_name;
    if (item.types.includes("country")) data.countryShort = item.short_name;
    if (item.types.includes("administrative_area_level_2"))
      data.state = item.short_name;
  }
  data.address =
    data.streetNumber != "" ? data.streetNumber + " " + data.route : data.route;
  return data;
};
