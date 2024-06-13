
const d = new Date();
let day = d.getFullYear;
console.log(d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDay().toString().padStart(2, "0") + " " + d.getHours().toString().padStart(2, "0") + ":00:00");



document.querySelector("#submit").addEventListener("click", searchCity)

function searchCity(e){
    e.preventDefealt();
    let city = document.querySelector("#city");
    callApi(city.value);
    city.value = "";
}

function callApi(city) {
    let url = "https://api.meteo.lt/v1/places/" +  city + "/forecasts/long-term";
    fetch(url)
    .then(response => { return response.json(); })
    .then(data => { printToConsole(data); })

}

function printToConsole(data) {
    console.log(data.forecastTimestamps[0].forecastTimeUtc);
}

