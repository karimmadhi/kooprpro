export default function SearchInput({
  placeholder = "Recherche...",
  autoComplete = "off",
  name = "searchBar",
  type = "search",
  value = "",
  onChange = (e) => {},
}) {
  return (
    <div className="relative duration-200 ease-in-out ">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-4 h-4"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      <input
        type={type}
        className="flex-grow block w-full min-w-0 px-3 py-2 pl-10 text-sm duration-200 ease-in-out border rounded-md focus:outline-none focus:ring-orange-500 rounded-r-md sm:text-sm font-extralight border-accents2 focus:border-accents5"
        placeholder={placeholder}
        autoComplete={autoComplete}
        name={name}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
