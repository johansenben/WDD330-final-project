import { getCityFromLocation, getLocationFromIP } from "./location.js";
import { addAlert, removeAlerts } from "./util.js";
import { getWeatherData } from "./weather.js";

document.querySelector("#use-my-location").addEventListener("change", e => {
    const checked = e.target.checked;

    //latitude/longitude shouldn't be required if the user wants to use their current location
    document.querySelector("#latitude").required = !checked;
    document.querySelector("#longitude").required = !checked;

    //clear longitude/latitude inputs
    document.querySelector("#latitude").value = "";
    document.querySelector("#longitude").value = "";
});

//if the user starts typing in the latitude/longitude inputs, use-my-location should be unchecked
document.querySelector("#latitude").addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
        document.querySelector("#use-my-location").checked = false;
        e.target.required = true;
        document.querySelector("#longitude").required = true;
    }
});
document.querySelector("#longitude").addEventListener("input", (e) => {
    if (e.target.value.length > 0) {
        document.querySelector("#use-my-location").checked = false;
        document.querySelector("#latitude").required = true;
        e.target.required = true;
    }
});

const displayData = (useUsersLocation, location, city, weatherData) => {
    if ([useUsersLocation, location, city, weatherData].includes(undefined)) {
        addAlert("Undefined Data", "error");
        return;
    }

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

    addAlert("Successfully found weather Data", "success");
}

document.querySelector("#get-weather-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    //reset alerts to avoid confusing the user
    removeAlerts();

    const useUsersLocation = e.target.querySelector("#use-my-location").checked;
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    const location = useUsersLocation ? await getLocationFromIP() : { longitude: values.longitude, latitude: values.latitude };
    const city = await getCityFromLocation(location.longitude, location.latitude);
    const weatherData = await getWeatherData(location.longitude, location.latitude);
    displayData(useUsersLocation, location, city, weatherData);
});
