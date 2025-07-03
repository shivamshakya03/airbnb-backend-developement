import {promises as fs} from 'fs';
import { getDb } from '../utils/database.js';
import { ObjectId } from 'mongodb';

export default class favoriteModel {
    constructor(homeId) {
        this.homeId = homeId;
    }

    save() {
        const db = getDb();
        return db.collection('favourite').findOne({ homeId: this.homeId.toString() }).then(existing => {
        if (existing) {
            console.log('Home already exists in favourites');
            return { alreadyExists: true };
        } else {
            return db.collection('favourite').insertOne(this);
        }
    });
    }
    

    static getFavourite() {
        const db = getDb();
        return db.collection('favourite').find().toArray();
          
    }

    static deleteById(delHomeId) {
        const db = getDb();
        return db.collection('favourite').deleteOne({homeId: delHomeId.toString()});
        
    }
}