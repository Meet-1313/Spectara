import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import Layout from "../components/Layout.jsx";
import { getUpcomingMovies } from "../services/movieService.js";
import MovieSection from "../components/MovieSection.jsx";
import Pagination from "../components/Pagination.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Upcoming() {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [upcomingPage, setUpcomingPage] = useState(1);
    const [upcomingTotalPages, setUpcomingTotalPages] = useState(1);

    useEffect(() => {
        const fetchMovies = async () => {
            try{
                const data = await getUpcomingMovies(upcomingPage);
                setUpcomingMovies(data.results);
                setUpcomingTotalPages(data.total_pages);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchMovies();
    },[upcomingPage]);

    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
    );
  }

  return (
    <Layout>
      <MovieSection title="Upcoming This Week" movies={upcomingMovies}
      page={upcomingPage}
        setPage={setUpcomingPage}
        totalPages={upcomingTotalPages}
        showPagination={true}
/>

    </Layout>
  );
}
export default Upcoming;
