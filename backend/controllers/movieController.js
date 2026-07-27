import {getTrendingMovies,getPopularMovies,searchMovies,getMovieDetails,getNowPlayingMovies
,getTopRatedMovies,getUpcomingMovies,getWatchProviders,
getMovieCredits,getSimilarMovies,getMovieTrailers
} from "../services/tmdbService.js";

export const trendingMovies = async (req, res) => {
    try{
        const {page = 1} = req.query;
        const movies = await getTrendingMovies(page);
        res.status(200).json(movies);
    }catch(error){  
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch trending movies'});
    }
}

export const popularMovies = async (req, res) => {
    try{
        const {page = 1} = req.query;
        const movies = await getPopularMovies(page);
        res.status(200).json(movies);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch popular movies'});
    }
}

export const searchMovie = async (req, res) => {
    try{
        const {query,page=1} = req.query;
        const movies = await searchMovies(query,page);
        res.status(200).json(movies);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to search movies'});
    }
}

export const movieDetails = async (req, res) => {
    try{
        const {id} = req.params;
        const moive = await getMovieDetails(id);
        res.status(200).json(moive);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch movie details'});
    }
}

export const topRatedMovies = async (req, res) => {
    try {
        const { page = 1 } = req.query;
        const movies = await getTopRatedMovies(page);
        res.status(200).json(movies);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Failed to fetch top rated movies",
        });
    }
};

export const nowPlayingMovies = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const movies = await getNowPlayingMovies(page);
        res.status(200).json(movies);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch now playing movies'});
    }
}

export const upcomingMovies = async (req, res) => {
    try{
        const page = req.query.page || 1;
        const movies = await getUpcomingMovies(page);
        res.status(200).json(movies);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch upcoming movies'});
    }
}

export const watchProviders = async (req, res) => {
    try{
        const {id} = req.params;
        const providers = await getWatchProviders(id);
        res.status(200).json(providers);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch watch providers'});
    }
}

export const movieCredits = async (req,res) => {
    try{
        const { id } = req.params;
        const credits  = await getMovieCredits(id);
        res.status(200).json(credits);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch movie credits'});
     }
}

export const similarMovies = async (req,res) => {
    try{
        const { id } = req.params;
        const similarMovies  = await getSimilarMovies(id);
        res.status(200).json(similarMovies);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch similar movies'});
     }  
}

export const movieTrailers = async (req,res) => {
    try{
        const { id } = req.params;
        const trailers  = await getMovieTrailers(id);
        res.status(200).json(trailers);
    }catch(error){
        console.error(error.message);
        res.status(500).json({success:false,message: 'Failed to fetch movie trailers'});
     }
}