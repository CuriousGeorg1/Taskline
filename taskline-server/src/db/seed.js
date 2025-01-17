import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable, businessTable, locationTable } from "./schema"; // Adjust the import path as necessary
import bcrypt from "bcrypt";

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://localhost:5432/mydb",
});

const db = drizzle(pool);

async function seed() {
  try {
    // Insert initial data into the business table
    const business = await db
      .insert(businessTable)
      .values({
        name: "Example Business",
      })
      .returning("*");

    // Insert initial data into the location table
    const location = await db
      .insert(locationTable)
      .values({
        name: "Main Office",
        businessId: business[0].id,
      })
      .returning("*");

    // Insert initial data into the users table
    const hashedPassword = await bcrypt.hash("password123", 10);
    await db.insert(usersTable).values({
      email: "admin@example.com",
      name: "Admin User",
      businessId: business[0].id,
      locationId: location[0].id,
      role: "admin",
      password: hashedPassword,
    });

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    pool.end();
  }
}

// seed();
