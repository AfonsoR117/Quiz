const questions = [
    {
        questions: "Qual foi a civilização antiga que construiu as pirâmides de Gizé?",
        answers: [
            { text: " Civilização Egípcia", correct: true},
            { text: "Dinastia IV", correct: false},
            { text: "Dinastia V", correct: false},
            { text: "Dinastia VI", correct: false},
        ]
    },

    {
        questions: "A figura histórica associada a uma famosa pintura de Leonardo da Vinci que sorri enigmaticamente é:",
        answers: [
            { text: " A Persistência da Memória", correct: false},
            { text: "O Beijo", correct: false},
            { text: "Mona Lisa", correct: true},
            { text: "A Noite Estrelada", correct: false},
        ]
    },

    {
        questions: "Em que ano ocorreu a Revolução Francesa, um evento importante que levou à queda da monarquia e ao surgimento de ideias republicanas?",
        answers: [
            { text: "27 de julho de 1794", correct: false},
            { text: "21 de janeiro de 1793", correct: false},
            { text: "26 de agosto de 1789", correct: false},
            { text: "14 de julho de 1789", correct: true},
        ]
    },

    {
        questions: "Qual foi o nome do famoso líder dos direitos civis que lutou pela igualdade racial nos Estados Unidos?",
        answers: [
            { text: "Martin Luther King Jr", correct: true},
            { text: "Malcolm X", correct: false},
            { text: "Nelson Mandela", correct: false},
            { text: "Abraham Lincoln", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectanswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    };
}

function selectanswer(e){
    const selectedBtn = e.target;
    const  isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
   resetState();
   questionElement.innerHTML = `Você pontuou ${score} de ${questions.length}!`;
   nextButton.innerHTML = "play again";
   nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    }else{ 
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
})

startQuiz();  