import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";
import Hero from "../components/Hero.jsx";
import { getNowPlayingMovies,getTopRatedMovies,getUpcomingMovies,getTrendingMovies} from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";

function Home() {

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);

 useEffect(() => {
    const fetchMovies = async () => {
      try{
        const [trendingData,topRatedData, nowPlayingData, upcomingData] = await Promise.all([
           getTrendingMovies(),
          getTopRatedMovies(),
          getNowPlayingMovies(),
          getUpcomingMovies(),
        ]);
         setTrendingMovies(trendingData.results);
        setTopRatedMovies(topRatedData.results);
        setNowPlayingMovies(nowPlayingData.results);
        setUpcomingMovies(upcomingData.results);
      }catch(error){
        console.error("Error fetching movies:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchMovies();
 },[]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
    );
  }

  return (
    <Layout>
      <Hero movie={trendingMovies[0]} />
      <MovieSection title='Now Playing' link='/now-playing' movies={nowPlayingMovies.slice(0,5)} showMore={true}/>
      <MovieSection title='Top Rated' link='/top-rated' movies={topRatedMovies.slice(0,5)} showMore={true}/>
      <MovieSection title='Upcoming Movies' link='/upcoming' movies={upcomingMovies.slice(0,5)} showMore={true}/>
    </Layout>
  );
}

export default Home;