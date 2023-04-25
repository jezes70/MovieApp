"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://jezes70:TBN8G3fIB5NIcXkM@cluster0.hm154wl.mongodb.net/test';
const db = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI, {});
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error(`MongoDB connection error: ${err}`);
        process.exit(1);
    }
};
exports.default = db;
