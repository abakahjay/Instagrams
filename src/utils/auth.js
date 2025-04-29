import API from "./api.js";

export const loginUser = async (email, password) => {
    const { data } = await API.post("/api/v1/auth/login", { email, password });
    console.log(data);
    return data;
};

export const registerUser = async (email, password,firstName,lastName,username) => {
    const { data } = await API.post("/api/v1/auth/signup", { email, password,firstName,lastName,username });
    console.log(data);
    return data;
};

export const logoutUser = async (userId) => {
    await API.post(`/api/v1/auth/logout?userId=${userId}`);
};
