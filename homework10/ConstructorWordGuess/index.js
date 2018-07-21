// ## index.js: 
// The file containing the logic for the course of the game, which depends on Word.js and:

// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses
// https://www.npmjs.com/package/inquirer

const Word = require('./Word.js');
const inquirer = require('inquirer');

wordList = ["charming","enjoyable","tender","sensitive","powerful","surprising","imaginative","insightful","comical","uproarious","hilarious","riveting","fascinating","dazzling","legendary","clever","charismatic","original","absorbing","intriguing","pleasant","unpretentious","boring","disgusting","brutal","bloody","predictable","weak","uneven","dreadful","violent","flawed","distasteful","senseless","confused","silly","stupid","bland","moronic","juvenile","ordinary","static","disappointing","tired","uninteresting","trite","outdated","suspenseful","slow","sentimental","romantic","oddball","wacky","dramatic","fantasy","satirical","budget","charged"];

// computerGuess = wordList[Math.floor(Math.random() * wordList.length)];
function computerGuess(wordList){
    var index = Math.floor(Math.random() * wordList.length);
    return wordList[index];
}

const questions = [
    {
        name: 'letterGuessed',
        message: ' *** Guess a letter',
        validate: function (value) {
            var valid = (value.length === 1) && ('abcdefghijklmnopqrstuvwxyz'.indexOf(value.charAt(0).toLowerCase()) !== -1); 
            return valid || ' Please enter a single letter';
        },
        when: function () {
            return (!target.allGuessedOut() && guessesLeft > 0);
        }
    },
    {
        type: 'confirm', 
        name: 'playAgain',
        message: 'Play again?',
        when: function () {
            return (target.allGuessedOut() || guessesLeft <= 0);
        }
    }
];

function resetGame() {
    targetWord = computerGuess(wordList);
    console.log('\n ------------------------------');
    console.log(' -        Word Guess          -');
    console.log(' - *** MOVIE ADJECTIVES ***   -');
    console.log(' ------------------------------');
    console.log(' resetGame: '+targetWord);
    target = new Word(targetWord);
    target.makeGuess(' ');
    guesses = [];
    guessesLeft = 9;
}

function promptUser() {
    console.log('target.allGuessedOut():'+ target.allGuessedOut());
    if (!target.allGuessedOut() && guessesLeft > 0) {
        console.log('\n ' + target + '\n'); // Display the hidden/unmasked word
    }
    
    inquirer.prompt(questions).then(answers => {
        console.log('answers.playAgain ' + answers.playAgain);
        if ('playAgain' in answers && !answers.playAgain) {
            console.log(' Thanks for playing');
            process.exit();
        }
        if (answers.playAgain) {
            resetGame();
        }

        // hasOwnProperty returns boolean true if exists
        if (answers.hasOwnProperty('letterGuessed')) { 
            var currentGuess = answers.letterGuessed.toLowerCase();
            
            if (guesses.indexOf(currentGuess) === -1) {
                guesses.push(currentGuess);
                target.makeGuess(currentGuess);
                if (targetWord.toLowerCase().indexOf(currentGuess.toLowerCase()) === -1) {
                    guessesLeft--;
                }
            } else {
                console.log(" ** Oops ** You've already guessed: ", currentGuess);
            }
        }

        if (!target.allGuessedOut()) {
            if (guessesLeft === 0) {
                console.log(" You're Out of Guesses!");
                console.log(' '+targetWord.toUpperCase(), 'was the word!.');
            } else {
                console.log('\n Guesses so far: ', guesses.join(' '));
                console.log(' Guesses left: ', guessesLeft);
            }

        } else {
            console.log('\n '+targetWord.toUpperCase(), 'is correct! \n');
            // console.log("answers.playAgain: " +answers.playAgain);
        }

        promptUser();
    }); // end inquirer.then
}

resetGame();
promptUser();