const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to app');
});

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.yk7ln.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const bookingCollection = client
    .db(`${process.env.DBNAME}`)
    .collection('destinations');
  const ordersCollection = client
    .db(`${process.env.DBNAME}`)
    .collection('orders');

  app.post('/addBooking', (req, res) => {
    bookingCollection
      .insertOne(req.body)
      .then((result) => res.send(!!result.insertedCount));
  });

  app.post('/addOrder', (req, res) => {
    orderCollection
      .insertOne(req.body)
      .then((result) => res.send(!!result.insertedCount));
  });

  app.get('/bookings', (req, res) => {
    bookingCollection.find({}).toArray((err, docs) => res.send(docs));
  });

  app.get('/orders', (req, res) => {
    adminsCollection.find({ email: req.query.email }).toArray((err, docs) => {
      if (docs.length) {
        orderCollection.find({}).toArray((err, docs) => res.send(docs));
      } else {
        orderCollection
          .find({ email: req.query.email })
          .toArray((err, docs) => res.send(docs));
      }
    });
  });
});

app.listen(port);
