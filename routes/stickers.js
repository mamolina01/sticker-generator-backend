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
    check("address", "La direccion es requerida").not().isEmpty(),
    check("betweenStreets", "Entre Calles es requerido").not().isEmpty(),
    check("neighborhood", "Barrio es requerido").not().isEmpty(),
    check("nameReceiver", "Nombre destinatario es requerido").not().isEmpty(),
    check("telephone", "Telefono es requerido").not().isEmpty(),
    check("date", "Fecha es requerido").custom(isDate),
    fileValidator,
  ],
  createSticker
);

//Update Sticker
router.put("/:id", updateSticker);

//Delete Sticker
router.delete("/:id", deleteSticker);

module.exports = router;
