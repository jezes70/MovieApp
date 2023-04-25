"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../model/userModel");
const Test_comfig_1 = require("./Test.comfig");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const moviesModel_1 = require("../model/moviesModel");
(0, globals_1.beforeAll)(async () => await (0, Test_comfig_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, Test_comfig_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            email: "chiqui@gmail.com",
            fullName: "Okpara Ifeanyi",
            username: "Jezes",
            password: "12345gw",
        };
        const newUserData = new userModel_1.UserModel(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.fullName).toBe(UserData.fullName);
        (0, globals_2.expect)(newUserData.username).toBe(UserData.username);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
    });
    (0, globals_1.test)("should fail for User data without email field", async () => {
        const invalidUserData = {
            username: "Jezes",
            password: "12345gw"
        };
        try {
            const newUserData = new userModel_1.UserModel(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.email).toBeDefined();
        }
    });
});
(0, globals_1.describe)("Movie Model Test Suite", () => {
    (0, globals_1.test)("should create a Movie data successfully", async () => {
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "Limitless",
            description: "It is very nice meeting you",
            image: "https://cdn-images-1.medium.com/max/1200/1*e3UkkUa_-USAu7C6k3iePw.png",
            price: 2000,
        };
        const newMovieData = new moviesModel_1.MovieModel({
            userId: new mongoose_1.default.Types.ObjectId(MovieData.userId),
            title: MovieData.title,
            description: MovieData.description,
            image: MovieData.image,
            price: MovieData.price,
        });
        await newMovieData.save();
        (0, globals_2.expect)(newMovieData._id).toBeDefined();
        (0, globals_2.expect)(newMovieData.userId).toEqual(MovieData.userId);
        (0, globals_2.expect)(newMovieData.title).toEqual(MovieData.title);
        (0, globals_2.expect)(newMovieData.description).toEqual(MovieData.description);
        (0, globals_2.expect)(newMovieData.image).toEqual(MovieData.image);
        (0, globals_2.expect)(newMovieData.price).toEqual(MovieData.price);
    });
    (0, globals_1.test)("should fail for Movie data without required fields", async () => {
        const invalidMovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "Limitless",
            description: "It is very nice meeting you",
            image: "https://www.looper.com/img/gallery/john-wicks-entire-backstory-explained/intro-1584991161.jpg",
            price: 2000,
        };
        try {
            const newMovieData = new moviesModel_1.MovieModel(invalidMovieData);
            await newMovieData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.userId).toBeDefined();
        }
    });
    (0, globals_1.test)("should update a Movie successfully", async () => {
        // Create a new Movie document
        const newMovieData = {
            userId: new mongoose_1.default.Types.ObjectId(),
            title: "Limitless",
            description: "A thrilling TV show",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpnlNHAykHOc4_m9bfYJdSGrDH0QFRVW4o71k885odtZEMRUIxodLSOhnxX036e0ceGA&usqp=CAU",
            price: 2000,
        };
        const createdMovie = await moviesModel_1.MovieModel.create(newMovieData);
        // Update the Movie document
        const updatedData = {
            title: "Limitless - Updated",
            description: "Updated description",
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiG9hNOWvrZ4YYTaAy1X-XJxEWYzfm8riK3JfR3036PCvDRRWYSfVmac83RvzrX19Ektkuo-a8zeubDFpk7hYiGox5q0Uw8H-HuuvWTtJs1vaIUTjybPAji9L7dFQAdqjTv_tJRu_p0ZTVom1VY4WjZqZ0omE5-HIeHj9SlHtg6DC6EXcV4Ejp1honH/w640-h358/Gangs%20of%20Lagos.png",
            price: 2500,
        };
        // Update the movie document by calling findByIdAndUpdate with the valid _id
        const updatedMovie = await moviesModel_1.MovieModel.findByIdAndUpdate(createdMovie._id, updatedData, { new: true });
        // Assert that the Movie document was updated successfully
        (0, globals_2.expect)(updatedMovie).not.toBeNull();
        (0, globals_2.expect)(updatedMovie?.userId).toEqual(newMovieData.userId);
        (0, globals_2.expect)(updatedMovie?.title).toEqual(updatedData.title);
        (0, globals_2.expect)(updatedMovie?.description).toEqual(updatedData.description);
        (0, globals_2.expect)(updatedMovie?.image).toEqual(updatedData.image);
        (0, globals_2.expect)(updatedMovie?.price).toEqual(updatedData.price);
    });
    (0, globals_1.test)("should fail to update a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const updatedData = {
            title: "Limitless - Updated",
            description: "Updated description",
            image: "https://9jarocks.com/wp-content/uploads/2022/07/MV5BNGQ3NzYwMmMtYjc3NS00NjliLTkyZTAtOTI1YmZiMWRhZDEyXkEyXkFqcGdeQXVyNzc5NDg5Mjc@._V1_-1.jpg",
            price: 2500,
        };
        const updatedMovie = await moviesModel_1.MovieModel.findByIdAndUpdate(nonExistentMovieId, updatedData);
        (0, globals_2.expect)(updatedMovie).toBeNull();
    });
    (0, globals_1.test)("should delete a Movie successfully", async () => {
        const MovieData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            title: "Limitless",
            description: "It is very nice meeting you",
            image: "https://cityonfire.com/wp-content/uploads/2022/12/Jackie-Chan-Well-Go-USA.jpg",
            price: 2000,
        };
        const newMovieData = new moviesModel_1.MovieModel({
            userId: new mongoose_1.default.Types.ObjectId(MovieData.userId),
            title: MovieData.title,
            description: MovieData.description,
            image: MovieData.image,
            price: MovieData.price,
        });
        await newMovieData.save();
        const deleteResult = await moviesModel_1.MovieModel.deleteOne({ _id: newMovieData._id });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(1);
    });
    (0, globals_1.test)("should fail to delete a non-existent Movie", async () => {
        const nonExistentMovieId = new mongoose_1.default.Types.ObjectId();
        const deleteResult = await moviesModel_1.MovieModel.deleteOne({ _id: nonExistentMovieId });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(0);
    });
});
