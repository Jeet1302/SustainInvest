const express = require("express"); 
const stripe = require("stripe")("sk_test_51McbTGSJJrDeHsxRhGbjXcpn8m2hcmnEa0hPIjd13DH6quwtYh9a8CzgfqPrdquIyxPUi9189NrJYs8OIwlo4NXA00rRPeIOpH"); 
 
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => { 
    const {product} = req.body; 
    const session = await stripe.checkout.sessions.create({ 
      payment_method_types: ["card"], 
      line_items: [ 
        { 
          price_data: { 
            currency: "inr", 
            product_data: { 
              name: product.name, 
            }, 
            unit_amount: product.price * 100, 
          }, 
          quantity: product.quantity, 
        }, 
      ], 
      mode: "payment", 
      success_url: "http://localhost:3000/success", 
      cancel_url: "http://localhost:3000/cancel", 
    }); 
    res.json({ id: session.id }); 
}); 
 


module.exports = router;