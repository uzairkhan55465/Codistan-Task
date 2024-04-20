import React, { useEffect, useState } from "react";
import Images from "../../constant/images.js";
import axios from "axios";
import { WeatherData } from "../../constant/WeatherDataTypes.js";

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get<WeatherData>(
            `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude},${longitude}&days=7`,
            {
              headers: {
                "X-RapidAPI-Key":
                  "a8e4bb4acamsh186edb9bcc597edp11268cjsn4c1f32da0bd2",
                "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
              },
            }
          );
          if (response.status === 200) {
            console.log(response.data);
            setWeatherData(response.data);
            setLoading(false); // Once data is fetched, set loading to false
          } else {
            throw new Error("Failed to fetch weather data");
          }
        });
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    // Show loading spinner while data is being fetched
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }
  return (
    <div className="flex  mt-4 items-start">
      <div className="w-[30%]">
        {weatherData && (
          <div className="flex justify-center items-start w-full">
            <div className="block h-[326px] w-[288px] max-w-sm p-6 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="pt-2 pb-2">
                <div className="flex items-start justify-center">
                  <div className="pt-1 ps-1 pe-1">
                    <img
                      src={Images.Location}
                      alt="weather"
                      className="w-[14.25px] h-[15px]"
                    />
                  </div>
                  <p className="text-[#FFFFFF]">
                    {weatherData.location.name}, {weatherData.location.country}{" "}
                    <br /> <span>{weatherData.location.region}</span>
                  </p>
                </div>
              </div>
              <div className="flex justify-center flex-col items-center pt-4 pb-4">
                <img
                  src={weatherData.current.condition.icon}
                  alt="weather"
                  className="w-[67.5px] h-[67.5px]"
                />
                <span className="text-[45px] font-bold text-white dark:text-white">
                  {weatherData.current.temp_c} °<span>C</span>
                </span>
                <p className="text-white text-sm font-normal pt-2.5">
                  {weatherData.current.condition.text}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-[70%]">
        <div className="block h-[105px] w-[840px] px-4 py-1 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <div className="flex justify-around items-start">
            {weatherData?.forecast?.forecastday?.map((items: any) => {
              return (
                <div className="flex flex-col items-center justify-center">
                  <img src={items?.day?.condition?.icon} alt="" />
                  <span className="text-[12px] text-[#ffffff]">
                    {items?.day?.mintemp_c} . {items?.day?.maxtemp_c}
                  </span>
                  <span className="text-[12px] text-[#ffffff]">
                    {items?.day?.condition?.text}
                  </span>
                </div>
              );
            })}

            {/* <div className="flex flex-col items-center justify-center">
              <img src={Images.RainCloud} alt="" />
              <span className="text-[12px] text-[#ffffff]">9.5°C . 25.5°C</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src={Images.RainCloud} alt="" />
              <span className="text-[12px] text-[#ffffff]">9.5°C . 25.5°C</span>
            </div> */}
          </div>
        </div>
        <div className="flex flex-wrap justify-start">
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.WindSpeed} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">Wind Speed</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.wind_kph}
                  <span className="text-[12px] text-[#ffffff]">Km/h</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="h-[86px] bg-gray-200 rounded-full w-2.5  dark:bg-gray-700 flex items-end">
                  <div className="h-[30px] bg-green-600 w-2.5 rounded-full dark:bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.Flag} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">Wind Direction</p>
                </div>
              </div>
              <div>
                <img src={Images.UpArrow} alt="windspeed" />
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.wind_degree}
                  <span className="text-[12px] text-[#ffffff] ps-1">
                    {weatherData?.current?.wind_dir}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.RainChance} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">Humidity</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.humidity}
                  <span className="text-[12px] text-[#ffffff] ps-1">%</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="h-[86px] bg-gray-200 rounded-full w-2.5  dark:bg-gray-700 flex items-end">
                  <div className="h-[30px] bg-green-600 w-2.5 rounded-full dark:bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.UvIndex} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">UV Index</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.uv}
                  <span className="text-[12px] text-[#ffffff] ps-1">UV</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="h-[86px] bg-gray-200 rounded-full w-2.5  dark:bg-gray-700 flex items-end">
                  <div className="h-[30px] bg-green-600 w-2.5 rounded-full dark:bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.RainChance} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">Rain Chances</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.precip_in}
                  <span className="text-[12px] text-[#ffffff] ps-1">%</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="h-[86px] bg-gray-200 rounded-full w-2.5  dark:bg-gray-700 flex items-end">
                  <div className="h-[30px] bg-green-600 w-2.5 rounded-full dark:bg-green-500"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-2 mb-2 ms-2 me-2 h-[98px] w-[264px] px-4 py-2 bg-[#345F92] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flex justify-between flex-col">
              <div>
                <div className="flex items-center gap-3">
                  <img src={Images.Temperature} alt="windspeed" />
                  <p className="text-[12px] text-[#ffffff]">Temperature</p>
                </div>
              </div>
              <div>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.feelslike_c} °<span>C</span>
                </p>
                <p className="text-[20px] font-[400] text-[#ffffff]">
                  {weatherData?.current?.feelslike_f} °<span>C</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
