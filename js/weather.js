import { getData } from "./api.js";

const getWeatherRoute = (lon, lat) => `http://api.weatherapi.com/v1/forecast.json?key=cf23cb44b6074560895183203250704&q=${lat},${lon}`;

export const getWeatherData = async (longitude, latitude) => {
    return getData(getWeatherRoute(longitude, latitude))
        .then(res => res.json())
        .catch(error => {
            console.error(error)
        });
}