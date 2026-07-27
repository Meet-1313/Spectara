import API from "./api";

export const addRating = async (movieId,rating) => {
    const response = await API.post('/ratings',{ movieId,rating });
    return response.data;
}

export const getRating = async (movieId) => {
    const response = await API.get(`/ratings/${movieId}`);
    return response.data;   
}

export const deleteRating = async (movieId) => {
    const response = await API.delete(`/ratings/${movieId}`);
    return response.data;
}
