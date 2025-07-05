import Home from "../models/homeDatalogic.js";
import fs from 'fs';


export const getAddHome = (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    res.render('host/addHomes', {editing:false, isLoggedIn: req.isLoggedIn, user: req.session.user});
}


// This is a part of model(handle data Logic):
export const registeredHomes = [];

export const postHome = async (req, res) => {

    const {location, price, night, rating, imgUrl} = req.body;
    const imageFiles = req.files['photos'] || [];
    const pdfFile = req.files['homeDetails']?.[0]?.path.replace(/\\/g, '/'); // optional
          
          // Normalize each path and collect into an array
       
    const photoPaths = imageFiles.map(file => file.path.replace(/\\/g, '/'));

        const homeObj = new Home({location, price, night, rating, imgUrl,pdfs: pdfFile, photo: photoPaths});
       
   
        homeObj.save().then((rows)=> {
          res.render('host/post-home', {home: homeObj, isLoggedIn: req.isLoggedIn, user: req.session.user});
        }).catch(err => {
          console.log("Error while saving home: ", err);  
        })    
}
export const getEditHomeform = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === 'true'; // Check if editing is true
    Home.findById(homeId).then((home) => {
    if (!home) {
        return res.redirect('/');
    }
    res.render('host/addHomes', { home:home, editing:editing, user: req.session.user});
    }).catch(err => {
      console.error("Error while fetching home for edit:", err);
      res.status(500).send("Internal Server Error");
    })
}

export const postEditHome = (req, res) => {
  const { _id, location, price, night, rating, imgUrl } = req.body;
  Home.findById(_id).then((home) => {
    home.location = location;
    home.price = price; 
    home.night = night;
    home.rating = rating;
    home.imgUrl = imgUrl;

    if(req.file) {
      fs.unlink(home.photo, (err) => {
        if (err) {
          console.error("Error deleting old photo:", err);
        }
      });
      // If a new file is uploaded, update the photo path
      home.photo = req.file.path; // Update the photo path if a new file is uploaded
    }


    home.save().then(() => {
      console.log("Home updated successfully");
      res.redirect('/');
    }).catch(err => {
      console.error("Error while updating home:", err);
      res.status(500).send("Internal Server Error");
    });
  }).catch(err => {
    console.error("Error while finding home for update:", err);
    res.status(500).send("Internal Server Error");
  });
 
};



export const deleteHome = (req, res, next) => {
    const homeid = req.params.homeId;

    Home.findByIdAndDelete(homeid).then(() => {;
        console.log('Successfully deleted');
        res.redirect('/');
    }).catch(err =>{
        console.error('Error deleting home:', err);
        res.status(500).send('Internal Server Error');
    });

}


export const getHouseRules = [(req, res, next) => {
    
    if(!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
  },

  (req, res) => {
    const fileName = req.params.fileName;
      const filePath = `homeInfoPdfs/${fileName}`;
      
      res.download(filePath, 'Rules.pdf', (err) => {
          if (err) {
              console.error('Error downloading file:', err);
              res.status(404).send('File not found');
          }
      });

  }
]
