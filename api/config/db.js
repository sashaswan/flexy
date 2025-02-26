const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Update this URI with your MongoDB cluster connection string
        const mongoURI = process.env.MONGO_URI;

        await mongoose.connect(mongoURI);
        console.log('MongoDB Cluster Connected Successfully...');
    } catch (err) {
        console.error('Error connecting to MongoDB Cluster:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;