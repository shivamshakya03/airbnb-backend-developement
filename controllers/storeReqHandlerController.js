import Home from "../models/homeDatalogic.js";







export const getHome = (req, res) => {
  Home.find().then((registeredHomes) => {;
    res.render('store/home-index', {registeredHomes: registeredHomes, isLoggedIn: req.session.isLoggedIn, user: req.session.user})
  }).catch(err=> {
    console.log("Error while fetching homes: ", err);
    res.status(500).send("Internal Server Error");
  })
}

export const getHomeDetails = (req, res) => {
  const homeid = req.params.homeId;
  
  Home.findById(homeid).then((home) => {
    if(!home) {
      res.redirect("/");
    }
    else{
        console.log("Home Details Found: ", home);
        res.render('store/home-details', {home: home, isLoggedIn: req.session.isLoggedIn, user: req.session.user})
    }
  }).catch (err => {
    console.log("Error while fetching home details: ", err);
    res.status(500).send("Internal Server Error");
  }) 

  
}



export const geteditHome = (req, res) => {

  Home.find().then((data) => {
    res.render('store/edit-home', { registeredHomes: data, isLoggedIn: req.session.isLoggedIn, user: req.session.user});
  }).catch (err => {
    console.error("Error while loading edit home page:", err);
    res.status(500).send("Internal Server Error");
  })
};


