const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the message schema
const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

// Define the chat schema
const chatSchema = new Schema({
    patient_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    messages: [messageSchema], // Embed messageSchema for each message in chat
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
