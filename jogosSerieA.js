const axios = require('axios').default;
const cheerio = require('cheerio')
const url = 'https://www.placardefutebol.com.br/brasileirao-serie-a';

axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const colunas= $('.row.align-items-center.content');
    const tabelaJson = [];
    colunas.each(function(){
        let status = $(this).find('.badge.badge-danger.status-name').text();
        if(status.length === 0) status = $(this).find('.badge.badge-info.status-name').text();
        if(status.length === 0) status = $(this).find('.badge.badge-success.status-name').text();
        let timeHome = $(this).find('.text-right.team_link').text();
        let placarHome = $(this).find('.badge.badge-default').eq(0).text();
        let palacarVisitante = $(this).find('.badge.badge-default').eq(1).text();
        let timeVisitante = $(this).find('.text-left.team_link').text();
        tabelaJson.push({
            status,
            timeHome,
            placarHome,
            palacarVisitante,
            timeVisitante
        });
    });
    console.log(tabelaJson);
}).catch(console.error);

