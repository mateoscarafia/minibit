const MarkdownIt = require("markdown-it");
const md = new MarkdownIt();
const fs = require("fs");
const path = require("path");
const { sequelize } = require("../utils/database");
const { generateToken, secretKey, decodeToken, generateTokenAdmin, transformQuestions } = require("../utils/utils");
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
  const [{ background_image }] = await sequelize.query(
    `SELECT background_image from company
      WHERE id = :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  res.render("tech_content", { techs: techs, background_image: background_image });
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


const createUser = async (req, res) => {
  const decoded = decodeToken(req.headers.token)
  const email = req.body.email;
  const password = req.body.password;
  try {
    const [user] = await sequelize.query(
      "INSERT INTO users (email, password, company_id) VALUES (:email, :password, :company_id)",
      {
        replacements: {
          email: email,
          password: password,
          company_id: decoded.companyId,
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send("Error");
  }
};

const deleteUser = async (req, res) => {
  const decoded = decodeToken(req.headers.token)
  const userId = req.body.userId;
  try {
    await sequelize.query(
      "DELETE FROM users WHERE id = :id and company_id = :company_id",
      {
        replacements: {
          id: Number(userId),
          company_id: decoded.companyId,
        }
      }
    );
    await sequelize.query(
      "DELETE FROM user_tech_skills WHERE user_id = :id",
      {
        replacements: {
          id: Number(userId),
        }
      }
    );
    return res.status(200).send({});
  } catch (err) {
    return res.status(500).send("Error");
  }
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
  if (!decoded) return res.render("login")

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

  const content_techs = await sequelize.query(
    `SELECT *
      FROM content
      INNER JOIN company_content ON content.id = company_content.content_id
      WHERE company_content.company_id = :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  const content_question = [];

  content_techs.forEach(async (content, index) => {
    content_question.push(
      {
        name: content_techs[index].name,
        id: content_techs[index].id,
        questions: await sequelize.query(
          `SELECT *
      FROM questions
      WHERE company_id = :company_id AND content_id= :content_id`,
          {
            replacements: {
              company_id: decoded.companyId,
              content_id: content_techs[index].id,
            },
            type: sequelize.QueryTypes.SELECT,
          }
        )
      }
    )
  })



  const [{ background_image }] = await sequelize.query(
    `SELECT background_image from company
      WHERE id = :company_id`,
    {
      replacements: {
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );

  console.log(content_question)

  return res.render("admin", { results: parsed, users: users, content_question: content_question, background_image: background_image, content_techs: content_techs });
}

const createContent = async (req, res) => {
  const decoded = decodeToken(req.headers.token)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded or invalid file type' });
  }

  const [content] = await sequelize.query(
    "INSERT INTO content (name, filename) VALUES (:name, :filename)",
    {
      replacements: {
        name: req.body.contentName,
        filename: req.file.filename,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );

  const [company_content] = await sequelize.query(
    "INSERT INTO company_content (company_id, content_id) VALUES (:company_id, :content_id)",
    {
      replacements: {
        company_id: decoded.companyId,
        content_id: content,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
  return res.json({
    id: content,
    name: req.body.contentName,
    filename: req.file.filename,
  });
}

const postQuestions = async (req, res) => {
  const decoded = decodeToken(req.headers.token)
  req.body.payload.forEach((q) => {
    if (q.id) {
      sequelize.query(
        `UPDATE questions 
            SET 
              content_id = :content_id,
              company_id = :company_id,
              question = :question,
              answer_a = :answer_a,
              answer_b = :answer_b,
              answer_c = :answer_c,
              answer_d = :answer_d,
              correct_answer = :correct_answer
            WHERE id = :id`,
        {
          replacements: {
            id: q.id,
            content_id: req.body.contentId,
            company_id: decoded.companyId,
            question: q.question,
            answer_a: q.answer_a,
            answer_b: q.answer_b,
            answer_c: q.answer_c,
            answer_d: q.answer_d,
            correct_answer: q.correct_answer,
          },
          type: sequelize.QueryTypes.UPDATE,
        }
      );
    } else {
      sequelize.query(
        `INSERT INTO questions 
    (content_id,company_id, question, answer_a, answer_b, answer_c, answer_d, correct_answer ) 
    VALUES (:content_id, :company_id, :question, :answer_a, :answer_b, :answer_c, :answer_d, :correct_answer)`,
        {
          replacements: {
            content_id: req.body.contentId,
            company_id: decoded.companyId,
            question: q.question,
            answer_a: q.answer_a,
            answer_b: q.answer_b,
            answer_c: q.answer_c,
            answer_d: q.answer_d,
            correct_answer: q.correct_answer,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      );
    }
  })

  return res.json({});

}

const deleteContent = (req, res) => {
  const decoded = decodeToken(req.headers.token)

  sequelize.query(
    `DELETE from company_content Where company_id=:company_id and content_id=:content_id`,
    {
      replacements: {
        content_id: req.body.contentId,
        company_id: decoded.companyId,
      },
      type: sequelize.QueryTypes.DELETE,
    }
  ).then(async () => {

    const [{ filename }] = await sequelize.query(
      `SELECT filename from content Where id=:content_id`,
      {
        replacements: {
          content_id: req.body.contentId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    const filePath = path.join(__dirname, '../public/content-files/' + filename);

    fs.unlink(filePath, (err) => {
      if (err) console.log(err)
      console.log('File deleted successfully');
    });

    sequelize.query(
      `DELETE from content Where id=:content_id`,
      {
        replacements: {
          content_id: req.body.contentId,
        },
        type: sequelize.QueryTypes.DELETE,
      }
    )

    sequelize.query(
      `DELETE from questions Where content_id=:content_id`,
      {
        replacements: {
          content_id: req.body.contentId,
        },
        type: sequelize.QueryTypes.DELETE,
      }
    )

    sequelize.query(
      `DELETE from user_tech_skills Where content_id=:content_id`,
      {
        replacements: {
          content_id: req.body.contentId,
        },
        type: sequelize.QueryTypes.DELETE,
      }
    )

    return res.json({});

  }).catch(() => {
    return res.status(500).json({});
  })
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
  createUser,
  createContent,
  postQuestions,
  deleteUser,
  deleteContent,
};
