import axios from 'axios';

const API = axios.create({
    baseURL : 'http://localhost:5000/api/auth',
});

export const register = async (userData) => {
    const response = await API.post('/register', userData);
    return response.data;
}

export const login = async (userData) => {
    const response = await API.post('/login', userData);
    return response.data;
}

export const currentUser = async (token) => {
    const respone = await API.get('/me',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    });
    
    return respone.data;
}

export const updateProfile = async (username, email, token) => {
    const response = await API.put(
        "/profile",
        {
            username,
            email,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const changePassword = async (
    currentPassword,
    newPassword,
    token
) => {
    const response = await API.put(
        "/change-password",
        {
            currentPassword,
            newPassword,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};