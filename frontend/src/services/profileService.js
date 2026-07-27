import API from './api.js';

export const getProfile = async () => {

        const response = await API.get('/profile');
        return response.data;
}

export const uploadProfileImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await API.post(
        "/profile/upload-profile-image",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


