const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const fs = require("fs");
const path = require("path");

const resultsTech = (req, res) => {
  const rightAnswers = [];

  const rawDataQuestions = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../exams", req.params.tech + ".json"))
  );

  for (let key in rawDataQuestions) {
    rightAnswers.push(rawDataQuestions[`${key}`].answer);
  }

  const userAnswers = [];
  const answersParsed = {};

  const files = fs.readdirSync(path.join(__dirname, "../exams/answers"));
  files.forEach((file) => {
    const rawDataAnswers = JSON.parse(
      fs.readFileSync(path.join(__dirname, "../exams", `answers/${file}`))
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

module.exports = { resultsTech, answerResponse, contentPage };
