const axios = require('axios').default;
const cheerio = require('cheerio')
const url = 'https://www.cnnbrasil.com.br/esporte/futebol/brasileirao-serie-a-2021/';

axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tabelaSerieA = $('.body__row');
    let posicao = 0
    const tabelaJson = [];
    tabelaSerieA.each(function(){
        posicao++
        const nome = $(this).find('.hide__s').text();
        const pontos = $(this).find('.teams__points.table__body__cell--gray').text();
        tabelaJson.push({
            posicao,
            nome,
            pontos,
        });
    });
    console.log(tabelaJson);
}).catch(console.error);
