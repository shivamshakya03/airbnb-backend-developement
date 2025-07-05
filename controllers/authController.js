import { check, validationResult } from "express-validator";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getLogin = (req,res) => {
    res.render('store/login', {pageTitle: "Login", isLoggedIn: false});
}

export const postLogin = async (req, res) => {
    // req.isLoggedIn = true;
    // res.cookie('isLoggedIn', true);
 
    const {email, password} = req.body;
    const user = await User.findOne({ email: email });
    if(!user) {
        return res.status(400).render('store/login', {
            pageTitle: "Login",
            isLoggedIn: false,
            errors: ['Invalid email address'],
            oldInput: {
                email: req.body.email
            },
            user : {}
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
        return res.status(400).render('store/login', {
            pageTitle: "Login",
            isLoggedIn: false,
            errors: ['Invalid password'],
            oldInput: '',
            user : {}
        });
    }
    
    req.session.isLoggedIn = true; 
    req.session.user = user; // Store the user in the session
    await req.session.save(); // Save the session to the database
    res.redirect('/');
};


export const getLogout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
};


// GET /signup
export const getsignup = (req, res) => {
  res.render('store/signup', {
    pageTitle: "Sign Up",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstname: '',
      lastname: '',
      email: '',
      userType: ''
    },
    user : {}
  });
};


export const postSignup = [
    
    check('firstname')
        .notEmpty().withMessage('First name is required')
        .trim()
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long')
        .matches(/^[a-zA-Z]+$/).withMessage('First name must contain only letters'),
    
    check('lastname')
        .matches(/^[a-zA-Z]+$/).withMessage('Last name must contain only letters')
        .trim(),

    check('email')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long') 
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
        .trim(),
    
    check('confirmPassword')
        .notEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),

    check('userType')
        .notEmpty().withMessage('User type is required')
        .isIn(['host', 'guest']).withMessage('User type must be either "host" or "guest"'),

    check('termsAccepted')
        .notEmpty().withMessage('You must accept the terms and conditions')
        .custom(value => {
          if (value !== 'on') {
            throw new Error('You must accept the terms and conditions');
          }  
          return true;
            
        }),
    
    
    
    
    (req, res) => {
        const {firstname, lastname, email, password, userType} = req.body;
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            return res.status(400).render('store/signup', {
                pageTitle: "Sign Up",
                isLoggedIn: false,
                errors: validationErrors.array().map(err => err.msg),
                oldInput: {
                    firstname,
                    lastname,
                    email,
                    userType
                },
                user : {}
            });
        }

        bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({firstname,lastname,email,password : hashedPassword,userType});
            return user.save();
        }).then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            console.error("Error saving user:", err);
            res.status(500).render('store/signup', {
                pageTitle: "Sign Up",
                isLoggedIn: false,
                errors: ['An error occurred while creating your account. Please try again later.'],
                oldInput: {
                    firstname,
                    lastname,
                    email,
                    userType
                },
                user : {}
            });
        }
    );

    }

];
