import { getData } from "./api.js";

const IPGeolocationRoute = "https://api.geoapify.com/v1/ipinfo?apiKey=0fb41ebb271d497db727ebc870f97033";
const getPlacesRoute = (lon, lat) => `http://api.weatherapi.com/v1/forecast.json?key=cf23cb44b6074560895183203250704&q=${lat},${lon}`;

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