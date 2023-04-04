
const User = require("../Schema/user")
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");


const JWT_SECRET = "process.env.JWT_SECRET";
router.post("/user/auth/userregister", async (req, res, next) => {
  try {
    const { name, email, phone_no, password } = req.body;
    const EmailCheck = await User.findOne({ email });
    if (EmailCheck)
      return res.json({ msg: "Phone_ No already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone_no,
      password: hashedPassword,
    });
    const data = {
      user: {
        id: user._id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);

    success = true;
    return res.json({
      msg: "Registeration successfully",
      authtoken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send(error);
  }
});

router.post("/user/auth/userlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ msg: "Incorrect  email Id", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    console.log(authtoken);
    success = true;
    return res.json({
      msg: "Loged In Successfully",
      authtoken,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;