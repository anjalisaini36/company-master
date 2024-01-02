const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "companymaster",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Save company data to MySQL
app.post("/", (req, res) => {
  const newCompany = {
    companyCode: req.body.companyCode,
    companyName: req.body.companyName,
    companyStatus: req.body.companyStatus,
  };

  if (
    !newCompany.companyCode ||
    !newCompany.companyName ||
    !newCompany.companyStatus
  ) {
    return res.status(400).json({
      error:
        "Company Code, Company Name, and Company Status are required fields.",
    });
  }

  db.query(
    "INSERT INTO test (companyCode, companyName, companyStatus) VALUES (?, ?, ?)",
    [newCompany.companyCode, newCompany.companyName, newCompany.companyStatus],
    (error, results) => {
      if (error) {
        console.error("Error inserting into MySQL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("Company inserted into MySQL:", results);
      res.status(201).json(newCompany);
    }
  );
});

// Fetch companies from MySQL
app.get("/", (req, res) => {
  db.query("SELECT * FROM test", (error, results) => {
    if (error) {
      console.error("Error fetching from MySQL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

app.put("/:id", (req, res) => {
  const companyId = req.params.id;

  if (!companyId) {
    return res.status(400).json({ error: "Company ID is required." });
  }

  const updatedCompany = {
    companyCode: req.body.companyCode,
    companyName: req.body.companyName,
    companyStatus: req.body.companyStatus,
  };

  if (
    !updatedCompany.companyCode ||
    !updatedCompany.companyName ||
    !updatedCompany.companyStatus
  ) {
    return res.status(400).json({
      error:
        "Company Code, Company Name, and Company Status are required fields.",
    });
  }

  db.query(
    "UPDATE test SET companyCode=?, companyName=?, companyStatus=? WHERE id=?",
    [
      updatedCompany.companyCode,
      updatedCompany.companyName,
      updatedCompany.companyStatus,
      companyId,
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating in MySQL:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("Company updated in MySQL:", results);
      res.json({ message: "Company updated successfully." });
    }
  );
});

app.delete("/:id", (req, res) => {
  const companyId = req.params.id;

  if (!companyId) {
    return res.status(400).json({ error: "Company ID is required." });
  }

  db.query("DELETE FROM test WHERE id = ?", [companyId], (error, results) => {
    if (error) {
      console.error("Error deleting from MySQL:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("Company deleted from MySQL:", results);
    res.json({ message: "Company deleted successfully." });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
