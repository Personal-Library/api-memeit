# Memeit API

## Description
This API stores the backend for the Memeit application, which is a fun project that allows users to post their favorite memes to a consolidated site. 
This API is meant for learning purposes only.

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose

## Installation
Create a project directory

`mkdir project-name`

Enter the project directory

`cd project-name`

Clone the repository

`git clone https://github.com/personal-library/api-memeit.git`

Install dependencies

`npm install`

## Usage
The Memeit API currently supports create, read-all, update, delete, and upvote methods. See below for usage details.

1. Create Meme

    - Create a POST request to https://api-memeit.herokuapp.com/memes
    - We currently accept author, title, description, image for the init.body

2. Read All Memes
    - Create a  READ request to https://api-memeit.herokuapp.com/memes

3. Update Meme
    - Create a PATCH request to https://api-memeit.herokuapp.com/memes/#ID
    - In the init.body, include updated details for the properties you wish to change

4. Delete Meme
    - Create a DELETE request to https://api-memeit.herokuapp.com/memes/#ID

5. Upvote Meme
    - Create a PATCH request to https://api-memeit.herokuapp.com/memes/upvote/#ID
    
## Contributing
This project is no longer being maintained. You are welcome to modify and distribute any versions as you please.
    
## License
MIT License
