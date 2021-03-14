// Weather API https://openweathermap.org/api
// Key: 64b24d6f700e91128f18e56fa42c624c
//**********************************************
// Weather icons:
// possible goodWeather = sunny OR cloudy
// possible badWeather = rainy OR thundery


const today = document.querySelector(".today .dayName");
const dayNames = document.querySelectorAll(".day .dayName");
const dayTemps = document.querySelectorAll(".dayTemp");
const daysWeather = document.querySelectorAll(".day .weather");
const daySpan = document.querySelector("#weekday");
const dateSpan = document.querySelector("#date");
const tempArr = [];
const weatherArr = [];
const weatherDescArr = [];
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
    for (day of dayNames) {
        if (i<7){i++;}
        else {i = 1;}        
        let dayWeekName = whichDay(i).slice(0, 3); //Shortened to 3 chars (e.g. Mon)        
        day.innerText = dayWeekName;        
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
        .then(function(json) {console.log(json);
            for (let i = 0; i < 8; i++) {
                tempArr[i] = json.daily[i].temp.day.toFixed();
                weatherArr[i] = json.daily[i].weather[0].main;
                weatherDescArr[i] = json.daily[i].weather[0].description;
            }
        })
        .catch(err => {console.log('Request Failed', err)})
};



// *** Setting the weather and temperature *** //


// Possible Weather Conditions: Thunderstorm, Drizzle, Rain, Snow, Clear, Clouds
// + else like mist, tornado, ...

// Show temperature and weather for next week in chosen city
async function setWeather() {
    await getWeather();       
    let todayIMG = document.createElement("div");
    todayIMG.className = "weatherImg cloudy";
    today.after(todayIMG);
    // Use weather and temperature from json file
    let i = 0
    for (day of dayTemps) {        
        let temp = tempArr[i];
        day.innerText = `${temp}°`;
        i++
    }
    
    let currentWeather = document.querySelector(".today .weather");
    currentWeather.innerText = weatherDescArr[0];
    let j = 1;
    
    for (weather of daysWeather) {
    let img = document.createElement("div");
    img.className = "weatherImg sunny";
    weather.innerText = weatherDescArr[j];
    weather.after(img);
    j++
    }
    
};

setWeather();