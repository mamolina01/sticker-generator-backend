const { response } = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");

const setProfile = async (req, res = response) => {
	const user = await User.findById(req.uid);

	let profile = await Profile.findOne({ user });

	if (profile) {
		return res.status(400).json({
			ok: false,
			msg: "Exists a profile with that id.",
		});
	}

	profile = new Profile(req.body);

	try {
		profile.user = req.uid;

		let profileSaved = await profile.save();

		res.json({
			ok: true,
			profile: profileSaved,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Contact with administrator.",
		});
	}
};

const getProfile = async (req, res = response) => {
	const user = await User.findById(req.uid);

	const profile = await Profile.findOne({ user });

	if (!profile) {
		return res.status(404).json({
			ok: false,
			msg: "Doesn't exists any profile with that id.",
		});
	}

	try {
		return res.json({
			ok: true,
			profile,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contact with administrator.",
		});
	}
};

const updateProfile = async (req, res = response) => {
	const id = req.uid;
	try {
		const user = await User.findById(id);

		const profile = await Profile.findOne({ user });

		if (!profile) {
			return res.status(404).json({
				ok: false,
				msg: "Doesn't exists any profile with that id.",
			});
		}

		if (profile.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: "You don't have permission to edit this sticker.",
			});
		}

		const newSticker = {
			...req.body,
			user: id,
		};

		const ProfileUpdated = await Profile.findByIdAndUpdate(
			profile.id,
			newSticker,
			{ new: true }
		);

		res.json({
			ok: true,
			profile: ProfileUpdated,
		});
    
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contact with administrator.",
		});
	}
};

module.exports = { setProfile, getProfile, updateProfile };
