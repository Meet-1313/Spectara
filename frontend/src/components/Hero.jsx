import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUtils.js";
import { Info } from "lucide-react";

function Hero({ movie }) {
    if (!movie) return null;

    return (
        <section className='app-background relative hidden  h-[85vh] w-full overflow-hidden md:block'>
            {/* Background */}
            <img src={getImageUrl(movie.backdrop_path, "original")}
                alt={movie.title} 
                className="absolute inset-0 h-full w-full object-cover " />

            {/* Overlay */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" /> */}

            {/* Content */}
            <div className='relative z-10 flex h-full items-center'>
                <div className='max-w-6xl px-6 sm:px-10 flex flex-col gap-6'>
                    <h1 className="text-2xl font-black sm:text-4xl lg:text-6xl"
                     style={{ textShadow: "0 4px 20px rgba(0,0,0,0.9)" }}>
                        {movie.title} 
                    </h1>
                    <p className="mt-2 line-clamp-3 text-sm sm:text-lg lg:text-xl"
                     style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
                        {movie.overview}
                    </p>

                    <div className=' flex items-center gap-5'>
                        <span className="text-white-400 text-xl">
                             Rating {movie.vote_average.toFixed(1)}
                        </span> 

                        <span className="text-zinc-300 text-xl">
                            {movie.release_date}
                        </span>

                    </div>
                    <Link to={`/movie/${movie.id}`}
                    className='btn  flex w-fit items-center gap-2 '>
                        <Info size={30} />
                         <span>More Info</span>
                    </Link>

                </div>
            </div>
        </section>
    );
}
export default Hero;