import React from "react";

let cites = [
  {
    id: 1,
    name: "Delhi",
  },
  {
    id: 2,
    name: "Uttarakhand",
  },
  {
    id: 3,
    name: "Bengaluru",
  },
  {
    id: 4,
    name: "Pune",
  },
  {
    id: 5,
    name: "Mumbai",
  },
];

const TopButtons = ({setQuery}) => {
  return (
    <div className="mt-4 bg-blue-300 mb-10 rounded-lg m-2">
      {cites.map((city) => (
        <button className="bg-blue-900 text-white rounded-md px-3 py-1 mx-6 my-2
        transition duration-100
           hover:scale-90" key={city.id} 
        onClick={()=>setQuery({q: city.name})}>{city.name}</button>
      ))}
    </div>
  );
};

export default TopButtons;
