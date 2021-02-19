import express from 'express';
// Import controller functions
import {
	createMeme,
	readMemes,
	updateMeme,
	deleteMeme,
	upvoteMeme,
} from '../controllers/memeControls.js';

// Create a router instance to define routes
const router = express.Router();

// Define routes here, callback functions are all located in ~/controllers/memes.js
// Notice the two router.patch() routes, if they have the same path they will collide
router.post('/', createMeme);
router.get('/', readMemes);
router.patch('/:id', updateMeme);
router.delete('/:id', deleteMeme);
router.patch('/upvote/:id', upvoteMeme);

// Export router for mounting in main app
export default router;
