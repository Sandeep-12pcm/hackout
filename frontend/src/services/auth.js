import axios from "./../utils/axiosInstance";

export const signup = (userData) => axios.post(`/register`, userData);
export const login = (userData) => axios.post(`/login`, userData);
