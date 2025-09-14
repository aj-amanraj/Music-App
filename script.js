const title = document.querySelector(".songName");
const trackBar = document.querySelector(".track-bar");
const repeat = document.querySelector(".fa-repeat");
const forward = document.querySelector(".fa-forward");
const playPause = document.querySelector(".playButton");
const currTime = document.querySelector(".currTime");
const mxDuration = document.querySelector(".mxDuration");
const backward = document.querySelector(".fa-backward");
const shuffle = document.querySelector(".fa-shuffle");
const volume = document.querySelector(".fa-volume-high");
const soundList = document.querySelector(".fa-soundcloud");
const img = document.querySelector(".backImg");
const frontVdo = document.querySelector(".front-vdo");

const audio = new Audio("./assets/audio/SCHEDULE.mp3");


// Wait until metadata is loaded to get duration
audio.addEventListener("loadedmetadata", () => {
  mxDuration.innerHTML = formatTime(audio.duration);
});

// Play/Pause toggle
playPause.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    autoPlay = true;
    playPause.classList.remove("fa-circle-play");
    playPause.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    autoPlay = false;
    playPause.classList.add("fa-circle-play");
    playPause.classList.remove("fa-circle-pause");
  }
});

let isChanging = false
let autoPlay = false

// Update track bar and current time
audio.addEventListener("timeupdate", () => {
  if (audio.duration && !isChanging) {
    const progress = (audio.currentTime / audio.duration) * 100;
    trackBar.value = progress;
    currTime.innerHTML = formatTime(audio.currentTime);
  }
});

// Helper function to format time as mm:ss
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Seek functionality
trackBar.addEventListener("input", () => {
  if (audio.duration) {
    isChanging = true;
    const seekTime = (trackBar.value / 100) * audio.duration;
    audio.currentTime = seekTime;
    isChanging = false;
  }
});

function loadSong(index, autoplay = false){
    audio.src = songs[index].music;
    img.src = songs[index].img;
    frontVdo.src = songs[index].video;
    title.textContent = songs[index].name;
    audio.load();
    trackBar.value = 0;
    currTime.innerHTML = `0:00`

    if (autoplay) {
        audio.play().catch(err => {
            console.error("Play failed:", err);
        });
    }
}
    // loadSong(currentIndex, false);

forward.addEventListener("click", (e) => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex, autoPlay); 
    if (isSongListVisible) {
        updateActiveSong();
    }
})

backward.addEventListener("click", (e) => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex, autoPlay);
    if (isSongListVisible) {
        updateActiveSong();
    }
})

repeat.addEventListener("click", () => {
    audio.loop = !audio.loop;
    repeat.classList.toggle('active', audio.loop)
    repeat.classList.toggle("loop")
})

let isShuffle = false;

shuffle.addEventListener("click", () => {
  isShuffle = !isShuffle;
  shuffle.classList.toggle("shuffled", isShuffle)
});

audio.addEventListener("ended", () => {
    if(isShuffle){
        let randNo;
        if(songs.length === 1){
            randNo = 0;
        } else {
            do {
                randNo = Math.floor(Math.random() * songs.length);
            } while(randNo === currentIndex);
        }
        currentIndex = randNo;
    } else {
        currentIndex = (currentIndex + 1) % songs.length;
    }
    loadSong(currentIndex, autoPlay);
    if (isSongListVisible) {
        updateActiveSong();
    }
});

// VOLUME CONTROL - Using existing .vol slider
const volumeSlider = document.querySelector('.vol');
let isVolumeVisible = false;

// Initialize audio volume and hide slider
audio.volume = volumeSlider.value / 100;
volumeSlider.style.display = 'none';

// Volume slider event listener
volumeSlider.addEventListener("input", () => {
    const volumeValue = volumeSlider.value / 100;
    audio.volume = volumeValue;
    updateVolumeIcon(volumeValue);
});

// Volume icon click handler - TOGGLE functionality
volume.addEventListener("click", (e) => {
    e.stopPropagation();
    
    if (isVolumeVisible) {
        hideVolumeSlider();
    } else {
        showVolumeSlider();
    }
});

