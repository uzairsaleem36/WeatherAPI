import React, { useState, useEffect } from 'react';

export default function WeatherAPI() {
  const [weather, setWeather] = useState('Clear');
  const [location, setLocation] = useState('London, UK');
  const [temperature, setTemperature] = useState('20°');
  const [highLow, setHighLow] = useState('H:25° L: 15°');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Default weather data for London on component mount
    fetchWeatherData('London');
  }, []);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3755b57f85e253d44c59b1c8565c0e4f&units=metric`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('City not found');
      const data = await response.json();

      setWeather(data.weather[0].main);
      setLocation(`${data.name}, ${data.sys.country}`);
      setTemperature(`${Math.round(data.main.temp)}°`);
      setHighLow(`H:${Math.round(data.main.temp_max)}° L: ${Math.round(data.main.temp_min)}°`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="relative w-[342px] h-[184px] p-5 text-white flex flex-col justify-between bg-gradient-to-r from-[#1b1035] to-[#2a1a92] rounded-lg shadow-lg">
        <svg
          className="absolute inset-0 z-[-1] w-full h-full text-purple-600 fill-current"
          viewBox="0 0 342 175"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#paint0_linear_103_640)"
            d="M0 66.4396C0 31.6455 0 14.2484 11.326 5.24044C22.6519 -3.76754 39.6026 0.147978 73.5041 7.97901L307.903 62.1238C324.259 65.9018 332.436 67.7909 337.218 73.8031C342 79.8154 342 88.2086 342 104.995V131C342 151.742 342 162.113 335.556 168.556C329.113 175 318.742 175 298 175H44C23.2582 175 12.8873 175 6.44365 168.556C0 162.113 0 151.742 0 131V66.4396Z"
          />
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              y2="128"
              x2="354.142"
              y1="128"
              x1="0"
              id="paint0_linear_103_640"
            >
              <stop stopColor="#5936B4" />
              <stop stopColor="#362A84" offset="1" />
            </linearGradient>
          </defs>
        </svg>
        <p className="text-[50px] z-2">{temperature}</p>
        <div className="flex justify-between">
          <div>
            <p className="text-[rgba(235,235,245,0.60)]">{highLow}</p>
            <p>{location}</p>
          </div>
          <p className="self-end">{weather}</p>
        </div>
      </div>
      
      <div className="mt-6 w-[342px]">
        <input
          type="text"
          placeholder="Enter location"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          onKeyDown={(e) => {
            if (e.key === 'Enter') fetchWeatherData(e.target.value);
          }}
        />
        {loading && (
          <div className="flex justify-center items-center mt-3">
            <svg
              className="w-8 h-8 text-purple-600 fill-current animate-spin"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 464c114.9 0 208-93.1 208-208S370.9 48 256 48 48 141.1 48 256s93.1 208 208 208zm0 32C114.6 496 0 381.4 0 256S114.6 16 256 16s256 114.6 256 256-114.6 256-256 256zM128 256c0-33.6 13.1-64 34.4-87.6L272 336l3.5 3.5-44.1 45.1L168 305.5C146.7 270.5 128 236.1 128 256z"/>
            </svg>
          </div>
        )}
        {error && <p className="mt-3 text-white">{error}</p>}
      </div>
    </div>
  );
}
