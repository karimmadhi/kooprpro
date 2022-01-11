import { useCategoriesQuery } from "../generated/graphql";
import Select from "react-select";
import { gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  query categories {
    categories {
      id
      name
      imageUrl
    }
  }
`;

export default function CategoriesSelector({ onSelection, value, error }) {
  const { data, loading, error: categoriesError } = useCategoriesQuery();
  return (
    <Select
      placeholder="Selectionnez une catégorie"
      isMulti={true}
      value={value}
      options={data?.categories?.map((category) => {
        return {
          value: category.id,
          label: category.name,
        };
      })}
      className={(error || categoriesError) && "border-2 border-red-500"}
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
