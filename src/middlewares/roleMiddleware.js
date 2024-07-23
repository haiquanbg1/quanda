module.exports = {
    admin: () => {
        if (req.jwtDecoded.roles === "admin") {
            next();
        }
    },

    user: () => {
        if (req.jwtDecoded.roles === "user") {
            next();
        }
    },

    tutor: () => {
        if (req.jwtDecoded.roles === "tutor") {
            next();
        }
    }
}