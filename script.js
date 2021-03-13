// Weather API https://openweathermap.org/api 

const today = document.querySelector(".today");
const days = document.querySelectorAll(".day");
const daySpan = document.querySelector("#weekday");
const dateSpan = document.querySelector("#date");
let date;


// Figures out which day of the week is now (or will be, depending on the value passed)
function whichDay(dayNum){
    let text;
    switch (dayNum) {
    case 1: text = "Mon"; break;
    case 2: text = "Tue"; break;
    case 3: text = "Wed"; break;
    case 4: text = "Thu"; break;
    case 5: text = "Fri"; break;
    case 6: text = "Sat"; break;
    case 7: text = "Sun"; break;
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
    console.log(i);
    for (day of days) {
        if (i<7){i++;}
        else {i = 1;}        
        console.log(i);
        let dayWeekName = whichDay(i);
        let name = document.createElement("span");
        name.className = "dayName";
        name.innerText = dayWeekName;
        day.appendChild(name);  
    }
};

nextDays();


// Shows temperature - with a default value for now
function setWeather() {
    // Set weather for today
    let temp = document.createElement("span");
    temp.className = "dayTemp";
    temp.innerText = "10°";
    today.appendChild(temp);
    // Set weather for next days
    for (day of days) {        
        let temp = document.createElement("span");
        temp.className = "dayTemp";
        temp.innerText = "10°";        
        day.appendChild(temp);
    }
};

setWeather();