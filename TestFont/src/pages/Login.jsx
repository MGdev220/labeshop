/* eslint-disable no-unused-vars */
import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { useAuthStore } from '../store/useAuthStore';
import { decodeUserByToken } from "../utils/utils"
import '../assets/style/login style.css';

const Login = () => {

    const { setUser, user } = useAuthStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const userData = await loginUser(formData);
            sessionInitialize(userData.token);
            navigate("/"); // Redirigez vers la page d'accueil ou tableau de bord
        } catch (err) {
            setError(err);
        }
    };

    const sessionInitialize = (token) => {
        // initialiser les donnees
        localStorage.setItem("token", token);
        const decodeUser = decodeUserByToken(token);
        setUser(decodeUser);
        console.log("user login", user);
    }



    return (
        <div className="login-container">
            <div className="login-form">
                <h2 className="login-title">connectez-vous sur LabeShop</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Se connecter</button>
                </form>
                <p className="login-footer">
                    Pas encore de compte? <a href="/register">{"S'inscrire"}</a>
                </p>
            </div>
        </div>
    );
};

export default Login;



