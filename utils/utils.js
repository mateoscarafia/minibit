const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require('multer');
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
      companyId: user.company_id,
      email: user.email,
    },
    secretKey,
    { expiresIn: "5h" }
  );
};

const generateTokenAdmin = (company) => {
  return jwt.sign(
    {
      companyId: company.id,
      isCompany: true,
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
    return decoded;
  });
};

const uploadDir = path.join(__dirname, '../public/content-files');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const randomName = Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
    cb(null, `${randomName}.pdf`);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  }
});

const transformQuestions = (questions) => {
  // Group questions by content_id
  const grouped = questions.reduce((acc, question) => {
    const { content_id, name, ...rest } = question;

    if (!acc[content_id]) {
      acc[content_id] = {
        content_id,
        name,
        answers: []
      };
    }

    acc[content_id].answers.push(rest);
    return acc;
  }, {});

  // Convert the grouped object into an array
  return Object.values(grouped);
}

module.exports = {
  loadGameData,
  gameStarter,
  generateToken,
  secretKey,
  decodeToken,
  generateTokenAdmin,
  storage,
  upload,
  transformQuestions
};
