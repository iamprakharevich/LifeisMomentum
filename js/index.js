//generals
const solids = document.querySelectorAll(".fa-solid"), 
brands = document.querySelectorAll(".fa-brands"),
popups = document.querySelectorAll(".popup_content"),
links = document.querySelectorAll("a");
let theme = "dark";

//+slider
var slides = ["src/image/1.jpg", "src/image/2.jpg", "src/image/3.jpg", "src/image/4.jpg", "src/image/5.jpg", "src/image/6.jpg", "src/image/7.jpg", "src/image/8.jpg", "src/image/9.jpg", "src/image/10.jpg"]
let i=0;

function nextSlide(){
    if(i<slides.length-1){ i++; 
        document.body.setAttribute("style", `background: url(https://iamprakharevich.github.io/LifeisMomentum/${slides[i]}); background-repeat: no-repeat; background-position: center; background-size: cover`);
    } else { i=0;
        document.body.setAttribute("style", `background: url(https://iamprakharevich.github.io/LifeisMomentum/${slides[i]}); background-repeat: no-repeat; background-position: center; background-size: cover`);
    }
}

function prevSlide(){
    if(i>0){ i--; 
        document.body.setAttribute("style", `background: url(https://iamprakharevich.github.io/LifeisMomentum/${slides[i]}); background-repeat: no-repeat; background-position: center; background-size: cover`);
    } else { i=slides.length-1;
        document.body.setAttribute("style", `background: url(https://iamprakharevich.github.io/LifeisMomentum/${slides[i]}); background-repeat: no-repeat; background-position: center; background-size: cover`);
    }
}

setInterval(nextSlide, 100000)

document.querySelector('.btn-right').addEventListener('click',nextSlide)
document.querySelector('.btn-left').addEventListener('click',prevSlide)
//-slider

//+weather
document.querySelector(".city").value = localStorage.getItem('city');
var APIKey = "e1bf0b3d8d9707117cb7c5a75390b87b",
    units = [{name: "metric", value:"°C", value2:"m/s"},{name: "imperial", value:"°F", value2:"mph"}], lang = ["en","ru"],
	u = 0, l = 0;

