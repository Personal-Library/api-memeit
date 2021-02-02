import mongoose from 'mongoose';
const { Schema } = mongoose;

// CREATE MONGOOSE SCHEMA
const memeSchema = new Schema({
  author: String,
  title: String,
  description: String,
  image: String,
  date: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 }
});

// CREATE MONGOOSE MODEL FROM SCHEMA
const MemeSchema = mongoose.model('MemeSchema', memeSchema);

export default MemeSchema;