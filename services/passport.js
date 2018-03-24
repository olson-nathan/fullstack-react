const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const {
    googleClientID,
    googleClientSecret
} = require('../config/keys');

// Get mongoose model for our users collection
const User = mongoose.model('users');

// determine how to serialize user using passport
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// passport deserialize user function that accepts an id
// finds a user from the collection and calls done
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// define our passport google oauth strategy
passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    // create a user object that we use to query and create users
    const userObject = {
        googleId: profile.id
    }
    // search if a user exists with googleId = profile.id
    User.findOne(userObject).then(existingUser => {
        if (existingUser) {
            console.log('found existing user::', existingUser);
            // we already have a record with a given profile.id
            // callback to passport with the existingUser object
            done(null, existingUser);
        } else {
            // no record with this ID, make a new record
            new User(userObject).save().then(newUser => {
                done(null, newUser);
            });
        }
    });
}));