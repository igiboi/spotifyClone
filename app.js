import { songs } from "./data.js";

const songList = document.getElementById("song-list");
const searchInput = document.getElementById("search-input");
const sortByTitle = document.getElementById("sort-title");
const sortByArtist = document.getElementById("sort-artist");
const sortByDuration = document.getElementById("sort-duration");
const sortByPlays = document.getElementById("sort-plays");
const topFivePlays = document.getElementById("top-five");
const totalSongs = document.getElementById('total-songs');
const totalDuration = document.getElementById('total-duration');
const songDetails = document.getElementById('song-details');

function displaySongs(songsToDisplay) {
  songList.innerHTML = "";

  songsToDisplay.forEach((song) => {
    songList.innerHTML += `
      <div class="song" data-id="${song.id}">
        <img src="${song.coverImage}">
        <span class="title">${song.title}</span>
        <span class="artist">${song.artist}</span>
      </div>
    `;
  });
}

displaySongs(songs);

searchInput.addEventListener("input", (event) => {
const searchTerm = event.target.value.toLowerCase();
  const filtered = songs.filter((song) => {
    return song.title.toLowerCase().includes(searchTerm) || 
    song.artist.toLowerCase().includes(searchTerm);
  });

  displaySongs(filtered);
});

sortByTitle.addEventListener("click", () => {
  const sortedTitle = songs.sort((a, b) => {
    return a.title.localeCompare(b.title); // A-Z
  });
  displaySongs(sortedTitle);
});

sortByArtist.addEventListener("click", () => {
  const sortedArtist = songs.sort((a, b) => {
    return a.artist.localeCompare(b.artist); // A-Z
  })
  displaySongs(sortedArtist);
});

sortByDuration.addEventListener("click", () => {
  const sortedDuration = songs.sort((a, b) => {
    return a.duration - b.duration; // Shortest first
  })
  displaySongs(sortedDuration);
});

sortByPlays.addEventListener("click", () => {
  const sortedPlays = songs.sort((a, b) => {
    return b.plays - a.plays; // Most played first
  })
  displaySongs(sortedPlays);
})

topFivePlays.addEventListener("click", () => {
  const topFive =
    songs.sort((a, b) => b.plays - a.plays).slice(0, 5);
  displaySongs(topFive);
});

// Calculate total duration using reduce 
const duration = songs.reduce((acc, song) => {
  return acc + song.duration;
}, 0)

// Display the stats
totalSongs.textContent = `Total songs: ${songs.length}`;
totalDuration.textContent = `Total duration: ${duration} seconds`;

songList.addEventListener("click", (event) => {
  const clickedSong = event.target.closest(".song");

  if (!clickedSong) {
    return;
  }

  const id = Number(clickedSong.dataset.id);

  const song = songs.find((song) => {
    return song.id === id;
  });

  // Deconstructure 
  const { title, album, artist, duration, plays, releaseYear } = song;

  songDetails.innerHTML = `
    <span class="title">${title}</span>
    <span class="album">${album}</span>
    <span class="artist">${artist}</span>
    <span class="duration">${duration}</span>
    <span class="plays">${plays}</span>
    <span class="releaseYear">${releaseYear}</span>
  `;
});