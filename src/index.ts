import express, { Request, Response } from 'express'
import signup from './routes/signup'
import login from './routes/login'
import googleSuccessAth from './routes/googleSuccessAuth'
import product from './routes/product'
import cart from './routes/cart.routes'
import order from './routes/orders.router'
import adminDashboard from './routes/dashboard.routes'
import authRouter from './routes/auth.routers'
import ratingRouter from './routes/rating.routes'
import bannerRouter from './routes/banner.routes'
import mongoose from 'mongoose';
import 'dotenv/config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import { cloudinaryconfig } from './utils/cloudinaryConfig'
import paymentRouter from './routes/payment.router'
import wishlist from './routes/wishList'
const port: number = JSON.parse(process.env.PORT as string)|| 9000


const app = express();
app.use(express.json())
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
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
  res.send(`server is Running go to ${process.env.CLIENT_URL}`);
})
app.use('/signup', signup)
app.use('/login', login)
app.use('/auth',authRouter)
app.use('/product', product)
app.use('/google-auth', googleSuccessAth)
app.use('/cart',cart)
app.use('/order', order)
app.use('/payment', paymentRouter)
app.use('/wishlist',wishlist)
app.use('/admin/dashboard',adminDashboard)
app.use('/rating',ratingRouter)
app.use('/banner',bannerRouter)
app.post('/test', async (req: Request, res: Response) => {
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





mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  console.log('mongodb connected');

}).catch((err) => {
  console.log(err);

})


app.listen(port, () => console.log(`server running on port localhost:${port}`)
)
