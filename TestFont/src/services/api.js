/* eslint-disable no-unused-vars */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../store/useAuthStore';


export const API_BASE_URL = "http://localhost:5000/api";

const API = axios.create({
    baseURL: API_BASE_URL,
});

// Ajout du token d'authentification aux requêtes
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;



// export const sessionInitialize = (token) => {
//     const { setUser } = useAuthStore()
//     // initialiser les donnees
//     localStorage.setItem("token", token);
//     const user = decodeUserByToken(token);
//     console.log(user);
//     setUser(user);
// }

// const decodeUserByToken = (token) => {
//     const decoded = jwtDecode(token);
//     // Décoder le token
//     return decoded || null;
// }

