import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/authService';

function Dashboard() {
  const user = getUser();

  return (
    <div className="container main-content">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Dashboard</h1>
          <p className="lead">
            Bem-vindo, <strong>{user?.username}</strong>!
          </p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">🚀 Gerar Novo Artigo</h5>
              <p className="card-text">
                Crie artigos únicos para WordPress usando inteligência artificial.
              </p>
              <Link to="/generate" className="btn btn-primary">
                Gerar Artigo
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">📚 Meus Artigos</h5>
              <p className="card-text">
                Visualize, edite e gerencie todos os artigos que você criou.
              </p>
              <Link to="/articles" className="btn btn-outline-primary">
                Ver Artigos
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">💡 Dicas</h5>
              <p className="card-text">
                Seja específico no tópico para obter melhores resultados. 
                Artigos podem ter entre 300 e 2000 palavras.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

