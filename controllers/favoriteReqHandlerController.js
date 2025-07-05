import User from "../models/userModel.js";


export const getfavouriteHome = async  (req, res) => {
  const UserId = req.session.user._id; // Assuming user ID is stored in session
  const user = await User.findById(UserId).populate('favourites'); // Populate the favorites field with Home documents
  res.render('store/favorites', {favoritehome: user.favourites, isLoggedIn: req.session.isLoggedIn, user: req.session.user});
  
} 
 

export const postAddtofavorite = async (req, res) => {
  const homeId = req.params.homeID;
  const userId = req.session.user._id; // Assuming user ID is stored in session
  const user = await User.findById(userId);
  if(!user.favourites.includes(homeId)) {
    user.favourites.push(homeId); 
    await user.save();
  }
  return res.redirect('/');


  
};


export const removefavHome = async (req, res) => {
  
  let homeId = req.params.homeID;
  const userId = req.session.user._id; // Assuming user ID is stored in session
  const user = await User.findById(userId);

  if(user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter(fav => fav.toString() !== homeId.toString());
    await user.save();
  }
  res.redirect('/favorite');


}

