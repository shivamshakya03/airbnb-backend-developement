import express from 'express'
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import hostRouter from './routes/hostRouter.js'
import userRouter from './routes/storeRouter.js'
import favRouter from './routes/favouriteRouter.js'
import { mongoConnect } from './utils/database.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');



// 1. GET the file path from the url of the current module
const __filename = fileURLToPath(import.meta.url); 

// 2. get the directory name from the file path.
const __dirname = dirname(__filename);

// serving static file (style.css)
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded());


app.use(userRouter);


app.use(hostRouter);
app.use(favRouter);

// app.post()

app.use((req,res) => {
    res.status(404).render('pageNotfound404', {pageTitle: "Page Not Found"});
})

const PORT = process.env.PORT || 7000 ;
mongoConnect(() => {
    app.listen(PORT, ()=>{
        console.log(`Airbnb Server Running on: ${PORT}`)
    })
})