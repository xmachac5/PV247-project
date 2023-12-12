import { z } from "zod";

export type ReportType = {
    id: string;
    name: string;
}

export const ReportTypeDataSchema = z.object({
    name: z.string().min(1).max(50),
});