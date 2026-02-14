import React from "react";

const TopButtons = ({ setQuery, theme }) => {
  const cities = [
    { id: 1, name: "Delhi" },
    { id: 2, name: "Uttarakhand" },
    { id: 3, name: "Bengaluru" },
    { id: 4, name: "Pune" },
    { id: 5, name: "Mumbai" },
  ];

  // System-wide color logic
  const isDark = theme === "dark";
  const activeAccent = isDark ? "cyan-500" : "amber-600";
  const hoverBg = isDark ? "bg-cyan-500/10" : "bg-amber-500/10";
  const textColor = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="flex items-center justify-center flex-wrap gap-2 md:gap-6 mb-10 mt-4 px-2">
      {cities.map((city) => (
        <button
          key={city.id}
          onClick={() => setQuery({ q: city.name })}
          className="relative px-4 py-2 group overflow-hidden transition-all duration-300 transform active:scale-95"
        >
          {/* SKEWED SCANNER BACKGROUND */}
          <div className={`absolute inset-0 ${hoverBg} -skew-x-12 translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-500 ease-out`}></div>
          
          {/* THE DATA LABEL */}
          <span className={`relative text-[10px] md:text-xs font-black tracking-[0.25em] uppercase transition-colors duration-300 
            ${textColor} group-hover:text-${activeAccent}`}>
            {city.name}
          </span>
          
          {/* TELEMETRY DECORATION (The little corner bit) */}
          <div className={`absolute top-0 right-0 w-1 h-1 border-t border-r transition-opacity duration-300 opacity-0 group-hover:opacity-100
            ${isDark ? 'border-cyan-400' : 'border-amber-500'}`}></div>

          {/* DYNAMIC UNDERLINE SCANNER */}
          <div className={`absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-500 ease-in-out
            group-hover:w-full ${isDark ? 'bg-cyan-500 shadow-[0_0_8px_#22d3ee]' : 'bg-amber-600 shadow-[0_0_8px_#d97706]'}`}>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TopButtons;