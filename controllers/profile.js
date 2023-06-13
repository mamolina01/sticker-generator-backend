const { response } = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");

const setProfile = async (req, res = response) => {
  const profile = new Profile(req.body);

  try {
    profile.user = req.uid;

    let profileSaved = await profile.save();

    res.json({
      ok: true,
      profile: profileSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with administrator.",
    });
  }
};

const getProfile = async (req, res = response) => {
  try {
    // const user = await User.findById(req.uid);

    const profile = await Profile.find();
    return res.json({
      ok: true,
      profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact with administrator.",
    });
  }
};

const updateProfile = async (req, res = response) => {};

module.exports = { setProfile, getProfile, updateProfile };
