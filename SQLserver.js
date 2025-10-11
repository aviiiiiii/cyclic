const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const odbc = require("odbc");

dotenv.config();
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ====================== CONFIG ======================
const DSN_NAME = "tosca_demo";
const DB_USER = "sa";
const DB_PASS = "Password@123";
const PORT = 5050;

let pool;

// ====================== CONNECT DB WITH POOL ======================
async function connectDB() {
  try {
    const connectionString = `DSN=${DSN_NAME};Uid=${DB_USER};Pwd=${DB_PASS};`;
    pool = await odbc.pool(connectionString, { max: 10 }); // max 10 connections in the pool
    console.log("✅ Connected to SQL Server via ODBC Pool");
  } catch (err) {
    console.error("❌ ODBC Pool Connection Error:", err);
  }
}

// ====================== BASIC TEST ======================
app.get("/", (req, res) => {
  res.send("Working");
});

// ====================== VEHICLE LIST ======================
app.get("/getVehicleList", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM VehicleList ORDER BY dateFormated DESC");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching vehicles");
  }
});

app.get("/getVehicleListWithfilter/:value", async (req, res) => {
  const { value } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM VehicleList WHERE number LIKE ? ORDER BY dateFormated DESC`,
      [`%${value}%`]
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching vehicles");
  }
});

app.get("/getVehicleListWithfilter2/:value", async (req, res) => {
  const { value } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM VehicleList WHERE toll LIKE ? ORDER BY dateFormated DESC`,
      [`%${value}%`]
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching vehicles");
  }
});

app.post("/postVehicle", async (req, res) => {
  const { type, number, date, toll, tariff, dateFormated } = req.body;

  if (!type || !number || !date || !toll || !tariff || !dateFormated) {
    return res.status(400).json({ error: "Failed to insert vehicle" });
  }

  try {
    await pool.query(
      `INSERT INTO VehicleList (type, number, date, toll, tariff, dateFormated)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [type, number, date, toll, tariff, dateFormated]
    );
    res.status(201).json({ message: "Vehicle inserted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to insert vehicle" });
  }
});

// ====================== TOLL LIST ======================
app.get("/getTollList", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM TollList ORDER BY name ASC");
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tolls");
  }
});

app.get("/getTollListWithfilter/:value", async (req, res) => {
  const { value } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM TollList WHERE name LIKE ? ORDER BY name ASC`,
      [`%${value}%`]
    );
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching tolls");
  }
});

app.post("/postToll", async (req, res) => {
  const b = req.body;
  if (
    !b.name ||
    b.carSingle == null ||
    b.carReturn == null ||
    b.lcvSingle == null ||
    b.lcvReturn == null ||
    b.truckSingle == null ||
    b.truckReturn == null ||
    b.heavySingle == null ||
    b.heavyReturn == null
  ) {
    return res.status(400).json({ error: "Failed to insert toll" });
  }

  try {
    await pool.query(
      `INSERT INTO TollList 
       (name, carSingle, carReturn, lcvSingle, lcvReturn, truckSingle, truckReturn, heavySingle, heavyReturn)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        b.name,
        b.carSingle,
        b.carReturn,
        b.lcvSingle,
        b.lcvReturn,
        b.truckSingle,
        b.truckReturn,
        b.heavySingle,
        b.heavyReturn,
      ]
    );
    res.status(201).json({ message: "Toll inserted successfully" });
  } catch (err) {

    const hasUniqueKeyViolation = err.odbcErrors?.some(e =>
      e.message.includes("Violation of UNIQUE KEY")
    );

    if (hasUniqueKeyViolation) {
      res.status(400).json({ error: "Duplicate entry not allowed" });
    } else {
      console.error(err);
      res.status(500).json({ error: "Failed to insert toll" });
    }

  }
});

app.delete("/deleteToll/:delVal", async (req, res) => {
  const { delVal } = req.params;
  try {
    const result = await pool.query(`DELETE FROM TollList WHERE name = ?`, [delVal]);
    if (result.count === 0) return res.status(404).json({ message: "Toll not found" });
    res.status(200).json({ message: "Toll deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Deleting Toll Failed" });
  }
});

app.listen(PORT, async () => {
  console.log(`🚀 Server started on port ${PORT}`);
  await connectDB();
});
