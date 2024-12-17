const express = require("express");
const router = express.Router();
const authController = require("../controler/authController");
const { body, validationResult } = require("express-validator");
const User = require('../models/User')
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  authController
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),

    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      let usermail = await User.findOne({ email });
      if (!usermail) {
        return res
          .status(400)
          .json({ errors: "Try logginwith correct email " });
      }

      if (req.body.password !== usermail.password) {
        return res
          .status(400)
          .json({ errors: "Try logginwith correct password " });
      }

      res.status(200).send({
        success:true,
        mesaage:"login successfull",
        usermail,
      })
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
