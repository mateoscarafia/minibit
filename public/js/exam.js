var cancelFetch = false;
var options = [];
var question = [];
var game_counter = 2;
var endGame = false;
var parsedResults = [];
var gameInterval = null;

//SEND USER ANSWER
const saveAnswersLocalStorage = (ans) => {
  if (cancelFetch) return;
  cancelFetch = true;
  const answers = localStorage.getItem("minibit-answers");
  if (!answers) {
    localStorage.setItem("minibit-answers", JSON.stringify([ans]));
  } else {
    let parsedAnswers = JSON.parse(answers);
    localStorage.setItem(
      "minibit-answers",
      JSON.stringify([...parsedAnswers, ans])
    );
  }
};

//FETCH USER ANSWERS
const fetchAnswers = () => {
  if (endGame) {
    const url = new URL(window.location.href);
    fetch(`${url.origin}/results/${defineTech()}`).then(async (res) => {
      const results = await res.json();
      const userAnswers = JSON.parse(localStorage.getItem("minibit-answers"));

      const correctAnswers = userAnswers.filter((item) =>
        results.includes(item)
      ).length;

      const finalResult = (correctAnswers * 100) / results.length;

      fetch(`${url.origin}/save-exam-result/${defineTech()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("minibit-token"),
        },
        body: JSON.stringify({
          userAnswers: userAnswers,
          result: finalResult,
        }),
      });

      //alert(finalResult);
    });
  }
};

function defineTech() {
  return window.location.pathname.split("/")[2]
}

console.log(defineTech())

//FETCH QUESTIONS
const fetchGameData = (ans) => {
  const url = new URL(window.location.href);
  fetch(`${url.origin}/get-game-data/${game_counter}/${defineTech()}`).then(
    async (res) => {
      try {
        const resp = await res.json();
        options = resp.options;
        question = resp.question;
      } catch (err) {
        endGame = true;
      }
    }
  );
};

//TIMER COUNTER
var counter = 9;
gameInterval = setInterval(() => {
  document.getElementById("counter").innerHTML = `${counter}`;

  if (counter === 8) {
    fetchAnswers();
  }
  if (counter === 5) {
    fetchGameData();
    if (endGame) clearInterval(gameInterval);
    game_counter++;
  }

  if (counter == 1) {
    counter = 10;

    setTimeout(() => {
      if (endGame) {
        document.querySelector(".question-container").textContent =
          "Termino el Juego!";
        document.getElementById("counter").style.display = "none";
        const optionsContainer = document.querySelector(".options-container");
        optionsContainer.innerHTML = "";
        return;
      }
      document.querySelector(".question-container").textContent = question;
      //document.getElementById("prize-levels-id").style.display = "block";
      const optionsContainer = document.querySelector(".options-container");
      optionsContainer.innerHTML = options
        .map((option) => {
          return `
                          <div onclick="saveAnswersLocalStorage('${option.response}')" class="option ${option.class}">
                              <div class="option-letter">${option.letter}</div>
                              <div class="option-text">${option.text}</div>
                          </div>
                          `;
        })
        .join("");
      cancelFetch = false;
    }, 1000);
  } else {
    counter--;
  }
}, 1000);

