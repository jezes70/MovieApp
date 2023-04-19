"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Login = exports.Register = void 0;
const userModel_1 = require("../model/userModel");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils/utils");
const jwtSecret = process.env.JWT_SECRET;
/* ========================= USER API ================================ */
// export const Register = async (req: Request | any, res: Response) => {
//     try {
//         const {email, fullName, userName, password, confirm_password} = req.body;
//         const uuid = uuid4();
//         //validate with Joi email and fullName
//         const validationResult = registerUserSchema.validate(req.body,options)
//         if (validationResult.error){
//             let array = [];
//             array.push(validationResult.error.details[0].message)
//         //     return res.status(400).json({error:validationResult.error.details[0].
//         // message})
//         return res.render("Register",{error:validationResult.error.details[0].
//              message});
//         }
//         //generate salt and hash password
//         const passwordHash = await bcrypt.hash(password , 10)
//         //create user
//         //--check if the user already exists
//         const user = await UserInstance.findOne({
//             where: {email:email}
//         })
//         if (!user){
//         let newUser = await UserInstance.create({
//             id: uuid,
//             email,
//             fullName,
//             userName,
//             password: passwordHash
//         })
//         //generate token for user
//         const user = await UserInstance.findOne({
//             where: {email:email}
//         })  as unknown as {[key: string]:string}
//         const { id } = user
//         const token = jwt.sign({id},jwtsecret,{expiresIn:"30mins"})
//         res.cookie('token',token, {httpOnly:true, maxAge:30 * 60 * 1000})
//         //res.cookie('token',token, {httpOnly:true, maxAge:30 * 60 * 1000})
//         //otp
//         //Email
//         // return res.status(201).json({
//         //     msg: 'user created successfully',
//         //     newUser,
//         //     token
//         // })
//         return res.redirect("/login");
//         }
//     res.status(409).json({
//     error: "email already taken"
//     })
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:"Internal server error"})
//     }
// }
// export const Login =  async (req: Request | any, res: Response) => {
//     try{
//         const {email,  password} = req.body;
//         //validate with Joi email and fullName
//         const validationResult = loginUserSchema.validate(req.body, options)
//         if (validationResult.error){
//             return res.status(400).json({error:validationResult.error.details[0].
//         message})
//         }
//      // Generate token for user
//      const User = await UserInstance.findOne({
//         where:{email:email}
//      })  as unknown as {[key: string]:string}
//      const { id } = User
//      const token = jwt.sign({id},jwtsecret,{expiresIn:"30d"})
//      res.cookie('token',token, {httpOnly:true, maxAge:30 * 24 * 60 * 60 * 1000})
//      const validUser = await bcrypt.compare(password, User.password)
//      if(validUser){
//         // return res.status(201).json({
//         //     msg: "You have successful logged in",
//         //     User,
//         //     token,
//         // })
//         return res.redirect("/")
//      }
//         return res.status(400).json({error:"Invalid credentials"})
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:"Internal server error"})
//     }
// }
// export const getUserAndMovies = async (req: Request | any, res: Response) => {
//     try{
//         //sequelize findAll or findAndCountAll
//         //const getAllMovies = await MovieInstance.findAll();
//      const getAllUser = await UserInstance.findAndCountAll(
//        {
//          include:[
//             {
//                 model: MovieInstance,
//                 as: 'movies',
//             }
//          ]
//        }
//      );
//      return res.status(200).json({
//          msg: 'You have successfully retrieve all movies',
//          count: getAllUser.count,
//         users: getAllUser.rows,
//       })
//   }catch(err){
//     console.log(err)
//   }
// }
/* =============================== EJS API ======================== */
const Register = async (req, res) => {
    try {
        const { email, fullName, userName, password, confirm_password } = req.body;
        const uuid = (0, uuid_1.v4)();
        //validate with Joi email and fullName
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Register", {
                error: validationResult.error.details[0].message,
            });
        }
        //generate salt and hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        //create user
        //--check if the user already exists
        const user = await userModel_1.UserModel.findOne({
            where: { email: email },
        });
        if (!user) {
            let newUser = await userModel_1.UserModel.create({
                id: uuid,
                fullName,
                email,
                userName,
                password: passwordHash,
            });
            //generate token for user
            const User = (await userModel_1.UserModel.findOne({
                where: { email: email },
            }));
            const { id } = User;
            const token = jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: "30mins" });
            //res.cookie('token',token, {httpOnly:true, maxAge:30 * 60 * 1000})
            //otp
            //Email
            return res.redirect("/login");
        }
        return res.render("Register", {
            error: "Email is already taken",
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate with Joi email and fullName
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render("Login", {
                error: validationResult.error.details[0].message,
            });
        }
        // Generate token for user
        const User = (await userModel_1.UserModel.findOne({
            where: { email: email },
        }));
        const { id } = User;
        const token = jsonwebtoken_1.default.sign({ id }, jwtSecret, { expiresIn: "30d" });
        res.cookie("token", token, { httpOnly: true, maxAge: 30 * 60 * 60 * 1000 });
        const validUser = await bcryptjs_1.default.compare(password, User.password);
        if (validUser) {
            return res.redirect("/dashboard");
        }
        res.render("Login", {
            error: "Invalid email/password",
        });
    }
    catch (err) {
        console.log(err);
        //res.status(500).json({Error:"Internal server error"})
    }
};
exports.Login = Login;
const Logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
};
exports.Logout = Logout;
// export const getUserAndMovies = async (req: Request | any, res: Response) => {
//   try {
//     //sequelize findAll or findAndCountAll
//     //const getAllMovies = await MovieInstance.findAll();
//     const getAllUser = await UserModel.findAndCountAll({
//       include: [
//         {
//           model: MovieModel,
//           as: "movies",
//         },
//       ],
//     });
//     return res.status(200).json({
//       msg: "You have successfully retrieve all movies",
//       count: getAllUser.count,
//       users: getAllUser.rows,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
