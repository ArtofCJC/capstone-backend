const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {

  console.log("MongoDB is connected");
})



const attractionRouter = require('./routes/attractionsRoutes')
app.use('/api/attractions', attractionRouter)

if (process.env.NODE_ENV === "production"){
  app.use(express.static('client/build'))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(_dirname, 'client/build'))
  })
};

app.listen(port, () =>{

  console.log(`server is running on port: ${port}`);
});