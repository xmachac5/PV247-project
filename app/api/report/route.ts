import prisma from '@/lib/prisma'
import { reportSchema } from '@/app/model/report';
 
export const POST = async (
  req: Request,
) => { 
    const data = await reportSchema.parse(await req.json());
    console.log("TODO store to database: ", data);
    return new Response(null, {status: 200});
};