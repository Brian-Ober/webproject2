const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  try {
    // Step 1: Confirm the database connection exists
    console.log('Attempting to connect to the database...');
    const dbInstance = mongodb.getDb();
    if (!dbInstance) {
      console.error('Database connection failed: DB instance is undefined or null.');
      res.status(500).json({ message: 'Database connection failed' });
      return;
    }
    console.log('Database connection established.');
    // Step 2: Query the contacts collection and confirm its existence
    const db = dbInstance.db();
    console.log('Using database:', db.databaseName);  // This should print the name of the connected database
 
    const collectionName = 'Character';
    const collection = db.collection(collectionName);
    if (!collection) {
      console.error(`Collection "${collectionName}" not found in the database.`);
      res.status(500).json({ message: `Collection "${collectionName}" not found.` });
      return;
    }
 
    // Step 3: Query the collection and return the result
    const result = await collection.find().toArray();
    console.log(`Number of documents found in "${collectionName}":`, result.length);  // Should show how many documents were returned
    // Step 4: Send the result back to the client
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    // Step 5: Handle and log any errors
    console.error('Error while fetching contacts:', err);
    res.status(500).json({ message: 'Failed to fetch contacts.' });
  }
};

 
// const getContacts = async (req, res) => {
//   try {
//       const people = await Person.find(); // grab all records for collection
//       res.status(200).json(people); // if successful send response
//   } catch (err) {
//       res.status(500).json({ error: err.message }); // if unsuccessful send error message
//   }
// };

const getSingle = async (req, res, next) => {
  const userId = req.params.id
  console.log("yes");
  const result = await mongodb
  
    .getDb()
    .db()
    .collection('Character')
    .find({ _id: new ObjectId(userId) });
    
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
    console.log(result)
  });
};

const newPost = async (req, res, next) => {
  const dbInstance = mongodb.getDb();
  const db = dbInstance.db();
  const collectionName = 'Character';
  const collection = db.collection(collectionName);
  console.log("ok");
  const result = await collection.insertOne(
      req.body
  )
  res.status(200).send(result);
}

// const updatePost = async (req, res, next) => {
//   const dbInstance = mongodb.getDb();
//   const { ObjectId } = require('mongodb');
//   const db = dbInstance.db();
//   const collectionName = 'contacts';
//   const collection = db.collection(collectionName);
//   console.log("update");
//   const userId = req.params.id;
//   const existingContact = await collection.findOne({ _id: new ObjectId(userId) });
//   if (!existingContact) {
//     return res.status(404).send('No contact found with that ID.');
//   }
//   else {
//     console.log("confirm");
//   }
//   console.log(userId);
//   const content = req.body;
//   console.log(content);
//   const result = await collection.replaceOne({ _id: userId }, content);
//   if (result.modifiedCount === 0) {
//     return res.status(404).send('No contact found with that ID or no changes made.');
//   }
// };

const updatePost = async (req, res, next) => {
  try {
    const dbInstance = mongodb.getDb();
    const db = dbInstance.db();
    const collectionName = 'Character';
    const collection = db.collection(collectionName);

    const userId = req.params.id;
    console.log('User ID from request:', userId);

    // Validate ObjectId
    if (!ObjectId.isValid(userId)) {
      return res.status(400).send('Invalid ID format.');
    }

    // Check if the document exists
    const existingContact = await collection.findOne({ _id: new ObjectId(userId) });
    if (!existingContact) {
      return res.status(404).send('No contact found with that ID.');
    }

    console.log('Request body:', req.body);

    // Update document
    const result = await collection.updateOne({ _id: new ObjectId(userId) }, { $set: req.body });

    if (result.modifiedCount === 0) {
      return res.status(400).send('No changes made or contact not found.');
    }

    res.status(200).send('Contact updated successfully.');
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).send('Internal server error.');
  }
};


const clearPost = async (req, res, next) => {
  try {
    const dbInstance = mongodb.getDb();
    const db = dbInstance.db();
    const collectionName = 'Character';
    const userId = req.params.id;
    
    const collection = db.collection(collectionName);
    
    // Ensure userId is converted to an ObjectId if necessary
    const result = await collection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      return res.status(404).send('No contact found with that ID.');
    }

    res.status(200).send('Character deleted successfully.');
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).send('Internal server error.');
  }
};

console.log("test2");
module.exports = { getAll, getSingle, newPost, updatePost, clearPost };