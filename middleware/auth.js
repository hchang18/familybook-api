const jwt = require('jsonwebtoken');

// when wants to like a post: 
// click the like button => auth middleware(next) => like controller...


// middleware is similar to what we have in controller
// next means do something and move to next thing

const auth = async (req, res, next) => {
    try {
        // is User really who he is claimed to be
        // check his token is valid
        const token = req.headers.authorization.split(" ")[1];

        // two kinds of tokens - google auth vs our own
        // if length < 500, it is google auth
        const isCustomAuth = token.length < 500;

        let decodedData;
        
        if (token && isCustomAuth) {
            // you have to pass in secret we passed in controller as 2nd parameter
            decodedData = jwt.verify(token, 'test');
            // we know which user logged in
            req.userId = decodedData.id;
        } else {
            // google oauth
            decodedData = jwt.decode(token);
            req.userId = decodedData.sub; // sub is google's version of id
        }

        next(); 

    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;