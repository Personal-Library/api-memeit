import mongoose from 'mongoose';
const { Schema } = mongoose;

// CREATE MONGOOSE SCHEMA
const memeSchema = new Schema({
	author: {
		type: String,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	votes: {
		type: Number,
		default: 0,
	},
});

// CREATE MONGOOSE MODEL FROM SCHEMA
const MemeSchema = mongoose.model('MemeSchema', memeSchema);

export default MemeSchema;
