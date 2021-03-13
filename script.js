// Weather API https://openweathermap.org/api
//******************
// Weather icons:
//******************
// Create sunny and cloudy icons:
// let img = document.createElement("div");
// img.className = "weatherImg sunny/cloudy";
// day.appendChild(img);
//****************************************
//Create partly_cloudy, rainy and thundery:
// let img = document.createElement("div");
// img.className = "weatherImg partly_cloudy/rainy/thundery";
// let div1 = document.createElement("div");
// div1.className = "partly_cloudy__sun/rainy__cloud/thundery__cloud"
// let div2 = document.createElement("div");
// div2.className = "partly_cloudy__cloud/rainy__rain/thundery__rain"
// img.appendChild(div1);
// img.appendChild(div2);
// day.appendchild(img);


const today = document.querySelector(".today");
const days = document.querySelectorAll(".day");
const daySpan = document.querySelector("#weekday");
const dateSpan = document.querySelector("#date");
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
    case 7: text = "Sunday"; break;
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


// Shows temperature - with a default value for now
function setWeather() {
    // Set weather for today
    let name = document.createElement("span");
    name.innerHTML = "Today";
    name.className = "dayName";
    let temp = document.createElement("span");
    temp.className = "dayTemp";
    temp.innerText = "10°";
    let img = document.createElement("div");
    img.className = "weatherImg cloudy";        
    today.appendChild(img);
    today.appendChild(name);
    today.appendChild(document.createElement("br"));        
    today.appendChild(temp);
    // Set weather for next days
    for (day of days) {        
        let temp = document.createElement("span");
        temp.className = "dayTemp";
        temp.innerText = "10°";
        let img = document.createElement("div");
        img.className = "weatherImg sunny";
        day.appendChild(img);        
        day.appendChild(temp);
    }
};

setWeather();