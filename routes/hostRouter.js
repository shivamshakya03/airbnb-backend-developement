import express from 'express'
import {getAddHome, postHome,getEditHomeform, postEditHome, deleteHome, getHouseRules} from '../controllers/hostReqHandlerController.js'
import { uploadFields } from '../middlewares/multer.js';


export const router = express.Router();

router.get('/add-home', getAddHome)




router.post('/post-home',uploadFields,  postHome)

router.post('/edit-home', postEditHome);
router.get('/host/addHomes/:homeId', getEditHomeform)

router.post('/edit-home', postEditHome);


router.post('/host/deleteHome/:homeId', deleteHome);

router.get('/homeInfoPdfs/:fileName', getHouseRules)




export default router;
