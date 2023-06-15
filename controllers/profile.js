const { response } = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");

const setProfile = async (req, res = response) => {
	const user = await User.findById(req.uid);

	let profile = await Profile.findOne({ user });

	if (profile) {
		return res.status(400).json({
			ok: false,
			msg: "Existe un perfil con ese usuario",
		});
	}

	profile = new Profile(req.body);

	try {
		profile.user = req.uid;

		let profileSaved = await profile.save();
		const { name, logo, instagram, whatsapp } = profileSaved;

		return res.json({
			ok: true,
			data: { name, logo, instagram, whatsapp },
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

const getProfile = async (req, res = response) => {
	const user = await User.findById(req.uid);

	const profile = await Profile.findOne({ user });

	if (!profile) {
		return res.status(404).json({
			ok: false,
			msg: "No existe ningun perfil con ese usuario",
		});
	}

	const { name, logo, instagram, whatsapp } = profile;

	try {
		return res.json({
			ok: true,
			data: { name, logo, instagram, whatsapp },
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
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
				msg: "No existe ningun perfil con ese usuario",
			});
		}

		if (profile.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: "No tienes permisos para editar este perfil",
			});
		}

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
			msg: "Contactese con un administrador",
		});
	}
};

module.exports = { setProfile, getProfile, updateProfile };
