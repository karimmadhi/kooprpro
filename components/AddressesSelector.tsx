import {
  useBusinessAddressesQuery,
  useCategoriesQuery,
} from "../generated/graphql";
import Select from "react-select";
import { gql } from "@apollo/client";

const BUSINESS_ADDRESSES_QUERY = gql`
  query businessAddresses($id: Int!) {
    business(id: $id) {
      id
      addresses {
        id
        fullAddress
      }
    }
  }
`;

export default function AddressesSelector({
  onSelection,
  value,
  error,
  businessId,
}) {
  const {
    data,
    loading,
    error: adressesError,
  } = useBusinessAddressesQuery({
    variables: {
      id: businessId,
    },
  });
  return (
    <Select
      placeholder="Selectionnez une adresse"
      value={value}
      options={data?.business.addresses?.map((address) => {
        return {
          value: address.id,
          label: address.fullAddress,
        };
      })}
      className={(error || adressesError) && "border-2 border-red-500"}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: "black",
        }),
      }}
      onChange={(options: any) => {
        onSelection(options);
        // setcategoryValues(options);
        // let tags = [];
        // options?.forEach((option) => {
        //   tags.push(option.value + "");
        // });
        // setcategoryIds(tags);
      }}
    />
  );
}
