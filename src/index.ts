import express, { Request, Response } from 'express'
import signup from './routes/signup'
import login from './routes/login'
import googleSuccessAth from './routes/googleSuccessAuth'
import product from './routes/product'
import cart from './routes/cart.routes'
import order from './routes/orders.router'
import mongoose from 'mongoose';
import env from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import { cloudinaryconfig } from './utils/cloudinaryConfig'
import paymentRouter from './routes/payment.router'
import { cartItemModel } from './models/cartItem.model'
import { orderModel } from './models/order.model'
import { orderItemsModel } from './models/orderItems.model'
import authMiddleware from './middleware/auth.middleware'


const port: number = 9000


env.config()
const app = express();
app.use(express.json())
app.use()
cloudinaryconfig

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error('Error configuring Cloudinary:', error);
  } else {
    console.log('Cloudinary configuration successful:', result);
  }
});

app.get('/', (req: Request, res: Response) => {
  console.log(process.env.API_KEY);
  res.send("hello");
})
app.use('/signup', signup)
app.use('/login', login)
app.use('/product', product)
app.use('/google-auth', googleSuccessAth)
app.use('/cart',cart)
app.use('/order', order)
app.use('/payment', paymentRouter)


app.get('/test/:id/:my', async (req: Request, res: Response) => {
  const { user_id, cart_id, amount } = req.body;
  console.log('erri',req.params);
  

})



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public')
  },
  filename: (req, file, cb) => {
    const uniqe = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  }
})
const upload = multer({ storage });





mongoose.connect('mongodb://127.0.0.1:27017/ecommerce').then(() => {
  console.log('mongodb connected');

}).catch((err) => {
  console.log(err);

})


app.listen(port, () => console.log(`server running on port localhost:${port}`)
)
