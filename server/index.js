import express from 'express';

import connectToMongo from "./db.js";

connectToMongo();
const app = express();  //create an express app
const port = 5000;

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`);
})