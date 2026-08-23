// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import User from "../models/user.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         // Check if user already exists by email
//         let user = await User.findOne({ email });
//         if (!user) {
//           // Create new user
//           user = await User.create({
//             googleId: profile.id,
//             name: profile.displayName,
//             email,
//             avatar: profile.photos[0].value,
//             authProvider: "google",
//             accountVerified: true,
//             isLoggedIn: true,
//           });
//         } else {
//           // Update existing user
//           user.googleId = profile.id;
//           user.isLoggedIn = true;
//           await user.save();

//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error, null);
//       }
//     }
//   )
// );
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        if (!email) {
          return done(null, false);
        }

        const googleId = profile.id;

        const name =
          profile.displayName ||
          `${profile.name?.givenName || ""} ${
            profile.name?.familyName || ""
          }`.trim() ||
          "Google User";

        const avatarUrl = profile.photos?.[0]?.value || "";

        // Find user by email
        let user = await User.findOne({ email });

        // ==========================================
        // EXISTING USER
        // ==========================================

        if (user) {
          // Deleted account
          if (user.isDeleted) {
            return done(null, false);
          }

          // Connect Google with existing account
          user.googleId = googleId;
          user.authProvider = "google";
          user.accountVerified = true;

          // Update name only if empty
          if (!user.name) {
            user.name = name;
          }

          // Update avatar
          if (avatarUrl) {
            user.avatar = {
              url: avatarUrl,
              publicId: user.avatar?.publicId || "",
            };
          }

          await user.save();

          return done(null, user);
        }

        // ==========================================
        // NEW GOOGLE USER
        // ==========================================

        user = await User.create({
          name,
          email,

          // No password required for Google users
          authProvider: "google",

          role: "patient",

          googleId,

          accountVerified: true,

          avatar: {
            url: avatarUrl,
            publicId: "",
          },

          isDeleted: false,
          status: "active",
        });

        return done(null, user);
      } catch (error) {
        console.error("GOOGLE PASSPORT ERROR:", error);
        return done(error, null);
      }
    }
  )
);