const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
   // listingSchema,
const {reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn, IsReviewAuthor} = require("../middleware.js");

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

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");

//Reviews - POST route
router.post("/",isLoggedIn, validateReview,  wrapAsync(reviewController.createReview
//   async (req,res) => {
//   //  console.log(req.params.id);
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     newReview.author = req.user._id;
//     console.log(newReview);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();
//   //  console.log("new review saved");
//   //  res.send("new review saved");
//   req.flash("success","New Review Created!");
//   res.redirect(`/listings/${listing._id}`);
//   //or                     // req.params.id
// }
));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",isLoggedIn,IsReviewAuthor,wrapAsync(reviewController.destroyReview
//   async (req,res) => {
//     let{id,reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id, {$pull:{reviews : reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     req.flash("success","Review Deleted!");
//     res.redirect(`/listings/${id}`) ;
// }
));

module.exports = router;