const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');

// Importar configuração do banco
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar banco de dados
initializeDatabase();

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

