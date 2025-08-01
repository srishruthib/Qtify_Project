import React, { useEffect, useState } from "react";
import Hero from "./components/Hero/Hero";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { Outlet } from "react-router-dom";
import {
  fetchFilters,
  fetchNewAlbums,
  fetchSongs,
  fetchTopAlbums,
} from "./api/api";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // NEW: Add a loading state

  const generateData = async (key, source) => {
    try {
      const fetchedData = await source();
      setData((prevState) => ({ ...prevState, [key]: fetchedData }));
    } catch (error) {
      console.error(`Error fetching ${key}:`, error);
    }
  };

  useEffect(() => {
    // NEW: Use Promise.all to ensure all data is fetched before we proceed
    Promise.all([
      generateData("topAlbums", fetchTopAlbums),
      generateData("newAlbums", fetchNewAlbums),
      generateData("songs", fetchSongs),
      generateData("genres", fetchFilters),
    ]).then(() => {
      setLoading(false); // NEW: Set loading to false once all promises are resolved
    });
  }, []);

  const { topAlbums = [], newAlbums = [], songs = [], genres = [] } = data;

  if (loading) {
    // NEW: Show a loading message while we are waiting for data
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>Loading...</div>;
  }

  return (
    <StyledEngineProvider injectFirst>
      <Navbar searchData={[...topAlbums, ...newAlbums]} />
      {/* The Outlet will now receive full data because we wait for the loading state to be false */}
      <Outlet context={{ data: { topAlbums, newAlbums, songs, genres } }} />
    </StyledEngineProvider>
  );
}

export default App;
