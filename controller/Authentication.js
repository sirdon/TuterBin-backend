const Users = require("../models/User")
const jwt = require("jsonwebtoken")
module.exports = {
    async register(req, res) {
        try {
            const { name, email, password, mobile } = req.body;
            const userData = { name, email, password, mobile }
            const user = await new Users(userData).save()
            if (user) {
                res.status(200).send({
                    status: true,
                    message: "User created successfully"
                })
            } else {
                res.status(400).send({
                    status: false,
                    message: "Something went wrong while creating user"
                })
            }
        } catch (error) {
            res.status(400).send({
                error: error.message
            })
        }
    },
    login(req, res) {
        try {
            const { email, password } = req.body;
            Users.findOne({ email }).exec((err, user) => {
                if (err || !user) {
                    return res.status(400).json({
                        error: "User with email does not exist. Please signup",
                    });
                }

                // authenticate user
                if (!user.authenticate(password)) {
                    return res.status(400).json({
                        error: "Email and password not matched",
                    });
                }
                // generate a token and send to client
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });
                res.cookie("token", token, {
                    expiresIn: "1d",
                });
                user.token = token;
                user.save();
                const { _id,  name,  email } = user;
                return res.json({ user: { _id, name, email }, token });
            })

        } catch (error) {
            res.status(400).send({
                error: error.message
            })
        }
    },
    logout(req, res) {
        try {
            res.clearCookie("token");
            res.json({
              message: "Signout success",
            });

        } catch (error) {
            return res.status(400).json({
                error: "Error while logging out",
            });
        }
    },
    validateToken(req, res, next) {
        const token = req.headers.token || req.body.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        Users.findOne({ _id: decoded._id }).exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Please re-login",
                });
            } else {
                req.user = decoded;
                next();
            }

        })
    }

}
