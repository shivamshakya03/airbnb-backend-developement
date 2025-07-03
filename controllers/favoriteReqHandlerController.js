import favoriteModel from "../models/favoriteDatalogic.js";
import HomeModel from "../models/homeDatalogic.js";


export const getfavouriteHome =   (req, res) => {
  favoriteModel.getFavourite().then(favDocs => {
    const favIds = favDocs.map(fav => fav.homeId);
    HomeModel.fetchAll().then(Allhomes => { 
    const favoritehome = Allhomes.filter(home => favIds.includes(home._id.toString()));
    
    res.render('store/favorites', {favoritehome: favoritehome});

    });
  });
} 
 

export const postAddtofavorite = (req, res) => {
  const homeid = req.params.homeID;
  console.log(homeid);
  const fav = new favoriteModel(homeid);

  fav.save().then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  }).finally (() => {
    res.redirect('/');
  })
  

}
export const removefavHome = (req, res) => {
 
  let homeId = req.params.homeID;

  console.log(homeId);
  favoriteModel.deleteById(homeId).then(() => {
    console.log('Home removed from favorites');
  }).catch(err => {
    console.log(err);
  }).finally(() => {  
    res.redirect('/favorite');
  });

}

