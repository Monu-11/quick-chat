import { Request, Response } from "express";
import prisma from "../config/db.config.js";

interface GroupUserType {
  name: string;
  group_id: string;
}

const index = async (req: Request, res: Response): Promise<any> => {
    try {
        const { group_id } = req.query;
        const users = await prisma.groupUsers.findMany({
          where: {
            group_id: group_id as string,
          },
        });
  
        return res.json({ message: "Date fetched successfully!", data: users });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again!" });
      }
}

const store = async (req: Request, res: Response): Promise<any>  => {
    try {
        const body: GroupUserType = req.body;
        const user = await prisma.groupUsers.create({
          data: body,
        });
        return res.json({ message: "User created successfully!", data: user });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again!" });
      }
}

export {
    index,
    store
}
