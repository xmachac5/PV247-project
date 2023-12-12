import prisma from '@/lib/prisma'
import { reportSchema } from '@/app/model/report';

export const POST = async (
  req: Request,
) => { 
    const data = await reportSchema.parse(await req.json());
    const report = await prisma.report.create({
      data: {...data, personalData: {create: data.personalData}},
    });
    console.log(report);
    return Response.json({id: report.id});
};

export const GET = async () => { 
  const reports = await prisma.report.findMany({
    include: {
      personalData: true,
    }
  });
  console.log(reports);

  return Response.json(reports);
};