// External Packages
const mongoose = require('mongoose');

const Review = mongoose.model('review');

module.exports = (app) => {
    // return ALL reviews (for use with the search indexes)
    app.get('/api/reviews', async (req, res) => {
        const reviews = await Review.find();
        res.send(reviews);
    });

    // return all reviews for reviewee
    app.get('/api/reviews/:reviewee_id', async (req, res) => {
        const reviews = await Review.find({
            reviewee_id: `${req.params.reviewee_id}`,
        });
        res.send(reviews);
    });

    // create a new review
    app.post('/api/reviews', async (req, res) => {
        const {
            reviewee_id, title, rating, text,
        } = req.body;
        const user = req.user;

        await Review.create({
            reviewee_id,
            title,
            rating,
            text,
            reviewer_id: user._id,
            reviewer_img: user.img,
            reviewer_name: user.name,
        });

        const reviews = await Review.find({
            reviewee_id: `${reviewee_id}`,
        });
        res.send(reviews);
    });

    // delete review route
    app.delete('/api/reviews/:id', async (req, res) => {
        const review = await Review.find({ _id: req.params.id });
        const reviewee_id = review[0].reviewee_id;

        review[0].remove();

        const reviews = await Review.find({
            reviewee_id: `${reviewee_id}`,
        });

        res.send(reviews);
    });
};
