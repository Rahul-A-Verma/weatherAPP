import React from 'react'

const ForeCast = ({ title, data, theme }) => {
  const isDark = theme === "dark";
  
  // Theme-specific color mapping
  const accentText = isDark ? "text-cyan-400" : "text-amber-600";
  const accentBg = isDark ? "bg-cyan-500" : "bg-amber-600";
  const accentShadow = isDark ? "shadow-[0_0_10px_#06b6d4]" : "shadow-[0_0_10px_#d97706]";
  const itemHover = isDark ? "group-hover:text-cyan-300" : "group-hover:text-amber-700";

  return (
    <div className='flex flex-col my-8 w-full max-w-4xl px-4 font-mono'>
      {/* SECTION HEADER */}
      <div className='flex items-center gap-4 mb-4'>
        <div className={`h-[2px] w-10 transition-all duration-500 ${accentBg} ${accentShadow}`}></div>
        <p className={`text-xs font-black tracking-[0.4em] uppercase italic transition-colors duration-500 ${accentText}`}>
          {title}
        </p>
      </div>

      {/* DATA STREAM TIMELINE */}
      <div className='flex flex-row items-center justify-between gap-4 overflow-x-auto pb-4 no-scrollbar'>
        {data.map((item, index) => (
          <div 
            key={index} 
            className={`relative flex flex-col items-center justify-center min-w-[110px] 
                       backdrop-blur-md border-r p-4 transition-all duration-300 
                       group cursor-crosshair
                       ${isDark 
                         ? 'bg-slate-900/40 border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/50' 
                         : 'bg-amber-100/40 border-amber-900/10 hover:bg-amber-500/10 hover:border-amber-500/50'}`}
            style={{ 
              clipPath: isDark 
                ? 'polygon(15% 0, 100% 0, 85% 100%, 0% 100%)' 
                : 'polygon(0 0, 85% 0, 100% 100%, 15% 100%)' 
            }}
          >
            {/* LOG INDEX */}
            <span className={`absolute top-1 left-5 text-[8px] font-bold opacity-50 ${isDark ? 'text-slate-500' : 'text-amber-800'}`}>
              Fore_Cats_{index + 1}
            </span>

            <p className={`text-[10px] font-black uppercase tracking-tighter transition-colors duration-300 ${isDark ? 'text-slate-400' : 'text-amber-900'} ${itemHover}`}>
              {item.title}
            </p>
            
            <img 
              src={item.icon} 
              alt="weather-status" 
              className='w-14 my-1 filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] group-hover:scale-125 transition-transform duration-500' 
            />
            
            <div className='flex flex-col items-center'>
              <p className={`text-xl font-black italic transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {item.temp.toFixed()}°
              </p>
              
              {/* STATUS BAR BIT */}
              <div className={`h-1 w-8 mt-1 transition-all duration-500 
                ${isDark ? 'bg-cyan-500/20 group-hover:bg-cyan-500' : 'bg-amber-500/20 group-hover:bg-amber-600'}`}>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* SCANLINE DIVIDER */}
      <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${accentText}`}></div>
    </div>
  )
}

export default ForeCast;