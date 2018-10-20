$("#portfolioWrapper li").mouseenter(function(){
    var currentID = this.id;
    var htmlOutput = '';
    console.log(currentID);
    $('#portfolioTechnology').css('background-color','#4aaaa5');

    switch (currentID){
        case "techWordGuess":
            htmlOutput += ('<h3>Word Guess Technologies</h3>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, Arrays, Objects, Google Fonts, Audio Effects</p>');
            break;
        case "techCrystals":
            htmlOutput += ('<h3>Crystals Technologies</h3>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Bootstrap</p>');
            break;
        case "techQuiz":
            htmlOutput += ('<h3>Quiz Technologies</h3>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Arrays, Objects, Counters</p>');
            break;
        case "techGifTastic":
            htmlOutput += ('<h3>GifTastic Technologies</h3>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Bootstrap, AJAX, JSON, giphy API</p>');
            break;
        case "techScheduler":
            htmlOutput += ('<h3>Scheduler Technologies</h3>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Bootstrap, Moment.js, Google Fonts, Firebase</p>');
            break;
        case "techGroupProject1":
            htmlOutput += ('<h3>The Beaten Path - Group Project 1</h3>');
            htmlOutput += ('<p>TEAM: Sabeen, Hamdi, Halle, Jason</p>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Objects, Bootstrap, Materialize, Firebase, AJAX, JSON, YELP API, Open Weather Map API</p>');
            break;
        case "techLIRI":
            htmlOutput += ('<h3>LIRI - Language Interpretation and Recognition Interface</h3>');
            htmlOutput += ('<p>Javascript, Node.js, NPM(request, dotenv, twitter, spotify), API(Twitter, Spotify, OMDB), JSON, Objects, Arrays, gitignore, package.json</p>');
            break;
        case "techNodeWordGuess":
            htmlOutput += ('<h3>Word Guess - Node.JS </h3>');
            htmlOutput += ('<p>Javascript, Node.js, NPM(request, inquirer), Constructors, Arrays, gitignore, package.json</p>');
            break;
        case "techNodeMySQLBeAmazon":
            htmlOutput += ('<h3>Be Amazon - Amazon-like storefront</h3>');
            htmlOutput += ('<p>Javascript, Node.js, mySQL, MAMP, NPM(request, inquirer, mysql), gitignore, package.json</p>');
            break;
        case "techNodeHerokuFriendFinder":
            htmlOutput += ('<h3>Find My Friend</h3>');
            htmlOutput += ('<p>Heroku, Express.js, Node.js, Require.js, NPM(request, inquirer, body-parser, path)</p>');
            break;
        case "techNodeHerokuEatDaBurger":
            htmlOutput += ('<h3>Eat Da Burger</h3>');
            htmlOutput += ('<p>Heroku, JawsDB, mySQL, Handlebars, Bootstrap, Express.js, Node.js, Require.js, NPM(body-parser, express, express-handlebars, mysql)</p>');
            break; 
        case "techNodeHerokuBurger2":
            htmlOutput += ('<h3>Burger 2: The Sequel</h3>');
            htmlOutput += ('<p>Heroku, JawsDB, mySQL, Sequelize, Handlebars, Bootstrap, Express.js, Node.js, Require.js, NPM(body-parser, dotenv, express, express-handlebars, mysql2, sequelize)</p>');
            break;
        case "techNodeHerokuProject2":
            htmlOutput += ('<h3>Wind Farm: Short Term Planner - Group Project 2</h3>');
            htmlOutput += ('<p>TEAM: Jag, Paul, Anh, Jason</p><p>Heroku, JawsDB, mySQL, Sequelize, Handlebars, Bootstrap, Express.js, Node.js, Require.js, Open Weather Map API, NPM(body-parser, dotenv, express, express-handlebars, mysql2, sequelize, mocha, chai, lint, prettier)</p>');
            break;
        case "techNodeDiggScraper":
            htmlOutput += ('<h3>Digg Scraper</h3>');
            htmlOutput += ('<p>Heroku, mLab, MongoDB, Mongoose, Bootstrap, Express.js, Node.js, Require.js, NPM(axios, body-parser, cheerio, dotenv, express, mongoose, morgan)</p>');
            break;
        case "techReactClickyGame":
            htmlOutput += ('<h3>Clicky Game</h3>');
            htmlOutput += ('<p>React, JSX, ES6, NPM(react, react-dom, react-scripts)</p>');
            break;
        case "techReactBootConnect":
            htmlOutput += ('<h3>Boot Connect</h3>');
            htmlOutput += ('<p>TEAM: Anh, Sean, Lisa, Halle, Rachel, Jason, (Honorary)Louis</p><p>React, JSX, ES6, NPM(react, react-bootstrap, react-dom, react-router-dom, react-scripts, aws-sdk, axios, body-parser, dotenv, express, express-session, if-env, multer, mysql2, passport, passport-local, sequelize, axios, install, npm, node)</p>');

            break;
        default:  htmlOutput += ('<p style="color:red;">No Data</p>');
    }

    $('#portfolioTechnology').html(htmlOutput);

});

$("#portfolioWrapper li").mouseout(function(){
    //$('#portfolioTechnology').empty();
    //$('#portfolioTechnology').css('background-color','transparent');
});