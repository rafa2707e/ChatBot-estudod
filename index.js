const { salvarNotion } = require('./notion');
const { gerarPlanoEstudos, gerarPlanoJSON } = require('./gemini');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: './.wwebjs_auth'
    })
});

const sessoes = {};

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima com seu WhatsApp:');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async msg => { // ← message_create
    // Ignora mensagens do bot que não são comandos
    if (msg.fromMe && !msg.body.startsWith) return;

    const numero = msg.from;
    console.log('Mensagem recebida:', msg.body);

    if (!sessoes[numero]) {
        sessoes[numero] = { etapa: 'idle' };
    }

    const sessao = sessoes[numero]; // ← só uma vez aqui

    if (msg.body.toLowerCase() === 'estudar') {
        sessao.etapa = 'area';
        return msg.reply(
            '👋 Vamos montar seu plano personalizado!\n\n' +
            'Qual sua área de interesse?\n\n' +
            '1️⃣ Backend\n' +
            '2️⃣ Frontend\n' +
            '3️⃣ Dados\n' +
            '4️⃣ Mobile'
        );
    }

    if (sessao.etapa === 'area') {
        const areas = { '1': 'Backend', '2': 'Frontend', '3': 'Dados', '4': 'Mobile' };
        sessao.area = areas[msg.body];

        if (!sessao.area) {
            return msg.reply('Por favor, escolha uma opção válida: 1, 2, 3 ou 4');
        }

        sessao.etapa = 'linguagem';
        return msg.reply('Qual linguagem ou tecnologia você quer estudar?\n\nEx: Node.js, Python, React...');
    }

    if (sessao.etapa === 'linguagem') {
        sessao.linguagem = msg.body;
        sessao.etapa = 'nivel';
        return msg.reply(
            'Qual seu nível?\n\n' +
            '1️⃣ Iniciante\n' +
            '2️⃣ Intermediário\n' +
            '3️⃣ Avançado'
        );
    }

    if (sessao.etapa === 'nivel') {
        const niveis = { '1': 'Iniciante', '2': 'Intermediário', '3': 'Avançado' };
        sessao.nivel = niveis[msg.body];

        if (!sessao.nivel) {
            return msg.reply('Por favor, escolha uma opção válida: 1, 2 ou 3');
        }

        sessao.etapa = 'gerando';
        await msg.reply('⏳ Gerando seu plano personalizado...');

        try {
            const response = await gerarPlanoEstudos(sessao.linguagem, sessao.area, sessao.nivel);
            await client.sendMessage(numero, response);
            console.log('Resposta enviada!');

            const planoJSON = await gerarPlanoJSON(sessao.linguagem, sessao.area, sessao.nivel);
            await salvarNotion(planoJSON, sessao.linguagem);
            console.log('Salvo no Notion!');

        } catch (error) {
            console.error('Erro:', error.message);
            msg.reply('Ops, deu um erro. Tente novamente em instantes.');
        }

        sessoes[numero] = { etapa: 'idle' };
    }
});

process.on('SIGINT', async () => {
    console.log("\nEncerrando o bot com segurança...");
    await client.destroy();
    process.exit(0);
});

client.initialize();