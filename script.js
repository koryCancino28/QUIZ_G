//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let participante = document.getElementById("participante");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11; //EL INTERVALO DE TIEMPO, CAMBIAR EN LOS OTROS COUNT
let countdown;
let progressBar = document.querySelector(".progress-bar");
let streakCounter = document.querySelector(".streak-counter");
let currentStreak = 0;
let maxStreak = 0;


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
    correct: "Nueva Zelanda y brasilero",
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
      "GROBDI",
      "GRODBI",
      "GROCDI",
      "GRODDI",
    ],
    correct: "GROBDI",
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
    options: ["Origen Animal", "EPA y DHA", "Anchoveta, microencapsulado + EPA y DHA", "Origen Vegetal"],
    correct: "Anchoveta, microencapsulado + EPA y DHA",
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
// volver al inicio
participante.addEventListener("click", () => {
  if (soundsEnabled) {
    let sound = new Audio("hover.mp3");
    sound.play();
  }
  // oculta los contenedores de quiz y puntuación
  displayContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
  
  // muestra la pantalla de inicio
  startScreen.classList.remove("hide");
  
  // reinicia el quiz para limpiar datos
  initial(); //resetea preguntas/puntaje
});

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  updateProgress();
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
        `<div class="score-value">🏆 Tu puntuación: <span>${scoreCount}</span>/${questionCount}</div>`;
        if (scoreCount > 0) {
          userScore.innerHTML = `
    <div class="score-value">🏆 Tu puntuación: <span>${scoreCount}</span>/${questionCount}</div>
    <div class="streak-value">🔥 Racha máxima: <strong>${maxStreak}</strong></div>
    ${scoreCount === quizArray.length ? 
        '<div class="feedback-perfect">🎉 ¡Perfecto! Dominaste el tema</div>' : 
        scoreCount >= quizArray.length/2 ? 
        '<div class="feedback-good">👍 ¡Buen trabajo!</div>' : 
        '<div class="feedback-keep">💪 Sigue practicando</div>'
    }
`;
      } else {
          userScore.innerHTML += `<div class="streak-value">🔥 No hubo racha de respuestas correctas`;
      }
      
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " preguntas ";
      //display quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
      updateProgress();
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

  let feedbackTime; // Variable para definir el tiempo de eliminación

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
    currentStreak++;
    if (currentStreak > maxStreak) {
      maxStreak = currentStreak;
    }

    streakCounter.textContent = `Racha: ${currentStreak}`;

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

    feedbackTime = 5000; // Tiempo de feedback correcto (5s)

  } else {
    userOption.classList.add("incorrect");
    currentStreak = 0;
    streakCounter.textContent = "Racha: 0";

    // Para marcar la opción correcta
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });

    // Reproducir sonido de derrota
    let defeatSound = new Audio("derrota.mp3");
    defeatSound.play();

    // Mostrar el gif de respuesta incorrecta
    let incorrectImage = document.createElement("img");
    incorrectImage.src = "incorrecto.gif";
    incorrectImage.alt = "Respuesta Incorrecta";
    feedbackContainer.appendChild(incorrectImage);

    let sadImage = document.createElement("img");
    sadImage.src = "triste.gif";
    sadImage.alt = "Imagen Triste";
    sadImage.classList.add("sad");
    feedbackContainer.appendChild(sadImage);

    feedbackTime = 3500; //incorrecto (3s)
  }
  question.appendChild(feedbackContainer);
  // Limpiar el intervalo (detener el temporizador)
  clearInterval(countdown);
  options.forEach((element) => {
    element.disabled = true;
  });
// Eliminar el feedback después del tiempo correspondiente
  setTimeout(() => {
    feedbackContainer.remove();
  }, feedbackTime);
}


//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  currentStreak = 0; //reiniciar el contador de racha
  maxStreak = 0; //reiniciar la racha máxima
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
  progressBar.style.width = "0%";
  streakCounter.textContent = "Racha: 0";
  streakCounter.style.left = "0%";
}

function updateProgress() {
  const progress = (questionCount / quizArray.length) * 100;
  progressBar.style.width = `${progress}%`;
  streakCounter.style.left = `${progress}%`;
}


//when user click on start button
startButton.addEventListener("click", () => {
  if (soundsEnabled) {
    let sound = new Audio("hover.mp3");
    sound.play();
  }
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
  updateProgress();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

//sonido hover al pasar el mouse o touch
// Variables para los sonidos
let hoverSound, clickSound;
let soundsEnabled = false; // Bloquea los sonidos hasta que el usuario interactúe

// Esperar el primer clic o toque para habilitar los sonidos
document.addEventListener("click", enableSounds, { once: true });
document.addEventListener("touchstart", enableSounds, { once: true });

function enableSounds() {
  hoverSound = new Audio("hover.mp3");
  clickSound = new Audio("click.mp3");
  soundsEnabled = true;
}

// Función para reproducir sonido sin bloqueos
function playSound(sound) {
  if (!soundsEnabled) return; // Si el usuario no ha interactuado, no reproducir
  sound.currentTime = 0; // Reinicia el audio para que suene desde el inicio
  sound.play().catch((error) => console.warn("Error reproduciendo sonido:", error));
}

// Añadir eventos a los botones principales (start, next, restart)
[nextBtn, restart].forEach((btn) => {
  btn.addEventListener("click", () => playSound(hoverSound)); // Sonido solo al presionar
});

// Añadir eventos a las opciones de respuesta
document.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("option-div")) {
    playSound(clickSound);
  }
});
