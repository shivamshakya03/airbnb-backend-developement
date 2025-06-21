import HomeModel from "../models/homeDatalogic.js";


export const getAddHome = (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    res.render('host/addHomes', {editing:false})
}


// This is a part of model(handle data Logic):
export const registeredHomes = [];

export const postHome = (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html'))
    // console.log(req.body)
    registeredHomes.push(req.body);

    const {location, price, night, rating, imgUrl} = req.body;
    const homeObj = new HomeModel(location, price, night, rating, imgUrl);
    homeObj.save();
    res.render('host/post-home')
    
}
export const getEditHomeform = (req, res) => {
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';  
    HomeModel.findById(homeId, home=> {
        if(!home){
            return res.redirect('/store/edit-homes');

        }
        console.log(home);
        res.render('host/addHomes', {home:home,editing:editing} );

    
    })

}

export const postEditHome = (req, res) => {
    const {id,location, price, night, rating, imgUrl} = req.body;
    console.log("POST BODY WHILE UPDATING",req.body);
    const homeObj = new HomeModel(location, price, night, rating, imgUrl);
    homeObj.id = id;
    homeObj.save();
    // res.redirect('store/home-index');
    res.redirect('/');

}



export const deleteHome = (req, res, next) => {
    const homeid = req.params.homeId;

    HomeModel.deleteById(homeid, err => {
        if (err) {
            console.log("Error While deleting", err);
        }
        res.redirect('/edit-home');
    })

}

