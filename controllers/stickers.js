const { response } = require("express");
const Sticker = require("../models/Sticker");
const User = require("../models/User");

const getStickers = async (req, res = response) => {
  try {
    const user = await User.findById(req.uid);

    const stickers = await Sticker.find({ user: user });
    return res.json({
      ok: true,
      stickers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with administrator.",
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
      sticker: stickerSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with administrator.",
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
        msg: "Doesn't exists any sticker with that id.",
      });
    }

    if (sticker.user.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have permission to edit this sticker.",
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
      sticker: stickerUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with administrator.",
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
        msg: "Doesn't exists any sticker with that id.",
      });
    }

    if (sticker.user.toString() !== id) {
      return res.status(401).json({
        ok: false,
        msg: "You don't have permission to delete this sticker.",
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
      msg: "Contact with administrator.",
    });
  }
};

module.exports = { getStickers, createSticker, updateSticker, deleteSticker };
