const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../utils/database");
const { generateToken, secretKey, decodeToken, generateTokenAdmin } = require("../utils/utils");
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
  let finalResult = 0
  try {
    const userAnswers = req.body.userAnswers
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
    finalResult = (userCorrectAnswers * 100) / rightAnswers.length;
    const [content] = await sequelize.query(
      "SELECT id FROM content WHERE filename = :filename",
      {
        replacements: {
          filename: req.params.tech,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    await sequelize.query(
      `INSERT INTO user_tech_skills (user_id, content_id, score) 
  VALUES (:user_id, :content_id,  :score);`,
      {
        replacements: {
          user_id: decodedToken.userId,
          content_id: content.id,
          score: Math.floor(finalResult),
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
  } catch (err) { console.log(err); res.status(500).json() }
  return res.json({ resultado: Math.floor(finalResult) });
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

const contentPage = async (req, res) => {
  const content = req.params.content;
  const token = req.params.token;
  const decoded = decodeToken(token)
  const techs = await sequelize.query(
    `SELECT *
      FROM content
      INNER JOIN company_content ON content.id = company_content.content_id WHERE company_content.company_id =  :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  try {
    const markdownContent = fs.readFileSync(
      path.join(__dirname, `../content`, `${content}.md`),
      "utf8"
    );
    const htmlContent = md.render(markdownContent);
    res.render("tech_content", { content: htmlContent, techs: techs });
  } catch (error) {
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

const loginAdmin = async (req, res) => {
  try {
    const [results] = await sequelize.query(
      "SELECT * FROM company WHERE pass_phrase = :passphrase",
      {
        replacements: {
          passphrase: req.body.passphrase,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!results) return res.status(400).send("Error");

    return res.json({ token: generateTokenAdmin(results) });
  } catch (error) {
    console.log(error)
    return res.status(400).send("Error");
  }
};

const verifyToken = async (req, res) => {
  jwt.verify(req.params.token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send("Error");
    }
    return res.status(200).send({});
  });
};

const checkExamDate = async (req, res) => {
  const user = decodeToken(req.body.token)
  const [content] = await sequelize.query(
    "SELECT id FROM content WHERE filename = :filename",
    {
      replacements: {
        filename: req.body.tech,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  const [results] = await sequelize.query(
    "SELECT * FROM user_tech_skills WHERE user_id = :user_id AND content_id = :content_id",
    {
      replacements: {
        user_id: user.userId,
        content_id: content.id,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  if (!results) return res.status(200).send({});
  const referenceDate = new Date(results.created);
  const currentDate = new Date();
  const oneMonthLater = new Date(referenceDate);
  oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
  if (currentDate >= oneMonthLater) return res.status(200).send({});
  return res.status(400).send({});
};

const adminPage = async (req, res) => {
  const decoded = decodeToken(req.params.token)
  const results = await sequelize.query(
    `SELECT *
      FROM user_tech_skills
      INNER JOIN users ON user_tech_skills.user_id = users.id
      INNER JOIN content ON user_tech_skills.content_id = content.id
      WHERE users.company_id = :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  const parsed = results.map((res) => {
    const date = new Date(res.created).toLocaleDateString('en-GB');
    return {
      ...res,
      created: date,
    }
  })
  const users = await sequelize.query(
    `SELECT *
      FROM users
      WHERE company_id = :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  return res.render("admin", { results: parsed, users: users });
}

module.exports = {
  resultsTech,
  answerResponse,
  contentPage,
  login,
  loginAdmin,
  verifyToken,
  saveExamResult,
  checkExamDate,
  adminPage,
};
