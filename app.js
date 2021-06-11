const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/User");
mongoose.connect("mongodb://localhost:27017/ghs_offchain", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const { Registration } = require("./models/Registration");
const app = express();
const port = 3005;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.post("/create-offshore", async (req, res) => {
  Registration.create({ ...JSON.parse(req.body.registration) })
    .then((response) => {
      return res.status(200).send({
        msg: "success",
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).send({
        msg: "error",
        status: "error",
      });
    });
});

app.post("/authenticate-user", async (req, res) => {
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    return res.json(
      {
        msg: "error",
        status: "error",
      },
      400
    );
  }

  let _pss_wrd = await user.comparePassword(req.body.password);

  if (_pss_wrd) {
    return res.json(
      {
        msg: "success",
        status: "success",
        data: user,
      },
      200
    );
  } else {
    return res.json(
      {
        msg: "error",
        status: "error",
      },
      400
    );
  }
});

app.listen(port, () => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Mongo Connected");
  });
  console.log(`Example app listening at http://localhost:${port}`);

  User.findOne({
    username: "admin",
  }).then((user) => {
    if (!user) {
      var testUser = new User({
        username: "admin",
        password: "admin123",
        position: "HOSPITAL",
      });

      testUser.save(function (err) {
        if (err) throw err;
      });
    }
  });

  User.findOne({
    username: "ghsadmin",
  }).then((user) => {
    if (!user) {
      var testUser = new User({
        username: "ghsadmin",
        password: "admin123",
        position: "GHS_CENTER",
      });

      testUser.save(function (err) {
        if (err) throw err;
      });
    }
  });
});
