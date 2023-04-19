"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovies = exports.createMovie = void 0;
const movieModels_1 = require("../model/movieModels");
const utils_1 = require("../utils/utils");
const uuid_1 = require("uuid");
const createMovie = async (req, res) => {
    try {
        const verified = req.user;
        const id = (0, uuid_1.v4)();
        //const { description, completed} = req.body;
        const movie = await movieModels_1.MovieModel.create({
            id,
            ...req.body,
            userId: verified.id,
        });
        return res.status(201).json({
            msg: "movie created successfully",
            movie,
        });
    }
    catch (err) { }
};
exports.createMovie = createMovie;
const getMovies = async (req, res) => {
    try {
        const getAllMovies = await movieModels_1.MovieModel.find({});
        return res.render("Home", { movieList: getAllMovies });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getMovies = getMovies;
const updateMovie = async (req, res) => {
    try {
        //movies/update-movie/id
        const { id } = req.params.id;
        const { description, title, price } = req.body;
        //validate with joi or zod
        const validationResult = utils_1.updateMovieSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res
                .status(400)
                .json({ Error: validationResult.error.details[0].message });
        }
        const updateMovie = await movieModels_1.MovieModel.findByIdAndUpdate(id, {
            description,
            title,
            price,
        }, { new: true });
        if (!updateMovie) {
            // return res.status(400).json({error: "cannot find existing Movie"})
            return res.render("Dashboard", { message: "cannot find existing Movie" });
        }
        return res.redirect("/dashboard");
        // return res.status(200).json({
        //   msg: "Movie updated successfully",
        // });
    }
    catch (err) {
        console.log(err);
    }
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteMovie = await movieModels_1.MovieModel.findByIdAndDelete(id);
        if (!deleteMovie) {
            return res.render("Dashboard", { message: "cannot find existing Movie" });
        }
        return res.redirect("/dashboard");
        // return res.status(200).json({
        //   msg: "Movie deleted successfully",
        // });
    }
    catch (err) {
        console.log(err);
    }
};
exports.deleteMovie = deleteMovie;
