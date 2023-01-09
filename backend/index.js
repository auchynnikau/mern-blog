import express from "express";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("");
});

app.post("/auth/login", (req, res) => {
  const token = jwt.sign(
    {
      email: req.body.email,
      fullName: "user",
    },
    "secretKey"
  );

  res.json({
    success: true,
    token,
  });
});

app.listen(3000, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log("Server is running!");
});
