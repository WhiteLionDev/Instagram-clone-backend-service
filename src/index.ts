import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
import { commentRouter } from './routes/comment';

dotenv.config();

const port = process.env.APP_PORT || 3000;
const connectionString = process.env.MDB_URL || 'mongodb+srv://insta:DURNv2I73NGMvrNd@insta-clone.bjfspbs.mongodb.net/test';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

app.get('/', (res: Response) => res.send('Instagram clone backend service'));

mongoose.connect(connectionString, {}, () => {
  console.log('connected to database');
})

app.listen(port, () => console.log(`Instagram clone service listening on port ${port}!`));