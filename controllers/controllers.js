const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../utils/database");
const { generateToken, secretKey, decodeToken } = require("../utils/utils");
const jwt = require("jsonwebtoken");

const resultsTech = (req, res) => {
  const rightAnswers = [];

  const rawDataQuestions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../exams", req.params.tech + ".json"))
  );

  for (let key in rawDataQuestions) {
    rightAnswers.push(rawDataQuestions[`${key}`].answer);
  }

  return res.json(rightAnswers);
};

const saveExamResult = async (req, res) => {
  const tech = req.params.tech;

  const decodedToken = decodeToken(req.headers.token);

  const rightAnswers = [];
  const rawDataQuestions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../exams", req.params.tech + ".json"))
  );
  for (let key in rawDataQuestions) {
    rightAnswers.push(rawDataQuestions[`${key}`].answer);
  }
  const userCorrectAnswers = userAnswers.filter((item) =>
    rightAnswers.includes(item)
  ).length;
  const finalResult = (userCorrectAnswers * 100) / results.length;

  const [results] = await sequelize.query(
    `INSERT INTO user_exam_result (user_id, tech, score) 
  VALUES (:user_id, :tech, :score);`,
    {
      replacements: {
        user_id: decodedToken.userId,
        tech: tech,
        score: finalResult,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
};

const answerResponse = (req, res) => {
  const userResponse = req.params.response;
  const userData = userResponse.split("--");

  if (
    fs.existsSync(
      path.join(__dirname, "../exams", `answers/${userData[1]}.json`)
    )
  ) {
    const rawData = fs.readFileSync(
      path.join(__dirname, "../exams", `answers/${userData[1]}.json`)
    );
    const answersJSON = JSON.parse(rawData);
    answersJSON[`answers`].push(userData[0]);

    fs.writeFileSync(
      path.join(__dirname, "../exams", `answers/${userData[1]}.json`),
      JSON.stringify(answersJSON, null, 2)
    );
  } else {
    const resultJson = { answers: [userData[0]], username: userData[2] };
    fs.writeFileSync(
      path.join(__dirname, "../exams", `answers/${userData[1]}.json`),
      JSON.stringify(resultJson)
    );
  }

  return res.json();
};

const contentPage = (req, res) => {
  const tech = req.params.tech;
  const page = req.params.page;
  try {
    // Leer el archivo markdown
    const markdownContent = fs.readFileSync(
      path.join(__dirname, `../content/${tech}`, `${tech}_${page}.md`),
      "utf8"
    );

    // Convertir markdown a HTML
    const htmlContent = md.render(markdownContent);

    // Renderizar la plantilla EJS pasando el contenido HTML
    res.render("tech_content", { content: htmlContent });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al cargar el documento markdown");
  }
};

const login = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM users WHERE email = :email AND password = :password",
      {
        replacements: {
          email: req.body.email,
          password: req.body.password,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!results) return res.status(400).send("Error");

    return res.json({ token: generateToken(results) });
  } catch (error) {
    return res.status(400).send("Error");
  }
};

const verifyToken = async (req, res) => {
  console.log(req.params.token);
  jwt.verify(req.params.token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Error");
    }
    return res.status(200);
  });
};

module.exports = {
  resultsTech,
  answerResponse,
  contentPage,
  login,
  verifyToken,
  saveExamResult,
};
