const Listing = require("../models/listing.js");
const {listingSchema} = require("../schema.js");

module.exports.index = async(req,res)=>{
    const allListings =  await Listing.find({})
    res.render("listings/index.ejs",{allListings});
    // .then(res=>{
    //     console.log(res);
};

module.exports.renderNewForm = (req,res)=>{
    //console.log(req.user);
    res.render("listings/new.ejs");
};

module.exports.showListing =  async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : "reviews", populate : {path : "author"}}).populate("owner");
    if(!listing){
        req.flash("error"," Listing you requested for does not exist!");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    //console.log(url, "..", filename);
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
       // console.log(req.user);
        newListing.owner = req.user._id;
        newListing.image = {url, filename};
         await newListing.save();
         req.flash("success","New Listing Created!");
   console.log(listing);
         res.redirect("/listings");
     }  catch (err) {
         next(err);
     }
 };

module.exports.renderEditForm =  async(req,res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
   if(!listing){
       req.flash("error"," Listing you requested for does not exist!");
       return res.redirect("/listings");
   }
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing =  async(req,res)=>{
    // if(!req.body.listing){
    //     throw new ExpressError(400,"send valid data for listing");
    //   }
    let {id} = req.params;
   //  let listing = await Listing.findById(id);
   //  if(!listing.owner.equals(res.locals.currUser._id)) {
   //      req.flash("error","You do not have permission to edit.");
   //      return res.redirect(`/listings/${id}`);
   //  }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success"," Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};