import axios from "axios";
import { getOrSetCache } from "../utils/cache.js";

const tmdb = axios.create({
    baseURL: process.env.TMDB_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
        Accept: 'application/json'
    }
});

export const getTrendingMovies = async (page = 1) => {
    return getOrSetCache(
        `trending:${page}`,
        async () => {
            const response = await tmdb.get("/trending/movie/week", {
                params: {
                    page,
                }
            });
            return response.data;
        }
    );
}

export const getPopularMovies = async (page = 1) => {
    return getOrSetCache(
        `popular:${page}`,
        async () => {
            const response = await tmdb.get("/movie/popular", {
                params: {
                    page,
                }
            });
            return response.data;
        }
    )
}

export const searchMovies = async (query, page = 1) => {
    const response = await tmdb.get(`/search/movie`, {
        params: { query, page, }
    });
    return response.data;
}

export const getMovieDetails = async (id) => {
    return getOrSetCache(
        `movie:${id}`,
        async () => {
            const response = await tmdb.get(`/movie/${id}`);
            return response.data;
        }
    );
}

export const getTopRatedMovies = async (page = 1) => {
    return getOrSetCache(
        `top-rated:${page}`,
        async () => {
            const response = await tmdb.get("/movie/top_rated", {
                params: { page }
            });

            return response.data;
        },
    );
}

export const getNowPlayingMovies = async (page = 1) => {
    return getOrSetCache(
        `now-playing:${page}`,
        async () => {
            const response = await tmdb.get("/movie/now_playing", {
                params: { page }
            });

            return response.data;
        },
    );
}

export const getUpcomingMovies = async (page = 1) => {
    return getOrSetCache(
        `upcoming:${page}`,
        async () => {
            const response = await tmdb.get("/movie/upcoming", {
                params: { page }
            });

            return response.data;
        },
    );
}

export const getWatchProviders = async (id) => {
    return getOrSetCache(
        `watch-providers:${id}`,
        async () => {
            const response = await tmdb.get(`/movie/${id}/watch/providers`);

            return response.data;
        },
    );
}

export const getMovieCredits = async (id) => {
    return getOrSetCache(
        `credits:${id}`,
        async () => {
            const response = await tmdb.get(`/movie/${id}/credits`);

            return response.data;
        },
    );
}

export const getSimilarMovies = async (id) => {
    return getOrSetCache(
        `similar:${id}`,
        async () => {
            const response = await tmdb.get(`/movie/${id}/similar`);

            return response.data;
        },
    );
}

export const getMovieTrailers = async (id) => {
    return getOrSetCache(
        `trailers:${id}`,
        async () => {
            const response = await tmdb.get(`/movie/${id}/videos`);

            return response.data;
        },
    );
}