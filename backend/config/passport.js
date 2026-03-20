import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getDb } from "../db/mongo.js";
import { ObjectId } from "mongodb";

// Login by using email
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const db = getDb();
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        if (user.password !== password) {
          return done(null, false, { message: "Wrong password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Session saves user id
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

// Get user by id
passport.deserializeUser(async (id, done) => {
  try {
    const db = getDb();
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;