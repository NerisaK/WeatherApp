// Weather API https://openweathermap.org/api
// Key: 64b24d6f700e91128f18e56fa42c624c
//**********************************************
// Weather icons:
// possible goodWeather = sunny OR cloudy
// possible badWeather = rainy OR thundery


const today = document.querySelector(".today");
const days = document.querySelectorAll(".day");
const daySpan = document.querySelector("#weekday");
const dateSpan = document.querySelector("#date");
const tempArr = [];
const weatherArr = [];
let date;



// Figures out which day of the week is now (or will be, depending on the value passed)
function whichDay(dayNum){
    let text;
    switch (dayNum) {
    case 1: text = "Monday"; break;
    case 2: text = "Tuesday"; break;
    case 3: text = "Wednesday"; break;
    case 4: text = "Thursday"; break;
    case 5: text = "Friday"; break;
    case 6: text = "Saturday"; break;
    case 0: text = "Sunday"; break;
    default: console.log("Invalid day number!");
    }
    return text;
};


// Shows current date
function setDate() {
    date = new Date();
    let dayWeek = date.getDay();    
    let dayWeekName = whichDay(dayWeek);    
    let dayStr = dayWeekName;
    let dateStr = date.toLocaleDateString();
    daySpan.innerHTML = dayStr;
    dateSpan.innerHTML = dateStr;
};

setDate();


// Sets the names of coming days according to what day is today
function nextDays() {
    let i = date.getDay();
    for (day of days) {
        if (i<7){i++;}
        else {i = 1;}        
        let dayWeekName = whichDay(i).slice(0, 3); //Shortened to 3 chars (e.g. Mon)
        let name = document.createElement("span");
        name.className = "dayName";
        name.innerText = dayWeekName;
        day.appendChild(name);  
    }
};

nextDays();



// **** Getting data from a Weather API **** //

const apiID = "&appid=64b24d6f700e91128f18e56fa42c624c";
const apiSearch = "https://api.openweathermap.org/data/2.5/weather?q=";
// City is set to Prague at the moment, but the user will be able to choose another city
let cityName = "Prague".toLowerCase();
let stateCode = "CZ".toLowerCase();
let findCity = apiSearch + cityName + "," + stateCode + apiID;

const apiWeek = "https://api.openweathermap.org/data/2.5/onecall?";
const apiWeekExclude = "&exclude=current,minutely,hourly,alerts&units=metric";
let address;

// Func. searches for provided city, gets its coordinates
// and returns an API address using them
async function getCityCoordinates() {
    await fetch(findCity)
        .then(response => response.json())
        .then(function(json) {
        let latNum = json.coord.lat;
        let lonNum = json.coord.lon;
        let apiLat = "lat=" + latNum;
        let apiLon = "&lon=" + lonNum;
        let fullAPI = apiWeek + apiLat + apiLon + apiWeekExclude + apiID;       
        address = fullAPI;
        })
        .catch(err => {console.log('Request Failed', err)})
};

// Gets temp and weather of provided city for next days, using the address from previous function, and saves those data to arrays
async function getWeather() {
    await getCityCoordinates();
    await fetch(address)
        .then (response => response.json())
        .then(function(json) {
            for (let i = 0; i < 8; i++) {
                tempArr[i] = json.daily[i].temp.day.toFixed();
                weatherArr[i] = json.daily[i].weather[0].main;
            }
        })
        .catch(err => {console.log('Request Failed', err)})
};



// *** Setting the weather and temperature *** //

//function goodWeather(sunny) {
//    let img = document.createElement("div");
//    img.className = "weatherImg " + sunny;
//    return img;
//};
//
//function badWeather (rainy) {
//    let img = document.createElement("div");
//    let div1 = document.createElement("div");
//    let div2 = document.createElement("div");    
//    img.className = "weatherImg " + rainy;
//    
//    if (rainy === "thundery") {
//        div1.className = `weatherImg thundery__cloud`;
//        div2.className = `weatherImg thundery__rain`;
//    }
//    else {
//        div1.className = `weatherImg rainy__cloud`;
//        div2.className = `weatherImg rainy__rain`;
//    }
//    img.appendChild(div1);
//    img.appendChild(div2);
//    return img;
//};
//
//function whichWeather(weatherStr, day) {
//    let str = weatherStr;
//    switch (str) {
//        case "Thunderstorm": img = badWeather("thundery"); break;
//        case "Drizzle": img = badWeather("rainy"); break;
//        case "Rain": img = badWeather("rainy"); break;
//        case "Snow": img = badWeather("rainy"); break;
//        case "Clear": img = goodWeather("sunny"); break;
//        default: img = goodWeather("cloudy"); break;
//    }
//    day.appendChild(img);    
//};


// Show temperature and weather for next week in chosen city
async function setWeather() {
    await getWeather();
    // *** Weather for today: *** //
    // Create elements
    let dayName = document.createElement("span");
    let tempSpan = document.createElement("span");
    let img = document.createElement("div");
    // Get weather and temperature from json file
    let todayTemp = tempArr[0];
    let todayWeather = weatherArr[0];
    // Set classes and texts
    dayName.innerHTML = "Today";
    dayName.className = "dayName";
    tempSpan.className = "dayTemp";
    tempSpan.innerText = `${todayTemp}°`;
    img.className = "weatherImg cloudy";
    //Append
    today.appendChild(img);
    today.appendChild(dayName);
    today.appendChild(document.createElement("br"));        
    today.appendChild(tempSpan);
    // *** Weather for next days: *** //
    let i = 1
    for (day of days) {        
        let tempSpan = document.createElement("span");
        let img = document.createElement("div");             
        tempSpan.className = "dayTemp";
        let temp = tempArr[i];
        let weather = weatherArr[i];
        tempSpan.innerText = `${temp}°`;
        img.className = "weatherImg sunny";
        day.appendChild(img);        
        day.appendChild(tempSpan);
        i++
    }
};

setWeather();