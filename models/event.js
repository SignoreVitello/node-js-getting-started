const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: { type: String, required: true, maxLength: 40 },
    admin: { type: Schema.ObjectId, ref: "User", required: true },
    summary: { type: String },
    invited_friends: [{ type: Schema.ObjectId, ref: "User" }],
    available_products: [{ type: Schema.ObjectId, ref: "Product" }],
    needed_products: [{ type: Schema.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Event", EventSchema);
