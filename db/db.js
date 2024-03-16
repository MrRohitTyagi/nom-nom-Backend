import mongoose from "mongoose";

export async function connectToDB(MONGO_STRING) {
  mongoose
    .connect(MONGO_STRING, { dbName: "nom-nom" })
    .then((e) => {
      console.log("Connected to DB " + e.connection.host);
    })
    .catch((err) => {
      console.log("err", err);
    });
}
