import express from 'express'
import {getAddHome, postHome,getEditHomeform, postEditHome, deleteHome} from '../controllers/hostReqHandlerController.js'

export const router = express.Router();

router.get('/add-home', getAddHome)

const DEFAULT_HOMES = [
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  },
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  },
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  },
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  },
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  },
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
    location: 'Flats in Los',
    price: '1200000',
    nights: '2',
    rating: '4.5'
  }
]



router.post('/post-home',  postHome)

router.post('/edit-home', postEditHome);
router.get('/host/addHomes/:homeId', getEditHomeform)

router.post('/edit-home', postEditHome);


router.post('/host/deleteHome/:homeId', deleteHome);





export default router;
