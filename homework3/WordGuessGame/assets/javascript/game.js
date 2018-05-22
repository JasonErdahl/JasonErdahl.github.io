(function () { // Self-Invoking Function
    "use strict"; 

    log('javascript accessed');
    
    // Global Variables
    var wordList,totalGuesses,computerGuess,screenOutput,livesOutput,letterOutput,cannedMessages,guessesQueue,correctGuesses;

    function initalizeGame() {
        log('initalizeGame Start');
        wordList = ["alpina","audi","bentley","bmw","citroen","dacia","ds","ferrari","fiat","ford","honda","hyundai","infiniti","jaguar","jeep","kia","lamborghini","lexus","lotus","maserati","mazda","mclaren","mercedes","mg","mini","mitsubishi","nissan","peugeot","porsche","renault","seat","skoda","smart","ssangyong","subaru","suzuki","tesla","toyota","vauxhall","volkswagen","volvo"];

        guessesQueue = [];
        correctGuesses = [];

        totalGuesses = 12;

        cannedMessages = {
            win: "You Win",
            lose: "You Lose",
            duplicate: "You already chose that letter",
            invalid: "You've clicked a non-alphabetical character!"
        }

        // Randomly chooses a choice from the options array. This is the Computer's guess.
        computerGuess = wordList[Math.floor(Math.random() * wordList.length)];
        log("computerGuess: " + computerGuess);

        // Places to display output
        screenOutput = document.getElementById("mainGameOutput");
        livesOutput = document.getElementById("mainLivesOutput");
        letterOutput = document.getElementById("mainLetterOutput");

        // Initial screen content
        livesOutput.innerHTML = 'You have '+ totalGuesses +' guesses remaining.';
        screenOutput.innerHTML = '';
        letterOutput.innerHTML = '';

        // initialize correctGuesses array with underscores
        for (var i = 0; i < computerGuess.length; i++) {
            correctGuesses.push('_');
        }
        letterOutput.innerHTML = correctGuesses.join(' ');

    }

    // Call InitializeGame after Page Load
    window.onload = initalizeGame();

    // This function runs after each keyboard event
    document.onkeyup = function(event) {
        screenOutput.innerHTML = '';

        // Determines which key was pressed.
        var userGuess = event.key.toLowerCase(); // User Guess
        var searchResult =  isLetter(userGuess); // Is Guess alphabetical
        var letterInWord = computerGuess.indexOf(userGuess); // Is Guess a match
        var lettersInWord = getAllIndexes(computerGuess, userGuess);
        var letterDuplicate = guessesQueue.indexOf(userGuess); // Is Guess a duplicate

        log("userGuess: " +userGuess+ " searchResult: " +searchResult+ " letterInWord: " +letterInWord+ " letterDuplicate: " +letterDuplicate+ " letterInWord2: " +letterInWord2);
        if (searchResult === null) {
            // Invalid Keyboard Input
            log("Input:invalid");
            screenOutput.innerHTML = cannedMessages.invalid;
        } else if ((letterInWord !== '-1') && (letterDuplicate !== '-1' )){
            log("Input:valid/match/unique " + letterInWord);
            // inserts letter into guessesQueue array
            guessesQueue.push(userGuess);
            // inserts value into correct position of correctGuesses array
            correctGuesses[letterInWord] = userGuess;
            // update letterOutput html content 
            letterOutput.innerHTML = correctGuesses.join(' ');

        }  else if (letterInWord == '-1' && letterDuplicate != '-1' ){
            log("Input:valid/no-match/unique " + letterInWord);
            // inserts letter into guessesQueue array
            guessesQueue.push(userGuess);
            totalGuesses--;
            livesOutput.innerHTML = 'You have '+ totalGuesses +' guesses remaining.';
        }   else {
            log("Logic Missed");
        }
    };

    function log(i) {
        // Created a console.log function so I could disable it from one location.
        console.log(i);
    }

    function isLetter(str) {
        // Uses Regular Expression to test for letter
        // Returns null if invalid
        return str.length === 1 && str.match(/[a-z]/i);
    }
    
    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    // var indexes = getAllIndexes(Cars, "Nano");

})();