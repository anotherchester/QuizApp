// questions & answers
// console.log("script.js is connected")
const STORE = {
    view: "start",
    currentQuestion: 0,
    score: 0,
    questionText:"Question Text",
    options: [],
    selectedAnswerIndex: "",
    answerResponse: "In/Correct!",
    displayCorrectAnswer: "",
    
    
}
const questions = [
    {
      text: "When was the first Godzilla movie released?",
      options: [ 
          "1949",
          "1954",
          "1962",
          "1970"
        ],
      indexOfAnswer: 1,
      answerText: "1954",
    },

    {
        text: "What is Godzilla's signature weapon?",
        options: [
            "Atomic breath",
            "Laser eye-beams",
            "Electric tail",
            "Ultrasonic wave",
        ],
        indexOfAnswer: 0,
        answerText: "Atomic breath",
      },

      {
        text: "____ is the Godzilla's name in Japanese.",
        options: [
            "Gidorah",
            "Gamera",
            "Gojira",
            "Kaiju",
        ], 
        indexOfAnswer: 2,
        answerText: "Gojira",
      },

      {
        text: "How many heads King Gidorah have?",
        options: [
            "4",
            "3",
            "2",
            "1",
        ],
        indexOfAnswer: 1,
        answerText: "3",
      },

      {
        text: "How tall is Godzilla in the Godzilla: King of Monsters?",
        options: [
            "984 ft",
            "355 ft",
            "328 ft",
            "393 ft",
        ],
        indexOfAnswer: 3,
        answerText: "393 ft",
      },

      {
        text: "How was Godzilla traditionally portrayed in movies?",
        options: [
            "Puppet",
            "CGI",
            "Actor in a costume",
            "Animation",
        ],
        indexOfAnswer: 2,
        answerText: "Actor in a costume",
      },

      {
        text: "How was Godzilla's trademark roar created?",
        options: [
            "Rubbing the strings of a contrabass with a mesh glove and adding reverberation to a sound",
            "Tapping a wrench against the support wire of a telephone pole and slowing down the resulting sound several times",
            "Digitally synthesizing the combined noises of a lion, an elephant, and a locomotive",
            "Recording the noise made by water running through a sewer and later adding an electronic overlay to it on a computer",
        ],
        indexOfAnswer: 0,
        answerText: "Rubbing the strings of a contrabass with a mesh glove and adding reverberation to a sound",
      },
]
//startView will default due to STORE values; present user start button to 
const startView = function() {
    return `<div "logo"><img src="pics/start.jpg" class="center"></div>
    <h1 class="flex-center flex-column">Godzilla Quiz</h1>
</header>
<div class ="background-container">
    <div class="question-container flex-center flex-column">
        <h2 class = "start-quiz hidden">Start Quiz</h2>
            <form class="js-quiz-questions-form flex-center flex-column">
        <button type="submit" class = "start">Start!</button>
        </form>
    </div>
</div>  `;
}
//click start to advance to get questions
function startQuiz() {
    $(document).on('click', '.start', function(event){
        event.preventDefault();
        STORE.view = 'question';
        console.log("startQuiz ran");
        console.log(questions[STORE.currentQuestion].answer);
        createQuestion();
        render();
    }
    );
}

//provide options based on current question - loop through questions array
function createAnswerOptions() {
    let question = questions[STORE.currentQuestion].text;
    STORE.options = questions[STORE.currentQuestion].options;
}

//display question based on currentQuestion value
function createQuestion() {
    let question = questions[STORE.currentQuestion].text;
    STORE.questionText = question;
    console.log(question);
    createAnswerOptions();
}

