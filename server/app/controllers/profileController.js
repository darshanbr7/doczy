const profileController = {}
import _ from "lodash";
import Profile from "../models/profileModel.js";
import uploadMedia from "../helpers/profileControllerHelper/uploadMedia.js";
import getProfile from "../helpers/profileControllerHelper/getProfile.js";
/**
 * This Function is used to create a Profile 
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response indicating the result of profile has created.
*/
profileController.upload = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = _.pick(req.currentUser, ["userId"])
    const { gender, dob } = _.pick(req.body, ["gender", "dob"]);
    let result
    const profile = await Profile.findOne({ userId })
    if (profile) {
      return res.status(409).json({ error: [{ msg: 'Profile is already exist' }] });
    }
    if (file) {
      result = await uploadMedia(file);
    }
    const formatedDob = new Date(dob);
    const newProfile = await new Profile({ userId, gender, dob: formatedDob, avatar: result?.secure_url }).save()
    res.json(newProfile);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: [{ msg: 'Something went wrong while uploading image' }] });
  }
};

/**
 * This Function is used to get the profile using token 
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response of the user's profile details.
*/
profileController.getProfile = async (req, res) => {
  try {
    const { userId } = _.pick(req.currentUser, ["userId"]);
    const profile = await getProfile({ userId });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: [{ msg: 'Something went wrong while getting profile' }] });
  }
}

/**
 * This Function is used to Update the profile of the user 
 * @param {Object} req - The request object passed from nodejs, with request data
 * @param {Object} res - The response object used to send back errors or success responses.
 * @returns {Object} - A JSON response of the user's  updated profile details.
*/
profileController.updateProfile = async (req, res) => {
  try {
    const file = req.file;
    const { userId } = _.pick(req.currentUser, ["userId"]);
    const { dob, gender } = _.pick(req.body, ["dob", "gender"]);
    const profile = await getProfile({ userId });
    if (!profile.isSubscriber) {
      return res.status(403).json({ error: [{ msg: "User need subscription to update the profile " }] })
    }
    let result;
    if (file) {
      result = await uploadMedia(file);
    }
    const profilePic = result?.secure_url ? result?.secure_url : profile.profilePic
    const updatedProfile = await Profile.findOneAndUpdate({ userId }, { profilePic, dob, gender }, { new : true, runValidators : true } );
    return res.json(updatedProfile)
  } catch (error) {
    res.status(500).json({ error: [{ msg: "Something went wrong while Updating profile" }] })
  }
}

export default profileController;

/* 
 const file = req.file;
    const { userId } = _.pick( req.currentUser, [ "userId"]);
    const { dob, gender } = _.pick( req.body, [ "dob", "gender" ] );
    const profile = await getProfile( { userId } );
    if( ! profile.isSubscriber ) {
      return res.status( 403 ).json( { error : [ { msg : "User need subscription to update the profile "}]})
    }
    let result ;
    if (file) {
      result = await uploadMedia( file );
    }
    const profilePic = result?.secure_url ? result?.secure_url : profile.profilePic
    const updatedProfile = await Profile.findOneAndUpdate( { userId }, { profilePic, dob, gender  })
    return res.json( updatedProfile )
*/