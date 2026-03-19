import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// Get all experience posts
export async function getAllExperiences(req, res) {
  try {
    const db = getDb();
    const experiences = await db.collection("experiences").find().sort({ createdAt: -1 }).toArray();
    res.json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
}

// Create a new experience post
export async function createExperience(req, res) {
  try {
    const { title, category, body, author } = req.body;
    const db = getDb();

    const newExperience = {
      title,
      category: category || "General",
      body,
      author: author || "Anonymous",
      replies: [],
      likes: [],
      createdAt: new Date(),
    };

    const result = await db.collection("experiences").insertOne(newExperience);
    res.status(201).json({ ...newExperience, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Failed to create experience" });
  }
}

// Add a reply to an experience post
export async function addReply(req, res) {
  try {
    const { id } = req.params;
    const { body, author } = req.body;
    const db = getDb();

    const reply = {
      _id: new ObjectId(),
      body,
      author: author || "Anonymous",
      createdAt: new Date(),
    };

    await db.collection("experiences").updateOne(
      { _id: new ObjectId(id) },
      { $push: { replies: reply } }
    );

    res.status(201).json(reply);
  } catch (error) {
    res.status(500).json({ error: "Failed to add reply" });
  }
}

// Delete an experience post
export async function deleteExperience(req, res) {
  try {
    const { id } = req.params;
    const db = getDb();
    await db.collection("experiences").deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete experience" });
  }
}

// Update an experience post
export async function updateExperience(req, res) {
  try {
    const { id } = req.params;
    const { title, category, body } = req.body;
    const db = getDb();

    await db.collection("experiences").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, category, body, updatedAt: new Date() } }
    );

    res.json({ message: "Experience updated" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update experience" });
  }
}

// Toggle like on an experience post
export async function toggleLike(req, res) {
  try {
    const { id } = req.params;
    const { username } = req.body;
    const db = getDb();

    const experience = await db.collection("experiences").findOne({ _id: new ObjectId(id) });
    if (!experience) return res.status(404).json({ error: "Experience not found" });

    const likes = experience.likes || [];
    const alreadyLiked = likes.includes(username);

    if (alreadyLiked) {
      await db.collection("experiences").updateOne(
        { _id: new ObjectId(id) },
        { $pull: { likes: username } }
      );
    } else {
      await db.collection("experiences").updateOne(
        { _id: new ObjectId(id) },
        { $push: { likes: username } }
      );
    }

    res.json({ liked: !alreadyLiked, likesCount: alreadyLiked ? likes.length - 1 : likes.length + 1 });
  } catch (error) {
    res.status(500).json({ error: "Failed to toggle like" });
  }
}
