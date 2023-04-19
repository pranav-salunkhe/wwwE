import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { UserRouter } from './routes/users.js';

// require('dotenv').config({path: './.env'});
import dotenv from 'dotenv';

dotenv.config({path:'./.env'});
process.env.USN;
process.env.PSWD;
// import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth", UserRouter);

mongoose.connect(
    `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/test`,
);

app.listen(3131, () => console.log("Server started"));

// const url = `mongodb+srv://${process.env.USN}:${process.env.PSWD}@cems.fkwgxbe.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(url);
 
//  // The database to use
// const dbName = "cems";
                      
//  async function run() {
//     try {
//          await client.connect();
//          console.log("Connected correctly to server");
//          const db = client.db(dbName);
//          // Use the collection "people"
//          const col = db.collection("users");
//          // Construct a document                                                                                                                                                              
//          let personDocument = {
//              "username": "pranavDemo1",
//              "password": "password", // May 23, 1912                                                                                                                                
//          }
//          // Insert a single document, wait for promise so we can read it back
//          const p = await col.insertOne(personDocument);
//          // Find one document
//          const myDoc = await col.findOne();
//          // Print to the console
//          console.log(myDoc);
//          console.log(p);
//         } catch (err) {
//          console.log(err.stack);
//      }
 
//      finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);