var Twitter = require('twitter');

var cliente = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

cliente.tweet = function (tweet) {
    console.log("tweet =", tweet);
    cliente.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (error) console.log("error", error);
        else
            console.log("Tweet enviado.");
    });
}

cliente.uploadMedia = function (text, media) {
    console.log('starting media upload');
    cliente.post('media/upload',
        { media: media },
        function (error, media, response) {
            if (!error) {
                console.log('media uploaded, starting tweet');
                var status = {
                    status: text,
                    media_ids: media.media_id_string
                }

                cliente.post('statuses/update', status, function (error, tweet, response) {
                    if (!error) {
                        console.log('tweet enviado', tweet.text)
                    }
                })
            } else {
                console.log('error posting: ', error)
            }
        })
}

//Exporta o cliente
module.exports = cliente;