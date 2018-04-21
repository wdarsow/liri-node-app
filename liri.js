require("dotenv").config();

const NodeTwitter = require('twitter');
const NodeSpotify = require('node-spotify-api');
const NodeRequest = require('request');
const keysData = require("./keys.js");
const fs = require("fs");
// fs.writeFile("movies.txt", JSON.parse(tweets));

const twitterClient = new NodeTwitter ({
    consumer_key: keysData.twitter.consumer_key,
    consumer_secret: keysData.twitter.consumer_secret,
    access_token_key: keysData.twitter.access_token_key,
    access_token_secret: keysData.twitter.access_token_secret
});
 
let spotifyVar = new NodeSpotify({
  id: keysData.spotify.id,
  secret: keysData.spotify.secret
});


const action = process.argv[2];

let songName = "The Sign";

if(process.argv[3] != null) {
    songName = process.argv[3];
}



switch(action) {
    case "my-tweets":
        tweets();
        return;
    
    case "spotify-this-song":
        spotify();
        return;

    case "movie-this":
        movie();
        return;

    case "do-what-it-says":
        doWhat();
        return;
}

function tweets() {
    let screenName = {screen_name: 'wade_node_js'};

    twitterClient.get('statuses/user_timeline', screenName, function(error, tweets, response) {
        if(error) throw error;

        for(i = 0; i < 20; i++) {
            console.log(tweets[i].text + " " + tweets[i].created_at);
        }
 });
    console.log("tweets function");
}

function spotify() {

    spotifyVar.search({ type: 'track', query: songName, limit: 1 })
    .then(function(response) {
    
    console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name);
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Song Preview Link: " + response.tracks.items[0].preview_url);
    console.log("Album Name: " + response.tracks.items[0].album.name);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movie() {
    console.log("movie");
}

function doWhat() {
    console.log("do-what function");
}

