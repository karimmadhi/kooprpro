import * as React from "react";
import styled, { StyledFunction } from "styled-components";

type Props = {
  label?: string;
  style?: object;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | "";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoCorrect?: "on" | "off" | string;
  autoComplete?: "on" | "off" | string;
  id?: string;
  name?: string;
  error?: boolean | null | string;
  step?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  autoCapitalize?: "on" | "off";
  alt?: string;
  className?: string;
  alert?: boolean;
  inputMode?:
    | "text"
    | "none"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
};

export default function TextInput({
  label,
  style,
  type = "text",
  value,
  onChange,
  disabled = false,
  autoComplete = "off",
  autoCorrect = "off",
  name,
  id,
  error,
  step = 1,
  min,
  max,
  autoCapitalize = "off",
  placeholder = "",
  alt = "",
  inputMode = undefined,
  required = false,
  className = "",
  alert = false,
}: Props) {
  if (error) {
    className +=
      " border-2 border-red-600 focus:border-red-500 focus:ring-red-500";
  } else {
    className += " border-gray-300 focus:border-accents5 focus:ring-orange-500";
  }
  if (disabled) {
    className += " bg-gray-100 text-gray-600";
  } else {
  }
  return (
    <>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {alert && (
            <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
          )}
          {label}
        </label>
      )}
      <input
        required={required}
        autoCapitalize={autoCapitalize}
        id={id}
        alt={alt}
        name={name}
        inputMode={inputMode}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        onChange={(event) => {
          onChange(event);
        }}
        step={step}
        min={min}
        max={max}
        value={value}
        className={
          "flex-grow block w-full min-w-0 px-3 py-2 text-sm duration-200 ease-in-out rounded-md rounded-r-md sm:text-sm focus:outline-none text-black " +
          className
        }
      />
      {error && typeof error === "string" && (
        <p className="mt-2 font-semibold text-right text-red-600">{error}</p>
      )}
    </>
  );
}
