import express, { Request, Response } from 'express'
import signup from './routes/signup'
import login from './routes/login'
import googleSuccessAth from './routes/googleSuccessAuth'
import product from './routes/product'
import { json } from 'stream/consumers';
import mongoose from 'mongoose';
import env from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import { error, log } from 'console';
import { body, validationResult } from 'express-validator';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cors from 'cors'

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Error configuring Cloudinary:', error);
  } else {
    console.log('Cloudinary configuration successful:', result);
  }
});

const port: number = 9000


const app = express();
app.use(express.json())
app.use(cors())
env.config()
app.get('/', (req: Request, res: Response) => {
  console.log(process.env.API_KEY);

  res.send("hello");
})


app.use('/signup', signup)
app.use('/login', login)
app.use('/product', product)
app.use('/google-auth',googleSuccessAth)



mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
  console.log('mongodb connected');

}).catch((err) => {
  console.log(err);

})


app.listen(port, () => console.log(`server running on port localhost:${port}`)
)
