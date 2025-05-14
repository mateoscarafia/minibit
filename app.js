const express = require("express");
const path = require("path");
const fs = require("fs");
const WebSocket = require("ws");
const MarkdownIt = require("markdown-it");

const app = express();
const md = new MarkdownIt();
const PORT = process.env.PORT || 3000;

// Configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/// UTILS  //////////////////////////////////////////

const getCounter = () => {
  const rawData = fs.readFileSync(
    path.join(__dirname, "exams", "question-counter.json")
  );
  return JSON.parse(rawData);
};

const loadGameData = (counter, tech) => {
  const rawData = fs.readFileSync(
    path.join(__dirname, "exams", tech + ".json")
  );
  const questions = JSON.parse(rawData);
  return questions[`q_${counter}`];
};

const gameStarter = () => {
  const rawData = fs.readFileSync(
    path.join(__dirname, "exams", "start-game.json")
  );
  return JSON.parse(rawData);
};

/// ENDPOINTS  //////////////////////////////////////////

app.get("/exam/:tech", (req, res) => {
  res.render("exam", {
    ...loadGameData(1, req.params.tech),
    userId: Math.floor(10000 + Math.random() * 90000),
  });
});

app.get("/intro", (req, res) => {
  res.render("intro");
});

app.get("/start", (req, res) => {
  res.render("start", {
    useWebSocket: true,
  });
});

app.get("/check-start", (req, res) => {
  return res.json(gameStarter());
});

app.get("/get-game-data/:counter/:tech", (req, res) => {
  return res.json(loadGameData(Number(req.params.counter), req.params.tech));
});

app.get("/results/:tech", (req, res) => {
  const rightAnswers = [];

  const rawDataQuestions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "exams", req.params.tech + ".json"))
  );

  for (let key in rawDataQuestions) {
    rightAnswers.push(rawDataQuestions[`${key}`].answer);
  }

  const userAnswers = [];
  const answersParsed = {};

  const files = fs.readdirSync(path.join(__dirname, "exams/answers"));
  files.forEach((file) => {
    const rawDataAnswers = JSON.parse(
      fs.readFileSync(path.join(__dirname, "exams", `answers/${file}`))
    );
    answersParsed[`${file.split(".")[0]}----${rawDataAnswers.username}`] =
      rawDataAnswers.answers;
  });

  for (let key in answersParsed) {
    userAnswers.push(
      `${key}----${
        answersParsed[key].filter((x) => rightAnswers.includes(x)).length
      }`
    );
  }

  return res.json(userAnswers);
});

app.get("/answer/:response", (req, res) => {
  const userResponse = req.params.response;
  const userData = userResponse.split("--");

  if (
    fs.existsSync(path.join(__dirname, "exams", `answers/${userData[1]}.json`))
  ) {
    const rawData = fs.readFileSync(
      path.join(__dirname, "exams", `answers/${userData[1]}.json`)
    );
    const answersJSON = JSON.parse(rawData);
    answersJSON[`answers`].push(userData[0]);

    fs.writeFileSync(
      path.join(__dirname, "exams", `answers/${userData[1]}.json`),
      JSON.stringify(answersJSON, null, 2)
    );
  } else {
    const resultJson = { answers: [userData[0]], username: userData[2] };
    fs.writeFileSync(
      path.join(__dirname, "exams", `answers/${userData[1]}.json`),
      JSON.stringify(resultJson)
    );
  }

  return res.json();
});

app.get("/content/:tech/:page", (req, res) => {
  const tech = req.params.tech;
  const page = req.params.page;
  try {
    // Leer el archivo markdown
    const markdownContent = fs.readFileSync(
      path.join(__dirname, `content/${tech}`, `${tech}_${page}.md`),
      "utf8"
    );

    // Convertir markdown a HTML
    const htmlContent = md.render(markdownContent);

    // Renderizar la plantilla EJS pasando el contenido HTML
    res.render("tech_content", { content: htmlContent });
  } catch (error) {
    res.status(500).send("Error al cargar el documento markdown");
  }
});

/// SERVER  //////////////////////////////////////////

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/// WEBSOCKET //////////////////////////////////////////

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("New WebSocket connection");

  const intervalStarter = setInterval(() => {
    ws.send(
      JSON.stringify({
        type: "game-starter",
        data: gameStarter(),
      })
    );
  }, 1500);

  ws.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalStarter);
  });
});
