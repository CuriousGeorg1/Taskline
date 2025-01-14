"use server";
import { z } from "zod";
import { signIn } from "../authConfig";
import { signInFormSchema } from "@/lib/formSchemas";
import { NextResponse } from "next/server";

export async function signInWithCredentials(
  values: z.infer<typeof signInFormSchema>,
  mode: "signin" | "signup"
) {
  await signIn("credentials", {
    email: values.email,
    password: values.password,
    mode,
  });
  return NextResponse.redirect(new URL("/venues", window.location.origin));
}
