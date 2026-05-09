# 📚 Bot de Estudos com WhatsApp + IA + Notion

Um bot de WhatsApp que gera planos de estudos personalizados com Inteligência Artificial e salva automaticamente no Notion, organizando o que estudar em cada dia da semana.

---

## 🚀 Funcionalidades

- 📱 Bot integrado ao WhatsApp via `whatsapp-web.js`
- 🤖 Geração de plano de estudos semanal com IA (Groq + LLaMA)
- 📅 Preenchimento automático do Notion com tópico de cada dia
- 🎯 Plano formatado com emojis e canais do YouTube para aprender

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| Node.js | Runtime principal |
| whatsapp-web.js | Conexão com WhatsApp |
| Groq API (LLaMA 3) | Geração do plano de estudos |
| Notion API | Armazenamento do plano semanal |
| dotenv | Gerenciamento de variáveis de ambiente |

---

## 📁 Estrutura do Projeto

```
├── index.js       # Conexão com WhatsApp e orquestração
├── gemini.js      # Integração com a IA (Groq)
├── notion.js      # Integração com o Notion
├── .env           # Variáveis de ambiente (não versionar!)
├── package.json   # Dependências do projeto
└── README.md      # Documentação
```

---

## ⚙️ Como Configurar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
GROQ_API_KEY=sua_chave_groq_aqui
NOTION_TOKEN=seu_token_notion_aqui
NOTION_DATABASE_ID=seu_database_id_aqui
```

#### Como obter cada chave:

- **GROQ_API_KEY** → Acesse [groq.com](https://groq.com) → API Keys → Create API Key
- **NOTION_TOKEN** → Acesse [notion.so/my-integrations](https://notion.so/my-integrations) → New Integration → copie o token
- **NOTION_DATABASE_ID** → Abra seu database no Notion e copie o ID da URL

### 4. Configure o Notion

Crie um database no Notion com as seguintes colunas:

| Coluna | Tipo |
|---|---|
| Name | Title |
| Dia | Date |
| Status | Checkbox |
| Tecnologia | Text |
| Summary | Text |

Adicione uma linha para cada dia da semana: **Domingo, Segunda, Terça, Quarta, Quinta, Sexta, Sábado**

Conecte sua integration ao database: `...` → Connections → sua integration

### 5. Execute o bot

```bash
node index.js
```

Escaneie o QR Code com o WhatsApp e o bot estará pronto!

---

## 💬 Como Usar

No WhatsApp, envie uma mensagem para o número conectado:

```
!estudar Node.js
!estudar Backend
!estudar React
!estudar Python
```

O bot irá:
1. ⏳ Confirmar que recebeu o pedido
2. 📋 Enviar o plano de estudos formatado no WhatsApp
3. 📅 Preencher automaticamente o Notion com o tópico de cada dia da semana

---

## 📋 Exemplo de Resposta

```
🎯 *PLANO DE ESTUDOS - NODE.JS*

📅 *Segunda-feira*
📖 Tópico: Métodos HTTP (GET, POST, PUT, DELETE)
▶️ Canal: Rocketseat
✅ Meta: Criar um servidor simples e testar os métodos HTTP

📅 *Terça-feira*
📖 Tópico: Express.js e Rotas
▶️ Canal: Filipe Deschamps
✅ Meta: Criar uma API REST básica com Express

...

📅 *Domingo* 🧪
📖 Revisão geral da semana
✅ Meta: Faça um projeto prático com tudo que aprendeu!

💪 *Bons estudos! Consistência é a chave do sucesso!*
```

---

## 🔒 Segurança

- **Nunca versione o arquivo `.env`** — ele contém suas chaves de API
- Adicione `.env` no `.gitignore` antes de fazer o primeiro commit

```bash
echo ".env" >> .gitignore
```

---

## 📦 Dependências

```json
{
  "@notionhq/client": "^2.2.15",
  "dotenv": "^17.4.2",
  "qrcode-terminal": "^0.12.0",
  "whatsapp-web.js": "^1.34.7"
}
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

---

## 👨‍💻 Autor

Feito com 💚 por **Rafael L2R2**

---

## 📄 Licença

Este projeto está sob a licença ISC.
