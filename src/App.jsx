import { useEffect, useState, useCallback } from "react";
import TopButtons from "./components/TopButtons";
import Search from "./components/Search";
import TimeLocation from "./components/TimeLocation";
import TempDetails from "./components/TempDetails";
import ForeCast from "./components/ForeCast";
import getFormattedWeatherData from "./components/WeatherApi";
import { MdSettingsPower } from "react-icons/md"; 

function App() {
  const [query, setQuery] = useState({ q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("dark"); // "dark" (Deep-Sync) or "light" (Solar-Sync)

  const fetchWeather = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      // Update browser tab title like a pro
      document.title = `${data.name} | ${data.temp.toFixed()}°`;
      setWeather(data);
    } catch (err) {
      setError("COORDINATES NOT FOUND. CHECK SYSTEM INPUT.");
      setWeather(null);
    } finally {
      // Artificial delay for that high-tech scanner feel
      setTimeout(() => setLoading(false), 800);
    }
  }, [query, units]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-start p-4 transition-all duration-1000 selection:bg-cyan-500/30
      ${isDark ? "bg-[#020617] text-slate-200" : "bg-[#fffbeb] text-slate-900"}`}>
      
      {/* GLOBAL HUD BACKGROUND OVERLAY */}
      <div className={`fixed inset-0 -z-10 transition-opacity duration-1000 
        ${isDark 
          ? "bg-[radial-gradient(circle_at_50%_50%,_rgba(15,23,42,1)_0%,_rgba(2,6,23,1)_100%)] opacity-100" 
          : "bg-[radial-gradient(circle_at_50%_50%,_rgba(284,243,199,1)_0%,_rgba(255,251,235,1)_100%)] opacity-80"}`}>
      </div>

      <div className="w-full max-w-screen-lg relative">
        
        {/* THEME OVERRIDE INTERFACE */}
        <button 
          onClick={() => setTheme(isDark ? "light" : "dark")}
          className={`absolute top-2 right-2 md:top-0 md:right-0 p-3 rounded-full border border-current hover:scale-110 active:scale-90 transition-all z-50
          ${isDark ? "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.4)]" : "text-amber-600 shadow-[0_0_15px_rgba(217,119,6,0.3)]"}`}
        >
          <MdSettingsPower size={24} />
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-widest uppercase">
            {isDark ? "Dark-Sync" : "Light-Sync"}
          </span>
        </button>

        {/* SYSTEM HEADER */}
        <div className="flex flex-col items-center mt-12 mb-8">
          <h1 className={`text-3xl md:text-5xl font-black tracking-[0.5em] uppercase italic transition-colors duration-700
            ${isDark ? "text-cyan-500" : "text-amber-600"}`}>
            Weather-HUB
          </h1>
          <div className={`h-[1px] w-48 md:w-80 mt-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-50 
            ${isDark ? "text-cyan-500" : "text-amber-600"}`}></div>
        </div>

        {/* MAIN HUD CONTAINER */}
        <div className={`backdrop-blur-3xl rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-10 shadow-2xl relative transition-all duration-700 border
          ${isDark ? "bg-slate-900/40 border-white/5 shadow-black/50" : "bg-white/50 border-amber-200 shadow-amber-900/10"}`}>
          
          <TopButtons setQuery={setQuery} theme={theme} />
          <Search setQuery={setQuery} setUnits={setUnits} theme={theme} />

          {loading ? (
            <LoadingScanner theme={theme} /> 
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse text-center">
              <div className="text-red-500 border-4 border-red-500 w-16 h-16 flex items-center justify-center rounded-full mb-6 shadow-[0_0_30px_rgba(239,68,68,0.6)]">
                <span className="text-3xl font-black">!</span>
              </div>
              <h2 className="text-red-500 font-black tracking-[0.3em] uppercase italic text-xl">
                Signal Loss: 404
              </h2>
              <p className={`text-xs font-mono mt-4 tracking-widest max-w-xs ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                {error}
              </p>
              <button 
                onClick={() => setQuery({q: "Delhi"})}
                className={`mt-8 px-6 py-2 border font-black text-[10px] uppercase tracking-widest transition-all
                  ${isDark ? "border-cyan-500/30 text-cyan-500 hover:bg-cyan-500/10" : "border-amber-600/30 text-amber-600 hover:bg-amber-600/10"}`}
              >
                Re-establish Link
              </button>
            </div>
          ) : (
            weather && (
              <div className="animate-in fade-in zoom-in duration-700">
                <TimeLocation weather={weather} theme={theme} />
                <TempDetails weather={weather} units={units} theme={theme} />
                <ForeCast title="Short Range Telemetry" data={weather.hourly} theme={theme} />
                <ForeCast title="Long Range Projection" data={weather.daily} theme={theme} />
              </div>
            )
          )}
        </div>
      </div>
      
      {/* SYSTEM FOOTER */}
      <footer className="mt-auto py-6">
        <p className={`text-[10px] font-mono tracking-[0.3em] opacity-40 ${isDark ? "text-slate-500" : "text-slate-900"}`}>
          SYSTEM_STATUS: NOMINAL // DATA_ENCRYPTION: ACTIVE
        </p>
      </footer>
    </div>
  );
}

const LoadingScanner = ({ theme }) => (
  <div className="flex flex-col items-center justify-center py-24">
    <div className="relative w-24 h-24">
      <div className={`absolute inset-0 border-4 rounded-full animate-spin transition-colors duration-700
        ${theme === "dark" ? "border-cyan-500/20 border-t-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]" : "border-amber-500/20 border-t-amber-500 shadow-[0_0_15px_rgba(217,119,6,0.5)]"}`}></div>
      <div className={`absolute inset-[45%] rounded-full animate-pulse transition-colors duration-700
        ${theme === "dark" ? "bg-white shadow-[0_0_20px_#fff]" : "bg-amber-600 shadow-[0_0_20px_#d97706]"}`}></div>
    </div>
    <p className={`mt-10 font-mono text-[10px] font-black tracking-[0.6em] animate-pulse uppercase
      ${theme === 'dark' ? 'text-cyan-400' : 'text-amber-600'}`}>
      Syncing Satellite...
    </p>
  </div>
);

export default App;