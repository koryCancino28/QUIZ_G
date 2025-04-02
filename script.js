//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11; //EL INTERVALO DE TIEMPO, CAMBIAR EN LOS OTROS COUNT
let countdown;


//Questions and Options array

const quizArray = [
  { 
    id: "0",
    question: "¿Qué es una fórmula magistral?",
    options: ["Es un Medicamento personalizado", "Un medicamento genérico de venta libre", "Un producto cosmético sin efectos terapéuticos", "Un protocolo de laboratorio estándar"],
    correct: "Es un Medicamento personalizado",
  },
  {
    id: "1",
    question: "¿Cuántos años tenemos en el mercado?",
    options: ["2 años", "6 años", "8 años", "10 años"],
    correct: "8 años",
  },
  {
    id: "2",
    question: "¿Una fórmula magistral requiere Registro sanitario o autorización sanitaria?",
    options: ["Registro sanitario", "No requiere ningún trámite sanitario", "Solo necesita un permiso municipal", "Autorización sanitaria"],
    correct: "Autorización sanitaria",
  },
  {
    id: "3",
    question: "¿Nuestros insumos son de procedencia?",
    options: ["Chinos", "Nueva Zelanda y brasilero", "Peruanos", "Venezolanos"],
    correct: "Peruanos",
  },
  {
    id: "4",
    question: "¿Qué factores te generan más confianza al elegir un laboratorio de Fórmulas Magistrales?",
    options: ["Precisión", "Investigación y desarrollo", "Automatización", "T.A"],
    correct: "T.A",
  },
  {
    id: "5",
    question: "¿Cuál es la Primera Botica en desarrollar Fórmulas Magistrales en el Perú?",
    options: [
      "Grobdi",
      "Grobdi",
      "Grobdi",
      "Grobdi",
    ],
    correct: "Grobdi",
  },
  {
    id: "6",
    question: "¿Cuál es nuestro producto bandera?",
    options: ["Jarabes", "Cápsulas", "Gomitas", "Ovulos"],
    correct: "Gomitas",
  },
  {
    id: "7",
    question: "¿Que característica tiene nuestro Omega?",
    options: ["Origen Animal", "EPA y DHA", "Anchoveta,microencapsulado + EPA y DHA", "Origen Vegetal"],
    correct: "Anchoveta,microencapsulado + EPA y DHA",
  },
  {
    id: "8",
    question: "¿Cuál es la vigencia máxima de nuestros productos?",
    options: [
      "3 Meses",
      "1 año",
      "6 Meses",
      "1 mes",
    ],
    correct: "1 año",
  },
];

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      //user score
      userScore.innerHTML =
        "Tu puntuación es " + scoreCount + " de " + questionCount;
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " preguntas ";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
    }
  })
); 

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
  //randomly sort questions
  quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  // Crear un contenedor para mostrar los gifs de feedback
  let feedbackContainer = document.createElement("div");
  feedbackContainer.classList.add("feedback-container");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;

    // Reproducir sonido de aplausos
    let applauseSound = new Audio("aplauso.mp3"); 
    applauseSound.play();

    // Mostrar el gif de respuesta correcta
    let correctImage = document.createElement("img");
    correctImage.src = "correcto.gif";  
    correctImage.alt = "Respuesta Correcta";
    feedbackContainer.appendChild(correctImage);

    // Mostrar el gif de confeti cuando la respuesta es correcta
    let confettiImage = document.createElement("img");
    confettiImage.src = "confeti.gif"; 
    confettiImage.alt = "Confeti Celebración";
    confettiImage.classList.add("confetti");
    feedbackContainer.appendChild(confettiImage);

  } else {
    userOption.classList.add("incorrect");

    // Para marcar la opción correcta
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });

    // Reproducir sonido de aplausos
    let applauseSound = new Audio("derrota.mp3"); 
    applauseSound.play();

    // Mostrar el gif de respuesta incorrecta
    let incorrectImage = document.createElement("img");
    incorrectImage.src = "incorrecto.gif";  
    incorrectImage.alt = "Respuesta Incorrecta";
    feedbackContainer.appendChild(incorrectImage);

    // Mostrar el gif adicional "triste"
    let sadImage = document.createElement("img");
    sadImage.src = "triste.gif";  
    sadImage.alt = "Imagen Triste";
    sadImage.classList.add("sad");
    feedbackContainer.appendChild(sadImage);
  }

  // Agregar el contenedor de feedback al DOM
  question.appendChild(feedbackContainer);

  // Limpiar el intervalo (detener el temporizador)
  clearInterval(countdown);

  // Deshabilitar todas las opciones
  options.forEach((element) => {
    element.disabled = true;
  });

  // Eliminar el feedback después de 5 segundos
  setTimeout(() => {
    feedbackContainer.remove();
  }, 5000);
}


//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
