import { getDb } from "../db/mongo.js";

// Register
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const db = getDb();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
      username,
      email,
      password,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
      username,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
}

// Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const db = getDb();
    const usersCollection = db.collection("users");

    const user = await usersCollection.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
}
