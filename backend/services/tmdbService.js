import axios from "axios";

const tmdb = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    headers:{
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        Accept: 'application/json'
    }
});

export const getTrendingMovies = async (page=1) => {
    const response = await tmdb.get("/trending/movie/week",{
        params: {
            page,
        }
    });
    return response.data;
}

export const getPopularMovies = async (page=1) => {
    const response = await tmdb.get("/movie/popular",{
        params: {
            page,
        }
    });
    return response.data;
}

export const searchMovies = async (query,page=1) => {
    const response = await tmdb.get(`/search/movie`,{
        params:{query,page,}
    });
    return response.data;
}

export const getMovieDetails = async (id) => {
    const response = await tmdb.get(`/movie/${id}`);
    return  response.data;
}

export const getTopRatedMovies = async (page=1) => {
    const response = await tmdb.get(`/movie/top_rated`,{
        params: {page}
    });
    return response.data;
}

export const getNowPlayingMovies = async (page=1) => {
    const response = await tmdb.get(`/movie/now_playing`,{
        params: {page}
    });
    return response.data;
}

export const getUpcomingMovies = async (page=1) => {
    const response = await tmdb.get(`/movie/upcoming`,{
        params: {page}
    });
    return response.data;
}

export const getWatchProviders = async (id) => {
    const response = await tmdb.get(`/movie/${id}/watch/providers`);
    return response.data;
}

export const getMovieCredits = async (id) => {
    const response = await tmdb.get(`/movie/${id}/credits`);
    return response.data;
}

export const getSimilarMovies = async (id) => {
    const response = await tmdb.get(`/movie/${id}/similar`);
    return response.data;
}

export const getMovieTrailers = async (id) => {
    const response = await tmdb.get(`/movie/${id}/videos`);
    return response.data;
}