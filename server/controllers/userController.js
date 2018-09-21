require('dotenv').config()
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';
import Ticket from '../models/ticketModel';


exports.signUp = async (req, res) => {
    let { email, password } = req.body;
    if (!req.body) {
        res.json({
            success: false,
            message: 'Fill all fields'
        });
    }
    req.body.email = email.toLowerCase();
    req.body.password = bcrypt.hashSync(password.toLowerCase(), 10);
    //check if the email already exist
    const checkEmail = await User.findOne({ email: email.toLowerCase() });
    if (checkEmail) {
        res.json({
            success: false,
            message: "Email already exist."
        });
    }
    else {
        const user = await User.create(req.body);
    if (user) {
        req.body = undefined;
        res.json({
            success: true,
            message: 'Successfully registered. Please login.',
        });
    }
    else {
        res.json({
            message: 'An error occured during registration.',
            success: false
        });
    }
    }
};

exports.signIn = async (req, res) => {
    let { email, password } = req.body;
    if (!req.body) {
        res.json({
            message: 'Fill all fields',
            success: false
        });
    }
    const user = await User.findOne({ email: email.toLowerCase()});
    if (user)  {
        req.body = undefined;
        let signData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: email
        };
        // const token = jwt.sign(signData, process.env.JWT_SECRET);
        const token = jwt.sign({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: email
        }, "Algorithm...221");
        if (bcrypt.compareSync(password, user.password)) {
            res.status(200).json({
                message: 'Successful',
                id: signData._id,
                token: token,
                firstName: signData.firstName,
                success: true
            });
        }
        else {
            res.json({
                message: 'Credentials not found!',
                success: false
            });
        }
    }
    else {
        res.json({
            success: false,
            message: 'Your email seem to be incorrect'
        });
    }
};

// exports.allTickets = async (req, res) => {
//     let tickets = await Ticket.find({});
//     const authorizationToken = req.headers['authorization'].split(" ")[1];
//     //if the header is provided
//     if (authorizationToken) {
//         try {
//             const token = jwt.verify(authorizationToken, 'Algorithm...221');
//             let user = await User.findOne({_id: token._id});
//             //if user is found
//         if (user) {
//             if (tickets) {
//                 //ok
//                 res.status(200).json({
//                     success: true,
//                     tickets
//                 });
//                 console.log(tickets);
//             }
//             else {
//                 //internal server error
//                 res.status(500).json({
//                     success: false,
//                     message: "An error occured"
//                 });
//             }
//         }
//         //unauth access
//         else {
//             res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized Access'
//             });
//         }
//         }
//         catch(err) {
//             console.log(err.message);
//             res.status(401).json({
//                 success: false,
//                 message: 'Unauthorized Access'
//             });
//         }

//     }
//     //auth header not provided
//     else {
//         res.status(401).json({
//             success: false,
//             message: 'Unauthorized Access'
//         });
//     }

// }

exports.lol = (req, res) => {
    res.json('I hear you')
}