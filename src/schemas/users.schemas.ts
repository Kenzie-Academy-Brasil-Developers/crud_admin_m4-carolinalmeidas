import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional().default(false),
  active: z.boolean().default(true),
});

const requestUserSchema = userSchema.omit({
  id: true,
});

const responseUserSchema = userSchema.omit({
  password: true
})


const updateUserSchema= userSchema.partial().omit({
  id: true,
  active: true,
  admin: true
})

export { userSchema, requestUserSchema, responseUserSchema, updateUserSchema };
