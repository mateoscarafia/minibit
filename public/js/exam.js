var cancelFetch = false;
var options = [];
var question = [];
var game_counter = 2;
var endGame = false;
var parsedResults = [];
var gameInterval = null;

//SEND USER ANSWER
const fetchServer = (ans) => {
  if (cancelFetch) return;
  cancelFetch = true;
  const url = new URL(window.location.href);
  fetch(
    `${url.origin}/answer/${ans}--${userId}--${localStorage.getItem(
      "nombre-user"
    )}`
  );
};

//FETCH USER ANSWERS
const fetchAnswers = (ans) => {
  const url = new URL(window.location.href);
  fetch(`${url.origin}/results/${defineTech()}`).then(async (res) => {
    const results = await res.json();
    const result_element = document.getElementById("prize-levels-id");
    let content = "";
    parsedResults = results.map((result) => {
      const result_data = result.split("----");
      return [result_data[1], Number(result_data[2])];
    });
    parsedResults.sort((a, b) => b[1] - a[1]);
    parsedResults.forEach((result) => {
      content =
        content +
        `<div class="prize-level">${result[0]} - ${
          Number(result[1]) * 10
        }pts</div>`;
    });
    result_element.innerHTML = content;
    if (endGame) {
      document.querySelector(
        ".question-container"
      ).textContent = `🏆🏆 ${parsedResults[0][0]} 🏆🏆`;
    }
  });
};

//FETCH IF START IS TRUE
const fetchCheckStart = (ans) => {
  /* const url = new URL(window.location.href);
  fetch(`${url.origin}/check-start`).then(async (res) => {
    const resp = await res.json();
    if (!resp.start) {
      const url = new URL(window.location.href);
      window.location.href = `${url.origin}/start`;
    }
  });*/
};

function defineTech() {
  const url = window.location.href;
  if (url.includes("Javascript")) return "Javascript";
  if (url.includes("Typescript")) return "Typescript";
}

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
      document.getElementById("prize-levels-id").style.display = "block";
      const optionsContainer = document.querySelector(".options-container");
      optionsContainer.innerHTML = options
        .map((option) => {
          return `
                          <div onclick="fetchServer('${option.response}')" class="option ${option.class}">
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

//CHECK START GAME TRUE
fetchCheckStart();
