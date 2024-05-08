var express = require("express");
var router = express.Router();
const {verifyUser ,notVerifyUser} = require("../middleware/userMiddleware");

// const {

//   sendOTP

// }= require ("../public/javascripts/otplogin");

const {
 
  loginPage,
  signuppage,
  signup,
  homepage,
  allrooms,
  allfacilities,
  room,
  login,
  booking,
  bookingrooms,
  payment,
  checkavailabilty,
  logout,
  receipt,
otploginpage,
generatepdf,
// otpLogin,
otpverifypage,
userprofile,
updateuserpage,
updateuser,
changeuserPasswordpage,
changeuserpassword



} = require("../controllers/userController");

router.get("/generatepdf",generatepdf);

router.get("/userprofile",userprofile);

router.get("/update",updateuserpage);

router.post("/updateuser",updateuser);

router.get("/changeuserPassword",changeuserPasswordpage);

router.post("/changepassword",changeuserpassword);

router.get("/otploginpage",otploginpage);

// router.post("/otpLoginuser",otpLogin);


router.get("/otpVerify", otpverifypage);

// router.post("/otpVerify", otpVerify);


router.get("/",homepage);

router.get("/signup/:id",signuppage);

router.post("/signup/:id",signup);

router.get("/login/:id", loginPage);

router.post("/login/:id", login);

router.get("/allrooms/:id",allrooms);

router.get("/allfacilities/:id",allfacilities);

router.get("/room/:id",room);

router.get("/booking/:id",booking);

router.post("/bookingroom/:id", bookingrooms);

router.post("/dopayment",payment);

router.post("/checkavailability/:id",checkavailabilty);

router.get("/logout",logout);

router.get("/receipt",receipt);


module.exports = router;
