(function () { // Self-Invoking Function
    "use strict"; 

    log('javascript accessed');
    
    // Global Variables
    var wordList,totalGuesses,computerGuess,screenOutput,livesOutput,letterOutput,cannedMessages,guessesQueue,correctGuesses,userGuess,searchResult,letterInWord,lettersInWord,letterDuplicate,chosenOutput,hangmanImgOutput,totalWinsOutput,totalWins;

    function initalizeGame() {
        log('initalizeGame Start');
        // wordList = ["alpina","audi","bentley","bmw","citroen","dacia","ds","ferrari","fiat","ford","honda","hyundai","infiniti","jaguar","jeep","kia","lamborghini","lexus","lotus","maserati","mazda","mclaren","mercedes","mg","mini","mitsubishi","nissan","peugeot","porsche","renault","seat","skoda","smart","ssangyong","subaru","suzuki","tesla","toyota","vauxhall","volkswagen","volvo"];

        wordList = ["charming","enjoyable","tender","sensitive","powerful","surprising","imaginative","insightful","comical","uproarious","hilarious","riveting","fascinating","dazzling","legendary","clever","charismatic","original","absorbing","intriguing","pleasant","unpretentious","boring","disgusting","brutal","bloody","predictable","weak","uneven","dreadful","violent","flawed","distasteful","senseless","confused","silly","stupid","bland","moronic","juvenile","ordinary","static","disappointing","tired","uninteresting","trite","outdated","suspenseful","slow","sentimental","romantic","oddball","wacky","dramatic","fantasy","satirical","budget","charged"];

        guessesQueue = [];
        correctGuesses = [];

        totalGuesses = 12;

        cannedMessages = {
            win: "You Win",
            lose: "You Lose",
            duplicate: "You already chose that letter!",
            invalid: "You've clicked a non-alphabetical character!"
        }

        // Randomly chooses a choice from the options array. This is the Computer's guess.
        computerGuess = wordList[Math.floor(Math.random() * wordList.length)];
        log("computerGuess: " + computerGuess);

        // Places to display output
        screenOutput = document.getElementById("mainGameOutput");
        livesOutput = document.getElementById("mainLivesOutput");
        letterOutput = document.getElementById("mainLetterOutput");
        chosenOutput = document.getElementById("mainChosenOutput");
        hangmanImgOutput = document.getElementById("HangManRight");
        totalWinsOutput = document.getElementById("totalWinsValue");

        // Initial screen content
        livesOutput.innerHTML = 'You have '+ totalGuesses +' guesses remaining.';
        letterOutput.innerHTML = '';
        chosenOutput.innerHTML = '';

        // initialize correctGuesses array with underscores
        for (var i = 0; i < computerGuess.length; i++) {
            correctGuesses.push('_');
        }
        letterOutput.innerHTML = correctGuesses.join(' ');

    }
    function log(i) {
        // Created a console.log function so I could disable it from one location.
        console.log(i);
    }

    function isLetter(str) {
        // Uses Regular Expression to test for letter
        // Returns null if invalid
        return str.length === 1 && str.match(/[a-z]/i);
    }
    
    // EXAMPLE CALL: var indexes = getAllIndexes(Cars, "Nano");
    function getAllIndexes(arr, val) {
        var indexes = [], i = -1;
        while ((i = arr.indexOf(val, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    function updateHangmanImg(n) {
        log("updateHangmanImg: execution-"+n+".png")
        hangmanImgOutput.innerHTML = "<img src='assets/images/execution-"+n+".png' width='200px' alt='Hangman Stages' /> ";

    }

    function updateTotalGuesses() {
        totalGuesses--;
        livesOutput.innerHTML = 'You have '+ totalGuesses +' guesses remaining.';
        updateHangmanImg(totalGuesses);
    }

    function updateChosenOutput() {
        log("updateChosenOutput: " +guessesQueue.length);
        
        for (var i = 0; i < guessesQueue.length; i++) {
           chosenOutput.innerHTML = guessesQueue.join(' ').toUpperCase(); 
        }
    }

    function incramentWins() {
        log("incramentWins")
        totalWins = totalWinsOutput.innerHTML;
        totalWins++;
        totalWinsOutput.innerHTML = totalWins;
        
    }

    function endOfGame() {
        if (correctGuesses.indexOf('_') === -1) {
            log('You Won!');
            screenOutput.innerHTML = cannedMessages.win + "<br /><br /><img src='assets/images/Happy.gif' width='235px' alt='Jeremiah Johnson' /><br /><br />" + computerGuess;
            incramentWins();
            initalizeGame();
        } else if (totalGuesses === 0) {
            log('You Lost!');
            screenOutput.innerHTML = cannedMessages.lose + "<br /><br /><img src='assets/images/OhFudge.gif' width='235px' alt='Christmas Story' /><br /><br /> ";
            initalizeGame();
        }
      
    }
    
    // This function runs after each keyboard event
    document.onkeyup = function(event) {
        screenOutput.innerHTML = '';

        // Determines which key was pressed.
        userGuess = event.key.toLowerCase(); // User Guess
        searchResult =  isLetter(userGuess); // Is Guess alphabetical
        letterInWord = computerGuess.indexOf(userGuess); // Is Guess a match
        lettersInWord = getAllIndexes(computerGuess, userGuess);
        letterDuplicate = guessesQueue.indexOf(userGuess); // Is Guess a duplicate

        log("userGuess: " +userGuess+ " searchResult: " +searchResult+ " letterInWord: " +letterInWord+ " letterDuplicate: " +letterDuplicate+ " lettersInWord:|" +lettersInWord+"|");
        if (searchResult === null || userGuess === 'f5'|| userGuess === 'f12') {
            // Invalid Keyboard Input
            log("Input:invalid");
            screenOutput.innerHTML = cannedMessages.invalid;
        } else if (letterDuplicate !== -1){
            // Duplicate Keyboard Input
            log("Input:duplicate");
            screenOutput.innerHTML = cannedMessages.duplicate;
        }else if (lettersInWord.length > 0){
            log("Input:match");
            // inserts letter into guessesQueue array
            guessesQueue.push(userGuess);
            // inserts value into correct position of correctGuesses array
            for (var i = 0; i < lettersInWord.length; i++) {
                var val;
                val = lettersInWord[i];
                log("UpdateAllMatches " +i+ " Position:" +val);
                correctGuesses[val] = userGuess;            
            }
            // update letterOutput html content 
            letterOutput.innerHTML = correctGuesses.join(' ');
            updateChosenOutput();
        } else if (lettersInWord.length == 0) {
            log("Input:no-match " + lettersInWord);
            // inserts letter into guessesQueue array
            guessesQueue.push(userGuess);
            updateTotalGuesses();
            updateChosenOutput();
        }  else {
            log("Logic Missed");
        }

        endOfGame();
    };

    // Call InitializeGame after Page Load
    window.onload = initalizeGame();

   

})();