const { Schema, model } = require("mongoose");

const StickerSchema = Schema({
	id: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	betweenStreets: {
		type: String,
		required: true,
	},
	neighborhood: {
		type: String,
		required: true,
	},
	nameReceiver: {
		type: String,
		required: true,
	},
	telephone: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	observations: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

StickerSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model("Sticker", StickerSchema);
