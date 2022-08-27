const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../dbConnect")

let todoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "Users" },
    tasks: [
        {
            description: { type: String, required: true }
        }
    ],
    isActive: { type: Boolean, default: true },
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true,
    }
});


module.exports = mongoose.model("Todos", todoSchema);