//checks if answer is correct and creates response for answerView
function checkAnswer() {
    $(document).on('click', '.submit', function(event){
        event.preventDefault();
        let selectedAnswer = $('input:checked').val();
        STORE.selectedAnswerIndex = Number(selectedAnswer);
        if (isNaN(STORE.selectedAnswerIndex)) {
            alert("You need to select an option!")
            return;
        }
        let correctAnswerIndex = questions[STORE.currentQuestion].indexOfAnswer;
        if (STORE.selectedAnswerIndex === correctAnswerIndex) {
            correctAnswer();
         } else {
            wrongAnswer();
            }
        STORE.view = 'answer';
        render();
        });
    
}
//increases score if correct answer
function upScore() {
    STORE.score = STORE.score + 1;
}
//advances quiz 
function advanceQuestion() {
    STORE.currentQuestion = STORE.currentQuestion + 1;
    createAnswerOptions();
}
//if answer is correct
function correctAnswer() {
    STORE.answerResponse = "Correct!";
    STORE.displayCorrectAnswer = "";
    upScore();

}
//if answer is incorrect
function wrongAnswer() {
    STORE.answerResponse = "Wrong answer!";
    STORE.displayCorrectAnswer = "The correct answer is: " + " " + questions[STORE.currentQuestion].answerText;
    
    
}
//next question...
function nextQuestion() {
    $(document).on('click', '.next', function(event){
        event.preventDefault();
        STORE.view = 'question';
        if(STORE.currentQuestion + 1 !== questions.length){
            advanceQuestion();
        }
        else{STORE.view = 'endView'};
        render();
    })
}
function resetStats() {
    STORE.currentQuestion = 0;
    STORE.score = 0;
}
//restart quiz & reset score
function restartQuiz() {
    $(document).on('click', '.restart', function(event){
        event.preventDefault();
        STORE.view = 'start';
        resetStats();
        render();
    })
}

const questionView = function() {
    return `<header><h1 class="flex-center flex-column">Godzilla Quiz</h1>
    <section class="score flex-center flex-column">
        <a href= ""><img class="logo" src="pics/back.jpg" alt = "Godzilla and Mechadzilla looking at each other" class="backcenter">
        </a>
        <ul class="status-bar">
            <li class = "status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
            <li class = "status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
        </ul>
    </section>
    </div>
</header>
<div class = "background-container">
    <div class="question-container flex-center flex-column">
        <h2 class = "questions-quiz hidden">Question 1</h2>
        <form class="js-quiz-questions-form flex-center flex-column">
            <section class = "question-text">
                <p>${questions[STORE.currentQuestion].text}</p>
            </section>
            <section class = "options">
                <label>
                    <input type="radio" name="options" required value= 0 > 
                    ${STORE.options[0]}</label><br>
                <label>
                    <input type="radio" name="options" value= 1 required >
                 ${STORE.options[1]}</label><br>
                <label>
                    <input type="radio" name="options" value= 2 required >
                 ${STORE.options[2]}</label><br>
                <label>
                    <input type="radio" name="options" value= 3 required >
                 ${STORE.options[3]}</label><br>
            </section>
            <br>
            <br>
  <button type="submit" class = "submit">Submit answer</button>
</form>
</div>
</div>`
}

const answerView = function() {
    return `<header><h1 class="flex-center flex-column">Godzilla Quiz</h1>
    <section class="score flex-center flex-column">
        <a href= ""><img class="logo" src="pics/back.jpg" alt = "Godzilla walking it the city"/>
       </a>
       <ul class="status-bar">
           <li class = "status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
           <li class = "status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
       </ul>
   </section>
</header>
<div class = "background-container">
   <div class="question-container flex-center flex-column">
       <h2 class = "questions-quiz">${STORE.answerResponse}</h2>
       <form class="js-quiz-questions-form flex-center flex-column">
           <section class = "answer-result">
           <p class = "answer-correct">${STORE.displayCorrectAnswer}</p>
                </section>
   
           <button type="submit" class = "next">Next Question</button>
       </form>



</div>

</div>
`
}

const endView = function(){
    return `<header>
    <h1 class="flex-center flex-column">Godzilla Quiz</h1>
     <section>
     <div "logo"><img src="pics/start.jpg" class="center"></div>        
    </section>
</header>
<div class = "background-container">
    <div class="question-container flex-center flex-column">
        <h3 class = questions-quiz>You've done!</h3>
        <form class="js-quiz-questions-form flex-center flex-column">
            <span class = "final-answer-results">
                <h3 class = "final-status-bar">Your Score Is: <br> ${STORE.score}/${questions.length}</h3>
                    </span>
            <button type="submit" class = "start-over">Try again!</button>
        </form>
    </div>
</div>`
}


const render = function() {
    if (STORE.view === "start") {
        $('header').html(startView());
    }
    else if (STORE.view === "question") {
        let question = questions[STORE.currentQuestion];
        $('header').html(questionView());
    }
    else if (STORE.view === "answer") {
        $('header').html(answerView());
    }
    else if(STORE.view === "endView") {
        $('header').html(endView());
    }
}



$(function(){
    render();
    startQuiz();
    checkAnswer();
    nextQuestion();
    restartQuiz();   
})


