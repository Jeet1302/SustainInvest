const express = require("express");
const router = express.Router();
const users = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchUser");

const JWT_SECRET = "HelloRashid";

// Create a user using : POST "/api/auth/ Doesnt require auth"
router.post(
  "/createUser",
  [
    body("phone", "Enter a valid phone no.").isMobilePhone(),
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password too short").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // checking validation and errors
    console.log(req.body);
    var success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    // secured password  = hash(password + salt)
    const salt = await bcrypt.genSalt(10);
    let secPass = await bcrypt.hash(req.body.password, salt);
    try {
      // checking if user already exist
      let newuser = await users.findOne({ phone: req.body.phone });
      if (newuser) {
        return res
          .status(400)
          .json({ success, error: "This user already exist" });
      }
      // It automatically create a collection in mongodb unlike SQL
      // creating a new user
      newuser = await users.create({
        name: req.body.name,
        phone: req.body.phone,
        password: secPass,
        email: req.body.email,
      });
      success = true;
      res.send({ success });
    } catch (error) {
      res.status(500).send("Error has occured");
    }
  }
);

// Authenticate a user
router.post(
  "/login",
  [
    body("phone", "Enter a valid phone number").isMobilePhone(),
    body("password", "Password can not be blank").isLength({ min: 1 }),
  ],
  async (req, res) => {
    // checking validation and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { phone, password } = req.body;
    try {
      let success = false;
      let user = await users.findOne({ phone });
      if (!user)
        return res
          .status(500)
          .json({
            success,
            error: "Please try to login with correct credential",
          });
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res
          .status(500)
          .json({
            success,
            error: "Please try to login with correct credential",
          });
      const data = {
        user: {
          id: user.id,
          phone: user.phone,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      req.user = user.id;
      res.send({ success, authToken, userid: user.id });
    } catch (error) {
      res.status(500).send("Error has occured " + error);
    }
  }
);

router.post("/getUser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await users.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("some error occured " + error);
  }
});

// fetch middleware
router.post("/addStock",fetchuser, async (req, resp) => {
  try {
    //const userId = req.user.id
   // const userId =  req.params['userid'];
   const userId = req.user.id;
    console.log("hi");
    //const userId = "643afb50f69a531e75d6cfea";
    let { symbol, name, quantity, price, purchase_date, sustainable } = req.body;
    // let name = " dfin";
    // let symbol = " dfin";
    // let quantity = 2;
    // let price = 3;
    const userPrice = await users.findById(userId);

    let stockPresent = false;
    let price_old = 0;
    let quantity_old = 0;
    for (let i = 0; i < userPrice.stocks.length; i++) {
      if (userPrice.stocks[i].symbol == symbol) {
        price_old = userPrice.stocks[i].price;
        quantity_old = userPrice.stocks[i].quantity;
        stockPresent = true;
        break;
      }
    }

    if (stockPresent) {
      let total = price * quantity;
      let new_quantity = quantity + quantity_old;
      price = ((price * quantity) + (price_old * quantity_old) )/ new_quantity;
      quantity = new_quantity;
      let bal = userPrice.balance - total;
      console.log(total + " " + userPrice.total)
      let final_total = total + userPrice.total;
      const user = await users.findOneAndUpdate(
        {
          _id: userId,
        },
        {
         balance: bal,
          total: final_total,
          $set: {
            stocks: {
              symbol,
              name,
              quantity,
              price,
              purchase_date,
            },
          },
        }
      );
      user.save();
      resp.send("succesful" + req.body);
    } else {
      let total = price * quantity;
      let bal = userPrice.balance - total;
      let sustain
      if (sustainable) {
        sustain = userPrice.sustainable + 1;
      }
      console.log(userPrice.total + " " + total);
      let final_total = total + userPrice.total;
      console.log(final_total);
      const user = await users.findOneAndUpdate(
        {
          _id: userId,
        },
        {
            sustainable: sustain,
          balance : bal,
          total: final_total,
          $push: {
            stocks: {
              symbol,
              name,
              quantity,
              price,
            },
          },
        }
      );
      user.save();
      resp.send("succesful" + req.body);
    }
  } catch (err) {
    resp.status(500).send("some error occured " + err);
  }
});

router.post("/deleteStock", fetchuser , async (req, resp) => {
  try {
    //const userId = req.user.id

    //const userId = "643afb50f69a531e75d6cfea";
    //const userId =  req.params['userid'];
    const userId = req.user.id;
    
    let { symbol, quantity, sell, sustainable} = req.body;
    // console.log(symbol + quantity);
    // let name = " dfin";
    // let symbol = " dfin";
    // let quantity = 2;
    // let price = 3;
    const userPrice = await users.findById(userId);
    

    let foundProduct = null;

    for (let i = 0; i < userPrice.stocks.length; i++) {
      if (userPrice.stocks[i].symbol === symbol) {
        foundProduct = userPrice.stocks[i];
        break;
      }
    }

    // let total = 0;
    if (foundProduct) {
      console.log("Found product:" + foundProduct);
      //total = foundProduct.price * foundProduct.quantity;
    } else {
      console.log("Product not found");
      resp.send("Product not found")

    }

    //let total = price * quantity;
    //console.log(userPrice.total + " " + total);
    //let final_total = userPrice.total - total;
    let count;
    if (!quantity) {
        count = 0
    } else {
        count = foundProduct.quantity - quantity 

    }

    console.log(" hi " +count + foundProduct.quantity)
    if (count == 0) {
        console.log(count, userPrice.balance)
        let bal = userPrice.balance + (sell * foundProduct.quantity);
        let sustain
        if (sustainable) {
         sustain = userPrice.sustainable - 1;
        } else {
          sustain = userPrice.sustainable
        }
        const user = await users.findOneAndUpdate(
            {
              _id: userId,
            },
            {
                sustainable: sustain, 
                balance: bal,
              $pull: {
                stocks: {
                  symbol,
                },
              },
            }
          );
          user.save();
          resp.send("succesful" + req.body);
    } else if (count < 0 ){
        resp.status(500).send("You can't delete assets you dont have!" + err);
    } else {
        let bal = userPrice.balance + (sell * quantity);
        
        const user = await users.findOneAndUpdate(
            {
              _id: userId,
            },
            {
                balance: bal,
              $set: {
                stocks: {
                  symbol,
                  quantity : count,
                },
              },
            }
          );
          user.save();
          resp.send("succesful");
    }
    



  } catch (err) {
    resp.status(500).send("some error occured " + err);
  }
});
module.exports = router;
