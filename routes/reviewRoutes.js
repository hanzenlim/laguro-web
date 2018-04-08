// External Packages
const mongoose = require("mongoose");
const Review = mongoose.model("review");

module.exports = app => {
  // create a new review
  app.post("/api/reviews", async (req, res) => {
    const { reviewee_id, title, rating, text } = req.body;
    const user = req.user;

    let newReview = await Review.create({
      reviewee_id,
      title,
      rating,
      text,
      reviewer_id: user._id,
      reviewer_img: user.img,
      reviewer_name: user.name
    });

		const reviews = await Review.find({
      reviewee_id: `${reviewee_id}`
    });
    res.send(reviews);
  });
};
