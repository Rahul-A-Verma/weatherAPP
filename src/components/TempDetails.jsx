import React from "react";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FiWind } from "react-icons/fi";
import { GiSunrise } from "react-icons/gi";
import { GiSunset } from "react-icons/gi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

const TempDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    humidity,
    feels_like,
    speed,
    description,
  },
  units,
}) => {
  const vDetails = [
    {
      id: 1,
      Icon: FaThermometerEmpty,
      title: "Real Feel",
      value: `${feels_like.toFixed()}°`,
    },
    {
      id: 2,
      Icon: BiSolidDropletHalf,
      title: "Humidity",
      value: `${humidity.toFixed()}%`,
    },
    {
      id: 3,
      Icon: FiWind,
      title: "Wind",
      value: `${speed.toFixed()} ${units === "metric" ? "km/h" : "m/s"}`,
    },
  ];

  const hDetails = [
    {
      id: 1,
      Icon: GiSunrise,
      title: "Sunrise",
      value: sunrise,
    },
    {
      id: 2,
      Icon: GiSunset,
      title: "Sunset",
      value: sunset,
    },
    {
      id: 3,
      Icon: MdKeyboardArrowUp,
      title: "High",
      value: `${temp_max.toFixed()}°`,
    },
    {
      id: 4,
      Icon: MdKeyboardArrowDown,
      title: "Low",
      value: `${temp_min.toFixed()}°`,
    },
  ];

  return (
    <div className="flex flex-col items-center mt-2">
      <div>
        <p>{details}</p>
      </div>
      <div className="flex flex-col items-center">
      <img src={icon} alt="Icon" className="w-24 " />
      <p className="text-5xl">{`${temp.toFixed()}°`}</p>
      </div>

      <div className="flex flex-wrap gap-32 justify-center items-center mt-5">
          <div
          className='bg-blue-300 rounded-lg px-6 py-8
           transition duration-500 shadow-2xl
           hover:scale-105'>
            {vDetails.map(({ id, Icon, title, value }) => (
              <div className="flex items-center my-2" key={id}>
                <Icon size={18} className="mr-2" />
                {title} <span className="ml-2">{value}</span>
              </div>
            ))}
           </div>

        <div  className='bg-blue-300 rounded-lg px-4 py-4 transition duration-500 shadow-2xl
           hover:scale-105'>
          {hDetails.map(({ id, title, Icon, value }) => (
            <div key={id} className="flex items-center my-1">
              <Icon size={30} />
              <p className="ml-2">
                {title} <span className="ml-2">{value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TempDetails;
