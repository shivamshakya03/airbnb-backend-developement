// core imports
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// middleware and packages
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import ConnectMongo from 'connect-mongodb-session';

// routers
import hostRouter from './routes/hostRouter.js';
import userRouter from './routes/storeRouter.js';
import favRouter from './routes/favouriteRouter.js';
import authRouter from './routes/authRouter.js';

// setup app and constants
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = process.env.PORT || 7000;

// MongoDB URI and session store
const DRIVER_URI = "mongodb+srv://shivamshakya33871:20ShakyA03@cluster0.hhqhszc.mongodb.net/airbnb-app?retryWrites=true&w=majority&appName=Cluster0";
const MongoDBStore = ConnectMongo(session);
const sessionStore = new MongoDBStore({
    uri: DRIVER_URI,
    collection: 'sessions'
});

// view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/homeInfoPdfs', express.static(path.join(__dirname, 'homeInfoPdfs')));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "learning Backend Dev Session",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
}));

// expose login state to views
app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn || false;
    req.isLoggedIn = req.session.isLoggedIn || false;
    next();
});

// user routes
app.use(userRouter);

// host protected route
app.use('/host', (req, res, next) => {
    if (!req.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
});
app.use(hostRouter);

// other routes
app.use(favRouter);
app.use(authRouter);

// fallback 404
app.use((req, res) => {
    res.status(404).render('pageNotfound404', { pageTitle: "Page Not Found" });
});

// DB connection + server boot
mongoose.connect(DRIVER_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB using Mongoose");
        app.listen(PORT, () => {
            console.log(`🚀 Airbnb Server Running on: http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("❌ Error connecting to MongoDB:", err);
        throw err;
    });
