const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
//const Review = require("./models/review.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
//const {listingSchema,reviewSchema} = require("./schema.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

//to use session 
app.use(session(sessionOptions));
app.use(flash());

//to use/implement passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
   // console.log(res.locals.success);
   res.locals.error = req.flash("error");
   next();
});

// const validateListing = (req,res,next) => {
//     let {error} = listingSchema.validate(req.body);
//   //  console.log(result);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",")
//         throw new ExpressError(400,error.message);
//     } else {
//         next();
//     }
// };


// const validateReview = (req,res,next) => {
//     let {error} = reviewSchema.validate(req.body);
//   //  console.log(result);
//     if(error){
//         let errMsg = error.details.map((el)=>el.message).join(",")
//         throw new ExpressError(400,error.message);
//     } else {
//         next();
//     }
// };

//cut routes from here----and shifted to listing.js

//index route
// app.get("/listings",wrapAsync(async(req,res)=>{
//     const allListings =  await Listing.find({})
//     res.render("listings/index.ejs",{allListings});
//     // .then(res=>{
//     //     console.log(res);
// }));

//new route
// app.get("/listings/new",(req,res)=>{
//     res.render("listings/new.ejs");
// });

//show route
// app.get("/listings/:id",wrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs",{listing});
// }));

///Create route
// app.post("/listings",validateListing ,wrapAsync(async(req,res,next)=>{
    // try{
    // let {title,description,image,price,countryt,location} = req.body;
    //  let listing = req.body.listing;
 //    if(!req.body.listing){
 //      throw new ExpressError(400,"send valid data for listing");
 //     }
 
     // let result = listingSchema.validate(req.body);
     // console.log(result);
     // if(result.error){
     //         throw new ExpressError(400,result.error);
     // }
 
    //  const newListing =  new Listing(req.body.listing);
 //     if(!newListing.title){
 //         throw new ExpressError(400,"Title is missing");
 //     }
 //     if(!newListing.description){
 //             throw new ExpressError(400,"Description is missing");
 //     }
 //     if(!newListing.location){
 //         throw new ExpressError(400,"Location is missing");
 // }
 
        //  await newListing.save();
   // console.log(listing);
        //  res.redirect("/listings");
     // }  catch (err) {
     //     next(err);
     // }
//  }));
 
 //edit route
//  app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//      let {id} = req.params;
//      const listing = await Listing.findById(id);
//      res.render("listings/edit.ejs",{listing});
//  }));
 
 //Update route
//  app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
//      // if(!req.body.listing){
//      //     throw new ExpressError(400,"send valid data for listing");
//      //   }
//      let {id} = req.params;
//      await Listing.findByIdAndUpdate(id,{...req.body.listing});
//      res.redirect(`/listings/${id}`);
//  }));
 
 //DELETE ROUTE
//  app.delete("/listings/:id",wrapAsync(async (req,res)=>{
//      let {id} = req.params;
//      let deletedListing = await Listing.findByIdAndDelete(id);
//      console.log(deletedListing);
//      res.redirect("/listings");
//  }));
 
 // app.get("/testListing",async (req, res)=>{
 //     let sampleListing = new Listing ({
 //         title : "My New Villa",
 //         description : "By the beach",
 //         price : 1200,
 //         location : "Calangute,Goa",
 //         country : "India"
 //     });
 //     await sampleListing.save();
 //     console.log("sample was saved");
 //     res.send("successful testing");
 // });

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email : "shreyash@gmail.com",
//         username : "shreyash"
//     });
//     const registeredUser = await User.register(fakeUser,"shreyash");
//     res.send(registeredUser);
// });

app.use("/listings",listingRouter);
 
//reviews routes are cut --------------and paste in review.js
// //Reviews - POST route
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async (req,res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//     console.log("new review saved");
//   // res.send("new review saved");
//   res.redirect(`/listings/${listing._id}`);
//   //or                      // req.params.id
// }));

// //DELETE REVIEW ROUTE
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req,res) => {
//     let{id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull:{reviews : reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`) ;
// })
// );

app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="something went wrong"} = err;
    // res.render("error.ejs",{err});
    res.status(statusCode).render("error.ejs",{message});
//   res.status(statusCode).send(message);
 //   res.send("something went wrong!");
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});