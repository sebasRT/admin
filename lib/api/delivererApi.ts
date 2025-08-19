import axios from "axios";

let baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
    throw new Error("Missing api url environment variable.");
}

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL
})

export default api;