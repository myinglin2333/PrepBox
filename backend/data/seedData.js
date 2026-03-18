import { connectToDatabase } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// 10 dummy users (user1 to user10, password: 123456)
const seedUsers = [];
for (let i = 1; i <= 10; i++) {
  seedUsers.push({
    username: `user${i}`,
    email: `user${i}@example.com`,
    password: "123456",
    createdAt: new Date(),
  });
}

// Sample experience posts
const seedExperiences = [
  {
    title: "My Amazon SDE Interview Experience",
    category: "Software Engineering",
    body: "I had 4 rounds — 1 online assessment and 3 virtual interviews. The OA had 2 coding questions on arrays and trees. The virtual rounds focused on leadership principles and system design. They asked about scalable architecture and how to design a URL shortener. Overall a challenging but fair process. I prepared using LeetCode and Grokking the System Design Interview.",
    author: "user1",
    replies: [
      { _id: new ObjectId(), body: "Thanks for sharing! What kind of system design question did they ask?", author: "user3", createdAt: new Date() },
      { _id: new ObjectId(), body: "I had a similar experience. The behavioral round was the toughest for me.", author: "user5", createdAt: new Date() },
    ],
    createdAt: new Date("2026-03-10"),
  },
  {
    title: "Transitioning from Marketing to Tech",
    category: "General",
    body: "After 5 years in marketing, I decided to switch to tech. I spent 6 months learning web development through online courses and bootcamps. The hardest part was answering behavioral questions about why I was making the switch. I recommend focusing on transferable skills like project management, data analysis, and communication.",
    author: "user2",
    replies: [
      { _id: new ObjectId(), body: "This is so inspiring! I'm also trying to make the switch. Any course recommendations?", author: "user7", createdAt: new Date() },
    ],
    createdAt: new Date("2026-03-08"),
  },
  {
    title: "Google Product Manager Interview",
    category: "Product Management",
    body: "The PM interview at Google was intense. There were product design, estimation, and analytical questions. Prep tip: practice structuring your answers using frameworks like CIRCLES. They asked me to design a new feature for Google Maps and estimate the number of gas stations in the US. The key is structured thinking and clear communication.",
    author: "user3",
    replies: [
      { _id: new ObjectId(), body: "Did they ask any technical questions for the PM role?", author: "user4", createdAt: new Date() },
      { _id: new ObjectId(), body: "CIRCLES framework is a game changer. Thanks for the tip!", author: "user6", createdAt: new Date() },
    ],
    createdAt: new Date("2026-03-05"),
  },
  {
    title: "My First Data Science Interview at Netflix",
    category: "Data Science",
    body: "Netflix's DS interview had 5 rounds: recruiter screen, take-home assignment, 2 technical, and a culture fit. The take-home was about analyzing A/B test results for a recommendation feature. Technical rounds covered SQL, statistics, and ML concepts. They really value experimentation and data-driven decision making.",
    author: "user4",
    replies: [
      { _id: new ObjectId(), body: "How long was the take-home assignment? I always worry about time commitment.", author: "user8", createdAt: new Date() },
    ],
    createdAt: new Date("2026-03-03"),
  },
  {
    title: "Frontend Developer Interview at Spotify",
    category: "Software Engineering",
    body: "Spotify's frontend interview was unique. They had a pair programming round where we built a small music player component together. They used React and TypeScript. The focus was on clean code practices, accessibility, and performance optimization. They also asked about state management and how I would handle real-time updates.",
    author: "user5",
    replies: [
      { _id: new ObjectId(), body: "That sounds like a great interview format! Much better than whiteboard coding.", author: "user1", createdAt: new Date() },
      { _id: new ObjectId(), body: "Did they test CSS skills as well?", author: "user9", createdAt: new Date() },
    ],
    createdAt: new Date("2026-03-01"),
  },
  {
    title: "Tips for Behavioral Interviews at FAANG",
    category: "General",
    body: "After interviewing at 4 FAANG companies, here are my tips: 1) Use the STAR method religiously, 2) Prepare 8-10 stories that cover leadership, conflict, failure, and teamwork, 3) Be specific with numbers and impact, 4) Always have questions prepared for interviewers, 5) Practice with a friend or use interview recording tools.",
    author: "user6",
    replies: [
      { _id: new ObjectId(), body: "The STAR method tip is gold. Can you share an example of a good story structure?", author: "user2", createdAt: new Date() },
      { _id: new ObjectId(), body: "I would add: research the company's values and align your stories to them.", author: "user10", createdAt: new Date() },
    ],
    createdAt: new Date("2026-02-28"),
  },
  {
    title: "My Internship Interview at Microsoft",
    category: "Software Engineering",
    body: "As a CS student, I interviewed for a SWE intern position at Microsoft. There were 2 coding rounds and 1 behavioral. Coding questions were medium-difficulty LeetCode problems — one on graphs and one on dynamic programming. The behavioral round focused on teamwork and how I handle ambiguity. I got the offer!",
    author: "user7",
    replies: [
      { _id: new ObjectId(), body: "Congratulations! How long did you prep for it?", author: "user3", createdAt: new Date() },
    ],
    createdAt: new Date("2026-02-25"),
  },
  {
    title: "UX Design Interview at Airbnb",
    category: "Design",
    body: "Airbnb's design interview included a portfolio review, a whiteboard design challenge, and a cross-functional collaboration round. For the design challenge, they asked me to redesign the host onboarding experience. Key things they look for: empathy for users, ability to articulate design decisions, and willingness to iterate based on feedback.",
    author: "user8",
    replies: [],
    createdAt: new Date("2026-02-22"),
  },
  {
    title: "Breaking Into Finance from a Non-Finance Background",
    category: "Finance",
    body: "I transitioned from engineering to investment banking. The interview process was grueling — multiple rounds of technical questions on DCF, LBO models, and market sizing. I studied for 3 months using Wall Street Prep and Rosenbaum's textbook. The key was showing genuine passion for finance and demonstrating analytical skills.",
    author: "user9",
    replies: [
      { _id: new ObjectId(), body: "How did you network your way into getting interviews?", author: "user2", createdAt: new Date() },
      { _id: new ObjectId(), body: "Great story! I'm an engineer looking to do the same. Would love to connect.", author: "user4", createdAt: new Date() },
    ],
    createdAt: new Date("2026-02-20"),
  },
  {
    title: "Remote Interview Tips — What I Learned the Hard Way",
    category: "General",
    body: "After doing 15+ remote interviews, here's what I wish I knew: 1) Test your setup the night before, 2) Use a wired internet connection if possible, 3) Have a clean, well-lit background, 4) Keep notes on a sticky note near your camera (not on screen), 5) Look at the camera, not the screen, when answering, 6) Have water nearby. Small things make a big difference!",
    author: "user10",
    replies: [
      { _id: new ObjectId(), body: "The sticky note tip is genius! I always end up looking away from the camera.", author: "user1", createdAt: new Date() },
    ],
    createdAt: new Date("2026-02-18"),
  },
];

async function seed() {
  const db = await connectToDatabase();

  // Seed users
  const usersCollection = db.collection("users");
  await usersCollection.deleteMany({});
  await usersCollection.insertMany(seedUsers);
  console.log(`Inserted ${seedUsers.length} dummy users (user1-user10, password: 123456)`);

  // Seed experiences
  const experiencesCollection = db.collection("experiences");
  await experiencesCollection.deleteMany({});
  await experiencesCollection.insertMany(seedExperiences);
  console.log(`Inserted ${seedExperiences.length} sample experiences`);

  console.log("\nDone! You can now log in with user1/123456 through user10/123456");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
