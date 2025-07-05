// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import {promises as fs} from 'fs';
// import { get } from 'http';
// import { getDb } from '../utils/database.js';
// import { ObjectId } from 'mongodb';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const dbfilePath = path.join(__dirname,'data', 'homes.json');

// export default class HomeModel {
//     constructor(location, price, night, rating, imgUrl) {
//         this.location = location;
//         this.price = price;
//         this.rating = rating;
//         this.night = night;
//         this.imgUrl = imgUrl;

//     }

//     save(){
//         const db = getDb();
//         if(this._id) {
//             const updatedHomeData = {
//                 location: this.location,
//                 price: this.price,
//                 night: this.night,
//                 rating: this.rating,
//                 imgUrl: this.imgUrl
//             };
//             return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updatedHomeData});
//         } else {
//             // If no _id is provided, we assume it's a new home and insert it
//             return db.collection('homes').insertOne(this);
//         }
//     }
    
    
    
    
//     static fetchAll() {
//         const db = getDb();
//         return db.collection('homes').find().toArray();
          
        
//     }

//     // FINDING SPECIFIC HOME:

//       static findById(homeId) {
//         const db = getDb();
//         return db.collection('homes').findOne({_id: new ObjectId(String(homeId))});
        
//     }

//     static deleteById(homeId) {
//         const db = getDb();
//         return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
        
//     }
// }

import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    night: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    pdfs: {
        type: String,
        required: true
    },
    photo: [{
        type: String,
        required: true
    }]
});

// homeSchema.pre('findOneAndDelete', async function(next) {
//     const homeId = this.getQuery()._id;
//     await Favorite.deleteMany({ homeId: homeId });
//     next();
// });

export default mongoose.model('Home', homeSchema);