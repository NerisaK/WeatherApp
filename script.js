// Weather API https://openweathermap.org/api 

const today = document.querySelector(".today");
const days = document.querySelectorAll(".day");
const timeSpan = document.querySelector("#weekday");
const dateSpan = document.querySelector("#date");

// *** Setting date and weather *** //

function whichDay(dayNum){
    let text;
    switch (dayNum) {
    case 0: text = "Monday"; break;
    case 1: text = "Tuesday"; break;
    case 2: text = "Wednesday"; break;
    case 3: text = "Thursday"; break;
    case 4: text = "Friday"; break;
    case 5: text = "Saturday"; break;
    case 6: text = "Sunday"; break;
    default: console.log("Invalid day number!");
    }
    return text;
};

function setDate() {
    let date = new Date();
    let dayWeek = date.getDay();    
    let dayWeekName = whichDay(dayWeek);    
    let timeStr = dayWeekName;
    let dateStr = date.toLocaleDateString();
    timeSpan.innerHTML = timeStr;
    dateSpan.innerHTML = dateStr;
};

setDate();

function setWeather() {
    let temp = document.createElement("span");
    temp.className = "dayTemp";
    temp.innerText = "10°";
    today.appendChild(temp);
    for (day of days) {
    let name = document.createElement("span");
    name.className = "dayName";
    name.innerText = "day";
    let temp = document.createElement("span");
    temp.className = "dayTemp";
    temp.innerText = "10°";
    day.appendChild(name);
    day.appendChild(temp);
    }
};

setWeather();