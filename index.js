import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// IMPORTANT! Import the router that we created to handle meme paths
import memeRoutes from './routes/memes.js';
// Create express server
const app = express();
// Declare port for express server, either the server env or 5000
const PORT = process.env.PORT || 5000;
// dotenv config allows us to access the .env file, make sure it is above where you would use something from the .env
dotenv.config();
// Mongo URI
const CONNECTION_URL = process.env.CONNECTION_URL;

// Middleware included here
// ========================
// Parses json if Content-Type header matches
app.use(bodyParser.json({ limit: '30mb', extended: true }));
// Parses urlencoded bodies
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
// Allows cross origin requests
app.use(cors());

// Express router as middleman for all routing needs
app.use('/memes', memeRoutes);

// Just in case anyone tries visiting the homepage
app.get('/', (req, res) => {
	res.status(200).send(`
    <h1>Hello from Memeit API ^.^</h1>
    <pre>
            ______
          &lt; Moo! &gt;
            ------
                  \\   ^__^
                    \\ (oo)\\_______
                      (__)\\       )\\/\\
                          ||----w |
                          ||     ||
    </pre>
  `);
});

// Setting up listening at our server port
// after mongoose helps us connect to MongoDB
mongoose
	.connect(CONNECTION_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() =>
		app.listen(PORT, () =>
			console.log(`App listening at http://localhost:${PORT}`)
		)
	)
	.catch((error) => console.log(error));

// Attach event listener for db here
const db = mongoose.connection;
// If listener hears an 'error', bind console and print error
db.on('error', console.error.bind(console, 'connection error:'));
// If listener hears 'open', print live statement
db.once('open', () => console.log(`Database connection is live!`));
