import dotenv from "dotenv";
dotenv.config();

import { connectToDatabase } from "../db/mongo.js";
import { ObjectId } from "mongodb";


// Get date randomly 
function getRandomDate(daysBack = 365) {
  const now = new Date();
  const past = new Date(
    now.getTime() - Math.random() * daysBack * 24 * 60 * 60 * 1000
  );
  return past;
}


// 10 dummy users (user1 to user10, password: 123456)
const seedUsers = [];
for (let i = 1; i <= 10; i++) {
  seedUsers.push({
    username: `user${i}`,
    email: `user${i}@example.com`,
    password: "123456",
    createdAt: getRandomDate(),
  });
}

// -------------- Sample experience posts ------------------
const seedExperiences = [
  {
    title: "My Amazon SDE Interview Experience",
    category: "Software Engineering",
    body: "I had 4 rounds — 1 online assessment and 3 virtual interviews. The OA had 2 coding questions on arrays and trees. The virtual rounds focused on leadership principles and system design. They asked about scalable architecture and how to design a URL shortener. Overall a challenging but fair process. I prepared using LeetCode and Grokking the System Design Interview.",
    author: "user1",
    replies: [
      { _id: new ObjectId(), body: "Thanks for sharing! What kind of system design question did they ask?", author: "user3", createdAt: getRandomDate() },
      { _id: new ObjectId(), body: "I had a similar experience. The behavioral round was the toughest for me.", author: "user5", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "Transitioning from Marketing to Tech",
    category: "General",
    body: "After 5 years in marketing, I decided to switch to tech. I spent 6 months learning web development through online courses and bootcamps. The hardest part was answering behavioral questions about why I was making the switch. I recommend focusing on transferable skills like project management, data analysis, and communication.",
    author: "user2",
    replies: [
      { _id: new ObjectId(), body: "This is so inspiring! I'm also trying to make the switch. Any course recommendations?", author: "user7", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "Google Product Manager Interview",
    category: "Product Management",
    body: "The PM interview at Google was intense. There were product design, estimation, and analytical questions. Prep tip: practice structuring your answers using frameworks like CIRCLES. They asked me to design a new feature for Google Maps and estimate the number of gas stations in the US. The key is structured thinking and clear communication.",
    author: "user3",
    replies: [
      { _id: new ObjectId(), body: "Did they ask any technical questions for the PM role?", author: "user4", createdAt: getRandomDate() },
      { _id: new ObjectId(), body: "CIRCLES framework is a game changer. Thanks for the tip!", author: "user6", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "My First Data Science Interview at Netflix",
    category: "Data Science",
    body: "Netflix's DS interview had 5 rounds: recruiter screen, take-home assignment, 2 technical, and a culture fit. The take-home was about analyzing A/B test results for a recommendation feature. Technical rounds covered SQL, statistics, and ML concepts. They really value experimentation and data-driven decision making.",
    author: "user4",
    replies: [
      { _id: new ObjectId(), body: "How long was the take-home assignment? I always worry about time commitment.", author: "user8", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "Frontend Developer Interview at Spotify",
    category: "Software Engineering",
    body: "Spotify's frontend interview was unique. They had a pair programming round where we built a small music player component together. They used React and TypeScript. The focus was on clean code practices, accessibility, and performance optimization. They also asked about state management and how I would handle real-time updates.",
    author: "user5",
    replies: [
      { _id: new ObjectId(), body: "That sounds like a great interview format! Much better than whiteboard coding.", author: "user1", createdAt: getRandomDate() },
      { _id: new ObjectId(), body: "Did they test CSS skills as well?", author: "user9", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "Tips for Behavioral Interviews at FAANG",
    category: "General",
    body: "After interviewing at 4 FAANG companies, here are my tips: 1) Use the STAR method religiously, 2) Prepare 8-10 stories that cover leadership, conflict, failure, and teamwork, 3) Be specific with numbers and impact, 4) Always have questions prepared for interviewers, 5) Practice with a friend or use interview recording tools.",
    author: "user6",
    replies: [
      { _id: new ObjectId(), body: "The STAR method tip is gold. Can you share an example of a good story structure?", author: "user2", createdAt: getRandomDate() },
      { _id: new ObjectId(), body: "I would add: research the company's values and align your stories to them.", author: "user10", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "My Internship Interview at Microsoft",
    category: "Software Engineering",
    body: "As a CS student, I interviewed for a SWE intern position at Microsoft. There were 2 coding rounds and 1 behavioral. Coding questions were medium-difficulty LeetCode problems — one on graphs and one on dynamic programming. The behavioral round focused on teamwork and how I handle ambiguity. I got the offer!",
    author: "user7",
    replies: [
      { _id: new ObjectId(), body: "Congratulations! How long did you prep for it?", author: "user3", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "UX Design Interview at Airbnb",
    category: "Design",
    body: "Airbnb's design interview included a portfolio review, a whiteboard design challenge, and a cross-functional collaboration round. For the design challenge, they asked me to redesign the host onboarding experience. Key things they look for: empathy for users, ability to articulate design decisions, and willingness to iterate based on feedback.",
    author: "user8",
    replies: [],
    createdAt: getRandomDate(),
  },
  {
    title: "Breaking Into Finance from a Non-Finance Background",
    category: "Finance",
    body: "I transitioned from engineering to investment banking. The interview process was grueling — multiple rounds of technical questions on DCF, LBO models, and market sizing. I studied for 3 months using Wall Street Prep and Rosenbaum's textbook. The key was showing genuine passion for finance and demonstrating analytical skills.",
    author: "user9",
    replies: [
      { _id: new ObjectId(), body: "How did you network your way into getting interviews?", author: "user2", createdAt: getRandomDate() },
      { _id: new ObjectId(), body: "Great story! I'm an engineer looking to do the same. Would love to connect.", author: "user4", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
  {
    title: "Remote Interview Tips — What I Learned the Hard Way",
    category: "General",
    body: "After doing 15+ remote interviews, here's what I wish I knew: 1) Test your setup the night before, 2) Use a wired internet connection if possible, 3) Have a clean, well-lit background, 4) Keep notes on a sticky note near your camera (not on screen), 5) Look at the camera, not the screen, when answering, 6) Have water nearby. Small things make a big difference!",
    author: "user10",
    replies: [
      { _id: new ObjectId(), body: "The sticky note tip is genius! I always end up looking away from the camera.", author: "user1", createdAt: getRandomDate() },
    ],
    createdAt: getRandomDate(),
  },
];

// Expanding to 1000 records based on the original posts
const categories = [
  "Software Engineering",
  "Data Science",
  "Product Management",
  "Design",
  "Finance",
  "General",
];

const sampleBodies = [
  "The interview focused heavily on data structures and problem solving. I was asked to solve a graph problem using BFS.",
  "Most of the questions were behavioral. Make sure you prepare stories using the STAR method.",
  "I was given a system design question about designing a scalable chat application.",
  "The interviewer asked me to optimize an algorithm and explain time complexity.",
  "There was a strong focus on communication and explaining my thought process clearly.",
  "I struggled with one coding question but the interviewer helped guide me.",
  "Make sure to practice SQL queries and joins for data-related roles.",
  "The process included a take-home assignment followed by technical discussion.",
];

for (let i = 1; i <= 998; i++) {
  seedExperiences.push({
    title: `Interview Experience ${i}`,
    category: categories[i % categories.length],
    body: sampleBodies[i % sampleBodies.length],
    author: `user${(i % 10) + 1}`,
    replies: [],
    createdAt: getRandomDate(),
  });
}

// ----------------- Interview questions samples ------------------
const seedQuestions = [];

const qCategories = ["Behavioral", "Technical", "System Design", "General"];

const sampleQuestions = [
  "Tell me about a time you handled conflict.",
  "What is the time complexity of quicksort?",
  "Design a URL shortener.",
  "Explain React useEffect.",
  "How do you optimize database queries?",
];

const sampleAnswers = [
  "Use STAR method to structure your answer.",
  "Average time complexity is O(n log n).",
  "Use hashing and database mapping.",
  "useEffect handles side effects.",
  "Use indexing and caching.",
];

for (let i = 1; i <= 1000; i++) {
  seedQuestions.push({
    title: `Interview Question ${i}`,
    category: qCategories[i % qCategories.length],
    question: sampleQuestions[i % sampleQuestions.length],
    author: `user${(i % 10) + 1}`,
    answers: [
      {
        _id: new ObjectId(),
        body: sampleAnswers[i % sampleAnswers.length],
        author: "user1",
        createdAt: getRandomDate(),
      },
    ],
    createdAt: getRandomDate(),
  });
}

// ---------------- Seed function ------------------
async function seed() {
  const db = await connectToDatabase();

  await db.collection("users").deleteMany({});
  await db.collection("experiences").deleteMany({});
  await db.collection("questions").deleteMany({});

  await db.collection("users").insertMany(seedUsers);
  console.log("Inserted users");

  await db.collection("experiences").insertMany(seedExperiences);
  console.log("Inserted experiences");

  await db.collection("questions").insertMany(seedQuestions);
  console.log("Inserted questions");

  console.log("DONE! Database seeded.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});


console.log("URI:", process.env.MONGODB_URI);
