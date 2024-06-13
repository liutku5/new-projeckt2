
// const d = new Date();
// let day = d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDate().toString().padStart(2, "0") + " " + d.getHours().toString().padStart(2, "0") + ":00:00";
// console.log(day);



document.querySelector("#submit").addEventListener("click", searchCity)

function searchCity(e) {
    e.preventDefault();
    let city = document.querySelector("#city");
    callApi(city.value);
    city.value = "";
}

function callApi(city) {
    let url = "https://api.meteo.lt/v1/places/" + city + "/forecasts/long-term";
    fetch(url)
        .then(response => { return response.json(); })
        .then(data => { printToConsole(data) })

}

const d = new Date();
let day = d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDate().toString().padStart(2, "0") + " " + d.getHours().toString().padStart(2, "0") + ":00:00";
console.log(day);

function printToConsole(data) {
    let result = 0;
    for (let i = 0; i < data.forecastTimestamps.length; i++) {
        if (data.forecastTimestamps[i].forecastTimeUtc == day);
        result = i;
        break;
    }

    console.log(data.place.name);
    console.log(data.place.administrativeDivision);
    console.log(data.forecastTimestamps[result]);
    let output = document.querySelector("#at");
    let HTML = "";
    let selectData = data.forecastTimestamps[result];
    HTML += displayElemenat("Miestas: " + data.place.name);
    HTML += displayElemenat("Administracinis skyrius: " + data.place.administrativeDivision);
    HTML += displayElemenat("Oro temperatūra " + selectData.airTemperature);
    HTML += displayElemenat("Jaučiasi kaip temperatūra: " + selectData.feelsLikeTemperature);
    HTML += displayElemenat("Vėjo greitis: " + selectData.windSpeed);
    HTML += displayElemenat("Vėjo gūsis: " + selectData.windGust);
    HTML += displayElemenat("Vėjo kryptis: " + selectData.windDirection);
    HTML += displayElemenat("Debesų danga: " + selectData.cloudCover);
    HTML += displayElemenat("Jūros lygio slėgis: " + selectData.seaLevelPressure);
    HTML += displayElemenat("Santykinė drėgmė: " + selectData.relativeHumidity);
    HTML += displayElemenat("Bendras kritulių kiekis: " + selectData.totalPrecipitation);
    HTML += displayElemenat("Orų aprašymas: " + selectData.conditionCode);
   
    console.log(HTML);
    output.innerHTML = HTML;
}

function displayElemenat(val) {
    return "<div>" + val + "</div>";
    
}



