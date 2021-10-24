import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../util/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }

  switch (req.method) {
    case "GET":
      const contactList = await prisma.contact.findMany();
      res.status(200).json(contactList);
      break;
    case "POST":
      const createdContact = await prisma.contact.create({
        data: { userId: session.userId as string, ...req.body }
      });
      res.status(200).json(createdContact);
      break;
    default:
      res.status(405).end();
  }
}
