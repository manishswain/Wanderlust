const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isListingOwner,
  validateListing,
} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route
//Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Listing Route
router.get("/new", isLoggedIn, listingController.renderNewListingForm);

//Show Single Listing Route
//Edit Route
//Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isListingOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.editListing)
  )
  .delete(
    isLoggedIn,
    isListingOwner,
    wrapAsync(listingController.deleteListing)
  );

//Edit Form Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isListingOwner,
  listingController.renderEditForm
);

module.exports = router;
