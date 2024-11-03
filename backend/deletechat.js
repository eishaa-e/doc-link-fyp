// deleteChats.js
const mongoose = require("mongoose");
const Chat = require("./models/chat.model"); // Adjust the path according to your project structure

// Connect to MongoDB
mongoose.connect("mongodb+srv://nisha:nisha@cluster0.yvh2u.mongodb.net/docLink", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Function to delete all chats
const deleteAllChats = async () => {
    try {
        const result = await Chat.deleteMany({});
        console.log(`${result.deletedCount} chats deleted.`);
    } catch (error) {
        console.error("Error deleting chats:", error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

deleteAllChats();
