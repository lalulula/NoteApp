const User = require('../models/user');

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.session.userId) {
        throw new Error("Need to login first");
    }
    next();
}

// If the author has an agent, the logged in user must be that agent to access
module.exports.isAgent = wrapAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user.agent && !user.agent.equals(req.session.userId)) {
        throw new ExpressError("Not an authorized agent for this author", 401);
    }
    next();
});