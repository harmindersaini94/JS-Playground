let cityName = "Vancouver";
let stateCode = "";
let countryCode = "CA";
let lmit = 5;
let apiKEy = "709bd1054acf8bcfa65986641c8608cf";

let api_lat_long_US = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${lmit}&appid=${apiKEy}`;

let form = document
  .querySelector("form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let api_lat_long = `http://api.openweathermap.org/geo/1.0/direct?q=${e.target[0].value},${e.target[1].value}&limit=${lmit}&appid=${apiKEy}`;

    console.log(e.target[0].value);
    console.log(e.target[1].value);

    let response = await fetch(api_lat_long);
    let cityData = await response.json();

    console.log(cityData);
    console.log(cityData[0].lat);
    console.log(cityData[0].lon);

    let api_current_weather_data = `https://api.openweathermap.org/data/2.5/weather?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${apiKEy}`;

    let response_current_weather = await fetch(api_current_weather_data);
    let cityData_current_weather = await response_current_weather.json();

    console.log(cityData_current_weather);
    console.log(cityData_current_weather.main.temp);

    let temp_degC = parseFloat(cityData_current_weather.main.temp) - 273.15;

    let curr_city = (document.querySelector(
      "#curr_city"
    ).innerHTML = `City: ${e.target[0].value}`);
    let curr_temp = (document.querySelector(
      "#curr_temp"
    ).innerHTML = `${temp_degC.toFixed(2)}`);
    let curr_weat = (document.querySelector(
      "#curr_weat"
    ).innerHTML = `${cityData_current_weather.weather[0].main} - ${cityData_current_weather.weather[0].description}`);

    // 5 Day forecast

    let api_5_day_forc = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityData[0].lat}&lon=${cityData[0].lon}&appid=${apiKEy}`;

    let response_5day_weather = await fetch(api_5_day_forc);
    let cityData_5day_weather = await response_5day_weather.json();

    console.log(cityData_5day_weather.list);

    let fiveDay = document.querySelector("#fiveDay");

    cityData_5day_weather.list.forEach((eachday, index) => {
    if(index === 0 || index === 5 || index === 13 || index === 21 || index === 29 || index === 37){
        let temp_degC = parseFloat(eachday.main.temp) - 273.15;
        let pEle = document.createElement("p");
        pEle.appendChild(
          document.createTextNode(
            `Date: ${eachday.dt_txt}, Temperature: ${temp_degC.toFixed(2)} Deg, Weather Conditiond: ${eachday.weather[0].main} (${eachday.weather[0].description})`
          )
        );
        fiveDay.appendChild(pEle);
    }
    });
  });
