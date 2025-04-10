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
// Variables para los sonidos
let hoverSound, clickSound;
let soundsEnabled = false; // Bloquea los sonidos hasta que el usuario interactúe
let questionAnswered = false;  // Para controlar si la pregunta ya fue respondida

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
    options: ["Jarabes", "Cápsulas", "Gomitas", "Cremas"],
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
  
  // Detener el temporizador y su sonido
  clearInterval(countdown);
  if (timerSound) {
    timerSound.pause();
    timerSound.currentTime = 0;
  }
  // Ocultar contenedores y mostrar pantalla de inicio
  displayContainer.classList.add("hide");
  scoreContainer.classList.add("hide");
  startScreen.classList.remove("hide");
  
  // Reiniciar el estado del quiz (sin iniciar el temporizador)
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  currentStreak = 0;
  maxStreak = 0;
  timeLeft.innerHTML = ""; // Limpiar el texto del temporizador
  progressBar.style.width = "0%";
  streakCounter.textContent = "Racha: 0";
});

//Restart Quiz
restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  updateProgress();
});

//Boton Siguiente 
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    questionAnswered = false; //para evitar el sonido click.mp3 despues de marcar
    //incrementar número de preguntas
    questionCount += 1;
    //si la última pregunta
    if (questionCount == quizArray.length) {
      //ocultar el contenedor de preguntas y mostrar la puntuacion
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      // Detener el temporizador y su sonido
      clearInterval(countdown);
      if (timerSound) {
        timerSound.pause();
        timerSound.currentTime = 0;
      }
      // Reproducir sonido de logro
      if (soundsEnabled) {
        let achievementSound = new Audio("logro.mp3");
        achievementSound.play();}
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
      }`;
      } else {
          userScore.innerHTML += `<div class="streak-value2">❄️ No hubo racha de respuestas correctas ❄️`;
      }
      
    } else {
      //mostrar número de preguntas 
      countOfQuestion.innerHTML =
        questionCount + 1 + " de " + quizArray.length + " preguntas ";
      //mostrar quiz
      quizDisplay(questionCount);
      count = 11;
      clearInterval(countdown);
      timerDisplay();
      updateProgress();
    }
  })
); 

 // Reproducir sonido de aplausos
 let timerSound = new Audio("temporizador.mp3");
 timerSound.play();

//minutero
const timerDisplay = () => {
  // Detener cualquier sonido de temporizador previo
  if (timerSound) {
    timerSound.pause();
    timerSound.currentTime = 0;
}

  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
    // Efecto de urgencia cuando quedan 5 segundos
    if (count <= 5) {
      timeLeft.style.animation = "pulse 0.5s infinite";
      playSound(timerSound);
  } else {
      timeLeft.style.animation = "";
  }
  
  if (count == 0) {
      clearInterval(countdown);
      timeLeft.style.animation = "";
      // Detener el sonido del temporizador al cambiar de pregunta
      if (timerSound) {
          timerSound.pause();
          timerSound.currentTime = 0;
      }
      displayNext();
  }
  }, 1000);
};

//Mostrar quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //ocultar otros contenedores
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //Mostrar el contenedor de preguntas actual
  quizCards[questionCount].classList.remove("hide");
};

//creación quiz
function quizCreator() {
//ordenar preguntas aleatoriamente 
  quizArray.sort(() => Math.random() - 0.5);
  //generar quiz
  for (let i of quizArray) {
    //quiz card creacion
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //número de pregunta
    countOfQuestion.innerHTML = 1 + " de " + quizArray.length + " preguntas";
    //pregunta
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    // Para la pregunta del producto bandera (ID 6)
    if (i.id === "6") {
      // Primero creamos un array de objetos con opciones e imágenes correspondientes
      const opcionesConImagenes = [
        { texto: "Jarabes", imagen: "jarabe.png" },
        { texto: "Cápsulas", imagen: "capsula.png" },
        { texto: "Gomitas", imagen: "gomita.jpeg" },
        { texto: "Cremas", imagen: "crema.png" }
      ];
      
      // Barajamos este array manteniendo la relación texto-imagen
      opcionesConImagenes.sort(() => Math.random() - 0.5);
      
      // Creamos los botones con las imágenes correspondientes
      opcionesConImagenes.forEach(opcion => {
        let button = document.createElement("button");
        button.className = "option-div with-image";
        button.innerHTML = `<img src="${opcion.imagen}" alt="${opcion.texto}">${opcion.texto}`;
        button.onclick = function() { checker(this); };
        div.appendChild(button);
      });
    } else {
      // Para las demás preguntas, barajamos las opciones normalmente
      let options = [...i.options]; // Copiamos el array
      options.sort(() => Math.random() - 0.5); // Barajamos
      
      // Creamos los botones sin imágenes
      options.forEach(opcion => {
        let button = document.createElement("button");
        button.className = "option-div";
        button.textContent = opcion;
        button.onclick = function() { checker(this); };
        div.appendChild(button);
      });
    }
    quizContainer.appendChild(div);
  }
}
//funci+on checker para comprobar si la opción es correcta o no
function checker(userOption) {
   // marcar que la pregunta ya ha sido respondida
   questionAnswered = true;
  let userSolution = userOption.innerText;
  let question = document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

   // Detener el sonido del temporizador
   if (timerSound) {
        timerSound.pause();
        timerSound.currentTime = 0;
    }
    
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
  questionAnswered = false; // reinicia la variable de respuesta
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


//cuando el usuario hace click en el boton de incio
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

//ocultar el cuestionario y solo mostrar la pantalla de inicio
window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};

// Esperar el primer clic o toque para habilitar los sonidos
document.addEventListener("click", enableSounds, { once: true });
document.addEventListener("touchstart", enableSounds, { once: true });

function enableSounds() {
  hoverSound = new Audio("hover.mp3");
  clickSound = new Audio("click.mp3");
  timerSound = new Audio("temporizador.mp3");
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

document.addEventListener("mouseover", (event) => {
  // Solo reproducir el sonido si la pregunta no ha sido respondida
  if (!questionAnswered && event.target.classList.contains("option-div")) {
    playSound(clickSound);
  }
});

