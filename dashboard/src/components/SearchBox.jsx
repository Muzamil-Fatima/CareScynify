import { FaSearch } from "react-icons/fa"; // React icon for search

const Search = ({ searchPlace = "Search" }) => {
  return (
    <div className="relative mt-2 mb-4 w-75">
      <input
        type="text"
        placeholder={searchPlace}
        className="pr-10 pl-4 w-full h-11.25 rounded-[15px] border border-gray-300 shadow-sm text-gray-700 font-medium text-[16px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
      />
      <FaSearch
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
  );
};
export default Search;
