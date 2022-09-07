import Select from "react-select";


export default function OfferTypeSelector({ onSelection, value,labelId}) {
  const offerTypes = ["évênement","bon plan" ,"offre flash"];
  return (
    <Select
    id={labelId}
      placeholder="Selectionnez Le type d'offre"
      isMulti={false}
      value={value}
      options={offerTypes.map((offerType) => {
        return {
          value: offerType,
          label: offerType,
        };
      })}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: "black",
        }),
      }}
      onChange={(options: any) => {
        onSelection(options);
      }}
    />
  );
}
