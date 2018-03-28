module.exports = (req, res, next) => {
    // check if user is present on request object
    if (!req.user) {
        // if no user return unauthorized
        return res.status(401).send({error: 'You must log in!'});
    }
    // otherwise proceed with the request
    next();
}