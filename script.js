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
    question: "In 1869, which territory was the first place in America to give women the right to vote?",
    answerA: "Puerto Rico",
    answerB: "New Mexico",
    answerC: "Utah",
    answerD: "Wyoming",
    correctAnswer: "d"
},
{
    question: "Who was the first female United States governor?",
    answerA: "Sarah Palin",
    answerB: "Kathie Lee Gifford",
    answerC: "Nellie Tayloe Ross",
    answerD: "Elizabeth Cady Stanton",
    correctAnswer: "c"
},
{
    question: "Congress designated March as Women’s History Month in what year?",
    answerA: "1991",
    answerB: "2016",
    answerC: "1987",
    answerD: "1953",
    correctAnswer: "c"
},
{
    question: "In 1974 the Equal Credit Opportunity Act (ECOA) allowed women to obtain their own _______?",
    answerA: "paychecks",
    answerB: "credit reports",
    answerC: "drivers licenses",
    answerD: "credit cards",
    correctAnswer: "d"
},
{   question: "Which civil rights activist earned the nickname 'the mother of the freedom movement'?",
    answerA: "Rosa Parks",
    answerB: "Patty Hearst",
    answerC: "Sojourner Truth",
    answerD: "Gloria Steinem",
    correctAnswer: "a"
},
{
    question: "Who was the first woman in space?",
    answerA: "Sally Ride",
    answerB: "Lt. Nyota Uhura",
    answerC: "Valentina Tereshkova",
    answerD: "Carrie Fisher",
    correctAnswer: "c"
},
{   question: "Which pioneer social worker founded the Hull House and won the Nobel Peace Prize?",
    answerA: "Eleanor Roosevelt",
    answerB: "Lady Bird Johnson",
    answerC: "Eleanor Summerfield",
    answerD: "Jane Addams",
    correctAnswer: "d"
},
{   question: "Who was the first American woman to win a major party’s nomination for president?",
    answerA: "Victoria Woodhull",
    answerB: "Hillary Clinton",
    answerC: "Susan B. Anthony",
    answerD: "Kamala Harris",
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
        // countdown sequence that subtracts elapsed time in 1000ms increments
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
        alert("You're so smart!");
        currentQuestionIndex++;
        pullQuizQuestion();
        // dialog box indicates that the answer is correct.
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        alert("Did you pick the wrong answer on purpose?")
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

