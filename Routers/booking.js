const express = require("express");
const router = express.Router();
const Booking = require("../Schema/booking")
const { validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser")

router.post("/booking/addbooking", fetchuser, async (req, res) => {
    try {
        const {name,email,phone_no,Movie,Date,Time } = req.body;
  
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const booking = new Booking ({
          name,  
          email,
          phone_no,
          Movie,
          Date,
          Time,
          user: req.user.id,
        });
        const savedbooking = await booking.save();
  
        res.json({"Success": "Booking Successfully",savedbooking});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
});

router.get('/booking/getmybooking', fetchuser, async (req, res) => {
    try {
        const getmybooking = await  Booking.find({ user: req.user.id });
        res.json(getmybooking)
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;