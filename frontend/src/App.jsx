import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Favorite from './pages/Favorites';
import { Link } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Trending from './pages/Trending';
import Popular from './pages/Popular';
import TopRated from './pages/TopRated';
import NowPlaying from './pages/NowPlaying';
import Upcoming from './pages/Upcoming';
import Landing from './pages/Landing';
import {Toaster} from 'sonner';



function App() {
  return (
    <>
     <Toaster position='top-right' richColors closeButton expand theme='dark' />

    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/home' element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
      />
      <Route
        path="/movie/:id" element={
          <ProtectedRoute>
            <MovieDetails />
          </ProtectedRoute>
        }/>
      <Route
        path="/search" element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }/>
      <Route
        path="/favorites" element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }/>
      <Route
        path="/watchlist" element={
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        }/>
      <Route
        path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }/>
      <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular/>} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/now-playing" element={<NowPlaying />}/>
        <Route path="/upcoming" element={<Upcoming />} />
    </Routes>
     </>

  );
}

export default App;
