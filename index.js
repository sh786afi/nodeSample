import express from "express";
import morgan from "morgan";
import mongoose, { mongo } from "mongoose";
import Joi from "joi";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  if (req.query.name) {
    res.send(req.query.name);
  } else {
    res.send("Hellow");
  }
});

app.post("/user", (req, res) => {
  let userData = [];

  const userSchema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .min(10)
      .max(30)
      .required()
  };

  const validateData = Joi.validate(req.body, userSchema);
  if (validateData.error) {
    res.status(400).send(validateData.error.details[0].message);
  } else {
    const { name, email } = req.body;
    const userObj = {
      name,
      email
    };
    userData.push(userObj);
    res.status(200).send(userData);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
