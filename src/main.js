import './sass/style.scss';

// DOM Elements
const image = document.getElementById('image');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const audio = document.getElementById('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

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

let isAudioPlaying = false;
let selectedSongIndex = 0;

// Progress Bar
function updateProgressBar() {
  // Update bar
  progress.style.width = `${(this.currentTime / this.duration) * 100}%`;

  // Update current time
  if (this.currentTime) {
    const currentMinutes = Math.floor(this.currentTime / 60).toString();
    const currentSeconds = Math.floor(this.currentTime % 60)
      .toString()
      .padStart(2, '0');
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }

  // Update duration
  if (this.duration) {
    const durationMinutes = Math.floor(this.duration / 60).toString();
    const durationSeconds = Math.floor(this.duration % 60)
      .toString()
      .padStart(2, '0');
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
  }
}

function setProgressBar(event) {
  audio.currentTime = (event.offsetX / this.clientWidth) * audio.duration;
}

// Controls
function loadSong(song) {
  image.src = `./images/${song.name}.webp`;
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  audio.src = `./music/${song.name}.mp3`;
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

// Event Listners
audio.addEventListener('timeupdate', updateProgressBar);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
playBtn.addEventListener('click', () => {
  isAudioPlaying ? pauseSong() : playSong();
});
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// On Load
loadSong(songs[selectedSongIndex]);
audio.volume = 0.5;
