/*
    User Routes
    host + /api/stickers
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { jwtValidator } = require("../middlewares/jwtValidator");
const { fileValidator } = require("../middlewares/fileValidator");
const {
  getStickers,
  createSticker,
  updateSticker,
  deleteSticker,
} = require("../controllers/stickers");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(jwtValidator);

//Get Stickers
router.get("/", getStickers);

//Create Sticker
router.post(
  "/",
  [
    check("address", "Address is required.").not().isEmpty(),
    check("betweenStreets", "Between Streets is required.").not().isEmpty(),
    check("neighborhood", "Neighborhood is required.").not().isEmpty(),
    check("nameReceiver", "Name Receiver is required.").not().isEmpty(),
    check("telephone", "Telephone is required.").not().isEmpty(),
    check("date", "Date is required.").custom(isDate),
    check("nameReceiver", "Name Receiver is required.").not().isEmpty(),
    fileValidator,
  ],
  createSticker
);

//Update Sticker
router.put("/:id", updateSticker);

//Delete Sticker
router.delete("/:id", deleteSticker);

module.exports = router;
