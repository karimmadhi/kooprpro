import React from "react";

export default function Button({
  loading = false,
  disabled = false,
  className = "relative inline-flex justify-center px-4 py-2 text-sm font-medium text-OFLO_darkblue bg-OFLO_pastel border border-transparent rounded-md shadow-sm hover:bg-OFLO_purple hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-OFLO_purple",
  onClick,
  children,
  style = {},
}) {
  return (
    <button
      disabled={loading || disabled}
      className={
        loading || disabled ? className + " cursor-not-allowed" : className
      }
      style={style}
      onClick={(e) => {
        if (!loading && !disabled) onClick(e);
      }}
    >
      {loading ? (
        <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
          <circle
            className="opacity-0"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
