console.log("Welcome to Spotify");

// Initializing the variables
let songIndex = 0;
let audioElement = new Audio('../Media/GangstaType.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('musicgif');
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementsByClassName('songInfo')[0];
let masterSongName = document.getElementById('masterSongName');

let songs = [
    { index: 0, songName: "Gangsta Type - Kulbir Jhinjer", filePath: "Media/GangstaType.mp3", coverPath: "Media/rfralbum.jpg" },
    { index: 1, songName: "Try Me - Karan Aujla", filePath: "Media/TryMe.mp3", coverPath: "Media/karanalbum.jpg" },
    { index: 2, songName: "Jail - Navaan", filePath: "Media/Jail.mp3", coverPath: "Media/naveezy.jpg" },
    { index: 3, songName: "Gangsta Type - Kulbir Jhinjer", filePath: "Media/GangstaType.mp3", coverPath: "Media/rfralbum.jpg" },
    { index: 4, songName: "Try Me - Karan Aujla", filePath: "Media/TryMe.mp3", coverPath: "Media/karanalbum.jpg" },
    { index: 5, songName: "Jail - Navaan", filePath: "Media/Jail.mp3", coverPath: "Media/naveezy.jpg" },
]

songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//Handling play/pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        
        updatePlayPause();
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        makeAllPlays();
    }
})


//timeupdate

audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;

})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName("songListPlay")).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

Array.from(document.getElementsByClassName("songListPlay")).forEach((element) => {

    element.addEventListener('click', (e) => {

        const index = parseInt(e.target.id);

        if (!audioElement.paused && songIndex === index) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

        } else {
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[index].filePath;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            masterSongName.innerText = songs[index].songName;
            gif.style.opacity = 1;

        }

        songIndex = index;
    })

});

function updatePlayPause() {
    Array.from(document.getElementsByClassName("songListPlay")).forEach((i, tree) => {
        if (tree === songIndex) {
            i.classList.remove('fa-circle-play');
            i.classList.add('fa-circle-pause');
        } else {
            i.classList.remove('fa-circle-pause');
            i.classList.add('fa-circle-play');
        }
    });
}

document.getElementById("nextBtn").addEventListener('click', () => {
    if (songIndex > 5) {
        songIndex = 0;

    } else {
        songIndex += 1;

    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    makeAllPlays();
    updatePlayPause();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;


})

document.getElementById("backBtn").addEventListener('click', () => {

    
    if (songIndex < 0) {
        songIndex = 5;
        
    } else {
        songIndex -= 1;
        
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    makeAllPlays();
    updatePlayPause();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    
    gif.style.opacity = 1;

})

audioElement.addEventListener('ended', ()=>{
    songIndex++;
    if (songIndex>=songs.length) {
        songIndex=0;
    }

    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    updatePlayPause();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
})