import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

 const Search =()=> {
  const [searchParams] = useSearchParams();
  const [searchLabel, setLabel] = useState();
  const [currentQuery, setVal] = useState();

  useEffect(() => {
    setLabel(searchParams.get("q"));
    setVal(searchParams.get("q") || ""); // Default to an empty string if 'q' is null
  }, [searchParams]);

  const handleInputChange = (e) => {
    setVal(e.target.value); // Update the state as the user types
  };

  return (
    <div>
      <form className='search-box' action='/books'>
        {searchLabel && searchLabel !== "" && <a className='clear-btn rounded-md shadow-sm ' href="/books">X</a>}
        <div className="w-full max-w-sm mb-4 relative">
          <input
            name="q"
            placeholder="Find Your Next Favorite Book"
            value={currentQuery}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <button className='btn-primary'>Find a book</button>
      </form>
    </div>
  )
  
}

export default Search