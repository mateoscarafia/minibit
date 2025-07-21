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

  try {
    const decoded = decodeToken(req.headers.token)
    const userAnswers = req.body.userAnswers;
    const contentId = req.body.contentId;
    var questions_answered_ok = 0;

    const [results] = await sequelize.query(
      "SELECT * FROM user_tech_skills WHERE user_id = :user_id AND content_id = :content_id AND safety_save IS NULL ORDER BY id DESC LIMIT 1",
      {
        replacements: {
          user_id: decoded.userId,
          content_id: contentId,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );
    if (results) {
      const referenceDate = new Date(results.created);
      const currentDate = new Date();
      const oneWeekLater = new Date(referenceDate);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      if (currentDate < oneWeekLater) {
        sequelize.query(
          `DELETE FROM user_tech_skills WHERE user_id=:user_id AND content_id=:content_id AND safety_save IS NOT NULL;`,
          {
            replacements: {
              user_id: decoded.userId,
              content_id: Number(contentId),
            },
            type: sequelize.QueryTypes.DELETE,
          }
        );
        sequelize.query(
          `INSERT INTO user_tech_skills (user_id, content_id, score) 
        VALUES (:user_id, :content_id,  :score);`,
          {
            replacements: {
              user_id: decoded.userId,
              content_id: Number(contentId),
              score: 0,
            },
            type: sequelize.QueryTypes.INSERT,
          }
        );
        return res.json({ resultado: 0 });
      }
    }
    if (!userAnswers.length) {
      sequelize.query(
        `DELETE FROM user_tech_skills WHERE user_id=:user_id AND content_id=:content_id AND safety_save IS NOT NULL;`,
        {
          replacements: {
            user_id: decoded.userId,
            content_id: Number(contentId),
          },
          type: sequelize.QueryTypes.DELETE,
        }
      );
      sequelize.query(
        `INSERT INTO user_tech_skills (user_id, content_id, score) 
        VALUES (:user_id, :content_id,  :score);`,
        {
          replacements: {
            user_id: decoded.userId,
            content_id: Number(contentId),
            score: 0,
          },
          type: sequelize.QueryTypes.INSERT,
        }
      );
      return res.json({ resultado: 0 });
    }

    const questions_correct_answers = await sequelize.query(
      `SELECT id, correct_answer
      FROM questions
      WHERE company_id = :company_id AND content_id= :content_id
      AND TRIM(question) != ''
      AND TRIM(answer_a) != ''
      AND TRIM(answer_b) != ''
      AND TRIM(answer_c) != ''
      AND TRIM(answer_d) != ''
      AND TRIM(correct_answer) != ''
      `,
      {
        replacements: {
          company_id: decoded.companyId,
          content_id: Number(contentId),
        },
        type: sequelize.QueryTypes.SELECT,
      }
    )

    userAnswers.forEach((answer) => {
      const splitted = answer.split("---")
      const id = Number(splitted[0])
      const value = splitted[1]
      if ((questions_correct_answers.filter((asw) => asw.id == id && asw.correct_answer == value)).length) {
        questions_answered_ok++
      }
    })

    const finalResult = (questions_answered_ok * 100) / questions_correct_answers.length;
    sequelize.query(
      `DELETE FROM user_tech_skills WHERE user_id=:user_id AND content_id=:content_id AND safety_save IS NOT NULL;`,
      {
        replacements: {
          user_id: decoded.userId,
          content_id: Number(contentId),
        },
        type: sequelize.QueryTypes.DELETE,
      }
    );
    await sequelize.query(
      `INSERT INTO user_tech_skills (user_id, content_id, score) 
        VALUES (:user_id, :content_id,  :score);`,
      {
        replacements: {
          user_id: decoded.userId,
          content_id: Number(contentId),
          score: Math.floor(finalResult),
        },
        type: sequelize.QueryTypes.INSERT,
      }
    );
    return res.json({ resultado: Math.floor(finalResult) });
  } catch (err) {
    res.status(500).json()
  }
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
  res.render("tech_content", { techs: techs, background_image: background_image, user_email: decoded.email });
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
  const decoded = decodeToken(req.body.token)
  const [results] = await sequelize.query(
    "SELECT * FROM user_tech_skills WHERE user_id = :user_id AND content_id = :content_id AND safety_save IS NULL ORDER BY id DESC LIMIT 1",
    {
      replacements: {
        user_id: decoded.userId,
        content_id: req.body.contentId,
      },
      type: sequelize.QueryTypes.SELECT,
    }
  );
  if (!results) { saveExamZeroResult(decoded.userId, req.body.contentId); return res.status(200).send({}); }
  const referenceDate = new Date(results.created);
  const currentDate = new Date();
  const oneWeekLater = new Date(referenceDate);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7);
  if (currentDate >= oneWeekLater) { saveExamZeroResult(decoded.userId, req.body.contentId); return res.status(200).send({}); }
  return res.status(400).send({});
};


const saveExamZeroResult = async (userId, contentId) => {
  await sequelize.query(
    `INSERT INTO user_tech_skills (user_id, content_id, score, safety_save) 
        VALUES (:user_id, :content_id,  :score, "is_for_safety");`,
    {
      replacements: {
        user_id: userId,
        content_id: Number(contentId),
        score: 0,
      },
      type: sequelize.QueryTypes.INSERT,
    }
  );
}

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

const loadExamData = async (req, res) => {
  const decoded = decodeToken(req.params.token)
  const contentId = req.params.content_id
  const questions = await sequelize.query(
    `SELECT id, question, answer_a, answer_b, answer_c, answer_d, correct_answer
      FROM questions
      WHERE company_id = :company_id AND content_id= :content_id
      AND TRIM(question) != ''
      AND TRIM(answer_a) != ''
      AND TRIM(answer_b) != ''
      AND TRIM(answer_c) != ''
      AND TRIM(answer_d) != ''
      AND TRIM(correct_answer) != ''
      `,
    {
      replacements: {
        company_id: decoded.companyId,
        content_id: Number(contentId),
      },
      type: sequelize.QueryTypes.SELECT,
    }
  )
  if (!questions.length) return res.status(500).json({});

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

  return res.render("exam", { questions: questions, background_image: background_image, content_id: contentId });
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
  loadExamData,
};
