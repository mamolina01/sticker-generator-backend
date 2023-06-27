/*
    Profile Routes
    host + /api/profile
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { fileValidator } = require("../middlewares/fileValidator");
const { jwtValidator } = require("../middlewares/jwtValidator");

const router = Router();

router.use(jwtValidator);

const {
  setProfile,
  getProfile,
  updateProfile,
} = require("../controllers/profile");

router.post(
  "/",
  [
    check("name", "Nombre es requerido").not().isEmpty(),
    check("logo", "Logo es requerido").not().isEmpty(),
    check("instagram", "Instagram es requerido").not().isEmpty(),
    check("whatsapp", "Whatsapp es requerido").not().isEmpty(),
    fileValidator,
  ],
  setProfile
);

router.get("/", getProfile);

router.put(
  "/",
  [
    check("name", "Nombre es requerido").not().isEmpty(),
    check("logo", "Logo es requerido").not().isEmpty(),
    check("instagram", "Instagram es requerido").not().isEmpty(),
    check("whatsapp", "Whatsapp es requerido").not().isEmpty(),
    fileValidator,
  ],
  updateProfile
);

module.exports = router;
