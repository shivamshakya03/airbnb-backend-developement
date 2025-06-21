import fs from  'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const favouritesPath = path.join(__dirname,'data', 'favorite.json');


export default class favoriteModel {


    static addtoFavourite(id, callback) {
        favoriteModel.getFavourite((favorites) => {
            if(favorites.includes(id)) {
                callback("Home is already added to favorite");
            }
            else{
                favorites.push(id);
                fs.writeFile(favouritesPath, JSON.stringify(favorites), callback)
              
            }
        });
    }


    static getFavourite(callback) {
        fs.readFile(favouritesPath, (err,data) => {
            callback(!err ? JSON.parse(data) : [])
        })
    }

    static deleteById(delHomeId, callback) {
        favoriteModel.getFavourite(homeIDs => {
            homeIDs = homeIDs.filter(homeId => delHomeId !== homeId);
            fs.writeFile(favouritesPath, JSON.stringify(homeIDsf), callback)
        })
    }
}