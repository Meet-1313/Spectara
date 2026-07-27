import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";

import { getPopularMovies } from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";

function Popular() {

  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [popularMovies, setPopularMovies] = useState([]);

 
  const [popularPage, setPopularPage] = useState(1);

 
  const [popularTotalPages, setPopularTotalPages] = useState(1);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const data = await getPopularMovies(popularPage);
        setPopularTotalPages(data.total_pages);
        setPopularMovies(data.results);
      } catch (error) {
        console.error(error);
      }finally {
        setLoading(false);
      }
    }
    fetchPopular();
  }, [popularPage]);

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
      
         <MovieSection title="Popular Movies" movies={popularMovies} 
      page={popularPage}
    setPage={setPopularPage}
    totalPages={popularTotalPages}
    showPagination={true}/>
    </Layout>
  );
}

export default Popular;