const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../dbConnect")

let userSchema = new Schema({
    name: { type: String, require: true },
    password: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    mobile: { type: String, default: null },
    token: { type: String, require: true },
    isActive: { type: Boolean, default: true }, 
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
});

module.exports = mongoose.model("Users", userSchema);
