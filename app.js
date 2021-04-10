require('dotenv').config()

const fetch = require('node-fetch')
const app = require("./config/server.js");
const cliente = require('./config/twitter')
const nodeHtmlToImage = require('node-html-to-image')
var CronJob = require('cron').CronJob;
const fs = require('fs')

//Configura a porta disponível ou a porta 3000
const server_port = process.env.YOUR_PORT || process.env.PORT || 3000;
//Configura o host disponível ou "0.0.0.0"
const server_host = process.env.YOUR_HOST || '0.0.0.0';

function getData(url, callback) {
    fetch(url)
        .then(res => res.text())
        .then(body => {
            callback(body)
        })
}

function getImage(data, callback) {
    nodeHtmlToImage({
        output: './image.png',
        html: data,
        waitUntil: 'networkidle2'
    })
        .then(() => callback())
}

//Aplicação escutando na porta e hosts configurados anteriormente
app.listen(server_port, server_host, function () {
    console.log("Aplicação online.");
});

//Aplicação escutando requisições do método GET "/"
app.get("/mlb/games", function (req, res) {
    console.log('requisicao mlb games');
    console.log(process.env.consumer_key)
    getData('http://fnn-sportsapi.herokuapp.com/mlb/games/get', function (data) {
        console.log('getData');
        getImage(data, function () {
            console.log('getImage');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMedia('Os jogos de hoje da MLB (se vocês estiverem vendo isso, está funcionando!)', imageData)
        })
    });

});

//Aplicação escutando requisições do método GET "/"
app.get("/mlb/scores", function (req, res) {
    console.log('requisicao mlb games');
    getData('http://fnn-sportsapi.herokuapp.com/mlb/scores/get', function (data) {
        console.log('getData');
        getImage(data, function () {
            console.log('getImage');
            const imageData = fs.readFileSync('./image.png')
            cliente.uploadMedia('E os resultados de ontem (2ª rodada de testes!)', imageData)
        })
    });

});

