import { connectToDatabase } from "../../../lib/mongodb";

export default async function handler(req, res) {
  const db = await connectToDatabase();
  const collection = db.collection("restaurants");

  if (req.method === "GET") {
    // Fetch restaurants from MongoDB
    const restaurants = await collection.find({}).toArray();
    res.status(200).json(restaurants);
  } else if (req.method === "POST") {
    const {
      name,
      description,
      location,
      featuredImage,
      openingTime,
      closingTime,
      phoneNumber,
      email,
    } = req.body;
    const result = await collection.insertOne({
      name,
      description,
      location,
      featuredImage,
      openingTime,
      closingTime,
      phoneNumber,
      email,
    });
    res.status(201).json({
      message: "Restaurant added successfully",
      restaurant: result.ops[0],
    });
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
