import express from 'express'
import {getAddHome, postHome,getEditHomeform, postEditHome, deleteHome} from '../controllers/hostReqHandlerController.js'

export const router = express.Router();

router.get('/add-home', getAddHome)




router.post('/post-home',  postHome)

router.post('/edit-home', postEditHome);
router.get('/host/addHomes/:homeId', getEditHomeform)

router.post('/edit-home', postEditHome);


router.post('/host/deleteHome/:homeId', deleteHome);





export default router;
