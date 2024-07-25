const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const MONGO_CLOUD_URL =
  "mongodb+srv://conqueromanish:GXQjx4WZ12vPWVaw@cluster0.sjmfgrg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_CLOUD_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((i) => ({
    ...i,
    owner: "66a1d559971ab887c9868a36",
    geometry: {
      type: "Point",
      coordinates: [85.09, 20.84],
    },
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
