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
            htmlOutput += ('<h3>Group Project #1 Technologies</h3>');
            htmlOutput += ('<p><strong>Role</strong>: Back End Logic</p>');
            htmlOutput += ('<p>HTML, CSS, Media Queries, Javascript, jQuery, Objects, Bootstrap, Materialize, Firebase, AJAX, JSON, YELP API, Open Weather Map API</p>');
            break;
    }

    $('#portfolioTechnology').html(htmlOutput);

});

$("#portfolioWrapper li").mouseout(function(){
    //$('#portfolioTechnology').empty();
    //$('#portfolioTechnology').css('background-color','transparent');
});