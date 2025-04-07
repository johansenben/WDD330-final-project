import { getData } from "./api.js";

const IPGeolocationRoute = "https://api.geoapify.com/v1/ipinfo?apiKey=0fb41ebb271d497db727ebc870f97033";
const getPlacesRoute = (lon, lat) => `https://api.geoapify.com/v1/geocode/reverse?apiKey=0fb41ebb271d497db727ebc870f97033&lat="${lat}&lon=${lon}"&layers=city`;

export const getLocationFromIP = async () => {
    return getData(IPGeolocationRoute)
        .then(res => res.json())
        .catch(error => {
            console.error(error)
        });
}

export const getCityFromLocation = async (longitude, latitide) => {
    //route doesn't work; it thinks the nearest city to Lethbridge, AB is in Montana
    return getData(getPlacesRoute(longitude, latitide))
        .then(res => res.json())
        .catch(error => {
            console.error(error)
        });
}