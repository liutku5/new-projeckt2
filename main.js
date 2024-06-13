


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
let curentTime = d.getFullYear() + "-" + (d.getMonth() + 1).toString().padStart(2, "0") + "-" + d.getDate().toString().padStart(2, "0") + " " + d.getHours().toString().padStart(2, "0") + ":00:00";
console.log(curentTime);

function printToConsole(data) {
    let result = 0;
    for (let i = 0; i < data.forecastTimestamps.length; i++) {
        if (data.forecastTimestamps[i].forecastTimeUtc == curentTime) {
            result = i;
            break;
        }
    }


    console.log(data.place.name);
    console.log(data.place.administrativeDivision);
    console.log(data.forecastTimestamps[result]);
    let output = document.querySelector("#res");
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



// function displayElement(val) {
//     return `
//       <div className="row">
//         <div className="col-1"></div>
//         <div className="col-4">
//           <div className="card text-bg-light mb-3" style={{ maxWidth: "22rem" }}>
//             <div className="card-header">
//               <img src="./img/vecteezy_3d-weather-icon-day-with-rain_24825195.png" alt="Weather icon" />
//               Orai
//               <img src="./img/vecteezy_3d-weather-icon-day-with-rain_24825193.png" alt="Weather icon" />
//             </div>
//             <div className="card-body">
//               <h5 className="card-title">Jūsų pasirinktas mietas</h5>
//               <div className="card-text">
//                 <div>${val}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-7"></div>
//       </div>
//     `;
// }