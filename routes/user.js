const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),userController.login );

//router.get("/signup",userController.renderSignUpForm
//     (req,res)=>{
//    // res.send("form")
//     res.render("users/signup.ejs");
// }
//);

//router.post("/signup",wrapAsync(userController.signUp
//     async(req,res)=>{
//     try{
//     let {username, email, password} = req.body;
//     const newUser = new User ({email, username});
//     const registeredUser = await User.register(newUser, password);
//   //  console.log(registeredUser);
//     req.login(registeredUser,(err)=>{
//         if(err) {
//             return next(err);
//         }
//      req.flash("success", "Welcome To Wanderlust!");
//      res.redirect("/listings");
// });
//     } catch(e){
//         req.flash("error", e.message);
//         res.redirect("/signup");
//     }
// }
//));

//router.get("/login",userController.renderLoginForm
//     (req,res)=>{
//      res.render("users/login.ejs");
// }
//);

//router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : "/login", failureFlash : true}),userController.login 
//    async(req,res)=>{
//    // res.send
//    req.flash("success", "Welcome back to Wanderlust!");
//   // res.redirect("/listings");
//   let redirectUrl = res.locals.redirectUrl || "/listings";
//  // res.redirect(req.session.redirectUrl);
//  // res.redirect(res.locals.redirectUrl);
//     res.redirect(redirectUrl);
// }
//);

router.get("/logout",userController.LogOut
//     (req,res,next)=>{
//     req.logout((err) => {
//         if (err) { 
//             next(err); 
//         }
//         req.flash("success", "You are logged out now!");
//         res.redirect("/listings");
        
//     });
// }
);

module.exports = router;
