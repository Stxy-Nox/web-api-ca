import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage.js";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from './pages/upcomingMoviesPage.js'
import PlaylistPage from "./pages/playlistPage.js";
import TrendingPage from "./pages/trendingPage.js";
import PopularPeoplePage from "./pages/popularPeoplePage.js";
import PersonPage from "./pages/personDetailsPage.js";
import ProtectedRoutes from './protectedRoutes.js';
import LoginPage from "./pages/loginPage.js";
import SignupPage from "./pages/signupPage.js";
import AuthContextProvider from "./contexts/authContext.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
        <AuthContextProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
              <Route path="/movies/playlist" element={<PlaylistPage />} />
              <Route path="/reviews/form" element={<AddMovieReviewPage />} />
              <Route path="/reviews/:id" element={<MovieReviewPage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/people/:id" element={<PersonPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/trending/:timeWindow" element={<TrendingPage />} />
              <Route path="/movies/upcoming" element={<UpcomingPage />} />
              <Route path="/people" element={<PopularPeoplePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
          </AuthContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App />);