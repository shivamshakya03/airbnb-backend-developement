import fs from  'fs';
import path, { dirname } from 'path';
import { registeredHomes } from '../controllers/hostReqHandlerController.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbfilePath = path.join(__dirname,'data', 'homes.json');

export default class HomeModel {
    constructor(location, price, night, rating, imgUrl) {
        this.location = location;
        this.price = price;
        this.rating = rating;
        this.night = night;
        this.imgUrl = imgUrl;

    }

    save(){
        HomeModel.fetchAll(registeredHomes => {
            if(this.id) {                                               //edit home case
                registeredHomes = registeredHomes.map(home => {
                    // home.id === this.id ? this : home;
                    if(home.id === this.id) {
                        return this;
                    }
                    else {return home;}
                })
            }
            else{                                                       //Add new home case
                this.id = Math.random().toString();
                registeredHomes.push(this);
              
            }
            
            fs.writeFile(dbfilePath, JSON.stringify(registeredHomes), (err) => {
                if (err) {
                    console.log("Error While Writing File(SAVE): ", err);
                }
            })
        })
    }

    

    
    static fetchAll(callback) {
        // const dbfilePath = path.join(__dirname,'data', 'homes.json');
        fs.readFile(dbfilePath, (err,data) => {
            callback(!err ? JSON.parse(data) : []);
        })

    }

    // FINDING SPECIFIC HOME:

    static findById(homeId, callback) {
        //abhi mujhe particular hom id chahiye, tho phele sare ghr nikl lete hai usme me apna particular ghr dudhunga

        this.fetchAll(homes => {
            const homefound = homes.find(home => home.id === homeId);
            callback(homefound); //"When you're done finding the home, call this function with the result."

            //Why Use a Callback?
            //This pattern is used because fetchAll is asynchronous — for example, it may read from a file or database, which takes time. JavaScript doesn’t wait — it uses a callback to continue once data is ready.


        })
    }


    static deleteById(homeId, callback) {
        HomeModel.fetchAll(homes => {
            homes = homes.filter(home => home.id !== homeId);
            fs.writeFile(dbfilePath, JSON.stringify(homes), callback)
        })
    }
}