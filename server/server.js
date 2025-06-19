import './config/instrument.js';

import express from 'express'

import cors from 'cors'


import 'dotenv/config'
import connectDB from './config/db.js';

import * as Sentry from '@sentry/node';
import { clerkWebhook } from './controllers/webhook.js';

import companyRoutes from './routes/companyRoutes.js';

import jobRoutes from './routes/jobRoutes.js';

import userRoutes from './routes/userRoutes.js';

import connectCloudinary from './config/cloudinary.js';

import { clerkMiddleware } from '@clerk/express'

//intialize the Express App



const app = express();

//connect to the database

await connectDB();
await connectCloudinary();
//middleware
app.use(cors());

app.use(express.json());

app.use(clerkMiddleware())

// Configure webhook route with raw body parsing
app.use('/webhooks', express.raw({type: 'application/json'}));
app.post('/webhooks', clerkWebhook);

app.get("/", (req, res) => {
    res.send("Welcome to the Job Portal API , and is working fine");
});
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use('/api/company', companyRoutes);

app.use('/api/jobs', jobRoutes);

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
