import app from './server';

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(
        `Server listening on ${PORT}`
    ); /* eslint-disable-line no-console */
});
