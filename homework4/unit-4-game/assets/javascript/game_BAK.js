var computerNumber,userNumber,crystalOneVal,crystalTwoVal,crystalThreeVal,crystalFourVal,userWins,userLosses;

$(document).ready(function () {
    userWins = 0;     // User Wins
    userLosses = 0;   // User Losses
    $("#userWins").html(userWins);      // Display Wins to Screen
    $("#userLosses").html(userLosses);  // Display Losses to Screen

    initialize(); // Call initialize function to display interactive elements

    // When a Crystal Image is clicked - identify which one and perform calculation.
    $("#displayTiles").on("click", ".crystal-List", function() {
        var currentId = $(this).attr('id');
        log(currentId);
        performCalculation(currentId);
    });

// ********************************************
// ********   FUNCTION SECTION  ***************
// ********************************************

// Configure Interactive Elements
function initialize() {
    computerNumber = getRandomInt (19, 120);  // Number to match - between 19 and 120
    crystalOneVal = getRandomInt (1, 12);     // Crystal 1 value - between 1 and 12
    crystalTwoVal = getRandomInt (1, 12);     // Crystal 2 value - between 1 and 12
    crystalThreeVal = getRandomInt (1, 12);   // Crystal 3 value - between 1 and 12
    crystalFourVal = getRandomInt (1, 12);    // Crystal 4 value - between 1 and 12
    userNumber = 0;   // This variable is incremented based on Crystal value
    
    log("CompNum: " + computerNumber + " Crystal1: " + crystalOneVal + " Crystal2: " + crystalTwoVal + " Crystal3: " + crystalThreeVal + " Crystal4: " + crystalFourVal);

    $("#displayCompNum").html(computerNumber);
    $("#displayUserNum").html(userNumber);
      
    // Create 4 Crystal Icon Containers: Class and ID
    $("#displayTiles").empty(); // Empty div for recurring initialize() calls
    for (var i=0; i<4; i++){
        var crystalLIST = $("<li>");
        crystalLIST.addClass("crystal-List");
        crystalLIST.attr("id","crystalImage_" + i);
        $("#displayTiles").append(crystalLIST);
    }
}

// Check results and display appropriate response.
function results(calc){
    log('function Results:: calc:'+ calc);
    var win = parseInt($("#userWins").html());
    var lose = parseInt($("#userLosses").html());

    $('.winIndicator').removeClass('active');
    $('.loseIndicator').removeClass('active');
        
    if (calc === computerNumber ){
        log('results: Win')
        win++;
        $('#userWins').html(win);
        $('.winIndicator').addClass('active');
        initialize();
    } else if (calc > computerNumber) {
        log('results: Lose')
        lose++;
        $('#userLosses').html(lose);
        $('.loseIndicator').addClass('active');
        initialize();
    } else {
        log('results: Pending')
    }
}

// Function to add chosen crystal value to current value
function performCalculation(currentId) {
    var calc = parseInt($("#displayUserNum").html());
    log('calc:'+ calc);

    switch (currentId){
        case "crystalImage_0":
            calc = calc + parseInt(crystalOneVal);
            break;
        case "crystalImage_1":
            calc = calc + parseInt(crystalTwoVal);
            break;
        case "crystalImage_2":
            calc = calc + parseInt(crystalThreeVal);
            break;
        case "crystalImage_3":
            calc = calc + parseInt(crystalFourVal);
            break;
    }
    log('performCalculation:' + calc)
    $("#displayUserNum").html(calc);
    results(calc); // call results to test Win-Lose-Continue condition 

}

// Function to get random number in a specific range.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function allows ability to disable console.log in one location.
function log(i) {
    console.log(i);
}

});



