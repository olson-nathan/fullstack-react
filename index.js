// require libraries
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

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

// use bodyParser to parse body and assign to req.body
app.use(bodyParser.json());

// tell express to use cookies
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

// init passport and use session
app.use(passport.initialize());
app.use(passport.session());


// require authRoutes with express app as input parameter
require('./routes/authRoutes')(app);
// require billingRoutes with express app as input parameter
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // express will serve up production assets (eg. main.js)
    app.use(express.static('client/build'));

    // express will serve up index.html file
    // only if route is not recognized
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// constant getting PORT for process.env
// use 5000 for development default
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});