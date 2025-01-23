"use server";
import { z } from "zod";
import { signIn } from "../authConfig";
import { signInFormSchema } from "@/lib/formSchemas";
import { NextResponse } from "next/server";

/*
  This action is called client-side and it calls the credentialsProvider's authorize function
*/
export async function signInWithCredentials(
  // The values object is validated against the signInFormSchema if mode is signup then use signUpFormSchema
  values: z.infer<typeof signInFormSchema> & { name?: string },
  mode: "signin" | "signup"
) {
  await signIn("credentials", {
    name: values.name,
    email: values.email,
    password: values.password,
    mode,
  });
  return NextResponse.redirect(new URL("/venues", window.location.origin));
}
