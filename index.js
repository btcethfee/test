import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const FILE = "signups.json";

if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]");

app.post("/signup", (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName || !email || !phone) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const signups = JSON.parse(fs.readFileSync(FILE));
  signups.push({ fullName, email, phone, date: new Date().toISOString() });

  fs.writeFileSync(FILE, JSON.stringify(signups, null, 2));
  res.status(200).json({ message: "Signup received" });
});

app.get("/", (req, res) => res.send("BTC API Running"));

app.listen(PORT, () => {
  console.log(`✅ API running on http://localhost:${PORT}`);
});
