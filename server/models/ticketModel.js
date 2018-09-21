import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const ticket = new Schema({
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   response: {type: mongoose.Schema.Types.ObjectId, ref: 'Response', required: false },
    subject: { type: String, required: true },
    complain: { type: String, required: true },
    status: { type: String, required: true},
    date_created: { type: Date, default: Date.now() }
});

ticket.plugin(mongoDbErrorHandler);

export default mongoose.model('Ticket', ticket);