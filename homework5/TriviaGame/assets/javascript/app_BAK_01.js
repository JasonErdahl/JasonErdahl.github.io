var quiz,totalQuestions,currentQuestionNUM,currentQuestionTxt,currentKey,currentQuestionNUMCount,buildElement;

$(document).ready(function () {

 quiz = {
        question1: {
            question:"What are you",
            answers: ['Human', 'Coder', 'Zombie', 'Other'],
            correctAnswer: 2,
        },
        question2: {
            question:"This is question 2",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 0,
        },
        question3: {
            question:"This is question 3",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 1,
        },
        question4: {
            question:"This is question 4",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 3,
        },
        question5: {
            question:"This is question 5",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 2,
        },
        question6: {
            question:"This is question 6",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 3,
        },
        question7: {
            question:"This is question 7",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 2,
        },
        question8: {
            question:"This is question 8",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 0,
        },
        question9: {
            question:"This is question 9",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 2,
        },
        question10: {
            question:"This is question 10",
            answers: ['This is an answer1', 'This is an answer2', 'This is an answer3', 'This is an answer4'],
            correctAnswer: 1,
        },

    };

log(quiz.question1.question);       // Get the question to question 1
log(quiz.question1.answers.length); // Get number of answers to question 1
log(quiz.question1.answers[0]);     // Get one of the possible answers
log(quiz.question10.correctAnswer); // get correct index of question 1
log(Object.keys(quiz).length);      // get number of questions
log(Object.keys(quiz)[0]);          // get first element of quiz
/*
<form>
<div class="quizQuestion">
  <p> What are you </p>
  <input type="radio" name="whoRU" value="0"> Human<br>
  <input type="radio" name="whoRU" value="1"> Coder<br>
  <input type="radio" name="whoRU" value="2"> Zombie<br>
  <input type="radio" name="whoRU" value="3"> Other
</div>
</form>
*/


    totalQuestions = Object.keys(quiz).length;
    currentQuestionNUM = 0;

    while (currentQuestionNUM < totalQuestions) {
        currentKey = Object.keys(quiz)[currentQuestionNUM];
        currentQuestionCount = quiz[currentKey].answers.length;
        currentQuestionTxt = quiz[currentKey].question;
        log('currentQuestionCountis: ' +currentQuestionCount);
        log('currentKey:'+currentKey+' currentQuestionCount:'+currentQuestionCount);

        var htmlElements = "";
        htmlElements += '<div class="quizQuestion" id='+ currentKey +'>';
        htmlElements += '<p>'+ (currentQuestionNUM+1) +' '+ currentQuestionTxt +'</p>';

        for (var i=0;i<currentQuestionCount;i++) {
            var currentAnswerTxt = quiz[currentKey].answers[i]
            htmlElements += '<input type="radio" name="'+currentKey+'" value="'+ i +'"> '+currentAnswerTxt+'<br>';
        }

        htmlElements += '</div>';

        $('#quizForm').append(htmlElements);
    currentQuestionNUM++;
    }

    // Function allows ability to disable console.log in one location.
    function log(i) {
        console.log(i);
    }


});