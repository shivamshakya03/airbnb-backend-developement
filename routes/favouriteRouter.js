import {getfavouriteHome, postAddtofavorite} from "../controllers/favoriteReqHandlerController.js";


router.get('/favorite' , getfavouriteHome);
router.post('/favorite' , postAddtofavorite);