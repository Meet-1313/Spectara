import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";
import { getNowPlayingMovies } from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";

function NowPlaying() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [nowplayingMovies, setnowplayingMovies] = useState([]);
    const [nowplayingPage, setnowplayingPage] = useState(1);
    const [nowPlayingTotalPages, setnowPlayingTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const data = await getNowPlayingMovies(nowplayingPage);
                setnowplayingMovies(data.results);
                setnowPlayingTotalPages(data.total_pages);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchMovies();
    },[nowplayingPage]);

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
    );
  }

  return (
    <Layout>
      <MovieSection title="Now Playing in Theatres" movies={nowplayingMovies}
      page={nowplayingPage}
        setPage={setnowplayingPage}
        totalPages={nowPlayingTotalPages}
        showPagination={true}
/>

    </Layout>
  );
}
export default NowPlaying;
