import mongoose from "mongoose";

let connection;

const connect = async () => {
  if (connection) {
    return connection;
  }

  try {
    connection = await mongoose.connect(process.env.MONGO);
    return connection;
  } catch (error) {
    throw new Error("Connection failed!");
  }
};

export default connect;
