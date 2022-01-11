import * as React from "react";
import styled, { StyledFunction } from "styled-components";

type Props = {
  label?: string;
  style?: object;
  required?: boolean;
  type?: string;
  placeholder?: string;
  value?: string | "";
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  rows?: number;
  cols?: number;
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

export default function TextArea({
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
  rows = 3,
  cols,
  alert = false,
}: Props) {
  if (error) {
    className +=
      " border-2 border-red-600 focus:border-red-500 focus:ring-red-500";
  } else {
    className +=
      " border border-accents2 focus:border-accents5 focus:ring-orange-500";
  }
  if (disabled) {
    className += " bg-gray-100 text-gray-600";
  } else {
  }
  return (
    <>
      {label && (
        <label className="block mb-1 text-sm font-medium">
          {alert && (
            <span className="inline-block px-1 py-1 ml-auto mr-2 text-xs text-white bg-red-500 rounded-full"></span>
          )}
          {label}
        </label>
      )}
      <textarea
        required={required}
        autoCapitalize={autoCapitalize}
        id={id}
        rows={rows}
        cols={cols}
        name={name}
        inputMode={inputMode}
        disabled={disabled}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        autoComplete={autoComplete}
        onChange={(event) => {
          onChange(event);
        }}
        value={value}
        // className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        className={
          "block w-full max-w-lg  rounded-md shadow-sm sm:text-sm" + className
        }
      ></textarea>
    </>
  );
}
