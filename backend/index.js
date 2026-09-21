const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors=require("cors")

const Goal = require("./schema/Goal");

app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/goals", async (req, res) => {
  console.log(req.body);
  const { title } = req.body;
  const goal = new Goal({ title });
  await goal.save();
  res.status(201).json(goal);
});

app.get("/goals", async (req, res) => {
  const goals = await Goal.find({});
  res.json(goals);
});

app.delete("/goals", async (req, res) => {
  const { _id } = req.body;
  await Goal.deleteOne({ _id: _id });
  res.json({ message: "Goal deleted" });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@mongodb:27017/goals?authSource=admin`,
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });
