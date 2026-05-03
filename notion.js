const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({
    auth: process.env.NOTION_TOKEN
});

async function salvarNotion(planoJSON, tecnologia){

const response =  await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID
    });

    const resultados = response.results;

    const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
   const hoje = dias[new Date().getDay()];
   

  for (let i = 0; i < resultados.length; i++) {
    const nomeDaPagina = resultados[i].properties.Name.title[0].plain_text;
    console.log('Nome da página:', `"${nomeDaPagina}"`); // ← ver com aspas
    const topicoDia = planoJSON[nomeDaPagina];
    console.log('Tópico encontrado:', topicoDia);
    
    if (topicoDia){
      await notion.pages.update({
    page_id: resultados[i].id,
    properties: {
        Tecnologia: {
            rich_text: [{
                text: {
                    content: tecnologia 
                }
            }]
        },
        Summary: {
            rich_text: [{
                text: {
                    content: topicoDia 
                }
            }]
        }
    }
});
    }
}}
module.exports = { salvarNotion };
