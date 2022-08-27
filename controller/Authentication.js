const Users = require("../models/User")
module.exports = {
    async login(req, res) {
        try {
            if (!req.body.email) throw new Error("Please enter an email address");
            if (!req.body.password) throw new Error("Please enter a password");
            const user = await Users.findOne({ email: req.body.email })
            if (!user) throw new Error("User not found with email: " + req.body.email);
            if (user.password != req.body.password) throw new Error("password mismatch: " + req.body.password);
            else {
                res.status(200).send({message:"login successful"})
            }
            
        } catch (error) {
            res.status(400).send({
                error: error.message
            })
        }
    },
    logout(req,res) {
        res.status(400).send({err:"sdgsd"})
    }
}
