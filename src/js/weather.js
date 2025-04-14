import { getData } from "./api.js";

const weatherApiKey = import.meta.env.VITE_weatherApiKey;

const getWeatherRoute = (lon, lat) => `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}`;

export const getWeatherData = async (longitude, latitude) => {
    return getData(getWeatherRoute(longitude, latitude))
        .then(res => res.json())
        .catch(error => {
            console.error(error)
        });
}