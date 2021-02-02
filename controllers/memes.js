// These controller functions will handle our requests between our MongoDB database
import MemeSchema from '../models/memeSchema.js';
import mongoose from 'mongoose';

// We don't want to keep all this logic within ~/routes/memes.js

export const readMemes = async (req, res) => {
  try {
    const memes = await MemeSchema.find();
    res.status(200).json(memes)
  } catch (error) {
    res.status(404).json({ msg: error.message })
  }
}

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

export const updateMeme = async (req, res) => {
  const { id } = req.params;
  const meme = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('Not a valid ID.')
  }

  try {
    const updatedMeme = await MemeSchema.findByIdAndUpdate(id, {...meme, id}, { new: true})
    res.json(updatedMeme)
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

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
    res.json({ msg: 'Post deleted'})
  } catch (error) {
    res.status(400).json({ msg: error.message })
  }
}

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