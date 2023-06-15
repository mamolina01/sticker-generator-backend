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
    check("name", "Nombre es requerido").not().isEmpty(),
    check("email", "Email es requerido").isEmail(),
    check(
      "password",
      "La contraseña debe tener minimo 6 caracteres"
    ).isLength({
      min: 6,
    }),
    fileValidator,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email es requerido").isEmail(),
    check("password", "Password es requerido").not().isEmpty(),
    fileValidator,
  ],
  loginUser
);

router.get("/renew", jwtValidator, revalidateToken);

module.exports = router;
