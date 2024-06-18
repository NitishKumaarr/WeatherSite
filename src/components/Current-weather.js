import React from 'react'

const CurrentWeather = ({ data }) => {
    return (
        <div className='w-80 rounded-lg shadow-[10px_-2px_20px_2px_rgba(0,0,0,0.3)] text-white bg-blue-500 mt-5 mx-auto p-5'>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-semibold text-lg leading-none m-0 tracking-wide'>{data.city}</p>
                    <p className='font-normal text-sm leading-none m-0'>{data.weather[0].description
                    }</p>
                </div>
                <img alt='weather' className='w-24' src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-7xl leading-none tracking-tighter my-2.5'>
                    {Math.round(data.main.temp)}C
                </p>
                <div className='w-full pl-5'>
                    <div className='flex justify-between'>
                        <span className='text-left font-normal text-xs border-b border-white'>Details</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-left font-normal text-xs'>Feels Like</span>
                        <span className='text-right font-semibold text-xs'>{Math.round(data.main.feels_like)}C</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-left font-normal text-xs'>Wind</span>
                        <span className='text-right font-semibold text-xs'>{data.wind.speed} m/s</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-left font-normal text-xs'>Humidity</span>
                        <span className='text-right font-semibold text-xs'>{data.main.humidity}%</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-left font-normal text-xs'>Pressure</span>
                        <span className='text-right font-semibold text-xs'>{data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentWeather
