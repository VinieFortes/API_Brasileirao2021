const axios = require('axios').default;
const cheerio = require('cheerio')
const url = 'https://www.otempo.com.br/superfc/serie-b';

axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tabelaSerieA = $('.cell.linha-time.ng-scope.selected');
    let posicao = 0
    const tabelaJson = [];
    tabelaSerieA.each(function(){
        posicao++
        const nome = $(this).find('.nome.ng-binding').text();
        const pontos = $(this).find('.someClass.ng-binding').first().text()
        tabelaJson.push({
            posicao,
            nome,
            pontos,
        });
    });
    console.log(tabelaJson);
}).catch(console.error);
