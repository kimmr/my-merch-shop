const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db; // used only internally

const mongoConnect = (callback) => {
  MongoClient.connect(
      "mongodb+srv://megan:vZimbEMh661Xyws3@cluster0.plwjh.mongodb.net/myMerch?retryWrites=true&w=majority"
    )
    .then(client => {
      console.log('MongoDB connected');
      // Storing connection to the database
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log('Error from connecting Database', err);
      throw err;
    });
};

// Return access to the database
// This allows access to the database from anywhere when we call it
const getDb = () => {
  if (_db) {
    return _db; 
  } else {
    throw 'No Database Found';
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


