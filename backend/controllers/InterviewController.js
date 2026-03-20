import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";

/* Get all questions */
export async function getAllQuestions(req, res) {
  try {
    const db = getDb();

    const questions = await db
      .collection("questions")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
}

/* Create */
export async function createQuestion(req, res) {
  try {
    const { title, category, question, answer, author } = req.body;
    const db = getDb();

    const newQuestion = {
      title,
      category: category || "General",
      question,
      author: author || "Anonymous",

      answers: answer
        ? [
            {
              _id: new ObjectId(),
              body: answer,
              author: author || "Anonymous",
              createdAt: new Date(),
            },
          ]
        : [],

      createdAt: new Date(),
    };

    const result = await db.collection("questions").insertOne(newQuestion);

    res.status(201).json({ ...newQuestion, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create question" });
  }
}

/* Add answer */
export async function addAnswer(req, res) {
  try {
    const { id } = req.params;
    const { body, author } = req.body;
    const db = getDb();

    const answer = {
      _id: new ObjectId(),
      body,
      author: author || "Anonymous",
      createdAt: new Date(),
    };

    await db.collection("questions").updateOne(
      { _id: new ObjectId(id) },
      { $push: { answers: answer } }
    );

    res.status(201).json(answer);
  } catch (error) {
    res.status(500).json({ error: "Failed to add answer" });
  }
}

/* Delete */
export async function deleteQuestion(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();

    await db.collection("questions").deleteOne({
      _id: new ObjectId(id),
    });

    res.json({ message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete question" });
  }
}

/* Update */
export async function updateQuestion(req, res) {
  try {
    const { id } = req.params;
    const { title, category, question } = req.body;
    const db = getDb();

    await db.collection("questions").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title,
          category,
          question,
          updatedAt: new Date(),
        },
      }
    );

    res.json({ message: "Question updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update question" });
  }
}