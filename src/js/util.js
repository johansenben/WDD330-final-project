export const addAlert = (message, className) => {
    const alertsElement = document.querySelector("#alerts");
    alertsElement.classList.remove("hidden");
    
    const alertElement = document.createElement("li");
    alertElement.classList.add("alert");
    alertElement.classList.add(`alert-${className}`);
    alertElement.innerHTML = `<span>${message}</span><button>X</button>`;
    alertElement.querySelector("button").addEventListener("click", (e) => {
        //alertsElement.removeChild(alertElement);
        alertElement.classList.add("remove-alert");
        alertElement.addEventListener("transitionend", (e) => {
            alertsElement.removeChild(alertElement);
        });
    });


    alertsElement.appendChild(alertElement);
}
export const removeAlerts = () => {
    document.querySelector("#alerts").innerHTML = "";
}