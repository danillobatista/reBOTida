const fetch = require('node-fetch')
const nodeHtmlToImage = require('node-html-to-image')

fetch('http://fnn-sportsapi.herokuapp.com/mlb/games/get')
    .then(res => res.text())
    .then(body => {
        console.log(body)
        nodeHtmlToImage({
            output: './image.png',
            html: body,
            waitUntil: 'domcontentloaded'
        })
            .then(() => console.log('The image was created successfully!'))
    });