async function getWeather(){
    const city = document.querySelector(".city").value;
    localStorage.setItem('city',city.toString());
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang[l]}&appid=${APIKey}&units=${units[u].name}`;
    fetch(url).then(res=>res.json()).then(result=>{
        if(result.weather[0].main === 'Clear'){
            document.querySelector(".weather-icon").innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else if (result.weather[0].main === "Clouds") {
            document.querySelector(".weather-icon").innerHTML = '<i class="fa-solid fa-cloud"></i>';
        } else if (result.weather[0].main === "Thunderstorm"){
            document.querySelector(".weather-icon").innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>';
        } else if (result.weather[0].main === "Rain"){
            document.querySelector(".weather-icon").innerHTML = '<i class="fa-solid fa-cloud-showers"></i>'
        };
        document.querySelector(".temperature").textContent = `${Math.trunc(result.main.temp*1)} ${units[u].value}`;
        document.querySelector(".weather-description").textContent = result.weather[0].description;
		document.querySelector(".wind").textContent = `wind: ${result.wind.speed} ${units[u].value2}`;
        document.querySelector(".humidity").textContent = `hum: ${result.main.humidity}%`;
    });
}

getWeather();

document.querySelector(".city").addEventListener("change", getWeather)
//-weather

//+time +greeting
const greeting = document.querySelector(".greeting")

async function displayTime(){
    var dataTime = new Date()
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    document.getElementById('time').innerHTML = dataTime.toLocaleTimeString();
    document.getElementById('date').innerHTML = `${days[dataTime.getDay()]}, ${month[dataTime.getMonth()]} ${dataTime.getDate()}`;

    if(dataTime.getHours() >= 4 && dataTime.getHours() < 12){
        greeting.innerHTML = "Good morning";
    } else if(dataTime.getHours() >= 12 && dataTime.getHours() < 16){
        greeting.innerHTML = "Good afternoon";
    } else if(dataTime.getHours() >= 16 && dataTime.getHours() < 23){
        greeting.innerHTML = "Good evening";
    } else {greeting.innerHTML = "Good night"}
}

setInterval(displayTime, 1000)

document.querySelector(".name").addEventListener("change", () => {
    localStorage.setItem('name', document.querySelector(".name").value.toString())
})
document.querySelector(".name").value = localStorage.getItem('name');
//-time -greeting

//+quote
const quoteBtn = document.querySelector(".change-quote")

async function randomQuote(){
    fetch("https://api.quotable.io/random").then(res=>res.json()).then(result=>{
        document.querySelector(".quote").textContent = result.content;
        document.querySelector(".author").textContent = `- ${result.author}`;
    });
}

randomQuote();

quoteBtn.addEventListener("click", randomQuote);

setInterval(randomQuote, 10000)
//-quote

//+mediaPlayer 
const player = document.getElementById("player"),
    playBtn = document.getElementById("playBtn"),
    prevBtn = document.getElementById("prevBtn"),
    nextBtn = document.getElementById("nextBtn"),
    audio = document.querySelector(".audio"),
    progressBar = document.querySelector(".progressbar"),
    progressContainer = document.querySelector(".progress-container"),
    title = document.querySelector(".song-name"),
    duration = document.querySelector(".duration"),
    position = document.querySelector(".position"),
    volumeBtn = document.getElementById("volumeBtn"),
    volumeRange = document.getElementById("volumeRange"),
    playlistBtn = document.getElementById("playlistBtn");

const songs = [{name:"Syd Matters - To All of You", src: "src/music/Syd Matters - To All of You.mp3", duration: "4:43"},
{name:"Jose Gonzalez - Crosses",src:"../src/music/Jose Gonzalez - Crosses.mp3",duration:"2:41"},
{name:"Sparklehorse, PJ Harvey - Piano fire", src:"../src/music/Sparklehorse - Piano Fire.mp3",duration:"2:43"},
{name:"Syd Matters - Obstacles",src:"../src/music/Syd Matters - Obstacles.mp3",duration:"3:28"},
{name:"alt-J - Something Good",src:"../src/music/alt-J - Something Good.mp3", duration:"3:38"},
{name:"Breton - Got Well Soon",src:"../src/music/Breton - Got Well Soon.mp3",duration:"4:48"},
{name:"Bright Eyes - Lua",src:"../src/music/Bright Eyes - Lua.mp3",duration:"4:31"},
{name:"Mud Flow - The Sense of Me",src:"../src/music/Mud Flow - The Sense of Me.mp3",duration:"2:32"},
{name:"Mogwai - Kids Will Be Skeletons",src:"../src/music/Mogwai - Kids Will Be Skeletons.mp3",duration:"5:27"},
{name:"Foals - Spanish Sahara",src:"../src/music/Foals - Spanish Sahara.mp3",duration:"6:49"},
{name:"Michael Holborn, William Henries - Sunbird",src:"../src/music/Michael Holborn - Sunbird.mp3",duration:"2:55"}];

let songIndex = 0;

function loadSong(song){
    audio.src = songs[songIndex].src;
}

loadSong(songs[songIndex]);

function playSong(){
    player.classList.add("play");
    playBtn.classList.remove("fa-play")
    playBtn.classList.add("fa-pause")
    title.innerHTML=songs[songIndex].name;
    duration.innerHTML = songs[songIndex].duration;
    audio.play();
    setVolume();
}

function pauseSong(){
    player.classList.remove("play");
    playBtn.classList.remove("fa-pause")
    playBtn.classList.add("fa-play")
    audio.pause();
}

function nextSong(){
    if(songIndex<songs.length)
    {
        songIndex++;
        loadSong(songs[songIndex]);
        pauseSong();
        playSong();
    } else {
        songIndex = 0;
        loadSong(songs[songIndex]);
        pauseSong();
        playSong();
    }
}

function prevSong(){
    if(songIndex>0)
    {
        songIndex--;
        loadSong(songs[songIndex]);
        pauseSong();
        playSong();
    } else {
        songIndex = songs.length-1;
        loadSong(songs[songIndex]);
        pauseSong();
        playSong();
    }
}

function format(currentTime) {
    let s = Math.round(currentTime % 60).toString();
    let m = Math.floor(currentTime / 60 % 60).toString();
    return `${m.padStart(2,'0')}:${s.padStart(2,'0')}`;
  }

function updateProgress(e){
    let {duration,currentTime} = e.srcElement;
    let progress = (currentTime / duration) * 100;
    progressBar.style.width = `${progress}%`
    position.innerHTML = format(currentTime);
}

function setProgress(e){
    const width = this.clientWidth;
    let newpos = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (newpos/width)*duration;
}

function setVolume(){
    audio.volume = volumeRange.value;
    if(volumeRange.value==0){
        volumeBtn.classList.remove("fa-volume-high")
        volumeBtn.classList.add("fa-volume-xmark")
    } else {
        volumeBtn.classList.add("fa-volume-high")
        volumeBtn.classList.remove("fa-volume-xmark")
    }
}

document.getElementById("playlistBtn").addEventListener("click", ()=>{
    if(playlistBtn.classList.contains("fa-chevron-down")){
        playlistBtn.classList.remove("fa-chevron-down")
        playlistBtn.classList.add("fa-chevron-up")
        if(theme == "dark"){
            player.setAttribute("style", "height:220px; background-color: rgba(0,0,0, .5); color: white");
        } else {
            player.setAttribute("style", "height:220px; background-color: rgba(255,255,255, .5); color: white");
        }
    } else {
        playlistBtn.classList.add("fa-chevron-down")
        playlistBtn.classList.remove("fa-chevron-up")
        if(theme == "dark"){
            player.setAttribute("style", "height:130px; background-color: rgba(0,0,0, .5); color: white");
        } else {
            player.setAttribute("style", "height:130px; background-color: rgba(255,255,255, .5); color: white");
        }
    }
})


//get song index from playlist
var items = document.querySelectorAll(".play-list li"),
tab = [];

for(var j = 0; j < items.length; j++){
    tab.push(items[j].innerHTML) ;
}

for(var j = 0; j < items.length; j++){
    items[j].onclick = function(){
        songIndex = tab.indexOf (this.innerHTML);
        loadSong(songIndex);
        playSong();
    }
}

volumeRange.addEventListener("change",setVolume)
audio.addEventListener("timeupdate",updateProgress)
progressContainer.addEventListener("click",setProgress)
playBtn.addEventListener("click", () => {
    if (player.classList.contains("play")){pauseSong()}else{playSong()};
})
volumeBtn.addEventListener("click", ()=>{
    if(volumeBtn.classList.contains("fa-volume-high")){
        volumeBtn.classList.remove("fa-volume-high")
        volumeBtn.classList.add("fa-volume-xmark")
        audio.volume=0;
    } else {
        volumeBtn.classList.add("fa-volume-high")
        volumeBtn.classList.remove("fa-volume-xmark")
        audio.volume = volumeRange.value;
    }
    
})
nextBtn.addEventListener("click",nextSong)
prevBtn.addEventListener("click",prevSong)
audio.addEventListener("ended",nextSong)
//-mediaPlayer

//+settings
const language_box = document.getElementById("language-box"),
widgets_box = document.getElementById("widgets-box"),
settings_box = document.getElementById("settings-box"),
about_box = document.getElementById("about-box");

var set_items = document.querySelectorAll(".settings-list li"),
tab2 = [], set_index = -1;

for(var j = 0; j < set_items.length; j++){
    tab2.push(set_items[j].innerHTML) ;
}

for(var j = 0; j < set_items.length; j++){
    set_items[j].onclick = function(){
        set_index = tab2.indexOf(this.innerHTML);
        switch(set_index){
            case 0: 
                language_box.classList.add("set-active")
                widgets_box.classList.remove("set-active")
                settings_box.classList.remove("set-active")
                about_box.classList.remove("set-active")
            break;
            case 1: 
                language_box.classList.remove("set-active")
                widgets_box.classList.add("set-active")
                settings_box.classList.remove("set-active")
                about_box.classList.remove("set-active")
            break;
            case 2: 
                language_box.classList.remove("set-active")
                widgets_box.classList.remove("set-active")
                settings_box.classList.add("set-active")
                about_box.classList.remove("set-active")
            break;
            case 3: 
                language_box.classList.remove("set-active")
                widgets_box.classList.remove("set-active")
                settings_box.classList.remove("set-active")
                about_box.classList.add("set-active")
            break;
        }
    }
}

var checkboxes = document.querySelectorAll('input[type=checkbox]'),
tab3 = [];

function getCheckboxes(){
    for(var j = 0; j < checkboxes.length; j++){
        tab3.push({name:checkboxes[j].value, checked:checkboxes[j].checked});
    }
}

widgets_box.onclick = ()=> {
    tab3 = []
    getCheckboxes()
    for(let j = 0; j < checkboxes.length; j++){
        if(tab3[j].checked == false){
            document.querySelector(`.${tab3[j].name}`).setAttribute("style", "opacity: 0;")
        } else {
            document.querySelector(`.${tab3[j].name}`).setAttribute("style", "opacity: 1;")
        }
    }
}

document.querySelector(".metric").addEventListener("click", ()=>{
    u=0; getWeather();
})

document.querySelector(".imperial").addEventListener("click", ()=>{
    u=1; getWeather();
})

document.querySelector(".dark").addEventListener("click", ()=>{
    theme = "dark";
    if(document.getElementById("playlistBtn").classList.contains("fa-chevron-down")){
        document.querySelector(".player").setAttribute("style", "height: 130px; background-color: rgba(0,0,0, .5); color: white")
        document.querySelector(".weather").setAttribute("style", "background-color: rgba(0,0,0, .5); color: white")
        document.querySelector(".clock").setAttribute("style", "color: white;")
        document.querySelector(".name").setAttribute("style", "color: white;")
        document.querySelector(".city").setAttribute("style", "color: white;")
        document.querySelector(".quote-content").setAttribute("style", "color: white;")
        popups.forEach((Element)=>{
            Element.setAttribute("style", "background-color: rgba(0,0,0, .5); color: white;")
        })
        links.forEach((Element)=>{
            Element.setAttribute("style", "color: white;")
        })
        solids.forEach((Element)=>{
           Element.setAttribute("style", "color: white;")
        });
        brands.forEach((Element)=>{
            Element.setAttribute("style", "color: white;")
         });
    } else {
        document.querySelector(".player").setAttribute("style", "height: 220px; background-color: rgba(0,0,0, .5); color: white")
        document.querySelector(".weather").setAttribute("style", "background-color: rgba(0,0,0, .5); color: white")
        document.querySelector(".clock").setAttribute("style", "color: white;")
        document.querySelector(".name").setAttribute("style", "color: white;")
        document.querySelector(".city").setAttribute("style", "color: white;")
        document.querySelector(".quote-content").setAttribute("style", "color: white;")
        popups.forEach((Element)=>{
            Element.setAttribute("style", "background-color: rgba(0,0,0, .5); color: white;")
        })
        links.forEach((Element)=>{
            Element.setAttribute("style", "color: white;")
        })
        solids.forEach((Element)=>{
            Element.setAttribute("style", "color: white;")
         });
         brands.forEach((Element)=>{
            Element.setAttribute("style", "color: white;")
         });
    }
})

document.querySelector(".light").addEventListener("click", ()=>{
    theme = "light";
    if(document.getElementById("playlistBtn").classList.contains("fa-chevron-down")){
        document.querySelector(".player").setAttribute("style", "height: 130px;background-color: rgba(255,255,255, .5); color: black")
        document.querySelector(".weather").setAttribute("style", "background-color: rgba(255,255,255, .5); color: black")
        document.querySelector(".clock").setAttribute("style", "color: black;")
        document.querySelector(".name").setAttribute("style", "color: black;")
        document.querySelector(".city").setAttribute("style", "color: black;")
        document.querySelector(".quote-content").setAttribute("style", "color: black;")
        popups.forEach((Element)=>{
            Element.setAttribute("style", "background-color: rgba(255,255,255, .5); color: black;")
        })
        links.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
        })
        solids.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
         });
         brands.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
         });
    } else {
        document.querySelector(".player").setAttribute("style", "height: 220px; background-color: rgba(255,255,255, .5); color: black")
        document.querySelector(".weather").setAttribute("style", "background-color: rgba(255,255,255, .5); color: black")
        document.querySelector(".clock").setAttribute("style", "color: black;")
        document.querySelector(".name").setAttribute("style", "color: black;")
        document.querySelector(".city").setAttribute("style", "color: black;")
        document.querySelector(".quote-content").setAttribute("style", "color: black;")
        popups.forEach((Element)=>{
            Element.setAttribute("style", "background-color: rgba(255,255,255, .5); color: black;")
        })
        links.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
        })
        solids.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
         });
         brands.forEach((Element)=>{
            Element.setAttribute("style", "color: black;")
         });
    }
})

document.querySelector(".rus").addEventListener("click", ()=>{alert("Sorry.\nThis language is not supported.")})
//-settings
