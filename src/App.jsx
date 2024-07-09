
import TopButtons from "./components/TopButtons";
import Search from "./components/Search";
import TimeLocation from "./components/TimeLocation";
import TempDetails from "./components/TempDetails";
import ForeCast from "./components/ForeCast";
import formattedWeatherData from "./components/WeatherApi";
import { useEffect, useState } from "react";

function App() {

  const [query, setQuery] = useState({ q: "" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  


  const getweather = async () => {
    await formattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
    // console.log(data);
  };

  useEffect(() => {
    getweather();
  }, [query, units]);

  // getweather();

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-5xl my-5 font-semibold text-red-950">Weather APP</h1>
       <div className="bg-blue-500 w-fit h-fit max-md:w-full flex flex-col items-center rounded-lg">
      <TopButtons setQuery={setQuery}/>
      <Search setQuery={setQuery} setUnits={setUnits}/>
      {weather && (
        <>
              <div>
                 <TimeLocation weather={weather} />
                <div>
                <TempDetails weather={weather} units={units}/>
                <ForeCast title = '3 hour step forecast' data={weather.hourly} weather={weather} />
                <ForeCast title='daily forecast' data={weather.daily} weather={weather}/>
                </div> 
              </div>
         
       </>
      )}
    </div>
    </div>
   
  );
}

export default App;
