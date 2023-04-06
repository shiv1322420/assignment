const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');
const notesRoutes=require('./routes/notes')
const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/';   //setup default to run local without .env
const DB_NAME = process.env.DATABASE  || 'notesDB'
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(
  cors({
    origin: '*'
  })
);


app.use('/api/',notesRoutes);




mongoose.connect(`${MONGO_URL}${DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => {
    console.log(err)
}
);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));