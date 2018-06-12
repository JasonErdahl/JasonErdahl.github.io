var quiz,totalQuestions,currentQuestionNUM,currentQuestionTxt,currentKey,currentQuestionNUMCount,buildElement,currentQuestionCount,currentCorrectAnswer,currentCorrectText,counter, winCounter, loseCounter, timeOutCounter, refreshIntervalId,type;

$(document).ready(function () {

 quiz = {
        question1: {
            question:"How many herbs and spices in KFC chicken",
            answers: ['5', '7', '9', '11'],
            correctAnswer: 3,
        },
        question2: {
            question:"Where was the first potatoe found?",
            answers: ['In the ground', 'That is a trick question', 'In a fryer', 'In a potatoe cannon'],
            correctAnswer: 0,
        },
        question3: {
            question:"Which of the following is the lowest Prime",
            answers: ['11', '12', '7', '13'],
            correctAnswer: 2,
        },
        question4: {
            question:"What does the 'A' stand for in NATO",
            answers: ['Atlantic', 'Authority', 'American', 'Autonomous'],
            correctAnswer: 2,
        },
        question5: {
            question:"What blood type makes a person a 'universal' donor",
            answers: ['AB-', 'AB+', 'B+', 'O-'],
            correctAnswer: 3,
        },
        question6: {
            question:"What is halitosis",
            answers: ['Enlarged Gums', 'Rare type of cancer', 'Skin condition', 'Bad Breath'],
            correctAnswer: 3,
        },
        question7: {
            question:"How many years are in a score",
            answers: ['20', '10', '50', '40'],
            correctAnswer: 0,
        },
        question8: {
            question:"What year did the Titanic sink",
            answers: ['1908', '1912', '1916', '1918'],
            correctAnswer: 1,
        },
        question9: {
            question:"How may gods are currently worshipped on earth (approx.)",
            answers: ['1', '100', '100,000', '320,000,000'],
            correctAnswer: 3,
        },
        question10: {
            question:"The best Full Stack bootcamp cohort",
            answers: ['Cohort 2', 'Cohort 3', 'Cohort 4', 'Cohort 5'],
            correctAnswer: 3,
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
        clearInterval(refreshIntervalId);
        $("#count").text("");
    }
    
    function runCounter(i, type) {
        log('runCounter type:' +type);
        reset();
        counter = i;

        if (type == 'testResponse') {
            log('runCounter: testResponse')

                refreshIntervalId = setInterval(function() {
                    counter--;
                    if (counter >= 0) {
                    span = document.getElementById("count");
                    span.innerHTML = counter;
                    }
                    // Display 'counter' wherever you want to display it.
                    if (counter === 0) {
                        log('this is where it happens');
                        log('runCounter: testResponse')
                        var countDone ='INVALID'
                        testResponse(countDone, currentCorrectAnswer,currentCorrectText);
                        clearInterval(refreshIntervalId);
                    }
                
                }, 1000);

        } else if (type == 'callNewQuestion') {

            log('runCounter: callNewQuestion')
                refreshIntervalId = setInterval(function() {
                    counter--;
                    if (counter >= 0) {
                        span = document.getElementById("count");
                        span.innerHTML = counter;
                    }
                    // Display 'counter' wherever you want to display it.
                    if (counter === 0) {
                        log('this is where it happens');
                        log('runCounter: callNewQuestion')
                        callNewQuestion();
                        clearInterval(refreshIntervalId);
                    }
                
                }, 1000);

        }
        
        
    }

    function testResponse(currentId, currentCorrectAnswer,currentCorrectText) {
        log('testResponse- currentId: ' +currentId+ ' currentCorrectAnswer: ' +currentCorrectAnswer+ ' currentCorrectText: ' +currentCorrectText);
        type = 'callNewQuestion';
        runCounter(15, type);
        htmlElements = '';

        if (currentQuestionNUM == totalQuestions) {
            htmlElements += '<div class="responseOutput txtKhaki txtCenter">';
            htmlElements += "<h1>The Quiz Is Complete</h1>";
            htmlElements += "<h2>Hope you enjoyed yourself!</h2>";
            htmlElements += '</div>';
            $('#startBTN').addClass('hidden');
        }

        if (currentId === 'INVALID') {
            htmlElements += '<div class="responseOutput txtKhaki txtCenter">';
            htmlElements += "<h1>Time Ran Out</h1>";
            htmlElements += "<h2>The correct Answer was: '"+currentCorrectText+"'</h2>";
            htmlElements += '</div>';
            timeOutCounter++;
        } else if (currentId == currentCorrectAnswer) {
            htmlElements += '<div class="responseOutput txtKhaki txtCenter">';
            htmlElements += "<h1>Great Job</h1>";
            htmlElements += "<h2>'"+currentCorrectText+"' was the correct answer</h2>";
            htmlElements += '</div>';
            winCounter++;
        } else  if (currentId !== currentCorrectAnswer){
            htmlElements += '<div class="responseOutput txtKhaki txtCenter">';
            htmlElements += "<h1>Nice Try: See below! </h1>";
            htmlElements += "<h2>'"+currentCorrectText+"' was the correct answer</h2>";
            htmlElements += '</div>';
            loseCounter++;
        }

        htmlElements += '<div class="scoreOutput txtKhaki txtCenter"><ul>';
        htmlElements += '<li>Correct: '+winCounter+'</li>';
        htmlElements += '<li>Incorrect: '+loseCounter+'</li>';
        htmlElements += '<li>Time Out: '+timeOutCounter+'</li>';
        htmlElements += '<li><p><button type="button" id="startBTN" class="btn btn-primary btn-lg">Next Question</button></p></li>';
        htmlElements += '</ul></div>';

                        
        $('#mainContentQUIZ').html(htmlElements);

        if (currentQuestionNUM == totalQuestions) {
            $('#startBTN').addClass('hidden');
            reset();
        }
        
        // When a Quiz Answer is clicked - identify which one and call testResponse()
        $('#startBTN').click(function(){
            callNewQuestion();
        });
    }

    function callNewQuestion() {
        totalQuestions = Object.keys(quiz).length;

        if (currentQuestionNUM < totalQuestions) {
            type = 'testResponse';
            runCounter(20,type);
            currentKey = Object.keys(quiz)[currentQuestionNUM];
            currentQuestionCount = quiz[currentKey].answers.length;
            currentQuestionTxt = quiz[currentKey].question;
            currentCorrectAnswer = quiz[currentKey].correctAnswer;
            currentCorrectText = quiz[currentKey].answers[currentCorrectAnswer];

            log('currentKey: '+currentKey+' currentQuestionCount: '+currentQuestionCount+' currentQuestionTxt: '+currentQuestionTxt+' currentCorrectAnswer: '+currentCorrectAnswer+' currentCorrectText: '+currentCorrectText);

            var htmlElements = "";
            htmlElements += '<form id="quizForm">';
            htmlElements += '<div class="quizQuestion txtKhaki" id='+ currentKey +'>';
            htmlElements += '<p class="txtSize1_6 txtKhaki">'+ (currentQuestionNUM+1) +' '+ currentQuestionTxt +'</p>';

            for (var i=0;i<currentQuestionCount;i++) {
                var currentAnswerTxt = quiz[currentKey].answers[i]
                //htmlElements += '<input type="radio" name="'+currentKey+'" value="'+ i +'"> '+currentAnswerTxt+'<br>';
                htmlElements += '<div class="questionButtons '+currentKey+' txtCenter txtSize2_0" value="'+ i +'"><p class="txtKhaki">'+currentAnswerTxt+'</p></div>';
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
            log('No more questions');
        }
    }

    function initialize() {
        var random = Math.floor(Math.random() * 5) + 1;
        htmlElements = '';
        htmlElements += '<div class="initialize">';
        htmlElements += "<h1>It's Quiz Time</h1>";
        htmlElements += "<h2>Quiz Theme: ** Random Facts **</h2>";
        htmlElements += "<h3>Do your best: For some reason these questions just caught my attention.</h3>";
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