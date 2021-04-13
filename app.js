require('dotenv').config()

const app = require("./config/server.js");
const cliente = require('./config/twitter')
var CronJob = require('cron').CronJob;
const fs = require('fs')
const puppeteer = require('puppeteer');

//Configura a porta disponível ou a porta 3000
const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
const server_host = process.env.YOUR_HOST || '0.0.0.0';

function makeImageFromURL(url, callback) {
    const config = {
        headless: true,
        defaultViewport: null,
        args: [
            "--incognito",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
            "--disable-setuid-sandbox"
        ],
    };
    const s = puppeteer.launch(config)
        .then(async function (browser) {
            console.log('puppeteer start')
            const page = await browser.newPage();
            await page.goto(url, { waitUntil: "domcontentloaded" });
            console.log('puppeteer loaded page');
            await page.screenshot({ path: 'image.png', fullPage: true });
            await browser.close();
            callback();
        });

}
//Aplicação escutando na porta e hosts configurados anteriormente
app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
});

let job2 = new CronJob('00 35 9 * * 0-6',
    function () {
        //o que rodar
        console.log('requisicao mlb');
        makeImageFromURL('http://fnn-sportsapi.herokuapp.com/mlb/games/get', function (data) {
            console.log('makeImageFromURL');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMediaAndTweet(imageData, 'Saudações fã do esporte beisebola, que tal conferir os jogos de hoje da MLB:')
        });

        makeImageFromURL('http://fnn-sportsapi.herokuapp.com/mlb/scores/get', function (data) {
            console.log('makeImageFromURL');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMediaAndTweet(imageData, 'E pra ficar por dentro, os resultados de ontem:')
        });
    },
    function () {
        //depois de encerrado
        console.log("Cron job stopped!")
    },
    true,
    'America/Sao_Paulo'
);
