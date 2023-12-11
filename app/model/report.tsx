import { z } from "zod";

export type Report = {
  title: string;
  reason: string;
  description: string;
  password: string;
  repeatedPassword: string;
  datetime: string;
};

export const reportSchema = z.object({
  title: z.string(),
  reason: z.string(),
  description: z.string(),
  password: z.string().min(4).max(30),
  repeatedPassword: z.string().min(4).max(30),
  datetime: z.string(),
});

{ // type assertion
	const _: z.ZodType<Report> = reportSchema;
}


export type PersonalData = {
  name: string;
  surname: string;
  dateBorn: string;
  address: string;
  email: string;
  phone: string;
};

// TODO: proper validation
export const personalDataSchema = z.object({
  name: z.string().min(1).max(50),
  surname: z.string().min(1).max(50),
  dateBorn: z.string(),
  address: z.string().min(1).max(120),
  email: z.string().min(1).max(120),
  phone: z.string().min(1).max(120),
});

{ // type assertion
	const _: z.ZodType<PersonalData> = personalDataSchema;
}