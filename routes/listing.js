const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
//const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,IsOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
//const upload = multer({ dest: 'uploads/' })
const upload = multer({storage});

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

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'),validateListing ,wrapAsync(listingController.createListing));
// .post( upload.single('listing[image]'),(req,res)=>{
//    // res.send(req.body);
//    res.send(req.file);
// });

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm
    //     (req,res)=>{
    //     //console.log(req.user);
    //     res.render("listings/new.ejs");
    // }
);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,IsOwner,validateListing,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,IsOwner,wrapAsync(listingController.destroyListing));

//index route
//router.get("/",wrapAsync(listingController.index
//     async(req,res)=>{
//     const allListings =  await Listing.find({})
//     res.render("listings/index.ejs",{allListings});
//     // .then(res=>{
//     //     console.log(res);
// }
// )
// );



//show route
//router.get("/:id",wrapAsync(listingController.showListing
    // async (req,res)=>{
    // let {id} = req.params;
    // const listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    // if(!listing){
    //     req.flash("error"," Listing you requested for does not exist!");
    //     return res.redirect("/listings");
    // }
    // console.log(listing);
    // res.render("listings/show.ejs",{listing});}
//));

//Create route
//router.post("/",isLoggedIn, validateListing ,wrapAsync(listingController.createListing
//     async(req,res,next)=>{
//     try{
//     let {title,description,image,price,countryt,location} = req.body;
//      let listing = req.body.listing;
//     if(!req.body.listing){
//       throw new ExpressError(400,"send valid data for listing");
//      }
 
//      let result = listingSchema.validate(req.body);
//      console.log(result);
//      if(result.error){
//              throw new ExpressError(400,result.error);
//      }
     
//      const newListing =  new Listing(req.body.listing);
//      if(!newListing.title){
//          throw new ExpressError(400,"Title is missing");
//      }
//      if(!newListing.description){
//              throw new ExpressError(400,"Description is missing");
//      }
//      if(!newListing.location){
//          throw new ExpressError(400,"Location is missing");
//  }
//        // console.log(req.user);
//         newListing.owner = req.user._id;
//          await newListing.save();
//          req.flash("success","New Listing Created!");
//    console.log(listing);
//          res.redirect("/listings");
//      }  catch (err) {
//          next(err);
//      }
//  }
//));
 
 //edit route
router.get("/:id/edit",isLoggedIn,IsOwner, wrapAsync(listingController.renderEditForm
//     async(req,res)=>{
//      let {id} = req.params;
//      const listing =  await Listing.findById(id);
//     if(!listing){
//         req.flash("error"," Listing you requested for does not exist!");
//         return res.redirect("/listings");
//     }
//      res.render("listings/edit.ejs",{listing});
//  }
));
 
 //Update route
//router.put("/:id",isLoggedIn,IsOwner,validateListing,wrapAsync(listingController.updateListing
    // async(req,res)=>{
    //  // if(!req.body.listing){
    //  //     throw new ExpressError(400,"send valid data for listing");
    //  //   }
    //  let {id} = req.params;
    // //  let listing = await Listing.findById(id);
    // //  if(!listing.owner.equals(res.locals.currUser._id)) {
    // //      req.flash("error","You do not have permission to edit.");
    // //      return res.redirect(`/listings/${id}`);
    // //  }
    //  await Listing.findByIdAndUpdate(id,{...req.body.listing});
    //  req.flash("success"," Listing Updated!");
    //  res.redirect(`/listings/${id}`);
 //}
//));

 
 //DELETE ROUTE
//router.delete("/:id",isLoggedIn,IsOwner,wrapAsync(listingController.destroyListing
//     async (req,res)=>{
//      let {id} = req.params;
//      let deletedListing = await Listing.findByIdAndDelete(id);
//      console.log(deletedListing);
//      req.flash("success","Listing Deleted!");
//      res.redirect("/listings");
//  }
//));
 
module.exports = router;

