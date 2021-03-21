const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const errorController = require("./controllers/error");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // to load css file

// Temporary user authentication
app.use((req, res, next) => {
  User.findById("605782705714c30e46d817d6")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://megan:vZimbEMh661Xyws3@cluster0.plwjh.mongodb.net/myMerch?retryWrites=true&w=majority"
  )
  .then((result) => {
    // Temp user
    User.findOne().then(user => {
      if(!user) {
        const user = new User({
          name: 'Megan',
          email: 'megan@meg.com',
          items: []
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Error connecting DB", err);
  });
