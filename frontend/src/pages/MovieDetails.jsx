import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails, getWatchProviders, getMovieCredits, getSimilarMovies, getMovieTrailers } from "../services/movieService";
import { getImageUrl } from "../utils/imageUtils";
import Layout from "../components/Layout";
import { addFavorite, removeFavorite, checkFavorite } from "../services/favoriteService";
import { Heart, Bookmark } from "lucide-react";
import { addToWatchlist, removeFromWatchlist, checkWatchlist } from "../services/watchlistService";
import { addRating, getRating, deleteRating } from "../services/ratingService";
import { Star } from "lucide-react";
import { addReview, getReview, getMovieReviews, deleteReview } from "../services/reviewService";
import MovieSection from "../components/MovieSection";
import { FaYoutube } from "react-icons/fa";

function MovieDetails() {
  const { id } = useParams();
  console.log("Movie ID:", id);

  const [loading, setLoading] = useState(true);

  const [movie, setMovie] = useState(null);
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id])

  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {

    const fetchFavorite = async () => {
      try {
        const data = await checkFavorite(movie.id);
        setIsFavorite(data.isFavorite);
      } catch (error) {
        console.error(error);
      }
    };
    if (movie) {
      fetchFavorite();
    }

  }, [movie]);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
      } else {
        await addFavorite(movie.id);
        setIsFavorite(true);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const [isInWatchlist, setIsInWatchlist] = useState(false);
  useEffect(() => {
    const fetchWatchlistStatus = async () => {
      try {
        const data = await checkWatchlist(movie.id);
        setIsInWatchlist(data.isInWatchlist);
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchWatchlistStatus();
    }
  }, [movie]);

  const handlewatchlist = async () => {
    try {
      if (isInWatchlist) {
        await removeFromWatchlist(movie.id);
        setIsInWatchlist(false);
      } else {
        await addToWatchlist(movie.id);
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error(error);
    }

  }

  const [userRating, setUserRating] = useState(null);
  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const data = await getRating(movie.id);
        if (data.rating) {
          setUserRating(data.rating.rating);
        } else {
          setUserRating(null);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchUserRating();
    }
  }, [movie]);

  const handleRating = async (rating) => {
    try {
      await addRating(movie.id, rating);
      setUserRating(rating);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteRating = async () => {
    try {
      await deleteRating(movie.id);
      setUserRating(null);
    } catch (error) {
      console.error(error);
    }
  };

  const [review, setReview] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const data = await getMovieReviews(movie.id);
        console.log(data.reviews[0]);
        setMovieReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchMovieReviews();
    }
  }, [movie]);

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const data = await getReview(movie.id);
        if (data.review) {
          setReview(data.review.review);
        }
        else {
          setReview("");
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchUserReview();
    }
  }, [movie]);

  const handleReview = async () => {
    try {
      await addReview(movie.id, review);
      const data = await getMovieReviews(movie.id);
      setMovieReviews(data.reviews);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteReview = async () => {
    try {
      await deleteReview(movie.id);
      setReview("");
      const data = await getMovieReviews(movie.id);
      setMovieReviews(data.reviews);
    } catch (error) {
      console.error(error);
    }
  }

  const [watchProviders, setWatchProviders] = useState(null);

  useEffect(() => {
    if (!movie?.id) return;

    const fetchWatchProviders = async () => {
      try {
        const data = await getWatchProviders(movie.id);
        setWatchProviders(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWatchProviders();
  }, [movie?.id]);

  const [directors, setDirectors] = useState('');
  useEffect(() => {
    const fetchMovieCredits = async () => {
      try {
        const data = await getMovieCredits(movie.id);
        const director = data.crew.find(member => member.job === 'Director');
        setDirectors(director ? director.name : 'Unknown');
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchMovieCredits();
    }
  }, [movie]);

  const [similarMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const data = await getSimilarMovies(movie.id);
        setSimilarMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchSimilarMovies();
    }
  }, [movie]);

  const [trailer, setTrailer] = useState(null);
  useEffect(() => {
    const fetchMovieTrailers = async () => {
      try {
        const data = await getMovieTrailers(movie.id);
        const officialTrailer = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        )
        setTrailer(officialTrailer || null);
      } catch (error) {
        console.error(error);
      }
    }
    if (movie) {
      fetchMovieTrailers();
    }
  }, [movie]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-blue-950"></div>
      </div>
    );
  }

  const country = navigator.language.split("-")[1] || "US";
  const providers = watchProviders?.[country];

  return (
    <Layout>
      <div className="min-h-screen   text-white ">
        {/* Content */}
        <div className="mx-auto flex w-4/5 flex-col gap-12 py-12 lg:flex-row">

          {/* Poster */}
          <div className="lg:w-2/5 justify-center">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="w-full max-w-sm  shadow-2xl"
            />
            <h1 className="mt-8 text-4xl font-semibold">
              {movie.title}
            </h1>

            <p className="mt-2 text-lg text-zinc-400">
              Directed by <span className="text-white">{directors}</span>
            </p>

            <p className="mt-4 text-lg ">
              Rating {movie.vote_average.toFixed(1)} / 10
              
            </p>
              <div className="mt-4 flex items-center gap-6">
              <button
                className='transition-transform hover:scale-110'>
                <Heart size={32} className={`transition-all ${isFavorite ?
                  "fill-white stroke-white" : 'fill-transparent stroke-white'
                  }`} onClick={handleFavorite} />
              </button>

              <button>
                <Bookmark size={32} onClick={handlewatchlist}
                  className={`cursor-pointer transition-all 
                  ${isInWatchlist ? "fill-white stroke-white text-white-500" : "text-white"}`} />
              </button>

              <div className='flex  gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={24} onClick={() => handleRating(star)}
                    className={`cursor-pointer transition-all ${userRating >= star ?
                      'fill-white stroke-white text-white-500' : 'text-gray-500'
                      }`} />
                ))}

              </div>
            </div>
            <div className="mt-4 flex  gap-3">

              <span className="rounded-full  py-2">
                {new Date(movie.release_date).getFullYear()}
              </span>

              <span className="rounded-full  py-2">
                ⏱ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>

              <span className="rounded-full  py-2">
                🌍 {movie.original_language.toUpperCase()}
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full   py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div>
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" mt-4 inline-flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 transition hover:border-red-500 hover:bg-zinc-800"
              >
                <FaYoutube className="h-7 w-7 text-red-600" />
                <div>
                  <p className="font-semibold text-white">
                    Watch Trailer
                  </p>
                </div>
              </a>
            )}
          </div>



          {/* Info */}
          <div className="z-10  ">

            {/* <h1 className="text-4xl font-semibold">
              {movie.title}
            </h1>

            <p className="mt-2 text-lg text-zinc-400">
              Directed by <span className="text-white">{directors}</span>
            </p>

            <p className="mt-4 text-lg ">
              Rating {movie.vote_average.toFixed(1)} / 10
              
            </p> */}



            {/* <div className="mt-4 flex items-center gap-6">
              <button
                className='transition-transform hover:scale-110'>
                <Heart size={32} className={`transition-all ${isFavorite ?
                  "fill-white stroke-white" : 'fill-transparent stroke-white'
                  }`} onClick={handleFavorite} />
              </button>

              <button>
                <Bookmark size={32} onClick={handlewatchlist}
                  className={`cursor-pointer transition-all 
                  ${isInWatchlist ? "fill-white stroke-white text-white-500" : "text-white"}`} />
              </button>

              <div className='flex  gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={24} onClick={() => handleRating(star)}
                    className={`cursor-pointer transition-all ${userRating >= star ?
                      'fill-white stroke-white text-white-500' : 'text-gray-500'
                      }`} />
                ))}

              </div>
            </div> */}


            {/* <div className="mt-4 flex  gap-3">

              <span className="rounded-full  py-2">
                {new Date(movie.release_date).getFullYear()}
              </span>

              <span className="rounded-full  py-2">
                ⏱ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>

              <span className="rounded-full  py-2">
                🌍 {movie.original_language.toUpperCase()}
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-3">

              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full   py-2 text-sm"
                >
                  {genre.name}
                </span>
              ))}

            </div> */}
            {/* {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" mb-4 inline-flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900 px-5 py-3 transition hover:border-red-500 hover:bg-zinc-800"
              >
                <FaYoutube className="h-7 w-7 text-red-600" />
                <div>
                  <p className="font-semibold text-white">
                    Watch Trailer
                  </p>
                </div>
              </a>
            )} */}
            <div>
              <h2 className="mb-4  text-2xl font-bold">
                Where to Watch
              </h2>

              {!providers ? (
                <p className="text-zinc-400">
                  No streaming information available.
                </p>
              ) : (
                <>
                  {/* Streaming */}
                  {providers.flatrate && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold">Streaming</h3>

                      <div className="flex flex-wrap gap-4">
                        {providers.flatrate.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className=" flex-col items-center"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="h-9 w-9 rounded-xl"
                            />

                            <p className="mt-2 text-sm text-center">
                              {provider.provider_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Rent */}
                  {providers.rent && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold">Rent</h3>

                      <div className="flex flex-wrap gap-4">
                        {providers.rent.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className="flex-col items-center"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="h-9 w-9 rounded-xl"
                            />

                            <p className="mt-2 text-sm text-center">
                              {provider.provider_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Buy */}
                  {providers.buy && (
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold">Buy</h3>

                      <div className="flex flex-wrap gap-4">
                        {providers.buy.map((provider) => (
                          <div
                            key={provider.provider_id}
                            className=" flex-col items-center"
                          >
                            <img
                              src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                              alt={provider.provider_name}
                              className="h-9 w-9 rounded-xl"
                            />

                            <p className="mt-2 text-sm text-center">
                              {provider.provider_name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <a
                    href={providers.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn inline-block"
                  >
                    View All Providers
                  </a>
                </>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              Overview
            </h2>

            <p className="mt-4 max-w-4xl leading-8 text-zinc-300">
              {movie.overview}
            </p>

            <div className='mt-6'>
              <h2 className='mb-4 text-2xl font-bold'>Write a Review</h2>
              <textarea value={review} onChange={(e) => setReview(e.target.value)}
                placeholder="Share your thoughts about this movie..."
                className="h-40 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-red-500" />
            </div>

            <div className="mt-4 flex gap-4">
              <button
                onClick={handleReview}
                className=" btn" >
                Submit Review
              </button>

              <button
                onClick={handleDeleteReview}
                className="btn">
                Delete Review
              </button>
            </div>

            <div className='mt-9'>
              <h2 className='mb-6 text-2xl font-bold'>Latest Reviews</h2>
              {movieReviews.length === 0 ? (
                <p className="text-zinc-400">No reviews yet.</p>
              ) : (
                movieReviews.map((item) => (
                  <div
                    key={item.id}
                    className="mb-6 rounded-lg bg-zinc-900 p-5"
                  >

                    <p className="text-sm text-zinc-500">
                      {item.username}
                    </p>

                    <p className="mt-3 text-zinc-300">
                      {item.review}
                    </p>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </div>
      <MovieSection title='Similar Movies' movies={similarMovies} />
    </Layout>
  );
}

export default MovieDetails;
