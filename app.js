const { MongoClient, } = require("mongodb");
// Connection URI
const url =
    "mongodb://localhost:27017";
// Create a new MongoClient
const client = new MongoClient(url);
async function run() {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    const db = client.db("admin")
    const collection = db.collection("bibloteca")
    console.log("Connected successfully to server");
    const insertResult = await collection.insertMany([
        { name: "El hobbit", author: "J.R.R. Talkien", editorial: "Planeta", year: 1937 },
        { name: "The lord of the rings", author: "J.R.R. Tolkien", editorial: "De bolsillo", year: 1954 },
        { name: "Las aventuras de Tom Bombadil", author: "J.R.R. Talkien", editorial: "Penguin Books", year: 1934 },
        { name: "Los hijos de Húrin", author: "J.R.R. Talkien", editorial: "Planeta", year: 2007 }]);
    console.log('Inserted documents =>', insertResult);
    const updateResult = await collection.updateMany({year: {$ne: 1937}}, {$set: {stock: 25}});
    const updateResult2 = await collection.updateOne({year: 1937}, {$set: {stock: 37}});
    console.log('Updated documents =>', updateResult, updateResult2);
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    await collection.drop();
    // Ensures that the client will close when you finish/error
    await client.close();
}


run().catch(console.dir);