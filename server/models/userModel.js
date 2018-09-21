import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const user = new Schema({
    //ticket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: false }],
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

//authenticate input against database
// user.statics.authenticate = (email, cb) => {
//     User.findOne({ email: email })
//     .exec((err, user) => {
//         if (err) {
//             return cb(err)
//         }
//         else if (!user) {
//             let err = new Error("User not found");
//             return cb(err);
//         }
//     });
// }
user.plugin(mongoDbErrorHandler);

export default mongoose.model('User', user);