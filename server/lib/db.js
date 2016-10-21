 "use strict";

const initialTweets = require("./tweets");

const db = { tweets: initialTweets };

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1:27017/tweeter";

var collection;

MongoClient.connect(MONGODB_URI, (err, db) => {

  if (err) {
    throw err;
  }
  collection = db.collection("tweets");

});

const dbMethods = {

  saveTweet: (data) => {
    collection.insertOne(data);
  },

  getTweets: (callback) => {
    collection.find().toArray((err, results) => {
    callback(results);
    console.log(results);
    // db.close();
  });
  }
}

module.exports = {

  connect: (onConnect) => {

    onConnect(dbMethods);

  }

}
