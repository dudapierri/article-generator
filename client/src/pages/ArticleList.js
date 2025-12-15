import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { articleService } from '../services/articleService';

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const result = await articleService.getAll();
      setArticles(result.articles || []);
    } catch (err) {
      setError('Erro ao carregar artigos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este artigo?')) {
      return;
    }

    try {
      await articleService.delete(id);
      loadArticles();
      if (selectedArticle?.id === id) {
        setSelectedArticle(null);
      }
    } catch (err) {
      alert('Erro ao excluir artigo');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container main-content">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h1>Meus Artigos</h1>
          <Link to="/generate" className="btn btn-primary">
            + Novo Artigo
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="row">
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                Artigos ({articles.length})
              </h5>
              {articles.length === 0 ? (
                <p className="text-muted">
                  Você ainda não criou nenhum artigo.
                  <Link to="/generate"> Crie o primeiro agora!</Link>
                </p>
              ) : (
                <div className="list-group list-group-flush">
                  {articles.map((article) => (
                    <div
                      key={article.id}
                      className={`list-group-item list-group-item-action ${
                        selectedArticle?.id === article.id ? 'active' : ''
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <h6 className="mb-1">{article.title}</h6>
                      <small className="text-muted">
                        {formatDate(article.created_at)}
                      </small>
                      {article.topic && (
                        <div>
                          <span className="badge bg-secondary">
                            {article.topic}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-8 mt-4 mt-lg-0">
          {selectedArticle ? (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h4 className="card-title">{selectedArticle.title}</h4>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(selectedArticle.id)}
                  >
                    Excluir
                  </button>
                </div>
                <div className="mb-3">
                  <small className="text-muted">
                    Criado em: {formatDate(selectedArticle.created_at)}
                  </small>
                  {selectedArticle.topic && (
                    <span className="badge bg-secondary ms-2">
                      {selectedArticle.topic}
                    </span>
                  )}
                  {selectedArticle.word_count && (
                    <span className="badge bg-info ms-2">
                      {selectedArticle.word_count} palavras
                    </span>
                  )}
                </div>
                <div
                  className="article-content"
                  style={{
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.8',
                    maxHeight: '600px',
                    overflowY: 'auto',
                  }}
                >
                  {selectedArticle.content}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <div className="card-body text-center text-muted py-5">
                <p className="mb-0">
                  Selecione um artigo da lista para visualizar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleList;

