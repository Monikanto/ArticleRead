import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.schema.js";
import { eq } from "drizzle-orm";

const SALT_ROUNDS = 10;

export const registerUser = async ({ name, email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
    });

  return user;
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};