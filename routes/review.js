const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
   // listingSchema,
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

const validateReview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
  //  console.log(result);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,error.message);
    } else {
        next();
    }
};

//Reviews - POST route
router.post("/", validateReview, wrapAsync(async (req,res) => {
  //  console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
  //  console.log("new review saved");
  //  res.send("new review saved");
  req.flash("success","New Review Created!");
  res.redirect(`/listings/${listing._id}`);
  //or                     // req.params.id
}));

//DELETE REVIEW ROUTE
router.delete("/:reviewId", wrapAsync(async (req,res) => {
    let{id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull:{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`) ;
})
);

module.exports = router;