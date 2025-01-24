// HTML variable elements
var optionA = document.getElementById("a");
var optionB = document.getElementById("b");
var optionC = document.getElementById("c");
var optionD = document.getElementById("d");
var startButton = document.getElementById("startbtn");
var endGameBtns = document.getElementById("endGameBtns");
var saveScoreBtn = document.getElementById("saveScore");
var quizBody = document.getElementById("quiz");
var gameTimer = document.getElementById("timer");
var resultsEl = document.getElementById("result");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var questionsEl = document.getElementById("questions");
var startQuizDiv = document.getElementById("high-scorePage");
var highScoresContainer = document.getElementById("highScoresContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var highscoreDisplayScore = document.getElementById("highscore-score");



// Question Array
var quizQuestions = [{
    question: "To select a class attribute, which prefix needs to be added to the class name?",
    answerA: "()",
    answerB: "''",
    answerC: "!",
    answerD: ".",
    correctAnswer: "d"
},
{
    question: "Which is an anonymous function?",
    answerA: "addEventListener",
    answerB: "alert()",
    answerC: "function()",
    answerD: "Trolling social media using a fictitious name",
    correctAnswer: "b"
},
{
    question: "What method is used to append an item to a list?",
    answerA: "appendItem()",
    answerB: "appendChild()",
    answerC: "li",
    answerD: "textContent",
    correctAnswer: "b"
},
{
    question: "Which Web API does JavaScript have access to through the browser?",
    answerA: "Webkit",
    answerB: "Chrome DevTools",
    answerC: "DOM",
    answerD: "ERP",
    correctAnswer: "c"
},
{   question: "Which statement can be read as 'on a button click, create a task'?",
    answerA: "('click', createTaskHandler)",
    answerB: "On click",
    answerC: "createTaskHandler = function",
    answerD: "buttonEl",
    correctAnswer: "a"
},
{
    question: "In context of an application programming interface, What does DOM stand for?",
    answerA: "Distributed Output Management",
    answerB: "Declared Objective Material",
    answerC: "Document Object Model",
    answerD: "Dissolved Organic Matter",
    correctAnswer: "c"
},
{   question: "How can default browser behavior be overridden?",
    answerA: "Ctrl + Alt + Del",
    answerB: "event.preventDefault()",
    answerC: "git checkout -b",
    answerD: "querySelector()",
    correctAnswer: "b"
},
{    question: "What method can web developers use to inconspicuously test code?",
    answerA: "jQuery",
    answerB: "console.log",
    answerC: ".click(function()",
    answerD: "AJAX",
    correctAnswer: "b"
},
];

// global variables
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var renderTimer = 90;
var timerInterval;
var score = 0;
var correct;
var savedHighscores =[];


// pullQuizQuestion indexes the question array.
function pullQuizQuestion() {
   
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    optionA.innerHTML = currentQuestion.answerA;
    optionB.innerHTML = currentQuestion.answerB;
    optionC.innerHTML = currentQuestion.answerC;
    optionD.innerHTML = currentQuestion.answerD;
};


// startQuiz function initiates the countdown and pullQuizQuestion function
function startQuiz() {
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    pullQuizQuestion();


    //Timer function subtracts elapsed time from 90 second global variable 
    timerInterval = setInterval(function () {
        // countdown sequence that subracts elapsed time in 1000ms increments
        renderTimer--;
        gameTimer.textContent = "Time remaining: " + renderTimer;

           // when countdown reaches zero the timer is cleared and initiates score calculation
        if (renderTimer <= 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizBody.style.display = "block";

    
}
// gameover page displays score after all questions have been answered or if timer runs out
function showScore() {
    quizBody.style.display = "none"
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputName.value = "";
    finalScoreEl.innerHTML = "You answered " + score + " out of " + quizQuestions.length + " correctly!";
}


// Save Score button saves and stringifies the array of high scores in local storage then adds player's initials and score into local storage to be displayed in the high score's container.
saveScoreBtn.addEventListener("click", function highscore() {




    if (highscoreInputName.value === "") {
        alert("ENTER YOUR INITIALS. NOW!");
        return false;
    } else {
        // saves score and commits to local storage
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };

         // pulls previous high scores 
         savedHighscores.push(currentHighscore);
         localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
         savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
         renderHighscores();
 
        // high score container
        gameoverDiv.style.display = "none";
        highScoresContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtns.style.display = "flex";

        // pulls high scores to display in high score container
       savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
        
    }
});


//  clears high scores and renders new list from local storage
function renderHighscores() {
    highscoreDisplayName.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplayName.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}


// displays high scores page and removes the other HTML elements 
function displayHighScores() {
    startQuizDiv.style.display = "none"
    gameoverDiv.style.display = "none";
    highScoresContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtns.style.display = "flex";


    renderHighscores();
}


// clears scores and initials from high score board
function clearScore() {
    window.localStorage.clear();
    highscoreDisplayName.textContent = "";
    highscoreDisplayScore.textContent = "";
}


// resets variables to original values and allows the player to start the quiz over.
function replayQuiz() {
    highScoresContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    renderTimer = 90;
    score = 0;
    currentQuestionIndex = 0;
}


// verifies each answer 
function verifyAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;


    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        alert("Solid work!");
        currentQuestionIndex++;
        pullQuizQuestion();
        // dialog box indicates that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Study harder!")
        currentQuestionIndex++;
        renderTimer -= 10;
        pullQuizQuestion();
      // dialog box indicates that the answer is wrong.
    } else {
        showScore();
    }
}


// restarts the quiz
startButton.addEventListener("click", startQuiz);

