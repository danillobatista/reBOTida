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

let job1 = new CronJob('00 30 9 * * 0-6',
    function () {
        //o que rodar
        console.log('requisicao mlb games');
        makeImageFromURL('http://fnn-sportsapi.herokuapp.com/mlb/games/get', function (data) {
            console.log('makeImageFromURL');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMediaAndTweet(imageData, 'Saudações fã do esporte beisebola, já tem bola voando pra você que está no descansinho do domingo!')
        });
    },
    function () {
        //depois de encerrado
        console.log("Cron job stopped!")
    },
    true,
    'America/Sao_Paulo'
);

let job2 = new CronJob('00 31 9 * * 0-6',
    function () {
        //o que rodar
        console.log('requisicao mlb scores');
        makeImageFromURL('http://fnn-sportsapi.herokuapp.com/mlb/scores/get', function (data) {
            console.log('makeImageFromURL');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMediaAndTweet(imageData, 'E pra você que se perdeu um pouquinho, os resultados de ontem:')
        });
    },
    function () {
        //depois de encerrado
        console.log("Cron job stopped!")
    },
    true,
    'America/Sao_Paulo'
);
