const PaypackJs = require("paypack-js").default;
require ("dotenv").config();

const paypack = PaypackJs.config({ 
    client_id: process.env.APPLICATION_ID,
    client_secret: process.env.APPLICATION_SECRET,
});


//CASH IN
export const cashin = (req, res) => {
    paypack.cashin({
        number: req.body.number,
        amount: req.body.amount,
        environment: "production",
    })


    .then((response) => {
      console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
//CASH OUT
export const cashout = (req, res) =>{
    paypack.cashout({
        number: req.body.number,
        amount: req.body.amount,
        environment: "production",
    })

    .then((response) => {
        console.log(response.data);
        res.status(200).json(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    //EVENTS
    paypack.events({ offset: 0, limit: 100 })
    .then((res) => {
      console.log("777777777777777777777777777777777777777777",res.data);
    })
    .catch((err) => {
      console.log(err);
    });
