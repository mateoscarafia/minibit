const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const secretKey =
  "ADFASDFADSGFSG478563453F25623945623BF985762349563G3B265234___";

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

const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      company: user.company,
      email: user.email,
    },
    secretKey,
    { expiresIn: "5h" }
  );
};

const decodeToken = (token) => {
  return jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return null;
    }
    console.log(decoded);
    return decoded;
  });
};

module.exports = {
  loadGameData,
  gameStarter,
  generateToken,
  secretKey,
  decodeToken,
};
