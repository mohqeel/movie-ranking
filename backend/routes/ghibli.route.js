const express = require('express');
const app = express();
const ghibliRoute = express.Router();
const request = require('request');
const fs = require('fs');
const path = require("path");
const Like = require('../models/Like');

/** The fields we care about */
const fields = 'id,title,image';
const fileName = 'likes.json';

// GET api for all films
ghibliRoute.route('/films').get((req, res) => {
    request(`https://ghibliapi.herokuapp.com/films?fields=${fields}`, { json: true }, (err, response, body) => {
        if (err) { return console.log(err); }
        res.json(body);
    });
});

// POST api to like a movie
ghibliRoute.route('/like').post((req, res) => {
    let rawdata = fs.readFileSync(fileName);
    let likes = JSON.parse(rawdata);
    const movieId = req.body.id;
    let likedMovie = likes.find(movie => movie.id === movieId);
    if (likedMovie !== undefined) {
        likedMovie.likeCount += 1;
    } else {
        likedMovie = new Like(movieId, req.body.title, req.body.image, 1);
        likes.push(likedMovie);
    }

    const data = JSON.stringify(likes);
    fs.writeFile(path.join(__dirname, `../${fileName}`), data, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("The file was saved!");
    });
    res.json(likes);
});

// GET api to get all liked movies
ghibliRoute.route('/likedMovies').get((req, res) => {
    let rawdata = fs.readFileSync(fileName);
    let likes = JSON.parse(rawdata);
    res.json(likes);
});

module.exports = ghibliRoute;