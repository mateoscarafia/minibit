const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const {
  contentPage,
  adminPage,
  login,
  loginAdmin,
  verifyToken,
  saveExamResult,
  checkExamDate,
  createUser,
  createContent,
  postQuestions,
  deleteUser,
  deleteContent,
  loadExamData
} = require("./controllers/controllers");

const { upload } = require("./utils/utils");

// SETTINGS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MIDDLEWARES
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/// ENDPOINTS  //////////////////////////////////////////
// GET ENDPOINTS //
app.get("/exam/:content_id/:token", loadExamData);
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/content/:token", contentPage);
app.get("/verify-token/:token", verifyToken);
app.get("/admin/:token", adminPage);

// POST ENDPOINTS //
app.post("/login", login);
app.post("/login-admin", loginAdmin);
app.post("/save-exam-result", saveExamResult);
app.post("/check-exam-date", checkExamDate);
app.post("/post-questions", postQuestions);
app.post("/create-user", createUser);
app.post("/delete-user", deleteUser);
app.post("/delete-content", deleteContent);
app.post('/create-content', upload.single('pdfFile'), createContent);

// Error handling middleware
app.use((err, req, res, next) => {
  return res.status(500).json({ error: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});