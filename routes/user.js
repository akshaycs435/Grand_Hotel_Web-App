var express = require("express");
var router = express.Router();
const {verifyUser ,notVerifyUser} = require("../middleware/userMiddleware");


const {
 
  loginPage,
  signuppage,
  signup,
  homepage,
  allrooms,
  room,
  login,
  booking,
  bookingrooms,
  paymentpage,
  payment,
  checkavailabilty,
  logout


} = require("../controllers/userController");


router.get("/",homepage);

router.get("/signup",signuppage);

router.post("/signup",signup);

router.get("/login/:id", loginPage);

router.post("/login", login);

router.get("/allrooms/:id",allrooms);

router.get("/room/:id",room);

router.get("/booking/:id",booking);

// router.get("/booking",booking);


router.post("/bookingroom/:id", bookingrooms);

router.get("/payment/:id", paymentpage);

router.post("/dopayment",payment);

router.post("/checkavailability/:id",checkavailabilty);

router.get("/logout",logout);


module.exports = router;
