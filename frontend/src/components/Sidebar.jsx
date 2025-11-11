import React from 'react';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const navLinkClasses = ({ isActive }) => 
    isActive 
      ? 'block p-2 rounded bg-gray-600' 
      : 'block p-2 rounded hover:bg-gray-700';

  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        <NavLink to="/">Gerenciador</NavLink>
      </h1>
      <hr className="border-t border-gray-600 mb-8" />
      <nav>
        <ul>
          <li className="mb-4">
            
            <NavLink to="/new" className={navLinkClasses}>Inserir Filme</NavLink>
          </li>
          <li className="mb-4">
            <NavLink to="/" className={navLinkClasses}>Listar Filmes</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
