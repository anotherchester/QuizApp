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
            "The electric tail",
            "An ultrasonic wave",
        ],
        indexOfAnswer: 0,
        answerText: "Atomic breath",
      },

      {
        text: "What is Godzilla's name in Japanese?",
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
        text: "How many heads does King Gidorah have?",
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
        text: "How tall is Godzilla in Godzilla: King of Monsters (2019 film)?",
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
        text: "How has Godzilla's appearence been traditionally portrayed in movies?",
        options: [
            "By a puppet",
            "Through CGI (Computer-Generated Imaginery)",
            "By an actor in costume",
            "Using animation",
        ],
        indexOfAnswer: 2,
        answerText: " By an actor in costume",
      },

      
]

const startView = function() {
    return `
    <div class="start"><img src="pics/start.jpg" class="center" alt="Godzilla holding train"></div>
    <h1 class="flex-center flex-column">Godzilla Quiz</h1>
        <form class="js-quiz-questions-form flex-center flex-column">
        <button type="submit" class ="start">Start!</button>
        </form>
    </div>  `;
}

function startQuiz() {
    $(document).on('click', '.start', function(event){
        event.preventDefault();
        STORE.view = 'question';
        createQuestion();
        render();
    }
    );
}

function createAnswerOptions() {
    let question = questions[STORE.currentQuestion].text;
    STORE.options = questions[STORE.currentQuestion].options;
}


function createQuestion() {
    let question = questions[STORE.currentQuestion].text;
    STORE.questionText = question;
    createAnswerOptions();
}


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

function upScore() {
    STORE.score = STORE.score + 1;
}

function advanceQuestion() {
    STORE.currentQuestion = STORE.currentQuestion + 1;
    createAnswerOptions();
}

function correctAnswer() {
    STORE.answerResponse = "Correct!";
    STORE.displayCorrectAnswer = "";
    upScore();

}

function wrongAnswer() {
    STORE.answerResponse = "Wrong!";
    STORE.displayCorrectAnswer = "The correct answer is " + " " + questions[STORE.currentQuestion].answerText;
    
    
}

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

function restartQuiz() {
    $(document).on('click', '.restart', function(event){
        event.preventDefault();
        STORE.view = 'start';
        resetStats();
        render();
    })
}

const questionView = function() {
    return `
    <h1 class="flex-center flex-column">Godzilla Quiz</h1>
    <section name="statusBar" class="score flex-center flex-column">
            <ul class="status-bar">
            <li class="status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
            <li class="status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
        </ul>
    </section>
    <div class="question-container flex-center flex-column">
            <form class="js-quiz-questions-form flex-center flex-column">
            <section name="question-text">
                <h3>${questions[STORE.currentQuestion].text}</h3>
            </section>
            <fieldset class="options">
                <legend>Select an answer: </legend>
                <div class ="input_options">    <input type="radio" name="options" required value=0 > 
                ${STORE.options[0]} </div>
                <div class="input_options">    <input type="radio" name="options" value=1 required >
                ${STORE.options[1]} </div>
                <div class="input_options">    <input type="radio" name="options" value=2 required >
                ${STORE.options[2]} </div>
                <div class="input_options">    <input type="radio" name="options" value=3 required >
                ${STORE.options[3]} </div>
            </fieldset>
            
            <button type="submit" class="submit">Submit your answer</button>
</form>
</div>`
}

const answerView = function() {
    return `
    <h1 class="flex-center flex-column">Godzilla Quiz</h1>
    <section name="statusBar" class="score flex-center flex-column">
           <ul class="status-bar">
           <li class="status-bar question-display">Question: ${STORE.currentQuestion + 1}/${questions.length}</li>
           <li class="status-bar score-display">Score: ${STORE.score}/${questions.length}</li>
       </ul>
   </section>
   <div class="question-container flex-center flex-column">
       <h2 class="questions-quiz">${STORE.answerResponse}</h2>
       <form class="js-quiz-questions-form flex-center flex-column">
           <section class = "answer-result">
           <p class="answer-correct">${STORE.displayCorrectAnswer}</p>
                </section>
   
           <button type="submit" class = "next">Next</button>
       </form>




</div>
`
}

const endView = function(){
    return `<h1 class="flex-center flex-column">Godzilla Quiz</h1>
     <section>
     <div class="start"><img src="pics/start.jpg" class="center" alt="Godzilla holding train"></div>        
    </section>
        <h3 class=questions-quiz>You've done!</h3>
        <form class="js-quiz-questions-form flex-center flex-column">
            <span class="final-answer-results">
                <h3 class="final-status-bar">Your Score Is: <br> ${STORE.score}/${questions.length}</h3>
                    </span>
            <button type="submit" class="start-over">Try again!</button>
        </form>
    </div>`
}


const render = function() {
    if (STORE.view === "start") {
        $('body').removeClass('background');
        $('header').html(startView());
    }
    else if (STORE.view === "question") {
        $('body').addClass('background');
        let question = questions[STORE.currentQuestion];
        $('header').html(questionView());
    }
    else if (STORE.view === "answer") {
        $('body').addClass('background');
        $('header').html(answerView());
    }
    else if(STORE.view === "endView") {
        $('body').removeClass('background');
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


