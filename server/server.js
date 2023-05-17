require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch(err => console.log(err));

app.use(cookieParser());
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(bodyParser.json());

const pingCheckRoutes = require('./routes/pingCheckRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/ping', pingCheckRoutes);
app.use('/api/users', userRoutes);
