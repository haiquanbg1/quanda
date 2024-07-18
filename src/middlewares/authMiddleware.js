const User = require("../services/userService");
const jwt = require("../utils/jwt");
const { errorResponse } = require("../utils/response");

exports.isAuth = async (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
        return errorResponse(res, 404, "Access token not found!");
    }

    const secretKey = process.env.ACCESS_TOKEN_SECRET;
    const verify = await jwt.verifyToken(accessToken, secretKey);

    if (!verify) {
        return errorResponse(res, 401, "Need permission to access!");
    }

    try {
        const user = await User.findOne({
            id: verify.payload.userId
        });
    
        req.user = user;
    
        return next();
    } catch (error) {
        return errorResponse(res, 500, "Can't find user!");
    }
}