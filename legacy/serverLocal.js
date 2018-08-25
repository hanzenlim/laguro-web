import app from './server';

// Server Start
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log('Server listening on 5000'); /* eslint-disable-line no-console */
});
