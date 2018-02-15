const mongoose = require("mongoose");
const Dentist = mongoose.model("dentist");

module.exports = app => {
//get all dentists route
  app.get("/api/dentists", async (req, res) => {
    const allDentists = await Dentist.find();

    res.send(allDentists);
  });
};
