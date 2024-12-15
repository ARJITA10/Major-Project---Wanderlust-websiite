const User = require("../models/user.js");
// mvc frameworks- views,models,dbs,controllers

module.exports.renderSignUpForm = (req,res)=>{
    // res.send("form")
     res.render("users/signup.ejs");
};

module.exports.signUp = async(req,res)=>{
    try{
    let {username, email, password} = req.body;
    const newUser = new User ({email, username});
    const registeredUser = await User.register(newUser, password);
  //  console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err) {
            return next(err);
        }
     req.flash("success", "Welcome To Wanderlust!");
     res.redirect("/listings");
});
    } catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm =  (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login =  async(req,res)=>{
    // res.send
    req.flash("success", "Welcome back to Wanderlust!");
   // res.redirect("/listings");
   let redirectUrl = res.locals.redirectUrl || "/listings";
  // res.redirect(req.session.redirectUrl);
  // res.redirect(res.locals.redirectUrl);
     res.redirect(redirectUrl);
};

module.exports.LogOut = (req,res,next)=>{
    req.logout((err) => {
        if (err) { 
            next(err); 
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
        
    });
};