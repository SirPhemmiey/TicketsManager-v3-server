import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel';
import User from '../models/userModel';

exports.signUp = async (req, res) => {
    let { username, password } = req.body;
    if (username == '' && password == '') {
        return res.json({
            success: false,
            message: "Fields cannot be empty"
        });
    }
    //auto-generate a salt and hash
    req.body.password = bcrypt.hashSync(password.toLowerCase(), 10);
    req.body.username = username.toLowerCase();

    //check if username exists
    let checkUsername = await Admin.findOne({ username: username});
    if (checkUsername) {
       return res.json({
            success: false,
            message: 'Username already exist'
        });
    }
        const admin = await Admin.create(req.body);
        if (admin) {
            req.body = undefined;
            res.json({
                message: 'Successful',
                success: true,
            });
        }
        else {
            res.json({
                success: false,
                message: 'An error occured'
            });
        }
};

exports.signIn = async (req, res) => {
    let { username, password } = req.body;
    if (!req.body) {
       return res.json({
            message: 'All fields are compulsory',
            success: false
        });
    }
    const admin = await Admin.findOne({username: username.toLowerCase()});
    //res.json(JSON.stringify(password));
    if (admin)  {
        //req.body = undefined;
        let signData = {
            _id: admin._id,
            firstName: admin.username,
        };
        // const token = jwt.sign(signData, process.env.JWT_SECRET);
        const token = jwt.sign(signData, "Algorithm...221");
        if (bcrypt.compareSync(password, admin.password)) {
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
            message: 'Credentials not found!',
            success: false
        });
    }
};
// exports.getAa = () => {

// }

exports.allUsers = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    if (authorizationToken) {
        try {
            const token = jwt.verify(authorizationToken, 'Algorithm...221');
            let users = await User.find();
            if(users) {
                res.json({
                    success: true,
                    users: users
                });
            }

        }
        catch(err) {
            res.json({
                success: false,
                message: err.message
            });
        }
    }
    const user = await User.find();
    if (user) {
        res.status(200).json({
            user
        });
    }
}

exports.allTickets = async (req, res) => {
    let tickets = await Ticket.find();
    console.log(tickets);
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    console.log(authorizationToken);
    //if the header is provided
    if (authorizationToken) {
        const token = jwt.verify(authorizationToken, 'Algorithm...212');
        let user = await User.findOne({_id: token._id});
        //if user is found
        if (user) {
            if (tickets) {
                //ok
                res.status(200).json({
                    success: true,
                    tickets,
                });
            }
            else {
                //internal server error
                res.status(500).json({
                    success: false,
                    message: "An error occured"
                });
            }
        }
        //unauth access
        else {
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access'
            });
        }
    }
    //auth header not provided
    else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

}

exports.respondTicket = async (req, res) => {

}