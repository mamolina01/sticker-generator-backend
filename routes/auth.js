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
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Email is required.").isEmail(),
    check(
      "password",
      "Password must have a minimum of six characters ."
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
    check("email", "Email is required.").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    fileValidator,
  ],
  loginUser
);

router.get("/renew", jwtValidator, revalidateToken);

module.exports = router;
