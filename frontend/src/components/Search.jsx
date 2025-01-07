import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

 const Search =()=> {
    const [data,setData]=useState('')
    const [result,setResult]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:5000/all-books')
        .then(res => {
            setData(res.data)
            setResult(res.data)
        })
 
        .catch(err => console.log(err))
    },[])
    
    

    const Filter =(event)=>{
        setResult(data.filter(f=>f.title.toLowerCase().includes(event)))

    }
 
    return (
      <div>
        <div className="w-full max-w-sm mb-4 relative">
      
          <input
            name="q"
            placeholder="Find Your Next Favorite Book"
            value={data}
            onChange={Filter}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
       
        </div>
        {result.map((data,index)=>{
                    <ul key={index}>
                        <li>{data.title}</li>
                     </ul>
        })}
      </div>
    )
  
}

export default Search