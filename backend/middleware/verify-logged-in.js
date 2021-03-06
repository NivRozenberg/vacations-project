const jwt = require("jsonwebtoken");

function verifyLoggedIn(request, response, next) {

    // if there is no authorization header:
    if (!request.headers.authorization)
        return response.status(401).send("You are not logged in!");

    // authorization header value: "Bearer the-token"
    const token = request.headers.authorization.split(" ")[1];// token without barer

    if (!token)
        return response.status(401).send("You are not logged in!");

    jwt.verify(token, config.jwtKey, (err, payload) => { // payload.user is the user object

        if (err && err.message === "jwt expired")
            return response.status(403).send("Your login session has expired.");// טוקן שגוי

        if (err)
            return response.status(401).send("You are not logged in!");// הודעת שגיאה שאומרת שיש טוקן אבל יש שגיאה אחרת שמונעת

        // All is ok:
        next();
    });
}

module.exports = verifyLoggedIn;
