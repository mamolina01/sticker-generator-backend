/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fileValidator } = require("../middlewares/fileValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

const {
	createUser,
	loginUser,
	revalidateToken,
} = require("../controllers/auth");

router.post(
	"/register",
	[
		check("name", "El nombre es obligatorio.").not().isEmpty(),
		check("email", "El email es obligatorio.").isEmail(),
		check("password", "El password debe tener minimo 6 caracteres.").isLength({
			min: 6,
		}),
		fileValidator,
	],
	createUser
);

router.post(
	"/",
	[
		check("email", "El email es obligatorio.").isEmail(),
		check("password", "El password es obligatorio.").not().isEmpty(),
		fileValidator,
	],
	loginUser
);

router.get("/renew",jwtValidator, revalidateToken);

module.exports = router;
