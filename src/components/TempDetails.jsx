import React from "react";
import { FaThermometerHalf } from "react-icons/fa";
import { BiDroplet } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";

const TempDetails = ({
  weather: {
    details, icon, temp, temp_min, temp_max, sunrise, sunset,
    humidity, feels_like, speed,
  },
  units,
  theme, // Pass theme from App.jsx
}) => {
  const isDark = theme === "dark";

  // Dynamic Theme Tokens
  const accentColor = isDark ? "text-cyan-400" : "text-amber-600";
  const ringGlow = isDark ? "bg-blue-500/20 group-hover:bg-blue-500/40" : "bg-amber-500/20 group-hover:bg-amber-500/40";
  const cardBg = isDark ? "bg-slate-900/40" : "bg-amber-50/60";
  const borderColor = isDark ? "border-white/10" : "border-amber-900/10";
  const mainText = isDark ? "text-white" : "text-slate-900";

  const sensorData = [
    { id: 1, Icon: FaThermometerHalf, label: "THERMAL", value: `${feels_like.toFixed()}°`, color: isDark ? "text-orange-400" : "text-orange-600" },
    { id: 2, Icon: BiDroplet, label: "HUMIDITY", value: `${humidity.toFixed()}%`, color: isDark ? "text-blue-400" : "text-blue-700" },
    { id: 3, Icon: FiWind, label: "VELOCITY", value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`, color: isDark ? "text-emerald-400" : "text-emerald-700" },
  ];

  const cycleData = [
    { id: 1, Icon: GiSunrise, label: "RISE", value: sunrise },
    { id: 2, Icon: GiSunset, label: "SET", value: sunset },
    { id: 3, Icon: MdArrowUpward, label: "PEAK", value: `${temp_max.toFixed()}°` },
    { id: 4, Icon: MdArrowDownward, label: "BASE", value: `${temp_min.toFixed()}°` },
  ];

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 uppercase tracking-tighter transition-colors duration-500 ${mainText}`}>
      
      {/* --- TOP SECTION: ATMOSPHERIC STATUS --- */}
      <div className="flex flex-col items-center justify-center mb-10">
        <p className={`text-sm tracking-[0.3em] font-black animate-pulse mb-2 transition-colors duration-500 ${accentColor}`}>
          \\ SYSTEM STATUS: {details} //
        </p>
        
        <div className="relative group">
          {/* Decorative Ring Glow */}
          <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-700 ${ringGlow}`}></div>
          
          <div className={`relative flex flex-col items-center border rounded-full p-10 backdrop-blur-xl shadow-2xl transition-all duration-500 ${cardBg} ${borderColor}`}>
            <img src={icon} alt="Status" className="w-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
            <span className="text-7xl font-black tracking-tighter italic">
              {temp.toFixed()}°
            </span>
          </div>
        </div>
      </div>

      {/* --- MIDDLE SECTION: SENSOR TELEMETRY --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sensorData.map(({ id, Icon, label, value, color }) => (
          <div key={id} className={`relative overflow-hidden border-l-2 p-4 backdrop-blur-md transition-all duration-500 hover:scale-105 ${cardBg} ${borderColor}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className={`text-[10px] font-bold tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</p>
                <p className={`text-2xl font-black ${color}`}>{value}</p>
              </div>
              <Icon size={24} className="opacity-30" />
            </div>
            {/* Animated Shimmer Bar */}
            <div className={`absolute bottom-0 left-0 h-[2px] w-full overflow-hidden ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
               <div className={`h-full w-1/2 animate-[shimmer_2s_infinite] ${isDark ? 'bg-cyan-500 shadow-[0_0_8px_#22d3ee]' : 'bg-amber-500 shadow-[0_0_8px_#d97706]'}`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* --- BOTTOM SECTION: SOLAR & RANGE CYCLE --- */}
      <div className={`flex flex-wrap justify-center gap-6 py-4 border-y backdrop-blur-sm rounded-2xl transition-all duration-500 ${isDark ? 'border-white/5 bg-white/5' : 'border-amber-200 bg-amber-500/5'}`}>
        {cycleData.map(({ id, Icon, label, value }) => (
          <div key={id} className="flex items-center gap-3 px-4 group">
            <Icon size={20} className={`transition-transform duration-300 group-hover:scale-125 ${accentColor}`} />
            <div className="flex flex-col">
              <span className={`text-[9px] font-bold ${isDark ? 'text-slate-500' : 'text-amber-800/60'}`}>{label}</span>
              <span className="text-sm font-bold">{value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TempDetails;