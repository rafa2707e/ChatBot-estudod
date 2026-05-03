const { salvarNotion } = require('./notion');
const { gerarPlanoEstudos, gerarPlanoJSON } = require('./gemini'); // ← importa os dois
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log('Escaneie o QR Code acima com seu WhatsApp:');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async msg => {
    console.log('Mensagem recebida:', msg.body);

    if (msg.body.toLowerCase().startsWith('!estudar')) {
        const pergunta = msg.body.replace(/!estudar/i, '').trim();

        if (!pergunta) {
            return msg.reply('Diga o que você quer estudar! Ex: !estudar Java');
        }

        await msg.reply('⏳ Gerando seu plano de estudos...');

        try {
    console.log('Chamando IA para:', pergunta);

    // 1 - envia texto bonito no WhatsApp
    const response = await gerarPlanoEstudos(pergunta);
    await client.sendMessage(msg.from, response);
    console.log('Resposta enviada!');

    // 2 - gera JSON e salva no Notion
    const planoJSON = await gerarPlanoJSON(pergunta); // ← só pergunta!
    console.log('JSON gerado:', planoJSON);
    await salvarNotion(planoJSON, pergunta); // ← passa os dois aqui
    console.log('Salvo no Notion!'); // ← sem o s

} catch (error) {
    console.error('Erro:', error.message);
    msg.reply('Ops, deu um erro. Tente novamente em instantes.');
}
    }
});

process.on('SIGINT', async () => {
    console.log("\nEncerrando o bot com segurança...");
    await client.destroy();
    process.exit(0);
});

client.initialize();