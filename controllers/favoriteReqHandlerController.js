import favoriteModel from "../models/favoriteDatalogic.js";
import HomeModel from "../models/homeDatalogic.js";


export const getfavouriteHome = (req, res) => {
  favoriteModel.getFavourite((favourites) => {
    HomeModel.fetchAll((homes) => {
      const favoriteDetails = favourites.map(homeId => homes.find(home => home.id === homeId));
      res.render('store/favorites.ejs' , {favoriteDetails: favoriteDetails});
      
    })
  })

} 
                //   OR

// export const getfavouriteHome = (req, res, next) => {
//     favoriteModel.getFavourite((favoritesHome) => {
//         HomeModel.fetchAll((AllHomes) => {
//             const favoriteHomeDetails = favoritesHome.map(favhomeID => {
//                 AllHomes.find((home) => {
//                     home.id === favhomeID;
//                 })
//             })
//         })
//     })
// }

export const postAddtofavorite = (req, res) => {
  favoriteModel.addtoFavourite(req.body.id, err => {
    if(err) {
      console.log("Error While Marking Favourite!", err);
    }
    res.redirect('/favorite')
    
  })

}

