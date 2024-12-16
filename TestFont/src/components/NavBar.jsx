/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { decodeUserByToken, isConnectUser } from '../utils/utils'
import LogoutIcon from "../components/LogoutIcon"

import { useState } from 'react';
import '../assets/style/navbar.css'; // Assurez-vous d'importer le CSS

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const [showNavbarItem, setSshowNavbarItem] = useState(false);

    // const [isConnectUser, setConnectUser] = useState(decodeUserByToken());

    useEffect(() => {
        setSshowNavbarItem(isConnectUser())
    }, [])


    // Fonction pour activer/désactiver le menu burger
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const logout = () => {
        localStorage.setItem("token", '')
    }

    const testConnect = () => {
        if (!isConnectUser()) {
            navigate("/login");
        }
    }

    return (
        <nav className="navbar">
            {/* Logo ou titre */}
            <div className="logo">
                <Link to="/" className="font-bold text-xl">LabeShop</Link>
            </div>

            {/* Menu de navigation */}

            {
                (<div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <Link onClick={testConnect} to="/order" className="mx-2">Commandes</Link>
                    <Link to="/cart" onClick={(e) => { }} className="mx-2">Panier</Link>
                    <div onClick={logout}> <Link to="/login" className="mx-2"><LogoutIcon /></Link> </div>
                </div>)
            }

            {/* Menu burger pour petits écrans */}
            <div className="hamburger" onClick={toggleMenu}>
                {menuOpen ? '×' : '☰'}
            </div>
        </nav>
    );
};

export default Navbar;
