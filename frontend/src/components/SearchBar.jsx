// import React,{useState} from 'react'
// import { FaSearch } from 'react-icons/fa'
// import axios from "axios";


// const SearchBar = () => {
//     const [query, setQuery] = useState("");
//     const [results, setResults] = useState([]);

//     const handleSearch = (e) => {
//       e.preventDefault()
//         axios
//           .get(`http://localhost:5000/all-books`,{params: { q: query }})
          
//           .then((response) => {
//             setResults(response.data);
//              console.log(response.data)
//            })
          
//           .catch((err) => {
//             console.log(err);
//           });
//       };
      



//   return (
//     <div>
//          <div className="w-full max-w-sm mb-4 relative">
//         <form action="/books" onSubmit={handleSearch()}>
//           <input
//             name="q"
//             type="text"
//             placeholder="Find Your Next Favorite Book"
//             value={query}
//             onChange={(e)=> setQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//         </form>

//       </div>
//                 <ul className="mt-5 space-y-3">
//             {results.length > 0 ? (
//               results.map((item) => (
//                 <li
//                   key={item.id}
//                   className="p-4 bg-gray-100 border border-gray-300 rounded shadow hover:bg-gray-200 transition duration-300"
//                 >
//                   <span className="text-lg font-semibold text-gray-800">
//                     {item.title}
//                   </span>
//                 </li>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center mt-5">No results found</p>
//             )}
//           </ul>
//     </div>
//   )
// }
// export default SearchBar