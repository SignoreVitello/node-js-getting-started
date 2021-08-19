const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 20,
    },
    password: { type: String, required: true, minLength: 6, maxLength: 30 },
    active_events: [{ type: Schema.ObjectId, ref: "Event" }],
    friends: [{ type: Schema.ObjectId, ref: "User" }],
});

UserSchema.virtual("url").get(() => {
    return "/" + this._id;
});

module.exports = mongoose.model("User", UserSchema);
