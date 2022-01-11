import { useState } from "react";

export default function ImageInput({
  src,
  onChange,
  borderRadius = 500,
  className = "h-20 w-20 rounded-full outline-none border-accents2 border hover:border-accents5 ease-in-out duration-200 cursor-pointer",
}) {
  const [fileUrl, setFileUrl] = useState(src || "");
  return (
    <label>
      <div className={className} style={{ borderRadius }}>
        {fileUrl !== "" && (
          <img
            src={fileUrl}
            className="h-full w-full outline-none"
            style={{
              objectFit: "cover",
              borderRadius: borderRadius,
            }}
          />
        )}
        <input
          type="file"
          className="hidden"
          name="resume"
          accept="image/*"
          onChange={async (event) => {
            const file = event.target.files[0];
            onChange(file);
            setFileUrl(URL.createObjectURL(file));
          }}
        />
      </div>
    </label>
  );
}
