//Select Querries
let audioElement = new Audio("./songs/1.mp3");
let playBtn = document.querySelector("#playbtn");
let previous = document.querySelector("#leftBtn");
let next = document.querySelector("#rightBtn");
let range = document.querySelector("#range");
let songList = Array.from( document.getElementsByClassName("songslist"));
let playSongs = Array.from(document.getElementsByClassName("playsong"));
let gif = document.querySelector(".gif");
let songsName = document.querySelector(".name");
let songIndex = 0;

let songs = [
    {songName: "Let me love you", filePath: "./songs/1.mp3", coverPath: "./cover/1.jpg"},
    {songName: "High Hukku", filePath: "./songs/2.mp3", coverPath: "./cover/2.jpg"},
    {songName: "Softly by Karan Auhjla", filePath: "./songs/3.mp3", coverPath: "./cover/3.jpg"},
    {songName: "Let me love you", filePath: "./songs/4.mp3", coverPath: "./cover/4.jpg"},
    {songName: "Let me love you", filePath: "./songs/5.mp3", coverPath: "./cover/5.jpg"},
    {songName: "Let me love you", filePath: "./songs/6.mp3", coverPath: "./cover/6.jpg"},
    {songName: "Let me love you", filePath: "./songs/7.mp3", coverPath: "./cover/7.jpg"},
    {songName: "Let me love you", filePath: "./songs/8.mp3", coverPath: "./cover/8.jpg"},
    {songName: "Let me love you", filePath: "./songs/9.mp3", coverPath: "./cover/9.jpg"},
    {songName: "Let me love you", filePath: "./songs/10.mp3", coverPath: "./cover/10.jpg"},
]

songList.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML= songs[i].songName;
});

//Handling play/pause buttons of player
playBtn.addEventListener("click", (e) => {
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        playBtn.classList.remove("ri-play-circle-line");
        playBtn.classList.add("ri-pause-circle-line");
        songsName.innerHTML = songs[songIndex].songName
        gif.style.opacity = 1
        playAllSongs(songIndex)

    }else{
        audioElement.pause();
        playBtn.classList.remove("ri-pause-circle-line");
        playBtn.classList.add("ri-play-circle-line");
        gif.style.opacity = 0;
        playAllSongs(-1)
    }
});


//Handling range of #player 
audioElement.addEventListener("timeupdate", ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration) * 100); 
    range.value = progress;
});

range.addEventListener("change", () => {
    audioElement.currentTime = range.value * audioElement.duration / 100;
});



const playAllSongs = (currentIndex) => {   //Function to add play button on current playing song
    playSongs.forEach((element, index) => {
        if(index === currentIndex){
            element.classList.remove("ri-play-circle-line");
            element.classList.add("ri-pause-circle-line");
        } else {
            element.classList.remove("ri-pause-circle-line");
            element.classList.add("ri-play-circle-line");
        }
    });
}

//Adding Eventistener on play/pause button in songlist #container
playSongs.forEach((element) => {
    element.addEventListener("click", (e)=>{
        if(audioElement.paused || audioElement.currentTime <= 0){
            songIndex = parseInt(e.target.id);
            playAllSongs();
            e.target.classList.remove("ri-play-circle-line");
            e.target.classList.add("ri-pause-circle-line");
            audioElement.src = `songs/${songIndex+1}.mp3`
            playBtn.classList.remove("ri-play-circle-line");
            playBtn.classList.add("ri-pause-circle-line");
            audioElement.currentTime = 0;
            audioElement.play();
            songsName.innerHTML = songs[songIndex].songName
            gif.style.opacity = 1;

        }else{
            playAllSongs()
            audioElement.pause();
            playBtn.classList.remove("ri-pause-circle-line")
            playBtn.classList.add("ri-play-circle-line");
            gif.style.opacity = 0;
        }
    });
});

//Handling next button 
next.addEventListener("click", ()=> {
    if(songIndex >= songList.length){
        songIndex = 0
    }else{
        songIndex += 1;
        
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    playBtn.classList.remove("ri-play-circle-line");
    playBtn.classList.add("ri-pause-circle-line");
    gif.style.opacity = 1
    songsName.innerHTML = songs[songIndex].songName;
    playAllSongs(songIndex)
});

//Handling previous button
previous.addEventListener("click", () => {
    if(songIndex <= 0){
        songIndex = 0 ;
    }else{
        songIndex -= 1;
    }
    audioElement.src = `./songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    playBtn.classList.remove("ri-play-circle-line")
    playBtn.classList.add("ri-pause-circle-line");
    gif.style.opacity = 1;
    songsName.innerHTML = songs[songIndex].songName;
    playAllSongs(-1)
});

