import { z } from "zod";

export type Lawyer = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type LawyerNoPassword = {
    id: string;
    name: string;
    email: string;
}

export type LawyerLogin = {
    email: string;
    password: string;
}

export const LawyerDataSchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().min(4).max(30),
    password: z.string().min(1).max(120),
});