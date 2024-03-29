var express = require("express");
var router = express.Router();
// const  verifyToken  = require("../middleware/userMiddleware");


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
  payment

} = require("../controllers/userController");


router.get("/",homepage);

router.get("/signup",signuppage);

router.post("/signup",signup);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/allrooms/:id",allrooms);

router.get("/room/:id",room);

router.get("/booking",booking);

router.post("/bookingroom",bookingrooms);

router.get("/payment/:id",payment);


module.exports = router;
