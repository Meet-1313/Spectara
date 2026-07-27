import { getImageUrl } from "../utils/imageUtils.js";
import { Link } from "react-router-dom";
function MovieCard({movie}) {

    return (
        <Link to={`/movie/${movie.id}`}>
        <div className='mx-auto max-w-[250px] overflow-hidden rounded-xl bg-zinc-900 shadow-lg transition duration-300 '>
            <img src={getImageUrl(movie.poster_path)} 
            alt={movie.title} 
            className='w-full h-auto'/>
            <div className='p-4'>
                <h2 className='text-base font-bold text-white'>{movie.title}</h2>
                 <p className="mt-1 text-sm text-zinc-400">
                    ⭐ {movie.vote_average.toFixed(1)}
                    </p>
                     <p className="mt-2 text-sm text-zinc-500">
                    {movie.release_date}
                    </p>
            </div>
        </div>
        </Link>
    );
}
export default MovieCard;