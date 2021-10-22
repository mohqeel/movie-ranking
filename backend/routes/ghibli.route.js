const express = require('express');
const app = express();
const ghibliRoute = express.Router();
const request = require('request');
const fs = require('fs');
const path = require('path');
const Like = require('../models/Like');

/** The fields we care about */
const fields = 'id,title,image,release_date';
const fileName = 'likes.json';

// GET api for all films
ghibliRoute.route('/films').get((req, res) => {
    request(`https://ghibliapi.herokuapp.com/films?fields=${fields}`,
        { json: true },
        (err, _response, body) => {
            if (err) {
                res.status(500);
                res.send('Unable to fetch list of movies')
                console.log(err);
                return;
            }
            res.json(body);
        }
    );
});

// POST api to like a movie
ghibliRoute.route('/like').post((req, res) => {
    if (
        !('id' in req.body) ||
        !('title' in req.body) ||
        !('image' in req.body) ||
        !('release_date' in req.body)
    ) {
        res.status(400);
        res.send('Please check for missing parameters');
        return;
    }

    try {
        let rawdata = fs.readFileSync(fileName);
        let likes = [];
        try {
            likes = JSON.parse(rawdata);
        } catch (err) {
            console.log(err);
        }
        const movieId = req.body.id;
        let likedMovie = likes.find(movie => movie.id === movieId);
        if (likedMovie !== undefined) {
            likedMovie.likeCount += 1;
        } else {
            likedMovie = new Like(movieId, req.body.title, req.body.image, 1, req.body.release_date);
            likes.push(likedMovie);
        }
    
        const data = JSON.stringify(likes);
        fs.writeFile(path.join(__dirname, `../${fileName}`), data, function(err) {
            if(err) {
                res.status(500);
                res.send('Unable to save like');
                console.log(err);
                return;
            } else {
                console.log('The file was saved!');
            }
        });
        res.json(likes);
    } catch (err) {
        res.status(500);
        res.send('Unable to read file of liked movies');
        console.log(err);
    }
});

// GET api to get all liked movies
ghibliRoute.route('/likedMovies').get((req, res) => {
    try {
        let rawdata = fs.readFileSync(fileName);
        let likes = [];
        try {
            likes = JSON.parse(rawdata);
        } catch (err) {
            console.log(err);
        }
        res.json(likes);
    } catch (err) {
        res.status(500);
        res.send('Unable to read file of liked movies');
        console.log(err);
    }
});

module.exports = ghibliRoute;