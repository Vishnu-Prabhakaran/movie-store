const Movie = require('../models/movie-model');

createMovie = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      sucewss: false,
      error: 'You must provide a movie'
    });
  }

  const movie = new Movie(body);
  if (!movie) {
    return res.status(400).json({ sucess: false, error: err });
  }

  movie
    .save()
    .then(() => {
      return res.status(201).json({
        sucess: true,
        id: movie._id,
        message: 'Movie Created!'
      });
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Movie Not Created!!'
      });
    });
};

updateMovie = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update'
    });
  }

  Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Movie Not Found!'
      });
    }
    movie.name = body.name;
    movie.time = body.time;
    movie.rating = body.rating;

    movie
      .save()
      .then(() => {
        return res.status(200).json({
          sucess: true,
          id: movie._id,
          message: 'Movie Updated!'
        });
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Movie Not Updated!'
        });
      });
  });
};

deleteMovie = async (req, res) => {
  await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({
        sucess: false,
        error: err
      });
    }
    if (!movie) {
      return res.status(404).json({
        sucess: false,
        error: 'Movie Not Found'
      });
    }
    return res.status(200).json({ sucess: true, data: movie });
  }).catch(err => console.log(err));
};

getMovieById = async (req, res) => {
  await Movie.findOne({ _id: req.params.id }, (err, movie) => {
    if (err) {
      return res.status(400).json({
        sucess: false,
        error: err
      });
    }
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie Not Found!'
      });
    }
    return res.status(200).json({
      sucess: true,
      data: movie
    });
  }).catch(err => console.log(err));
};

getMovies = async (req, res) => {
  await Movie.find({}, (err, movies) => {
    if (err) {
      return res.status(400).json({
        sucess: false,
        error: err
      });
    }
    if (!movies.length) {
      return res.status(404).json({
        sucess: false,
        error: 'Movie not Found!'
      });
    }
    return res.status(200).json({
      success: true,
      data: movies
    });
  }).catch(err => console.log(err));
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMoviesById
};
