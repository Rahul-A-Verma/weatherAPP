import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocate } from "react-icons/io5";

const Search = ({ setQuery, setUnits, theme }) => {
  const [city, setCity] = useState("");
  const isDark = theme === "dark";

  // const handleSearchClick = () => {
  //   if (city.trim() !== "") {
  //     setQuery({ q: city });
  //     setCity("");
  //   }
  // };
  const handleSearchClick = () => {
  if (city.trim().length < 2) {
    // Add a local alert if the name is too short
    console.log("Input too short for satellite uplink");
    return;
  }
  setQuery({ q: city });
  setCity("");
};

  // Dynamic Theme Styling
  const accentColor = isDark ? "cyan-400" : "amber-600";
  const inputTextColor = isDark ? "text-cyan-50" : "text-amber-950";
  const placeholderColor = isDark ? "placeholder-cyan-100/40" : "placeholder-amber-900/40";
  const btnGradient = isDark 
    ? "from-blue-600 to-indigo-700 shadow-blue-500/20" 
    : "from-amber-500 to-orange-600 shadow-amber-500/20";

  return (
    <div className="flex flex-col items-center justify-center w-full my-8 group transition-all duration-500">
      <div className={`relative flex flex-col md:flex-row items-center p-2 backdrop-blur-3xl rounded-[3rem] border transition-all duration-500 shadow-2xl
        ${isDark 
          ? "bg-slate-900/60 border-white/10 shadow-black/50 hover:border-cyan-500/30" 
          : "bg-white/60 border-amber-200 shadow-amber-900/10 hover:border-amber-500/40"}`}>
        
        {/* UNIT SELECTOR */}
        <div className={`flex rounded-full p-1 m-1 border transition-colors duration-500
          ${isDark ? "bg-slate-800/80 border-white/5" : "bg-amber-100/80 border-amber-200"}`}>
          {["metric", "imperial"].map((unit) => (
            <button
              key={unit}
              onClick={() => setUnits(unit)}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300
                ${isDark 
                  ? "text-slate-500 hover:text-white focus:bg-cyan-500 focus:text-white" 
                  : "text-amber-700 hover:text-amber-900 focus:bg-amber-600 focus:text-white"}`}
            >
              {unit === "metric" ? "°C" : "°F"}
            </button>
          ))}
        </div>

        <div className={`hidden md:block h-8 w-[1px] mx-2 opacity-20 ${isDark ? "bg-white" : "bg-amber-900"}`}></div>

        {/* SEARCH INPUT */}
        <div className="flex items-center px-4 py-2 w-full md:w-64 lg:w-80">
          <input
            value={city}
            type="text"
            placeholder="SYNC LOCATION..."
            onChange={(e) => setCity(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            className={`bg-transparent w-full text-sm font-black tracking-[0.15em] uppercase focus:outline-none transition-colors duration-500
              ${inputTextColor} ${placeholderColor}`}
          />
        </div>

        {/* ACTION CLUSTER */}
        <div className="flex gap-2 pr-2">
          <button
            title="Locate System"
            onClick={() => {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                  setQuery({ lat: pos.coords.latitude, lon: pos.coords.longitude });
                });
              }
            }}
            className={`p-3 rounded-full transition-all duration-700 border active:scale-75
              ${isDark 
                ? "bg-slate-800/50 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500 hover:text-white hover:rotate-180" 
                : "bg-amber-100/50 text-amber-600 border-amber-600/20 hover:bg-amber-600 hover:text-white hover:rotate-180"}`}
          >
            <IoLocate size={18} />
          </button>

          <button
            onClick={handleSearchClick}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-black text-[10px] tracking-widest uppercase shadow-xl transition-all active:scale-90 bg-gradient-to-br ${btnGradient}`}
          >
            <CiSearch size={18} strokeWidth={1} />
            <span className="hidden md:inline">INITIATE</span>
          </button>
        </div>
      </div>

      {/* SCANNING PULSE LINE */}
      <div className={`w-1/4 h-[1px] mt-4 opacity-30 animate-pulse transition-colors duration-500
        ${isDark ? "bg-cyan-500 shadow-[0_0_10px_#06b6d4]" : "bg-amber-600 shadow-[0_0_10px_#d97706]"}`}></div>
    </div>
  );
};

export default Search;