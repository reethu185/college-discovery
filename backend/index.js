require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  res.send("College API connected to PostgreSQL");
});

app.get("/colleges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM colleges ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

app.get("/colleges/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM colleges WHERE id = $1",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "College not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});