/**
 * Created by fortunato on 03/12/16.
 */
module.exports = getTweets;

var tweetsService = require('../externalServices/tweetsService');

function getTweets(express_instance){

    express_instance.get('/tweets', (req, res) => {
        function respond(data) { res.send(data); }
        tweetsService.tweetsService('#'+req.query.hashtag, respond);
    })

}