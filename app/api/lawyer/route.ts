import prisma from '@/lib/prisma'
import { Lawyer, LawyerDataSchema } from '@/app/model/lawyer';
import bcrypt from "bcrypt";

export const POST = async (
  req: Request,
) => { 
    const data = await LawyerDataSchema.parse(await req.json());
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const lawyer = await prisma.user.create({
      data
    });
    console.log(lawyer);
    return Response.json({id: lawyer.id});
};

export const GET = async () => { 
      const lawyers = await prisma.user.findMany({
      });
      console.log(lawyers);
  
      return Response.json(lawyers);
  };

export const DELETE = async (req: Request) => {
    const LawyerToDelete = (await req.json()) as Lawyer;

    console.log(LawyerToDelete);
    await prisma.user.delete({
        where: {
            id: LawyerToDelete.id,
          },
        });

    return Response.json(LawyerToDelete);
};