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
/*
log(quiz.question1.question);       // Get the question to question 1
log(quiz.question1.answers.length); // Get number of answers to question 1
log(quiz.question1.answers[0]);     // Get one of the possible answers
log(quiz.question10.correctAnswer); // get correct index of question 1
log(Object.keys(quiz).length);      // get number of questions
log(Object.keys(quiz)[0]);          // get first element of quiz
*/
    currentQuestionNUM = 0;
    initialize();


    // When a Crystal Image is clicked - identify which one and call performCalculation()
    $("#displayTiles").on("click", ".crystal-List", function() {
        var currentId = $(this).attr('id');
        log(currentId);

    });

    $("#startBTN").click(function() {
        callNewQuestion();
        $('#headerNavigation h1').removeClass('hidden');
    });
    
    function runCounter(i) {
        var counter = i;
        
        setInterval(function() {
            counter--;
            if (counter >= 0) {
            span = document.getElementById("count");
            span.innerHTML = counter;
            }
            // Display 'counter' wherever you want to display it.
            if (counter === 0) {
                //alert('this is where it happens');
                callNewQuestion();
                clearInterval(counter);
            }
        
        }, 1000);
    }


    function callNewQuestion() {
        totalQuestions = Object.keys(quiz).length;
        //currentQuestionNUM = 0;

        

        if (currentQuestionNUM < totalQuestions) {
            // runCounter(10);
            currentKey = Object.keys(quiz)[currentQuestionNUM];
            currentQuestionCount = quiz[currentKey].answers.length;
            currentQuestionTxt = quiz[currentKey].question;
            log('currentQuestionCountis: ' +currentQuestionCount);
            log('currentKey:'+currentKey+' currentQuestionCount:'+currentQuestionCount);

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