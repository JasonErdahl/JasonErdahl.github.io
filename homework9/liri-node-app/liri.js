require("dotenv").config(); // MUST BE AT TOP
var request = require("request");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require("./keys.js");

// INSTRUCTIONS:
// RUN: npm install request
//      npm install dotenv
//      npm install twitter
//      npm install --save node-spotify-api
// INPUTS
//      my-tweets
//      spotify-this-song
//      movie-this
//      do-what-it-says

var fileName = process.argv[1];
var action = process.argv[2];
//var value = process.argv[3];
var value = valueStringify('plus'); // get multi-word input and join with plus sign for API use.

callLIRI(action,value);

// We will then create a switch-case statement.
// The switch-case will direct which function gets run.
function callLIRI (action,value) {
    switch (action) {
        case "my-tweets":
        addToLog(fileName,action,value);
        myTweets();
        break;

        case "spotify-this-song":
        addToLog(fileName,action,value);
        spotifyThisSong(value);
        break;

        case "movie-this":
        addToLog(fileName,action,value);
        movieThis(value);
        break;

        case "do-what-it-says":
        addToLog(fileName,action,value);
        doWhatItSays();
        break;

        default: addToLog(fileName,action,value);
    }
}

// If the "myTweets" function is called...
// node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// URL: https://apps.twitter.com/
// URL: https://www.npmjs.com/package/twitter
function myTweets() {
    log(" * myTweets * ");
    var client = new Twitter(keys.twitter);
    // Then run a request to the myTweets API
    client.get('statuses/user_timeline', function(error, tweets, response) {

        if (error) {log(error)} else {
            var currentTweet,currentDate;
            var tweetLength = tweets.length;
            var init = JSON.stringify(tweets);

            for (var i = 0; i < tweetLength; i++) {
                currentTweet = JSON.stringify(tweets[i].text);
                currentDate = JSON.stringify(tweets[i].created_at);
                log('Tweet'+(i+1)+': '+currentTweet+''+currentDate);
                log(" * -------------------------- * ");
            }
        }
    });
}

// If the "spotifyThisSong" function is called...
// node liri.js spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
// If no song is provided then your program will default to "The Sign" by Ace of Base.
// URL: https://www.npmjs.com/package/node-spotify-api
function spotifyThisSong(value) {
    log(" * spotifyThisSong * ");
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
            return log('Error occurred: ' + err);
        }
        //log(data); 
        var init = data.tracks.items;
        var lengthSpotify = init.length; 
        var totalSpotify = data.tracks.total;

        if (totalSpotify > 0) {
            for (var i = 0; i < lengthSpotify; i++) {
                var artistsSpotify = JSON.stringify(init[i].artists[0].name);
                var songSpotify = JSON.stringify(init[i].name);
                var linkSpotify = JSON.stringify(init[i].external_urls.spotify);
                var albumSpotify = JSON.stringify(init[i].album.name);

                log(" * Artist(s): "+artistsSpotify);
                log(" * The song's name: "+songSpotify);
                log(" * Preview link: " +linkSpotify);
                log(" * The album's name: " +albumSpotify);

                log(" * -------------------------- * ");
            }

        } else {
            spotifyThisSong('The Sign Ace of Base');
        }
    });
}

// If the "movieThis" function is called
// node liri.js movie-this '<movie name here>'
// This will output the following information to your terminal/bash window:
// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
function movieThis(value) {
    log(" * movieThis * ");
    //log("valueArray: "+valueStringify());
    // Then run a request to the OMDB API with the movie specified
    request("http://www.omdbapi.com/?t="+value+"&y=&plot=short&apikey=trilogy", function(error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            var init = JSON.parse(body);
            var response = init.Response;

            if (response === 'True'){           
                var title = init.Title;
                var year = init.Year;
                var imdbRating = init.imdbRating;
                var rottenRatings = init.Ratings[1].Value;
                var country = init.Country;
                var language = init.Language;
                var plot = init.Plot;
                var actors = init.Actors;

                log(" * Title of the movie: "+title);
                log(" * Year the movie came out: "+year);
                log(" * IMDB Rating of the movie: "+imdbRating);
                log(" * Rotten Tomatoes Rating of the movie: "+rottenRatings);
                log(" * Country where the movie was produced: "+country);
                log(" * Language of the movie: "+language);
                log(" * Plot of the movie: "+plot);
                log(" * Actors in the movie: "+actors);
            } else if (response === 'False') {
                movieThis('Mr. Nobody');
            }

        }
    });

}


// If the "doWhatItSays" function is called
// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.
function doWhatItSays() {
    log(" * doWhatItSays * ");

    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return log(err);
        }
        //log(data);

        // Then split it by commas (to make it more readable)

        var dataArr = data.split(",");
        var liriOperation = dataArr[0];
        var liriValue = dataArr[1];
        // We will then re-display the content as an array for later use.
        // console.log('dataArr: '+dataArr);
        // console.log('liriOperation: '+liriOperation);
        // console.log('liriValue: '+liriValue);
        callLIRI (liriOperation,liriValue)

    });
 
}

// BONUS
// If the "addToLog" function is called
// In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
// Make sure you append each command you run to the log.txt file. 
// Do not overwrite your file each time you run a command.
function addToLog(fileName,action,value) {
    // log(" *addToLog* ");
    var fileNameOnly = fileName.split("\\").pop();
    var currentDate = new Date(),
        day = currentDate.getDate(),
        month = currentDate.getMonth() + 1,
        year = currentDate.getFullYear(),
        hours = ('0'+currentDate.getHours()).substr(-2); //shows leading zero if single value
        minutes = ('0'+currentDate.getMinutes()).substr(-2); //shows leading zero if single value

    var timeStamp = (month + "/" + day + "/" + year +" "+ hours + ":" + minutes);
    var bashCommand = ("node "+fileNameOnly+" "+action+" "+value+" "+timeStamp+"\n");
    fs.appendFile("log.txt", bashCommand, function(err) {
        if (err) {
            return log(err);
        }
    });
}

function valueStringify(operation) {
    // Take in all command line arguments
    var nodeArgs = process.argv;

    // Create an empty string for holding the address
    var value = "";

    // Capture all the words in the address (ignoring the first three Node arguments)
    for (var i = 3; i < nodeArgs.length; i++) {
        // Build a string with the address.
        value = value + " " + nodeArgs[i];
    }
    if (operation === "plus") {
        value = value.trim().split(' ').join('+'); 
    } else if (operation === "comma") {
        value = value.trim().split(' ').join(','); 
    }

    return value;
}

function log(val) {
    console.log(val);
}
