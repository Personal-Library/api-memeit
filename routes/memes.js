import express from 'express';
// Import controller functions
import { createMeme, readMemes, updateMeme, deleteMeme, upvoteMeme } from '../controllers/memes.js';

// Create a router instance to define routes
const router = express.Router();

// Define routes here, callback functions are all located in ~/controllers/memes.js
router.post('/', createMeme);
router.get('/', readMemes);
router.patch('/:id', updateMeme);
router.delete('/:id', deleteMeme);
router.patch('/upvote/:id', upvoteMeme);

// Export router for mounting in main app
export default router;