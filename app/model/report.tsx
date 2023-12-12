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
  personalData: personalDataSchema.optional(),
});

export type Report = z.infer<typeof reportSchema>;

const dbReportSchema = reportSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  state: z.string(),
});

export type DbReport = z.infer<typeof dbReportSchema>;

export const reportEditSchema = z.object({
  state: z.enum(['New', 'In progress', 'Resolved', 'Denied']),
  type: z.string(),
})

export type ReportEdit = {
  id: string;
  type: string;
  state: string,
}