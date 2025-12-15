const User = require('../models/User');
const { generateToken } = require('../config/jwt');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Validações básicas
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    // Verificar se email já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Verificar se username já existe
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res.status(400).json({ error: 'Username já está em uso' });
    }

    // Criar usuário
    const userId = await User.create(username, email, password);
    
    // Gerar token
    const token = generateToken({ id: userId, email, username });

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      token,
      user: { id: userId, username, email }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Buscar usuário
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isValidPassword = await User.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = generateToken({ id: user.id, email: user.email, username: user.username });

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

module.exports = {
  register,
  login
};

