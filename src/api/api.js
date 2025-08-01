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

// --- THIS IS THE CORRECTED CODE FOR FETCHSONGS ---
export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/songs`);
    
    // Map over the songs and ensure the URL uses HTTPS
    const correctedSongs = response.data.map(song => {
      // Check if the URL is an HTTP link and convert it to HTTPS
      if (song.url && song.url.startsWith("http://")) {
        return {
          ...song,
          url: song.url.replace("http://", "https://"),
        };
      }
      return song;
    });

    return correctedSongs; // Return the corrected song data
  } catch (e) {
    console.error(e);
    // Return an empty array on error to prevent breaking the app
    return [];
  }
};

export const fetchFilters = async () => {
  try {
    const response = await axios.get(`${BACKEND_ENDPOINT}/genres`);
    return response.data;
  } catch (e) {
    console.error(e);
    return { data: [] };
  }
};
