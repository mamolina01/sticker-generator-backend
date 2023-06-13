const { Schema, model } = require("mongoose");

const ProfileSchema = Schema({
	name: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
		required: true,
	},
	instagram: {
		type: String,
		required: true,
	},
	whatsapp: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		unique: true,
	},
});

ProfileSchema.method("toJSON", function () {
	const { __v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = model("Profile", ProfileSchema);
