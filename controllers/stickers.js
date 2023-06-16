const { response } = require("express");
const Sticker = require("../models/Sticker");
const User = require("../models/User");
const moment = require("moment");

const getStickers = async (req, res = response) => {
	try {
		const user = await User.findById(req.uid);

		const stickers = await Sticker.find({ user: user });
		// let tempStickers = stickers;
		// console.log(stickers.date)
		// tempStickers.date = moment(stickers.date,"MM-DD-YYYY")
		// console.log(tempStickers);
		return res.json({
			ok: true,
			data: stickers,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

const createSticker = async (req, res = response) => {
	const sticker = new Sticker(req.body);

	try {
		sticker.user = req.uid;

		let stickerSaved = await sticker.save();

		res.json({
			ok: true,
			data: stickerSaved,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

const updateSticker = async (req, res = response) => {
	const stickerId = req.params.id;
	const id = req.uid;
	try {
		const sticker = await Sticker.findById(stickerId);
		if (!sticker) {
			res.status(404).json({
				ok: false,
				msg: "No existe ningun sticker con ese id",
			});
		}

		if (sticker.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: "No tienes permisos para editar este sticker",
			});
		}

		const newSticker = {
			...req.body,
			user: id,
		};

		const stickerUpdated = await Sticker.findByIdAndUpdate(
			sticker.id,
			newSticker,
			{ new: true }
		);

		res.json({
			ok: true,
			data: stickerUpdated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

const deleteSticker = async (req, res = response) => {
	const stickerId = req.params.id;
	const id = req.uid;
	try {
		const sticker = await Sticker.findById(stickerId);
		if (!sticker) {
			res.status(404).json({
				ok: false,
				msg: "No existe ningun sticker con ese id",
			});
		}

		if (sticker.user.toString() !== id) {
			return res.status(401).json({
				ok: false,
				msg: "No tienes permisos para eliminar este sticker",
			});
		}

		const stickerDeleted = await Sticker.findByIdAndDelete(sticker.id);

		res.json({
			ok: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

module.exports = { getStickers, createSticker, updateSticker, deleteSticker };
