import { getCityFromLocation, getLocationFromIP } from "./location.js";
import { getWeatherData } from "./weather.js";

//console.log(await getLocationFromIP());
//console.log(await getCityFromLocation(-112,49))
console.log(await getWeatherData(-112.8 + '',49.7 + ''))