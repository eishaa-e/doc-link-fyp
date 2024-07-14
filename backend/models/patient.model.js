const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String},
    dob: {type: Date},
    gender: {type: String},
    phone: {type: String},
    city: {type: String}
});

module.exports = mongoose.model('Patient', PatientSchema);
