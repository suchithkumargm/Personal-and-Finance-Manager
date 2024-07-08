import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectToMongo from "./db.js";
import authRoute from './routes/auth/userAuth.js';

connectToMongo();
const app = express();  //create an express app
const port = 5000;

app.use(cors());
app.use(express.json());
// Increase the limit for JSON payloads
app.use(bodyParser.json({ limit: '100mb' })); // Set the limit as per your requirement

// Increase the limit for URL-encoded payloads
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.use('/auth/user', authRoute);

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})