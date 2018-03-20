const mongoose = require("mongoose");
const Dentist = mongoose.model("dentist");

module.exports = app => {
//get all dentists route
  app.get("/api/dentists", async (req, res) => {
    const allDentists = await Dentist.find();

    res.send(allDentists);
  });

  //create dentist route
  app.post("/api/dentists", async (req, res) => {
    const { type, location, procedures } = req.body;
    const user = req.user;

    let newDentist = await Dentist.create({
      type,
      location,
      procedures,
      user_id: user._id,
      img_url: user.img,
      name: user.name,
      rating: []
    });

    res.send(newDentist);
  });
};
