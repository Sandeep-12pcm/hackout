const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
import seaLevelRoutes from "./routes/seaLevelRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files
// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use("/api", seaLevelRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to Hackout API: Code is Green');
});




// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('(CodeRed) MongoDB Error:', err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
