import { Router } from "express";
import { addBanner } from "../controllers/addBanner.controller";
import adminAuth from "../middleware/adminAuth.middleware";
import { ProductUpload } from "../middleware/multer.middleware";
import multer from "multer";
import { getBanners } from "../controllers/getBanners.controller";


const router=Router();
const upload = multer({ dest: './public' });
router.post('/addbanner',ProductUpload.single('file'),adminAuth,addBanner)
router.get('/getbanners',getBanners)

export default router;