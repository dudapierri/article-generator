import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { articleService } from '../services/articleService';

function ArticleGenerator() {
  const [formData, setFormData] = useState({
    topic: '',
    wordCount: 500,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedArticle, setGeneratedArticle] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setGeneratedArticle(null);

    try {
      const result = await articleService.generate(
        formData.topic,
        parseInt(formData.wordCount)
      );
      setGeneratedArticle(result.article);
    } catch (err) {
      setError(
        err.response?.data?.error || 'Erro ao gerar artigo. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAndView = () => {
    navigate('/articles');
  };

  return (
    <div className="container main-content">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Gerar Novo Artigo</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Configurações do Artigo</h5>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleGenerate}>
                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">
                    Tópico do Artigo *
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    placeholder="Ex: Inteligência Artificial no Marketing Digital"
                    required
                    disabled={loading}
                  />
                  <div className="form-text">
                    Seja específico para obter melhores resultados
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="wordCount" className="form-label">
                    Número de Palavras
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="wordCount"
                    name="wordCount"
                    value={formData.wordCount}
                    onChange={handleChange}
                    min="300"
                    max="2000"
                    step="100"
                    disabled={loading}
                  />
                  <div className="form-text">Entre 300 e 2000 palavras</div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading || !formData.topic}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Gerando...
                    </>
                  ) : (
                    'Gerar Artigo'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mt-4 mt-lg-0">
          {generatedArticle && (
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title mb-0">Artigo Gerado</h5>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleSaveAndView}
                  >
                    Ver Meus Artigos
                  </button>
                </div>
                <h6 className="text-muted mb-3">{generatedArticle.title}</h6>
                <div
                  className="article-content"
                  style={{
                    maxHeight: '500px',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.6',
                  }}
                >
                  {generatedArticle.content}
                </div>
              </div>
            </div>
          )}
          {!generatedArticle && !loading && (
            <div className="card">
              <div className="card-body text-center text-muted py-5">
                <p className="mb-0">
                  Preencha o formulário e clique em "Gerar Artigo" para começar
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleGenerator;

