import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-800 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">
                    <Link to="/">Gerenciador de Filmes</Link>
                </h1>
                <div className="space-x-4">
                    <Link to="/new" className="hover:text-gray-300">Inserir</Link>
                    <Link to="/" className="hover:text-gray-300">Listar</Link>

                </div>
            </nav>
        </header>
    );
}

export default Header;