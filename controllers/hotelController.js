const { CURSOR_FLAGS } = require("mongodb");
const { render } = require("../app");
const hotelHelper = require("../helpers/hotelHelper");
const multer = require("multer");


module.exports = {
  signuppage: (req, res, next) => {
    res.render("hotel/hotelSignup");
  },

  hotelsignup: (req, res) => {
    // console.log("@@@@@@@@@2222",req.body);
    try {
      hotelHelper.hoteldoSignup(req.body,req.file).then((response) => {
        console.log("$$$$$$$$$$",response);
        res.redirect("/hotel");
      });
    } catch (error) {
      console.log(error);
    }
  },

  hotelloginPage: (req, res, next) => {
    res.render("hotel/hotelLogin");
  },


//   hotellogin: async (req, res) => {
//     try {
//         const response = await hotelHelper.hotelLogin(req.body);
//         console.log("Response:", response);

//         if (response.status == 200 && !response.hotel.blocked ) {
//             // Send the token as a cookie or in response headers
//             res.cookie('token', response.token, { httpOnly: true });
//             res.status(200).redirect("/hoteldashboard"); // Corrected redirection to the dashboard page
//         } else {
//             res.redirect("/"); // Redirect to login page if login fails
//         }
//     } catch (error) {
//         console.log(error);
//         res.redirect("/error-page");
//     }
// },



hotellogin: (req, res, next) => {
  try {
    hotelHelper.hotelLogin(req.body).then((response) => {
      console.log("#############responseee",response);
      if (response.status) {
        let hoteldetail = response.user;
        // console.log("##########response.user",response.user);
        res.render("hotel/hotelDashboard",{hoteldetail});
      } else {
        res.render("/", { error: response.message });
      }
    });
  } catch (error) {
    console.log(error);
  }
},
  
  hoteldashboard: (req, res, next) => {
    res.render("hotel/hotelDashboard");
  },

  addroomspage : (req, res) => {
    let addid = req.params.id;
    console.log("addid",addid);
    res.render("hotel/addRooms");
  },

  addfacilitiespage: (req, res) => {
    res.render("hotel/addFacilities");
  },

  addrooms: (req, res) => {
    try {
      hotelHelper.addrooms(req.body, req.file).then((insertedId) => {
        console.log("Room inserted with ID:", insertedId);
        res.redirect("/hotel/rooms");
      }).catch((error) => {
        console.error("Error adding room:", error);
        res.status(500).send("Error adding room");
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error adding room");
    }
  },

  addfacilities: (req, res) => {
    console.log("@@@@@@@@@@@@@@@@@@", req.body);
    try {
      hotelHelper.addfacility(req.body, req.file).then((response) => {
        // console.log("%%%%%%%%%%%%%%%%%",response);
        res.redirect("/hotel/facilities");
      });
    } catch (error) {
      console.log(error);
    }
  },

  roomspage: (req, res) => {

    let hoteldetails = req.params.id;
    console.log("hoteldetailssss",hoteldetails);
    hotelHelper.viewrooms(hoteldetails).then(async (viewdata) => {
      console.log("hoteldetails",hoteldetails);
      // console.log("iddddddd",id);
      res.render("hotel/rooms", {
        viewdata
      });
    });
  },


  facilitypage: (req, res) => {
    console.log("###########33", req.body);

    hotelHelper.viewfacility().then((facilitiesdata) => {
      res.render("hotel/facilities", {
        facilitiesdata,
      });
    });
  },

  
  editrooms: (req, res) => {
    let id = req.params.id;

    hotelHelper.editroom(id).then((result) => {
      res.render("hotel/editRooms", { result });
    });
  },

  roomedit: (req, res) => {
    let id = req.params.id;

    hotelHelper.roomedit(id, req.body, req.file).then(() => {
      res.redirect("/hotel/rooms");
    });
  },

  editfacilities: (req, res) => {
    let facilityid = req.params.id;
    hotelHelper.editfacility(facilityid).then((data) => {
      res.render("hotel/editFacilities", { data });
    });
  },

  facilityedit: (req, res) => {
    let idfacility = req.params.id;
    hotelHelper.facilityedit(idfacility, req.body, req.file).then(() => {
      res.redirect("/hotel/facilities");
    });
  },

  deleteroom: (req, res) => {
    let id = req.params.id;
    hotelHelper.roomdelete(id).then(() => {
      res.redirect("/hotel/rooms"); // Corrected redirect path
    });
  },

  deletefacilities: (req, res) => {
    let id = req.params.id;
    hotelHelper.facilitiesdelete(id).then(() => {
      res.redirect("/hotel/facilities");
    });
  },
  

  customers: (req, res) => {
    hotelHelper.showcustomers().then(async (customerdata) => {
      res.render("hotel/hotelCustomers", {
        customerdata,
      });
    });
  },

  transactions: (req, res) => {
    res.render("hotel/transactions");
  },


  reviews: (req, res) => {
    res.render("hotel/reviews");
  },
  
};
