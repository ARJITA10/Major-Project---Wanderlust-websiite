const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema,reviewSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");

const validateListing = (req,res,next) => {
    let {error} = listingSchema.validate(req.body);
  //  console.log(result);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,error.message);
    } else {
        next();
    }
};

//index route
router.get("/",wrapAsync(async(req,res)=>{
    const allListings =  await Listing.find({})
    res.render("listings/index.ejs",{allListings});
    // .then(res=>{
    //     console.log(res);
}));

//new route
router.get("/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
}));

//Create route
router.post("/",validateListing ,wrapAsync(async(req,res,next)=>{
    try{
    let {title,description,image,price,countryt,location} = req.body;
     let listing = req.body.listing;
    if(!req.body.listing){
      throw new ExpressError(400,"send valid data for listing");
     }
 
     let result = listingSchema.validate(req.body);
     console.log(result);
     if(result.error){
             throw new ExpressError(400,result.error);
     }
 
     const newListing =  new Listing(req.body.listing);
     if(!newListing.title){
         throw new ExpressError(400,"Title is missing");
     }
     if(!newListing.description){
             throw new ExpressError(400,"Description is missing");
     }
     if(!newListing.location){
         throw new ExpressError(400,"Location is missing");
 }
 
         await newListing.save();
   console.log(listing);
         res.redirect("/listings");
     }  catch (err) {
         next(err);
     }
 }));
 
 //edit route
router.get("/:id/edit",wrapAsync(async(req,res)=>{
     let {id} = req.params;
     const listing = await Listing.findById(id);
     res.render("listings/edit.ejs",{listing});
 }));
 
 //Update route
router.put("/:id",validateListing,wrapAsync(async(req,res)=>{
     // if(!req.body.listing){
     //     throw new ExpressError(400,"send valid data for listing");
     //   }
     let {id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
 }));
 
 //DELETE ROUTE
router.delete("/:id",wrapAsync(async (req,res)=>{
     let {id} = req.params;
     let deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     res.redirect("/listings");
 }));
 
module.exports = router;

