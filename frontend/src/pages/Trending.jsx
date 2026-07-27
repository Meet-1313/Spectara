import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";
import { getTrendingMovies } from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";

function Trending() {

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);
  const [trendingTotalPages, setTrendingTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies(trendingPage);
        setTrendingMovies(data.results);
        setTrendingTotalPages(data.total_pages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [trendingPage]);

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
      {/* <Hero movie={trendingMovies[0]} /> */}
      <MovieSection title="Trending This Week" movies={trendingMovies   }
      page={trendingPage}
        setPage={setTrendingPage}
        totalPages={trendingTotalPages}
        showPagination={true}
/>

    </Layout>
  );
}

export default Trending;