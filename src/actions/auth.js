"use server";

import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export async function register(state, formData) {
  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      email: formData.get("email"),
    };
  }

  const { email, password } = validatedFields.data;
  const userCollection = await getCollection("users");
  if (!userCollection) {
    return {
      errors: {
        email: "Database error, please try again later",
      },
    };
  }

  const existingUser = await userCollection.findOne({ email });
  if (existingUser) {
    return {
      errors: {
        email: "Email already exists in the database",
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await userCollection.insertOne({
    email,
    password: hashedPassword,
  });

  await createSession(result.insertedId.toString());
  redirect("/dashboard");
}
