import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const response = new Schema({
    response: { type: String, required: true},
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true},
    date_responded: { type: Date, default: Date.now() }
});

response.plugin(mongoDbErrorHandler);

export default mongoose.model('Response', response);