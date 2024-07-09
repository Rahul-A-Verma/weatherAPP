import { DateTime } from "luxon";
const ApiKey = "3f910ddc26e4dfda231b37c004d8ff3d";
const ApiUrl = "https://api.openweathermap.org/data/2.5/";

const WeatherData = (infoType, searchParam) => {
  const url = new URL(ApiUrl + infoType);
  url.search = new URLSearchParams({ ...searchParam, appid: ApiKey });

  return fetch(url).then((res) => res.json());
};

// const iconUrl = (icon) => `http://openweathermap.org/img.wn/${icon}@2x.png`;
const iconUrl = (icon) => `https://openweathermap.org/img/wn/${icon}.png`

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd, LLL, yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    // weather:{description},
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon, description } = weather[0];
  const formattedToLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    description,
    icon: iconUrl(icon),
    formattedToLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  const hourly = data
  .filter((f)=>f.dt>secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5)

  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrl(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const formattedWeatherData = async (searchParam) => {
  const formattedCurrentWeather = await WeatherData(
    "weather",
    searchParam
  ).then(formatCurrent);
  const { dt, lat, lon, timezone } = formattedCurrentWeather;
  const formattedForecastWeather = await WeatherData("forecast", {
    lat,
    lon,
    units: searchParam.units,
  }).then((d) => formatForecastWeather(dt, timezone, d.list));

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

export default formattedWeatherData;
