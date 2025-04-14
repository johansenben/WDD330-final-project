import { getData } from "./api.js";

const locationApiKey = import.meta.env.VITE_locationApiKey;
const weatherApiKey = import.meta.env.VITE_weatherApiKey;

const IPGeolocationRoute = `https://api.geoapify.com/v1/ipinfo?apiKey=${locationApiKey}`;
const getPlacesRoute = (lon, lat) => `http://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${lat},${lon}`;

export const getLocationFromIP = async () => {
    return getData(IPGeolocationRoute)
        .then(res => res.json())
        .then(json => json.location)
        .catch(error => {
            console.error(error)
        });
}

export const getCityFromLocation = async (longitude, latitide) => {
    //route doesn't work; it thinks the nearest city to Lethbridge, AB is in Montana
    return getData(getPlacesRoute(longitude, latitide))
        .then(res => res.json())
        .then(json => json.location)
        .then(location => {
            if (!location || [location?.name, location?.region, location?.country].includes(undefined))
                throw new Error("Can't find City name");
            return `${location.name}, ${location.region}, ${location.country}`;
        })
        .catch(error => {
            console.error(error)
        });
}