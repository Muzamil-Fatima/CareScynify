import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        // Check if user already exists by email
        let user = await User.findOne({ email });
        if (!user) {
          // Create new user
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email,
            avatar: profile.photos[0].value,
            authProvider: "google",
            accountVerified: true,
            isLoggedIn: true,
          });
        } else {
          // Update existing user
          user.googleId = profile.id;
          user.isLoggedIn = true;
          await user.save();

        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
