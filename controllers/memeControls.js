// These controller functions will handle our requests between our MongoDB database
// Make sure to import mongoose and the models
import MemeSchema from '../models/memeSchema.js';
import mongoose from 'mongoose';

// We don't want to keep all this logic within ~/routes/memes.js


// ***** READMEMES ***** //
// In try block, use Model.find() with no args to return all documents
// If there are no documents an empty array is returned
// ********************** //
export const readMemes = async (req, res) => {
  try {
    const memes = await MemeSchema.find();
    res.status(200).json(memes)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}


// ***** CREATEMEME ***** //
// Extract data from req.body
// Use mongoose model as template for new document
// Await .save() function mongoose with no args
// ********************** //
export const createMeme = async (req, res) => {
  const memeData = req.body;
  const newMeme = new MemeSchema(memeData); 
  try {
    await newMeme.save();
    res.status(201).json(newMeme);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  };
};


// ***** UPDATEMEME ***** //
// Destructure id and extract document data
// Use mongoose.Types.ObjectId.isValid(id) to ensure a valid MongoDB ID was passed
// await Model.findByIdAndUpdate() and return as res.json()
// Use spread operator to copy req.body over to argument
// ********************** //
export const updateMeme = async (req, res) => {
  const { id } = req.params;
  const meme = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Not a valid ID.')
  }

  try {
    const updatedMeme = await MemeSchema.findByIdAndUpdate(id, { ...meme }, { new: true })
    res.json(updatedMeme)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}


// ***** DELETEMEME ***** //
// Destructure id and extract document data
// Use mongoose.Types.ObjectId.isValid(id) to ensure a valid MongoDB ID was passed
// In try block, pass (err, doc) arguments to .findByIdAndRemove() to validate that the 
// document with that ID exists
// Use spread operator to copy req.body over to argument
// ********************** //
export const deleteMeme = async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Not a valid ID.')
  }

  try {
    await MemeSchema.findByIdAndRemove(id, (err, doc) => {
      if (err || !doc) {
        console.log('You are trying to delete a message that has already been deleted.')
      }
    });
    res.json({ msg: 'Post was deleted'})
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}


// ***** UPVOTEMEME ***** //
// Destructure id and extract document data
// Use mongoose.Types.ObjectId.isValid(id) to ensure a valid MongoDB ID was passed
// await Model.findByIdAndUpdate() and return as res.json()
// Only provided new information as argument since we are using patch verb
// ********************** //
export const upvoteMeme = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ msg: 'Not a valid ID' });
  };

  try {
    const meme = await MemeSchema.findById(id);
    const updatedMeme = await MemeSchema.findByIdAndUpdate(id, { votes: meme.votes+1 }, { new: true });
    res.json(updatedMeme);
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}