import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import { searchMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";
function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

useEffect(() => {
  setPage(1);
}, [query]);  

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query.trim()) {
        setMovies([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await searchMovies(query,page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, [query,page]);

  return (
    <Layout>
      <div className="mx-auto min-h-screen px-6 py-10">
        <h1 className="mb-8 text-4xl font-bold">
          Search Results
        </h1>

        <p className="mb-8 text-zinc-400">
          Results for "{query}"
        </p>

        {loading ? (
          <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 px-4 md:grid-cols-3 md:px-0 lg:grid-cols-4 xl:grid-cols-5">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      
      <Pagination
    page={page}
    totalPages={totalPages}
    setPage={setPage}
/>
</div>
    </Layout>
  );
}

export default Search;