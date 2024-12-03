import React from 'react';
import '../styles/NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

const NavBar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        
        navigate('/');
    };


    return (
        <div className="navbar">
            <div className="navbar-left">
                <span className="navbar-brand">Tech<span className="navbar-brand-blue">Verse</span></span>
            </div>

            <div className="navbar-center">
                <Link className='navbar-link' to={"/home"}>Home</Link>
                <Link className='navbar-link' to={"/produtos"}>Produtos</Link>
                <Link className='navbar-link' to={"/categorias"}>Categorias</Link>
                <Link className='navbar-link' to={"/marcas"}>Marcas</Link>
            </div>

            <div className="navbar-right">
                <span className="logout-span" onClick={handleLogout} style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>
                    SAIR
                </span>
            </div>
        </div>
    );
};

export default NavBar;
