var { connectToMongoDB } = require("../config/connection");
var collection = require("../config/collection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

module.exports = {
  

  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      //   console.log(userData);

      if (userData.password === userData.confirmpassword) {
        var encryptedpassword = await bcrypt.hash(userData.password, 10);
        // console.log(encryptedpassword);
      } else {
        console.log("error");
        throw new Error("given passwords are not same");
      }

      let signupData = {
        name: userData.name,
        email: userData.email,
        password: encryptedpassword,
        blocked: false,
      };

      const db = await connectToMongoDB();

      await db
        .collection(collection.USER_COLLECTION)
        .insertOne(signupData)
        .then((data) => {
          resolve(data.insertedId);
        });
    });
  },

  doLogin: (loginData) => {
    return new Promise(async (resolve, reject) => {
      let loginstatus = false;
      let response = {};
      const db = await connectToMongoDB();
      let user = await db
        .collection(collection.USER_COLLECTION)
        .findOne({ email: loginData.email });

      if (user) {
        bcrypt.compare(loginData.password, user.password).then((status) => {
          if (status) {
            console.log("login success");
            const usertoken = jwt.sign(
              { userId: user._id, useremail: user.email },
              "secret",
              { expiresIn: "24h" }
            );
            response.token = usertoken;
            response.user = user;
            response.status = true;
            response.message = "Login Success";
            resolve(response);
          } else {
            response.message = "the user cant login";
            resolve({ status: false });
          }
        });
      } else {
        resolve({ status: false });
      }
    });
  },

  showhotels: async () => {
    return new Promise(async (resolve, reject) => {
      const db = await connectToMongoDB();

      let Datahotel = await db
        .collection(collection.HOTEL_COLLECTION)
        .find({ blocked: false })
        .toArray();
      resolve(Datahotel);
    });
  },

  showrooms: async (id) => {
    try {
      const db = await connectToMongoDB();
      const hotelrooms = await db
        .collection(collection.ROOMS_COLLECTION)
        .find({ hotelId: id })
        .toArray();
      return hotelrooms;
    } catch (error) {
      console.error("Error fetching hotel rooms:", error);
      throw error; // Propagate the error to the caller
    }
  },

  
  roomsDetails: async (roomid) => {
    try {
      const db = await connectToMongoDB();
      const roomDetails = await db
        .collection(collection.ROOMS_COLLECTION)
        .findOne({ _id: new ObjectId(roomid) });
      return roomDetails;
    } catch (error) {
      throw error;
    }
  },

  dobooking: (bookingdata) => {
    // Function to generate array of dates between checkin and checkout
    function generateDateArray(checkin, checkout) {
        let datesArray = [];
        let currentDate = new Date(checkin);
        const endDate = new Date(checkout);
        
        // Loop through each day between checkin and checkout
        while (currentDate <= endDate) {
            datesArray.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return datesArray;
    }

    return new Promise(async (resolve, reject) => {
        let datasbooking = {
            name: bookingdata.name,
            email: bookingdata.email,
            checkin: bookingdata.checkin,
            checkout: bookingdata.checkout,
            booked: true,
        };

        const db = await connectToMongoDB();

        // Generate array of dates between checkin and checkout
        let datesArray = generateDateArray(bookingdata.checkin, bookingdata.checkout);

        // Add the array of dates to datasbooking object
        datasbooking.datesArray = datesArray;

        await db
            .collection(collection.BOOKING_COLLECTION)
            .insertOne(datasbooking)
            .then((data) => {
                resolve(data.insertedId);
            })
            .catch((error) => {
                reject(error);
            });
    });
},


  dochecking: (checkingdata) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await connectToMongoDB();
            const checkin = new Date(checkingdata.checkin);
            const checkout = new Date(checkingdata.checkout);

            // Ensure check-in date is before or equal to check-out date
            if (checkin > checkout) {
                reject(new Error("Check-in date cannot be later than check-out date"));
                return;
            }

            // Generate an array of dates between check-in and check-out dates
            const datesInRange = [];
            for (let date = checkin; date <= checkout; date.setDate(date.getDate() + 1)) {
                datesInRange.push(new Date(date));
            }

            // Insert the array of dates into a single document in the database
            const result = await db.collection(collection.CHECKING_COLLECTION).insertOne({
                dates: datesInRange
            });

            resolve(result.insertedId);
        } catch (error) {
            console.error("Error inserting checking data:", error);
            reject(error);
        }
    });
},


  // paymentDetails:async (paymentid) => {
  //   try {
  //     const db = await connectToMongoDB();
  //     const paymentDetails = await db
  //       .collection(collection.HOTEL_COLLECTION)
  //       .findOne({ _id: new ObjectId(paymentid) });
  //     return paymentDetails;
  //   } catch (error) {
  //     throw error;
  //   }
  // },



};
