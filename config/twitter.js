var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

client.tweet = function (tweet) {
    console.log("tweet =", tweet);
    client.post('statuses/update', { status: tweet }, function (error, tweet, response) {
        if (error) console.log("error", error);
        else
            console.log("Tweet enviado.");
    });
}

client.uploadMediaAndTweet = function (media, text) {
    console.log('starting media upload');
    client.post('media/upload',
        { media: media },
        function (error, media, response) {
            if (!error) {
                console.log('media uploaded, starting tweet');
                var status = {
                    status: text,
                    media_ids: media.media_id_string
                }

                client.post('statuses/update', status, function (error, tweet, response) {
                    if (!error) {
                        console.log('tweet enviado', tweet.text)
                    }
                })
            } else {
                console.log('error posting: ', error)
            }
        })
}

//Exporta o client
module.exports = client;