import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "../../../util/db";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const { id } = req.query;

  if (!session) {
    res.status(401).end();
    return;
  }

  if (!id) {
    res.status(404).end();
    return;
  }

  if (Array.isArray(id)) {
    res.status(400).end();
    return;
  }

  switch (req.method) {
    case "GET":
      const contact = await prisma.contact.findUnique({
        where: { id: id }
      });
      if (!contact) {
        res.status(404).end();
        return;
      }
      if (contact.userId !== session.userId) {
        res.status(403).end;
        return;
      }
      res.status(200).json(contact);
      break;
    case "PUT":
      const updatedContact = await prisma.contact.update({
        where: { id: id },
        data: req.body
      });

      res.status(200).json(updatedContact);
      break;
    case "DELETE":
    default:
      res.status(405).end();
  }
}