function showVolumeSlider() {
    volumeSlider.style.display = 'block';
    volumeSlider.style.opacity = '1';
    isVolumeVisible = true;
}

function hideVolumeSlider() {
    volumeSlider.style.display = 'none';
    volumeSlider.style.opacity = '0';
    isVolumeVisible = false;
}

function updateVolumeIcon(volumeLevel) {
    // Remove all volume classes from current icon
    volume.classList.remove("fa-volume-high", "fa-volume-low", "fa-volume-mute");
    
    if (volumeLevel === 0) {
        volume.classList.add("fa-volume-mute");
    } else if (volumeLevel < 0.5) {
        volume.classList.add("fa-volume-low");
    } else {
        volume.classList.add("fa-volume-high");
    }
}

// Hide volume slider when clicking outside the list container
document.addEventListener("click", (e) => {
    const listElement = document.querySelector('.list');
    if (isVolumeVisible && !listElement.contains(e.target)) {
        hideVolumeSlider();
    }
});

// SONG LIST TAB IMPLEMENTATION
const songsTab = document.querySelector('.songs');
const xmarkButton = document.querySelector('.fa-xmark');
const songList = document.querySelector('.songs ul');
let isSongListVisible = false;

// Add heading to song list
function addSongListHeading() {
    // Check if heading already exists
    if (!document.querySelector('.songs-header')) {
        songsTab.insertBefore(header, songsTab.firstChild);
    }
}

// Populate song list
function populateSongList() {
    addSongListHeading();
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.classList.add('song-item');
        li.dataset.index = index;

        // Create container for song details
        const details = document.createElement('div');
        details.classList.add('song-details');

        const nameDiv = document.createElement('div');
        nameDiv.textContent = song.name;
        nameDiv.classList.add('song-name');

        const authDiv = document.createElement('div');
        authDiv.textContent = song.auth;
        authDiv.classList.add('song-author');

        details.appendChild(nameDiv);
        details.appendChild(authDiv);

        // Duration div
        const durationDiv = document.createElement('div');
        durationDiv.textContent = "00:00"; // Default before loading
        durationDiv.classList.add('song-duration');

        // Fetch and set the correct duration
        getSongDuration(song, (duration) => {
            durationDiv.textContent = duration;
        });

        // Handle click event to play song
        li.addEventListener('click', () => {
            currentIndex = index;
            loadSong(currentIndex, autoPlay);
            updateActiveSong();
        });

        // Highlight active song
        if (index === currentIndex) {
            li.classList.add('active');
        }

        // Append details and duration
        li.appendChild(details);
        li.appendChild(durationDiv);

        songList.appendChild(li);
    });
}


function getSongDuration(song, callback) {
    const tempAudio = new Audio();
    tempAudio.src = song.music;
    tempAudio.addEventListener('loadedmetadata', () => {
        const duration = formatTime(tempAudio.duration);
        callback(duration);
    });
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Update active song in list
function updateActiveSong() {
    const allSongs = songList.querySelectorAll('li');
    allSongs.forEach((li, index) => {
        li.classList.toggle('active', index === currentIndex);
    });
}

// SoundCloud button click handler
soundList.addEventListener("click", (e) => {
    e.stopPropagation();
    
    if (!isSongListVisible) {
        showSongList();
    }
});

// X mark button click handler
xmarkButton.addEventListener("click", (e) => {
    e.stopPropagation();
    hideSongList();
});

function showSongList() {
    populateSongList();
    songsTab.classList.add('show');
    isSongListVisible = true;
}

function hideSongList() {
    songsTab.classList.remove('show');
    isSongListVisible = false;
}

// Hide song list when clicking outside container
document.addEventListener("click", (e) => {
    const container = document.querySelector('.container');
    if (isSongListVisible && !container.contains(e.target)) {
        hideSongList();
    }
});

// Prevent song list from closing when clicking inside it
songsTab.addEventListener("click", (e) => {
    e.stopPropagation();
});

// Play a random song when the page loads
window.addEventListener("load", () => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    currentIndex = randomIndex;
    loadSong(currentIndex, false);
    if (isSongListVisible) {
        updateActiveSong();
    }
});
