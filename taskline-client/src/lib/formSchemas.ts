import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email("Email must be a valid email address"),
  password: z.string(),
});

export const signUpFormSchema = z
  .object({
    email: z.string().email("Email must be a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    passwordConfirmation: z.string(),
  })
  .superRefine((data, context) => {
    if (data.password !== data.passwordConfirmation) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["passwordConfirmation"],
      });
    }
  });
