import express from 'express';
import { getHome ,getHomeDetails ,geteditHome} from '../controllers/storeReqHandlerController.js';


const router = express.Router();  // route or endpoint what user see.



router.get('/', getHome);

router.get('/home/:homeId', getHomeDetails)


router.get('/edit-home', geteditHome);







export default router;

 