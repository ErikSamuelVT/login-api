import mongoose from "mongoose";

export async function disconnectDb() {
  try {
    await mongoose.connection.close();
    return "closed";
  } catch (error) {
    console.log("Error closing to database: ", error);
    return;
  }
}

export async function connectionDb() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    const { readyState, db } = mongoose.connection;

    return readyState === 1 && `connected ${db}`;
  } catch (error) {
    console.log("Error connecting to database: ", error.message);
    await disconnectDb();
    return;
  }
}
