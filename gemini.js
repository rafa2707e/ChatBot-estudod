require('dotenv').config();

// Função 1 - retorna texto bonito para o WhatsApp
async function gerarPlanoEstudos(mensagemUsuario) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content:  `Você é um mentor de programação TechLead de uma BigTech.
O usuário quer estudar: "${mensagemUsuario}".

Crie uma rotina de estudos para a semana atual (segunda a domingo).
Use EXATAMENTE esse formato com emojis e asteriscos para WhatsApp:

🎯 *PLANO DE ESTUDOS - ${mensagemUsuario.toUpperCase()}*

📅 *Segunda-feira*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Terça-feira*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Quarta-feira*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Quinta-feira*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Sexta-feira*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Sábado*
📖 Tópico: [tópico do dia]
▶️ Canal: [nome de um canal real do YouTube]
✅ Meta: [o que o aluno deve conseguir fazer ao final do dia]

📅 *Domingo* 🧪
📖 Revisão geral da semana
✅ Meta: Faça um projeto ou teste prático com tudo que aprendeu na semana!

💪 *Bons estudos! Consistência é a chave do sucesso!*`
            }]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

// Função 2 - retorna JSON estruturado para salvar no Notion
async function gerarPlanoJSON(mensagemUsuario) {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            max_tokens: 1024,
            messages: [{
                role: "user",
                content: `Você é um mentor de programação ou TechLead de uma BigTech.
                          O usuário quer estudar: "${mensagemUsuario}".
                          Crie um plano de estudos para 7 dias da semana.
                          Retorne APENAS um JSON válido, sem texto adicional, sem markdown, sem explicação:
                          {
                            "Domingo": "tópico resumido do dia",
                            "Segunda": "tópico resumido do dia",
                            "Terça": "tópico resumido do dia",
                            "Quarta": "tópico resumido do dia",
                            "Quinta": "tópico resumido do dia",
                            "Sexta": "tópico resumido do dia",
                            "Sábado": "tópico resumido do dia"
                          }`
            }]
        })
    });

    const data = await response.json();
    const texto = data.choices[0].message.content;
    
    // Remove possíveis markdowns como ```json
    const limpo = texto.replace(/```json|```/g, '').trim();
    return JSON.parse(limpo);
}

module.exports = { gerarPlanoEstudos, gerarPlanoJSON };