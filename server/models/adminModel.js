import mongoose, { Schema } from 'mongoose';
import mongoDbErrorHandler from 'mongoose-mongodb-errors';

const admin = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

admin.plugin(mongoDbErrorHandler);
export default mongoose.model('Admin', admin);
