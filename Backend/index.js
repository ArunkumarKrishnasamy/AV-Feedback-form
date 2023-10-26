const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
const pool = require("./db");

// Routes
// Insert questions into DB
app.post("/questions", async (req, res) => {
  try {
    let { question } = req.body;
    console.log(req.body);

    const addquestion = await pool.query(
      "INSERT INTO questionnaire (question) VALUES ($1) RETURNING *",
      [question]
    );
    res.status(201).send(addquestion.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Get Questions from db

app.get("/questions", async (req, res) => {
  try {
    const getquestion = await pool.query("SELECT * FROM questionnaire");
    res.status(200).send(getquestion.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
// Post users to DB
app.post("/users", async (req, res) => {
  const { username, email } = req.body;
  try {
    const adduser = await pool.query(
      "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *",
      [username, email]
    );
    res.status(201).send(adduser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Add user error");
  }
});
// Get users from DB
app.get("/users", async (req, res) => {
  try {
    const getusers = await pool.query("SELECT * FROM users");
    res.status(200).send(getusers.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Get users error");
  }
});

// Post Answers to DB
app.post("/response", async (req, res) => {
  try {
    let { question_id, response, user_id } = req.body;
    console.log(req.body);

    const addresponse = await pool.query(
      "INSERT INTO feedback_response ( question_id, response, user_id) VALUES ($1, $2, $3) RETURNING *",
      [question_id, response, user_id]
    );
    res.status(201).send(addresponse.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log("Web server is running on port 3001");
});
