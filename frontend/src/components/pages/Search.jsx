import { SearchIcon, UserRoundSearch } from "lucide-react";
import React from "react";

const Search = () => {
  return (
    <div className="w-full">
      <div className="p-4 md:p-2">
        {/* Input Tag */}
        <div className="w-full md:w-[70%] flex items-center bg-white  mx-auto px-2 py-1 focus:ring-2 focus:ring-black rounded-md">
          <UserRoundSearch className="text-black mr-1 " />
          <input
            type="text"
            // value={}
            // onChange={}
            placeholder="Search Your Friend..."
            className="w-full px-2 py-1  border-l-black outline-none bg-white  border-r-black border-r border-l text-black"
          />
          <SearchIcon className="text-black ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Search;
