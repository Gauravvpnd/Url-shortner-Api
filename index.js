const express = require("express");
const { connectToMongoB } = require("./Connect");
const urlRoute = require('./routes/Url');
const app = express();

const port = process.env.PORT || 8001;

async function startServer() {
  try {
    await connectToMongoB('mongodb://127.0.0.1:27017/short-url');
    console.log('MongoDB connected');
    
    app.use(express.json()); // Set up middleware
    app.use("/url", urlRoute);

    app.listen(port, () => console.log(`Server is running on ${port}`));
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

startServer();
