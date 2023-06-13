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
    check("name", "Name is required.").not().isEmpty(),
    check("logo", "Logo is required.").not().isEmpty(),
    check("instagram", "Instagram is required.").not().isEmpty(),
    check("whatsapp", "Whatsapp is required.").not().isEmpty(),
    fileValidator,
  ],
  setProfile
);

router.get("/", getProfile);

router.put("/:id", jwtValidator, updateProfile);

module.exports = router;
