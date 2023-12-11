import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const clientParams = process.env.PRISMA_PRINT_SQL === undefined ? undefined : {log: ['query', 'info', 'warn', 'error']};

const prisma = global.prisma || new PrismaClient(clientParams as any);

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
