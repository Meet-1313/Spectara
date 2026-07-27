import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import MovieSection from "../components/MovieSection";
import {getFavorites} from "../services/favoriteService";
import {getMovieDetails} from "../services/movieService";

function Favorites() {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);
    

    useEffect(() => {
        const fetchFavorites = async () => {
            try{
                const data = await getFavorites();
                  console.log(data);
                const moviePromises = data.favorites.map((favorite) => 
                getMovieDetails(favorite.movie_id));
              
                const movies = await Promise.all(moviePromises);

                setMovies(movies);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchFavorites();
    },[]);

    if(loading) {
         return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-red-500"></div>
      </div>
    );
    }

    return (
        <Layout>
            <MovieSection title='❤️ My Favorites' movies={movies}/>
        </Layout>
    );
}

export default Favorites;