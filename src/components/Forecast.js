import React, { useState, useEffect } from 'react';

const Forecast = ({ data }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        if (data && data.list) {

            const filteredData = data.list.filter((item, index) => index % 8 === 3);
            setDailyData(filteredData.slice(0, 7));
        }
    }, [data]);

    return (
        <div className=" bg-blue-300 p-6 mt-2 w-[80%] m-auto rounded-lg">
            <div className="text-center my-6">
                <h1 className="text-4xl font-bold text-black">Weather Forecast</h1>
            </div>
            <nav className="flex justify-between text-center bg-[#075985] p-4 rounded-md shadow-md w-full">
                <h3 className="font-bold text-white">Icon</h3>
                <h3 className="font-bold text-white">Description</h3>
                <h3 className="font-bold text-white">Temperature</h3>
                <h3 className="font-bold text-white">Feels like</h3>
                <h3 className="font-bold text-white">Wind</h3>
                <h3 className="font-bold text-white">Humidity</h3>
                <h3 className="font-bold text-white">Pressure</h3>
            </nav>
            {dailyData.map((day, index) => (
                <div key={index} className=" flex justify-between  p-4 bg-gradient-to-t from-[#0c4a6e] to-[#38bdf8] rounded-md shadow-md mt-4 w-full">
                    <div><img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Weather Icon" className='h-10 w-10 ' /></div>
                    <div className='font-semibold text-white'>{day.weather[0].description}</div>
                    <div className='font-semibold text-white'>{Math.round(day.main.temp)}°C</div>
                    <div className='font-semibold text-white'>{Math.round(day.main.feels_like)}°C</div>
                    <div className='font-semibold text-white'>{day.wind.speed} km/h</div>
                    <div className='font-semibold text-white'>{day.main.humidity}%</div>
                    <div className='font-semibold text-white'>{day.main.pressure} hPa</div>
                </div>
            ))}
        </div>
    );
}

export default Forecast;
