import HomeModel from "../models/homeDatalogic.js";





// This is a part of model(handle data Logic):
const DEFAULT_HOMES = [
    {
        imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaSkURYm6_8oK1ThYddWYhPJTarRNzsDECCg&s',
        location: 'Flat in Benaulin',
        price: '4,800',
        nights: '2',
        rating: '4.91'
  },
    {
    imgUrl: 'https://a0.muscache.com/im/pictures/e581ead5-8497-48f9-9b01-697efd704801.jpg?im_w=1920',
    location: 'Guest House in Majorda',
    price: '2568',
    nights: '2',
    rating: '4.5'
},
{
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUIwNDGXUTbfZTlum0sBo-9rJo6q43OM1B4Q&s',
    location: 'Flats in Varca',
    price: '7075',
    nights: '2',
    rating: '4.88'
  },
    {
        imgUrl: 'https://a0.muscache.com/im/pictures/d6ce61b5-87e5-4f45-b54d-42f2f7ef9a55.jpg',
    location: 'Tiny Home in Mysore',
    price: '3555',
    nights: '2',
    rating: '4.94'
},
    {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9onGDiZWhq5azM7yz68ViNsVY-SKF4EzW7Q&s',
    location: 'Apartment in Anjuna',
    price: '3389',
    nights: '2',
    rating: '4.85'
  },
  {
    imgUrl: 'https://static2.tripoto.com/media/filter/tst/img/268998/TripDocument/1510300107_summertime_villa.jpg',
    location: 'Cottage in Kodagu',
    price: '7988',
    nights: '2',
    rating: '4.2'
  },
   {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjUTqb0TOTChtOCQdsrrfiHaz7Lfp90oY5w&s',
    location: 'Farm stay in Medikeri',
    price: '7210',
    nights: '2',
    rating: '4.5'
},
   {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6E--DrvJHsEg90h50O9SEax9L9oQGY_I7nA&s',
    location: 'Home in Los Angels',
    price: '13,895',
    nights: '2',
    rating: '4.98'
  },
   {
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROxnR7vfeMc6pQ4PUDZb0N7uyfAZTN5ef6yA&s',
    location: 'Nature lodge in Chelvara',
    price: '14607',
    nights: '2',
    rating: '4.25'
},
   {
    imgUrl: 'https://cdn.prod.website-files.com/62543b24f185dbadbab457e8/675b827860a43103d7638e15_62a733e1fa0ea16f522f6606_why_some_properties_work_header%20(1).webp',
    location: 'Home in Ooty',
    price: '27,731',
    nights: '2',
    rating: '4.25'
}
]


export const getHome = (req, res) => {
  HomeModel.fetchAll().then((registeredHomes) => {;
    res.render('store/home-index', {registeredHomes: registeredHomes})
  }).catch(err=> {
    console.log("Error while fetching homes: ", err);
    res.status(500).send("Internal Server Error");
  })
}

export const getHomeDetails = (req, res) => {
  const homeid = req.params.homeId;
  
  HomeModel.findById(homeid).then((home) => {
    if(!home) {
      res.redirect("/");
    }
    else{
        console.log("Home Details Found: ", home);
        res.render('store/home-details', {home: home})
    }
  }).catch (err => {
    console.log("Error while fetching home details: ", err);
    res.status(500).send("Internal Server Error");
  }) 

  
}



export const geteditHome = (req, res) => {

  HomeModel.fetchAll().then((data) => {
    res.render('store/edit-home', { registeredHomes: data, DEFAULT_HOMES });
  }).catch (err => {
    console.error("Error while loading edit home page:", err);
    res.status(500).send("Internal Server Error");
  })
};


