import API  from "./api";

export const addReview = async (movieId,review) => {
    const response = await API.post('/reviews',{ movieId,review });
    return response.data;
}

export const getReview = async (movieId) => {
    const response = await API.get(`/reviews/${movieId}`);
    return response.data;   
}

export const getMovieReviews = async (movieId) => {
    const response = await API.get(`/reviews/movie/${movieId}`);
    return response.data;   
}

export const deleteReview = async (movieId) => {
    const response = await API.delete(`/reviews/${movieId}`);
    return response.data;
}