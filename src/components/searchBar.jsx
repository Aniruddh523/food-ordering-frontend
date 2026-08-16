

import {FaSearch} from "react-icons/fa"


function SearchBar({search,setSearch}){


return (
    <div className="max-w-3xl mx-auto my-10 px-4">
    <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
    <input
    type="text"
    placeholder="Search Your fevourite Food...."

    value={search}
    onChange={(e)=>setSearch(e.target.value)}
    className="w-full px-5 py-4 outline-none text-gray-700"
    />
    <button
    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-4 transition">
   <FaSearch/>
   </button>
    
    
    
    </div>
    
    
    </div>

  )
}

export default SearchBar;













