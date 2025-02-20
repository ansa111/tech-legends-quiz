const questions = [
    {
        question: "Who invented JavaScript?",
        answers: [
            { text: "Brendan Eich", correct: true },
            { text: "Tim Berners-Lee", correct: false },
            { text: "Guido van Rossum", correct: false },
            { text: "Bjarne Stroustrup", correct: false }
        ]
    },
    {
        question: "Who created CSS?",
        answers: [
            { text: "Håkon Wium Lie", correct: true },
            { text: "Linus Torvalds", correct: false },
            { text: "John Resig", correct: false },
            { text: "James Gosling", correct: false }
        ]
    },
    {
        question: "Who developed the C programming language?",
        answers: [
            { text: "Dennis Ritchie", correct: true },
            { text: "Brian Kernighan", correct: false },
            { text: "James Gosling", correct: false },
            { text: "Larry Page", correct: false }
        ]
    },
    {
        question: "Who is considered the father of the World Wide Web?",
        answers: [
            { text: "Tim Berners-Lee", correct: true },
            { text: "Mark Zuckerberg", correct: false },
            { text: "Bill Gates", correct: false },
            { text: "Steve Jobs", correct: false }
        ]
    }
];

const startBtn = document.getElementById('start-btn');
const quizPage = document.getElementById('quiz-page');
const welcomePage = document.getElementById('welcome-page');
const resultPage = document.getElementById('result-page');
const questionContainer = document.getElementById('question-container');
const btnContainer = document.getElementById('btn-container');
const nextBtn = document.getElementById('next-btn');
const resultText = document.getElementById('result-text');
const restartBtn = document.getElementById('restart-btn');
const progressBar = document.getElementById('progress');
const questionNumber = document.getElementById('question-number');

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener('click', () => {
    welcomePage.classList.add('hide');
    quizPage.classList.remove('hide');
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextBtn.classList.add('hide');
        updateProgress();
    } else {
        showResults();
    }
});

restartBtn.addEventListener('click', () => {
    resultPage.classList.add('hide');
    welcomePage.classList.remove('hide');
    score = 0;
    currentQuestionIndex = 0;
});

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    showQuestion(questions[currentQuestionIndex]);
    updateProgress();
}

function updateProgress() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    // Update question number (adding 1 because array is 0-based)
    questionNumber.textContent = currentQuestionIndex + 1;
}

function showQuestion(question) {
    questionContainer.textContent = question.question;
    btnContainer.innerHTML = '';
    question.answers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer.text;
        btn.classList.add('btn', 'btn-option');
        btn.addEventListener('click', () => selectAnswer(answer, btn));
        btnContainer.appendChild(btn);
    });
}

function selectAnswer(answer, btn) {
    const correct = answer.correct;
    if (correct) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
    }

    Array.from(btnContainer.children).forEach(button => {
        button.disabled = true;
        if (button.textContent === questions[currentQuestionIndex].answers.find(a => a.correct).text) {
            button.classList.add('correct');
        }
    });

    nextBtn.classList.remove('hide');
}

function showResults() {
    quizPage.classList.add('hide');
    resultPage.classList.remove('hide');
    resultText.innerHTML = `You got ${score} out of ${questions.length} correct! ${score >= 3 ? 'Great job!' : 'Keep learning!'}`;
}