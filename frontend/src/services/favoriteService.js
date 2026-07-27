import API from './api.js';

export const addFavorite = async (movieId) => {
    const response = await API.post('/favorites', { movieId });
    return response.data;
}

export const getFavorites = async () => {
    const response = await API.get('/favorites');
    return response.data;
}

export const removeFavorite = async (movieId) => {
    const response = await API.delete(`/favorites/${movieId}`);
    return response.data;
}

export const checkFavorite = async (movieId) => {
    const response = await API.get(`/favorites/check/${movieId}`);
    return response.data;
};