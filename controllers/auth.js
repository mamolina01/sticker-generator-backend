const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/generateJWT");

const createUser = async (req, res = response) => {
	const { name, email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: "Existe un usuario con este email",
			});
		}

		user = new User(req.body);

		//Encriptado contraseña
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		//Generar JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: "Credenciales invalidas",
			});
		}

		//Matchear password
		const validPassword = bcrypt.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: "Credenciales invalidas",
			});
		}

		//Generar JWT
		const token = await generateJWT(user.id, user.name);

		res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Contactese con un administrador",
		});
	}
};

//GET: /renew
const revalidateToken = async (req, res = response) => {
	const uid = req.uid;
	const name = req.name;
  
	// Genera un nuevo token y lo retorna
	const token = await generateJWT(uid, name);
  
	res.status(201).json({ ok: true, uid, name, token });
  };

module.exports = { createUser, loginUser, revalidateToken };
