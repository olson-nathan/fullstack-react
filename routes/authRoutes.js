// require in passport for authenticate
const passport = require('passport');
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // authenticate user using pasport.authenticate middleware
    // after redirect user to /surveys
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            // redirect user to our survey dashboard
            res.redirect('/surveys');
        }
    );
    app.get('/api/logout', (req, res) => {
        // logout user using passport logout function
        req.logout();
        // redirect user back to homepage
        res.redirect('/');
    });
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
}