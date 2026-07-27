import MovieCard from "./MovieCard";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";

function MovieSection({ title,
  movies,
  link,
  showMore = false,
  page,
  setPage,
  totalPages,
  showPagination = false, }) {

    return (
        <section className='mt-12'>
            <div className=' border-b border-zinc-800  p-8 backdrop-blur-sm'>
                <div className="mb-10 flex items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-2  bg-blue-950"></div>
                        <h2 className="text-3xl font-semibold tracking-tight text-white">
                            {title}
                        </h2>
                        {showMore && (
                            <Link
                                to={link}
                                className="text-white-500 hover:text-gray-400 font-semibold"
                            >
                                MORE →
                            </Link>
                        )}
                    </div>

                </div>

                <div className='grid grid-cols-2 gap-4 px-4 md:px-0 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
                {showPagination && (
                    <Pagination
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                )}

            </div>
        </section>
    );

}

export default MovieSection;