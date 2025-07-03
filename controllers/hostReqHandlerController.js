import HomeModel from "../models/homeDatalogic.js";


export const getAddHome = (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    res.render('host/addHomes', {editing:false})
}


// This is a part of model(handle data Logic):
export const registeredHomes = [];

export const postHome =  (req, res) => {
        const {location, price, night, rating, imgUrl} = req.body;
        const homeObj = new HomeModel(location, price, night, rating, imgUrl);
        homeObj.save().then(()=> {
          res.render('host/post-home')
        }).catch(err => {
          console.log("Error while saving home: ", err);  
        }) 

  
    
}
export const getEditHomeform = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; // Check if editing is true
    HomeModel.findById(homeId).then((home) => {
    if (!home) {
        return res.redirect('/');
    }
    res.render('host/addHomes', { home:home, editing:editing});
    }).catch(err => {
      console.error("Error while fetching home for edit:", err);
      res.status(500).send("Internal Server Error");
    })
}

export const postEditHome = (req, res) => {
  const { _id, location, price, night, rating, imgUrl } = req.body;
  const updatedHome = new HomeModel(location, price, night, rating, imgUrl);
  updatedHome._id = _id;
  console.log("Updated Home Object: ", updatedHome);
  
  updatedHome.save().then(() => {
    res.redirect('/');

  }).catch(err => {
    console.error("Error while updating home:", err);
    res.status(500).send("Internal Server Error");
  })
};



export const deleteHome = (req, res, next) => {
    const homeid = req.params.homeId;

    HomeModel.deleteById(homeid).then(() => {;
        console.log('Successfully deleted');
        res.redirect('/');
    }).catch(err =>{
        console.error('Error deleting home:', err);
        res.status(500).send('Internal Server Error');
    })

}

