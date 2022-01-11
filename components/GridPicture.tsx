import Image from "next/image";

export default function GridPicture({ file, setState, state }) {
  return (
    <li
      className="relative"
      onClick={(e) => {
        setState({
          ...state,
          imageUrl: file.cdnUrl,
        });
      }}
    >
      <div
        className={`block w-full overflow-hidden rounded-lg focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 group aspect-w-10 aspect-h-7 ${
          state.imageUrl === file.cdnUrl &&
          "border-4 border-green-600 bg-gray-100"
        }`}
      >
        {/* <img
            src={file.cdnUrl}
            alt=""
            className={`object-cover pointer-events-none group-hover:opacity-75 ${
              state.imageUrl === file.cdnUrl && "border-4 border-green-600"
            }`}
          /> */}
        <Image
          src={file.cdnUrl}
          alt="Photo de l'offre"
          className={`object-cover pointer-events-none group-hover:opacity-75 ${
            state.imageUrl === file.cdnUrl &&
            "border-4 border-green-600 bg-gray-100"
          }`}
          layout="fill"
        />
      </div>
      <p className="block mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
        {file?.tags?.slice(0, 3).map((tag) => (
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
            key={file.id + tag.id}
          >
            {tag.name}
          </span>
        ))}
      </p>
      {/* <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          4 MB
        </p> */}
    </li>
  );
}
