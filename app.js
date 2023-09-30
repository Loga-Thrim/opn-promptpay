const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiKey = "<Your api key>";

// const transferId = "chrg_test_5x9r51gx6brrn9gfqdd";

// axios({
//   method: "GET",
//   url: `https://api.omise.co/charges`,
//   auth: {
//     username: apiKey,
//     password: "",
//   },
// })
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.error(error.response.data);
//   });

app.post("/generateQR", (req, res) => {
  const { amount, currency, source } = req.body;
  axios
    .post(
      "https://api.omise.co/charges",
      {
        amount,
        currency,
        source,
      },
      {
        auth: {
          username: apiKey,
        },
      }
    )
    .then((data) => {
      res.json(data.data?.source?.scannable_code);
    });
});

app.listen(port, () => {
  console.log(`> App on port ${port}.`);
});
