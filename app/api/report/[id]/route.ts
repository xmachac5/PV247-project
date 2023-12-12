import prisma from '@/lib/prisma'
import { reportSchema } from '@/app/model/report';

export const GET = async (
  req: Request,
  { params }: { id: { id: string } }
) => { 
    const report = await prisma.report.findFirst({
      where: {
        id: params.id,
      },
      include: {
        personalData: true,
      }
    });
    console.log(report);

    return Response.json(report);
};