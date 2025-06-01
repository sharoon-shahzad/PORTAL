
import './config/instrument.js';

import express from 'express'
import cors from 'cors'


import 'dotenv/config'
import connectDB from './config/db.js';

import * as Sentry from '@sentry/node';
import { clerkWebhook } from './controllers/webhook.js';


//intialize the Express App



const app = express();

//connect to the database

await connectDB();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Job Portal API , and is working fine");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks' , clerkWebhook)

const PORT = process.env.PORT || 5000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
