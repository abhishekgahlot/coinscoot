const MongoClient = require('mongodb').MongoClient;
const log = require('../../utils').log;
const config = require('../../config');
const assert = require('assert');

const url = config.db.url;
const index = config.db.index;

function ensureIndex(db) {
  log('Ensuring indexes on Mongo');
  return new Promise((resolve) => {
    db.collection('users').createIndex(index, { unique: true }, (err, results) => {
      assert.equal(null, err);
      resolve(results);
    });
  });
}

function connectMongo() {
  log('Connecting to Mongo server');
  return new Promise((resolve) => {
    MongoClient.connect(url, (err, db) => {
      assert.equal(null, err);
      global.db = db;
      ensureIndex(db).then(() => {
        resolve(db);
      });
    });
  });
}

module.exports = {
  connectMongo,
};
