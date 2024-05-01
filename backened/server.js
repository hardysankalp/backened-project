const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // used for middleware parsing
const app = express();
app.use(bodyParser.json()); // corrected typo here
mongoose.connect('mongodb://localhost:27017/mern_notes_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
});

// Assuming these are defined elsewhere in your code
// Import your routes here
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
