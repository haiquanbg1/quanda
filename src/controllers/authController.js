const bcrypt = require("bcryptjs");

const userService = require("../services/userService");
const { errorResponse, successResponse } = require("../utils/response");
const jwt = require("../utils/jwt");


const login = async (req, res) => {
    const { password } = req.body;
    let { email } = req.body;

    email = email.toLowerCase();

    // check email
    const user = await userService.findOne({
        email
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "An error occurred.");
    })

    if (!user) {
        return errorResponse(res, 404, "Account or password is wrong.");
    }

    // compare password
    if (!bcrypt.compareSync(password, user.password)) {
        return errorResponse(res, 404, "Account or password is wrong.");
    }

    const secretAccessKey = process.env.ACCESS_TOKEN_SECRET;
    const lifeAccessKey = process.env.ACCESS_TOKEN_LIFE;
    const secretRefreshKey = process.env.REFRESH_TOKEN_SECRET;
    const lifeRefreshKey = process.env.REFRESH_TOKEN_LIFE;

    // generate token
    const accessToken = await jwt.generateToken({
            userId: user.id
        },
        secretAccessKey,
        lifeAccessKey
    );
    let refreshToken = await jwt.generateToken(
        Math.floor(Math.random() * 1000),
        secretRefreshKey,
        lifeRefreshKey
    );

    // check refresh token exists
    if (!user.refreshToken) {
        try {
            await userService.update(user.id, {
                refreshToken: refreshToken
            });
        } catch (error) {
            console.log(error);
            return errorResponse(res, 500, "An error occurred.");
        }
    } else {
        refreshToken = user.refreshToken;
    }

    return successResponse(res, 200, "Login successfully.", {
        accessToken,
        refreshToken,
        profile: user.profile,
        roles: user.roles
    });
}

const register = async (req, res) => {
    let user = req.body;

    user.email = user.email.toLowerCase();

    // check user name exists
    await userService.findOne({
        userName: user.userName
    }).then((value) => {
        if (!value) {
            return errorResponse(res, 400, "User name was exists.");
        }
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "An error occurred.");
    });

    // check email exists
    await userService.findOne({
        email: user.email
    }).then((value) => {
        if (!value) {
            return errorResponse(res, 400, "Email was exists.");
        }
    }).catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "An error occurred.");
    });

    // hash password
    user.password = bcrypt.hashSync(user.password, 10);

    // insert to db
    await userService.create(user)
    .catch((err) => {
        console.log(err);
        return errorResponse(res, 500, "An error occurred.");
    })

    return successResponse(res, 201, "Register successfully.");
}

const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken;

    if (!refreshToken) {
        return errorResponse(res, 404, "Token not found.");
    }

    const decoded = await jwt.decodeToken(refreshToken);

    if (!decoded) {
        return errorResponse(res, 400, "Token invalid.");
    }

    try {
        var user = userService.findOne({
            refreshToken: refreshToken
        });
    } catch (error) {
        return errorResponse(res, 500, "An error occurred.");
    }

    if (!user) {
        return errorResponse(res, 404, "User not found.");
    }

    const secretAccessKey = process.env.ACCESS_TOKEN_SECRET;
    const lifeAccessKey = process.env.ACCESS_TOKEN_LIFE;

    const accessToken = await jwt.generateToken(user.id);

    return successResponse(res, 200, "Refresh token successfully.", {
        accessToken
    });
}

module.exports = {
    login,
    register,
    refreshToken
}