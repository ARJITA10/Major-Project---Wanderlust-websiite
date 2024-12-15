const Listing = require("./models/listing.js");
const Review = require("./models/review.js");

const {listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
  //  console.log(req.path,"..",req.originalUrl);
  //  console.log(req.user);
    if (!req.isAuthenticated()){//false (method)
    //redirectedUrl save
    //console.log(req.path,"..",req.originalUrl);
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in !");//to create listing
    return res.redirect("/login");//before "/listings"
}
   next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.IsOwner = async(req,res,next) => { //logic for edit,update,delete route in listing routes
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error","You are not the owner of this listing.");
      return res.redirect(`/listings/${id}`);
  }
 next();
};

module.exports.IsReviewAuthor = async(req,res,next) => { //logic for edit,update,delete route in listing routes
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)) {
      req.flash("error","You are not the authore of this review.");
      return res.redirect(`/listings/${id}`);
  }
 next();
};

module.exports.validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body);
//  console.log(result);
  if(error){
      let errMsg = error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,error.message);
  } else {
      next();
  }
};

module.exports.validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
//  console.log(result);
  if(error){
      let errMsg = error.details.map((el)=>el.message).join(",")
      throw new ExpressError(400,error.message);
  } else {
      next();
  }
};