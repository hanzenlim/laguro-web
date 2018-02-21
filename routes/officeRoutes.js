const mongoose = require("mongoose");
const Office = mongoose.model("office");

module.exports = app => {
//get all dentists route
  app.get("/api/offices", async (req, res) => {
    const allOffices = await Office.find();

    res.send(allOffices);
  });
};
