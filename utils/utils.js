const fs = require("fs");
const path = require("path");

const loadGameData = (counter, tech) => {
  tech = tech.replaceAll(" ", "_");
  const rawData = fs.readFileSync(
    path.join(__dirname, "../exams", tech + ".json")
  );
  const questions = JSON.parse(rawData);
  return questions[`q_${counter}`];
};

const gameStarter = () => {
  const rawData = fs.readFileSync(
    path.join(__dirname, "../exams", "start-game.json")
  );
  return JSON.parse(rawData);
};

module.exports = {
  loadGameData,
  gameStarter,
};
