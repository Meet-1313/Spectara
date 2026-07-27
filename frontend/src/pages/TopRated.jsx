import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";
import { getTopRatedMovies } from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";

function TopRated() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [topRated, setTopRated] = useState([]);
    const [topRatedPage, setTopRatedPage] = useState(1);
    const [topRatedTotalPages, setTopRatedTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const data = await getTopRatedMovies(topRatedPage);
                setTopRated(data.results);
                setTopRatedTotalPages(data.total_pages);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchMovies();
    },[topRatedPage]);

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500"></div>
      </div>
    );
  }

  return (
    <Layout>
      <MovieSection title="Top Rated" movies={topRated}
      page={topRatedPage}
        setPage={setTopRatedPage}
        totalPages={topRatedTotalPages}
        showPagination={true}
/>

    </Layout>
  );
}
export default TopRated;
