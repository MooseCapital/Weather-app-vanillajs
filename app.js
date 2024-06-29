let zipinput = document.querySelector(".zipinput");
let search = document.querySelector(".search");
let city = document.querySelector(".city");
let state = document.querySelector(".state");
let temp = document.querySelector(".temp");
let wind = document.querySelector(".wind");
let description = document.querySelector(".description");
let tempsymbol = document.querySelector(".tempsymbol");
let videoback = document.querySelector(".videoback");


let clearImage= "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691627/clear-nature_kxzras.webp";
let rainImage = "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691631/rain_w3km5w.webp"
let snowImage = "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691632/snow_qoehta.webp"
let thunderstormImage = "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691634/thunderstorm_pv4pqx.webp";
let cloudImage = "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691628/cloudy-ocean_ldvbhl.webp";
let nycImage = "https://res.cloudinary.com/dnkrylfaq/image/upload/v1719691629/nyc2_oeh3hc.webp";


search.addEventListener("click", (e) => {
    if (!zipinput.value) {
        zipCodeToCoord();
    } else {
        zipCodeToCoord(zipinput.value);
    }
})
zipinput.addEventListener("keypress", function(event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        // Trigger the button element with a click
        search.click();
    }
});

async function zipCodeToCoord(location = 10006, defaultvid) {
    try {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${location},US&appid=a200fff5462f3bfa8e2d607ab83cbcc6&units=imperial`, {mode:"cors"});
    let data = await response.json();

    let nameResponse = await fetch( `https://api.openweathermap.org/geo/1.0/reverse?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=a200fff5462f3bfa8e2d607ab83cbcc6`, {mode: "cors"});
    let nameData = await nameResponse.json();
        console.log(data);
        console.log(nameData);

        if (data.weather[0].main === "Clouds") {
            videoback.src = cloudImage;
        } else if (data.weather[0].main === "Thunderstorm") {
            videoback.src = thunderstormImage;
        } else if (data.weather[0].main === "Drizzle") {
            videoback.src = rainImage;
        } else if (data.weather[0].main === "Rain") {
            videoback.src = rainImage;
        } else if (data.weather[0].main === "Snow") {
            videoback.src = snowImage;
        } else if (data.weather[0].main === "Clear") {
            videoback.src = clearImage;
        }


        city.innerText = `${nameData[0].name},`;
        state.innerText = nameData[0].state;

        temp.innerText = Math.round(data.main.temp);
        description.innerText = data.weather[0].description;
        wind.innerText = `${Math.round(data.wind.speed)} MPH`;
        tempsymbol.src = "images/icons8-fahrenheit-symbol-90.png";

        if (defaultvid) {
            defaultvid();
        }
    } catch (err) {
        console.log(`We have error in getWeather ${err}`);
        city.innerText = "Did Not";
        state.innerText = "Find";
        temp.innerText = "";
        description.innerText = "";
        wind.innerText = "";
        tempsymbol.src = "";
    }
}

function setNYCVideo() {
    videoback.src = nycImage;
}
zipCodeToCoord(10006, setNYCVideo);
















