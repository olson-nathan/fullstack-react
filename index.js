// require libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

// require in keys from config directory
const keys = require('./config/keys');

// require in mongoose model for users
require('./models/User');

// require in passport configuration but no exports
require('./services/passport');

// connect mongoose to mlab instance
mongoose.connect(keys.mongoURI);

// new express app instance
const app = express();

// tell express to use cookies
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

// init passport and use session
app.use(passport.initialize());
app.use(passport.session());

// require authRoutes with express app chaining
require('./routes/authRoutes')(app);

// constant getting PORT for process.env
// use 5000 for development default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});