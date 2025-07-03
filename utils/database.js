import mongodb from 'mongodb';
const monhoClient = mongodb.MongoClient;


const DRIVER_URI = "mongodb+srv://shivamshakya33871:20ShakyA03@cluster0.hhqhszc.mongodb.net/airbnb-app?retryWrites=true&w=majority&appName=Cluster0"

let _db;
export const mongoConnect = (callback) => {
    monhoClient.connect(DRIVER_URI)
        .then(client => {
            console.log("Connected to MongoDB");
            _db = client.db('airbnb-app'); // Get the database instance
            callback();
        })
        .catch(err => {
            console.log("Error connecting to MongoDB: ", err);
            throw err;
        });
}
export const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error("No database found!");
}

