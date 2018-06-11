var quiz,totalQuestions,currentQuestionNUM,currentQuestionTxt,currentKey,currentQuestionNUMCount,buildElement,currentQuestionCount,currentCorrectAnswer,currentCorrectText,counter, winCounter, loseCounter, timeOutCounter;

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
/*
log(quiz.question1.question);       // Get the question to question 1
log(quiz.question1.answers.length); // Get number of answers to question 1
log(quiz.question1.answers[0]);     // Get one of the possible answers
log(quiz.question10.correctAnswer); // get correct index of question 1
log(Object.keys(quiz).length);      // get number of questions
log(Object.keys(quiz)[0]);          // get first element of quiz
*/
    winCounter = 0;
    loseCounter = 0;
    timeOutCounter = 0;
    currentQuestionNUM = 0;
    initialize();

    $("#startBTN").click(function() {
        callNewQuestion();
        $('#headerNavigation h1').removeClass('hidden');
    });



    function reset() {
        counter = 0;
        $("#count").text("00");
    }
    
    function runCounter(i) {

        counter = i;
        
        setInterval(function() {
            counter--;
            if (counter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = counter;
            }
            // Display 'counter' wherever you want to display it.
            if (counter === 0) {
                log('this is where it happens');
                var countDone ='INVALID'
                testResponse(countDone, currentCorrectAnswer,currentCorrectText);
                clearInterval(counter);
            }
        
        }, 1000);
    }

    function testResponse(currentId, currentCorrectAnswer,currentCorrectText) {
        log('testResponse- currentId: ' +currentId+ ' currentCorrectAnswer: ' +currentCorrectAnswer+ ' currentCorrectText: ' +currentCorrectText);
        // runCounter(20);
        htmlElements = '';

        if (currentId === 'INVALID') {
            htmlElements += '<div class="responseOutput">';
            htmlElements += "<h1>Time Ran Out</h1>";
            htmlElements += "<h2>The correct Answer was: "+currentCorrectText+"</h2>";
            htmlElements += '</div>';
            timeOutCounter++;
        } else if (currentId === currentCorrectAnswer) {
            htmlElements += '<div class="responseOutput">';
            htmlElements += "<h1>Great Job</h1>";
            htmlElements += "<h2>"+currentCorrectText+" was the correct answer</h2>";
            htmlElements += '</div>';
            winCounter++;
        } else {
            htmlElements += '<div class="responseOutput">';
            htmlElements += "<h1>Nice Try: See below! </h1>";
            htmlElements += "<h2>"+currentCorrectText+" was the correct answer</h2>";
            htmlElements += '</div>';
            loseCounter++;
        }

        htmlElements += '<div class="scoreOutput"><ul>';
        htmlElements += '<li>Correct: '+winCounter+'</li>';
        htmlElements += '<li>Incorrect: '+loseCounter+'</li>';
        htmlElements += '<li>Time Out: '+timeOutCounter+'</li>';
        htmlElements += '</ul></div>';

                        
        $('#mainContentQUIZ').html(htmlElements);
    }

    function callNewQuestion() {
        totalQuestions = Object.keys(quiz).length;

        if (currentQuestionNUM < totalQuestions) {
            runCounter(10);
            currentKey = Object.keys(quiz)[currentQuestionNUM];
            currentQuestionCount = quiz[currentKey].answers.length;
            currentQuestionTxt = quiz[currentKey].question;
            currentCorrectAnswer = quiz[currentKey].correctAnswer;
            currentCorrectText = quiz[currentKey].answers[currentCorrectAnswer];

            log('currentKey: '+currentKey+' currentQuestionCount: '+currentQuestionCount+' currentQuestionTxt: '+currentQuestionTxt+' currentCorrectAnswer: '+currentCorrectAnswer+' currentCorrectText: '+currentCorrectText);

            var htmlElements = "";
            htmlElements += '<form id="quizForm">';
            htmlElements += '<div class="quizQuestion" id='+ currentKey +'>';
            htmlElements += '<p class="txtSize1_6">'+ (currentQuestionNUM+1) +' '+ currentQuestionTxt +'</p>';

            for (var i=0;i<currentQuestionCount;i++) {
                var currentAnswerTxt = quiz[currentKey].answers[i]
                //htmlElements += '<input type="radio" name="'+currentKey+'" value="'+ i +'"> '+currentAnswerTxt+'<br>';
                htmlElements += '<div class="questionButtons '+currentKey+' txtCenter txtWhite txtSize2_0" value="'+ i +'"><p>'+currentAnswerTxt+'</p></div>';
            }

            htmlElements += '</div>';
            htmlElements += '</form>';

            $('#mainContentQUIZ').html(htmlElements);
            currentQuestionNUM++;

            // When a Quiz Answer is clicked - identify which one and call testResponse()
            $("#quizForm").on("click", ".questionButtons", function() {
                var currentId = $(this).attr('value');
                log('currentId: ' + currentId);
                testResponse(currentId, currentCorrectAnswer,currentCorrectText);
            });

        } else {
            log('No more questions')
        }
    }

    function initialize() {
        var random = Math.floor(Math.random() * 5) + 1;
        htmlElements = '';
        htmlElements += '<div class="initialize">';
        htmlElements += "<h1>It's Quiz Time</h1>";
        htmlElements += "<h2>Quiz Theme: NO IDEA!!!!!!</h2>";
        htmlElements += "<h3>Do your best</h3>";
        htmlElements += '<p><button type="button" id="startBTN" class="btn btn-primary btn-lg">Start Quiz</button></p>';
        htmlElements += '<img src="assets/images/Intro'+random+'.jpg">';
        htmlElements += '</div>';
                        
        $('#mainContentQUIZ').html(htmlElements);
    }

    // Function allows ability to disable console.log in one location.
    function log(i) {
        console.log(i);
    }


});