import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';


mongoose.set('strictQuery', false);


const app = express();

app.use(cors());
app.use(express.json({limit: '25mb'}));

// ------- Routes --------
app.use("/api/users", authRoute);
app.use("/api/posts", postRoute);

// ------- MongoDB connection -------
async function start() {
    const PORT = process.env.PORT
    const DB_USER = process.env.DB_USER
    const DB_NAME = process.env.DB_NAME
    const DB_PASSWORD = process.env.DB_PASSWORD
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gc97yg5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`Server running on ${PORT} port`));
    } catch (err) {
        console.log(err);
    }
}

start();

