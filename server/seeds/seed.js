import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing in .env");
    process.exit(1);
}

const seedUsers = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB for seeding");

        // Clear existing users? Maybe better not to delete all data unexpectedly.
        // The user asked to "insert", not "replace". I will just append.

        const users = [];
        const passwordHash = await bcrypt.hash("123456", 10); // Default password for all

        const firstNames = ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank", "Ivy", "Jack"];
        const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

        for (let i = 0; i < 10; i++) {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const fullName = `${firstName} ${lastName}`;
            // Add random number to email to ensure uniqueness if names collide
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;

            const profilePic = `https://avatar.iran.liara.run/public/boy?username=${firstName}`;

            users.push({
                fullName,
                email,
                password: passwordHash,
                profilePic
            });
        }

        await User.insertMany(users);
        console.log("Successfully seeded 10 users!");

        process.exit(0);
    } catch (error) {
        console.error("Error seeding users:", error);
        process.exit(1);
    }
};

seedUsers();
