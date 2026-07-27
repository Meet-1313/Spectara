import {useState,useEffect} from "react";
import Layout from "../components/Layout";
import MovieSection from "../components/MovieSection";
import { getMovieDetails } from "../services/movieService";
import {getWatchlist} from "../services/watchlistService";

function Watchlist() {
    const [movies,setMovies] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const fetchWatchlist = async () => {
            try{
                const data = await getWatchlist();
                console.log(data);
                const moviePromises = data.watchlist.map((item) => 
                getMovieDetails(item.movie_id));

                const movies = await Promise.all(moviePromises);
                setMovies(movies);
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetchWatchlist();
    },[]);

    if(loading) {
        return <Layout><p>Loading...</p></Layout>
    }

    return (
        <Layout>
            <MovieSection title="My Watchlist" movies={movies} />
        </Layout>
    );
}

export default Watchlist;
