const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Routes
const tourRoutes = require('./routes/tourRoutes');

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Middlewares
// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'));
// }
app.use('/api/tours', tourRoutes);

app.all('*', (req, res, next) => {
  res.status(400).json({
    status: 'fail',
    message: `cant find ${req.originalUrl} on this server!`
  });
});

const PORT = process.env.PORT || 5000;

// Connected to mongodb
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useCreateIndex', true);





