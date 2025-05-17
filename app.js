const express = require("express");
const path = require("path");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.PORT || 3000;

const {
  resultsTech,
  answerResponse,
  contentPage,
} = require("./controllers/controllers");

const { loadGameData, gameStarter } = require("./utils/utils");

// Configuración del motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/// ENDPOINTS  //////////////////////////////////////////

app.get("/exam/:tech", (req, res) => {
  res.render("exam", {
    ...loadGameData(1, req.params.tech),
    userId: Math.floor(10000 + Math.random() * 90000),
  });
});
app.get("/", (req, res) => {
  res.render("login");
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
app.get("/results/:tech", resultsTech);
app.get("/answer/:response", answerResponse);
app.get("/content/:tech/:page", contentPage);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

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
