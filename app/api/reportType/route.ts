import { ReportTypeDataSchema, ReportType } from '@/app/model/reportType';
import prisma from '@/lib/prisma'

export const POST = async (
  req: Request,
) => {
  const data = await ReportTypeDataSchema.parse(await req.json());
  const reportType = await prisma.reportType.create({
    data
  });
  console.log(reportType);
  return Response.json(reportType);
};

export const GET = async () => {
  const reportTypes = await prisma.reportType.findMany({
  });
  console.log(reportTypes);

  return Response.json(reportTypes);
};

export const DELETE = async (req: Request) => {
  const reportTypeToDelete = (await req.json()) as ReportType;

  console.log(reportTypeToDelete);
  await prisma.reportType.delete({
    where: {
      id: reportTypeToDelete.id,
    },
  });

  return Response.json(reportTypeToDelete);
};

export const PUT = async (req: Request) => {
  const reportTypeToUpdate = (await req.json()) as ReportType;

  console.log(reportTypeToUpdate);
  await prisma.reportType.update({
    where: {
      id: reportTypeToUpdate.id,
    },
    data:{
      name: reportTypeToUpdate.name,
    }
  });

  return Response.json(reportTypeToUpdate);
};