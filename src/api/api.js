import axios from "axios";

export const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";

export const fetchTopAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/top`);
    return response.data;
  } catch (e) {
    console.error(e);
    // Return an empty array to prevent breaking the app on error
    return [];
  }
};

export const fetchNewAlbums = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/albums/new`);
    return response.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/songs`);
    
    // Map over the songs and ensure the URL uses HTTPS
    const correctedSongs = response.data.map(song => {
      if (song.url && song.url.startsWith("http://")) {
        return {
          ...song,
          url: song.url.replace("http://", "https://"),
        };
      }
      return song;
    });

    return correctedSongs;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const fetchFilters = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/genres`);
    // NEW: Return just the data array, not the whole object
    return response.data.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};
