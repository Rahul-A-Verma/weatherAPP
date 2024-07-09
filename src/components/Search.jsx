import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";

const Search = ({ setQuery, setUnits }) => {
  
  const [city, setCity] = useState("");

  const handleSearchClick = () => {
    if (city !== "")setQuery({ q: city })
    
  }

  const handleLocationClick=()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {laltitude, longitude} = position.coords
        setQuery({lat: laltitude, lon: longitude})
      })
    }
  }
  return (
    <div className="flex gap-10 flex-wrap items-center justify-center mb-5">
      <div className="flex gap-2 items-center">
        <input
          value={city}
         className="w-full rounded-md px-4 py-2 border border-sky-500 hover:active:bg-blue-200 focus:outline-none focus:ring focus:ring-blue-500"
          type="text"
          placeholder="Search..."
          onChange={(e) => setCity(e.currentTarget.value)}
        />
        <CiSearch
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}
        />
        <IoLocationOutline
          size={30}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        
        />
      </div>
      <div className="flex gap-1 text-2xl">
        <button
        className="rounded-full w-8 h-8 hover:bg-blue-400 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 duration-500"
        onClick={()=>setUnits("metric")}>
          °C
        </button>
        <p>|</p>
        <button 
         className="rounded-full w-8 h-8 hover:bg-blue-400 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 duration-500"
        onClick={()=>setUnits("imperial")}>
          °F
        </button>
      </div>
    </div>
  );
};

export default Search;
