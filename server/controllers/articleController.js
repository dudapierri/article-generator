const Article = require('../models/Article');
const { generateArticle } = require('../services/openaiService');

async function generate(req, res) {
  try {
    const { topic, wordCount = 500 } = req.body;
    const userId = req.user.id;

    if (!topic) {
      return res.status(400).json({ error: 'Tópico é obrigatório' });
    }

    // Gerar artigo com OpenAI
    const articleData = await generateArticle(topic, wordCount);

    // Salvar no banco de dados
    const articleId = Article.create(
      userId,
      articleData.title,
      articleData.content,
      topic,
      wordCount
    );

    res.status(201).json({
      message: 'Artigo gerado com sucesso',
      article: {
        id: articleId,
        title: articleData.title,
        content: articleData.content,
        topic,
        wordCount
      }
    });
  } catch (error) {
    console.error('Generate article error:', error);
    res.status(500).json({ 
      error: 'Erro ao gerar artigo',
      details: error.message 
    });
  }
}

async function getAll(req, res) {
  try {
    const userId = req.user.id;
    const articles = Article.findByUserId(userId);
    
    res.json({ articles });
  } catch (error) {
    console.error('Get articles error:', error);
    res.status(500).json({ error: 'Erro ao buscar artigos' });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = Article.findById(id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artigo não encontrado' });
    }

    // Verificar se o artigo pertence ao usuário
    if (article.user_id !== userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json({ article });
  } catch (error) {
    console.error('Get article error:', error);
    res.status(500).json({ error: 'Erro ao buscar artigo' });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const { title, content, status } = req.body;
    const userId = req.user.id;

    const article = Article.findById(id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artigo não encontrado' });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    Article.update(id, title || article.title, content || article.content, status || article.status);

    res.json({ message: 'Artigo atualizado com sucesso' });
  } catch (error) {
    console.error('Update article error:', error);
    res.status(500).json({ error: 'Erro ao atualizar artigo' });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const article = Article.findById(id);
    
    if (!article) {
      return res.status(404).json({ error: 'Artigo não encontrado' });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    Article.delete(id, userId);

    res.json({ message: 'Artigo deletado com sucesso' });
  } catch (error) {
    console.error('Delete article error:', error);
    res.status(500).json({ error: 'Erro ao deletar artigo' });
  }
}

module.exports = {
  generate,
  getAll,
  getById,
  update,
  remove
};

