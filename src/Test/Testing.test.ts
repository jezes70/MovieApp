import {UserModel} from "../model/userModel";
import { dbConnect, dbDisconnect, dbDropCollection } from "./Test.comfig";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import {MovieModel} from "../model/moviesModel";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("User Model Test Suite", () => {
  test("should create a User data successfully", async () => {
    const UserData = {
      email: "chiqui@gmail.com",
      fullName: "Okpara Ifeanyi",
      username: "Jezes",
      password: "12345gw",
    };

    const newUserData = new UserModel(UserData);
    await newUserData.save();
    expect(newUserData._id).toBeDefined();
    expect(newUserData.email).toBe(UserData.email);
    expect(newUserData.fullName).toBe(UserData.fullName);
    expect(newUserData.username).toBe(UserData.username);
    expect(newUserData.password).toBe(UserData.password);
  });

  test("should fail for User data without email field", async () => {
    const invalidUserData = {
      username: "Jezes",
      password: "12345gw"
    };

    try {
      const newUserData = new UserModel(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.email).toBeDefined();
    }
  });
});

describe("Movie Model Test Suite", () => {
  test("should create a Movie data successfully", async () => {
    const MovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "Limitless",
      description: "It is very nice meeting you",
      image:
        "https://cdn-images-1.medium.com/max/1200/1*e3UkkUa_-USAu7C6k3iePw.png",
      price: 2000,
    };

    const newMovieData = new MovieModel({
      userId: new mongoose.Types.ObjectId(MovieData.userId),
      title: MovieData.title,
      description: MovieData.description,
      image: MovieData.image,
      price: MovieData.price,
    });

    await newMovieData.save();

    expect(newMovieData._id).toBeDefined();
    expect(newMovieData.userId).toEqual(MovieData.userId);
    expect(newMovieData.title).toEqual(MovieData.title);
    expect(newMovieData.description).toEqual(MovieData.description);
    expect(newMovieData.image).toEqual(MovieData.image);
    expect(newMovieData.price).toEqual(MovieData.price);
  });

  test("should fail for Movie data without required fields", async () => {
    const invalidMovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "Limitless",
      description: "It is very nice meeting you",
      image:
        "https://www.looper.com/img/gallery/john-wicks-entire-backstory-explained/intro-1584991161.jpg",
      price: 2000,
    };

    try {
      const newMovieData = new MovieModel(invalidMovieData);
      await newMovieData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.userId).toBeDefined();
    }
  });

  test("should update a Movie successfully", async () => {
    // Create a new Movie document
    const newMovieData = {
        userId: new mongoose.Types.ObjectId(),
        title: "Limitless",
        description: "A thrilling TV show",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSpnlNHAykHOc4_m9bfYJdSGrDH0QFRVW4o71k885odtZEMRUIxodLSOhnxX036e0ceGA&usqp=CAU",
        price: 2000,
    };
    const createdMovie = await MovieModel.create(newMovieData);

    // Update the Movie document
    const updatedData = {
        title: "Limitless - Updated",
        description: "Updated description",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiG9hNOWvrZ4YYTaAy1X-XJxEWYzfm8riK3JfR3036PCvDRRWYSfVmac83RvzrX19Ektkuo-a8zeubDFpk7hYiGox5q0Uw8H-HuuvWTtJs1vaIUTjybPAji9L7dFQAdqjTv_tJRu_p0ZTVom1VY4WjZqZ0omE5-HIeHj9SlHtg6DC6EXcV4Ejp1honH/w640-h358/Gangs%20of%20Lagos.png",
        price: 2500,
    };

    // Update the movie document by calling findByIdAndUpdate with the valid _id
    const updatedMovie = await MovieModel.findByIdAndUpdate(createdMovie._id, updatedData, { new: true });

    // Assert that the Movie document was updated successfully
    expect(updatedMovie).not.toBeNull();
    expect(updatedMovie?.userId).toEqual(newMovieData.userId);
    expect(updatedMovie?.title).toEqual(updatedData.title);
    expect(updatedMovie?.description).toEqual(updatedData.description);
    expect(updatedMovie?.image).toEqual(updatedData.image);
    expect(updatedMovie?.price).toEqual(updatedData.price);
});


test("should fail to update a non-existent Movie", async () => {
  const nonExistentMovieId = new mongoose.Types.ObjectId();
  const updatedData = {
      title: "Limitless - Updated",
      description: "Updated description",
      image: "https://9jarocks.com/wp-content/uploads/2022/07/MV5BNGQ3NzYwMmMtYjc3NS00NjliLTkyZTAtOTI1YmZiMWRhZDEyXkEyXkFqcGdeQXVyNzc5NDg5Mjc@._V1_-1.jpg",
      price: 2500,
  };

  const updatedMovie = await MovieModel.findByIdAndUpdate(nonExistentMovieId, updatedData);

  expect(updatedMovie).toBeNull();
});



  test("should delete a Movie successfully", async () => {
    const MovieData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      title: "Limitless",
      description: "It is very nice meeting you",
      image:
        "https://cityonfire.com/wp-content/uploads/2022/12/Jackie-Chan-Well-Go-USA.jpg",
      price: 2000,
    };

    const newMovieData = new MovieModel({
      userId: new mongoose.Types.ObjectId(MovieData.userId),
      title: MovieData.title,
      description: MovieData.description,
      image: MovieData.image,
      price: MovieData.price,
    });

    await newMovieData.save();

    const deleteResult = await MovieModel.deleteOne({ _id: newMovieData._id });

    expect(deleteResult.deletedCount).toEqual(1);
  });

  test("should fail to delete a non-existent Movie", async () => {
    const nonExistentMovieId = new mongoose.Types.ObjectId();
    const deleteResult = await MovieModel.deleteOne({ _id: nonExistentMovieId });

    expect(deleteResult.deletedCount).toEqual(0);
  });
});