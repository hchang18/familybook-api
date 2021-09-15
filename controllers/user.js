// all the handlers for the routes
// this is where all the logics reside

const bcrypt = require('bcryptjs'); // encrypt user password
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const signin = async (req, res) => {

    // get it from front end
    const { email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });
    
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" });

        // for jwt.sign, the second parameter `test` should be secret key (later put it in .env)
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
        
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        
        res.status(500).json({ message: "Something went wrong." });

    }
}

const signup = async (req, res) => {

    console.log(req.body);
    const { email, password, confirmedPassword, firstName, lastName } = req.body;
    

    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        console.log("user verified")
        console.log(password, confirmedPassword);

        if (password !== confirmedPassword) return res.status(400).json({ message: "Passwords don't match" });

        console.log("password verified")

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        // for jwt.sign, the second parameter `test` should be secret key (later put it in .env)
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        console.log(email, password);
        res.status(200).json({ result, token });

    } catch (error) {

        res.status(500).json({ message: "Something went wrong." });
    
    }
}


module.exports = {
    signin,
    signup,
}