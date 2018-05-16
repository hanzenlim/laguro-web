const mongoose = require('mongoose');

const Dentist = mongoose.model('dentist');

module.exports = (app) => {
    // get all dentists route
    app.get('/api/dentists', async (req, res) => {
        const allDentists = await Dentist.find();

        res.send(allDentists);
    });

    // get one dentist route
    app.get('/api/dentists/:id', async (req, res) => {
        const dentist = await Dentist.findOne({ _id: `${req.params.id}` });

        res.send(dentist);
    });

    // get one dentist route
    app.get('/api/dentists/user/:id', async (req, res) => {
        const dentist = await Dentist.findOne({ user_id: `${req.params.id}` });

        res.send(dentist);
    });

    // add listing to Cart
    app.patch('/api/dentists/cart', async (req, res) => {
        Dentist.findOne(
            { user_id: req.user.id },
            (err, dentist) => {
                if (err) {
                    console.log(err); /* eslint-disable-line no-console */
                }
                const cart = dentist.cart;

                dentist.cart = [
                    ...cart,
                    req.body,
                ];
                dentist.save((err, dentist) => {
                    if (err) { 
                        console.log(err); /* eslint-disable-line no-console */
                    }
                    res.send(dentist);
                });
            },
        );
    });

    // create dentist route
    app.post('/api/dentists', async (req, res) => {
        const {
            specialty, location, procedures, img_url,
        } = req.body;
        const user = req.user;
        const newDentist = await Dentist.create({
            specialty,
            location,
            procedures,
            user_id: user.id,
            img_url,
            name: user.name,
            rating: [],
        });

        res.send(newDentist);
    });

    // edit dentist route
    app.patch('/api/dentists', async (req, res) => {
        const {
            name, img_url, specialty, location, procedures, id,
        } = req.body;

        await Dentist.findOneAndUpdate(
            { user_id: id },
            {
                specialty,
                location,
                procedures,
                name,
                img_url,
            },
            { new: true },
        );

        const dentists = await Dentist.find();

        res.send(dentists);
    });
};
