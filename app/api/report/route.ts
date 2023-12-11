import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
type ResponseData = {
    message: string,
}
 
export const POST = async (
  req: Request,
) => {
    const data = await req.json();
    console.log("POST", data)
    return new Response(null, {status: 200});
};