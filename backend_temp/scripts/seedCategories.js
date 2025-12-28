import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import { db } from "../db/index.js";
import { categories } from "../db/schema/categories.schema.js";

const seedCategories = async () => {
  console.log("🚀 Seeding categories started...");

  const data = [
    { name: "Technology", slug: "technology" },
    { name: "Artificial Intelligence", slug: "ai" },
    { name: "Web Development", slug: "web-development" },
    { name: "Finance", slug: "finance" },
    { name: "Startups", slug: "startups" },
    { name: "Sports", slug: "sports" },
  ];

  try {
    await db
      .insert(categories)
      .values(data)
      .onConflictDoNothing();

    console.log("✅ Categories seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  }
};

seedCategories();