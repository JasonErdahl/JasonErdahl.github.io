// ## Word.js: 
// Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. 
// This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)

const Letter = require('./Letter.js'); // Using var led to a TypeError

function Word(wordString) {

    this.letterArray = [];

    wordString.split('').forEach(element => {
        this.letterArray.push(new Letter(element));
    });

    this.toString = function() {
        return this.letterArray.join(' ');
    };

    this.makeGuess = function(guessedLetter) {
        this.letterArray.forEach(element => {
            element.makeGuess(guessedLetter);
        });
    };

    this.allGuessedOut = function() {
        return this.letterArray.every((currentValue) => currentValue.guessed);
    };
}

module.exports = Word;