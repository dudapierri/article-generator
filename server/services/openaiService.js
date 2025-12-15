const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateArticle(topic, wordCount = 500) {
  try {
    const prompt = `Escreva um artigo completo e bem estruturado sobre "${topic}". 
O artigo deve ter aproximadamente ${wordCount} palavras, ser informativo, bem escrito e adequado para publicação em um blog WordPress.

Formato esperado:
- Título atrativo e SEO-friendly
- Introdução envolvente
- Conteúdo bem estruturado com parágrafos
- Conclusão que resume os principais pontos

Retorne APENAS o conteúdo do artigo sem explicações adicionais. O título deve ser a primeira linha, seguido de uma linha em branco, e então o conteúdo.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Você é um redator profissional especializado em criar artigos de blog bem estruturados e otimizados para SEO."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: Math.ceil(wordCount * 1.5) // Aproximadamente 1.5 tokens por palavra
    });

    const fullText = completion.choices[0].message.content.trim();
    
    // Separar título e conteúdo
    const lines = fullText.split('\n');
    const title = lines[0].replace(/^#+\s*/, '').trim(); // Remove markdown headers
    const content = lines.slice(1).join('\n').trim();

    return {
      title: title || topic,
      content: content || fullText
    };
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Tratamento específico para erros comuns
    if (error.status === 429) {
      throw new Error('Quota da OpenAI excedida. Verifique seus créditos e limites em https://platform.openai.com/account/billing');
    }
    
    if (error.status === 401) {
      throw new Error('Chave da API da OpenAI inválida. Verifique a configuração OPENAI_API_KEY no arquivo .env');
    }
    
    throw new Error(`Erro ao gerar artigo: ${error.message}`);
  }
}

module.exports = {
  generateArticle
};

