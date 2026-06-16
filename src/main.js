import './sass/style.scss';

// DOM Elements
const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.getElementById('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const audioProgressContainer = document.getElementById(
  'audio-progress-container',
);
const audioProgress = document.getElementById('audio-progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const volumeBtn = document.getElementById('volume');
const volumeProgressContainer = document.getElementById(
  'volume-progress-container',
);
const volumeProgress = document.getElementById('volume-progress');
const openPopupBtn = document.getElementById('open-popup');
const infoPopup = document.getElementById('info-popup');
const closePopupBtn = document.getElementById('close-popup');

// Global Constants and Variables
const songs = [
  {
    name: 'song-1',
    displayName: 'Eletrical Communication',
    artist: 'Ganasia',
  },
  {
    name: 'song-2',
    displayName: 'Makenai Ai ga Kitto Aru',
    artist: 'Yukie Nakama',
  },
  {
    name: 'song-3',
    displayName: 'Monkey',
    artist: 'Showtaro Morikubo',
  },
  {
    name: 'song-4',
    displayName: 'Moonlight',
    artist: 'Showtaro Morikubo',
  },
  {
    name: 'song-5',
    displayName: 'I.D.E.A.',
    artist: 'Showtaro Morikubo',
  },
  {
    name: 'song-6',
    displayName: 'Code Crush',
    artist: 'Rina Aiuchi',
  },
];

const volumeStates = [
  'fa-volume-xmark',
  'fa-volume-off',
  'fa-volume-low',
  'fa-volume',
  'fa-volume-high',
];

let isAudioPlaying = false;
let isAudioMuted = false;
let isVolumeAdjusting = false;
let selectedSongIndex = 0;

// Audio Progress Bar
function updateAudioProgressBarInfo() {
  // Update bar
  audioProgress.style.width = `${(audio.currentTime / audio.duration) * 100}%`;

  // Update current time
  if (audio.currentTime) {
    const currentMinutes = Math.floor(audio.currentTime / 60).toString();
    const currentSeconds = Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, '0');
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  // Update duration
  if (audio.duration) {
    const durationMinutes = Math.floor(audio.duration / 60).toString();
    const durationSeconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, '0');
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function setAudioCurrentTime(event) {
  audio.currentTime =
    (event.offsetX / audioProgressContainer.clientWidth) * audio.duration;
}

// Controls
function loadSong(song) {
  image.src = `./images/${song.name}.webp`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `./music/${song.name}.mp3`;
}

function forwardSong() {
  audio.currentTime += 5;
}

function backwardSong() {
  audio.currentTime -= 5;
}

function playSong() {
  isAudioPlaying = true;

  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');

  audio.play();
}

function pauseSong() {
  isAudioPlaying = false;

  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');

  audio.pause();
}

function prevSong() {
  selectedSongIndex === 0
    ? (selectedSongIndex = songs.length - 1)
    : selectedSongIndex--;

  loadSong(songs[selectedSongIndex]);

  playSong();
}

function nextSong() {
  selectedSongIndex === songs.length - 1
    ? (selectedSongIndex = 0)
    : selectedSongIndex++;

  loadSong(songs[selectedSongIndex]);

  playSong();
}

function muteSong() {
  volumeBtn.setAttribute('title', 'Unmute');
  audio.muted = true;
}

function UnmuteSong() {
  volumeBtn.setAttribute('title', 'Mute');
  audio.muted = false;
}

function updateVolumeProgressBarInfo() {
  volumeProgress.style.width = `${audio.volume * 100}%`;

  volumeProgress.classList.toggle('muted', audio.muted);

  if (audio.muted) {
    volumeStates.forEach((state) => {
      volumeBtn.classList.replace(state, 'fa-volume-xmark');
    });
  } else if (audio.volume === 0) {
    volumeStates.forEach((state) => {
      volumeBtn.classList.replace(state, 'fa-volume-off');
    });
  } else if (audio.volume < 1 / 3) {
    volumeStates.forEach((state) => {
      volumeBtn.classList.replace(state, 'fa-volume-low');
    });
  } else if (audio.volume < 2 / 3) {
    volumeStates.forEach((state) => {
      volumeBtn.classList.replace(state, 'fa-volume');
    });
  } else {
    volumeStates.forEach((state) => {
      volumeBtn.classList.replace(state, 'fa-volume-high');
    });
  }
}

function setVolume(event) {
  if (isVolumeAdjusting) {
    audio.muted = false;
    audio.volume = event.offsetX / volumeProgressContainer.clientWidth;
  }
}

function moreVolume() {
  audio.volume <= 0.95 ? (audio.volume += 0.05) : (audio.volume = 1);
}

function lessVolume() {
  audio.volume >= 0.05 ? (audio.volume -= 0.05) : (audio.volume = 0);
}

function callHotkeyCommand(event) {
  switch (event.key) {
    case 'ArrowLeft': {
      backwardSong();
      break;
    }
    case 'ArrowRight': {
      forwardSong();
      break;
    }
    case 'ArrowUp': {
      moreVolume();
      break;
    }
    case 'ArrowDown': {
      lessVolume();
      break;
    }
    case 'b': {
      prevSong();
      break;
    }
    case 'n': {
      nextSong();
      break;
    }
    case 'p': {
      isAudioPlaying ? pauseSong() : playSong();
      break;
    }
    case 'm': {
      audio.muted ? UnmuteSong() : muteSong();
      break;
    }
  }
}

/* Event Listners */

// Progress Bar
audio.addEventListener('timeupdate', updateAudioProgressBarInfo);
audio.addEventListener('ended', nextSong);
audioProgressContainer.addEventListener('click', setAudioCurrentTime);

// Player Controls
prevBtn.addEventListener('click', prevSong);
playBtn.addEventListener('click', () =>
  isAudioPlaying ? pauseSong() : playSong(),
);
nextBtn.addEventListener('click', nextSong);

// Volume
audio.addEventListener('volumechange', updateVolumeProgressBarInfo);
volumeBtn.addEventListener('click', () =>
  audio.muted ? UnmuteSong() : muteSong(),
);
volumeProgressContainer.addEventListener('mousedown', (event) => {
  isVolumeAdjusting = true;
  setVolume(event);
});
volumeProgressContainer.addEventListener('mousemove', setVolume);
document.addEventListener('mouseup', () => (isVolumeAdjusting = false));

// Info PopUp
openPopupBtn.addEventListener('click', () => infoPopup.showModal());
closePopupBtn.addEventListener('click', () => infoPopup.close());

// Keyboard Hotkeys
document.addEventListener('keydown', callHotkeyCommand);

// On Load
loadSong(songs[selectedSongIndex]);
audio.volume = 0.5;
