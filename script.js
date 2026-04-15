const questions = [
  {
    title: "Quando sua mãe sai de casa, ela normalmente:",
    image: "",
    options: [
      { letter: "A", text: "Escolhe algo confortável e prático" },
      { letter: "B", text: "Se arruma bem, gosta de estar impecável" },
      { letter: "C", text: "Usa algo diferente, com personalidade" },
      { letter: "D", text: "Monta um look que chama atenção" }
    ]
  },
  {
    title: "Qual desses looks parece mais com ela?",
    image: "",
    options: [
      {
        letter: "A",
        text: "Blusa básica + calça elegante",
        img: "./img/look-a.jpg"
      },
      {
        letter: "B",
        text: "Vestido que valoriza o corpo",
        img: "./img/look-b.jpg"
      },
      {
        letter: "C",
        text: "Conjunto moderno / com mistura de peças",
        img: "./img/look-c.jpg"
      },
      {
        letter: "D",
        text: "Look de impacto, mais fashion",
        img: "./img/look-d.jpg"
      }
    ]
  },
  {
    title: "Sua mãe prefere roupas que:",
    image: "",
    options: [
      { letter: "A", text: "Funcionam em qualquer ocasião" },
      { letter: "B", text: "Deixam ela mais bonita e arrumada" },
      { letter: "C", text: "Mostram quem ela é" },
      { letter: "D", text: "Seguem tendências e são estilosas" }
    ]
  },
  {
    title: "Quando ela vai se arrumar, ela:",
    image: "",
    options: [
      { letter: "A", text: "Resolve rápido e pronto" },
      { letter: "B", text: "Se dedica, gosta do processo" },
      { letter: "C", text: "Escolhe algo que combine com o humor dela" },
      { letter: "D", text: "Testa combinações até ficar perfeito" }
    ]
  },
  {
    title: "Sua mãe gosta mais de:",
    image: "",
    options: [
      { letter: "A", text: "Conforto" },
      { letter: "B", text: "Elegância" },
      { letter: "C", text: "Autenticidade" },
      { letter: "D", text: "Estilo / moda" }
    ]
  },
  {
    title: "Se sua mãe fosse um look, ela seria:",
    image: "",
    options: [
      { letter: "A", text: "Discreto e versátil" },
      { letter: "B", text: "Clássico e feminino" },
      { letter: "C", text: "Criativo e diferente" },
      { letter: "D", text: "Marcante e moderno" }
    ]
  },
  {
    title: "Quando ela vai comprar roupa, ela:",
    image: "",
    options: [
      { letter: "A", text: "Vai direto ao que precisa" },
      { letter: "B", text: "Escolhe peças mais elegantes" },
      { letter: "C", text: "Procura algo diferente" },
      { letter: "D", text: "Ama ver novidades" }
    ]
  }
];

const resultsMap = {
  A: {
    title: "Basic Mom",
    description:
      "Prática, elegante e sem esforço. Prefere peças versáteis que acompanham a rotina com conforto e sofisticação.",
    link: "https://seulink.com/basic-mom"
  },
  B: {
    title: "Glam Mom",
    description:
      "Feminina, vaidosa e sempre impecável. Ama se sentir bonita e valoriza looks que destacam sua presença.",
    link: "https://seulink.com/glam-mom"
  },
  C: {
    title: "Authentic Mom",
    description:
      "Autêntica e cheia de personalidade. Escolhe peças que refletem quem ela é, sem seguir padrões.",
    link: "https://seulink.com/authentic-mom"
  },
  D: {
    title: "Fashion Mom",
    description:
      "Estilosa e sempre à frente. Gosta de tendência, impacto e looks que chamam atenção.",
    link: "https://seulink.com/fashion-mom"
  }
};

const screens = {
  cover: document.getElementById("step-cover"),
  question: document.getElementById("step-question"),
  result: document.getElementById("step-result")
};

const nomeInput = document.getElementById("nome");
const telefoneInput = document.getElementById("telefone");
const startQuizBtn = document.getElementById("startQuiz");
const questionTitle = document.getElementById("questionTitle");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const questionStepText = document.getElementById("questionStepText");
const questionImageWrap = document.getElementById("questionImageWrap");
const questionImage = document.getElementById("questionImage");

const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");
const resultPersonName = document.getElementById("resultPersonName");
const resultLink = document.getElementById("resultLink");
const restartBtn = document.getElementById("restartBtn");

let currentQuestionIndex = 0;
let answers = [];
let leadData = {
  nome: "",
  telefone: ""
};

function showScreen(screenKey) {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[screenKey].classList.add("active");
}

function formatPhone(value) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

telefoneInput.addEventListener("input", (e) => {
  e.target.value = formatPhone(e.target.value);
});

function renderQuestion() {
  const question = questions[currentQuestionIndex];
  questionTitle.textContent = question.title;
  questionStepText.textContent = `Etapa ${currentQuestionIndex + 2} de 8`;

  optionsContainer.innerHTML = "";

  if (question.image) {
    questionImage.src = question.image;
    questionImageWrap.classList.add("show");
  } else {
    questionImage.src = "";
    questionImageWrap.classList.remove("show");
  }

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-card";

    button.innerHTML = `
      ${option.img ? `<img src="${option.img}" class="option-img" alt="Opção ${option.letter}">` : ""}
      <div class="option-text">
        <span class="option-letter">${option.letter})</span>
        ${option.text}
      </div>
    `;

    if (answers[currentQuestionIndex] === option.letter) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      answers[currentQuestionIndex] = option.letter;
      renderQuestion();
    });

    optionsContainer.appendChild(button);
  });

  prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-flex";
}

function getResultLetter() {
  const count = { A: 0, B: 0, C: 0, D: 0 };

  answers.forEach((answer) => {
    count[answer] += 1;
  });

  let winner = "A";
  let max = count.A;

  ["B", "C", "D"].forEach((letter) => {
    if (count[letter] > max) {
      max = count[letter];
      winner = letter;
    }
  });

  return winner;
}

function showResult() {
  const resultLetter = getResultLetter();
  const result = resultsMap[resultLetter];

  resultTitle.textContent = result.title;
  resultDescription.textContent = result.description;
  resultPersonName.textContent = `${
    leadData.nome ? leadData.nome + "," : "Você,"
  } esse é o estilo que mais combina com a sua mãe.`;
  resultLink.href = result.link;

  showScreen("result");
}

startQuizBtn.addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  const telefone = telefoneInput.value.trim();

  if (!nome) {
    alert("Preencha seu nome.");
    return;
  }

  if (telefone.replace(/\D/g, "").length < 10) {
    alert("Preencha um telefone válido.");
    return;
  }

  leadData.nome = nome;
  leadData.telefone = telefone;
  currentQuestionIndex = 0;
  answers = [];

  renderQuestion();
  showScreen("question");
});

nextBtn.addEventListener("click", () => {
  if (!answers[currentQuestionIndex]) {
    alert("Escolha uma opção para continuar.");
    return;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  answers = [];
  showScreen("cover");
});
