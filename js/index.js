import { getCityFromLocation, getLocationFromIP } from "./location.js";
import { getWeatherData } from "./weather.js";

//console.log(await getLocationFromIP());
//console.log(await getWeatherData(-112.8,49.7))
//console.log(await getCityFromLocation(-112.8,49.7))

document.querySelector("#use-my-location").addEventListener("change", e => {
    const checked = e.target.checked;
    document.querySelector("#latitude").required = !checked;
    document.querySelector("#longitude").required = !checked;
});
const displayData = (useUsersLocation, location, city, weatherData) => {
    if ([useUsersLocation, location, city, weatherData].includes(undefined))
        return;
    document.querySelector("#weather-data").innerHTML = `
        <h2>Weather in ${city}</h2>
        <h3>Latitude: <span>${location.latitude}</span></h3>
        <h3>Longitude: <span>${location.longitude}</span></h3>
        <br>
        <h3>Current Temperature: <span>${weatherData.current.temp_c} &deg;C or ${weatherData.current.temp_f}&deg;F</span></h3>
        <h3>Maximum Temperature: <span>${weatherData.forecast.forecastday[0].day.maxtemp_c} &deg;C or ${weatherData.forecast.forecastday[0].day.maxtemp_f}&deg;F</span></h3>
        <h3>Minimum Temperature: <span>${weatherData.forecast.forecastday[0].day.mintemp_c} &deg;C or ${weatherData.forecast.forecastday[0].day.mintemp_f}&deg;F</span></h3>
        <h3>Average Temperature: <span>${weatherData.forecast.forecastday[0].day.avgtemp_c} &deg;C or ${weatherData.forecast.forecastday[0].day.avgtemp_f}&deg;F</span></h3>

    `;
}
document.querySelector("#get-weather-form").addEventListener("submit", async e => {
    e.preventDefault();
    const useUsersLocation = e.target.querySelector("#use-my-location").checked;
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const location = useUsersLocation ? await getLocationFromIP() : { longitude: values.longitude, latitude: values.latitude };
    const city = await getCityFromLocation(location.longitude, location.latitude);
    const weatherData = await getWeatherData(location.longitude, location.latitude);
    displayData(useUsersLocation, location, city, weatherData);
});
const APIalert = () => {

}