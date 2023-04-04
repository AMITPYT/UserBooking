const Admin = require("../Schema/admin");
const User = require("../Schema/user")
const Booking = require("../Schema/booking")
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
const AdminOtp = require('../Schema/adminotp')

const JWT_SECRET = "process.env.JWT_SECRET";
router.post("/admin/auth/addadmin", async (req, res, next) => {
  try {
    const {role, name, email, password } = req.body;
    const EmailCheck = await Admin.findOne({ email });
    if (EmailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      role,
      name,
      email,
      password: hashedPassword,
    });
    delete admin.password;
    const data = {
      user: {
        id: admin._id,
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

router.post("/admin/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin)
      return res.json({ msg: "Incorrect  email Id", status: false });
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Password", status: false });
    const data = {
      user: {
        id: admin.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
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


router.get("/user/auth/getuser", fetchuser, async (req, res) => {
    try {
        const getalluser = await User.find({});
        res.json(getalluser)
        console.log(getalluser);
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/booking/auth/getbooking", fetchuser, async (req, res) => {
    try {
        const getallfollower = await Booking.find({ });
        res.json(getallfollower)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
