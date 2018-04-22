require("dotenv").config();

const NodeTwitter = require('twitter');
const NodeSpotify = require('node-spotify-api');
const NodeRequest = require('request');
const keysData = require("./keys.js");
const Omdb = require('omdb');
const request = require('request');
const fs = require("fs");

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

let action = process.argv[2];

let songName = "The Sign";
let movieName = "Mr. Nobody";

if(process.argv[3] != null) {
    songName = process.argv[3];
    movieName = process.argv[3];
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
    request('http://www.omdbapi.com/?t=' + movieName + '&apikey=4b988a5c', function(error, response, body) {   
        if(error === null && response.statusCode === 200) {
            console.log("Movie Title: " + JSON.parse(body).Title + "\nYear: " + JSON.parse(body).Year + "\nIMDB Rating: " + JSON.parse(body).imdbRating + 
            "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\nCountry: " + JSON.parse(body).Country + 
            "\nLanguage: " + JSON.parse(body).Language + "\nPlot: " + JSON.parse(body).Plot + "\nActors: " + JSON.parse(body).Actors);
        } else {
            return console.log("error " + error);
        }
    });
}

function doWhat() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if(err) {
            return console.log("Error: " + err);
        } else {
            let doWhatArray = data.split(',')
            process.argv[2] = doWhatArray[0];
            songName = doWhatArray[1];
            spotify();
        }
    });
}