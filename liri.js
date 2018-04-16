require("dotenv").config();

console.log("this is argv[0] " + process.argv[0]);
console.log("this is argv[1] " + process.argv[1]);
console.log("this is argv[2] " + process.argv[2]);
// console.log("this is argv[3] " + process.argv[3]);

//Add the code required to import the keys.js file and store it in a variable.
// You should then be able to access your keys information like so
let keysData = require("./keys.js");
console.log("keys " + keysData.twitter.consumer_key);
console.log("keys " + keysData.twitter.consumer_secret);
console.log("keys " + keysData.twitter.access_token_key);
console.log("keys " + keysData.twitter.access_token_secret);

console.log("keys " + keysData.spotify.id);
console.log("keys " + keysData.spotify.secret);

// const keySpotify = new Spotify(keys.spotify);
// const keyClient = new Twitter(keys.twitter);

// console.log(keySpotify);
// console.log(keyClient);

const action = process.argv[2];


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
    console.log("tweets function");
}

function spotify() {
    console.log("spotify function");
}

function movie() {
    console.log("movie");
}

function doWhat() {
    console.log("do-what function");
}
