import express from 'express';
import userRouter from './routes/user';
import newsRouter from './routes/news';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/news', newsRouter);

app.listen(port, (err?: Error) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

module.exports = app; // tests are in JavaScript, so we need to export the app instance