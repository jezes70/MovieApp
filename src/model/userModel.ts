import mongoose, { Schema } from "mongoose";
import { MovieDocument } from "../model/moviesModel";

// export interface UserInfo {
//   fullname: string;
//   username: string;
//   email: string;
//   password: string;
// }

export interface UserInstance extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  movies: MovieDocument[] | string[];
}

const UserSchema = new mongoose.Schema<UserInstance>({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie" }],
});

export const UserModel = mongoose.model<UserInstance>("User", UserSchema);

UserSchema.virtual("movie", {
  ref: "Movie",
  localField: "_id",
  foreignField: "userId",
});
