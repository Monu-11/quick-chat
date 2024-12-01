import { Request, Response } from "express";
import prisma from "../config/db.config.js";

const chats = async (req: Request, res: Response): Promise<any> => {
  try {
    const { groupId } = req.params;
    const chats = await prisma.chats.findMany({
      where: {
        group_id: groupId,
      },
    });
    return res.json({ data: chats });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong.please try again!" });
  }
};

export {chats}