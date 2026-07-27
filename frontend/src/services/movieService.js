import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/movies`,
});

export const getTrendingMovies = async (page=1) => {
    const response = await API.get("/trending",{
      params:{
        page,
      }
    });
  return response.data;
}

export const getPopularMovies = async (page=1) => {
  const response = await API.get("/popular",{
    params: {
      page,
    }
  });
  return response.data;
};

export const searchMovies = async (query,page=1) => {
  const response = await API.get("/search", {
    params: {
      query,page
    },
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

export const getTopRatedMovies = async (page = 1) => {
    const response = await API.get(`/top-rated?page=${page}`);
    return response.data;
};

export const getNowPlayingMovies = async (page = 1) => {
    const response = await API.get(`/now-playing?page=${page}`);
    return response.data;
};

export const getUpcomingMovies = async (page = 1) => {
    const response = await API.get(`/upcoming?page=${page}`);
    return response.data;
};

export const getWatchProviders = async (id) => {
  const response = await API.get(`/${id}/watch-providers`);
  return response.data;
}

export const getMovieCredits = async (id) => {
  const response = await API.get(`/${id}/credits`);
  return response.data;
}

export const getSimilarMovies = async (id) => {
  const response = await API.get(`/${id}/similar`);
  return response.data;
}

export const getMovieTrailers = async (id) => {
  const response = await API.get(`/${id}/trailers`);
  return response.data;
}