import { useState } from "react";

export default function FileInput({
  fileUrl,
  label = "",
  onChange,
  tmpFileUrl,
  type = "lg",
}) {
  const [randomId] = useState(
    "fileUpload-" + Math.random().toString(36).substring(7)
  );
  return (
    <div className="my-2">
      <label htmlFor={randomId}>{label}</label>
      <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {!fileUrl && !tmpFileUrl ? (
            <svg
              className="w-12 h-12 mx-auto text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <img
              src={tmpFileUrl || fileUrl}
              className="object-contain w-full rounded-sm max-h-64"
            />
          )}
          <div className="flex justify-center text-sm text-gray-600">
            <label
              htmlFor={randomId}
              className="relative px-2 py-1 mt-2 font-medium text-orange-600 bg-gray-100 rounded-md cursor-pointer hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
            >
              <span>
                {fileUrl ? "Modifier le fichier" : "Télécharger un fichier"}
              </span>
              <input
                id={randomId}
                name={randomId}
                type="file"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files[0];
                  onChange(file, URL.createObjectURL(file));
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
