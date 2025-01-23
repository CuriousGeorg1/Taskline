"use server";
import { z } from "zod";
import { signIn } from "../authConfig";
import { signInFormSchema } from "@/lib/formSchemas";

/*
  This action is called client-side and it calls the credentialsProvider's authorize function
  This basically wraps the signin function inside a server action, which allows it to be called client-side
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
    redirectTo: "/",
  });
}
