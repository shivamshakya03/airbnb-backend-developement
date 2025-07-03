import {getfavouriteHome, postAddtofavorite, removefavHome} from "../controllers/favoriteReqHandlerController.js";

import express from 'express';
const router = express.Router();


router.get('/favorite' , getfavouriteHome);

router.post('/favorite/:homeID' , postAddtofavorite);
router.post('/removefavHome/:homeID' , removefavHome);



export default router;