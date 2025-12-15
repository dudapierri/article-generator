import api from './authService';

export const articleService = {
  generate: async (topic, wordCount = 500) => {
    const response = await api.post('/articles/generate', {
      topic,
      wordCount,
    });
    return response.data;
  },

  getAll: async () => {
    const response = await api.get('/articles');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data;
  },

  update: async (id, title, content, status) => {
    const response = await api.put(`/articles/${id}`, {
      title,
      content,
      status,
    });
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/articles/${id}`);
    return response.data;
  },
};

