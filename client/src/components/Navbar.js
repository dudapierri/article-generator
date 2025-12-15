import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUser } from '../services/authService';

function Navbar({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setDropdownOpen(false);
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          📝 Gerador de Artigos
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            const nav = document.getElementById('navbarNav');
            nav.classList.toggle('show');
          }}
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/dashboard')}`}
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/generate')}`}
                to="/generate"
              >
                Gerar Artigo
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive('/articles')}`}
                to="/articles"
              >
                Meus Artigos
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                }}
                aria-expanded={dropdownOpen}
              >
                {user?.username || 'Usuário'}
              </a>
              <ul
                className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={handleLogout}
                  >
                    Sair
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

