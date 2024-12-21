import "server-only";
const { MongoClient } = require("mongodb");
import { ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in env");
}

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDb(dbName) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    return null;
  }
}

export async function getCollection(collectionName) {
  const db = await getDb("next_blog_db");
  if (db) return db.collection(collectionName);
  return null;
}
