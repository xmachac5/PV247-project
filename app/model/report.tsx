import { z } from "zod";

// TODO: proper validation
export const personalDataSchema = z.object({
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  dateBorn: z.coerce.date(),
  address: z.string().min(1).max(120),
  email: z.string().min(1).max(120),
  phone: z.string().min(1).max(120),
});

export type PersonalData = z.infer<typeof personalDataSchema>;

export const reportSchema = z.object({
  title: z.string(),
  reason: z.string(),
  description: z.string(),
  password: z.string().min(4).max(30),
  datetime: z.coerce.date(),
  personalData: personalDataSchema,
});

export type Report = z.infer<typeof reportSchema>;