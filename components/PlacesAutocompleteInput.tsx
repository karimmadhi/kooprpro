import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Space } from "@theboringcode/react-components";
import TextInput from "./TextInput";
export const PlacesAutocompleteInput = ({
  setPlace,
  error,
  label,
}: {
  setPlace: any;
  error?: any;
  label?: string;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {},
    debounce: 300,
  });
  const ref = useRef(null);
  //@ts-ignore
  useOnclickOutside(ref, () => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    setValue(description, false);
    clearSuggestions();
    getGeocode({ address: description })
      .then((results) => {
        console.log("results", results);
        if (results.length > 0) {
          setPlace(results[0]);
        }
        return results;
      })
      .catch((error) => {
        console.log("😱 Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <div key={id} onClick={handleSelect(suggestion)} className="listLink">
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </div>
      );
    });

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <TextInput
        error={error}
        value={value}
        onChange={handleInput}
        label={label || "Adresse exacte de l'établissement"}
      />
      {/* <Space /> */}
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <>{renderSuggestions()}</>}
    </div>
  );
};
